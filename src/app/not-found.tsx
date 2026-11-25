import Link from "next/link";
import { ArrowRight, Compass, Home, Mail } from "lucide-react";

export const metadata = {
  title: "Página não encontrada (404)",
  description:
    "A página que procura não existe ou foi movida. Explore as soluções LeadCapture ou entre em contacto com a nossa equipa.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="pt-16 pb-24 px-4 sm:px-6 lg:px-8 lc-glow-ambient">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/35 text-xs font-bold tracking-widest uppercase text-[#F5B800]">
          <Compass className="w-3.5 h-3.5" />
          Erro 404
        </span>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
          Esta página não foi <span className="text-[#F5B800]">encontrada.</span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
          O endereço que tentou abrir pode ter sido movido ou já não estar disponível. Utilize um
          dos atalhos abaixo para continuar a explorar a LeadCapture.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="lc-btn-primary w-full sm:w-auto px-6 py-3.5 text-sm inline-flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Voltar ao Início
          </Link>
          <Link
            href="/solucoes"
            className="lc-btn-secondary w-full sm:w-auto px-6 py-3.5 text-sm inline-flex items-center justify-center gap-2"
          >
            Explorar Soluções
            <ArrowRight className="w-4 h-4 text-[#F5B800]" />
          </Link>
          <Link
            href="/contactos"
            className="lc-btn-secondary w-full sm:w-auto px-6 py-3.5 text-sm inline-flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4 text-[#F5B800]" />
            Falar Connosco
          </Link>
        </div>
      </div>
    </div>
  );
}
