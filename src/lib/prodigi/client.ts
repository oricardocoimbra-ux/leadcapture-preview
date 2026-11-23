import crypto from "node:crypto";

/**
 * Prodigi Print API v4 — Server-side Sandbox-First Client
 *
 * Security & Launch Guardrails:
 * - Strictly server-only (never import in "use client" components).
 * - Disabled by default unless PRODIGI_ENABLED === "true" and PRODIGI_API_KEY is present.
 * - Defaults to Sandbox (https://api.sandbox.prodigi.com/v4.0).
 * - Live production orders remain hard-blocked in this pre-launch phase.
 */

export const PRODIGI_SANDBOX_BASE_URL = "https://api.sandbox.prodigi.com/v4.0";

export type ProdigiEnvironment = "sandbox" | "live";
export type ProdigiShippingMethod = "Budget" | "Standard" | "Express" | "Overnight";

export type QrPlaqueDestinationType =
  | "menu-digital"
  | "google-reviews"
  | "website"
  | "wifi"
  | "custom";

export interface QrPlaqueCustomizationSpec {
  destinationType: QrPlaqueDestinationType;
  destinationUrl: string;
  businessName: string;
  headline?: string;
  finish?: string;
  artworkUrl?: string;
}

export interface ProdigiAddress {
  line1: string;
  line2?: string;
  postalOrZipCode: string;
  countryCode: string; // ISO 3166-1 alpha-2, e.g. "PT"
  townOrCity: string;
  stateOrCounty?: string;
}

export interface ProdigiRecipient {
  name: string;
  email?: string;
  phoneNumber?: string;
  address: ProdigiAddress;
}

export interface ProdigiAsset {
  printArea: string;
  url: string;
  sizing?: "fillPrintArea" | "fitPrintArea" | "stretchToPrintArea";
}

export interface ProdigiQuoteItem {
  sku: string;
  copies: number;
  attributes?: Record<string, string>;
  assets: Array<{ printArea: string }>;
}

export interface ProdigiQuoteRequest {
  shippingMethod: ProdigiShippingMethod;
  destinationCountryCode: string;
  currencyCode?: string;
  items: ProdigiQuoteItem[];
}

export interface ProdigiOrderItem {
  merchantReference?: string;
  sku: string;
  copies: number;
  sizing?: "fillPrintArea" | "fitPrintArea" | "stretchToPrintArea";
  attributes?: Record<string, string>;
  assets: ProdigiAsset[];
}

export interface ProdigiOrderRequest {
  merchantReference: string;
  shippingMethod: ProdigiShippingMethod;
  idempotencyKey?: string;
  callbackUrl?: string;
  recipient: ProdigiRecipient;
  items: ProdigiOrderItem[];
  metadata?: Record<string, string>;
}

export interface ProdigiConfigStatus {
  enabled: boolean;
  environment: ProdigiEnvironment;
  sandboxOnly: boolean;
  apiKeyConfigured: boolean;
  webhookSecretConfigured: boolean;
  readyForSandboxRequests: boolean;
}

export interface ProdigiApiResult<T = unknown> {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
}

export function getProdigiConfigStatus(): ProdigiConfigStatus {
  const enabled = process.env.PRODIGI_ENABLED === "true";
  const rawEnv = (process.env.PRODIGI_ENV || "sandbox").trim().toLowerCase();
  const environment: ProdigiEnvironment = rawEnv === "live" ? "live" : "sandbox";
  const apiKeyConfigured = Boolean(process.env.PRODIGI_API_KEY?.trim());
  const webhookSecretConfigured = Boolean(process.env.PRODIGI_WEBHOOK_SECRET?.trim());
  const sandboxOnly = true; // Hard-locked to sandbox until explicit owner pre-launch approval

  return {
    enabled,
    environment,
    sandboxOnly,
    apiKeyConfigured,
    webhookSecretConfigured,
    readyForSandboxRequests: enabled && apiKeyConfigured && environment === "sandbox",
  };
}

function getSandboxHeaders(): Record<string, string> | null {
  const status = getProdigiConfigStatus();
  if (!status.readyForSandboxRequests) return null;
  const apiKey = process.env.PRODIGI_API_KEY?.trim();
  if (!apiKey) return null;

  return {
    "X-API-Key": apiKey,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

async function prodigiSandboxFetch<T = unknown>(
  path: string,
  init: RequestInit
): Promise<ProdigiApiResult<T>> {
  const status = getProdigiConfigStatus();
  if (!status.enabled || !status.apiKeyConfigured) {
    return {
      ok: false,
      status: 503,
      error:
        "A integração Prodigi encontra-se desativada neste ambiente. Nenhuma chamada externa foi executada.",
    };
  }

  if (status.environment !== "sandbox") {
    return {
      ok: false,
      status: 403,
      error:
        "O modo live da Prodigi está bloqueado nesta fase pré-lançamento. Utilize apenas o ambiente sandbox.",
    };
  }

  const headers = getSandboxHeaders();
  if (!headers) {
    return {
      ok: false,
      status: 503,
      error: "Credenciais Prodigi Sandbox não configuradas no servidor.",
    };
  }

  try {
    const res = await fetch(`${PRODIGI_SANDBOX_BASE_URL}${path}`, {
      ...init,
      headers: {
        ...headers,
        ...(init.headers as Record<string, string> | undefined),
      },
      cache: "no-store",
    });

    const data = (await res.json().catch(() => undefined)) as T | undefined;
    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        data,
        error: "A API Prodigi Sandbox devolveu um erro ao processar o pedido.",
      };
    }

    return { ok: true, status: res.status, data };
  } catch {
    return {
      ok: false,
      status: 502,
      error: "Não foi possível comunicar com a API Prodigi Sandbox.",
    };
  }
}

export async function getProdigiProduct(sku: string): Promise<ProdigiApiResult> {
  const cleanSku = sku.trim();
  if (!cleanSku) {
    return { ok: false, status: 400, error: "SKU Prodigi inválido." };
  }
  return prodigiSandboxFetch(`/products/${encodeURIComponent(cleanSku)}`, {
    method: "GET",
  });
}

export async function createProdigiQuote(
  payload: ProdigiQuoteRequest
): Promise<ProdigiApiResult> {
  return prodigiSandboxFetch("/quotes", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function createProdigiSandboxOrder(
  payload: ProdigiOrderRequest
): Promise<ProdigiApiResult> {
  const idempotencyKey =
    payload.idempotencyKey?.trim() ||
    crypto
      .createHash("sha256")
      .update(
        JSON.stringify({
          merchantReference: payload.merchantReference,
          items: payload.items,
          postal: payload.recipient.address.postalOrZipCode,
        })
      )
      .digest("hex")
      .slice(0, 64);

  const callbackUrl = payload.callbackUrl || process.env.PRODIGI_CALLBACK_URL?.trim() || undefined;

  return prodigiSandboxFetch("/orders", {
    method: "POST",
    body: JSON.stringify({
      ...payload,
      idempotencyKey,
      ...(callbackUrl ? { callbackUrl } : {}),
    }),
  });
}

export async function getProdigiOrder(orderId: string): Promise<ProdigiApiResult> {
  const cleanId = orderId.trim();
  if (!cleanId) {
    return { ok: false, status: 400, error: "Identificador de encomenda Prodigi inválido." };
  }
  return prodigiSandboxFetch(`/orders/${encodeURIComponent(cleanId)}`, {
    method: "GET",
  });
}
