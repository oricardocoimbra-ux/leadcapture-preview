import Link from "next/link";
import { ArrowRight, CheckCircle2, Play } from "lucide-react";
import { SECTORS, type SectorItem } from "@/data/sectors";
import { PROCESS_STEPS } from "@/data/site-data";
import { formatCatalogPrice, getCatalogByCategory } from "@/data/catalog";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { CtaBanner } from "@/components/ui/CtaBanner";

export function SectorPageTemplate({ sector }: { sector: SectorItem }) {
  const otherSectors = SECTORS.filter((s) => s.slug !== sector.slug);

  return (
    <div className="relative">
      {/* Hero */}
      <section className="pt-10 pb-16 px-4 sm:px-6 lg:px-8 lc-glow-ambient">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs
            items={[
              { label: "Por Negócio", href: "/por-negocio" },
              { label: sector.name },
            ]}
          />

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#F5B800]">
                <DynamicIcon name={sector.iconName} className="w-4 h-4 text-[#F5B800]" />
                {sector.badge}
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.1]">
                {sector.heroTitle}{" "}
                <span className="text-[#F5B800]">{sector.heroHighlight}</span>
              </h1>
              <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
                {sector.heroDescription}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href={`/pedir-demonstracao?setor=${sector.slug}`}
                  className="lc-btn-primary px-6 py-3.5 inline-flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  Pedir Demonstração Personalizada
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/demonstracoes"
                  className="lc-btn-secondary px-6 py-3.5 inline-flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Play className="w-4 h-4 text-[#F5B800]" />
                  Ver Demonstrações
                </Link>
              </div>
            </div>

            {/* Sector Mobile/Desktop Preview Card */}
            <div className="lg:col-span-5">
              <div className="lc-card-featured rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-sm font-bold text-white">{sector.name}</span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/15 text-[#F5B800]">
                    Solução 360°
                  </span>
                </div>
                <p className="text-xs text-zinc-400">
                  Módulos recomendados para {sector.name}:
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {sector.services.slice(0, 4).map((srv) => (
                    <Link
                      key={srv.title}
                      href={`/solucoes/${srv.relatedServiceSlug}`}
                      className="p-3 rounded-xl bg-[#0a0b0e] border border-white/10 hover:border-amber-500/40 transition-colors"
                    >
                      <DynamicIcon name={srv.iconName} className="w-4 h-4 text-[#F5B800] mb-2" />
                      <p className="text-xs font-semibold text-white">{srv.title}</p>
                    </Link>
                  ))}
                </div>
                <div className="pt-2 flex items-center justify-between text-xs">
                  <Link href="/precos" className="text-[#F5B800] font-semibold hover:underline">
                    Consultar planos →
                  </Link>
                  <Link href={`/pedir-orcamento?setor=${sector.slug}`} className="text-zinc-300 hover:text-white">
                    Pedir orçamento →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8-Card Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#08090d]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-widest uppercase text-[#F5B800]">
              O Que Podemos Fazer Por Si
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              {sector.servicesTitle}
            </h2>
            <p className="text-zinc-400 mt-3">{sector.servicesSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {sector.services.map((srv) => (
              <Link
                key={srv.title}
                href={`/solucoes/${srv.relatedServiceSlug}`}
                className="lc-card rounded-2xl p-6 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#161922] border border-amber-500/25 flex items-center justify-center mb-4">
                    <DynamicIcon name={srv.iconName} className="w-5 h-5 text-[#F5B800]" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#F5B800] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-sm text-zinc-400 mt-2 leading-relaxed">{srv.description}</p>
                </div>
                <span className="mt-4 text-xs font-semibold text-[#F5B800] inline-flex items-center gap-1">
                  Explorar solução <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pacote 360° */}
      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto lc-card-featured rounded-3xl p-8 sm:p-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold tracking-widest uppercase text-[#F5B800]">
                {sector.packageBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {sector.packageTitle}
              </h2>
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {sector.packageBenefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2.5 text-sm text-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-[#F5B800] shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              {(() => {
                const slugPrefix = sector.slug.split("-")[0];
                const sectorPkgs = getCatalogByCategory("pacotes-setor").filter((p) =>
                  p.id.includes(slugPrefix) || (sector.slug === "servicos-profissionais" && p.id.includes("profissionais"))
                );
                if (sectorPkgs.length === 0) return null;
                return (
                  <div className="flex flex-wrap gap-3 pt-3">
                    {sectorPkgs.map((sp) => (
                      <div key={sp.id} className="px-4 py-2.5 rounded-xl bg-[#0a0b0e] border border-amber-500/35">
                        <p className="text-xs text-zinc-400">{sp.name}</p>
                        <p className="text-lg font-extrabold text-[#F5B800]">{formatCatalogPrice(sp)}</p>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href={`/pedir-orcamento?setor=${sector.slug}`}
                className="lc-btn-primary px-6 py-3.5 text-center text-sm sm:text-base"
              >
                Pedir Orçamento para {sector.name}
              </Link>
              <Link
                href="/contactos"
                className="lc-btn-secondary px-6 py-3.5 text-center text-sm sm:text-base"
              >
                Falar com um Especialista
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#08090d]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-10">
            Do plano à implementação, em 4 passos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS_STEPS.map((st) => (
              <div key={st.step} className="lc-card rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold text-[#F5B800]">PASSO {st.step}</span>
                <h3 className="text-base font-bold text-white">{st.title}</h3>
                <p className="text-sm text-zinc-400">{st.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outros Negócios */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-lg font-bold text-white mb-6">Outros negócios que também apoiamos</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {otherSectors.map((other) => (
              <Link
                key={other.slug}
                href={`/por-negocio/${other.slug}`}
                className="lc-card rounded-xl p-4 flex flex-col items-center text-center gap-2 hover:border-amber-500/50"
              >
                <DynamicIcon name={other.iconName} className="w-5 h-5 text-[#F5B800]" />
                <span className="text-xs font-semibold text-white">{other.name}</span>
              </Link>
            ))}
            <Link
              href="/solucoes"
              className="lc-card-featured rounded-xl p-4 flex flex-col items-center justify-center text-center gap-1"
            >
              <span className="text-xs font-bold text-[#F5B800]">Ver todas as soluções →</span>
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
