import type { Metadata } from "next";
import { MessageCircle, Siren } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Section, { SectionHeading } from "@/components/Section";
import Reveal from "@/components/Reveal";
import CaraPendaftaran from "@/components/informasi-berobat/CaraPendaftaran";
import DaftarAsuransi from "@/components/informasi-berobat/DaftarAsuransi";
import { getAsuransiRekanan } from "@/lib/data";
import { RUMAH_SAKIT, waLink } from "@/data/rumah-sakit";

export const metadata: Metadata = {
  title: "Informasi Berobat",
  description:
    "Cara pendaftaran pasien BPJS & umum, daftar asuransi rekanan, dan panduan berobat di RSU Aghisna Medika Sidareja.",
};

export const revalidate = 0;

const LANGKAH_PENDAFTARAN = [
  {
    judul: "Hubungi Nomor Pendaftaran",
    deskripsi: `Kirim pesan WhatsApp ke nomor Pendaftaran kami di ${RUMAH_SAKIT.kontak.waPendaftaran.replace(/^62/, "0")}.`,
  },
  {
    judul: "Sampaikan Keluhan & Poliklinik Tujuan",
    deskripsi:
      "Beri tahu keluhan Anda dan poliklinik atau dokter spesialis yang ingin dituju. Tim kami akan membantu memilihkan jadwal terdekat.",
  },
  {
    judul: "Konfirmasi Jadwal Kunjungan",
    deskripsi:
      "Tim Pendaftaran akan mengonfirmasi hari, jam praktik dokter, serta dokumen yang perlu dibawa.",
  },
  {
    judul: "Datang Sesuai Jadwal",
    deskripsi:
      "Datang ke RSU Aghisna Medika Sidareja sesuai jadwal yang telah disepakati, dengan membawa identitas dan dokumen pendukung (kartu BPJS/asuransi jika ada).",
  },
];

export default async function InformasiBerobatPage() {
  const rekananList = await getAsuransiRekanan();
  return (
    <>
      <PageHeader
        eyebrow="Informasi Berobat"
        title="Panduan Berobat di RSU Aghisna Medika Sidareja"
        description="Cara pendaftaran pasien BPJS & umum, daftar asuransi rekanan, hingga langkah pendaftaran via WhatsApp — semua ada di sini."
      />

      {/* Cara Pendaftaran Pasien (BPJS & Umum) */}
      <Reveal>
      <Section tone="light" id="cara-pendaftaran">
        <SectionHeading
          eyebrow="Mulai Berobat"
          title="Cara Pendaftaran Pasien"
          description="Pilih jalur pendaftaran sesuai kebutuhan Anda — peserta BPJS atau pasien umum."
        />
        <div className="mt-8">
          <CaraPendaftaran />
        </div>
      </Section>
      </Reveal>

      {/* Daftar Asuransi Rekanan */}
      <Reveal>
      <Section tone="mist" id="asuransi-rekanan">
        <DaftarAsuransi rekananList={rekananList} />
      </Section>
      </Reveal>

      {/* Darurat */}
      <Reveal>
      <Section tone="light">
        <div className="card-surface flex flex-col items-start gap-4 border-red-100 bg-red-50/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-3">
            <Siren size={26} className="mt-0.5 shrink-0 text-red-500" />
            <div>
              <h2 className="font-display text-lg font-bold text-navy-900">
                Kondisi Darurat?
              </h2>
              <p className="mt-1 text-sm text-ink-soft">
                Jangan tunggu janji temu. Segera hubungi IGD kami yang siaga
                24 jam, 7 hari seminggu.
              </p>
            </div>
          </div>
          <a
            href={waLink(RUMAH_SAKIT.kontak.waIgd, "Assalamu'alaikum, saya membutuhkan bantuan IGD segera.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-navy shrink-0"
          >
            Hubungi IGD Sekarang
          </a>
        </div>
      </Section>
      </Reveal>

      {/* Cara Pendaftaran via WhatsApp (langkah rinci) */}
      <Reveal>
      <Section tone="mist">
        <SectionHeading
          eyebrow="Pendaftaran Non-Darurat"
          title="Cara Mendaftar Berobat via WhatsApp"
          description="Proses pendaftaran kami dirancang sederhana dan cepat, cukup melalui WhatsApp."
        />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {LANGKAH_PENDAFTARAN.map((langkah, idx) => (
            <div key={langkah.judul} className="card-surface p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-800 font-display text-sm font-bold text-white">
                {idx + 1}
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-navy-900">
                {langkah.judul}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {langkah.deskripsi}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start gap-4 rounded-2xl bg-navy-gradient p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-3">
            <MessageCircle size={24} className="mt-0.5 shrink-0 text-gold-200" />
            <div>
              <h3 className="font-display text-lg font-semibold">
                Mulai Pendaftaran via WhatsApp
              </h3>
              <p className="mt-1 text-sm text-white/70">
                Nomor Pendaftaran: {RUMAH_SAKIT.kontak.waPendaftaran.replace(/^62/, "0")}
              </p>
            </div>
          </div>
          <a
            href={waLink(RUMAH_SAKIT.kontak.waPendaftaran, "Assalamu'alaikum, saya ingin mendaftar berobat.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold shrink-0"
          >
            Chat Pendaftaran
          </a>
        </div>
      </Section>
      </Reveal>
    </>
  );
}
