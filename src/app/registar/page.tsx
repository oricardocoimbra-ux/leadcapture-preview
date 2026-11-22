"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, Loader2, ShieldCheck } from "lucide-react";
import { LeadCaptureLogo } from "@/components/ui/LeadCaptureLogo";
import { GoogleOAuthButton } from "@/components/auth/GoogleOAuthButton";
import { isValidEmail } from "@/lib/form-validation";

type RegisterErrors = Partial<Record<"name" | "email" | "password" | "confirm", string>>;

export default function RegistarPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice(null);

    const next: RegisterErrors = {};
    if (name.trim().length < 2) {
      next.name = "Indique o seu nome completo (mínimo 2 caracteres).";
    }
    if (!isValidEmail(email)) {
      next.email = "Introduza um endereço de email válido.";
    }
    if (password.length < 8) {
      next.password = "A palavra-passe deve ter pelo menos 8 caracteres.";
    }
    if (password !== confirm) {
      next.confirm = "As palavras-passe não coincidem.";
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setNotice(
        "A conta ainda não foi criada: o registo (Supabase Auth) ainda não está ativo neste ambiente de pré-visualização. Nenhum dado foi enviado ou guardado."
      );
    }, 250);
  };

  return (
    <div className="py-14 px-4 sm:px-6 lg:px-8 lc-glow-ambient">
      <div className="max-w-md mx-auto lc-card-featured rounded-3xl p-7 sm:p-9 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-3">
            <LeadCaptureLogo size="md" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Criar Conta</h1>
          <p className="text-sm text-zinc-400">
            Registe-se para aceder à Área de Cliente LeadCapture.
          </p>
        </div>

        <GoogleOAuthButton
          label="Continuar com Google"
          onClick={() =>
            setNotice(
              "O registo via Google OAuth 2.0 ainda não está ativo neste ambiente de pré-visualização. Nenhuma conta foi criada."
            )
          }
        />

        <div className="relative flex items-center justify-center">
          <span className="border-t border-white/10 w-full" />
          <span className="px-3 text-xs uppercase tracking-wider text-zinc-500 bg-[#13120e]">
            ou
          </span>
          <span className="border-t border-white/10 w-full" />
        </div>

        <form onSubmit={handleSubmit} noValidate aria-busy={submitting} className="space-y-4">
          <div>
            <label
              htmlFor="register-name"
              className="block text-xs font-semibold text-zinc-200 mb-1.5"
            >
              Nome Completo <span className="text-[#F5B800]">*</span>
            </label>
            <input
              id="register-name"
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
              aria-describedby={errors.name ? "register-name-error" : undefined}
              placeholder="O seu nome"
              className={`lc-input text-sm ${errors.name ? "border-red-500/70" : ""}`}
            />
            {errors.name && (
              <p id="register-name-error" role="alert" className="mt-1.5 text-xs text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="register-email"
              className="block text-xs font-semibold text-zinc-200 mb-1.5"
            >
              Email <span className="text-[#F5B800]">*</span>
            </label>
            <input
              id="register-email"
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
              aria-describedby={errors.email ? "register-email-error" : undefined}
              placeholder="email@empresa.pt"
              className={`lc-input text-sm ${errors.email ? "border-red-500/70" : ""}`}
            />
            {errors.email && (
              <p id="register-email-error" role="alert" className="mt-1.5 text-xs text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="register-password"
              className="block text-xs font-semibold text-zinc-200 mb-1.5"
            >
              Palavra-passe <span className="text-[#F5B800]">*</span>
            </label>
            <input
              id="register-password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "register-password-error" : undefined}
              placeholder="Mínimo 8 caracteres"
              className={`lc-input text-sm ${errors.password ? "border-red-500/70" : ""}`}
            />
            {errors.password && (
              <p id="register-password-error" role="alert" className="mt-1.5 text-xs text-red-400">
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="register-confirm"
              className="block text-xs font-semibold text-zinc-200 mb-1.5"
            >
              Confirmar Palavra-passe <span className="text-[#F5B800]">*</span>
            </label>
            <input
              id="register-confirm"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
                if (errors.confirm) setErrors((prev) => ({ ...prev, confirm: undefined }));
              }}
              aria-invalid={Boolean(errors.confirm)}
              aria-describedby={errors.confirm ? "register-confirm-error" : undefined}
              placeholder="Repita a palavra-passe"
              className={`lc-input text-sm ${errors.confirm ? "border-red-500/70" : ""}`}
            />
            {errors.confirm && (
              <p id="register-confirm-error" role="alert" className="mt-1.5 text-xs text-red-400">
                {errors.confirm}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="lc-btn-primary w-full py-3.5 text-sm inline-flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                A validar...
              </>
            ) : (
              "Criar Conta"
            )}
          </button>
        </form>

        {notice && (
          <div
            role="status"
            aria-live="polite"
            className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-start gap-2.5 text-xs text-zinc-200"
          >
            <AlertTriangle className="w-4 h-4 text-[#F5B800] shrink-0 mt-0.5" />
            <span>{notice}</span>
          </div>
        )}

        <div className="pt-2 border-t border-white/10 text-center space-y-2 text-xs text-zinc-400">
          <p>
            Já tem conta?{" "}
            <Link href="/login" className="text-[#F5B800] font-semibold hover:underline">
              Iniciar sessão
            </Link>
          </p>
          <p className="inline-flex items-center gap-1.5 text-[11px] text-zinc-500">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F5B800]" />
            Incluirá verificação obrigatória de email após ativação
          </p>
        </div>
      </div>
    </div>
  );
}
