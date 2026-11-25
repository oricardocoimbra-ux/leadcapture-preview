import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criar Conta",
  description: "Registo na Área de Cliente LeadCapture (em preparação).",
  robots: { index: false, follow: false },
};

export default function RegistarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
