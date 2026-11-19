"use client";

import { useState } from "react";
import Link from "next/link";
import { Info } from "lucide-react";
import { LeadCaptureLogo } from "@/components/ui/LeadCaptureLogo";

export default function RecuperarPasswordPage() {
  const [notice, setNotice] = useState<string | null>(null);

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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setNotice(
              "Fluxo preparado para Supabase Auth: enviará email com link temporário de recuperação."
            );
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Email *</label>
            <input type="email" required placeholder="email@empresa.pt" className="lc-input text-sm" />
          </div>

          <button type="submit" className="lc-btn-primary w-full py-3.5 text-sm">
            Enviar Link de Recuperação
          </button>
        </form>

        {notice && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/35 flex items-start gap-2.5 text-xs text-zinc-200">
            <Info className="w-4 h-4 text-[#F5B800] shrink-0 mt-0.5" />
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
