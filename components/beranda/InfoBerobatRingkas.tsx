import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Section from "@/components/Section";

export default function InfoBerobatRingkas() {
  return (
    <Section tone="mist">
      <div className="card-surface flex flex-col items-start gap-6 border-teal-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-500 text-white">
            <ShieldCheck size={22} />
          </span>
          <div>
            <h2 className="font-display text-lg font-bold text-navy-900 sm:text-xl">
              Pendaftaran Pasien BPJS & Asuransi
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
              Peserta BPJS Kesehatan bisa mendaftar lewat Aplikasi Mobile JKN
              atau datang langsung. Kami juga bekerja sama dengan berbagai
              asuransi rekanan untuk kemudahan proses penjaminan Anda.
            </p>
          </div>
        </div>
        <Link href="/informasi-berobat" className="btn-primary shrink-0">
          Lihat Info Berobat <ArrowRight size={16} />
        </Link>
      </div>
    </Section>
  );
}
