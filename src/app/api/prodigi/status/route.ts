import { NextResponse } from "next/server";
import { getProdigiConfigStatus } from "@/lib/prodigi/client";

/**
 * GET /api/prodigi/status
 * Read-only health/configuration status for Prodigi sandbox readiness.
 * Never returns API keys, tokens, or secrets.
 */
export async function GET() {
  const status = getProdigiConfigStatus();
  return NextResponse.json(
    {
      ok: true,
      prodigi: status,
      note: status.readyForSandboxRequests
        ? "Prodigi Sandbox pronto para testes técnicos (encomendas live continuam bloqueadas)."
        : "Integração Prodigi desativada por defeito. Nenhuma encomenda ou cotação externa está ativa.",
    },
    { status: 200 }
  );
}
