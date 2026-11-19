"use client";

import Link from "next/link";
import { ArrowRight, Info, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import type { ResolvedCartLine } from "@/lib/billing/cart-calculator";

function CartGroup({
  title,
  badge,
  lines,
  onUpdate,
  onRemove,
}: {
  title: string;
  badge: string;
  lines: ResolvedCartLine[];
  onUpdate: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}) {
  if (lines.length === 0) return null;

  return (
    <div className="lc-card rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <h2 className="text-lg font-bold text-white">{title}</h2>
        <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/15 text-[#F5B800]">
          {badge}
        </span>
      </div>

      <div className="space-y-3">
        {lines.map((line) => (
          <div
            key={line.product.id}
            className="p-4 rounded-xl bg-[#0a0b0e] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">{line.product.name}</h3>
              <p className="text-xs text-zinc-400 mt-0.5">{line.product.description}</p>
              {line.product.chargeMode === "recurring" && (
                <p className="text-xs text-[#F5B800] mt-1">
                  Inicial: {line.initialUnitTotal.toLocaleString("pt-PT")} € | Renovação:{" "}
                  {line.recurringUnitTotal.toLocaleString("pt-PT")} €/
                  {line.product.billingInterval === "month" ? "mês" : "ano"}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
              <div className="inline-flex items-center gap-2 bg-[#161922] border border-white/10 rounded-full px-2 py-1">
                <button
                  type="button"
                  onClick={() => onUpdate(line.product.id, line.quantity - 1)}
                  aria-label="Diminuir quantidade"
                  className="p-1 text-zinc-300 hover:text-[#F5B800]"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-bold text-white min-w-4 text-center">
                  {line.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => onUpdate(line.product.id, line.quantity + 1)}
                  aria-label="Aumentar quantidade"
                  className="p-1 text-zinc-300 hover:text-[#F5B800]"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-right min-w-20">
                <p className="text-base font-extrabold text-[#F5B800]">
                  {line.initialLineTotal.toLocaleString("pt-PT")} €
                </p>
                <p className="text-[10px] text-zinc-400">hoje</p>
              </div>

              <button
                type="button"
                onClick={() => onRemove(line.product.id)}
                aria-label="Remover produto"
                className="p-2 text-zinc-400 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CarrinhoPage() {
  const { summary, totalCount, updateQuantity, removeItem, clearCart } = useCart();

  return (
    <div className="pt-10 pb-20 px-4 sm:px-6 lg:px-8 lc-glow-ambient">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={[{ label: "Carrinho" }]} />

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-[#F5B800]">
              Resumo Comercial
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              O Seu Carrinho ({totalCount})
            </h1>
          </div>
          <div className="flex gap-3">
            <Link href="/precos" className="lc-btn-secondary px-4 py-2 text-xs">
              + Adicionar do Catálogo
            </Link>
            {totalCount > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="px-4 py-2 rounded-full text-xs text-zinc-400 border border-white/10 hover:text-white"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {totalCount === 0 ? (
          <div className="lc-card rounded-3xl p-8 sm:p-12 text-center space-y-6">
            <ShoppingCart className="w-12 h-12 text-[#F5B800] mx-auto" />
            <div className="space-y-2 max-w-lg mx-auto">
              <h2 className="text-2xl font-bold text-white">O seu carrinho está vazio</h2>
              <p className="text-sm text-zinc-400">
                Adicione serviços pontuais, subscrições mensais ou anuais — incluindo combinações no
                mesmo carrinho.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <AddToCartButton productId="web-profissional" label="+ Website Profissional (450 €)" />
              <AddToCartButton productId="social-gestao-profissional" label="+ Redes Sociais (249 €/mês)" />
              <AddToCartButton productId="email-empresarial-pack-2" label="+ Email 2 Contas (99 € / 69 € ano)" />
            </div>
            <div>
              <Link href="/precos" className="lc-btn-primary px-6 py-3 text-sm inline-flex items-center gap-2">
                Explorar Catálogo Completo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
              <CartGroup
                title="Pagamentos Únicos"
                badge="Sem subscrição"
                lines={summary.oneTimeLines}
                onUpdate={updateQuantity}
                onRemove={removeItem}
              />
              <CartGroup
                title="Subscrições Mensais"
                badge="Cobrança Mensal"
                lines={summary.monthlyLines}
                onUpdate={updateQuantity}
                onRemove={removeItem}
              />
              <CartGroup
                title="Subscrições Anuais & Renovações"
                badge="Cobrança Anual"
                lines={summary.annualLines}
                onUpdate={updateQuantity}
                onRemove={removeItem}
              />
            </div>

            <div className="lg:col-span-4 space-y-4">
              <div className="lc-card-featured rounded-3xl p-6 space-y-5">
                <h2 className="text-xl font-extrabold text-white border-b border-white/10 pb-3">
                  Totais e Periodicidades
                </h2>

                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between text-zinc-300">
                    <span>Pagamentos únicos:</span>
                    <span className="font-bold text-white">
                      {summary.oneTimeTotal.toLocaleString("pt-PT")} €
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>1.º mês (subscrições):</span>
                    <span className="font-bold text-white">
                      {summary.monthlyInitialTotal.toLocaleString("pt-PT")} €
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>1.º ano (anuais/setup):</span>
                    <span className="font-bold text-white">
                      {summary.annualInitialTotal.toLocaleString("pt-PT")} €
                    </span>
                  </div>
                </div>

                <div className="py-4 border-y border-white/10 flex items-baseline justify-between">
                  <span className="text-sm font-bold text-white">Total inicial a pagar hoje</span>
                  <span className="text-3xl font-extrabold text-[#F5B800]">
                    {summary.dueTodayTotal.toLocaleString("pt-PT")} €
                  </span>
                </div>

                {(summary.futureMonthlyTotal > 0 || summary.futureAnnualTotal > 0) && (
                  <div className="p-4 rounded-xl bg-[#0a0b0e] border border-amber-500/25 space-y-1.5 text-xs">
                    <p className="font-bold text-[#F5B800] uppercase tracking-wider">
                      Encargos Futuros (Renovações)
                    </p>
                    {summary.futureMonthlyTotal > 0 && (
                      <p className="text-zinc-200">
                        Mensalidade recorrente:{" "}
                        <strong>{summary.futureMonthlyTotal.toLocaleString("pt-PT")} €/mês</strong>
                      </p>
                    )}
                    {summary.futureAnnualTotal > 0 && (
                      <p className="text-zinc-200">
                        Anuidade recorrente:{" "}
                        <strong>{summary.futureAnnualTotal.toLocaleString("pt-PT")} €/ano</strong>
                      </p>
                    )}
                  </div>
                )}

                {summary.hasMixedCycles && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2 text-xs text-zinc-200">
                    <Info className="w-4 h-4 text-[#F5B800] shrink-0 mt-0.5" />
                    <span>
                      Ciclos mistos detetados: o checkout coordena os pagamentos únicos, mensais e
                      anuais sem duplicar a encomenda.
                    </span>
                  </div>
                )}

                <Link
                  href="/checkout"
                  className="lc-btn-primary w-full py-3.5 text-sm inline-flex items-center justify-center gap-2"
                >
                  Avançar para Checkout <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
