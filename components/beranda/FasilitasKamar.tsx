"use client";

import { useState } from "react";
import Image from "next/image";
import { BedDouble } from "lucide-react";
import Section, { SectionHeading } from "@/components/Section";
import DetailModal from "@/components/DetailModal";
import type { KelasKamarDTO } from "@/lib/types";
import { RUMAH_SAKIT, waLink } from "@/data/rumah-sakit";

// Aksen warna berbeda per kelas kamar — dipakai sebagai latar ikon saat
// foto belum tersedia, dan sebagai warna badge jumlah TT di atas foto.
const AKSEN: Record<string, { bg: string; icon: string; badge: string }> = {
  vvip: { bg: "from-gold-50 to-gold-200/40", icon: "bg-gold-400 text-navy-900", badge: "bg-gold-400 text-navy-900" },
  vip: { bg: "from-teal-50 to-teal-100", icon: "bg-teal-500 text-white", badge: "bg-teal-500 text-white" },
  "kelas-1": { bg: "from-mist-100 to-mist-200", icon: "bg-navy-700 text-white", badge: "bg-navy-700 text-white" },
  "kelas-2": { bg: "from-mist-100 to-mist-200", icon: "bg-navy-800 text-white", badge: "bg-navy-800 text-white" },
  "kelas-3": { bg: "from-mist-100 to-mist-200", icon: "bg-navy-900 text-white", badge: "bg-navy-900 text-white" },
};

// kamarList di sini sudah "diperkaya" oleh Server Component pemanggilnya
// (app/(public)/page.tsx) dengan field gambarKonfirmasi: string kalau file
// fisiknya memang ada di /public, atau null kalau belum/tidak ditemukan —
// jadi komponen ini tidak perlu (dan tidak bisa, ini Client Component)
// mengecek filesystem sendiri.
type KamarDenganFoto = KelasKamarDTO & { gambarKonfirmasi: string | null };

export default function FasilitasKamar({ kamarList }: { kamarList: KamarDenganFoto[] }) {
  const KAMAR_UTAMA = kamarList.filter((t) => t.kelompok === "Rawat Inap");
  const [aktif, setAktif] = useState<string | null>(null);
  const [modalTerbuka, setModalTerbuka] = useState(false);
  const kamarAktif = kamarList.find((k) => k.id === aktif) ?? null;

  const buka = (id: string) => {
    setAktif(id);
    setModalTerbuka(true);
  };
  const tutup = () => setModalTerbuka(false);

  return (
    <Section tone="mist">
      <SectionHeading
        eyebrow="Fasilitas Rawat Inap"
        title="Kamar Perawatan, dari VVIP hingga Kelas III"
        description="Kami menyediakan pilihan kamar rawat inap yang nyaman sesuai kebutuhan dan preferensi Anda."
      />

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {KAMAR_UTAMA.map((kamar) => {
          const aksen = AKSEN[kamar.slug] ?? AKSEN["kelas-2"];
          return (
            <button
              key={kamar.id}
              type="button"
              onClick={() => buka(kamar.id)}
              className="card-surface overflow-hidden text-left"
            >
              <div
                className={`relative flex h-36 w-full flex-col items-center justify-center gap-2 ${
                  kamar.gambarKonfirmasi ? "" : `bg-gradient-to-br ${aksen.bg}`
                }`}
              >
                {kamar.gambarKonfirmasi ? (
                  <Image
                    src={kamar.gambarKonfirmasi}
                    alt={kamar.label}
                    fill
                    sizes="(max-width: 640px) 100vw, 20vw"
                    className="object-cover"
                  />
                ) : (
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${aksen.icon}`}
                  >
                    <BedDouble size={22} />
                  </span>
                )}
                <span
                  className={`absolute right-2.5 top-2.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${aksen.badge}`}
                >
                  {kamar.jumlah} TT
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-display text-sm font-semibold text-navy-900">
                  {kamar.label}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-ink-faint">
                  {kamar.deskripsi}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <DetailModal
        isOpen={modalTerbuka}
        onClose={tutup}
        icon={BedDouble}
        title={kamarAktif?.label ?? ""}
        subtitle={kamarAktif ? `${kamarAktif.jumlah} Tempat Tidur Tersedia` : undefined}
        description={kamarAktif?.deskripsiLengkap ?? ""}
        imageSrc={kamarAktif?.gambarKonfirmasi ?? null}
        bulletTitle="Fasilitas dalam Kamar"
        bulletPoints={kamarAktif?.listFasilitas ?? []}
        ctaButtons={
          kamarAktif
            ? [
                {
                  label: "Tanyakan Ketersediaan Kamar",
                  href: waLink(
                    RUMAH_SAKIT.kontak.waPendaftaran,
                    `Halo, saya ingin menanyakan ketersediaan kamar ${kamarAktif.label}.`
                  ),
                  variant: "primary",
                },
              ]
            : []
        }
      />
    </Section>
  );
}
