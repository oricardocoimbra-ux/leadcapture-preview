"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, Search } from "lucide-react";
import { FAQ_ITEMS } from "@/data/site-data";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaBanner } from "@/components/ui/CtaBanner";

const FAQ_CATEGORIES = [
  "Todas",
  "Geral",
  "Serviços",
  "Preços e Propostas",
  "Prazos e Entregas",
  "Suporte",
] as const;

export default function FaqPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof FAQ_CATEGORIES)[number]>("Todas");
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);

  const filtered = FAQ_ITEMS.filter((item) => {
    const matchCat = category === "Todas" || item.category === category;
    const matchQuery =
      !query.trim() ||
      item.question.toLowerCase().includes(query.toLowerCase()) ||
      item.answer.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <div className="pt-10 pb-8 px-4 sm:px-6 lg:px-8 lc-glow-ambient">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={[{ label: "FAQ" }]} />

        <div className="max-w-3xl space-y-4 mb-8">
          <span className="text-xs font-bold tracking-widest uppercase text-[#F5B800]">
            FAQ — Página 22
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Tem dúvidas?{" "}
            <span className="text-[#F5B800]">Nós respondemos.</span>
          </h1>
          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
            Encontre respostas às perguntas mais frequentes sobre os nossos serviços, processo de
            trabalho e acompanhamento.
          </p>

          <div className="relative mt-2 max-w-xl">
            <Search className="w-4 h-4 text-[#F5B800] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar uma pergunta..."
              className="lc-input pl-11 text-sm"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
                category === cat
                  ? "bg-[#F5B800] text-[#050507]"
                  : "bg-[#101218] text-zinc-300 border border-amber-500/20 hover:border-amber-500/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start mb-10">
          {/* Accordion */}
          <div className="lg:col-span-8 space-y-3">
            {filtered.length === 0 ? (
              <div className="lc-card rounded-2xl p-8 text-center text-zinc-400">
                Nenhuma pergunta encontrada para a sua pesquisa.
              </div>
            ) : (
              filtered.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl transition-colors ${
                      isOpen ? "lc-card-featured" : "lc-card"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? "" : item.id)}
                      className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left"
                    >
                      <span className="text-base font-bold text-white">{item.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#F5B800] shrink-0 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 text-sm text-zinc-300 leading-relaxed border-t border-white/10 pt-3">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="lc-card rounded-2xl p-6 space-y-3">
              <HelpCircle className="w-7 h-7 text-[#F5B800]" />
              <h2 className="text-lg font-bold text-white">Não encontrou a sua resposta?</h2>
              <p className="text-sm text-zinc-400">
                Fale connosco e esclareça todas as suas dúvidas com a nossa equipa.
              </p>
              <Link href="/contactos" className="lc-btn-primary w-full py-3 text-center text-sm block">
                Contactar Equipa
              </Link>
            </div>

            <div className="lc-card rounded-2xl p-6 space-y-3">
              <h2 className="text-lg font-bold text-white">Prefere explorar as soluções?</h2>
              <p className="text-sm text-zinc-400">
                Veja em detalhe cada serviço ou peça uma proposta à medida.
              </p>
              <Link href="/solucoes" className="lc-btn-secondary w-full py-3 text-center text-sm block">
                Ver Soluções
              </Link>
            </div>
          </div>
        </div>
      </div>

      <CtaBanner />
    </div>
  );
}
