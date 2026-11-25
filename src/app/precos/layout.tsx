import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preços e Pacotes",
  description:
    "Consulte os pacotes comerciais e serviços digitais da LeadCapture e solicite uma proposta adaptada às necessidades da sua empresa.",
  alternates: { canonical: "/precos" },
};

export default function PrecosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
