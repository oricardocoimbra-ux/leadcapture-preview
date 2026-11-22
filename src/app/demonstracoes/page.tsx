import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { SECTORS, EXPANSION_SECTORS } from "@/data/sectors";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { CtaBanner } from "@/components/ui/CtaBanner";

export const metadata = {
  title: "Demonstrações por Setor",
  description:
    "Explore demonstrações por setor e descubra como a LeadCapture pode estruturar o website e os sistemas do seu negócio.",
};

export default function DemonstracoesPage() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden pt-10 pb-12 px-4 sm:px-6 lg:px-8 lc-glow-ambient">
        <div className="pointer-events-none absolute inset-0 z-0">
          <img
            src="/images/production/reutilizaveis/website-portatil.jpg"
            alt="Portátil preto com iluminação dourada a apresentar demonstrações de websites por setor"
            className="h-full w-full object-cover object-center opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050507]/95 via-[#050507]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-[#050507]/25" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <Breadcrumbs items={[{ label: "Demonstrações" }]} />

          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#F5B800]">
              <Sparkles className="w-4 h-4" />
              Exemplos por Setor
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]">
              Veja as nossas demonstrações e imagine{" "}
              <span className="text-[#F5B800]">o seu negócio online.</span>
            </h1>
            <p className="text-zinc-100 text-base sm:text-lg leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
              Explore a arquitetura de websites e fluxos digitais organizados por área de negócio.
              Solicite uma demonstração personalizada com a identidade da sua empresa.
            </p>
          </div>
        </div>
      </section>

      <div className="pt-8 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {SECTORS.map((sec) => (
            <div key={sec.slug} className="lc-card rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-[#0a0b0e] border border-amber-500/20 p-5 flex flex-col justify-between mb-5">
                  {sec.heroImage && (
                    <>
                      <img
                        src={sec.heroImage}
                        alt={sec.heroImageAlt ?? sec.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover opacity-80"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050507]/95 via-[#050507]/45 to-[#050507]/30" />
                    </>
                  )}
                  <div className="relative z-10 flex items-center justify-between">
                    <DynamicIcon name={sec.iconName} className="w-6 h-6 text-[#F5B800]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-200 bg-[#050507]/70 px-2.5 py-0.5 rounded-full border border-white/10">
                      Demo Interativa
                    </span>
                  </div>
                  <div className="relative z-10">
                    <p className="text-lg font-extrabold text-white">{sec.name}</p>
                    <p className="text-xs text-zinc-200 mt-1">{sec.shortSubtitle}</p>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-white">{sec.name}</h2>
                <p className="text-sm text-zinc-400 mt-2 leading-relaxed">{sec.heroDescription}</p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <Link
                  href={`/por-negocio/${sec.slug}`}
                  className="lc-btn-secondary px-4 py-2 text-xs flex-1 text-center"
                >
                  Ver Página do Setor
                </Link>
                <Link
                  href={`/pedir-demonstracao?setor=${sec.slug}`}
                  className="lc-btn-primary px-4 py-2 text-xs inline-flex items-center gap-1"
                >
                  Pedir Demo <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Setores futuros */}
        <div className="lc-card rounded-2xl p-6 mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-[#F5B800] mb-3">
            Demonstrações de Expansão Futura
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {EXPANSION_SECTORS.map((exp) => (
              <div key={exp.slug} className="p-4 rounded-xl bg-[#0a0b0e] border border-white/10 flex items-center gap-3">
                <DynamicIcon name={exp.iconName} className="w-5 h-5 text-[#F5B800]" />
                <div>
                  <p className="text-sm font-bold text-white">{exp.name}</p>
                  <p className="text-xs text-zinc-400">{exp.shortSubtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>

      <CtaBanner
        title="Quer ver o seu negócio"
        highlight="neste modelo?"
        description="Solicite uma demonstração personalizada e veja, na prática, como a LeadCapture adapta a solução à identidade da sua empresa."
      />
    </div>
  );
}
