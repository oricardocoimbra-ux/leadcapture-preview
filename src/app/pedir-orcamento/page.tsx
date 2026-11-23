"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, Clock, Loader2, Lock } from "lucide-react";
import { SECTORS } from "@/data/sectors";
import { SERVICES } from "@/data/services";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TurnstileWidget, isTurnstileClientEnabled } from "@/components/forms/TurnstileWidget";
import { isValidEmail, isValidPhone } from "@/lib/form-validation";

type QuoteErrors = Partial<
  Record<"name" | "email" | "phone" | "sector" | "description", string>
>;

const SPECIALIZED_QUOTE_SERVICES = [
  {
    slug: "solucoes-a-medida",
    name: "Soluções Digitais à Medida (Apps, Automatizações & Integrações)",
  },
  {
    slug: "marca-propria",
    name: "Produtos de Marca Própria (Conceito, Embalagem & Coordenação)",
  },
  {
    slug: "apoio-inpi",
    name: "Apoio Administrativo a Pedido de Marca no INPI",
  },
  {
    slug: "conteudo-imobiliario",
    name: "Conteúdo Imobiliário (Vídeos de Fotos & Melhoria Fotográfica)",
  },
] as const;

export default function PedirOrcamentoPage() {
  const formStartedAtRef = useRef<number>(Date.now());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [sector, setSector] = useState("");
  const [projectType, setProjectType] = useState("novo");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [disabledNotice, setDisabledNotice] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const setorParam = params.get("setor");
    const servicoParam = params.get("servico");
    if (setorParam && SECTORS.some((s) => s.slug === setorParam)) {
      setSector(setorParam);
    }
    const isKnownService =
      Boolean(servicoParam) &&
      (SERVICES.some((s) => s.slug === servicoParam) ||
        SPECIALIZED_QUOTE_SERVICES.some((s) => s.slug === servicoParam));
    if (servicoParam && isKnownService) {
      setSelectedServices((prev) => (prev.includes(servicoParam) ? prev : [...prev, servicoParam]));
      if (servicoParam === "solucoes-a-medida") {
        setProjectType("a-medida");
      }
    }
  }, []);

  const toggleService = (slug: string) => {
    setSelectedServices((prev) =>
      prev.includes(slug) ? prev.filter((item) => item !== slug) : [...prev, slug]
    );
  };

  const validate = (): QuoteErrors => {
    const next: QuoteErrors = {};
    if (name.trim().length < 2) {
      next.name = "Indique o seu nome (mínimo 2 caracteres).";
    }
    if (!isValidEmail(email)) {
      next.email = "Introduza um endereço de email válido (ex.: nome@empresa.pt).";
    }
    if (!isValidPhone(phone)) {
      next.phone = "Introduza um número de telefone ou WhatsApp válido (mínimo 9 dígitos).";
    }
    if (!sector) {
      next.sector = "Selecione o setor de atividade do seu negócio.";
    }
    if (description.trim().length < 15) {
      next.description = "Descreva o seu projeto ou objetivos (mínimo 15 caracteres).";
    }
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSentSuccess(false);
    setDisabledNotice(null);
    setServerError(null);

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (isTurnstileClientEnabled && !turnstileToken) {
      setServerError("Complete a verificação anti-spam antes de enviar.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/forms/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "orcamento",
          name,
          email,
          phone,
          company,
          sector,
          projectType,
          services: selectedServices,
          message: description,
          website,
          formStartedAt: formStartedAtRef.current,
          turnstileToken: turnstileToken || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data?.ok === true && data?.sent === true) {
        setSentSuccess(true);
        setName("");
        setEmail("");
        setPhone("");
        setCompany("");
        setDescription("");
        setSelectedServices([]);
      } else if (res.status === 503 || data?.configured === false) {
        setDisabledNotice(
          data?.error ||
            "O envio de formulários encontra-se desativado neste ambiente. O pedido não foi enviado nem guardado."
        );
      } else {
        if (data?.fieldErrors && typeof data.fieldErrors === "object") {
          const fe = data.fieldErrors as Record<string, string>;
          setErrors({
            name: fe.name,
            email: fe.email,
            phone: fe.phone,
            sector: fe.sector,
            description: fe.message,
          });
        }
        setServerError(
          data?.error || "Não foi possível enviar o pedido de orçamento. Tente novamente mais tarde."
        );
      }
    } catch {
      setServerError("Erro de comunicação com o servidor. O pedido não foi enviado.");
    } finally {
      setSubmitting(false);
      if (isTurnstileClientEnabled) {
        setTurnstileToken("");
        setTurnstileReset((n) => n + 1);
      }
    }
  };

  return (
    <div className="pt-10 pb-20 px-4 sm:px-6 lg:px-8 lc-glow-ambient">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={[{ label: "Pedir Orçamento" }]} />

        <div className="max-w-3xl space-y-4 mb-10">
          <span className="text-xs font-bold tracking-widest uppercase text-[#F5B800]">
            Pedir Orçamento
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
                Selecione os serviços de interesse e descreva brevemente o seu projeto. Os campos
                marcados com <span className="text-[#F5B800]">*</span> são obrigatórios.
              </p>

              <form onSubmit={handleSubmit} noValidate aria-busy={submitting} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="quote-name"
                      className="block text-xs font-semibold text-zinc-200 mb-1.5"
                    >
                      Nome Completo <span className="text-[#F5B800]">*</span>
                    </label>
                    <input
                      id="quote-name"
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
                      aria-describedby={errors.name ? "quote-name-error" : undefined}
                      placeholder="O seu nome"
                      className={`lc-input text-sm ${errors.name ? "border-red-500/70" : ""}`}
                    />
                    {errors.name && (
                      <p id="quote-name-error" role="alert" className="mt-1.5 text-xs text-red-400">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="quote-email"
                      className="block text-xs font-semibold text-zinc-200 mb-1.5"
                    >
                      Email Profissional <span className="text-[#F5B800]">*</span>
                    </label>
                    <input
                      id="quote-email"
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
                      aria-describedby={errors.email ? "quote-email-error" : undefined}
                      placeholder="email@empresa.pt"
                      className={`lc-input text-sm ${errors.email ? "border-red-500/70" : ""}`}
                    />
                    {errors.email && (
                      <p id="quote-email-error" role="alert" className="mt-1.5 text-xs text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="quote-phone"
                      className="block text-xs font-semibold text-zinc-200 mb-1.5"
                    >
                      Telefone / WhatsApp <span className="text-[#F5B800]">*</span>
                    </label>
                    <input
                      id="quote-phone"
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
                      aria-describedby={errors.phone ? "quote-phone-error" : undefined}
                      placeholder="+351 9XX XXX XXX"
                      className={`lc-input text-sm ${errors.phone ? "border-red-500/70" : ""}`}
                    />
                    {errors.phone && (
                      <p id="quote-phone-error" role="alert" className="mt-1.5 text-xs text-red-400">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="quote-company"
                      className="block text-xs font-semibold text-zinc-200 mb-1.5"
                    >
                      Nome da Empresa <span className="text-zinc-500">(opcional)</span>
                    </label>
                    <input
                      id="quote-company"
                      name="organization"
                      type="text"
                      autoComplete="organization"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Nome da empresa"
                      className="lc-input text-sm"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="quote-sector"
                      className="block text-xs font-semibold text-zinc-200 mb-1.5"
                    >
                      Setor de Atividade <span className="text-[#F5B800]">*</span>
                    </label>
                    <select
                      id="quote-sector"
                      name="sector"
                      required
                      value={sector}
                      onChange={(e) => {
                        setSector(e.target.value);
                        if (errors.sector) setErrors((prev) => ({ ...prev, sector: undefined }));
                      }}
                      aria-invalid={Boolean(errors.sector)}
                      aria-describedby={errors.sector ? "quote-sector-error" : undefined}
                      className={`lc-input text-sm ${errors.sector ? "border-red-500/70" : ""}`}
                    >
                      <option value="">Selecione um setor</option>
                      {SECTORS.map((s) => (
                        <option key={s.slug} value={s.slug}>
                          {s.name}
                        </option>
                      ))}
                      <option value="outro">Outro setor</option>
                    </select>
                    {errors.sector && (
                      <p id="quote-sector-error" role="alert" className="mt-1.5 text-xs text-red-400">
                        {errors.sector}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="quote-project-type"
                      className="block text-xs font-semibold text-zinc-200 mb-1.5"
                    >
                      Tipo de Projeto <span className="text-[#F5B800]">*</span>
                    </label>
                    <select
                      id="quote-project-type"
                      name="projectType"
                      required
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="lc-input text-sm"
                    >
                      <option value="novo">Novo Projeto</option>
                      <option value="redesign">Melhoria / Redesign</option>
                      <option value="sistema-360">Ecossistema 360° Completo</option>
                      <option value="a-medida">Projeto à Medida / Personalizado</option>
                    </select>
                  </div>
                </div>

                <fieldset className="space-y-3">
                  <legend className="block text-xs font-semibold text-zinc-200 mb-2">
                    Serviços de interesse <span className="text-zinc-500">(pode escolher vários)</span>
                  </legend>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {SERVICES.map((srv) => {
                      const checked = selectedServices.includes(srv.slug);
                      return (
                        <label
                          key={srv.slug}
                          htmlFor={`quote-srv-${srv.slug}`}
                          className={`flex items-center gap-2.5 p-3 rounded-xl bg-[#0a0b0e] border text-xs text-zinc-200 cursor-pointer transition-colors ${
                            checked
                              ? "border-amber-500/60 bg-amber-500/5"
                              : "border-white/10 hover:border-amber-500/40"
                          }`}
                        >
                          <input
                            id={`quote-srv-${srv.slug}`}
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleService(srv.slug)}
                            className="accent-[#F5B800]"
                          />
                          <span>{srv.name}</span>
                        </label>
                      );
                    })}
                  </div>

                  <div className="pt-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#F5B800] mb-2">
                      Ofertas Especializadas & Complementares
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {SPECIALIZED_QUOTE_SERVICES.map((srv) => {
                        const checked = selectedServices.includes(srv.slug);
                        return (
                          <label
                            key={srv.slug}
                            htmlFor={`quote-srv-${srv.slug}`}
                            className={`flex items-start gap-2.5 p-3 rounded-xl bg-[#0a0b0e] border text-xs text-zinc-200 cursor-pointer transition-colors ${
                              checked
                                ? "border-amber-500/60 bg-amber-500/5"
                                : "border-white/10 hover:border-amber-500/40"
                            }`}
                          >
                            <input
                              id={`quote-srv-${srv.slug}`}
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleService(srv.slug)}
                              className="accent-[#F5B800] mt-0.5 shrink-0"
                            />
                            <span className="leading-snug">{srv.name}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </fieldset>

                <div>
                  <label
                    htmlFor="quote-description"
                    className="block text-xs font-semibold text-zinc-200 mb-1.5"
                  >
                    Descreva o seu projeto ou objetivos <span className="text-[#F5B800]">*</span>
                  </label>
                  <textarea
                    id="quote-description"
                    name="description"
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      if (errors.description) {
                        setErrors((prev) => ({ ...prev, description: undefined }));
                      }
                    }}
                    aria-invalid={Boolean(errors.description)}
                    aria-describedby={errors.description ? "quote-description-error" : undefined}
                    placeholder="Explique o que pretende alcançar, prazos desejados ou funcionalidades..."
                    className={`lc-input text-sm ${errors.description ? "border-red-500/70" : ""}`}
                  />
                  {errors.description && (
                    <p
                      id="quote-description-error"
                      role="alert"
                      className="mt-1.5 text-xs text-red-400"
                    >
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="hidden" aria-hidden="true">
                  <label htmlFor="quote-website">Website</label>
                  <input
                    id="quote-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                <TurnstileWidget
                  onVerify={setTurnstileToken}
                  onExpireOrError={() => setTurnstileToken("")}
                  resetSignal={turnstileReset}
                />

                {sentSuccess && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/45 flex items-start gap-3 text-left"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="space-y-1 text-xs sm:text-sm">
                      <p className="font-bold text-white">Pedido de orçamento enviado com sucesso</p>
                      <p className="text-zinc-300 leading-relaxed">
                        O servidor confirmou o envio do seu pedido para a equipa LeadCapture.
                        Responderemos para o endereço de email indicado.
                      </p>
                    </div>
                  </div>
                )}

                {disabledNotice && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/45 flex items-start gap-3 text-left"
                  >
                    <AlertTriangle className="w-5 h-5 text-[#F5B800] shrink-0 mt-0.5" />
                    <div className="space-y-1 text-xs sm:text-sm">
                      <p className="font-bold text-white">
                        Este pedido de orçamento não foi enviado nem guardado
                      </p>
                      <p className="text-zinc-300 leading-relaxed">{disabledNotice}</p>
                    </div>
                  </div>
                )}

                {serverError && (
                  <div
                    role="alert"
                    className="p-4 rounded-2xl bg-red-500/10 border border-red-500/45 text-xs sm:text-sm text-red-300 font-medium"
                  >
                    {serverError}
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
                      A enviar...
                    </>
                  ) : (
                    "Pedir Orçamento"
                  )}
                </button>

                <div className="flex items-start gap-2 text-xs text-zinc-400">
                  <Lock className="w-4 h-4 text-[#F5B800] shrink-0 mt-0.5" />
                  <span>
                    Os seus dados serão utilizados apenas para responder ao seu pedido. Consulte os
                    rascunhos de{" "}
                    <Link
                      href="/politica-de-privacidade"
                      className="text-zinc-200 underline hover:text-[#F5B800]"
                    >
                      Política de Privacidade
                    </Link>{" "}
                    e{" "}
                    <Link
                      href="/termos-e-condicoes"
                      className="text-zinc-200 underline hover:text-[#F5B800]"
                    >
                      Termos e Condições
                    </Link>
                    .
                  </span>
                </div>
              </form>
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
