import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contactos",
  description:
    "Fale com a equipa LeadCapture em Portugal. Envie a sua mensagem ou peça apoio sobre websites, lojas online, CRM, automação e soluções à medida.",
  alternates: { canonical: "/contactos" },
};

export default function ContactosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
