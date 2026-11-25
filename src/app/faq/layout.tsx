import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perguntas Frequentes (FAQ)",
  description:
    "Respostas às perguntas mais frequentes sobre os serviços digitais, processos de implementação, acompanhamento e soluções por setor da LeadCapture.",
  alternates: { canonical: "/faq" },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
