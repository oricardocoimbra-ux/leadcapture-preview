"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Info, Mail } from "lucide-react";
import {
  CATALOG_CATEGORIES,
  LEADCAPTURE_TAX_CONFIG,
  formatCatalogPrice,
  getCatalogByCategory,
  getCatalogItemById,
  type CatalogCategoryId,
} from "@/data/catalog";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaBanner } from "@/components/ui/CtaBanner";

export default function PrecosPage() {
  const [activeCategory, setActiveCategory] = useState<CatalogCategoryId>("websites-presenca");

  const generalPackages = getCatalogByCategory("pacotes-gerais");
  const monthlyPackages = getCatalogByCategory("pacotes-mensais");
  const sectorPackages = getCatalogByCategory("pacotes-setor");
  const emailPack = getCatalogItemById("email-empresarial-pack-2");
  const emailExtra = getCatalogItemById("email-contas-adicionais");
  const activeItems = getCatalogByCategory(activeCategory);
  const activeMeta = CATALOG_CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <div className="pt-10 pb-8 px-4 sm:px-6 lg:px-8 lc-glow-ambient">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={[{ label: "Preços" }]} />

        <div className="max-w-3xl space-y-4 mb-8">
          <span className="text-xs font-bold tracking-widest uppercase text-[#F5B800]">
            Catálogo Comercial Oficial
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Soluções à medida do seu negócio, com{" "}
            <span className="text-[#F5B800]">preços transparentes.</span>
          </h1>
          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
            Consulte os pacotes comerciais e todos os serviços individuais da LeadCapture a partir
            do nosso catálogo central.
          </p>
        </div>

        {/* Fiscal Configuration Notice */}
        <div className="mb-10 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/35 flex items-start gap-3">
          <Info className="w-5 h-5 text-[#F5B800] shrink-0 mt-0.5" />
          <p className="text-sm text-zinc-200">
            <strong className="text-[#F5B800]">Enquadramento Fiscal:</strong>{" "}
            {LEADCAPTURE_TAX_CONFIG.label} Produtos assinalados com <em>&ldquo;desde&rdquo;</em>{" "}
            têm valor final dependente do âmbito do projeto.
          </p>
        </div>

        {/* Pacotes Gerais */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6">
            Pacotes Gerais <span className="text-[#F5B800]">(Pagamento Único)</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {generalPackages.map((pkg, idx) => {
              const featured = idx === 1;
              return (
                <div
                  key={pkg.id}
                  className={`rounded-3xl p-7 flex flex-col justify-between relative ${
                    featured ? "lc-card-featured" : "lc-card"
                  }`}
                >
                  {featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#F5B800] text-[#050507] text-xs font-extrabold uppercase tracking-wider">
                      Mais Escolhido
                    </span>
                  )}
                  <div>
                    <h3 className="text-xl font-extrabold text-white">{pkg.name}</h3>
                    <p className="text-sm text-zinc-400 mt-2">{pkg.description}</p>
                    <div className="my-6 py-5 border-y border-white/10">
                      <p className="text-3xl font-extrabold text-[#F5B800]">
                        {formatCatalogPrice(pkg)}
                      </p>
                      <p className="text-xs text-zinc-400 mt-1">{pkg.periodicity}</p>
                    </div>
                    <ul className="space-y-2.5">
                      {pkg.includedServices.map((srv) => (
                        <li key={srv} className="flex items-start gap-2.5 text-sm text-zinc-200">
                          <CheckCircle2 className="w-4 h-4 text-[#F5B800] shrink-0 mt-0.5" />
                          <span>{srv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-8">
                    <Link
                      href={`/pedir-orcamento?produto=${pkg.id}`}
                      className={`w-full py-3.5 inline-flex items-center justify-center gap-2 text-sm ${
                        featured ? "lc-btn-primary" : "lc-btn-secondary"
                      }`}
                    >
                      Pedir Proposta <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Pacotes Mensais */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6">
            Pacotes Mensais <span className="text-[#F5B800]">(Recorrência Mensal)</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {monthlyPackages.map((pkg) => (
              <div key={pkg.id} className="lc-card rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{pkg.name}</h3>
                  <p className="text-2xl font-extrabold text-[#F5B800] mt-3">
                    {formatCatalogPrice(pkg)}
                  </p>
                  <p className="text-xs text-zinc-400 mt-2">{pkg.description}</p>
                </div>
                <Link
                  href={`/pedir-orcamento?produto=${pkg.id}`}
                  className="mt-5 lc-btn-secondary py-2.5 text-center text-xs"
                >
                  Selecionar Plano
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Email Empresarial — Destaque Oficial Corrigido */}
        {emailPack && (
          <section className="mb-16">
            <div className="lc-card-featured rounded-3xl p-7 sm:p-9">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-3">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F5B800]">
                    <Mail className="w-4 h-4" />
                    Email Empresarial Oficial — Cobrança Anual
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {emailPack.name}
                  </h2>
                  <p className="text-sm text-zinc-300">{emailPack.description}</p>
                  <ul className="space-y-2 pt-2">
                    {emailPack.includedServices.map((inc) => (
                      <li key={inc} className="flex items-start gap-2.5 text-sm text-zinc-200">
                        <CheckCircle2 className="w-4 h-4 text-[#F5B800] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                  {emailExtra && (
                    <p className="text-xs text-zinc-400 pt-1">
                      <strong>Contas adicionais:</strong> {emailExtra.commercialNote}
                    </p>
                  )}
                </div>

                <div className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-[#0a0b0e] border border-amber-500/35">
                    <p className="text-xs font-bold uppercase text-[#F5B800]">1.º Ano (Setup + 2 contas)</p>
                    <p className="text-3xl font-extrabold text-white mt-2">99 €</p>
                    <p className="text-xs text-zinc-400 mt-1">Configuração inicial + manutenção 1.º ano</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#0a0b0e] border border-white/15">
                    <p className="text-xs font-bold uppercase text-zinc-300">A partir do 2.º Ano</p>
                    <p className="text-3xl font-extrabold text-[#F5B800] mt-2">69 €/ano</p>
                    <p className="text-xs text-zinc-400 mt-1">Renovação e manutenção anual das 2 contas</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Pacotes por Setor */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6">
            Pacotes por Setor
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sectorPackages.map((pkg) => (
              <div key={pkg.id} className="lc-card rounded-2xl p-6 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white">{pkg.name}</h3>
                  <p className="text-xs text-zinc-400 mt-1">{pkg.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xl font-extrabold text-[#F5B800]">{formatCatalogPrice(pkg)}</p>
                  <p className="text-[11px] text-zinc-400">{pkg.periodicity}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Catálogo Completo por Categoria */}
        <section className="mb-12">
          <div className="mb-6">
            <span className="text-xs font-bold tracking-widest uppercase text-[#F5B800]">
              Tabela Completa
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Explorar todo o catálogo por categoria
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {CATALOG_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-colors ${
                  activeCategory === cat.id
                    ? "bg-[#F5B800] text-[#050507]"
                    : "bg-[#101218] text-zinc-300 border border-amber-500/20 hover:border-amber-500/50"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {activeMeta && (
            <div className="lc-card rounded-3xl p-6 sm:p-8">
              <div className="border-b border-white/10 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-white">{activeMeta.name}</h3>
                  <p className="text-sm text-zinc-400 mt-1">{activeMeta.description}</p>
                </div>
                <span className="text-xs font-semibold text-[#F5B800]">
                  {activeItems.length} {activeItems.length === 1 ? "serviço" : "serviços"}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeItems.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-4 rounded-2xl bg-[#0a0b0e] border border-white/10 flex flex-col justify-between gap-3"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm sm:text-base font-bold text-white">{prod.name}</h4>
                          {prod.publicationStatus === "pending-validation" && (
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-[#F5B800]">
                              Validar âmbito
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">{prod.description}</p>
                        {prod.commercialNote && (
                          <p className="text-[11px] text-amber-300/90 mt-1.5">{prod.commercialNote}</p>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-lg font-extrabold text-[#F5B800]">
                          {formatCatalogPrice(prod)}
                        </p>
                        <p className="text-[11px] text-zinc-400">{prod.periodicity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      <CtaBanner
        title="Não sabe qual é"
        highlight="o plano ideal?"
        description="Explique-nos os objetivos da sua empresa e receba uma recomendação clara e sem compromisso."
      />
    </div>
  );
}
