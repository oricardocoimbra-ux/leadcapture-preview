import Link from "next/link";
import { LeadCaptureLogo } from "@/components/ui/LeadCaptureLogo";
import { SECTORS } from "@/data/sectors";
import { SERVICES } from "@/data/services";

export function SiteFooter() {
  return (
    <footer className="border-t border-amber-500/20 bg-[#050507] pt-14 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <LeadCaptureLogo size="md" />
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              Parceiro 360° para o crescimento digital do seu negócio. Websites, lojas online, CRM,
              automação com IA e soluções por setor.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/pedir-demonstracao"
                className="lc-btn-primary px-5 py-2 text-xs inline-flex items-center"
              >
                Pedir Demonstração
              </Link>
              <Link
                href="/pedir-orcamento"
                className="lc-btn-secondary px-5 py-2 text-xs inline-flex items-center"
              >
                Pedir Orçamento
              </Link>
            </div>
          </div>

          {/* Serviços */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#F5B800] mb-4">
              Soluções & Serviços
            </h3>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              {SERVICES.map((srv) => (
                <li key={srv.slug}>
                  <Link href={`/solucoes/${srv.slug}`} className="hover:text-white transition-colors">
                    {srv.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Por Negócio */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#F5B800] mb-4">
              Por Negócio
            </h3>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              {SECTORS.map((sec) => (
                <li key={sec.slug}>
                  <Link href={`/por-negocio/${sec.slug}`} className="hover:text-white transition-colors">
                    {sec.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institucional & Comercial */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#F5B800] mb-4">
              LeadCapture
            </h3>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>
                <Link href="/sobre-nos" className="hover:text-white transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white transition-colors">
                  Portefólio
                </Link>
              </li>
              <li>
                <Link href="/casos-de-sucesso" className="hover:text-white transition-colors">
                  Casos de Sucesso
                </Link>
              </li>
              <li>
                <Link href="/demonstracoes" className="hover:text-white transition-colors">
                  Demonstrações
                </Link>
              </li>
              <li>
                <Link href="/precos" className="hover:text-white transition-colors">
                  Preços
                </Link>
              </li>
              <li>
                <Link href="/recursos" className="hover:text-white transition-colors">
                  Recursos
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contactos" className="hover:text-white transition-colors">
                  Contactos
                </Link>
              </li>
              <li>
                <Link href="/area-cliente" className="hover:text-[#F5B800] transition-colors font-semibold text-zinc-300">
                  Área de Cliente
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Iniciar Sessão
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} LeadCapture. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <Link href="/contactos" className="hover:text-zinc-300 transition-colors">
              Política de Privacidade (em preparação)
            </Link>
            <span>|</span>
            <Link href="/contactos" className="hover:text-zinc-300 transition-colors">
              Termos e Condições (em preparação)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
