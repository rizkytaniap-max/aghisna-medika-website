import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Alamat panel admin sengaja TIDAK ditulis di sini (robots.txt bisa dibaca
// siapa saja). Halaman admin sudah ditandai noindex di layout-nya.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
