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
}

/**
 * PROVISIONAL IN-MEMORY RATE LIMIT (NOT PRODUCTION-GRADE PROTECTION).
 * On serverless runtimes (Vercel Functions), memory is isolated per instance
 * and resets across cold starts. Before public launch, replace or complement
 * with distributed rate limiting (e.g. Upstash/KV) and Cloudflare Turnstile.
 */
const PROVISIONAL_WINDOW_MS = 10 * 60 * 1000;
const PROVISIONAL_MAX_REQUESTS = 5;
const provisionalRateStore = new Map<string, { count: number; resetAt: number }>();

function checkProvisionalRateLimit(clientKey: string): boolean {
  const now = Date.now();
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

export async function POST(request: NextRequest) {
  let body: FormSubmitPayload;
  try {
    body = (await request.json()) as FormSubmitPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Pedido inválido (JSON malformado)." },
      { status: 400 }
    );
  }

  // Honeypot check: silently acknowledge without sending email if filled by a bot.
  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true, ignored: true }, { status: 200 });
  }

  // Provisional in-memory rate limiting per client IP.
  const forwardedFor = request.headers.get("x-forwarded-for") || "";
  const clientIp = forwardedFor.split(",")[0]?.trim() || "unknown";
  if (!checkProvisionalRateLimit(clientIp)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Demasiados pedidos num curto intervalo. Aguarde alguns minutos antes de tentar novamente.",
      },
      { status: 429 }
    );
  }

  // Server-side validation (runs regardless of whether sending is enabled).
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

  // Keep sending disabled unless explicitly enabled and configured via server env vars.
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
    // Brevo Transactional Email API (DKIM1/DKIM2 + DMARC already authenticated on leadcapture.cloud).
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
