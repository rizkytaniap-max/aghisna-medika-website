"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import DoctorCard from "@/components/DoctorCard";
import type { DokterDTO } from "@/lib/types";

type DokterDenganStatusFoto = DokterDTO & { fotoAda: boolean };

type Props = {
  dokterList: DokterDenganStatusFoto[];
  poliklinikOrder: string[];
  poliUmumDokter: DokterDenganStatusFoto[];
};

const POLI_UMUM_JUDUL = "Poli Umum";
const POLI_UMUM_KETERANGAN = "Buka 24 Jam — Setiap Hari";

export default function DoctorDirectory({
  dokterList,
  poliklinikOrder,
  poliUmumDokter,
}: Props) {
  const [cari, setCari] = useState("");

  const kelompok = useMemo(() => {
    const map = new Map<string, DokterDenganStatusFoto[]>();
    for (const p of poliklinikOrder) map.set(p, []);
    for (const dok of dokterList) {
      const existing = map.get(dok.poliklinik) ?? [];
      existing.push(dok);
      map.set(dok.poliklinik, existing);
    }
    const kataKunci = cari.trim().toLowerCase();
    return Array.from(map.entries())
      .map(([poliklinik, list]) => ({
        poliklinik,
        list: list.filter(
          (d) =>
            kataKunci === "" ||
            d.nama.toLowerCase().includes(kataKunci) ||
            d.spesialisasi.toLowerCase().includes(kataKunci)
        ),
      }))
      .filter((g) => g.list.length > 0);
  }, [dokterList, poliklinikOrder, cari]);

  const kataKunci = cari.trim().toLowerCase();
  const poliUmumCocok =
    kataKunci === "" ||
    POLI_UMUM_JUDUL.toLowerCase().includes(kataKunci) ||
    poliUmumDokter.some((d) => d.nama.toLowerCase().includes(kataKunci));

  const tidakAdaHasil = kelompok.length === 0 && !poliUmumCocok;

  return (
    <>
      {/* Search bar & tab navigasi mengambang */}
      <div className="relative z-10 -mt-8 sm:-mt-10">
        <div className="container-page">
          <div className="flex flex-col gap-4 rounded-2xl border border-mist-200 bg-white p-4 shadow-lift sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="relative flex-1 sm:max-w-sm">
              <Search
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
              />
              <input
                type="text"
                value={cari}
                onChange={(e) => setCari(e.target.value)}
                placeholder="Cari Dokter — nama atau spesialisasi..."
                className="w-full rounded-full border-2 border-teal-500/70 bg-mist-50 py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-faint focus:border-teal-500 focus:bg-white focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              <a
                href="#direktori"
                className="rounded-full bg-navy-800 px-4 py-2.5 text-center text-xs font-semibold text-white transition-colors hover:bg-navy-700"
              >
                Direktori Dokter
              </a>
              <a
                href="#jadwal-praktik"
                className="rounded-full bg-mist-100 px-4 py-2.5 text-center text-xs font-semibold text-navy-800 transition-colors hover:bg-mist-200"
              >
                Jadwal Praktik
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Direktori Dokter per Spesialisasi */}
      <div id="direktori" className="scroll-mt-24 pt-14 sm:pt-16">
        <div className="container-page pb-2">
          <span className="eyebrow">Direktori Dokter</span>
          <h2 className="mt-2 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
            Direktori Dokter per Spesialisasi
          </h2>
        </div>

        {tidakAdaHasil && (
          <p className="container-page py-12 text-center text-sm text-ink-faint">
            Tidak ada dokter yang cocok dengan pencarian &ldquo;{cari}&rdquo;.
          </p>
        )}

        {kelompok.map((g, idx) => (
          <div
            key={g.poliklinik}
            className={idx % 2 === 0 ? "bg-white" : "bg-mist-100"}
          >
            <div className="container-page py-10 sm:py-12">
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-500 font-display text-lg font-bold text-white">
                  {idx + 1}
                </span>
                <h3 className="font-display text-xl font-bold text-navy-900 sm:text-2xl">
                  {g.poliklinik}
                </h3>
              </div>
              <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
                {g.list.map((dok) => (
                  <DoctorCard key={dok.id} dokter={dok} />
                ))}
              </div>
            </div>
          </div>
        ))}

        {poliUmumCocok && (
          <div
            className={
              kelompok.length % 2 === 0 ? "bg-white" : "bg-mist-100"
            }
          >
            <div className="container-page py-10 sm:py-12">
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold-400 font-display text-lg font-bold text-navy-900">
                  {kelompok.length + 1}
                </span>
                <h3 className="font-display text-xl font-bold text-navy-900 sm:text-2xl">
                  {POLI_UMUM_JUDUL}
                </h3>
              </div>
              <div className="card-surface mt-7 flex flex-col gap-4 border-teal-200 bg-teal-50/60 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="eyebrow">Buka 24 Jam</span>
                  <p className="mt-1 text-sm text-ink-soft">
                    {POLI_UMUM_KETERANGAN} — dokter jaga bergilir
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 sm:max-w-md sm:justify-end">
                  {poliUmumDokter.map((d) => (
                    <span
                      key={d.id}
                      className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-navy-800 shadow-soft"
                    >
                      {d.nama}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
