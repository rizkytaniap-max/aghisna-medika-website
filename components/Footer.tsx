import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { RUMAH_SAKIT, waLink } from "@/data/rumah-sakit";
import { MUHAMMADIYAH_GOMBONG_GROUP } from "@/data/group";

const KONTAK_WA = [
  { label: "Pendaftaran", nomor: RUMAH_SAKIT.kontak.waPendaftaran },
  { label: "IGD 24 Jam", nomor: RUMAH_SAKIT.kontak.waIgd },
  { label: "Humas", nomor: RUMAH_SAKIT.kontak.waHumas },
  { label: "Customer Care", nomor: RUMAH_SAKIT.kontak.waCs },
];

const TAUTAN = [
  { href: "/tentang-kami", label: "Tentang Kami" },
  { href: "/layanan", label: "Layanan & Fasilitas" },
  { href: "/dokter", label: "Dokter & Jadwal Praktik" },
  { href: "/informasi-berobat", label: "Informasi Berobat" },
  { href: "/berita", label: "Berita & Artikel Kesehatan" },
  { href: "/karir", label: "Karir" },
];

export default function Footer() {
  const tahun = new Date().getFullYear();

  return (
    <footer className="bg-navy-gradient text-white">
      <div className="container-page py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src={RUMAH_SAKIT.logo.utamaPutih}
              alt={RUMAH_SAKIT.nama}
              width={640}
              height={160}
              className="h-9 w-auto sm:h-10"
            />
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {RUMAH_SAKIT.tagline}. Rumah Sakit Umum Kelas D, Terakreditasi
              Paripurna, melayani Sidareja dan sekitar Cilacap.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={RUMAH_SAKIT.kontak.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram RSU Aghisna Medika Sidareja"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-gold-400 hover:text-navy-900"
              >
                <Instagram size={16} />
              </a>
              <a
                href={RUMAH_SAKIT.kontak.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook RSU Aghisna Medika Sidareja"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-gold-400 hover:text-navy-900"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-gold-200">
              Tautan
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              {TAUTAN.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="hover:text-white">
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-gold-200">
              Kontak WhatsApp
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              {KONTAK_WA.map((k) => (
                <li key={k.label}>
                  <a
                    href={waLink(k.nomor)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-white"
                  >
                    <Phone size={13} className="text-gold-200" />
                    <span>
                      {k.label}: {k.nomor.replace(/^62/, "0")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-gold-200">
              Alamat & Email
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li className="flex gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold-200" />
                <span>{RUMAH_SAKIT.alamat}</span>
              </li>
              <li className="flex gap-2.5">
                <Phone size={16} className="mt-0.5 shrink-0 text-gold-200" />
                <span>IGD/Ambulans: {RUMAH_SAKIT.kontak.teleponIgdKantor}</span>
              </li>
              <li className="flex gap-2.5">
                <Mail size={16} className="mt-0.5 shrink-0 text-gold-200" />
                <a href={`mailto:${RUMAH_SAKIT.email}`} className="hover:text-white">
                  {RUMAH_SAKIT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
            Bagian dari Muhammadiyah Gombong Group
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-white/60">
            {MUHAMMADIYAH_GOMBONG_GROUP.map((a) => (
              <span key={a.id}>{a.nama}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="container-page flex flex-col items-center justify-between gap-2 text-xs text-white/55 sm:flex-row">
          <p>
            © {tahun} RSU Aghisna Medika Sidareja. Hak cipta dilindungi.
          </p>
          <p>Kelas D · Swasta · Terakreditasi Paripurna</p>
        </div>
      </div>
    </footer>
  );
}
