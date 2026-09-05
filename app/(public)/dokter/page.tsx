import type { Metadata } from "next";
import { UsersRound } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import DoctorDirectory from "@/components/dokter/DoctorDirectory";
import FilterJadwal from "@/components/jadwal/FilterJadwal";
import { fotoTersedia } from "@/lib/foto";
import { getSemuaDokter } from "@/lib/data";
import { RINGKASAN_TENAGA_MEDIS } from "@/data/tenaga-medis";

export const metadata: Metadata = {
  title: "Dokter & Tenaga Medis",
  description:
    "Direktori dokter spesialis per poliklinik dan jadwal praktik dokter RSU Aghisna Medika Sidareja — cari dokter berdasarkan nama atau spesialisasi.",
};

export const revalidate = 0; // selalu ambil data terbaru dari database

export default async function DokterPage() {
  const semuaDokter = await getSemuaDokter();

  // Dicek di server (bukan di komponen client) supaya bisa akses filesystem:
  // begitu file foto asli ditaruh di /public/images/dokter/, otomatis
  // terpakai tanpa perlu ubah kode apapun.
  const dokterDenganStatusFoto = semuaDokter.map((dok) => ({
    ...dok,
    fotoAda: fotoTersedia(dok.foto ?? ""),
  }));

  const dokterSpesialis = dokterDenganStatusFoto.filter((d) => d.tipe === "spesialis");
  const dokterPoliUmum = dokterDenganStatusFoto.filter((d) => d.tipe === "poli_umum");

  const daftarPoliklinik = Array.from(
    new Set(dokterSpesialis.map((d) => d.poliklinik))
  );

  return (
    <>
      <PageHeader
        eyebrow="Dokter & Tenaga Medis"
        title="Tim Medis yang Berpengalaman & Terpercaya"
        description="Cari dokter spesialis kami, lihat direktori per poliklinik, atau langsung cek jadwal praktiknya."
      >
        <div className="mt-8 flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur-sm sm:inline-flex">
          <UsersRound size={22} className="text-gold-200" />
          <p className="text-sm text-white/85">
            {RINGKASAN_TENAGA_MEDIS.deskripsi}
          </p>
        </div>
      </PageHeader>

      <DoctorDirectory
        dokterList={dokterSpesialis}
        poliklinikOrder={daftarPoliklinik}
        poliUmumDokter={dokterPoliUmum}
      />

      <Section tone="mist" id="jadwal-praktik" className="scroll-mt-24">
        <span className="eyebrow">Jadwal Praktik</span>
        <h2 className="mt-2 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
          Jadwal Praktik Dokter
        </h2>
        <p className="mt-3 max-w-xl text-sm text-ink-soft sm:text-base">
          Gunakan pencarian dan filter di bawah untuk menemukan jadwal dokter
          sesuai poliklinik dan hari yang Anda inginkan.
        </p>

        <div className="mt-8 rounded-2xl border border-teal-200 bg-teal-50/60 p-5 text-sm text-ink-soft">
          <span className="font-semibold text-navy-900">
            Poli Umum — Buka 24 Jam, Setiap Hari.
          </span>{" "}
          Untuk pemeriksaan umum di luar jadwal dokter spesialis, Poli Umum
          kami buka 24 jam dengan dokter jaga bergilir.
        </div>

        <div className="mt-6">
          <FilterJadwal dokterList={dokterSpesialis} daftarPoliklinik={daftarPoliklinik} />
        </div>

        <p className="mt-6 text-xs text-ink-faint">
          Jadwal dapat berubah sewaktu-waktu mengikuti kondisi operasional
          rumah sakit. Untuk kepastian jadwal, silakan hubungi Pendaftaran
          melalui WhatsApp sebelum berkunjung.
        </p>
      </Section>
    </>
  );
}
