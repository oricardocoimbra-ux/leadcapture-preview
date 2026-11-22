import { NextRequest, NextResponse } from "next/server";
import { isValidEmail, isValidPhone } from "@/lib/form-validation";

type FormType = "contactos" | "orcamento" | "demonstracao";

interface FormSubmitPayload {
  formType?: FormType;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  subject?: string;
  sector?: string;
  projectType?: string;
  services?: string[];
  message?: string;
  /** Honeypot anti-spam field — must remain empty for human submissions. */
  website?: string;
  /** Client timestamp (ms) when the form mounted — used for minimum fill-time bot check. */
  formStartedAt?: number;
  /** Optional Cloudflare Turnstile token (enforced automatically if TURNSTILE_SECRET_KEY is set). */
  turnstileToken?: string;
}

const MAX_BODY_BYTES = 12 * 1024; // 12 KB max JSON payload
const MIN_FILL_TIME_MS = 2500; // Reject sub-2.5s instant bot submissions
const MAX_URLS_IN_MESSAGE = 4;

/**
 * PROVISIONAL IN-MEMORY RATE LIMIT (NOT PRODUCTION-GRADE PROTECTION).
 * On serverless runtimes (Vercel Functions), memory is isolated per instance
 * and resets across cold starts. Before public launch, replace or complement
 * with distributed rate limiting (e.g. Upstash/KV) and Cloudflare Turnstile.
 */
const PROVISIONAL_WINDOW_MS = 10 * 60 * 1000;
const PROVISIONAL_MAX_REQUESTS = 5;
const PROVISIONAL_MAX_ENTRIES = 500;
const provisionalRateStore = new Map<string, { count: number; resetAt: number }>();

function checkProvisionalRateLimit(clientKey: string): boolean {
  const now = Date.now();
  if (provisionalRateStore.size >= PROVISIONAL_MAX_ENTRIES) {
    for (const [key, value] of provisionalRateStore.entries()) {
      if (now > value.resetAt) provisionalRateStore.delete(key);
    }
    if (provisionalRateStore.size >= PROVISIONAL_MAX_ENTRIES) {
      const oldestKey = provisionalRateStore.keys().next().value;
      if (oldestKey) provisionalRateStore.delete(oldestKey);
    }
  }

  const entry = provisionalRateStore.get(clientKey);
  if (!entry || now > entry.resetAt) {
    provisionalRateStore.set(clientKey, { count: 1, resetAt: now + PROVISIONAL_WINDOW_MS });
    return true;
  }
  if (entry.count >= PROVISIONAL_MAX_REQUESTS) {
    return false;
  }
  entry.count += 1;
  return true;
}

function isSameOriginRequest(request: NextRequest): boolean {
  const host = request.headers.get("host")?.toLowerCase();
  if (!host) return false;

  const origin = request.headers.get("origin");
  if (origin) {
    try {
      return new URL(origin).host.toLowerCase() === host;
    } catch {
      return false;
    }
  }

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      return new URL(referer).host.toLowerCase() === host;
    } catch {
      return false;
    }
  }

  return false;
}

function countUrls(text: string): number {
  const matches = text.match(/https?:\/\/|www\./gi);
  return matches ? matches.length : 0;
}

function sanitizeLine(value: unknown, maxLength = 200): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, maxLength);
}

function sanitizeMultiline(value: unknown, maxLength = 3000): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function isFormEmailEnabled(): boolean {
  return process.env.FORMS_ENABLED === "true" && Boolean(process.env.BREVO_API_KEY?.trim());
}

async function verifyTurnstileIfConfigured(token: string, clientIp: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) return true; // Not configured yet — skip until launch setup
  if (!token) return false;

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: token,
        ...(clientIp !== "unknown" ? { remoteip: clientIp } : {}),
      }),
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

function getTrustedClientIp(request: NextRequest): string {
  // Prefer platform-set headers (not client-spoofable on Vercel Edge) before x-forwarded-for.
  const vercelIp = request.headers.get("x-vercel-forwarded-for");
  if (vercelIp) {
    const first = vercelIp.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const cfIp = request.headers.get("cf-connecting-ip")?.trim();
  if (cfIp) return cfIp;

  // Fallback: rightmost entry in x-forwarded-for (appended by the closest trusted proxy).
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const parts = forwardedFor
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
    if (parts.length > 0) return parts[parts.length - 1];
  }

  return "unknown";
}

