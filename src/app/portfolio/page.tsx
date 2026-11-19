"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, FolderKanban, Info } from "lucide-react";
import { PORTFOLIO_SLOTS } from "@/data/site-data";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaBanner } from "@/components/ui/CtaBanner";

const CATEGORIES = [
  "Todos",
  "Imobiliário",
  "Beleza e Estética",
  "Restauração",
  "Retalho e E-commerce",
  "Serviços Profissionais",
  "Saúde e Bem-Estar",
];

export default function PortfolioPage() {
  const [selected, setSelected] = useState("Todos");

  const filtered =
    selected === "Todos"
      ? PORTFOLIO_SLOTS
      : PORTFOLIO_SLOTS.filter((item) => item.sector === selected);

  return (
    <div className="pt-10 pb-8 px-4 sm:px-6 lg:px-8 lc-glow-ambient">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={[{ label: "Portefólio" }]} />

        <div className="max-w-3xl space-y-4 mb-10">
          <span className="text-xs font-bold tracking-widest uppercase text-[#F5B800]">
            Portefólio — Página 19
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Projetos reais,{" "}
            <span className="text-[#F5B800]">resultados concretos.</span>
          </h1>
          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
            Estrutura preparada para apresentar os websites, lojas online e sistemas desenvolvidos
            pela LeadCapture por setor de atividade.
          </p>
        </div>

        {/* Fase 6 Notice */}
        <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/35 flex items-start gap-3">
          <Info className="w-5 h-5 text-[#F5B800] shrink-0 mt-0.5" />
          <p className="text-sm text-zinc-200">
            <strong className="text-[#F5B800]">Estrutura pronta para projetos reais:</strong> Os
            espaços abaixo estão preparados para receber capturas, URLs e descrições de projetos
            reais aprovados, sem publicar dados fictícios.
          </p>
        </div>

        {/* Sector Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelected(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
                selected === cat
                  ? "bg-[#F5B800] text-[#050507]"
                  : "bg-[#101218] text-zinc-300 border border-amber-500/20 hover:border-amber-500/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filtered.map((slot) => (
            <div key={slot.id} className="lc-card rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="aspect-video rounded-xl bg-[#0a0b0e] border border-dashed border-amber-500/30 flex flex-col items-center justify-center text-center p-4 mb-5">
                  <FolderKanban className="w-8 h-8 text-[#F5B800] mb-2" />
                  <span className="text-xs font-semibold text-zinc-400">{slot.statusNote}</span>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5B800]">
                  {slot.sector}
                </span>
                <h2 className="text-lg font-bold text-white mt-1">{slot.title}</h2>
                <p className="text-sm text-zinc-400 mt-2">{slot.summary}</p>
              </div>
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <Link
                  href={`/por-negocio/${slot.sectorSlug}`}
                  className="text-[#F5B800] font-semibold hover:underline inline-flex items-center gap-1"
                >
                  Ver soluções do setor <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link href="/casos-de-sucesso" className="text-zinc-400 hover:text-white">
                  Casos de Sucesso →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CtaBanner
        title="Quer ver o seu negócio"
        highlight="no nosso portefólio?"
        description="Vamos criar um projeto à medida da sua empresa com design, tecnologia e foco em resultados."
      />
    </div>
  );
}
