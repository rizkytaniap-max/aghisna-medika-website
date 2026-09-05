"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarClock, Clock3 } from "lucide-react";
import Section, { SectionHeading } from "@/components/Section";
import { getHariIniID, type DokterDTO } from "@/lib/types";

type DokterDenganStatusFoto = DokterDTO & { fotoAda: boolean };

export default function JadwalHariIni({
  dokterList,
  poliUmumDokter,
}: {
  dokterList: DokterDenganStatusFoto[];
  poliUmumDokter: DokterDenganStatusFoto[];
}) {
  const [hariIni, setHariIni] = useState<string | null>(null);

  useEffect(() => {
    setHariIni(getHariIniID(new Date()));
  }, []);

  const dokterPraktikHariIni = useMemo(() => {
    if (!hariIni) return [];
    return dokterList
      .map((dok) => ({
        ...dok,
        jadwal: dok.jadwal.filter((j) => j.hari === hariIni && j.status !== "cuti"),
      }))
      .filter((dok) => dok.jadwal.length > 0);
  }, [dokterList, hariIni]);

  return (
    <Section tone="light">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="Jadwal Dokter"
          title={hariIni ? `Praktik Dokter Hari ${hariIni}` : "Jadwal Praktik Dokter"}
          description="Jadwal diperbarui otomatis sesuai hari kunjungan Anda. Untuk jadwal lengkap seluruh minggu, lihat section Jadwal Praktik Dokter."
        />
        <Link
          href="/dokter#jadwal-praktik"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-700"
        >
          Lihat jadwal lengkap <ArrowUpRight size={16} />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="card-surface flex flex-col justify-between gap-3 border-teal-200 bg-teal-50/60 p-5">
          <div>
            <span className="eyebrow">Buka 24 Jam</span>
            <h3 className="mt-2 font-display text-lg font-semibold text-navy-900">
              Poli Umum
            </h3>
            <p className="text-sm text-ink-soft">Buka 24 Jam — Setiap Hari</p>
          </div>
          <p className="text-xs leading-relaxed text-ink-faint">
            Dokter jaga bergilir: {poliUmumDokter.slice(0, 3).map((d) => d.nama).join(", ")}, dan lainnya.
          </p>
        </div>

        {hariIni === null &&
          Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="card-surface h-[160px] animate-pulse bg-mist-100" />
          ))}

        {hariIni !== null && dokterPraktikHariIni.length === 0 && (
          <div className="card-surface flex items-center gap-3 p-5 text-sm text-ink-soft sm:col-span-2">
            <CalendarClock size={20} className="shrink-0 text-teal-600" />
            Tidak ada jadwal poliklinik spesialis tambahan pada hari ini di luar
            Poli Umum 24 Jam. Silakan cek section Jadwal Praktik Dokter untuk hari lain.
          </div>
        )}

        {dokterPraktikHariIni.slice(0, 5).map((dok) => (
          <div key={dok.id} className="card-surface flex gap-4 p-5">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gradient-to-b from-teal-50 to-mist-100">
              {dok.fotoAda ? (
                <Image
                  src={dok.foto ?? ""}
                  alt={dok.nama}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="font-display text-lg font-bold text-teal-600/40">
                    {dok.nama
                      .replace(/^dr\.\s*/i, "")
                      .split(" ")
                      .slice(0, 2)
                      .map((s) => s[0])
                      .join("")
                      .toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <span className="eyebrow">{dok.poliklinik}</span>
              <h3 className="mt-1.5 truncate font-display text-base font-semibold text-navy-900">
                {dok.nama} {dok.gelar && <span className="text-ink-faint">— {dok.gelar}</span>}
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {dok.jadwal.map((j) => (
                  <span
                    key={j.id}
                    className="inline-flex items-center gap-1.5 rounded-full bg-mist-100 px-3 py-1 text-xs font-medium text-navy-800"
                  >
                    <Clock3 size={12} className="text-teal-600" /> {j.jam}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