async function readBodyWithByteLimit(
  request: NextRequest,
  maxBytes: number
): Promise<{ ok: true; text: string } | { ok: false; status: 400 | 413; error: string }> {
  // Fast-reject declared oversized payloads before reading any stream bytes.
  const declaredLength = request.headers.get("content-length");
  if (declaredLength !== null) {
    const parsedLength = Number(declaredLength);
    if (Number.isFinite(parsedLength) && parsedLength > maxBytes) {
      return { ok: false, status: 413, error: "Pedido demasiado grande." };
    }
  }

  if (!request.body) {
    return { ok: false, status: 400, error: "Corpo do pedido em falta." };
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;

      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        await reader.cancel().catch(() => undefined);
        return { ok: false, status: 413, error: "Pedido demasiado grande." };
      }
      chunks.push(value);
    }
  } catch {
    return { ok: false, status: 400, error: "Não foi possível ler o pedido." };
  }

  const merged = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return { ok: true, text: new TextDecoder("utf-8").decode(merged) };
}

export async function POST(request: NextRequest) {
  // 1. Same-origin / CSRF protection against cross-site automated POSTs.
  if (!isSameOriginRequest(request)) {
    return NextResponse.json(
      { ok: false, error: "Origem do pedido não autorizada." },
      { status: 403 }
    );
  }

  // 2. Require JSON content type and enforce strict 12 KB cap BEFORE buffering full body.
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json(
      { ok: false, error: "Tipo de conteúdo inválido." },
      { status: 415 }
    );
  }

  const bodyResult = await readBodyWithByteLimit(request, MAX_BODY_BYTES);
  if (!bodyResult.ok) {
    return NextResponse.json({ ok: false, error: bodyResult.error }, { status: bodyResult.status });
  }

  let body: FormSubmitPayload;
  try {
    body = JSON.parse(bodyResult.text) as FormSubmitPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Pedido inválido (JSON malformado)." },
      { status: 400 }
    );
  }

  // 3. Honeypot check: silently ignore bots without sending email.
  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true, ignored: true }, { status: 200 });
  }

  // 4. Minimum human fill-time check: silently ignore instant bot submissions (< 2.5s).
  if (
    typeof body.formStartedAt === "number" &&
    Number.isFinite(body.formStartedAt) &&
    Date.now() - body.formStartedAt < MIN_FILL_TIME_MS
  ) {
    return NextResponse.json({ ok: true, ignored: true }, { status: 200 });
  }

  // 5. Provisional in-memory rate limiting per trusted client IP (bounded Map, serverless-provisional).
  const clientIp = getTrustedClientIp(request);
  if (!checkProvisionalRateLimit(clientIp)) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Demasiados pedidos num curto intervalo. Aguarde alguns minutos antes de tentar novamente.",
      },
      { status: 429 }
    );
  }

  // 6. Optional Cloudflare Turnstile verification (active automatically once TURNSTILE_SECRET_KEY is set).
  const turnstileOk = await verifyTurnstileIfConfigured(
    sanitizeLine(body.turnstileToken, 2048),
    clientIp
  );
  if (!turnstileOk) {
    return NextResponse.json(
      { ok: false, error: "Falha na verificação anti-spam. Atualize a página e tente novamente." },
      { status: 400 }
    );
  }

  // 7. Server-side validation (runs regardless of whether sending is enabled).
  const formType: FormType =
    body.formType === "orcamento" || body.formType === "demonstracao"
      ? body.formType
      : "contactos";

  const name = sanitizeLine(body.name, 120);
  const email = sanitizeLine(body.email, 160);
  const phone = sanitizeLine(body.phone, 40);
  const company = sanitizeLine(body.company, 120);
  const subject = sanitizeLine(body.subject, 120);
  const sector = sanitizeLine(body.sector, 80);
  const projectType = sanitizeLine(body.projectType, 80);
  const message = sanitizeMultiline(body.message, 3000);
  const services = Array.isArray(body.services)
    ? body.services.map((s) => sanitizeLine(s, 80)).filter(Boolean).slice(0, 15)
    : [];

  const fieldErrors: Record<string, string> = {};
  if (name.length < 2) {
    fieldErrors.name = "Indique o seu nome completo (mínimo 2 caracteres).";
  }
  if (!isValidEmail(email)) {
    fieldErrors.email = "Introduza um endereço de email válido.";
  }
  if (countUrls(message) > MAX_URLS_IN_MESSAGE) {
    fieldErrors.message = "A mensagem contém demasiados links. Remova links desnecessários.";
  }

  if (formType === "contactos") {
    if (phone.length > 0 && !isValidPhone(phone)) {
      fieldErrors.phone = "Introduza um número de telefone válido (mínimo 9 dígitos).";
    }
    if (message.length < 10) {
      fieldErrors.message = "Escreva uma mensagem com pelo menos 10 caracteres.";
    }
  } else if (formType === "orcamento") {
    if (!isValidPhone(phone)) {
      fieldErrors.phone = "Introduza um número de telefone ou WhatsApp válido.";
    }
    if (!sector) {
      fieldErrors.sector = "Selecione o setor de atividade.";
    }
    if (message.length < 15) {
      fieldErrors.message = "Descreva o projeto ou objetivos (mínimo 15 caracteres).";
    }
  } else if (formType === "demonstracao") {
    if (!isValidPhone(phone)) {
      fieldErrors.phone = "Introduza um número de telefone ou WhatsApp válido.";
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { ok: false, error: "Existem campos por corrigir.", fieldErrors },
      { status: 400 }
    );
  }

  // 8. Keep sending disabled unless explicitly enabled and configured via server env vars.
  // Submissions are NOT persisted in any database.
  if (!isFormEmailEnabled()) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        error:
          "O envio de formulários encontra-se desativado neste ambiente. O pedido ainda não foi enviado nem guardado.",
      },
      { status: 503 }
    );
  }

  const fromEmail = sanitizeLine(process.env.FORMS_FROM_EMAIL || "geral@leadcapture.cloud", 160);
  const fromName = sanitizeLine(process.env.FORMS_FROM_NAME || "LeadCapture", 100);
  const toEmail = sanitizeLine(process.env.FORMS_TO_EMAIL || "geral@leadcapture.cloud", 160);
  const brevoApiKey = process.env.BREVO_API_KEY!.trim();

  const typeLabels: Record<FormType, string> = {
    contactos: "Novo Contacto",
    orcamento: "Novo Pedido de Orçamento",
    demonstracao: "Novo Pedido de Demonstração",
  };

  const emailSubject = `[LeadCapture] ${typeLabels[formType]} — ${name}`;
  const textLines = [
    `Tipo de formulário: ${typeLabels[formType]}`,
    `Nome: ${name}`,
    `Email (Reply-To): ${email}`,
    phone ? `Telefone / WhatsApp: ${phone}` : null,
    company ? `Empresa: ${company}` : null,
    subject ? `Assunto: ${subject}` : null,
    sector ? `Setor: ${sector}` : null,
    projectType ? `Tipo de Projeto: ${projectType}` : null,
    services.length > 0 ? `Serviços selecionados: ${services.join(", ")}` : null,
    "",
    "Mensagem / Objetivos:",
    message || "(sem observações adicionais)",
  ].filter((line): line is string => line !== null);

  try {
    // Brevo Transactional Email API (LeadCapture <geral@leadcapture.cloud> verified sender).
    // Fixed authorized sender, fixed recipient (geral@leadcapture.cloud), visitor email ONLY in replyTo.
    const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": brevoApiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: fromName, email: fromEmail },
        to: [{ email: toEmail, name: "LeadCapture" }],
        replyTo: { email, name },
        subject: emailSubject,
        textContent: textLines.join("\n"),
      }),
    });

    if (!brevoRes.ok) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Não foi possível enviar o pedido através do serviço de email. Tente novamente mais tarde.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { ok: true, sent: true, message: "Pedido enviado com sucesso." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Erro de comunicação ao enviar o pedido. Tente novamente mais tarde.",
      },
      { status: 502 }
    );
  }
}
