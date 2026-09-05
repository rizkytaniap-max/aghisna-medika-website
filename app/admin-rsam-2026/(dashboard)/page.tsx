import Link from "next/link";
import {
  Stethoscope,
  BedDouble,
  Newspaper,
  Briefcase,
  ShieldCheck,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

// WAJIB: tanpa ini, Next.js mencoba render halaman ini jadi HTML statis
// SAAT BUILD (sebelum database production benar-benar siap/ter-migrasi),
// menyebabkan error "table does not exist". force-dynamic memastikan
// halaman ini selalu diambil datanya saat ada yang benar-benar membuka
// halamannya (runtime), bukan saat proses build.
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [jumlahLayanan, jumlahKamar, jumlahDokter, jumlahArtikel, jumlahLowongan, jumlahAsuransi] =
    await Promise.all([
      prisma.layananItem.count(),
      prisma.kelasKamar.count(),
      prisma.dokter.count(),
      prisma.artikel.count(),
      prisma.lowongan.count(),
      prisma.asuransiRekanan.count(),
    ]);

  const menu = [
    { href: "/admin-rsam-2026/layanan", label: "Layanan & Fasilitas", icon: Stethoscope, jumlah: jumlahLayanan },
    { href: "/admin-rsam-2026/kamar", label: "Kamar Rawat Inap", icon: BedDouble, jumlah: jumlahKamar },
    { href: "/admin-rsam-2026/dokter", label: "Dokter & Jadwal", icon: Stethoscope, jumlah: jumlahDokter },
    { href: "/admin-rsam-2026/berita", label: "Berita & Artikel", icon: Newspaper, jumlah: jumlahArtikel },
    { href: "/admin-rsam-2026/karir", label: "Lowongan Karir", icon: Briefcase, jumlah: jumlahLowongan },
    { href: "/admin-rsam-2026/asuransi", label: "Asuransi Rekanan", icon: ShieldCheck, jumlah: jumlahAsuransi },
  ];

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-500">
        Ringkasan konten RSU Aghisna Medika Sidareja.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {menu.map(({ href, label, icon: Icon, jumlah }) => (
          <Link
            key={href}
            href={href}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
              <Icon size={19} />
            </span>
            <p className="mt-3 text-2xl font-bold text-gray-900">{jumlah}</p>
            <p className="text-sm text-gray-500">{label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
