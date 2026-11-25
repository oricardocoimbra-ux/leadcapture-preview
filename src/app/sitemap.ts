import type { MetadataRoute } from "next";
import { SECTORS } from "@/data/sectors";
import { SERVICES } from "@/data/services";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://leadcapture.cloud").replace(
  /\/$/,
  ""
);

const STATIC_PUBLIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/solucoes", changeFrequency: "weekly", priority: 0.9 },
  { path: "/por-negocio", changeFrequency: "weekly", priority: 0.9 },
  { path: "/demonstracoes", changeFrequency: "weekly", priority: 0.85 },
  { path: "/precos", changeFrequency: "weekly", priority: 0.8 },
  { path: "/pedir-orcamento", changeFrequency: "monthly", priority: 0.9 },
  { path: "/pedir-demonstracao", changeFrequency: "monthly", priority: 0.9 },
  { path: "/contactos", changeFrequency: "monthly", priority: 0.85 },
  { path: "/sobre-nos", changeFrequency: "monthly", priority: 0.7 },
  { path: "/portfolio", changeFrequency: "monthly", priority: 0.7 },
  { path: "/casos-de-sucesso", changeFrequency: "monthly", priority: 0.7 },
  { path: "/recursos", changeFrequency: "monthly", priority: 0.65 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PUBLIC_ROUTES.map((route) => ({
    url: `${siteUrl}${route.path === "/" ? "" : route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const serviceEntries: MetadataRoute.Sitemap = SERVICES.map((srv) => ({
    url: `${siteUrl}/solucoes/${srv.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const sectorEntries: MetadataRoute.Sitemap = SECTORS.map((sec) => ({
    url: `${siteUrl}/por-negocio/${sec.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...staticEntries, ...serviceEntries, ...sectorEntries];
}
