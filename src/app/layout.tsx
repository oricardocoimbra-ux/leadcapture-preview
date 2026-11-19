import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CartProvider } from "@/components/cart/CartProvider";

export const metadata: Metadata = {
  title: {
    default: "LeadCapture — Parceiro 360° em Soluções Digitais",
    template: "%s | LeadCapture",
  },
  description:
    "Websites, lojas online, CRM, automação e IA, marketing digital e soluções por setor para empresas que querem crescer com organização e tecnologia.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT">
      <body className="min-h-screen flex flex-col bg-[#050507] text-white antialiased selection:bg-[#f5b800] selection:text-[#050507]">
        <CartProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
