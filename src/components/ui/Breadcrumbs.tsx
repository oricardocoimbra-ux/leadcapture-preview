import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-zinc-400">
      <Link href="/" className="hover:text-[#F5B800] transition-colors">
        Início
      </Link>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <span key={item.label} className="inline-flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-[#F5B800] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-[#F5B800] font-medium">{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
