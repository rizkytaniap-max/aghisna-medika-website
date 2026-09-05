import type { Metadata } from "next";
import { Briefcase, CalendarClock, FileText, MessageSquare, Send } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Section, { SectionHeading } from "@/components/Section";
import Reveal from "@/components/Reveal";
import { getLowonganAktif } from "@/lib/data";
import { RUMAH_SAKIT, waLink } from "@/data/rumah-sakit";

export const metadata: Metadata = {
  title: "Karir",
  description:
    "Informasi lowongan kerja dan cara melamar di RSU Aghisna Medika Sidareja.",
};

export const revalidate = 0;

const LANGKAH_LAMARAN = [
  {
    icon: FileText,
    judul: "Siapkan Berkas Lamaran",
    deskripsi: "CV, surat lamaran, ijazah, STR/SIP (untuk tenaga kesehatan), dan pas foto terbaru.",
  },
  {
    icon: MessageSquare,
    judul: "Hubungi WhatsApp Humas",
    deskripsi: `Kirim pesan ke nomor Humas kami di ${RUMAH_SAKIT.kontak.waHumas.replace(/^62/, "0")} untuk menanyakan posisi yang sedang dibuka.`,
  },
  {
    icon: Send,
    judul: "Kirim Berkas Lamaran",
    deskripsi: "Kirimkan berkas lamaran sesuai format yang diarahkan oleh tim Humas melalui WhatsApp.",
  },
];

function formatTanggal(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function KarirPage() {
  const lowongan = await getLowonganAktif();

  return (
    <>
      <PageHeader
        eyebrow="Karir"
        title="Bergabung Bersama RSU Aghisna Medika Sidareja"
        description="Jadilah bagian dari tim yang melayani dengan cepat, tepat, dan profesional."
      />

      <Reveal>
      <Section tone="light">
        {lowongan.length > 0 ? (
          <>
            <SectionHeading
              eyebrow="Lowongan Tersedia"
              title="Informasi Lowongan Saat Ini"
            />
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {lowongan.map((l) => (
                <div key={l.id} className="card-surface p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-800 text-white">
                    <Briefcase size={19} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">
                    {l.posisi}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {l.deskripsi}
                  </p>
                  {l.kualifikasi.length > 0 && (
                    <ul className="mt-3 space-y-1.5 text-xs text-ink-faint">
                      {l.kualifikasi.map((k) => (
                        <li key={k} className="flex items-start gap-1.5">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-teal-500" />
                          {k}
                        </li>
                      ))}
                    </ul>
                  )}
                  {l.batasWaktu && (
                    <p className="mt-4 flex items-center gap-1.5 text-xs font-medium text-gold-600">
                      <CalendarClock size={13} /> Batas lamaran: {formatTanggal(l.batasWaktu)}
                    </p>
                  )}
                  <a
                    href={waLink(
                      RUMAH_SAKIT.kontak.waHumas,
                      `Assalamu'alaikum, saya ingin melamar untuk posisi ${l.posisi}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary mt-4"
                  >
                    Lamar via WhatsApp
                  </a>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="card-surface flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-3">
              <Briefcase size={26} className="mt-0.5 shrink-0 text-teal-600" />
              <div>
                <h2 className="font-display text-lg font-bold text-navy-900">
                  Informasi Lowongan Saat Ini
                </h2>
                <p className="mt-1 max-w-lg text-sm text-ink-soft">
                  Belum ada lowongan yang dibuka saat ini. Untuk informasi
                  lowongan terbaru, silakan hubungi tim Humas kami langsung
                  melalui WhatsApp.
                </p>
              </div>
            </div>
            <a
              href={waLink(
                RUMAH_SAKIT.kontak.waHumas,
                "Assalamu'alaikum, saya ingin menanyakan informasi lowongan kerja di RSU Aghisna Medika Sidareja."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary shrink-0"
            >
              Tanya Lowongan
            </a>
          </div>
        )}

        <div className="mt-14">
          <SectionHeading
            eyebrow="Cara Melamar"
            title="Langkah Mengirim Lamaran Kerja"
          />
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {LANGKAH_LAMARAN.map(({ icon: Icon, judul, deskripsi }, idx) => (
              <div key={judul} className="card-surface p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-800 text-white">
                    <Icon size={18} />
                  </span>
                  <span className="font-display text-xs font-bold text-ink-faint">
                    Langkah {idx + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-navy-900">
                  {judul}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {deskripsi}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl bg-navy-gradient p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h3 className="font-display text-lg font-semibold">
              Punya pertanyaan seputar karir di sini?
            </h3>
            <p className="mt-1 text-sm text-white/70">
              Tim Humas kami siap membantu menjawab pertanyaan Anda.
            </p>
          </div>
          <a
            href={waLink(RUMAH_SAKIT.kontak.waHumas)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold shrink-0"
          >
            Chat Humas
          </a>
        </div>
      </Section>
      </Reveal>
    </>
  );
}
