"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, Loader2, Lock } from "lucide-react";
import { LeadCaptureLogo } from "@/components/ui/LeadCaptureLogo";
import { GoogleOAuthButton } from "@/components/auth/GoogleOAuthButton";
import { isValidEmail } from "@/lib/form-validation";

type LoginErrors = Partial<Record<"email" | "password", string>>;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice(null);

    const next: LoginErrors = {};
    if (!isValidEmail(email)) {
      next.email = "Introduza um endereço de email válido.";
    }
    if (password.length < 1) {
      next.password = "Introduza a sua palavra-passe.";
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setNotice(
        "Não foi iniciada sessão: a autenticação (Supabase Auth) ainda não está ligada neste ambiente de pré-visualização. Nenhuma credencial foi enviada."
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
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Iniciar Sessão</h1>
          <p className="text-sm text-zinc-400">
            Aceda à sua Área de Cliente LeadCapture.
          </p>
        </div>

        <GoogleOAuthButton
          onClick={() =>
            setNotice(
              "Google OAuth 2.0 ainda não está ativo neste ambiente de pré-visualização. Nenhum pedido de autenticação foi enviado."
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
              htmlFor="login-email"
              className="block text-xs font-semibold text-zinc-200 mb-1.5"
            >
              Email <span className="text-[#F5B800]">*</span>
            </label>
            <input
              id="login-email"
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
              aria-describedby={errors.email ? "login-email-error" : undefined}
              placeholder="email@empresa.pt"
              className={`lc-input text-sm ${errors.email ? "border-red-500/70" : ""}`}
            />
            {errors.email && (
              <p id="login-email-error" role="alert" className="mt-1.5 text-xs text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="login-password" className="block text-xs font-semibold text-zinc-200">
                Palavra-passe <span className="text-[#F5B800]">*</span>
              </label>
              <Link
                href="/recuperar-password"
                className="text-xs font-semibold text-[#F5B800] hover:underline"
              >
                Recuperar palavra-passe?
              </Link>
            </div>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "login-password-error" : undefined}
              placeholder="••••••••"
              className={`lc-input text-sm ${errors.password ? "border-red-500/70" : ""}`}
            />
            {errors.password && (
              <p id="login-password-error" role="alert" className="mt-1.5 text-xs text-red-400">
                {errors.password}
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
              "Iniciar Sessão"
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
            Ainda não tem conta?{" "}
            <Link href="/registar" className="text-[#F5B800] font-semibold hover:underline">
              Criar conta
            </Link>
          </p>
          <p className="inline-flex items-center gap-1.5 text-[11px] text-zinc-500">
            <Lock className="w-3.5 h-3.5 text-[#F5B800]" />
            Sessões preparadas para OAuth 2.0 e Supabase Auth (RLS)
          </p>
        </div>
      </div>
    </div>
  );
}
