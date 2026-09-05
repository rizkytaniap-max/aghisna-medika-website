import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";
import { RUMAH_SAKIT } from "@/data/rumah-sakit";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aghisnamedikasidareja.co.id"),
  title: {
    default: `${RUMAH_SAKIT.nama} | ${RUMAH_SAKIT.tagline}`,
    template: `%s | ${RUMAH_SAKIT.namaSingkat}`,
  },
  description:
    "RSU Aghisna Medika Sidareja — rumah sakit umum Kelas D Terakreditasi Paripurna di Sidareja, Cilacap. Layanan IGD 24 jam, poliklinik spesialis, rawat inap, dan penunjang medis lengkap. Bagian dari Muhammadiyah Gombong Group.",
  keywords: [
    "RSU Aghisna Medika Sidareja",
    "rumah sakit Sidareja",
    "rumah sakit Cilacap",
    "IGD 24 jam Sidareja",
    "Muhammadiyah Gombong Group",
    "dokter spesialis Sidareja",
  ],
  openGraph: {
    title: RUMAH_SAKIT.nama,
    description: RUMAH_SAKIT.tagline,
    locale: "id_ID",
    type: "website",
    siteName: RUMAH_SAKIT.nama,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
