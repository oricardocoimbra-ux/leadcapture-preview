"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, Loader2 } from "lucide-react";
import { LeadCaptureLogo } from "@/components/ui/LeadCaptureLogo";
import { isValidEmail } from "@/lib/form-validation";

export default function RecuperarPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice(null);

    if (!isValidEmail(email)) {
      setError("Introduza um endereço de email válido.");
      return;
    }
    setError(null);
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setNotice(
        "Nenhum email foi enviado: a recuperação de palavra-passe (Supabase Auth) ainda não está ligada neste ambiente de pré-visualização."
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
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Recuperar Palavra-passe
          </h1>
          <p className="text-sm text-zinc-400">
            Introduza o seu email para receber um link seguro de redefinição.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate aria-busy={submitting} className="space-y-4">
          <div>
            <label
              htmlFor="recover-email"
              className="block text-xs font-semibold text-zinc-200 mb-1.5"
            >
              Email <span className="text-[#F5B800]">*</span>
            </label>
            <input
              id="recover-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "recover-email-error" : undefined}
              placeholder="email@empresa.pt"
              className={`lc-input text-sm ${error ? "border-red-500/70" : ""}`}
            />
            {error && (
              <p id="recover-email-error" role="alert" className="mt-1.5 text-xs text-red-400">
                {error}
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
              "Enviar Link de Recuperação"
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

        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
          <Link href="/login" className="text-[#F5B800] font-semibold hover:underline">
            ← Iniciar sessão
          </Link>
          <Link href="/registar" className="hover:text-white">
            Criar conta →
          </Link>
        </div>
      </div>
    </div>
  );
}
