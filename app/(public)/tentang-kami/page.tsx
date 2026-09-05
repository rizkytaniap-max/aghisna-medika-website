import type { Metadata } from "next";
import SafeImage from "@/components/SafeImage";
import {
  Building2,
  Landmark,
  ShieldCheck,
  UserRound,
  Crown,
  ShieldQuestion,
  Gem,
  Timer,
  Users2,
  Lightbulb,
  Smile,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Section, { SectionHeading } from "@/components/Section";
import Reveal from "@/components/Reveal";
import AccreditationSeal from "@/components/AccreditationSeal";
import StrukturOrganisasi from "@/components/StrukturOrganisasi";
import { RUMAH_SAKIT } from "@/data/rumah-sakit";
import { MUHAMMADIYAH_GOMBONG_GROUP } from "@/data/group";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Profil, sejarah, visi misi, falsafah, nilai budaya, struktur organisasi, dan data legal RSU Aghisna Medika Sidareja — Rumah Sakit Umum Kelas D Terakreditasi Paripurna, bagian dari Muhammadiyah Gombong Group.",
};

const DATA_LEGAL = [
  { icon: Crown, label: "Direktur Utama", value: RUMAH_SAKIT.direkturUtama },
  { icon: UserRound, label: "Direktur", value: RUMAH_SAKIT.direktur },
  { icon: Landmark, label: "Pemilik", value: RUMAH_SAKIT.pemilik },
  { icon: Building2, label: "Kelas Rumah Sakit", value: `Kelas ${RUMAH_SAKIT.kelas}` },
  { icon: ShieldCheck, label: "Status Akreditasi", value: RUMAH_SAKIT.akreditasi },
];

const NILAI_BUDAYA = [
  {
    icon: ShieldQuestion,
    nama: "Integritas",
    deskripsi:
      "Bertindak jujur dan konsisten antara ucapan dan perbuatan dalam setiap pelayanan.",
  },
  {
    icon: Gem,
    nama: "Profesional",
    deskripsi:
      "Bekerja sesuai kompetensi dan standar mutu demi keselamatan pasien.",
  },
  {
    icon: Timer,
    nama: "Disiplin",
    deskripsi:
      "Taat pada aturan, waktu, dan prosedur kerja yang telah ditetapkan.",
  },
  {
    icon: Users2,
    nama: "Kerjasama",
    deskripsi:
      "Membangun sinergi antar unit dan tenaga kesehatan demi layanan yang menyeluruh.",
  },
  {
    icon: Lightbulb,
    nama: "Inovasi",
    deskripsi:
      "Terbuka pada perbaikan dan perkembangan IPTEK kesehatan yang dinamis.",
  },
  {
    icon: Smile,
    nama: "Kepuasan Pelanggan",
    deskripsi:
      "Mengutamakan kenyamanan dan kepuasan pasien beserta keluarga dalam setiap layanan.",
  },
];

