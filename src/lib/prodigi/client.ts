import type { NextRequest } from "next/server";

/**
 * Prodigi Print API v5 — Server-side Sandbox-First Client
 *
 * Official v5 Architecture (recommended by Prodigi for all new integrations):
 * - Unified Base URL: https://api.prodigi.com/v5
 * - Environment determined by X-API-Key prefix: `sandbox_...` vs `live_...`
 * - Draft-first order lifecycle: POST /v5/orders (submit defaults to false)
 * - Quoting endpoint: POST /v5/quotes/order
 * - Idempotency: passed via `Idempotency-Key` HTTP header per purchase attempt
 * - Order status tracking: server-side polling via GET /v5/orders/{id} (v5 does not support webhook subscriptions)
 *
 * Security & Launch Guardrails:
 * - Strictly server-only (never import in "use client" components).
 * - Disabled by default unless PRODIGI_ENABLED === "true" and a `sandbox_` API key is set.
 * - Live (`live_`) keys and `PRODIGI_ENV=live` are hard-blocked until explicit owner approval.
 */

export const PRODIGI_V5_BASE_URL = "https://api.prodigi.com/v5";

export type ProdigiEnvironment = "sandbox" | "live";
export type ProdigiShippingMethod =
  | "budget"
  | "standard"
  | "standardplus"
  | "express"
  | "overnight";

export const ALLOWED_PRODIGI_SHIPPING_METHODS: ProdigiShippingMethod[] = [
  "budget",
  "standard",
  "standardplus",
  "express",
  "overnight",
];

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
  quantity: number;
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
  quantity: number;
  sizing?: "fillPrintArea" | "fitPrintArea" | "stretchToPrintArea";
  attributes?: Record<string, string>;
  assets: ProdigiAsset[];
}

export interface ProdigiOrderRequest {
  merchantReference: string;
  shippingMethod: ProdigiShippingMethod;
  /** Caller-supplied unique key per purchase attempt (reused only on retries of the same attempt). */
  idempotencyKey: string;
  /** Draft-first in v5: defaults to false (draft). Set true only when explicitly submitting in sandbox. */
  submit?: boolean;
  recipient: ProdigiRecipient;
  items: ProdigiOrderItem[];
  metadata?: Record<string, string>;
}

export interface ProdigiConfigStatus {
  apiVersion: "v5";
  baseUrl: string;
  enabled: boolean;
  environment: ProdigiEnvironment;
  sandboxOnly: boolean;
  apiKeyConfigured: boolean;
  sandboxKeyPrefixValid: boolean;
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
  const apiKey = process.env.PRODIGI_API_KEY?.trim() || "";
  const apiKeyConfigured = Boolean(apiKey);
  const sandboxKeyPrefixValid = apiKey.startsWith("sandbox_");
  const sandboxOnly = true; // Hard-locked to sandbox until explicit owner pre-launch approval

  return {
    apiVersion: "v5",
    baseUrl: PRODIGI_V5_BASE_URL,
    enabled,
    environment,
    sandboxOnly,
    apiKeyConfigured,
    sandboxKeyPrefixValid,
    readyForSandboxRequests:
      enabled && apiKeyConfigured && sandboxKeyPrefixValid && environment === "sandbox",
  };
}

function getSandboxHeaders(extra?: Record<string, string>): Record<string, string> | null {
  const status = getProdigiConfigStatus();
  if (!status.readyForSandboxRequests) return null;
  const apiKey = process.env.PRODIGI_API_KEY?.trim() || "";
  if (!apiKey.startsWith("sandbox_")) return null;

  return {
    "X-API-Key": apiKey,
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(extra ?? {}),
  };
}

async function prodigiV5SandboxFetch<T = unknown>(
  path: string,
  init: RequestInit,
  extraHeaders?: Record<string, string>
): Promise<ProdigiApiResult<T>> {
  const status = getProdigiConfigStatus();
  if (!status.enabled || !status.apiKeyConfigured) {
    return {
      ok: false,
      status: 503,
      error:
        "A integração Prodigi v5 encontra-se desativada neste ambiente. Nenhuma chamada externa foi executada.",
    };
  }

  if (status.environment !== "sandbox" || !status.sandboxKeyPrefixValid) {
    return {
      ok: false,
      status: 403,
      error:
        "O modo live da Prodigi está bloqueado nesta fase pré-lançamento. Utilize apenas uma chave com prefixo sandbox_ em PRODIGI_ENV=sandbox.",
    };
  }

  const headers = getSandboxHeaders(extraHeaders);
  if (!headers) {
    return {
      ok: false,
      status: 503,
      error: "Credenciais Prodigi v5 Sandbox não configuradas no servidor.",
    };
  }

  try {
    const res = await fetch(`${PRODIGI_V5_BASE_URL}${path}`, {
      ...init,
      headers,
      cache: "no-store",
    });

    const data = (await res.json().catch(() => undefined)) as T | undefined;
    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        data,
        error: "A API Prodigi v5 Sandbox devolveu um erro ao processar o pedido.",
      };
    }

    return { ok: true, status: res.status, data };
  } catch {
    return {
      ok: false,
      status: 502,
      error: "Não foi possível comunicar com a API Prodigi v5 Sandbox.",
    };
  }
}

