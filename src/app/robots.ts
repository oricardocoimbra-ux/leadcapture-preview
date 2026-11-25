import type { MetadataRoute } from "next";

const isProductionDeployment = process.env.VERCEL_ENV === "production";
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://leadcapture.cloud").replace(
  /\/$/,
  ""
);

export default function robots(): MetadataRoute.Robots {
  if (!isProductionDeployment) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/admin",
        "/area-cliente",
        "/carrinho",
        "/checkout",
        "/login",
        "/registar",
        "/recuperar-password",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
