import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

const BASE_URL = SITE_URL;

const HALAMAN = [
  "",
  "/tentang-kami",
  "/layanan",
  "/dokter",
  "/informasi-berobat",
  "/berita",
  "/karir",
  "/kontak",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return HALAMAN.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
