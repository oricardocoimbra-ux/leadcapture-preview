import { NextRequest, NextResponse } from "next/server";
import { getProdigiConfigStatus, verifyHmacSignature } from "@/lib/prodigi/client";

const MAX_BODY_BYTES = 32 * 1024;
const MAX_TIMESTAMP_DRIFT_SECONDS = 5 * 60;

async function readRawBodyWithCap(
  request: NextRequest,
  maxBytes: number
): Promise<{ ok: true; raw: string } | { ok: false; status: number; error: string }> {
  const declaredLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    return { ok: false, status: 413, error: "Payload demasiado grande." };
  }
  if (!request.body) {
    return { ok: false, status: 400, error: "Corpo de webhook vazio." };
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
      if (total > maxBytes) {
        await reader.cancel().catch(() => undefined);
        return { ok: false, status: 413, error: "Payload demasiado grande." };
      }
      chunks.push(value);
    }
  } catch {
    return { ok: false, status: 400, error: "Não foi possível ler o webhook." };
  }
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const c of chunks) {
    merged.set(c, offset);
    offset += c.byteLength;
  }
  return { ok: true, raw: new TextDecoder("utf-8").decode(merged) };
}

/**
 * POST /api/webhooks/prodigi
 * Receives asynchronous Prodigi v5 webhook subscriptions.
 *
 * Security:
 * - Disabled by default (503 when PRODIGI_ENABLED !== "true" or PRODIGI_WEBHOOK_SECRET missing).
 * - NEVER accepts secrets in query strings.
 * - Verifies HMAC-SHA256 signature header (`webhook-signature` or `x-prodigi-signature`) over
 *   the raw, unparsed request body bytes (plus replay timestamp window check when present).
 * - Does not write to any database in this pre-launch phase.
 */
export async function POST(request: NextRequest) {
  const config = getProdigiConfigStatus();
  const webhookSecret = process.env.PRODIGI_WEBHOOK_SECRET?.trim() || "";

  if (!config.enabled || !webhookSecret) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        message:
          "Webhook Prodigi v5 desativado neste ambiente (PRODIGI_ENABLED ou PRODIGI_WEBHOOK_SECRET não configurados).",
      },
      { status: 503 }
    );
  }

  const signatureHeader =
    request.headers.get("webhook-signature") ||
    request.headers.get("x-prodigi-signature") ||
    "";
  const webhookId = request.headers.get("webhook-id");
  const webhookTimestamp = request.headers.get("webhook-timestamp");

  if (!signatureHeader.trim()) {
    return NextResponse.json(
      { ok: false, error: "Cabeçalho de assinatura HMAC em falta." },
      { status: 401 }
    );
  }

  if (webhookTimestamp) {
    const ts = Number(webhookTimestamp);
    const nowSec = Math.floor(Date.now() / 1000);
    if (!Number.isFinite(ts) || Math.abs(nowSec - ts) > MAX_TIMESTAMP_DRIFT_SECONDS) {
      return NextResponse.json(
        { ok: false, error: "Timestamp de webhook expirado ou inválido." },
        { status: 401 }
      );
    }
  }

  const bodyResult = await readRawBodyWithCap(request, MAX_BODY_BYTES);
  if (!bodyResult.ok) {
    return NextResponse.json({ ok: false, error: bodyResult.error }, { status: bodyResult.status });
  }

  const signatureValid = verifyHmacSignature(
    bodyResult.raw,
    webhookSecret,
    signatureHeader,
    webhookId,
    webhookTimestamp
  );

  if (!signatureValid) {
    return NextResponse.json({ ok: false, error: "Assinatura de webhook inválida." }, { status: 401 });
  }

  try {
    const event = JSON.parse(bodyResult.raw) as {
      id?: string;
      type?: string;
      data?: { order?: { id?: string; status?: { stage?: string } } };
    };

    return NextResponse.json(
      {
        ok: true,
        received: true,
        persisted: false,
        apiVersion: "v5",
        environment: config.environment,
        eventType: event?.type || "unknown",
        orderId: event?.data?.order?.id || null,
        stage: event?.data?.order?.status?.stage || null,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ ok: false, error: "JSON de webhook inválido." }, { status: 400 });
  }
}
