"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock, Lock } from "lucide-react";
import { SECTORS } from "@/data/sectors";
import { SERVICES } from "@/data/services";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export default function PedirOrcamentoPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="pt-10 pb-20 px-4 sm:px-6 lg:px-8 lc-glow-ambient">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={[{ label: "Pedir Orçamento" }]} />

        <div className="max-w-3xl space-y-4 mb-10">
          <span className="text-xs font-bold tracking-widest uppercase text-[#F5B800]">
            Pedir Orçamento — Página 23
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Vamos criar a solução ideal{" "}
            <span className="text-[#F5B800]">para o seu negócio.</span>
          </h1>
          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
            Conte-nos o que precisa e receba uma proposta personalizada, sem compromisso, com o
            plano mais adequado aos seus objetivos.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-7">
            <div className="lc-card-featured rounded-3xl p-6 sm:p-8">
              <h2 className="text-2xl font-extrabold text-white mb-2">Preencha o formulário</h2>
              <p className="text-sm text-zinc-400 mb-6">
                Selecione os serviços de interesse e descreva brevemente o seu projeto.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-[#F5B800] mx-auto" />
                  <h3 className="text-lg font-bold text-white">Pedido de orçamento registado (protótipo)</h3>
                  <p className="text-sm text-zinc-300">
                    A integração comercial de envio será ligada na próxima fase.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="lc-btn-secondary px-5 py-2 text-xs"
                  >
                    Novo pedido
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Nome *
                      </label>
                      <input type="text" required placeholder="O seu nome" className="lc-input text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Email *
                      </label>
                      <input type="email" required placeholder="email@empresa.pt" className="lc-input text-sm" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Telefone / WhatsApp *
                      </label>
                      <input type="tel" required placeholder="+351 ..." className="lc-input text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Nome da Empresa
                      </label>
                      <input type="text" placeholder="Empresa" className="lc-input text-sm" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Setor de Atividade *
                      </label>
                      <select required className="lc-input text-sm">
                        <option value="">Selecione um setor</option>
                        {SECTORS.map((s) => (
                          <option key={s.slug} value={s.slug}>
                            {s.name}
                          </option>
                        ))}
                        <option value="outro">Outro setor</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Tipo de Projeto *
                      </label>
                      <select required className="lc-input text-sm">
                        <option value="novo">Novo Projeto</option>
                        <option value="redesign">Melhoria / Redesign</option>
                        <option value="sistema-360">Ecossistema 360° Completo</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-semibold text-zinc-300 mb-2">
                      Serviços de interesse (pode escolher vários)
                    </span>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {SERVICES.map((srv) => (
                        <label
                          key={srv.slug}
                          className="flex items-center gap-2.5 p-3 rounded-xl bg-[#0a0b0e] border border-white/10 text-xs text-zinc-200 cursor-pointer hover:border-amber-500/40"
                        >
                          <input type="checkbox" className="accent-[#F5B800]" />
                          <span>{srv.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Descreva o seu projeto ou objetivos *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Explique o que pretende alcançar..."
                      className="lc-input text-sm"
                    />
                  </div>

                  <button type="submit" className="lc-btn-primary w-full py-3.5 text-sm sm:text-base">
                    Pedir Orçamento
                  </button>

                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <Lock className="w-4 h-4 text-[#F5B800] shrink-0" />
                    <span>Os seus dados estão protegidos e serão utilizados apenas para responder ao seu pedido.</span>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Info Column */}
          <div className="lg:col-span-5 space-y-5">
            <div className="lc-card rounded-3xl p-6 space-y-4">
              <h2 className="text-xl font-bold text-white">O que vai receber?</h2>
              <ul className="space-y-3 text-sm text-zinc-300">
                {[
                  "Análise das necessidades do seu negócio",
                  "Proposta personalizada e detalhada",
                  "Estimativa de prazos de implementação",
                  "Opções de planos e investimento",
                  "Acompanhamento da nossa equipa",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#F5B800] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lc-card rounded-3xl p-6 flex items-start gap-4">
              <Clock className="w-6 h-6 text-[#F5B800] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-bold text-white">Prazo de resposta</h3>
                <p className="text-sm text-zinc-400 mt-1">
                  [Prazo de resposta oficial a confirmar com a equipa comercial].
                </p>
              </div>
            </div>

            <div className="lc-card rounded-3xl p-6 space-y-3">
              <h3 className="text-base font-bold text-white">Prefere ver uma demonstração primeiro?</h3>
              <p className="text-sm text-zinc-400">
                Agende uma sessão gratuita antes de avançar para o orçamento.
              </p>
              <Link href="/pedir-demonstracao" className="lc-btn-secondary w-full py-3 text-center text-sm block">
                Pedir Demonstração
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
