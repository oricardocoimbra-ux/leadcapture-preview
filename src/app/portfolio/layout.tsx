import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portefólio",
  description:
    "Explore a abordagem, setores de atuação e estrutura de projetos digitais desenvolvidos pela LeadCapture.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
