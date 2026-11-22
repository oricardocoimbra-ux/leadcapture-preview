"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Info, Loader2, Lock, ShieldCheck } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { isValidEmail, isValidPhone, isValidPortugueseNif } from "@/lib/form-validation";

export default function CheckoutPage() {
  const { items, summary, totalCount } = useCart();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nif, setNif] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [serviceNotes, setServiceNotes] = useState("");
  const [acceptContract, setAcceptContract] = useState(false);
  const [acceptRecurring, setAcceptRecurring] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [serverResult, setServerResult] = useState<Record<string, unknown> | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (fullName.trim().length < 2) {
      setErrorMsg("Indique o nome completo para faturação.");
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMsg("Introduza um endereço de email válido.");
      return;
    }
    if (!isValidPhone(phone)) {
      setErrorMsg("Introduza um número de telefone válido (mínimo 9 dígitos).");
      return;
    }
    if (!isValidPortugueseNif(nif)) {
      setErrorMsg("Introduza um NIF válido com 9 dígitos.");
      return;
    }
    if (companyName.trim().length < 2 || billingAddress.trim().length < 5) {
      setErrorMsg("Preencha o nome da empresa e a morada de faturação.");
      return;
    }
    if (!acceptContract) {
      setErrorMsg("É obrigatório aceitar as condições comerciais e o contrato aplicável.");
      return;
    }
    if (summary.requiresRecurringAuthorization && !acceptRecurring) {
      setErrorMsg("É obrigatório autorizar a cobrança recorrente para subscrições.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customer: { fullName, email, phone, nif, companyName, billingAddress, serviceNotes },
          contractAccepted: acceptContract,
          contractVersion: "LC-CONTRATO-v1.0-2026",
          recurringAuthorized: acceptRecurring,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Erro ao validar checkout.");
      } else {
        setServerResult(data);
      }
    } catch {
      setErrorMsg("Erro de comunicação ao validar encomenda.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-10 pb-20 px-4 sm:px-6 lg:px-8 lc-glow-ambient">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={[{ label: "Carrinho", href: "/carrinho" }, { label: "Checkout" }]} />

        <div className="max-w-3xl space-y-2 mb-8">
          <span className="text-xs font-bold tracking-widest uppercase text-[#F5B800]">
            Checkout Seguro — Stripe Test Mode
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Finalizar Encomenda e Contratação
          </h1>
          <p className="text-sm text-zinc-400">
            Já tem conta?{" "}
            <Link href="/login" className="text-[#F5B800] font-semibold hover:underline">
              Iniciar sessão (Email ou Google)
            </Link>{" "}
            ou{" "}
            <Link href="/registar" className="text-[#F5B800] font-semibold hover:underline">
              criar conta
            </Link>{" "}
            para associar à Área de Cliente.
          </p>
        </div>

        {totalCount === 0 ? (
          <div className="lc-card rounded-3xl p-8 text-center space-y-4">
            <p className="text-zinc-300">Não existem serviços no carrinho para checkout.</p>
            <Link href="/carrinho" className="lc-btn-primary px-6 py-3 text-sm inline-block">
              Ir para o Carrinho
            </Link>
          </div>
        ) : serverResult ? (
          <div role="status" aria-live="polite" className="lc-card-featured rounded-3xl p-8 space-y-4">
            <div className="flex items-center gap-3 text-[#F5B800]">
              <CheckCircle2 className="w-7 h-7" />
              <h2 className="text-2xl font-extrabold text-white">
                Sessão Validada no Servidor (Modo de Teste — Sem Cobrança)
              </h2>
            </div>
            <p className="text-sm text-zinc-300">
              Todos os preços foram recalculados no servidor a partir do catálogo central e a
              aceitação contratual foi registada. Como o checkout real ainda não está ativado,
              nenhuma cobrança foi efetuada e nenhuma encomenda real foi submetida.
            </p>
            <pre className="p-4 rounded-xl bg-[#050507] border border-white/10 text-xs text-amber-200 overflow-x-auto">
              {JSON.stringify(serverResult, null, 2)}
            </pre>
            <Link href="/area-cliente" className="lc-btn-secondary px-5 py-2.5 text-xs inline-block">
              Ver Área de Cliente
            </Link>
          </div>
        ) : (
          <form onSubmit={handleCheckout} noValidate aria-busy={submitting} className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Billing & Customer Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="lc-card rounded-3xl p-6 sm:p-8 space-y-4">
                <h2 className="text-xl font-bold text-white">Dados de Faturação e Serviço</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="checkout-name" className="block text-xs font-semibold text-zinc-200 mb-1.5">
                      Nome Completo <span className="text-[#F5B800]">*</span>
                    </label>
                    <input
                      id="checkout-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="lc-input text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-email" className="block text-xs font-semibold text-zinc-200 mb-1.5">
                      Email <span className="text-[#F5B800]">*</span>
                    </label>
                    <input
                      id="checkout-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="lc-input text-sm"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="checkout-phone" className="block text-xs font-semibold text-zinc-200 mb-1.5">
                      Telefone <span className="text-[#F5B800]">*</span>
                    </label>
                    <input
                      id="checkout-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="lc-input text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-nif" className="block text-xs font-semibold text-zinc-200 mb-1.5">
                      NIF (9 dígitos) <span className="text-[#F5B800]">*</span>
                    </label>
                    <input
                      id="checkout-nif"
                      name="nif"
                      type="text"
                      inputMode="numeric"
                      maxLength={9}
                      required
                      value={nif}
                      onChange={(e) => setNif(e.target.value)}
                      className="lc-input text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="checkout-company" className="block text-xs font-semibold text-zinc-200 mb-1.5">
                    Nome da Empresa <span className="text-[#F5B800]">*</span>
                  </label>
                  <input
                    id="checkout-company"
                    name="organization"
                    type="text"
                    autoComplete="organization"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="lc-input text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="checkout-address" className="block text-xs font-semibold text-zinc-200 mb-1.5">
                    Morada de Faturação <span className="text-[#F5B800]">*</span>
                  </label>
                  <input
                    id="checkout-address"
                    name="street-address"
                    type="text"
                    autoComplete="street-address"
                    required
                    value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                    className="lc-input text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="checkout-notes" className="block text-xs font-semibold text-zinc-200 mb-1.5">
                    Dados para Prestação do Serviço <span className="text-zinc-500">(opcional)</span>
                  </label>
                  <textarea
                    id="checkout-notes"
                    name="serviceNotes"
                    rows={3}
                    value={serviceNotes}
                    onChange={(e) => setServiceNotes(e.target.value)}
                    className="lc-input text-sm"
                  />
                </div>
              </div>

              {/* Contract & Recurring Authorizations */}
              <div className="lc-card rounded-3xl p-6 sm:p-8 space-y-4">
                <h2 className="text-xl font-bold text-white">Condições e Aceitação Contratual</h2>
                <div className="p-4 rounded-xl bg-[#0a0b0e] border border-white/10 text-xs text-zinc-300 space-y-1.5">
                  <p className="font-bold text-[#F5B800]">Contrato Aplicável: LC-CONTRATO-v1.0-2026</p>
                  <p>
                    Os serviços de pagamento único não geram subscrição automática. Os serviços
                    recorrentes renovam automaticamente conforme a periodicidade indicada até
                    cancelamento na Área de Cliente.
                  </p>
                </div>

                <label className="flex items-start gap-3 text-xs sm:text-sm text-zinc-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptContract}
                    onChange={(e) => setAcceptContract(e.target.checked)}
                    className="mt-1 accent-[#F5B800]"
                  />
                  <span>
                    Li e aceito as condições comerciais e o contrato de prestação de serviços
                    (versão LC-CONTRATO-v1.0-2026). *
                  </span>
                </label>

                {summary.requiresRecurringAuthorization && (
                  <label className="flex items-start gap-3 text-xs sm:text-sm text-zinc-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptRecurring}
                      onChange={(e) => setAcceptRecurring(e.target.checked)}
                      className="mt-1 accent-[#F5B800]"
                    />
                    <span>
                      Autorizo a cobrança recorrente automática no método de pagamento selecionado
                      (Cartão / SEPA Direct Debit) para os encargos futuros indicados no resumo. *
                    </span>
                  </label>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-5">
              <div className="lc-card-featured rounded-3xl p-6 sm:p-7 space-y-5">
                <h2 className="text-xl font-extrabold text-white border-b border-white/10 pb-3">
                  Resumo da Encomenda
                </h2>

                <div className="space-y-2 text-xs text-zinc-300">
                  {[...summary.oneTimeLines, ...summary.monthlyLines, ...summary.annualLines].map(
                    (l) => (
                      <div key={l.product.id} className="flex justify-between gap-2">
                        <span>
                          {l.quantity}× {l.product.name}
                        </span>
                        <span className="font-bold text-white">
                          {l.initialLineTotal.toLocaleString("pt-PT")} €
                        </span>
                      </div>
                    )
                  )}
                </div>

                <div className="py-4 border-y border-white/10 flex items-baseline justify-between">
                  <span className="text-sm font-bold text-white">Total a pagar hoje</span>
                  <span className="text-3xl font-extrabold text-[#F5B800]">
                    {summary.dueTodayTotal.toLocaleString("pt-PT")} €
                  </span>
                </div>

                {(summary.futureMonthlyTotal > 0 || summary.futureAnnualTotal > 0) && (
                  <div className="text-xs text-zinc-300 space-y-1">
                    {summary.futureMonthlyTotal > 0 && (
                      <p>
                        Renovação mensal:{" "}
                        <strong className="text-[#F5B800]">
                          {summary.futureMonthlyTotal.toLocaleString("pt-PT")} €/mês
                        </strong>
                      </p>
                    )}
                    {summary.futureAnnualTotal > 0 && (
                      <p>
                        Renovação anual:{" "}
                        <strong className="text-[#F5B800]">
                          {summary.futureAnnualTotal.toLocaleString("pt-PT")} €/ano
                        </strong>
                      </p>
                    )}
                  </div>
                )}

                <div className="p-3 rounded-xl bg-[#0a0b0e] border border-white/10 text-[11px] text-zinc-400 flex items-start gap-2">
                  <Info className="w-4 h-4 text-[#F5B800] shrink-0 mt-0.5" />
                  <span>
                    Pagamentos pontuais: Cartão, MB WAY e Multibanco. Subscrições recorrentes:
                    Cartão e SEPA Direct Debit.
                  </span>
                </div>

                {errorMsg && (
                  <p
                    role="alert"
                    className="p-3 rounded-xl bg-red-500/10 border border-red-500/40 text-xs text-red-300 font-semibold"
                  >
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="lc-btn-primary w-full py-3.5 text-sm inline-flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                  {submitting ? "A validar no servidor..." : "Validar e Processar Pagamento (Test Mode)"}
                </button>

                <p className="text-[11px] text-zinc-500 text-center inline-flex items-center justify-center gap-1.5 w-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F5B800]" />
                  Preços validados no servidor via Catálogo Central LeadCapture
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
