"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Ambulance,
  ArrowUpRight,
  BedDouble,
  FlaskConical,
  HeartPulse,
  Stethoscope,
} from "lucide-react";
import Section, { SectionHeading } from "@/components/Section";
import DetailModal from "@/components/DetailModal";
import type { KategoriLayananDTO } from "@/lib/types";
import { RUMAH_SAKIT, waLink } from "@/data/rumah-sakit";

const ICON_MAP: Record<string, typeof Stethoscope> = {
  ambulance: Ambulance,
  stethoscope: Stethoscope,
  "flask-conical": FlaskConical,
  "bed-double": BedDouble,
  "heart-pulse": HeartPulse,
};

export default function LayananGrid({ kategoriList }: { kategoriList: KategoriLayananDTO[] }) {
  const [aktif, setAktif] = useState<string | null>(null);
  const [modalTerbuka, setModalTerbuka] = useState(false);
  const kategoriAktif = kategoriList.find((k) => k.id === aktif) ?? null;
  const punyaPoliklinik = kategoriAktif?.item.some((i) => i.terkaitPoliklinik);

  const buka = (id: string) => {
    setAktif(id);
    setModalTerbuka(true);
  };
  const tutup = () => setModalTerbuka(false);

  return (
    <Section tone="mist">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="Layanan Kami"
          title="Layanan Kesehatan yang Kami Sediakan"
          description="Dari gawat darurat hingga rawat inap, kami hadir untuk kebutuhan kesehatan Anda dan keluarga."
        />
        <Link
          href="/layanan"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-700"
        >
          Lihat semua layanan <ArrowUpRight size={16} />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {kategoriList.map((kat) => {
          const Icon = ICON_MAP[kat.ikon] ?? Stethoscope;
          return (
            <button
              key={kat.id}
              type="button"
              onClick={() => buka(kat.id)}
              className="card-surface group flex h-full flex-col gap-4 p-6 text-left"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-800 text-white transition-colors group-hover:bg-teal-500">
                <Icon size={22} />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-navy-900">
                  {kat.judul}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {kat.ringkasan}
                </p>
              </div>
              <ul className="mt-1 space-y-1.5 text-xs text-ink-faint">
                {kat.item.slice(0, 3).map((it) => (
                  <li key={it.id} className="flex items-start gap-1.5">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-teal-500" />
                    {it.nama}
                  </li>
                ))}
                {kat.item.length > 3 && (
                  <li className="pl-2.5 font-medium text-teal-600">
                    +{kat.item.length - 3} layanan lainnya
                  </li>
                )}
              </ul>
            </button>
          );
        })}
      </div>

      <DetailModal
        isOpen={modalTerbuka}
        onClose={tutup}
        icon={kategoriAktif ? (ICON_MAP[kategoriAktif.ikon] ?? Stethoscope) : undefined}
        title={kategoriAktif?.judul ?? ""}
        description={kategoriAktif?.ringkasan ?? ""}
        bulletTitle="Layanan yang Tersedia"
        bulletPoints={kategoriAktif?.item.map((i) => i.nama) ?? []}
        ctaButtons={
          kategoriAktif
            ? [
                {
                  label: "Hubungi via WhatsApp",
                  href: waLink(
                    RUMAH_SAKIT.kontak.waCs,
                    `Halo, saya ingin bertanya seputar layanan ${kategoriAktif.judul}.`
                  ),
                  variant: "primary",
                },
                ...(punyaPoliklinik
                  ? [
                      {
                        label: "Lihat Jadwal Dokter",
                        href: "/dokter#jadwal-praktik",
                        variant: "navy" as const,
                        external: false,
                      },
                    ]
                  : []),
                {
                  label: "Lihat Detail Lengkap",
                  href: `/layanan#${kategoriAktif.id}`,
                  variant: "soft",
                  external: false,
                },
              ]
            : []
        }
      />
    </Section>
  );
}
