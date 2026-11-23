import { NextResponse } from "next/server";
import { getProdigiConfigStatus } from "@/lib/prodigi/client";

/**
 * GET /api/prodigi/status
 * Read-only health/configuration status for Prodigi Print API v5 sandbox readiness.
 * Never returns API keys, tokens, or secrets.
 */
export async function GET() {
  const status = getProdigiConfigStatus();
  return NextResponse.json(
    {
      ok: true,
      prodigi: status,
      note: status.readyForSandboxRequests
        ? "Prodigi Print API v5 Sandbox pronto para testes técnicos (chaves live_ continuam bloqueadas)."
        : "Integração Prodigi v5 desativada por defeito. Nenhuma encomenda ou cotação externa está ativa.",
    },
    { status: 200 }
  );
}
