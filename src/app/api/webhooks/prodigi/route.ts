import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getProdigiConfigStatus } from "@/lib/prodigi/client";

const MAX_BODY_BYTES = 32 * 1024;

function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

/**
 * POST /api/webhooks/prodigi
 * Receives asynchronous Prodigi Sandbox order status callbacks (CloudEvents).
 * Disabled by default; does not write to any database in this pre-launch phase.
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
          "Webhook Prodigi desativado neste ambiente (PRODIGI_ENABLED ou PRODIGI_WEBHOOK_SECRET não configurados).",
      },
      { status: 503 }
    );
  }

  const providedToken =
    request.headers.get("x-prodigi-webhook-token")?.trim() ||
    request.nextUrl.searchParams.get("token")?.trim() ||
    "";

  if (!providedToken || !safeEqual(providedToken, webhookSecret)) {
    return NextResponse.json({ ok: false, error: "Token de webhook inválido." }, { status: 401 });
  }

  const declaredLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Payload demasiado grande." }, { status: 413 });
  }

  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: "Payload demasiado grande." }, { status: 413 });
    }
    const event = JSON.parse(raw) as {
      id?: string;
      type?: string;
      data?: { order?: { id?: string; status?: { stage?: string } } };
    };

    return NextResponse.json(
      {
        ok: true,
        received: true,
        persisted: false,
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
