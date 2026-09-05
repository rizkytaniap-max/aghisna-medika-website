import type { Metadata } from "next";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { RUMAH_SAKIT, waLink } from "@/data/rumah-sakit";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Alamat, nomor WhatsApp Pendaftaran, IGD, Humas, dan Customer Care RSU Aghisna Medika Sidareja, serta lokasi di peta.",
};

const KONTAK_WA = [
  {
    label: "Pendaftaran",
    nomor: RUMAH_SAKIT.kontak.waPendaftaran,
    deskripsi: "Untuk membuat perjanjian & jadwal berobat",
  },
  {
    label: "IGD 24 Jam",
    nomor: RUMAH_SAKIT.kontak.waIgd,
    deskripsi: "Kondisi darurat, siaga 24 jam / 7 hari",
  },
  {
    label: "Humas",
    nomor: RUMAH_SAKIT.kontak.waHumas,
    deskripsi: "Kerja sama, media, dan informasi karir",
  },
  {
    label: "Customer Care",
    nomor: RUMAH_SAKIT.kontak.waCs,
    deskripsi: "Pertanyaan umum & masukan pelayanan",
  },
];

export default function KontakPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kontak"
        title="Hubungi Kami"
        description="Kami siap membantu Anda melalui WhatsApp, telepon, atau kunjungan langsung ke lokasi kami."
      />

      <Reveal>
      <Section tone="light">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {KONTAK_WA.map((k) => (
            <a
              key={k.label}
              href={waLink(k.nomor)}
              target="_blank"
              rel="noopener noreferrer"
              className="card-surface flex flex-col gap-3 p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                <Phone size={19} />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-navy-900">
                  {k.label}
                </h3>
                <p className="mt-1 text-xs text-ink-faint">{k.deskripsi}</p>
              </div>
              <p className="mt-auto font-display text-sm font-semibold text-teal-600">
                {k.nomor.replace(/^62/, "0")}
              </p>
            </a>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr,1.1fr]">
          <div className="space-y-6">
            <div className="card-surface p-6">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 shrink-0 text-teal-600" />
                <div>
                  <h3 className="font-display text-sm font-semibold text-navy-900">
                    Alamat
                  </h3>
                  <p className="mt-1 text-sm text-ink-soft">
                    {RUMAH_SAKIT.alamat}
                  </p>
                </div>
              </div>
            </div>

            <div className="card-surface p-6">
              <div className="flex items-start gap-3">
                <Phone size={20} className="mt-0.5 shrink-0 text-teal-600" />
                <div>
                  <h3 className="font-display text-sm font-semibold text-navy-900">
                    Telepon
                  </h3>
                  <p className="mt-1 text-sm text-ink-soft">
                    {RUMAH_SAKIT.kontak.teleponUtama}
                  </p>
                  <p className="text-sm text-ink-soft">
                    IGD/Ambulans: {RUMAH_SAKIT.kontak.teleponIgdKantor}
                  </p>
                </div>
              </div>
            </div>

            <div className="card-surface p-6">
              <div className="flex items-start gap-3">
                <Mail size={20} className="mt-0.5 shrink-0 text-teal-600" />
                <div>
                  <h3 className="font-display text-sm font-semibold text-navy-900">
                    Email
                  </h3>
                  <a
                    href={`mailto:${RUMAH_SAKIT.email}`}
                    className="mt-1 block text-sm text-ink-soft hover:text-teal-600"
                  >
                    {RUMAH_SAKIT.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="card-surface p-6">
              <h3 className="font-display text-sm font-semibold text-navy-900">
                Media Sosial
              </h3>
              <div className="mt-3 flex gap-3">
                <a
                  href={RUMAH_SAKIT.kontak.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-mist-100 text-navy-800 hover:bg-teal-500 hover:text-white"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href={RUMAH_SAKIT.kontak.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-mist-100 text-navy-800 hover:bg-teal-500 hover:text-white"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-mist-200 shadow-soft">
            <iframe
              title="Lokasi RSU Aghisna Medika Sidareja"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                RUMAH_SAKIT.maps.embedQuery
              )}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 420 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Section>
      </Reveal>
    </>
  );
}