export async function getProdigiProduct(sku: string): Promise<ProdigiApiResult> {
  const cleanSku = sku.trim();
  if (!cleanSku) {
    return { ok: false, status: 400, error: "SKU Prodigi inválido." };
  }
  return prodigiV5SandboxFetch(`/products/${encodeURIComponent(cleanSku)}`, {
    method: "GET",
  });
}

export async function createProdigiQuote(
  payload: ProdigiQuoteRequest
): Promise<ProdigiApiResult> {
  return prodigiV5SandboxFetch("/quotes/order", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function createProdigiSandboxOrder(
  payload: ProdigiOrderRequest
): Promise<ProdigiApiResult> {
  const idempotencyKey = payload.idempotencyKey.trim();
  if (!isValidIdempotencyKey(idempotencyKey)) {
    return {
      ok: false,
      status: 400,
      error:
        "Idempotency-Key obrigatório (16 a 128 caracteres alfanuméricos, hífen ou underscore) único por tentativa de compra.",
    };
  }

  const { idempotencyKey: _omit, ...bodyPayload } = payload;
  void _omit;

  return prodigiV5SandboxFetch(
    "/orders",
    {
      method: "POST",
      body: JSON.stringify({
        ...bodyPayload,
        submit: Boolean(bodyPayload.submit),
      }),
    },
    { "Idempotency-Key": idempotencyKey }
  );
}

export async function getProdigiOrder(orderId: string): Promise<ProdigiApiResult> {
  const cleanId = orderId.trim();
  if (!cleanId) {
    return { ok: false, status: 400, error: "Identificador de encomenda Prodigi inválido." };
  }
  return prodigiV5SandboxFetch(`/orders/${encodeURIComponent(cleanId)}`, {
    method: "GET",
  });
}

/* ---------- Shared Route Security Helpers ---------- */

export function isValidIdempotencyKey(key: string): boolean {
  return /^[A-Za-z0-9_-]{16,128}$/.test(key);
}

/**
 * Strict same-origin check: requires a valid Origin (or Referer fallback) matching request.nextUrl.host.
 * Requests without Origin AND without Referer are REJECTED (403) to block direct automated POST abuse.
 */
export function hasValidSameOrigin(request: NextRequest): boolean {
  const expectedHost = request.nextUrl.host;
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      return new URL(origin).host === expectedHost;
    } catch {
      return false;
    }
  }
  const referer = request.headers.get("referer");
  if (referer) {
    try {
      return new URL(referer).host === expectedHost;
    } catch {
      return false;
    }
  }
  return false;
}

/**
 * Extract client IP preferring trusted proxy headers over spoofable leftmost X-Forwarded-For.
 */
export function getTrustedClientIp(request: NextRequest): string {
  const vercelFwd = request.headers.get("x-vercel-forwarded-for");
  if (vercelFwd) {
    const ip = vercelFwd.split(",")[0]?.trim();
    if (ip) return ip;
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const cfIp = request.headers.get("cf-connecting-ip")?.trim();
  if (cfIp) return cfIp;
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const parts = xff.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length > 0) return parts[parts.length - 1];
  }
  return "unknown";
}

/**
 * Bounded provisional in-memory rate limiter (per serverless instance).
 * NOTE: Provisional abuse protection only — replace with distributed store (Upstash/Redis)
 * and authenticated checkout/admin sessions before production launch.
 */
interface RateBucket {
  count: number;
  resetAt: number;
}

const RATE_BUCKETS = new Map<string, RateBucket>();
const MAX_TRACKED_KEYS = 500;

export function checkProvisionalProdigiRateLimit(
  scope: "quote" | "orders",
  ip: string,
  maxRequests: number,
  windowMs = 10 * 60 * 1000
): boolean {
  const now = Date.now();
  const key = `${scope}:${ip}`;
  const existing = RATE_BUCKETS.get(key);

  if (!existing || now > existing.resetAt) {
    if (RATE_BUCKETS.size >= MAX_TRACKED_KEYS) {
      for (const [k, v] of RATE_BUCKETS.entries()) {
        if (now > v.resetAt) RATE_BUCKETS.delete(k);
      }
      if (RATE_BUCKETS.size >= MAX_TRACKED_KEYS) {
        const oldest = RATE_BUCKETS.keys().next().value;
        if (oldest) RATE_BUCKETS.delete(oldest);
      }
    }
    RATE_BUCKETS.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (existing.count >= maxRequests) return false;
  existing.count += 1;
  return true;
}

export async function readJsonWithByteCap(
  request: NextRequest,
  maxBytes = 12 * 1024
): Promise<{ ok: true; data: unknown } | { ok: false; status: number; error: string }> {
  const declaredLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
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
      if (total > maxBytes) {
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
