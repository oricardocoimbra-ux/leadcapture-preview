"use client";

import { useState } from "react";
import Link from "next/link";
import { Info, Lock } from "lucide-react";
import { LeadCaptureLogo } from "@/components/ui/LeadCaptureLogo";
import { GoogleOAuthButton } from "@/components/auth/GoogleOAuthButton";

export default function LoginPage() {
  const [notice, setNotice] = useState<string | null>(null);

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
              "Google OAuth 2.0 (Supabase Auth) preparado na arquitetura. Ativar após configurar credenciais no Google Cloud Console e .env.local."
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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setNotice(
              "Autenticação Email/Password preparada para ligação ao Supabase Auth na fase de ativação."
            );
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Email</label>
            <input type="email" required placeholder="email@empresa.pt" className="lc-input text-sm" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-zinc-300">Palavra-passe</label>
              <Link
                href="/recuperar-password"
                className="text-xs font-semibold text-[#F5B800] hover:underline"
              >
                Recuperar palavra-passe?
              </Link>
            </div>
            <input type="password" required placeholder="••••••••" className="lc-input text-sm" />
          </div>

          <button type="submit" className="lc-btn-primary w-full py-3.5 text-sm">
            Iniciar Sessão
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
            Ainda não tem conta?{" "}
            <Link href="/registar" className="text-[#F5B800] font-semibold hover:underline">
              Criar conta
            </Link>
          </p>
          <p className="inline-flex items-center gap-1.5 text-[11px] text-zinc-500">
            <Lock className="w-3.5 h-3.5 text-[#F5B800]" />
            Sessões protegidas por OAuth 2.0 e Supabase Auth (RLS)
          </p>
        </div>
      </div>
    </div>
  );
}
