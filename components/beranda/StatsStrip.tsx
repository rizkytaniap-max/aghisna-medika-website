import { BedDouble, Siren, Stethoscope, ShieldCheck } from "lucide-react";
import { RUMAH_SAKIT } from "@/data/rumah-sakit";
import { TOTAL_DOKTER_SPESIALIS } from "@/data/tenaga-medis";

const STATS = [
  {
    icon: BedDouble,
    value: `${RUMAH_SAKIT.totalTempatTidur}+`,
    label: "Tempat Tidur",
  },
  {
    icon: Stethoscope,
    value: `${TOTAL_DOKTER_SPESIALIS}+`,
    label: "Dokter Spesialis",
  },
  {
    icon: ShieldCheck,
    value: `Kelas ${RUMAH_SAKIT.kelas}`,
    label: "Rumah Sakit Umum",
  },
  {
    icon: Siren,
    value: "24 Jam",
    label: "Instalasi Gawat Darurat",
  },
];

export default function StatsStrip() {
  return (
    <div className="relative z-10 -mt-8 sm:-mt-10">
      <div className="container-page">
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-mist-200 bg-white p-4 shadow-lift sm:gap-4 sm:p-6 lg:grid-cols-4">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl px-2 py-2 sm:px-3"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                <Icon size={20} />
              </span>
              <div>
                <p className="font-display text-lg font-bold text-navy-900 sm:text-xl">
                  {value}
                </p>
                <p className="text-xs text-ink-faint">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
