import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { calculateCartFromCatalog, type CartLineInput } from "@/lib/billing/cart-calculator";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const items: CartLineInput[] = Array.isArray(body?.items) ? body.items : [];
    const customer = body?.customer ?? {};
    const contractAccepted = Boolean(body?.contractAccepted);
    const contractVersion = String(body?.contractVersion || "LC-CONTRATO-v1.0-2026");
    const recurringAuthorized = Boolean(body?.recurringAuthorized);

    if (!customer.email || !customer.fullName || !customer.nif) {
      return NextResponse.json(
        { error: "Dados obrigatórios de faturação em falta (Nome, Email, NIF)." },
        { status: 400 }
      );
    }

    if (!contractAccepted) {
      return NextResponse.json(
        { error: "A aceitação explícita do contrato é obrigatória." },
        { status: 400 }
      );
    }

    // Recalcular tudo exclusivamente no servidor a partir do catálogo central
    const summary = calculateCartFromCatalog(items);
    if (summary.dueTodayTotal <= 0) {
      return NextResponse.json(
        { error: "O carrinho não contém serviços válidos para compra online." },
        { status: 400 }
      );
    }

    if (summary.requiresRecurringAuthorization && !recurringAuthorized) {
      return NextResponse.json(
        { error: "É necessária autorização explícita para cobranças recorrentes." },
        { status: 400 }
      );
    }

    const idempotencyKey = crypto
      .createHash("sha256")
      .update(
        JSON.stringify({
          email: customer.email,
          items,
          contractVersion,
          minuteBucket: Math.floor(Date.now() / 60000),
        })
      )
      .digest("hex");

    const stripeConfigured = Boolean(process.env.STRIPE_SECRET_KEY);

    // Orquestração preparada para Stripe Payments & Billing (Test Mode)
    const orchestrationPlan = {
      mode: stripeConfigured ? "stripe_test_mode_ready" : "dry_run_no_stripe_key",
      orchestrationMode: summary.orchestrationMode,
      idempotencyKey,
      contractAcceptanceRecord: {
        version: contractVersion,
        acceptedAt: new Date().toISOString(),
        customerEmail: customer.email,
        nif: customer.nif,
      },
      obligations: {
        dueTodayEur: summary.dueTodayTotal,
        oneTimeEur: summary.oneTimeTotal,
        monthlyRecurringEur: summary.futureMonthlyTotal,
        annualInitialEur: summary.annualInitialTotal,
        annualRenewalEur: summary.futureAnnualTotal,
      },
      paymentMethodsAllowed: {
        oneTime: ["card", "mb_way", "multibanco"],
        recurring: ["card", "sepa_debit"],
      },
      annualSchedules: summary.annualLines.map((l) => ({
        productId: l.product.id,
        phase1AmountEur: l.initialLineTotal,
        phase2RenewalAmountEur: l.recurringLineTotal,
        note:
          l.product.setupFee && l.product.setupFee > 0
            ? "Stripe SubscriptionSchedule: Fase 1 cobra valor inicial + setup; Fase 2 renova pelo preço anual reduzido."
            : "Subscrição anual padrão.",
      })),
    };

    return NextResponse.json(orchestrationPlan, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Erro interno ao validar sessão de checkout." },
      { status: 500 }
    );
  }
}
