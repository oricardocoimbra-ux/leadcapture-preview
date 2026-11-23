"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { CONTACT_INFO } from "@/data/site-data";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TurnstileWidget, isTurnstileClientEnabled } from "@/components/forms/TurnstileWidget";
import { isValidEmail, isValidPhone } from "@/lib/form-validation";

type ContactErrors = Partial<Record<"name" | "email" | "phone" | "message", string>>;

export default function ContactosPage() {
  const formStartedAtRef = useRef<number>(Date.now());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("demo");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [disabledNotice, setDisabledNotice] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = (): ContactErrors => {
    const next: ContactErrors = {};
    if (name.trim().length < 2) {
      next.name = "Indique o seu nome (mínimo 2 caracteres).";
    }
    if (!isValidEmail(email)) {
      next.email = "Introduza um endereço de email válido (ex.: nome@empresa.pt).";
    }
    if (phone.trim().length > 0 && !isValidPhone(phone)) {
      next.phone = "Introduza um número de telefone válido (mínimo 9 dígitos).";
    }
    if (message.trim().length < 10) {
      next.message = "Escreva uma mensagem com pelo menos 10 caracteres.";
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
          formType: "contactos",
          name,
          email,
          phone,
          subject,
          message,
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
        setMessage("");
      } else if (res.status === 503 || data?.configured === false) {
        setDisabledNotice(
          data?.error ||
            "O envio de formulários encontra-se desativado neste ambiente. O pedido não foi enviado nem guardado."
        );
      } else {
        if (data?.fieldErrors && typeof data.fieldErrors === "object") {
          setErrors(data.fieldErrors as ContactErrors);
        }
        setServerError(
          data?.error || "Não foi possível enviar a mensagem. Tente novamente mais tarde."
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
        <Breadcrumbs items={[{ label: "Contactos" }]} />

        <div className="max-w-3xl space-y-4 mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-[#F5B800]">
            Contactos
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
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="mt-0.5 block text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  {CONTACT_INFO.email}
                </a>
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
                Preencha o formulário abaixo. Os campos marcados com{" "}
                <span className="text-[#F5B800]">*</span> são obrigatórios.
              </p>

              <form onSubmit={handleSubmit} noValidate aria-busy={submitting} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-zinc-200 mb-1.5"
                    >
                      Nome Completo <span className="text-[#F5B800]">*</span>
                    </label>
                    <input
                      id="contact-name"
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
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      placeholder="O seu nome"
                      className={`lc-input text-sm ${errors.name ? "border-red-500/70" : ""}`}
                    />
                    {errors.name && (
                      <p id="contact-name-error" role="alert" className="mt-1.5 text-xs text-red-400">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-zinc-200 mb-1.5"
                    >
                      Email Profissional <span className="text-[#F5B800]">*</span>
                    </label>
                    <input
                      id="contact-email"
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
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      placeholder="email@empresa.pt"
                      className={`lc-input text-sm ${errors.email ? "border-red-500/70" : ""}`}
                    />
                    {errors.email && (
                      <p id="contact-email-error" role="alert" className="mt-1.5 text-xs text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-semibold text-zinc-200 mb-1.5"
                    >
                      Telefone / WhatsApp <span className="text-zinc-500">(opcional)</span>
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                      placeholder="+351 9XX XXX XXX"
                      className={`lc-input text-sm ${errors.phone ? "border-red-500/70" : ""}`}
                    />
                    {errors.phone && (
                      <p id="contact-phone-error" role="alert" className="mt-1.5 text-xs text-red-400">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs font-semibold text-zinc-200 mb-1.5"
                    >
                      Assunto / Interesse
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="lc-input text-sm"
                    >
                      <option value="demo">Pedir Demonstração</option>
                      <option value="orcamento">Pedir Orçamento</option>
                      <option value="suporte">Suporte</option>
                      <option value="outro">Outro assunto</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-zinc-200 mb-1.5"
                  >
                    Mensagem <span className="text-[#F5B800]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    placeholder="Conte-nos como podemos ajudar..."
                    className={`lc-input text-sm ${errors.message ? "border-red-500/70" : ""}`}
                  />
                  {errors.message && (
                    <p id="contact-message-error" role="alert" className="mt-1.5 text-xs text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="hidden" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
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
                      <p className="font-bold text-white">Mensagem enviada com sucesso</p>
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
                        A sua mensagem não foi enviada nem guardada
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
                    "Enviar Mensagem"
                  )}
                </button>

                <div className="flex items-start gap-2 text-xs text-zinc-400 pt-1">
                  <ShieldCheck className="w-4 h-4 text-[#F5B800] shrink-0 mt-0.5" />
                  <span>
                    Os seus dados serão utilizados apenas para responder ao seu contacto. Consulte
                    os rascunhos de{" "}
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
