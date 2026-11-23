import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Check,
  CheckCircle2,
  Mail,
  Menu,
  MessageCircle,
  Play,
  Star,
  TrendingUp,
} from "lucide-react";
import { SECTORS, type SectorItem, type SectorServiceItem } from "@/data/sectors";
import { PROCESS_STEPS } from "@/data/site-data";
import { formatCatalogPrice, getCatalogByCategory } from "@/data/catalog";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { CtaBanner } from "@/components/ui/CtaBanner";

function ServiceCardVisual({ srv }: { srv: SectorServiceItem }) {
  if (srv.image) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0a0b0e]">
        <img
          src={srv.image}
          alt={srv.imageAlt ?? srv.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#101218] via-[#101218]/25 to-transparent" />
        {srv.overlayLabel && (
          <div className="absolute inset-x-3 bottom-3 rounded-xl border border-amber-500/35 bg-[#050507]/90 px-3 py-2 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-full bg-[#F5B800]" />
              <p className="text-[11px] font-medium leading-snug text-zinc-100">
                {srv.overlayLabel}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (srv.visualType === "ads") {
    return (
      <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#161922] via-[#0e1016] to-[#07080b] p-5">
        <div className="pointer-events-none absolute -top-10 right-0 h-28 w-28 rounded-full bg-[#F5B800]/15 blur-2xl" />
        <div className="relative flex items-center gap-3">
          <div className="flex h-16 w-16 -rotate-6 flex-col items-center justify-center rounded-2xl border border-amber-500/35 bg-[#0a0b0f] shadow-xl">
            <TrendingUp className="h-6 w-6 text-[#F5B800]" />
            <span className="mt-1 text-[10px] font-bold tracking-wide text-zinc-200">
              Google
            </span>
          </div>
          <div className="flex h-16 w-16 rotate-6 flex-col items-center justify-center rounded-2xl border border-amber-500/35 bg-[#0a0b0f] shadow-xl">
            <DynamicIcon name="Megaphone" className="h-6 w-6 text-[#F5B800]" />
            <span className="mt-1 text-[10px] font-bold tracking-wide text-zinc-200">
              Meta Ads
            </span>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#101218] to-transparent" />
      </div>
    );
  }

  if (srv.visualType === "reviews") {
    return (
      <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#161922] via-[#0e1016] to-[#07080b] p-5">
        <div className="pointer-events-none absolute -top-10 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-[#F5B800]/15 blur-2xl" />
        <div className="relative flex flex-col items-center rounded-2xl border border-amber-500/35 bg-[#0a0b0f]/95 px-5 py-3.5 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">
            Reputação Local
          </span>
          <div className="mt-2 flex items-center gap-1" aria-label="5 estrelas">
            {[0, 1, 2, 3, 4].map((idx) => (
              <Star
                key={idx}
                className="h-4 w-4 fill-[#F5B800] text-[#F5B800]"
              />
            ))}
          </div>
          <span className="mt-1.5 text-[11px] text-zinc-400">
            Feedback verificado
          </span>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#101218] to-transparent" />
      </div>
    );
  }

  if (srv.visualType === "integrations") {
    return (
      <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#161922] via-[#0e1016] to-[#07080b] p-5">
        <div className="pointer-events-none absolute -top-8 right-6 h-24 w-24 rounded-full bg-[#F5B800]/15 blur-2xl" />
        <div className="relative flex items-center gap-2.5">
          <div className="flex h-13 w-13 -rotate-6 items-center justify-center rounded-xl border border-amber-500/30 bg-[#0a0b0f] shadow-lg">
            <MessageCircle className="h-5 w-5 text-[#F5B800]" />
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-amber-500/50 bg-[#12141c] shadow-xl">
            <Calendar className="h-6 w-6 text-[#F5B800]" />
          </div>
          <div className="flex h-13 w-13 rotate-6 items-center justify-center rounded-xl border border-amber-500/30 bg-[#0a0b0f] shadow-lg">
            <Mail className="h-5 w-5 text-[#F5B800]" />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#101218] to-transparent" />
      </div>
    );
  }

  return null;
}

export function SectorPageTemplate({ sector }: { sector: SectorItem }) {
  const otherSectors = SECTORS.filter((s) => s.slug !== sector.slug);
  const hasServiceMedia = sector.services.some((s) => Boolean(s.image || s.visualType));

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden pt-10 pb-16 px-4 sm:px-6 lg:px-8 lc-glow-ambient">
        {sector.heroImage && (
          <div className="pointer-events-none absolute inset-0 z-0">
            <img
              src={sector.heroImage}
              alt={sector.heroImageAlt ?? sector.name}
              className="h-full w-full object-cover object-center opacity-95"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050507]/95 via-[#050507]/55 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-[#050507]/25" />
          </div>
        )}

        <div className="relative z-10 max-w-7xl mx-auto">
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
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]">
                {sector.heroTitle}{" "}
                <span className="text-[#F5B800]">{sector.heroHighlight}</span>
              </h1>
              <p className="text-base sm:text-lg text-zinc-100 max-w-2xl leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
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
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              {sector.phonePreview ? (
                <div className="relative w-full max-w-[300px] sm:max-w-[320px] rounded-[2.25rem] border-[3px] border-amber-500/45 bg-[#08090d] p-3 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85)] lg:rotate-2 transition-transform duration-500 hover:rotate-0">
                  <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-zinc-800" />
                  <div className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#0d0f15]">
                    {/* Phone top header */}
                    <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white">
                        <DynamicIcon
                          name={sector.iconName}
                          className="h-3.5 w-3.5 text-[#F5B800]"
                        />
                        {sector.phonePreview.brandLabel}
                      </span>
                      <Menu className="h-4 w-4 text-zinc-400" aria-hidden="true" />
                    </div>

                    {/* Phone copy & CTA in crisp HTML/CSS */}
                    <div className="px-4 pt-4 pb-3 space-y-3">
                      <p className="text-lg font-extrabold leading-tight text-white">
                        {sector.phonePreview.headline}
                      </p>
                      <Link
                        href={`/pedir-demonstracao?setor=${sector.slug}`}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F5B800] px-3 py-2.5 text-xs font-bold text-[#050507] transition-colors hover:bg-[#ffca28]"
                      >
                        <Calendar className="h-3.5 w-3.5" />
                        {sector.phonePreview.ctaLabel}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>

                    {/* Professional photo inside phone */}
                    <div className="relative mx-3 overflow-hidden rounded-2xl border border-white/10">
                      <div className="aspect-[4/3] w-full overflow-hidden">
                        <img
                          src={sector.phonePreview.image}
                          alt={sector.phonePreview.imageAlt}
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0d0f15] to-transparent" />
                    </div>

                    {/* Checklist in crisp HTML/CSS */}
                    <ul className="space-y-1.5 px-4 pt-3 pb-4">
                      {sector.phonePreview.checklist.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-xs font-medium text-zinc-200"
                        >
                          <Check className="h-3.5 w-3.5 shrink-0 text-[#F5B800]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="w-full lc-card-featured rounded-3xl p-6 space-y-4">
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
              )}
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
                className="lc-card rounded-2xl overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {hasServiceMedia && <ServiceCardVisual srv={srv} />}
                  <div className={hasServiceMedia ? "p-5 pt-4" : "p-6 pb-2"}>
                    <div className="w-10 h-10 rounded-xl bg-[#161922] border border-amber-500/25 flex items-center justify-center mb-3.5">
                      <DynamicIcon name={srv.iconName} className="w-5 h-5 text-[#F5B800]" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#F5B800] transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-sm text-zinc-400 mt-2 leading-relaxed">{srv.description}</p>
                  </div>
                </div>
                <div className={hasServiceMedia ? "px-5 pb-5 pt-1" : "px-6 pb-6 pt-3"}>
                  <span className="text-xs font-semibold text-[#F5B800] inline-flex items-center gap-1">
                    Explorar solução <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sector Special Offer (when applicable, e.g., Marca Própria in Beleza, Conteúdo Imobiliário in Imobiliário) */}
      {sector.specialOffer && (
        <section
          id={sector.specialOffer.id}
          className="py-14 px-4 sm:px-6 lg:px-8 border-t border-white/5"
          aria-labelledby={`${sector.specialOffer.id}-heading`}
        >
          <div className="max-w-7xl mx-auto lc-card rounded-3xl p-6 sm:p-10 space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="max-w-3xl space-y-3">
                <span className="text-xs font-bold tracking-widest uppercase text-[#F5B800]">
                  {sector.specialOffer.badge}
                </span>
                <h2
                  id={`${sector.specialOffer.id}-heading`}
                  className="text-2xl sm:text-3xl font-extrabold text-white"
                >
                  {sector.specialOffer.title}
                </h2>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {sector.specialOffer.subtitle}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href={sector.specialOffer.ctaHref}
                  className="lc-btn-primary px-5 py-3 inline-flex items-center justify-center gap-2 text-sm"
                >
                  {sector.specialOffer.ctaLabel}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                {sector.specialOffer.secondaryCtaLabel && sector.specialOffer.secondaryCtaHref && (
                  <Link
                    href={sector.specialOffer.secondaryCtaHref}
                    className="lc-btn-secondary px-5 py-3 inline-flex items-center justify-center gap-2 text-sm"
                  >
                    {sector.specialOffer.secondaryCtaLabel}
                  </Link>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {sector.specialOffer.items.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-[#0a0b0e]/85 p-5 space-y-2.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#161922] border border-amber-500/25 flex items-center justify-center">
                    <DynamicIcon name={item.iconName} className="w-5 h-5 text-[#F5B800]" />
                  </div>
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-amber-500/25 bg-[#0a0b0e]/90 p-5 flex items-start gap-3">
              <DynamicIcon name="ShieldCheck" className="w-5 h-5 text-[#F5B800] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-bold text-white">
                  {sector.specialOffer.disclaimerTitle}
                </p>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {sector.specialOffer.disclaimerText}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Pacote 360° */}
      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-6xl mx-auto lc-card-featured rounded-3xl overflow-hidden p-8 sm:p-10">
          {sector.packageImage && (
            <div className="pointer-events-none absolute inset-0 z-0">
              <img
                src={sector.packageImage}
                alt={sector.packageImageAlt ?? sector.packageTitle}
                loading="lazy"
                className="h-full w-full object-cover object-right opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c10]/95 via-[#0b0c10]/70 lg:via-[#0b0c10]/55 to-transparent" />
            </div>
          )}

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold tracking-widest uppercase text-[#F5B800]">
                {sector.packageBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {sector.packageTitle}
              </h2>
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {sector.packageBenefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2.5 text-sm text-zinc-100">
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
                      <div key={sp.id} className="px-4 py-2.5 rounded-xl bg-[#0a0b0e]/90 border border-amber-500/35 backdrop-blur-sm">
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
                className="lc-btn-secondary px-6 py-3.5 text-center text-sm sm:text-base backdrop-blur-sm"
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
