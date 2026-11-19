"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, ShoppingCart, X } from "lucide-react";
import { LeadCaptureLogo } from "@/components/ui/LeadCaptureLogo";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { MAIN_NAV } from "@/data/site-data";
import { SERVICES } from "@/data/services";
import { SECTORS } from "@/data/sectors";
import { useCart } from "@/components/cart/CartProvider";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"solucoes" | "por-negocio" | null>(null);
  const { totalCount } = useCart();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-amber-500/15 bg-[#050507]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        <LeadCaptureLogo />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Navegação Principal">
          {MAIN_NAV.map((item) => {
            const active = isActive(item.href);

            if (item.hasDropdown) {
              const items = item.hasDropdown === "solucoes" ? SERVICES : SECTORS;
              const baseHref = item.hasDropdown === "solucoes" ? "/solucoes" : "/por-negocio";

              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.hasDropdown!)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`inline-flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                      active
                        ? "text-[#F5B800]"
                        : "text-zinc-200 hover:text-[#F5B800]"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                  </Link>

                  {openDropdown === item.hasDropdown && (
                    <div className="absolute left-0 top-full pt-2 w-80 z-50">
                      <div className="lc-card rounded-2xl p-3 bg-[#0c0e14]/98 backdrop-blur-xl">
                        <div className="px-3 py-1.5 mb-1 border-b border-white/10 flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5B800]">
                            {item.label}
                          </span>
                          <Link
                            href={baseHref}
                            onClick={() => setOpenDropdown(null)}
                            className="text-xs text-zinc-400 hover:text-white"
                          >
                            Ver todas →
                          </Link>
                        </div>
                        <div className="grid gap-1">
                          {items.map((sub) => (
                            <Link
                              key={sub.slug}
                              href={`${baseHref}/${sub.slug}`}
                              onClick={() => setOpenDropdown(null)}
                              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#F5B800]/10 transition-colors group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-[#161922] border border-amber-500/20 flex items-center justify-center shrink-0">
                                <DynamicIcon name={sub.iconName} className="w-4 h-4 text-[#F5B800]" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-white group-hover:text-[#F5B800] truncate">
                                  {sub.name}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors relative ${
                  active ? "text-[#F5B800]" : "text-zinc-200 hover:text-[#F5B800]"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 bg-[#F5B800] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Primary CTA & Cart */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/carrinho"
            aria-label="Abrir Carrinho"
            className="relative p-2.5 rounded-full border border-amber-500/25 bg-[#101218] text-white hover:border-[#F5B800] hover:text-[#F5B800] transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-[#F5B800] text-[#050507] text-[10px] font-extrabold flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </Link>
          <Link
            href="/pedir-demonstracao"
            className="lc-btn-primary px-5 py-2.5 text-sm inline-flex items-center gap-2"
          >
            Pedir Demonstração
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Cart & Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <Link
            href="/carrinho"
            aria-label="Abrir Carrinho"
            className="relative p-2 rounded-xl border border-amber-500/25 bg-[#101218] text-white"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-4 h-4 px-1 rounded-full bg-[#F5B800] text-[#050507] text-[10px] font-extrabold flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl border border-amber-500/25 bg-[#101218] text-white hover:text-[#F5B800]"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-amber-500/15 bg-[#08090d] px-4 py-5 space-y-4 max-h-[82vh] overflow-y-auto">
          <div className="space-y-1">
            {MAIN_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2.5 rounded-xl text-base font-semibold ${
                  isActive(item.href)
                    ? "bg-[#F5B800]/15 text-[#F5B800]"
                    : "text-zinc-200 hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10">
            <p className="px-3 text-xs font-bold uppercase tracking-wider text-[#F5B800] mb-2">
              Por Negócio
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {SECTORS.map((s) => (
                <Link
                  key={s.slug}
                  href={`/por-negocio/${s.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 rounded-lg text-xs font-medium text-zinc-300 bg-[#101218] border border-white/5 hover:border-amber-500/30"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-white/10">
            <p className="px-3 text-xs font-bold uppercase tracking-wider text-[#F5B800] mb-2">
              Serviços
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {SERVICES.map((srv) => (
                <Link
                  key={srv.slug}
                  href={`/solucoes/${srv.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 rounded-lg text-xs font-medium text-zinc-300 bg-[#101218] border border-white/5 hover:border-amber-500/30"
                >
                  {srv.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-3">
            <Link
              href="/pedir-demonstracao"
              onClick={() => setMobileOpen(false)}
              className="lc-btn-primary w-full py-3 inline-flex items-center justify-center gap-2 text-sm"
            >
              Pedir Demonstração
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
