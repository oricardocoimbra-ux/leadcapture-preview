import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

interface CtaBannerProps {
  badge?: string;
  title?: string;
  highlight?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CtaBanner({
  badge = "PRÓXIMO PASSO",
  title = "Pronto para transformar",
  highlight = "o seu negócio?",
  description = "Fale connosco, receba uma proposta à medida e veja como a LeadCapture pode ajudar a sua empresa a crescer no digital.",
  primaryLabel = "Pedir Demonstração Gratuita",
  primaryHref = "/pedir-demonstracao",
  secondaryLabel = "Pedir Orçamento",
  secondaryHref = "/pedir-orcamento",
}: CtaBannerProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto lc-card-featured rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-[#F5B800]/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#F5B800] mb-3">
              {badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              {title} <span className="text-[#F5B800]">{highlight}</span>
            </h2>
            <p className="mt-4 text-zinc-300 text-base sm:text-lg leading-relaxed">
              {description}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 shrink-0">
            <Link
              href={primaryHref}
              className="lc-btn-primary px-6 py-3.5 inline-flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Calendar className="w-4 h-4" />
              {primaryLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={secondaryHref}
              className="lc-btn-secondary px-6 py-3.5 inline-flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
