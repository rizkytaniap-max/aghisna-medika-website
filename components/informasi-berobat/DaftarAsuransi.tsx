import PartnerLogoCard from "@/components/PartnerLogoCard";
import type { AsuransiRekananDTO } from "@/lib/types";
import { RUMAH_SAKIT, waLink } from "@/data/rumah-sakit";

export default function DaftarAsuransi({
  rekananList,
}: {
  rekananList: AsuransiRekananDTO[];
}) {
  return (
    <div>
      <span className="eyebrow">Asuransi & Rekanan yang Bekerja Sama</span>
      <h2 className="mt-2 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
        Daftar Asuransi Rekanan
      </h2>
      <p className="mt-2 text-sm text-ink-soft sm:text-base">
        yang bekerjasama dengan RSU Aghisna Medika Sidareja
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rekananList.map((rekanan) => (
          <PartnerLogoCard key={rekanan.id} rekanan={rekanan} />
        ))}
      </div>

      <p className="mt-6 text-xs leading-relaxed text-ink-faint">
        Untuk informasi lebih lanjut mengenai syarat dan ketentuan
        penjaminan, silakan hubungi bagian Customer Care kami di{" "}
        <a
          href={waLink(
            RUMAH_SAKIT.kontak.waCs,
            "Halo, saya ingin bertanya seputar syarat dan ketentuan penjaminan asuransi."
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-teal-600 hover:text-teal-700"
        >
          wa.me/{RUMAH_SAKIT.kontak.waCs}
        </a>
        .
      </p>
    </div>
  );
}
