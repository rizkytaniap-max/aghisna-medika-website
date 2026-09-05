"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import DetailModal from "@/components/DetailModal";
import type { LayananItemDTO } from "@/lib/types";
import { RUMAH_SAKIT, waLink } from "@/data/rumah-sakit";

type ItemDenganFoto = LayananItemDTO & { gambarKonfirmasi: string | null };

export default function LayananItemGrid({
  items,
  kategoriJudul,
}: {
  items: ItemDenganFoto[];
  kategoriJudul: string;
}) {
  const [aktif, setAktif] = useState<string | null>(null);
  const [modalTerbuka, setModalTerbuka] = useState(false);
  const itemAktif = items.find((i) => i.id === aktif) ?? null;

  const buka = (id: string) => {
    setAktif(id);
    setModalTerbuka(true);
  };
  const tutup = () => setModalTerbuka(false);

  const infoTambahan = itemAktif?.jamOperasional
    ? [{ label: "Jam Operasional", value: itemAktif.jamOperasional }]
    : undefined;

  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((it) => (
          <button
            key={it.id}
            type="button"
            onClick={() => buka(it.id)}
            className="flex items-start gap-2.5 rounded-xl border border-mist-200 bg-white p-4 text-left text-sm text-ink-soft shadow-soft transition-colors hover:border-teal-300 hover:bg-teal-50/40"
          >
            {it.gambarKonfirmasi ? (
              <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg">
                <Image src={it.gambarKonfirmasi} alt="" fill className="object-cover" />
              </span>
            ) : (
              <CheckCircle2
                size={18}
                className="mt-0.5 shrink-0 text-teal-500"
              />
            )}
            {it.nama}
          </button>
        ))}
      </div>

      <DetailModal
        isOpen={modalTerbuka}
        onClose={tutup}
        title={itemAktif?.nama ?? ""}
        subtitle={kategoriJudul}
        description={itemAktif?.deskripsiLengkap ?? ""}
        imageSrc={itemAktif?.gambarKonfirmasi ?? null}
        bulletTitle={itemAktif?.listFasilitas.length ? "Yang Tersedia" : undefined}
        bulletPoints={itemAktif?.listFasilitas}
        infoTambahan={infoTambahan}
        ctaButtons={
          itemAktif
            ? [
                {
                  label: "Hubungi via WhatsApp",
                  href: waLink(
                    RUMAH_SAKIT.kontak.waCs,
                    `Halo, saya ingin bertanya seputar layanan ${itemAktif.nama}.`
                  ),
                  variant: "primary",
                },
                ...(itemAktif.terkaitPoliklinik
                  ? [
                      {
                        label: "Lihat Jadwal Dokter",
                        href: "/dokter#jadwal-praktik",
                        variant: "navy" as const,
                        external: false,
                      },
                    ]
                  : []),
              ]
            : []
        }
      />
    </>
  );
}
