"use client";

import { useState } from "react";
import Link from "next/link";
import { Info, ShieldCheck } from "lucide-react";
import { LeadCaptureLogo } from "@/components/ui/LeadCaptureLogo";
import { GoogleOAuthButton } from "@/components/auth/GoogleOAuthButton";

export default function RegistarPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setNotice("As palavras-passe não coincidem. Verifique antes de continuar.");
      return;
    }
    setNotice(
      "Registo preparado para Supabase Auth: criará perfil único automático em public.profiles e enviará email de verificação."
    );
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
              "Registo via Google OAuth 2.0 preparado: cria automaticamente o perfil único do cliente após consentimento."
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Nome Completo *</label>
            <input type="text" required placeholder="O seu nome" className="lc-input text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Email *</label>
            <input type="email" required placeholder="email@empresa.pt" className="lc-input text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Palavra-passe *</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              className="lc-input text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Confirmar Palavra-passe *
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repita a palavra-passe"
              className="lc-input text-sm"
            />
          </div>

          <button type="submit" className="lc-btn-primary w-full py-3.5 text-sm">
            Criar Conta
          </button>
        </form>

        {notice && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/35 flex items-start gap-2.5 text-xs text-zinc-200">
            <Info className="w-4 h-4 text-[#F5B800] shrink-0 mt-0.5" />
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
            Inclui verificação obrigatória de email
          </p>
        </div>
      </div>
    </div>
  );
}
