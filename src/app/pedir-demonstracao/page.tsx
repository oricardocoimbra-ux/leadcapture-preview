"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { SECTORS } from "@/data/sectors";
import { SERVICES } from "@/data/services";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { isValidEmail, isValidPhone } from "@/lib/form-validation";

type DemoErrors = Partial<Record<"name" | "email" | "phone", string>>;

export default function PedirDemonstracaoPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [sector, setSector] = useState("");
  const [service, setService] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<DemoErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [notConnectedNotice, setNotConnectedNotice] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const setorParam = params.get("setor");
    const servicoParam = params.get("servico");
    if (setorParam && SECTORS.some((s) => s.slug === setorParam)) {
      setSector(setorParam);
    }
    if (servicoParam && SERVICES.some((s) => s.slug === servicoParam)) {
      setService(servicoParam);
    }
  }, []);

  const validate = (): DemoErrors => {
    const next: DemoErrors = {};
    if (name.trim().length < 2) {
      next.name = "Indique o seu nome completo (mínimo 2 caracteres).";
    }
    if (!isValidEmail(email)) {
      next.email = "Introduza um endereço de email válido (ex.: nome@empresa.pt).";
    }
    if (!isValidPhone(phone)) {
      next.phone = "Introduza um número de telefone ou WhatsApp válido (mínimo 9 dígitos).";
    }
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotConnectedNotice(false);
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setNotConnectedNotice(true);
    }, 300);
  };

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
                Preencha os seus dados abaixo. Os campos marcados com{" "}
                <span className="text-[#F5B800]">*</span> são obrigatórios.
              </p>

              <form onSubmit={handleSubmit} noValidate aria-busy={submitting} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="demo-name"
                      className="block text-xs font-semibold text-zinc-200 mb-1.5"
                    >
                      Nome Completo <span className="text-[#F5B800]">*</span>
                    </label>
                    <input
                      id="demo-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "demo-name-error" : undefined}
                      placeholder="O seu nome"
                      className={`lc-input text-sm ${errors.name ? "border-red-500/70" : ""}`}
                    />
                    {errors.name && (
                      <p id="demo-name-error" role="alert" className="mt-1.5 text-xs text-red-400">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="demo-email"
                      className="block text-xs font-semibold text-zinc-200 mb-1.5"
                    >
                      Email Profissional <span className="text-[#F5B800]">*</span>
                    </label>
                    <input
                      id="demo-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "demo-email-error" : undefined}
                      placeholder="email@empresa.pt"
                      className={`lc-input text-sm ${errors.email ? "border-red-500/70" : ""}`}
                    />
                    {errors.email && (
                      <p id="demo-email-error" role="alert" className="mt-1.5 text-xs text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="demo-phone"
                      className="block text-xs font-semibold text-zinc-200 mb-1.5"
                    >
                      Telefone / WhatsApp <span className="text-[#F5B800]">*</span>
                    </label>
                    <input
                      id="demo-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "demo-phone-error" : undefined}
                      placeholder="+351 9XX XXX XXX"
                      className={`lc-input text-sm ${errors.phone ? "border-red-500/70" : ""}`}
                    />
                    {errors.phone && (
                      <p id="demo-phone-error" role="alert" className="mt-1.5 text-xs text-red-400">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="demo-company"
                      className="block text-xs font-semibold text-zinc-200 mb-1.5"
                    >
                      Nome da Empresa <span className="text-zinc-500">(opcional)</span>
                    </label>
                    <input
                      id="demo-company"
                      name="organization"
                      type="text"
                      autoComplete="organization"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Nome do negócio"
                      className="lc-input text-sm"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="demo-sector"
                      className="block text-xs font-semibold text-zinc-200 mb-1.5"
                    >
                      Setor de Atividade
                    </label>
                    <select
                      id="demo-sector"
                      name="sector"
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      className="lc-input text-sm"
                    >
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
                    <label
                      htmlFor="demo-service"
                      className="block text-xs font-semibold text-zinc-200 mb-1.5"
                    >
                      Solução Principal
                    </label>
                    <select
                      id="demo-service"
                      name="service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="lc-input text-sm"
                    >
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
                  <label
                    htmlFor="demo-notes"
                    className="block text-xs font-semibold text-zinc-200 mb-1.5"
                  >
                    O que gostaria de ver na demonstração?{" "}
                    <span className="text-zinc-500">(opcional)</span>
                  </label>
                  <textarea
                    id="demo-notes"
                    name="notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Conte-nos brevemente os seus objetivos..."
                    className="lc-input text-sm"
                  />
                </div>

                {notConnectedNotice && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/45 flex items-start gap-3 text-left"
                  >
                    <AlertTriangle className="w-5 h-5 text-[#F5B800] shrink-0 mt-0.5" />
                    <div className="space-y-1 text-xs sm:text-sm">
                      <p className="font-bold text-white">
                        Este pedido de demonstração ainda não foi enviado
                      </p>
                      <p className="text-zinc-300 leading-relaxed">
                        Os seus dados foram validados corretamente, mas este formulário ainda não
                        tem integração ativa de agendamento, email ou CRM neste ambiente de
                        pré-visualização. Nenhum dado foi transmitido ou guardado.
                      </p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="lc-btn-primary w-full py-3.5 text-sm sm:text-base inline-flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      A validar pedido...
                    </>
                  ) : (
                    "Pedir Demonstração Gratuita"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
