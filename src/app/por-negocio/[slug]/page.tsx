import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SECTORS, getSectorBySlug } from "@/data/sectors";
import { SectorPageTemplate } from "@/components/templates/SectorPageTemplate";

export function generateStaticParams() {
  return SECTORS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSectorBySlug(slug);
  if (!sector) return { title: "Setor não encontrado" };
  return {
    title: `${sector.name} — Soluções por Negócio`,
    description: sector.heroDescription,
  };
}

export default async function SectorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sector = getSectorBySlug(slug);
  if (!sector) notFound();
  return <SectorPageTemplate sector={sector} />;
}
