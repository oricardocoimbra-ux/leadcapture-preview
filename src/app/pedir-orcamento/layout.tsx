import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pedir Orçamento",
  description:
    "Solicite uma proposta personalizada da LeadCapture para websites, lojas online, CRM, automação, soluções digitais à medida, marca própria ou apoio INPI.",
  alternates: { canonical: "/pedir-orcamento" },
};

export default function PedirOrcamentoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
