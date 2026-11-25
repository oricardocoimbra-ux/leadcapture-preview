import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Play, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { SECTORS, EXPANSION_SECTORS } from "@/data/sectors";
import { SERVICES } from "@/data/services";
import { PROCESS_STEPS } from "@/data/site-data";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { CtaBanner } from "@/components/ui/CtaBanner";

export const metadata: Metadata = {
  title: "LeadCapture — Parceiro 360° em Soluções Digitais",
  description:
    "Websites profissionais, lojas online, CRM, automação com IA, marketing digital e soluções à medida por setor em Portugal.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden lc-glow-ambient">
        <div className="pointer-events-none absolute inset-0 z-0">
          <img
            src="/images/production/home/hero-leadcapture.jpg"
            alt="Equipa LeadCapture em estúdio moderno com iluminação dourada a planear soluções digitais"
            className="h-full w-full object-cover object-center opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050507]/85 via-[#050507]/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050507]/90 via-transparent to-[#050507]/15" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/35 text-xs font-bold tracking-widest uppercase text-[#F5B800] backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Parceiro 360° para Empresas
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]">
              Soluções digitais que atraem clientes, organizam o seu negócio e{" "}
              <span className="text-[#F5B800]">aumentam as vendas.</span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-100 max-w-2xl leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.75)]">
              Websites, lojas online, CRM, marketing digital e automação com Inteligência Artificial
              para empresas que querem crescer com tecnologia, estratégia e acompanhamento próximo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/pedir-demonstracao"
                className="lc-btn-primary px-7 py-4 inline-flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                Pedir Demonstração Personalizada
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/demonstracoes"
                className="lc-btn-secondary px-7 py-4 inline-flex items-center justify-center gap-2 text-sm sm:text-base backdrop-blur-sm"
              >
                <Play className="w-4 h-4 text-[#F5B800]" />
                Explorar Demonstrações
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/15">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-[#F5B800] shrink-0" />
                <span className="text-sm text-zinc-100 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">Implementação ágil e estruturada</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#F5B800] shrink-0" />
                <span className="text-sm text-zinc-100 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">Soluções à medida do seu setor</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F5B800] shrink-0" />
                <span className="text-sm text-zinc-100 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">Apoio contínuo e especializado</span>
              </div>
            </div>
          </div>

          {/* Interactive Ecosystem Card */}
          <div className="lg:col-span-5">
            <div className="lc-card-featured rounded-3xl p-6 sm:p-7 space-y-5 relative bg-[#0c0d12]/78 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#F5B800]">
                    Ecossistema LeadCapture
                  </p>
                  <p className="text-lg font-bold text-white mt-0.5">
                    Tudo integrado num único lugar
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-[#F5B800] text-xs font-bold">
                  360°
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Website & Loja Online", href: "/solucoes/websites", tag: "Presença" },
                  { label: "CRM & Pipeline Comercial", href: "/solucoes/crm-sistemas", tag: "Gestão" },
                  { label: "Automação & Assistentes IA", href: "/solucoes/automacao-ia", tag: "Eficiência" },
                  { label: "Marketing & Redes Sociais", href: "/solucoes/marketing-digital", tag: "Aquisição" },
                ].map((row) => (
                  <Link
                    key={row.href}
                    href={row.href}
                    className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[#0a0b0e]/90 border border-white/10 hover:border-amber-500/45 transition-colors group"
                  >
                    <span className="text-sm font-semibold text-white group-hover:text-[#F5B800]">
                      {row.label}
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-[#161922] text-zinc-300 group-hover:text-[#F5B800] whitespace-nowrap shrink-0">
                      {row.tag} →
                    </span>
                  </Link>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between gap-3 text-xs text-zinc-300">
                <span>Soluções modulares para empresas em Portugal</span>
                <Link href="/sobre-nos" className="text-[#F5B800] font-semibold hover:underline whitespace-nowrap shrink-0">
                  Sobre nós →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por Negócio Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#08090d]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-widest uppercase text-[#F5B800]">
              Por Negócio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Soluções para o seu setor
            </h2>
            <p className="text-zinc-400 mt-3">
              Escolha a área do seu negócio e descubra como adaptamos a nossa tecnologia às suas
              necessidades reais.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SECTORS.map((sector) => (
              <Link
                key={sector.slug}
                href={`/por-negocio/${sector.slug}`}
                className="lc-card rounded-2xl overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {sector.heroImage && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0a0b0e]">
                      <img
                        src={sector.heroImage}
                        alt={sector.heroImageAlt ?? sector.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#101218] via-transparent to-transparent" />
                    </div>
                  )}
                  <div className="p-6 pb-2">
                    <div className="w-12 h-12 rounded-xl bg-[#161922] border border-amber-500/25 flex items-center justify-center mb-4">
                      <DynamicIcon name={sector.iconName} className="w-6 h-6 text-[#F5B800]" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#F5B800] transition-colors">
                      {sector.name}
                    </h3>
                    <p className="text-sm text-zinc-400 mt-2">{sector.shortSubtitle}</p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-4 flex items-center justify-between text-sm font-semibold text-[#F5B800]">
                  <span>Ver soluções do setor</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-400">
            <span>Setores preparados para expansão futura:</span>
            {EXPANSION_SECTORS.map((exp) => (
              <span
                key={exp.slug}
                className="px-3 py-1 rounded-full bg-[#101218] border border-white/10 text-zinc-300"
              >
                {exp.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Ecossistema de Soluções */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-[#F5B800]">
                O Que Fazemos
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
                O nosso ecossistema de soluções
              </h2>
            </div>
            <Link
              href="/solucoes"
              className="text-sm font-semibold text-[#F5B800] hover:underline inline-flex items-center gap-1"
            >
              Ver todas as soluções <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {SERVICES.map((srv) => (
              <Link
                key={srv.slug}
                href={`/solucoes/${srv.slug}`}
                className="lc-card rounded-2xl p-5 flex flex-col items-center text-center gap-3 group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#161922] border border-amber-500/25 flex items-center justify-center">
                  <DynamicIcon name={srv.iconName} className="w-5 h-5 text-[#F5B800]" />
                </div>
                <span className="text-sm font-bold text-white group-hover:text-[#F5B800] leading-snug">
                  {srv.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona (REF-03 / REF-27) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#08090d]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-widest uppercase text-[#F5B800]">
              Processo Simples e Transparente
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Como funciona a LeadCapture?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((item) => (
              <div key={item.step} className="lc-card rounded-2xl p-6 space-y-3">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#F5B800] text-[#050507] text-sm font-extrabold">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
