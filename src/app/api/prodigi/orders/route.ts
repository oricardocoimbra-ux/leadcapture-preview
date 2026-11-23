import { NextRequest, NextResponse } from "next/server";
import {
  createProdigiSandboxOrder,
  getProdigiConfigStatus,
  type ProdigiOrderRequest,
  type ProdigiShippingMethod,
} from "@/lib/prodigi/client";

const MAX_BODY_BYTES = 12 * 1024;
const ALLOWED_SHIPPING_METHODS: ProdigiShippingMethod[] = [
  "Budget",
  "Standard",
  "Express",
  "Overnight",
];

function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === request.nextUrl.host;
  } catch {
    return false;
  }
}

async function readJsonWithCap(request: NextRequest): Promise<{ ok: true; data: unknown } | { ok: false; status: number; error: string }> {
  const declaredLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return { ok: false, status: 413, error: "Pedido demasiado grande." };
  }
  if (!request.body) {
    return { ok: false, status: 400, error: "Corpo do pedido vazio." };
  }
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;
      total += value.byteLength;
      if (total > MAX_BODY_BYTES) {
        await reader.cancel().catch(() => undefined);
        return { ok: false, status: 413, error: "Pedido demasiado grande." };
      }
      chunks.push(value);
    }
  } catch {
    return { ok: false, status: 400, error: "Não foi possível ler o pedido." };
  }
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const c of chunks) {
    merged.set(c, offset);
    offset += c.byteLength;
  }
  try {
    return { ok: true, data: JSON.parse(new TextDecoder("utf-8").decode(merged)) };
  } catch {
    return { ok: false, status: 400, error: "JSON inválido." };
  }
}

function isHttpsUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * POST /api/prodigi/orders
 * Strictly SANDBOX-ONLY and DISABLED BY DEFAULT.
 * Never places real production print orders or triggers payment charges.
 */
export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ ok: false, error: "Origem não autorizada." }, { status: 403 });
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json({ ok: false, error: "Tipo de conteúdo inválido." }, { status: 415 });
  }

  const parsed = await readJsonWithCap(request);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: parsed.status });
  }

  const body = (parsed.data ?? {}) as Partial<ProdigiOrderRequest>;
  const merchantReference = String(body.merchantReference || "").trim();
  const shippingMethod = (body.shippingMethod || "Standard") as ProdigiShippingMethod;
  const recipient = body.recipient;
  const items = Array.isArray(body.items) ? body.items : [];

  if (!merchantReference || merchantReference.length > 100) {
    return NextResponse.json(
      { ok: false, error: "Indique um merchantReference válido (até 100 caracteres)." },
      { status: 400 }
    );
  }
  if (!ALLOWED_SHIPPING_METHODS.includes(shippingMethod)) {
    return NextResponse.json({ ok: false, error: "Método de envio inválido." }, { status: 400 });
  }
  if (
    !recipient?.name?.trim() ||
    !recipient?.address?.line1?.trim() ||
    !recipient?.address?.townOrCity?.trim() ||
    !recipient?.address?.postalOrZipCode?.trim() ||
    !/^[A-Z]{2}$/.test(String(recipient?.address?.countryCode || "").trim().toUpperCase())
  ) {
    return NextResponse.json(
      { ok: false, error: "Morada de envio incompleta (nome, line1, localidade, código postal e país ISO-2)." },
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
    if (!it?.sku?.trim() || !Number.isInteger(it.copies) || it.copies < 1 || it.copies > 200) {
      return NextResponse.json(
        { ok: false, error: "Cada item requer SKU Prodigi válido e quantidade entre 1 e 200." },
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
        sandboxOnly: true,
        error:
          "A criação de encomendas Prodigi Sandbox está desativada neste ambiente. Nenhuma encomenda foi criada.",
      },
      { status: 503 }
    );
  }
  if (config.environment !== "sandbox") {
    return NextResponse.json(
      {
        ok: false,
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
    idempotencyKey: body.idempotencyKey,
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
      copies: it.copies,
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
    { ok: true, environment: "sandbox", order: result.data },
    { status: 201 }
  );
}
