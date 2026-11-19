import Link from "next/link";
import { ArrowRight, BookOpen, CheckSquare, FileSpreadsheet, Video } from "lucide-react";
import { SERVICES } from "@/data/services";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { CtaBanner } from "@/components/ui/CtaBanner";

export const metadata = {
  title: "Recursos e Guias",
  description:
    "Guias, artigos, checklists e materiais práticos LeadCapture para ajudar empresas a crescer no digital.",
};

const RESOURCE_CATEGORIES = [
  {
    title: "Guias e Ebooks",
    description: "Conteúdos estruturados sobre websites, vendas, automação e gestão digital.",
    icon: BookOpen,
    status: "Em preparação editorial",
  },
  {
    title: "Modelos Profissionais",
    description: "Estruturas e modelos práticos adaptáveis a diferentes setores de negócio.",
    icon: FileSpreadsheet,
    status: "Em preparação editorial",
  },
  {
    title: "Vídeos Tutoriais",
    description: "Demonstrações passo a passo das principais ferramentas e soluções LeadCapture.",
    icon: Video,
    status: "Em preparação editorial",
  },
  {
    title: "Checklists e Dicas",
    description: "Listas práticas para avaliar e melhorar a presença digital da sua empresa.",
    icon: CheckSquare,
    status: "Em preparação editorial",
  },
];

export default function RecursosPage() {
  return (
    <div className="pt-10 pb-8 px-4 sm:px-6 lg:px-8 lc-glow-ambient">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={[{ label: "Recursos" }]} />

        <div className="max-w-3xl space-y-4 mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-[#F5B800]">
            Recursos & Conteúdos
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Conhecimento e ferramentas práticas para fazer{" "}
            <span className="text-[#F5B800]">o seu negócio crescer.</span>
          </h1>
          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
            Área dedicada a guias práticos, artigos, tutoriais e ferramentas úteis para apoiar
            empresários na digitalização dos seus negócios.
          </p>
        </div>

        {/* Resource Types */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {RESOURCE_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.title} className="lc-card rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#161922] border border-amber-500/25 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#F5B800]" />
                  </div>
                  <h2 className="text-lg font-bold text-white">{cat.title}</h2>
                  <p className="text-sm text-zinc-400 mt-2 leading-relaxed">{cat.description}</p>
                </div>
                <span className="mt-4 inline-block text-xs font-semibold text-[#F5B800]">
                  {cat.status}
                </span>
              </div>
            );
          })}
        </div>

        {/* Explorar por Tema */}
        <div className="mb-12">
          <h2 className="text-2xl font-extrabold text-white mb-6">Explorar por área de solução</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.slice(0, 4).map((srv) => (
              <Link
                key={srv.slug}
                href={`/solucoes/${srv.slug}`}
                className="lc-card rounded-2xl p-5 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <DynamicIcon name={srv.iconName} className="w-5 h-5 text-[#F5B800]" />
                  <span className="text-sm font-bold text-white group-hover:text-[#F5B800]">
                    {srv.name}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-[#F5B800]" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <CtaBanner />
    </div>
  );
}
