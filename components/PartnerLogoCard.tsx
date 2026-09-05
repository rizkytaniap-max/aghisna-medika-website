import Image from "next/image";
import { fotoTersedia } from "@/lib/foto";
import type { AsuransiRekananDTO } from "@/lib/types";

export default function PartnerLogoCard({
  rekanan,
}: {
  rekanan: AsuransiRekananDTO;
}) {
  const adaLogoAsli = fotoTersedia(rekanan.logo ?? "");

  return (
    <div className="relative flex h-28 items-center justify-center rounded-2xl border border-mist-200 bg-white p-5 shadow-soft transition-shadow hover:shadow-card">
      {adaLogoAsli ? (
        <div className="relative h-full w-full">
          <Image
            src={rekanan.logo ?? ""}
            alt={rekanan.nama}
            fill
            sizes="200px"
            className="object-contain"
          />
        </div>
      ) : (
        <span className="text-center text-sm font-semibold leading-snug text-navy-800">
          {rekanan.nama}
        </span>
      )}
      {rekanan.sejak && (
        <span className="absolute bottom-2 right-2 rounded-full bg-mist-100 px-2 py-0.5 text-[10px] font-medium text-ink-faint">
          Sejak {rekanan.sejak}
        </span>
      )}
    </div>
  );
}
