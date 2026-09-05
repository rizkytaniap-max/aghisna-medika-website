import type { Metadata } from "next";
import {
  Ambulance,
  BedDouble,
  FlaskConical,
  HeartPulse,
  Stethoscope,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Section, { SectionHeading } from "@/components/Section";
import Reveal from "@/components/Reveal";
import LayananItemGrid from "@/components/layanan/LayananItemGrid";
import KapasitasKamarTable from "@/components/layanan/KapasitasKamarTable";
import { LAYANAN_24_JAM } from "@/data/layanan";
import { getKategoriLayanan, getKelasKamar } from "@/lib/data";
import { fotoTersedia } from "@/lib/foto";
import { RUMAH_SAKIT, waLink } from "@/data/rumah-sakit";

export const metadata: Metadata = {
  title: "Layanan & Fasilitas",
  description:
    "Layanan gawat darurat, poliklinik spesialis, penunjang medis, rawat inap & intensif, serta fasilitas lainnya di RSU Aghisna Medika Sidareja.",
};

export const revalidate = 0;

const ICON_MAP: Record<string, typeof Stethoscope> = {
  ambulance: Ambulance,
  stethoscope: Stethoscope,
  "flask-conical": FlaskConical,
  "bed-double": BedDouble,
  "heart-pulse": HeartPulse,
};

export default async function LayananPage() {
  const [kategoriLayanan, kelasKamar] = await Promise.all([
    getKategoriLayanan(),
    getKelasKamar(),
  ]);
  const totalTempatTidur = kelasKamar.reduce((total, k) => total + k.jumlah, 0);

  // Dicek di server (bisa akses filesystem) — begitu foto item layanan
  // diupload lewat Admin > Layanan & Fasilitas, otomatis terpakai.
  const kategoriLayananDenganFoto = kategoriLayanan.map((kat) => ({
    ...kat,
    item: kat.item.map((it) => ({
      ...it,
      gambarKonfirmasi: it.gambar && fotoTersedia(it.gambar) ? it.gambar : null,
    })),
  }));

  return (
    <>
      <PageHeader
        eyebrow="Layanan & Fasilitas"
        title="Layanan Kesehatan Lengkap dalam Satu Rumah Sakit"
        description="Lima kategori layanan utama kami, dirancang untuk menjawab kebutuhan kesehatan Anda dan keluarga secara menyeluruh."
      />

      <Reveal>
      <Section tone="light">
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow">Siap 24 Jam</span>
          <div className="flex flex-wrap gap-2">
            {LAYANAN_24_JAM.map((l) => (
              <span
                key={l}
                className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700"
              >
                {l}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 space-y-16">
          {kategoriLayananDenganFoto.map((kat) => {
            const Icon = ICON_MAP[kat.ikon] ?? Stethoscope;
            return (
              <div key={kat.id} id={kat.id} className="scroll-mt-28">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr,1.1fr] lg:items-start">
                  <div>
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-800 text-white">
                      <Icon size={26} />
                    </span>
                    <h2 className="mt-5 font-display text-2xl font-bold text-navy-900">
                      {kat.judul}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
                      {kat.ringkasan}
                    </p>
                  </div>
                  <div>
                    <LayananItemGrid items={kat.item} kategoriJudul={kat.judul} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
      </Reveal>

      {/* Kapasitas Tempat Tidur */}
      <Reveal>
      <Section tone="mist">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Fasilitas Rawat Inap"
            title="Kapasitas Tempat Tidur"
            description="Rincian kapasitas tempat tidur per kelas perawatan di RSU Aghisna Medika Sidareja."
          />
          <div className="rounded-2xl bg-navy-800 px-6 py-4 text-white">
            <p className="text-xs uppercase tracking-wide text-white/70">
              Total Tempat Tidur
            </p>
            <p className="font-display text-3xl font-bold text-gold-200">
              {totalTempatTidur}
            </p>
          </div>
        </div>

        <div className="mt-10">
          <KapasitasKamarTable kamarList={kelasKamar} totalTempatTidur={totalTempatTidur} />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-navy-gradient p-6 text-white sm:p-8">
          <div>
            <h3 className="font-display text-lg font-semibold">
              Butuh informasi ketersediaan kamar?
            </h3>
            <p className="mt-1 text-sm text-white/70">
              Hubungi tim Pendaftaran kami melalui WhatsApp untuk info terbaru.
            </p>
          </div>
          <a href={waLink(RUMAH_SAKIT.kontak.waPendaftaran)} target="_blank" rel="noopener noreferrer" className="btn-gold">
            Hubungi Pendaftaran
          </a>
        </div>
      </Section>
      </Reveal>
    </>
  );
}
