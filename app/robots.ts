import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin-rsam-2026", "/admin-rsam-2026/"],
    },
    sitemap: "https://www.aghisnamedikasidareja.co.id/sitemap.xml",
  };
}
