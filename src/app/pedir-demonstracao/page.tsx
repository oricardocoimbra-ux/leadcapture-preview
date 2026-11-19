"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, CheckCircle2, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { SECTORS } from "@/data/sectors";
import { SERVICES } from "@/data/services";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export default function PedirDemonstracaoPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="pt-10 pb-20 px-4 sm:px-6 lg:px-8 lc-glow-ambient">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={[{ label: "Pedir Demonstração" }]} />

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#F5B800]">
              <Sparkles className="w-4 h-4" />
              Próximos Passos
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              Pronto para dar o{" "}
              <span className="text-[#F5B800]">próximo passo?</span>
            </h1>
            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
              Agende uma demonstração gratuita e descubra como a LeadCapture pode estruturar o
              website, CRM, automação e presença digital do seu negócio.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {[
                { icon: Calendar, label: "Demonstração personalizada" },
                { icon: Zap, label: "Resposta rápida da equipa" },
                { icon: ShieldCheck, label: "Sem compromisso" },
                { icon: CheckCircle2, label: "Soluções à medida do setor" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="lc-card rounded-2xl p-4 flex items-center gap-3">
                    <Icon className="w-5 h-5 text-[#F5B800] shrink-0" />
                    <span className="text-sm font-semibold text-white">{item.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="lc-card rounded-2xl p-6 space-y-3">
              <h2 className="text-base font-bold text-white">Como começar é simples</h2>
              <ol className="space-y-2 text-sm text-zinc-300">
                <li>1. Peça uma demonstração gratuita através do formulário.</li>
                <li>2. Analisamos os seus objetivos e apresentamos a solução ideal.</li>
                <li>3. Avançamos para implementação com acompanhamento contínuo.</li>
              </ol>
              <div className="pt-2">
                <Link href="/precos" className="text-xs font-semibold text-[#F5B800] hover:underline">
                  Ver planos e soluções →
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="lc-card-featured rounded-3xl p-6 sm:p-8">
              <h2 className="text-2xl font-extrabold text-white mb-2">
                Agendar Demonstração Gratuita
              </h2>
              <p className="text-sm text-zinc-400 mb-6">
                Preencha os seus dados. (Nota: submissão em modo de protótipo visual — integração de
                envio será ativada na fase comercial).
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-[#F5B800] mx-auto" />
                  <h3 className="text-lg font-bold text-white">Pedido registado em modo protótipo</h3>
                  <p className="text-sm text-zinc-300">
                    Na fase de integrações comerciais, este formulário enviará o pedido diretamente
                    para a equipa LeadCapture.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="lc-btn-secondary px-5 py-2 text-xs"
                  >
                    Fazer novo teste
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
                        Nome Completo *
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
                      <input type="text" placeholder="Nome do negócio" className="lc-input text-sm" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Setor de Atividade
                      </label>
                      <select className="lc-input text-sm">
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
                        Solução Principal
                      </label>
                      <select className="lc-input text-sm">
                        <option value="">Selecione uma solução</option>
                        {SERVICES.map((srv) => (
                          <option key={srv.slug} value={srv.slug}>
                            {srv.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      O que gostaria de ver na demonstração?
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Conte-nos brevemente os seus objetivos..."
                      className="lc-input text-sm"
                    />
                  </div>

                  <button type="submit" className="lc-btn-primary w-full py-3.5 text-sm sm:text-base">
                    Pedir Demonstração Gratuita
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
