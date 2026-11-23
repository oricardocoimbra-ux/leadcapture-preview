import { NextRequest, NextResponse } from "next/server";
import {
  createProdigiQuote,
  getProdigiConfigStatus,
  type ProdigiQuoteRequest,
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

  const body = (parsed.data ?? {}) as Partial<ProdigiQuoteRequest>;
  const destinationCountryCode = String(body.destinationCountryCode || "PT").trim().toUpperCase();
  const shippingMethod = (body.shippingMethod || "Standard") as ProdigiShippingMethod;
  const items = Array.isArray(body.items) ? body.items : [];

  if (!/^[A-Z]{2}$/.test(destinationCountryCode)) {
    return NextResponse.json(
      { ok: false, error: "Código de país ISO-2 inválido (ex.: PT)." },
      { status: 400 }
    );
  }
  if (!ALLOWED_SHIPPING_METHODS.includes(shippingMethod)) {
    return NextResponse.json(
      { ok: false, error: "Método de envio Prodigi inválido." },
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
    if (!it?.sku || typeof it.sku !== "string" || !Number.isInteger(it.copies) || it.copies < 1 || it.copies > 500) {
      return NextResponse.json(
        { ok: false, error: "Cada item deve incluir um SKU Prodigi válido e quantidade entre 1 e 500." },
        { status: 400 }
      );
    }
  }

  const config = getProdigiConfigStatus();
  if (!config.readyForSandboxRequests) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        sandboxOnly: true,
        error:
          "A cotação Prodigi Sandbox encontra-se desativada neste ambiente. Nenhuma chamada externa foi efetuada.",
      },
      { status: 503 }
    );
  }

  const result = await createProdigiQuote({
    destinationCountryCode,
    shippingMethod,
    currencyCode: typeof body.currencyCode === "string" ? body.currencyCode.trim().toUpperCase() : "EUR",
    items: items.map((it) => ({
      sku: it.sku.trim(),
      copies: it.copies,
      attributes: it.attributes,
      assets: Array.isArray(it.assets) && it.assets.length > 0 ? it.assets : [{ printArea: "default" }],
    })),
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error, details: result.data },
      { status: result.status }
    );
  }

  return NextResponse.json({ ok: true, environment: "sandbox", quote: result.data }, { status: 200 });
}