export default function TentangKamiPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tentang Kami"
        title="Mengenal RSU Aghisna Medika Sidareja"
        description="Rumah sakit umum yang tumbuh bersama masyarakat Sidareja dan sekitar Cilacap, dengan komitmen mutu dan pelayanan yang cepat, akurat, dan profesional."
      />

      {/* Profil & Sejarah */}
      <Reveal>
      <Section tone="light">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Profil Singkat" title="Sejarah Kami" />
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink-soft sm:text-base">
              <p>
                RSU Aghisna Medika Sidareja didirikan oleh {RUMAH_SAKIT.pemilik}
                {" "}berdasarkan akta notaris Nuning Indraeni, SH Nomor 50
                tanggal 21 April 2005. Rumah sakit ini memperoleh Izin
                Operasional dari Bupati Cilacap Nomor 445/1161/16/Tahun 2019
                tanggal 5 Mei 2019, dan resmi beroperasi (soft opening) pada{" "}
                {RUMAH_SAKIT.mulaiOperasional}.
              </p>
              <p>
                Berlokasi strategis di {RUMAH_SAKIT.alamat}, dan berdiri di
                atas lahan seluas {RUMAH_SAKIT.luasTanah} dengan luas
                bangunan {RUMAH_SAKIT.luasBangunan}, rumah sakit ini dibangun
                untuk menjawab kebutuhan layanan kesehatan masyarakat di
                wilayah Sidareja dan sekitarnya yang selama ini harus
                menempuh jarak jauh untuk mendapatkan layanan spesialistik.
              </p>
              <p>
                Pada tahun 2025, RSU Aghisna Medika Sidareja diakuisisi oleh
                Persyarikatan Muhammadiyah di bawah manajemen Muhammadiyah
                Gombong Group, dan mewarisi nilai pelayanan yang berlandaskan
                pada semangat gotong royong dan kemanusiaan, sejalan dengan
                rumah sakit dan institusi pendidikan lain dalam grup yang
                telah lebih dahulu dipercaya masyarakat.
              </p>
              <p>
                Kini, di bawah kepemimpinan {RUMAH_SAKIT.direkturUtama} selaku
                Direktur Utama dan {RUMAH_SAKIT.direktur} selaku Direktur, RSU
                Aghisna Medika Sidareja terus berkembang dengan lebih dari{" "}
                {RUMAH_SAKIT.totalTempatTidur} tempat tidur, tim dokter
                spesialis, dan fasilitas penunjang medis yang terus diperkuat
                — seluruhnya diarahkan pada satu tujuan: melayani dengan
                cepat, akurat, dan profesional.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl2 shadow-card">
              <SafeImage
                src="/images/hero/hero-gedung-utama.jpg"
                alt="Gedung RSU Aghisna Medika Sidareja"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 rounded-2xl bg-white p-4 shadow-lift sm:-right-6 sm:p-5">
              <AccreditationSeal size="sm" />
            </div>
          </div>
        </div>
      </Section>
      </Reveal>

      {/* Visi & Misi */}
      <Reveal>
      <Section tone="mist">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="card-surface p-7 sm:p-8">
            <span className="eyebrow">Visi</span>
            <p className="mt-3 font-display text-xl font-semibold leading-snug text-navy-900 sm:text-2xl">
              Menjadi rumah sakit pilihan utama masyarakat dengan pelayanan
              prima dan terakreditasi tinggi.
            </p>
          </div>
          <div className="card-surface p-7 sm:p-8">
            <span className="eyebrow">Misi</span>
            <ul className="mt-3 space-y-3 text-sm leading-relaxed text-ink-soft sm:text-base">
              <li className="flex gap-2.5">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                Melaksanakan penyelenggaraan pelayanan kesehatan rujukan
                secara profesional, cepat, akurat, dan terstandarisasi
                tinggi.
              </li>
              <li className="flex gap-2.5">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                Senantiasa meningkatkan cakupan akses masyarakat pada rumah
                sakit sesuai perkembangan IPTEK dan pemberdayaan masyarakat.
              </li>
              <li className="flex gap-2.5">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                Senantiasa mengembangkan kompetensi skill dan keilmuan SDM
                kesehatan yang berbasis pada keselamatan pasien dan mutu
                layanan yang dinamis.
              </li>
              <li className="flex gap-2.5">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                Mengembangkan kerjasama dengan seluruh pihak yang dibutuhkan
                dalam peningkatan mutu dan akses layanan rumah sakit.
              </li>
              <li className="flex gap-2.5">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                Mengembangkan manajemen rumah sakit yang profesional,
                mandiri, dan inovatif.
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 card-surface p-7 sm:p-8">
          <span className="eyebrow">Falsafah</span>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
            Rumah Sakit yang memberikan pelayanan kesehatan secara prima
            tanpa memandang status ekonomi dan SARA (Suku, Agama, Ras dan
            Antar Golongan).
          </p>
        </div>
      </Section>
      </Reveal>

      {/* Nilai Budaya Organisasi */}
      <Reveal>
      <Section tone="light">
        <SectionHeading
          eyebrow="Budaya Kerja"
          title="Nilai Budaya Organisasi"
          description="Enam nilai yang menjadi landasan sikap dan perilaku seluruh insan RSU Aghisna Medika Sidareja."
        />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {NILAI_BUDAYA.map(({ icon: Icon, nama, deskripsi }) => (
            <div key={nama} className="card-surface p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500 text-white">
                <Icon size={20} />
              </span>
              <p className="mt-4 font-display text-base font-semibold text-navy-900">
                {nama}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {deskripsi}
              </p>
            </div>
          ))}
        </div>
      </Section>
      </Reveal>

      {/* Struktur Organisasi */}
      <Reveal>
      <Section tone="mist">
        <SectionHeading
          eyebrow="Bab IV"
          title="Struktur Organisasi"
          description="Susunan jalur kepemimpinan utama RSU Aghisna Medika Sidareja."
        />
        <div className="mt-10">
          <StrukturOrganisasi />
        </div>
      </Section>
      </Reveal>

      {/* Data Legal */}
      <Reveal>
      <Section tone="light">
        <SectionHeading
          eyebrow="Data Legal"
          title="Identitas Kelembagaan"
          description="Informasi legal dan status resmi RSU Aghisna Medika Sidareja."
        />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {DATA_LEGAL.map(({ icon: Icon, label, value }) => (
            <div key={label} className="card-surface p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-800 text-white">
                <Icon size={20} />
              </span>
              <p className="mt-4 text-xs font-medium uppercase tracking-wide text-ink-faint">
                {label}
              </p>
              <p className="mt-1 font-display text-base font-semibold text-navy-900">
                {value}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="card-surface p-6">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">
              Luas Tanah
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-navy-900">
              {RUMAH_SAKIT.luasTanah}
            </p>
          </div>
          <div className="card-surface p-6">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">
              Luas Bangunan
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-navy-900">
              {RUMAH_SAKIT.luasBangunan}
            </p>
          </div>
        </div>
      </Section>
      </Reveal>

      {/* Muhammadiyah Gombong Group */}
      <Reveal>
      <Section tone="navy">
        <SectionHeading
          eyebrow="Jejaring Kami"
          title="Bagian dari Muhammadiyah Gombong Group"
          description="RSU Aghisna Medika Sidareja bersinergi dengan rumah sakit dan institusi pendidikan lain dalam satu grup untuk saling menguatkan mutu layanan."
          light
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {MUHAMMADIYAH_GOMBONG_GROUP.map((a) => (
            <div
              key={a.id}
              className="flex flex-col items-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-5 text-center backdrop-blur-sm"
            >
              <div className="relative h-14 w-full max-w-[140px] overflow-hidden rounded-lg bg-white/95 p-2">
                <SafeImage
                  src={a.logo}
                  alt={a.nama}
                  fill
                  sizes="140px"
                  className="object-contain p-1"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{a.nama}</p>
                <p className="mt-0.5 text-xs text-white/55">{a.jenis}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
      </Reveal>
    </>
  );
}
