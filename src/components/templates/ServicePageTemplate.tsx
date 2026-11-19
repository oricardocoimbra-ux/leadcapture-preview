import Link from "next/link";
import { ArrowRight, CheckCircle2, Play } from "lucide-react";
import { SERVICES, type ServiceItem } from "@/data/services";
import { SECTORS } from "@/data/sectors";
import { CATALOG_CATEGORIES, formatCatalogPrice, getCatalogByCategory } from "@/data/catalog";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { CtaBanner } from "@/components/ui/CtaBanner";

export function ServicePageTemplate({ service }: { service: ServiceItem }) {
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <div className="relative">
      {/* Hero */}
      <section className="pt-10 pb-16 px-4 sm:px-6 lg:px-8 lc-glow-ambient">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs
            items={[
              { label: "Soluções", href: "/solucoes" },
              { label: service.name },
            ]}
          />

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#F5B800]">
                <DynamicIcon name={service.iconName} className="w-4 h-4 text-[#F5B800]" />
                {service.badge}
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.1]">
                {service.heroTitle}{" "}
                <span className="text-[#F5B800]">{service.heroHighlight}</span>
              </h1>
              <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
                {service.heroDescription}
              </p>

              <ul className="space-y-2.5 pt-1">
                {service.checklist.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm sm:text-base text-zinc-200">
                    <CheckCircle2 className="w-5 h-5 text-[#F5B800] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <Link
                  href={`/pedir-demonstracao?servico=${service.slug}`}
                  className="lc-btn-primary px-6 py-3.5 inline-flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {service.primaryCtaLabel}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/precos"
                  className="lc-btn-secondary px-6 py-3.5 inline-flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Play className="w-4 h-4 text-[#F5B800]" />
                  Ver Planos e Preços
                </Link>
              </div>
            </div>

            {/* Service Highlights Card */}
            <div className="lg:col-span-5">
              <div className="lc-card-featured rounded-3xl p-6 sm:p-7 space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-sm font-bold text-white">{service.shortName}</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/15 text-[#F5B800] font-semibold">
                    LeadCapture
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {service.highlights.map((hl) => (
                    <div
                      key={hl.label}
                      className="p-4 rounded-2xl bg-[#0a0b0e] border border-amber-500/20 space-y-2"
                    >
                      <DynamicIcon name={hl.iconName} className="w-5 h-5 text-[#F5B800]" />
                      <p className="text-xs sm:text-sm font-semibold text-white">{hl.label}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                  <Link href={`/pedir-orcamento?servico=${service.slug}`} className="text-[#F5B800] font-semibold hover:underline">
                    Pedir orçamento à medida →
                  </Link>
                  <Link href="/demonstracoes" className="text-zinc-300 hover:text-white">
                    Demonstrações →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#08090d]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-12">
            {service.sectionTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {service.features.map((feat) => (
              <div key={feat.title} className="lc-card rounded-2xl p-6 space-y-3">
                <div className="w-11 h-11 rounded-xl bg-[#161922] border border-amber-500/25 flex items-center justify-center">
                  <DynamicIcon name={feat.iconName} className="w-5 h-5 text-[#F5B800]" />
                </div>
                <h3 className="text-lg font-bold text-white">{feat.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catálogo Oficial do Serviço */}
      {(() => {
        const catMeta = CATALOG_CATEGORIES.find((c) => c.serviceSlug === service.slug);
        const catItems = catMeta ? getCatalogByCategory(catMeta.id).slice(0, 6) : [];
        if (catItems.length === 0) return null;
        return (
          <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-bold tracking-widest uppercase text-[#F5B800]">
                    Tabela Oficial
                  </span>
                  <h2 className="text-2xl font-extrabold text-white mt-1">
                    Preços e Módulos — {service.name}
                  </h2>
                </div>
                <Link href="/precos" className="text-sm font-semibold text-[#F5B800] hover:underline">
                  Ver catálogo completo →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {catItems.map((prod) => (
                  <div key={prod.id} className="lc-card rounded-2xl p-5 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-white">{prod.name}</h3>
                      <p className="text-xs text-zinc-400 mt-1">{prod.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-base font-extrabold text-[#F5B800]">{formatCatalogPrice(prod)}</p>
                      <p className="text-[11px] text-zinc-400">{prod.periodicity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Contextual Sectors Link */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-lg font-bold text-white mb-5">
            Aplicação de {service.name} por setor de negócio
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {SECTORS.map((sec) => (
              <Link
                key={sec.slug}
                href={`/por-negocio/${sec.slug}`}
                className="lc-card rounded-xl p-4 flex flex-col items-center text-center gap-2"
              >
                <DynamicIcon name={sec.iconName} className="w-5 h-5 text-[#F5B800]" />
                <span className="text-xs font-semibold text-white">{sec.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#08090d]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm font-semibold text-zinc-400">Outras soluções LeadCapture:</span>
          <div className="flex flex-wrap gap-2">
            {otherServices.map((o) => (
              <Link
                key={o.slug}
                href={`/solucoes/${o.slug}`}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#101218] border border-amber-500/25 text-zinc-200 hover:border-[#F5B800] hover:text-[#F5B800]"
              >
                {o.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title={service.ctaTitle}
        highlight=""
        description={service.ctaDescription}
      />
    </div>
  );
}
