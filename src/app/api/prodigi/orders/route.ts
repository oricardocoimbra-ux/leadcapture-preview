import { NextRequest, NextResponse } from "next/server";
import {
  ALLOWED_PRODIGI_SHIPPING_METHODS,
  checkProvisionalProdigiRateLimit,
  createProdigiSandboxOrder,
  getProdigiConfigStatus,
  getTrustedClientIp,
  hasValidSameOrigin,
  isValidIdempotencyKey,
  readJsonWithByteCap,
  type ProdigiOrderRequest,
  type ProdigiShippingMethod,
} from "@/lib/prodigi/client";

const ORDERS_MAX_REQ_PER_10_MIN = 5;

function isHttpsUrl(url: string): boolean {
  try {
    return new URL(url).protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * POST /api/prodigi/orders
 * Prodigi Print API v5 (/v5/orders) — SANDBOX-ONLY, DRAFT-FIRST, DISABLED BY DEFAULT.
 *
 * Security & Idempotency:
 * - Rejects requests without a valid same-origin Origin/Referer header (403).
 * - Provisional per-IP rate limiting (5 req / 10 min; replace with auth + distributed rate limit before launch).
 * - Requires caller-supplied `Idempotency-Key` (header or body) unique per purchase attempt
 *   so network retries are deduplicated without ever blocking future identical purchases.
 */
export async function POST(request: NextRequest) {
  if (!hasValidSameOrigin(request)) {
    return NextResponse.json(
      { ok: false, error: "Origem do pedido ausente ou não autorizada." },
      { status: 403 }
    );
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json({ ok: false, error: "Tipo de conteúdo inválido." }, { status: 415 });
  }

  const clientIp = getTrustedClientIp(request);
  if (!checkProvisionalProdigiRateLimit("orders", clientIp, ORDERS_MAX_REQ_PER_10_MIN)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Demasiados pedidos de encomenda num curto intervalo. Aguarde alguns minutos.",
      },
      { status: 429 }
    );
  }

  const parsed = await readJsonWithByteCap(request);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: parsed.status });
  }

  const body = (parsed.data ?? {}) as Partial<ProdigiOrderRequest>;
  const idempotencyKey = (
    request.headers.get("idempotency-key") ||
    body.idempotencyKey ||
    ""
  ).trim();

  if (!isValidIdempotencyKey(idempotencyKey)) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Cabeçalho ou campo Idempotency-Key obrigatório (16–128 caracteres alfanuméricos, hífen ou underscore) único por tentativa de compra.",
      },
      { status: 400 }
    );
  }

  const merchantReference = String(body.merchantReference || "").trim();
  const shippingMethod = String(body.shippingMethod || "standard")
    .trim()
    .toLowerCase() as ProdigiShippingMethod;
  const recipient = body.recipient;
  const items = Array.isArray(body.items) ? body.items : [];

  if (!merchantReference || merchantReference.length > 100) {
    return NextResponse.json(
      { ok: false, error: "Indique um merchantReference válido (até 100 caracteres)." },
      { status: 400 }
    );
  }
  if (!ALLOWED_PRODIGI_SHIPPING_METHODS.includes(shippingMethod)) {
    return NextResponse.json(
      { ok: false, error: "Método de envio Prodigi v5 inválido (budget, standard, express, overnight)." },
      { status: 400 }
    );
  }
  if (
    !recipient?.name?.trim() ||
    !recipient?.address?.line1?.trim() ||
    !recipient?.address?.townOrCity?.trim() ||
    !recipient?.address?.postalOrZipCode?.trim() ||
    !/^[A-Z]{2}$/.test(String(recipient?.address?.countryCode || "").trim().toUpperCase())
  ) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Morada de envio incompleta (nome, line1, localidade, código postal e país ISO-2).",
      },
      { status: 400 }
    );
  }
  if (items.length === 0 || items.length > 20) {
    return NextResponse.json(
      { ok: false, error: "Indique entre 1 e 20 itens válidos para encomenda sandbox." },
      { status: 400 }
    );
  }

  for (const it of items) {
    const qty = typeof it?.quantity === "number" ? it.quantity : NaN;
    if (!it?.sku?.trim() || !Number.isInteger(qty) || qty < 1 || qty > 200) {
      return NextResponse.json(
        { ok: false, error: "Cada item requer SKU Prodigi válido e quantity entre 1 e 200." },
        { status: 400 }
      );
    }
    if (!Array.isArray(it.assets) || it.assets.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Cada item requer pelo menos um ficheiro de arte final (HTTPS) em assets." },
        { status: 400 }
      );
    }
    for (const asset of it.assets) {
      if (!asset?.printArea?.trim() || !asset?.url || !isHttpsUrl(asset.url)) {
        return NextResponse.json(
          { ok: false, error: "Cada asset deve incluir printArea e URL HTTPS pública da arte final." },
          { status: 400 }
        );
      }
    }
  }

  const config = getProdigiConfigStatus();
  if (!config.enabled || !config.apiKeyConfigured) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        apiVersion: "v5",
        sandboxOnly: true,
        error:
          "A criação de encomendas Prodigi v5 Sandbox está desativada neste ambiente. Nenhuma encomenda foi criada.",
      },
      { status: 503 }
    );
  }
  if (config.environment !== "sandbox" || !config.sandboxKeyPrefixValid) {
    return NextResponse.json(
      {
        ok: false,
        apiVersion: "v5",
        sandboxOnly: true,
        error:
          "Encomendas live Prodigi estão bloqueadas antes da validação física e aprovação explícita de lançamento.",
      },
      { status: 403 }
    );
  }

  const result = await createProdigiSandboxOrder({
    merchantReference,
    shippingMethod,
    idempotencyKey,
    submit: Boolean(body.submit),
    recipient: {
      name: recipient.name.trim(),
      email: recipient.email?.trim() || undefined,
      phoneNumber: recipient.phoneNumber?.trim() || undefined,
      address: {
        line1: recipient.address.line1.trim(),
        line2: recipient.address.line2?.trim() || undefined,
        townOrCity: recipient.address.townOrCity.trim(),
        stateOrCounty: recipient.address.stateOrCounty?.trim() || undefined,
        postalOrZipCode: recipient.address.postalOrZipCode.trim(),
        countryCode: recipient.address.countryCode.trim().toUpperCase(),
      },
    },
    items: items.map((it) => ({
      merchantReference: it.merchantReference?.trim() || undefined,
      sku: it.sku.trim(),
      quantity: it.quantity,
      sizing: it.sizing || "fillPrintArea",
      attributes: it.attributes,
      assets: it.assets.map((a) => ({
        printArea: a.printArea.trim(),
        url: a.url.trim(),
      })),
    })),
    metadata: body.metadata,
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error, details: result.data },
      { status: result.status }
    );
  }

  return NextResponse.json(
    {
      ok: true,
      apiVersion: "v5",
      environment: "sandbox",
      mode: body.submit ? "submitted" : "draft",
      order: result.data,
    },
    { status: 201 }
  );
}
