import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/data/services";
import { PROCESS_STEPS } from "@/data/site-data";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { CtaBanner } from "@/components/ui/CtaBanner";

export const metadata = {
  title: "Soluções & Serviços",
  description:
    "Conheça todas as soluções digitais da LeadCapture: Websites, Lojas Online, CRM e Sistemas, Marketing Digital, Automação e IA, Redes Sociais e QR Code.",
};

export default function SolucoesPage() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden pt-10 pb-12 px-4 sm:px-6 lg:px-8 lc-glow-ambient">
        <div className="pointer-events-none absolute inset-0 z-0">
          <img
            src="/images/production/reutilizaveis/website-portatil.jpg"
            alt="Portátil preto com iluminação dourada num estúdio moderno representando o ecossistema de soluções LeadCapture"
            className="h-full w-full object-cover object-center opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050507]/95 via-[#050507]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-[#050507]/25" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <Breadcrumbs items={[{ label: "Soluções" }]} />

          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold tracking-widest uppercase text-[#F5B800]">
              O Nosso Ecossistema de Soluções
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]">
              Tudo o que a sua empresa precisa,{" "}
              <span className="text-[#F5B800]">num só parceiro.</span>
            </h1>
            <p className="text-zinc-100 text-base sm:text-lg leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
              Soluções integradas de presença digital, gestão comercial, marketing e automação
              pensadas para atrair clientes e organizar o seu negócio.
            </p>
          </div>
        </div>
      </section>

      <div className="pt-8 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {SERVICES.map((srv) => (
            <Link
              key={srv.slug}
              href={`/solucoes/${srv.slug}`}
              className="lc-card rounded-2xl overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {srv.heroImage && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0a0b0e]">
                    <img
                      src={srv.heroImage}
                      alt={srv.heroImageAlt ?? srv.shortName}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#101218] via-transparent to-transparent" />
                  </div>
                )}
                <div className="p-6 pb-2">
                  <div className="w-12 h-12 rounded-xl bg-[#161922] border border-amber-500/25 flex items-center justify-center mb-4">
                    <DynamicIcon name={srv.iconName} className="w-6 h-6 text-[#F5B800]" />
                  </div>
                  <h2 className="text-xl font-bold text-white group-hover:text-[#F5B800]">
                    {srv.shortName}
                  </h2>
                  <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                    {srv.heroDescription}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-4 flex items-center justify-between text-sm font-semibold text-[#F5B800]">
                <span>Saber mais</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Como Funciona */}
        <div className="border-t border-white/10 pt-14 pb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-10">
            Um processo simples, rápido e focado em resultados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS_STEPS.map((st) => (
              <div key={st.step} className="lc-card rounded-2xl p-6 space-y-2">
                <span className="text-xs font-bold text-[#F5B800]">PASSO {st.step}</span>
                <h3 className="text-base font-bold text-white">{st.title}</h3>
                <p className="text-sm text-zinc-400">{st.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
      <CtaBanner />
    </div>
  );
}
