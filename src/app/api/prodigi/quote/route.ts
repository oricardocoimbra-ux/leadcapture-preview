import { NextRequest, NextResponse } from "next/server";
import {
  ALLOWED_PRODIGI_SHIPPING_METHODS,
  checkProvisionalProdigiRateLimit,
  createProdigiQuote,
  getProdigiConfigStatus,
  getTrustedClientIp,
  hasValidSameOrigin,
  readJsonWithByteCap,
  type ProdigiQuoteRequest,
  type ProdigiShippingMethod,
} from "@/lib/prodigi/client";

const QUOTE_MAX_REQ_PER_10_MIN = 15;

/**
 * POST /api/prodigi/quote
 * Prodigi Print API v5 (/v5/quotes/order) sandbox proxy — disabled by default.
 * Security: strict same-origin (rejects missing Origin/Referer), 12 KB streaming cap,
 * provisional per-IP rate limiting (replace with distributed store before launch).
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
  if (!checkProvisionalProdigiRateLimit("quote", clientIp, QUOTE_MAX_REQ_PER_10_MIN)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Demasiados pedidos de cotação num curto intervalo. Aguarde alguns minutos.",
      },
      { status: 429 }
    );
  }

  const parsed = await readJsonWithByteCap(request);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: parsed.status });
  }

  const body = (parsed.data ?? {}) as Partial<ProdigiQuoteRequest>;
  const destinationCountryCode = String(body.destinationCountryCode || "PT").trim().toUpperCase();
  const shippingMethod = String(body.shippingMethod || "standard")
    .trim()
    .toLowerCase() as ProdigiShippingMethod;
  const items = Array.isArray(body.items) ? body.items : [];

  if (!/^[A-Z]{2}$/.test(destinationCountryCode)) {
    return NextResponse.json(
      { ok: false, error: "Código de país ISO-2 inválido (ex.: PT)." },
      { status: 400 }
    );
  }
  if (!ALLOWED_PRODIGI_SHIPPING_METHODS.includes(shippingMethod)) {
    return NextResponse.json(
      { ok: false, error: "Método de envio Prodigi v5 inválido (budget, standard, express, overnight)." },
      { status: 400 }
    );
  }
  if (items.length === 0 || items.length > 20) {
    return NextResponse.json(
      { ok: false, error: "Indique entre 1 e 20 itens com SKU e quantidade válidos." },
      { status: 400 }
    );
  }

  for (const it of items) {
    const qty = typeof it?.quantity === "number" ? it.quantity : NaN;
    if (!it?.sku || typeof it.sku !== "string" || !Number.isInteger(qty) || qty < 1 || qty > 500) {
      return NextResponse.json(
        { ok: false, error: "Cada item deve incluir SKU Prodigi válido e quantity entre 1 e 500." },
        { status: 400 }
      );
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
          "A cotação Prodigi v5 Sandbox encontra-se desativada neste ambiente. Nenhuma chamada externa foi efetuada.",
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
          "O modo live da Prodigi está bloqueado. Utilize apenas uma chave sandbox_ em PRODIGI_ENV=sandbox.",
      },
      { status: 403 }
    );
  }

  const result = await createProdigiQuote({
    destinationCountryCode,
    shippingMethod,
    currencyCode:
      typeof body.currencyCode === "string" ? body.currencyCode.trim().toUpperCase() : "EUR",
    items: items.map((it) => ({
      sku: it.sku.trim(),
      quantity: it.quantity,
      attributes: it.attributes,
      assets:
        Array.isArray(it.assets) && it.assets.length > 0 ? it.assets : [{ printArea: "default" }],
    })),
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error, details: result.data },
      { status: result.status }
    );
  }

  return NextResponse.json(
    { ok: true, apiVersion: "v5", environment: "sandbox", quote: result.data },
    { status: 200 }
  );
}
