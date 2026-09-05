"use client";

import { useState } from "react";
import { BedDouble } from "lucide-react";
import DetailModal from "@/components/DetailModal";
import type { KelasKamarDTO } from "@/lib/types";
import { RUMAH_SAKIT, waLink } from "@/data/rumah-sakit";

export default function KapasitasKamarTable({
  kamarList,
  totalTempatTidur,
}: {
  kamarList: KelasKamarDTO[];
  totalTempatTidur: number;
}) {
  const [aktif, setAktif] = useState<string | null>(null);
  const [modalTerbuka, setModalTerbuka] = useState(false);
  const kamarAktif = kamarList.find((k) => k.id === aktif) ?? null;

  const buka = (id: string) => {
    setAktif(id);
    setModalTerbuka(true);
  };
  const tutup = () => setModalTerbuka(false);

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-mist-200 bg-white shadow-soft">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-mist-200 bg-mist-50 text-xs uppercase tracking-wide text-ink-faint">
              <th className="px-5 py-3.5 font-semibold">Kelas Perawatan</th>
              <th className="px-5 py-3.5 font-semibold">Kelompok</th>
              <th className="px-5 py-3.5 text-right font-semibold">
                Jumlah Tempat Tidur
              </th>
            </tr>
          </thead>
          <tbody>
            {kamarList.map((t) => (
              <tr
                key={t.id}
                onClick={() => buka(t.id)}
                className="cursor-pointer border-b border-mist-100 transition-colors last:border-0 hover:bg-teal-50/40"
              >
                <td className="px-5 py-3.5 font-medium text-navy-900">
                  {t.label}
                </td>
                <td className="px-5 py-3.5 text-ink-faint">{t.kelompok}</td>
                <td className="px-5 py-3.5 text-right font-display font-semibold text-teal-600">
                  {t.jumlah}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-mist-50">
              <td className="px-5 py-3.5 font-display font-bold text-navy-900" colSpan={2}>
                Total
              </td>
              <td className="px-5 py-3.5 text-right font-display text-lg font-bold text-navy-900">
                {totalTempatTidur}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <p className="mt-3 text-xs text-ink-faint">
        Klik salah satu baris untuk melihat detail fasilitas kamar.
      </p>

      <DetailModal
        isOpen={modalTerbuka}
        onClose={tutup}
        icon={BedDouble}
        title={kamarAktif?.label ?? ""}
        subtitle={kamarAktif ? `${kamarAktif.jumlah} Tempat Tidur Tersedia` : undefined}
        description={kamarAktif?.deskripsiLengkap ?? ""}
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
    </>
  );
}
