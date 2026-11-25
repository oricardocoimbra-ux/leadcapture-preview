import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carrinho (Fase Comercial Futura)",
  description: "Resumo de serviços selecionados (em preparação para fase comercial futura).",
  robots: { index: false, follow: false },
};

export default function CarrinhoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
