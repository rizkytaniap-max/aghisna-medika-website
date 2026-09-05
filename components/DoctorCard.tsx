import Image from "next/image";
import type { DokterDTO } from "@/lib/types";

type DokterDenganStatusFoto = DokterDTO & { fotoAda?: boolean };

export default function DoctorCard({
  dokter,
}: {
  dokter: DokterDenganStatusFoto;
}) {
  const inisial = dokter.nama
    .replace(/^dr\.\s*/i, "")
    .split(" ")
    .slice(0, 2)
    .map((s) => s[0])
    .join("")
    .toUpperCase();

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-b from-teal-50 to-mist-100">
        {dokter.fotoAda ? (
          <Image
            src={dokter.foto ?? ""}
            alt={dokter.nama}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-4xl font-bold text-teal-600/40">
              {inisial}
            </span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1.5 bg-teal-500" />
      </div>
      <div className="p-4 text-center">
        <h3 className="font-display text-sm font-semibold leading-snug text-navy-900">
          {dokter.nama}
          {dokter.gelar ? `, ${dokter.gelar}` : ""}
        </h3>
        <p className="mt-1 text-xs text-ink-faint">{dokter.spesialisasi}</p>
      </div>
    </div>
  );
}
