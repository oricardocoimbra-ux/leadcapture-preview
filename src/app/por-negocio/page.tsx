import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SECTORS, EXPANSION_SECTORS } from "@/data/sectors";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { CtaBanner } from "@/components/ui/CtaBanner";

export const metadata = {
  title: "Soluções Por Negócio",
  description:
    "Descubra soluções digitais LeadCapture adaptadas ao seu setor: Imobiliário, Beleza e Estética, Restauração, Retalho, Serviços Profissionais e Saúde.",
};

export default function PorNegocioPage() {
  return (
    <div className="pt-10 pb-8 px-4 sm:px-6 lg:px-8 lc-glow-ambient">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={[{ label: "Por Negócio" }]} />

        <div className="max-w-3xl space-y-4 mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-[#F5B800]">
            Soluções por Setor
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Tecnologia adaptada à realidade do{" "}
            <span className="text-[#F5B800]">seu negócio.</span>
          </h1>
          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
            Cada setor tem desafios próprios de captação, atendimento e gestão. Selecione a sua
            área de atividade para explorar os módulos recomendados.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
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
                  <h2 className="text-xl font-bold text-white group-hover:text-[#F5B800]">
                    {sector.name}
                  </h2>
                  <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                    {sector.heroDescription}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-4 flex items-center justify-between text-sm font-semibold text-[#F5B800]">
                <span>Explorar {sector.name}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Expansão Futura */}
        <div className="lc-card rounded-3xl p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#F5B800]">
                Arquitetura Escalável
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Novos setores em preparação
              </h2>
            </div>
            <Link href="/pedir-orcamento" className="lc-btn-secondary px-5 py-2.5 text-sm">
              Outro setor? Pedir proposta
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {EXPANSION_SECTORS.map((exp) => (
              <div
                key={exp.slug}
                className="p-4 rounded-2xl bg-[#0a0b0e] border border-white/10 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-[#161922] border border-amber-500/20 flex items-center justify-center shrink-0">
                  <DynamicIcon name={exp.iconName} className="w-5 h-5 text-[#F5B800]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{exp.name}</p>
                  <p className="text-xs text-zinc-400">{exp.shortSubtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CtaBanner />
    </div>
  );
}
