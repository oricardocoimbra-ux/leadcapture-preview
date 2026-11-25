import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout (Modo de Teste)",
  description: "Fluxo de checkout em modo de teste para fase comercial futura.",
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
