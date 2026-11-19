"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { CONTACT_INFO } from "@/data/site-data";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export default function ContactosPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="pt-10 pb-20 px-4 sm:px-6 lg:px-8 lc-glow-ambient">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={[{ label: "Contactos" }]} />

        <div className="max-w-3xl space-y-4 mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-[#F5B800]">
            Contactos — Página 21
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Fale connosco, estamos aqui{" "}
            <span className="text-[#F5B800]">para ajudar.</span>
          </h1>
          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
            Tem um projeto, uma ideia ou precisa de mais informações? A nossa equipa está pronta
            para conversar consigo e encontrar a melhor solução.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Channels & Location */}
          <div className="lg:col-span-5 space-y-4">
            <div className="lc-card rounded-2xl p-5 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#161922] border border-amber-500/25 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-[#F5B800]" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">WhatsApp</h2>
                <p className="text-sm text-zinc-400 mt-0.5">{CONTACT_INFO.whatsappLabel}</p>
              </div>
            </div>

            <div className="lc-card rounded-2xl p-5 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#161922] border border-amber-500/25 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-[#F5B800]" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Email</h2>
                <p className="text-sm text-zinc-400 mt-0.5">{CONTACT_INFO.email}</p>
              </div>
            </div>

            <div className="lc-card rounded-2xl p-5 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#161922] border border-amber-500/25 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#F5B800]" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Telefone</h2>
                <p className="text-sm text-zinc-400 mt-0.5">{CONTACT_INFO.phone}</p>
              </div>
            </div>

            <div className="lc-card-featured rounded-2xl p-6 space-y-2">
              <div className="flex items-center gap-2 text-[#F5B800] font-bold text-sm">
                <MapPin className="w-4 h-4" />
                <span>Estamos em Portugal</span>
              </div>
              <p className="text-sm text-zinc-300">{CONTACT_INFO.location}</p>
              <p className="text-xs text-zinc-400">{CONTACT_INFO.hours}</p>
            </div>
          </div>

          {/* Right Column: Message Form */}
          <div className="lg:col-span-7">
            <div className="lc-card-featured rounded-3xl p-6 sm:p-8">
              <h2 className="text-2xl font-extrabold text-white mb-2">Envie-nos uma mensagem</h2>
              <p className="text-sm text-zinc-400 mb-6">
                Preencha o formulário e entraremos em contacto consigo o mais breve possível.
              </p>

              {sent ? (
                <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-[#F5B800] mx-auto" />
                  <h3 className="text-lg font-bold text-white">Mensagem registada (modo protótipo)</h3>
                  <p className="text-sm text-zinc-300">
                    Os canais oficiais e envio automático serão ligados na fase de integrações.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="lc-btn-secondary px-5 py-2 text-xs"
                  >
                    Enviar nova mensagem
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
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
                        Telefone / WhatsApp
                      </label>
                      <input type="tel" placeholder="+351 ..." className="lc-input text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Assunto / Interesse
                      </label>
                      <select className="lc-input text-sm">
                        <option value="demo">Pedir Demonstração</option>
                        <option value="orcamento">Pedir Orçamento</option>
                        <option value="suporte">Suporte</option>
                        <option value="outro">Outro assunto</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Mensagem *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Conte-nos como podemos ajudar..."
                      className="lc-input text-sm"
                    />
                  </div>

                  <button type="submit" className="lc-btn-primary w-full py-3.5 text-sm sm:text-base">
                    Enviar Mensagem
                  </button>

                  <div className="flex items-center gap-2 text-xs text-zinc-400 pt-1">
                    <ShieldCheck className="w-4 h-4 text-[#F5B800] shrink-0" />
                    <span>Os seus dados serão utilizados apenas para responder ao seu contacto.</span>
                  </div>
                </form>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 lc-card rounded-2xl p-5">
              <div>
                <p className="text-sm font-bold text-white">Prefere pedir um orçamento detalhado?</p>
                <p className="text-xs text-zinc-400">Selecione os serviços pretendidos no nosso formulário dedicado.</p>
              </div>
              <Link href="/pedir-orcamento" className="lc-btn-secondary px-5 py-2.5 text-xs">
                Ir para Pedir Orçamento →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
