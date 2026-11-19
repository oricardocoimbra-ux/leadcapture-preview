import Link from "next/link";
import { ArrowRight, Award, Info } from "lucide-react";
import { CASE_STUDY_SLOTS } from "@/data/site-data";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaBanner } from "@/components/ui/CtaBanner";

export const metadata = {
  title: "Casos de Sucesso",
  description:
    "Estrutura dedicada a casos de sucesso reais LeadCapture. Métricas e testemunhos apenas publicados após validação.",
};

export default function CasosDeSucessoPage() {
  return (
    <div className="pt-10 pb-8 px-4 sm:px-6 lg:px-8 lc-glow-ambient">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={[{ label: "Casos de Sucesso" }]} />

        <div className="max-w-3xl space-y-4 mb-10">
          <span className="text-xs font-bold tracking-widest uppercase text-[#F5B800]">
            Casos de Sucesso — Página 20
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Resultados reais em{" "}
            <span className="text-[#F5B800]">negócios reais.</span>
          </h1>
          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
            Espaço dedicado a documentar histórias reais de empresas que transformaram a sua
            presença digital e processos comerciais com a LeadCapture.
          </p>
        </div>

        {/* Fase 6 Notice */}
        <div className="mb-10 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/35 flex items-start gap-3">
          <Info className="w-5 h-5 text-[#F5B800] shrink-0 mt-0.5" />
          <p className="text-sm text-zinc-200">
            <strong className="text-[#F5B800]">Regra de Integridade Comercial:</strong> Nenhuma
            métrica, percentagem ou testemunho é publicado sem confirmação real do cliente. Os
            cartões abaixo representam a estrutura pronta a preencher.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {CASE_STUDY_SLOTS.map((cs) => (
            <div key={cs.id} className="lc-card rounded-3xl p-7 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F5B800]">
                    {cs.sector}
                  </span>
                  <Award className="w-5 h-5 text-[#F5B800]" />
                </div>
                <h2 className="text-xl font-bold text-white">{cs.clientLabel}</h2>
                <div className="p-4 rounded-2xl bg-[#0a0b0e] border border-amber-500/20">
                  <p className="text-xs font-semibold text-[#F5B800]">Resultado / Métrica</p>
                  <p className="text-sm text-zinc-300 mt-1">{cs.metricPlaceholder}</p>
                </div>
                <div className="space-y-1.5 text-sm">
                  <p className="text-zinc-400">
                    <strong className="text-zinc-200">Desafio:</strong> {cs.challenge}
                  </p>
                  <p className="text-zinc-400">
                    <strong className="text-zinc-200">Solução:</strong> {cs.solution}
                  </p>
                </div>
              </div>

              <Link
                href="/portfolio"
                className="text-xs font-semibold text-[#F5B800] hover:underline inline-flex items-center gap-1"
              >
                Ver estrutura de Portefólio <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <CtaBanner
        title="A sua empresa pode ser"
        highlight="o próximo caso de sucesso."
        description="Vamos criar uma solução à medida do seu negócio e acompanhar cada etapa do crescimento."
      />
    </div>
  );
}
