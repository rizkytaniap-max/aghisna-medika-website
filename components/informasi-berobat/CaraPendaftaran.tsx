import { Download, MessageCircle, ShieldCheck } from "lucide-react";
import { RUMAH_SAKIT, waLink } from "@/data/rumah-sakit";

const LINK_MOBILE_JKN = {
  googlePlay: "https://play.google.com/store/apps/details?id=app.bpjs.mobile",
  appStore: "https://apps.apple.com/id/app/mobile-jkn/id1237601115",
};

export default function CaraPendaftaran() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Kartu 1 — Pendaftaran Pasien BPJS */}
      <div className="rounded-2xl border-l-4 border-teal-500 bg-gold-50 p-6 shadow-soft sm:p-7">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500 text-white">
          <ShieldCheck size={22} />
        </span>
        <h3 className="mt-4 font-display text-lg font-bold text-navy-900">
          Pendaftaran Pasien BPJS
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-ink-soft sm:text-base">
          Pendaftaran pasien bisa melalui{" "}
          <span className="font-semibold text-teal-600">
            Aplikasi Mobile JKN
          </span>{" "}
          atau{" "}
          <span className="font-semibold text-red-500">datang langsung</span>{" "}
          ke RSU Aghisna Medika Sidareja.
        </p>

        <div className="mt-5 flex flex-wrap gap-2.5">
          <a
            href={LINK_MOBILE_JKN.googlePlay}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-navy-800 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-navy-700"
          >
            <Download size={14} /> Google Play
          </a>
          <a
            href={LINK_MOBILE_JKN.appStore}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-navy-800 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-navy-700"
          >
            <Download size={14} /> App Store
          </a>
        </div>
      </div>

      {/* Kartu 2 — Pendaftaran Pasien Umum */}
      <div className="rounded-2xl border-l-4 border-teal-500 bg-gold-50 p-6 shadow-soft sm:p-7">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500 text-white">
          <MessageCircle size={22} />
        </span>
        <h3 className="mt-4 font-display text-lg font-bold text-navy-900">
          Pendaftaran Pasien Umum
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-ink-soft sm:text-base">
          Pendaftaran pasien bisa melalui{" "}
          <span className="font-semibold text-teal-600">WA Pendaftaran</span>{" "}
          atau{" "}
          <span className="font-semibold text-red-500">datang langsung</span>{" "}
          ke RSU Aghisna Medika Sidareja.
        </p>

        <div className="mt-5">
          <a
            href={waLink(
              RUMAH_SAKIT.kontak.waPendaftaran,
              "Halo, saya ingin bertanya seputar pendaftaran pasien."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <MessageCircle size={16} /> Chat WA Pendaftaran
          </a>
        </div>
      </div>

      <p className="text-xs text-ink-faint lg:col-span-2">
        RSU Aghisna Medika Sidareja telah bekerja sama dengan BPJS Kesehatan
        untuk melayani pasien peserta JKN-KIS.
      </p>
    </div>
  );
}
