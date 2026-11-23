import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, Info, ShieldCheck } from "lucide-react";
import { SERVICES } from "@/data/services";
import { PROCESS_STEPS } from "@/data/site-data";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { CtaBanner } from "@/components/ui/CtaBanner";

export const metadata = {
  title: "Soluções & Serviços",
  description:
    "Conheça todas as soluções digitais da LeadCapture: Websites, Lojas Online, CRM e Sistemas, Marketing Digital, Automação e IA, Redes Sociais, QR Code, soluções digitais à medida e apoio administrativo INPI.",
};

const CUSTOM_DIGITAL_ITEMS = [
  {
    title: "Aplicações à Medida",
    description:
      "Portais, áreas reservadas e aplicações web desenhadas para os fluxos específicos da sua empresa.",
    iconName: "Cpu",
  },
  {
    title: "Automatizações",
    description:
      "Fluxos automáticos para eliminar tarefas repetitivas e acelerar a resposta entre equipas e clientes.",
    iconName: "Workflow",
  },
  {
    title: "Integrações",
    description:
      "Ligação entre website, CRM, agendas, email e ferramentas que o seu negócio já utiliza no dia a dia.",
    iconName: "Plug",
  },
  {
    title: "Ferramentas Internas",
    description:
      "Painéis operacionais e utilitários internos para organizar processos, pedidos e informação comercial.",
    iconName: "Settings",
  },
];

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

          {/* Soluções Digitais à Medida */}
          <section
            id="solucoes-a-medida"
            className="border-t border-white/10 pt-14 pb-14"
            aria-labelledby="solucoes-a-medida-heading"
          >
            <div className="lc-card-featured rounded-3xl p-6 sm:p-10 space-y-8">
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-3">
                  <span className="text-xs font-bold tracking-widest uppercase text-[#F5B800]">
                    Soluções Digitais à Medida
                  </span>
                  <h2
                    id="solucoes-a-medida-heading"
                    className="text-2xl sm:text-3xl font-extrabold text-white"
                  >
                    Uma solução digital pensada{" "}
                    <span className="text-[#F5B800]">para o seu negócio.</span>
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                    Quando a sua operação exige mais do que um serviço padrão, desenhamos e
                    desenvolvemos aplicações, automatizações, integrações e ferramentas internas
                    ajustadas às necessidades reais da sua empresa.
                  </p>
                </div>

                <div className="lg:col-span-5 rounded-2xl border border-amber-500/25 bg-[#0a0b0e]/90 p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F5B800]">
                    <Info className="w-4 h-4 shrink-0" />
                    <span>Como começamos</span>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    Cada projeto à medida começa por{" "}
                    <strong className="text-white">avaliar a necessidade</strong>, compreender o
                    processo atual e{" "}
                    <strong className="text-white">definir o âmbito técnico</strong>. Só após essa
                    análise apresentamos proposta e orçamento ajustados, sem estimativas
                    precipitadas.
                  </p>
                  <div className="pt-1">
                    <Link
                      href="/pedir-orcamento"
                      className="lc-btn-primary w-full py-3 px-5 inline-flex items-center justify-center gap-2 text-sm"
                    >
                      Pedir Orçamento à Medida
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {CUSTOM_DIGITAL_ITEMS.map((item) => (
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
            </div>
          </section>

          {/* Apoio Administrativo ao Pedido de Marca no INPI (Serviço Separado) */}
          <section
            id="apoio-marca-inpi"
            className="border-t border-white/10 pt-14 pb-14"
            aria-labelledby="apoio-inpi-heading"
          >
            <div className="lc-card rounded-3xl p-6 sm:p-10 space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="max-w-3xl space-y-3">
                  <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#F5B800]">
                    <FileText className="w-4 h-4" />
                    Serviço Independente · Propriedade Industrial
                  </span>
                  <h2
                    id="apoio-inpi-heading"
                    className="text-2xl sm:text-3xl font-extrabold text-white"
                  >
                    Apoio administrativo ao pedido de marca no INPI
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                    Oferta separada das restantes soluções digitais para apoiar empresas e novas
                    marcas na preparação e acompanhamento administrativo do pedido de registo de
                    marca junto do Instituto Nacional da Propriedade Industrial (INPI).
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                  <Link
                    href="/pedir-orcamento"
                    className="lc-btn-secondary px-5 py-3 inline-flex items-center justify-center gap-2 text-sm"
                  >
                    Pedir Informações
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/contactos"
                    className="text-xs font-semibold text-zinc-400 hover:text-[#F5B800] text-center py-1 transition-colors"
                  >
                    Esclarecer dúvidas nos Contactos →
                  </Link>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-white/10 bg-[#0a0b0e]/85 p-5 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <CheckCircle2 className="w-4 h-4 text-[#F5B800] shrink-0" />
                    <span>Âmbito administrativo</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    Apoio na recolha e organização de informação, preparação administrativa dos
                    elementos do pedido e acompanhamento do estado da submissão.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#0a0b0e]/85 p-5 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <FileText className="w-4 h-4 text-[#F5B800] shrink-0" />
                    <span>Honorários e taxas oficiais</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    Os honorários de apoio administrativo da LeadCapture são sempre distinguidos das
                    taxas oficiais do INPI, que são liquidadas à parte conforme a tabela oficial em
                    vigor.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#0a0b0e]/85 p-5 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <ShieldCheck className="w-4 h-4 text-[#F5B800] shrink-0" />
                    <span>Limites e encaminhamento</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    A LeadCapture não garante a concessão do registo nem presta patrocínio jurídico.
                    Questões que exijam representação ou aconselhamento especializado são
                    encaminhadas para profissional autorizado (Agente Oficial da Propriedade
                    Industrial ou advogado).
                  </p>
                </div>
              </div>
            </div>
          </section>

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
