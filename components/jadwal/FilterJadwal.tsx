"use client";

import { useMemo, useState } from "react";
import { Clock3, Search } from "lucide-react";
import { URUTAN_HARI, type DokterDTO } from "@/lib/types";

const HARI_FILTER = [
  "Semua", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu",
];

export default function FilterJadwal({
  dokterList,
  daftarPoliklinik,
}: {
  dokterList: DokterDTO[];
  daftarPoliklinik: string[];
}) {
  const [poliklinik, setPoliklinik] = useState<string>("Semua");
  const [hari, setHari] = useState<(typeof HARI_FILTER)[number]>("Semua");
  const [cari, setCari] = useState("");

  const hasil = useMemo(() => {
    return dokterList
      .filter((dok) => {
        const cocokPoliklinik =
          poliklinik === "Semua" || dok.poliklinik === poliklinik;
        const cocokCari =
          cari.trim() === "" ||
          dok.nama.toLowerCase().includes(cari.toLowerCase()) ||
          dok.spesialisasi.toLowerCase().includes(cari.toLowerCase());
        const jadwalCocokHari =
          hari === "Semua" ? dok.jadwal : dok.jadwal.filter((j) => j.hari === hari);

        return cocokPoliklinik && cocokCari && jadwalCocokHari.length > 0;
      })
      .map((dok) => ({
        ...dok,
        jadwal:
          hari === "Semua"
            ? [...dok.jadwal].sort(
                (a, b) => URUTAN_HARI.indexOf(a.hari) - URUTAN_HARI.indexOf(b.hari)
              )
            : dok.jadwal.filter((j) => j.hari === hari),
      }));
  }, [dokterList, poliklinik, hari, cari]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Search
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
          />
          <input
            type="text"
            value={cari}
            onChange={(e) => setCari(e.target.value)}
            placeholder="Cari nama dokter / spesialisasi..."
            className="w-full rounded-full border border-mist-200 bg-white py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-faint focus:border-teal-500"
          />
        </div>

        <select
          value={poliklinik}
          onChange={(e) => setPoliklinik(e.target.value)}
          className="rounded-full border border-mist-200 bg-white px-4 py-2.5 text-sm text-ink-soft focus:border-teal-500"
        >
          <option value="Semua">Semua Poliklinik</option>
          {daftarPoliklinik.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <div className="flex flex-wrap gap-1.5">
          {HARI_FILTER.map((h) => (
            <button
              key={h}
              onClick={() => setHari(h)}
              className={`rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${
                hari === h
                  ? "bg-teal-500 text-white"
                  : "bg-mist-100 text-ink-soft hover:bg-mist-200"
              }`}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-mist-200 bg-white shadow-soft">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-mist-200 bg-mist-50 text-xs uppercase tracking-wide text-ink-faint">
              <th className="px-5 py-3.5 font-semibold">Dokter</th>
              <th className="px-5 py-3.5 font-semibold">Poliklinik</th>
              <th className="px-5 py-3.5 font-semibold">Jadwal Praktik</th>
            </tr>
          </thead>
          <tbody>
            {hasil.map((dok) => (
              <tr key={dok.id} className="border-b border-mist-100 align-top last:border-0">
                <td className="px-5 py-4">
                  <p className="font-semibold text-navy-900">{dok.nama}</p>
                  {dok.gelar && (
                    <p className="text-xs text-teal-600">{dok.gelar}</p>
                  )}
                </td>
                <td className="px-5 py-4 text-ink-soft">{dok.poliklinik}</td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1.5">
                    {dok.jadwal.map((j) => (
                      <span
                        key={j.id}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                          j.status === "cuti"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-mist-100 text-navy-800"
                        }`}
                        title={j.status === "cuti" ? (j.keterangan ?? undefined) : undefined}
                      >
                        <Clock3 size={11} className={j.status === "cuti" ? "text-amber-600" : "text-teal-600"} />
                        {j.status === "cuti"
                          ? `${j.hari} · Sedang Cuti/Tidak Praktik`
                          : `${j.hari} · ${j.jam}`}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
            {hasil.length === 0 && (
              <tr>
                <td colSpan={3} className="px-5 py-8 text-center text-ink-faint">
                  Tidak ada jadwal yang cocok dengan filter Anda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
