import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recuperar Password",
  description: "Recuperação de acesso à Área de Cliente LeadCapture (em preparação).",
  robots: { index: false, follow: false },
};

export default function RecuperarPasswordLayout({ children }: { children: React.ReactNode }) {
  return children;
}
