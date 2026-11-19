import { NextResponse } from "next/server";

const SUPPORTED_AUTOMATION_EVENTS = [
  "payment_intent.succeeded",
  "customer.subscription.created",
  "invoice.upcoming",
  "invoice.paid",
  "invoice.payment_failed",
  "payment_method.automatically_updated",
  "customer.subscription.deleted",
  "charge.refunded",
] as const;

export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json(
      {
        status: "webhook_not_configured",
        message: "STRIPE_WEBHOOK_SECRET em falta. Nenhuma ação executada.",
        supportedEvents: SUPPORTED_AUTOMATION_EVENTS,
      },
      { status: 503 }
    );
  }

  if (!signature) {
    return NextResponse.json({ error: "Cabeçalho stripe-signature em falta." }, { status: 400 });
  }

  // Nota: Na ativação do SDK Stripe, validar assinatura com stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  // e registar stripe_event_id na tabela public.billing_events para garantir idempotência.
  return NextResponse.json({ received: true }, { status: 200 });
}
