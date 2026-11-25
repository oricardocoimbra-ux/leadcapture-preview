import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sessão",
  description: "Acesso reservado à Área de Cliente LeadCapture (em preparação).",
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
