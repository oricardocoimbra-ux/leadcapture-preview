import Link from "next/link";
import { ArrowRight, Layers, Rocket, Sparkles, Users } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaBanner } from "@/components/ui/CtaBanner";

export const metadata = {
  title: "Sobre Nós",
  description:
    "Conheça a LeadCapture — o parceiro 360° em soluções digitais, marketing e automação para empresas em Portugal.",
};

const PILLARS = [
  {
    icon: Layers,
    title: "Soluções 360°",
    description: "Do website ao marketing, passando pela automação, CRM e gestão digital.",
  },
  {
    icon: Rocket,
    title: "Foco em Resultados",
    description: "Estratégias e ferramentas estruturadas para atrair clientes e organizar processos.",
  },
  {
    icon: Users,
    title: "Acompanhamento Próximo",
    description: "Uma equipa disponível, com suporte real e adaptado à realidade de cada negócio.",
  },
  {
    icon: Sparkles,
    title: "Tecnologia à Medida",
    description: "Plataformas modernas, escaláveis e preparadas para evoluir com a sua empresa.",
  },
];

export default function SobreNosPage() {
  return (
    <div className="pt-10 pb-8 px-4 sm:px-6 lg:px-8 lc-glow-ambient">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={[{ label: "Sobre Nós" }]} />

        <div className="max-w-3xl space-y-5 mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-[#F5B800]">
            Sobre a LeadCapture
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            O parceiro 360° para o crescimento{" "}
            <span className="text-[#F5B800]">do seu negócio.</span>
          </h1>
          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
            A LeadCapture é especializada em soluções digitais, marketing e automação, ajudando
            empresas de diferentes setores a atrair mais clientes, ganhar eficiência e crescer de
            forma sustentável.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/solucoes" className="lc-btn-primary px-6 py-3 text-sm inline-flex items-center gap-2">
              Conhecer Soluções <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/portfolio" className="lc-btn-secondary px-6 py-3 text-sm">
              Ver Portefólio
            </Link>
          </div>
        </div>

        {/* Missão */}
        <div className="lc-card-featured rounded-3xl p-8 sm:p-10 mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-[#F5B800]">
            A Nossa Missão
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 max-w-2xl">
            Transformar negócios com tecnologia,{" "}
            <span className="text-[#F5B800]">estratégia e resultados reais.</span>
          </h2>
          <p className="text-zinc-300 mt-4 max-w-3xl leading-relaxed">
            Queremos simplificar o digital para que os empresários possam focar-se no que realmente
            importa: os seus clientes, a qualidade do seu serviço e o crescimento consistente da
            sua empresa.
          </p>
        </div>

        {/* O que nos diferencia */}
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold text-white mb-8">
            O que nos <span className="text-[#F5B800]">diferencia</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="lc-card rounded-2xl p-6 space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-[#161922] border border-amber-500/25 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#F5B800]" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{p.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{p.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <CtaBanner />
    </div>
  );
}
