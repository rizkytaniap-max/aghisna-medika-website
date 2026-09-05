"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, Siren, X } from "lucide-react";
import { clsx } from "clsx";
import { RUMAH_SAKIT, waLink } from "@/data/rumah-sakit";
import type { KategoriLayananDTO, PengumumanDTO } from "@/lib/types";
import AnnouncementMarquee from "@/components/AnnouncementMarquee";

const NAV_LINKS = [
  { href: "/tentang-kami", label: "Tentang Kami" },
  { href: "/layanan", label: "Layanan & Fasilitas", dropdown: true },
  { href: "/dokter", label: "Dokter & Jadwal" },
  { href: "/informasi-berobat", label: "Informasi Berobat" },
  { href: "/berita", label: "Berita & Artikel" },
  { href: "/karir", label: "Karir" },
  { href: "/kontak", label: "Kontak" },
];

export default function Navbar({
  kategoriLayanan,
  pengumuman,
}: {
  kategoriLayanan: KategoriLayananDTO[];
  pengumuman: PengumumanDTO | null;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [layananOpen, setLayananOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/95 shadow-soft backdrop-blur-sm"
          : "bg-white/80 backdrop-blur-sm"
      )}
    >
      <div className="hidden bg-navy-900 text-white lg:block">
        <div className="container-page flex items-center justify-between py-1.5 text-xs">
          <p className="text-white/80">{RUMAH_SAKIT.alamat}</p>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${RUMAH_SAKIT.kontak.teleponUtama}`}
              className="flex items-center gap-1.5 text-white/90 hover:text-gold-200"
            >
              <Phone size={12} /> {RUMAH_SAKIT.kontak.teleponUtama}
            </a>
            <span className="h-3 w-px bg-white/20" />
            <span className="flex items-center gap-1.5 text-gold-200">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-200" />
              Terakreditasi Paripurna
            </span>
            <span className="h-3 w-px bg-white/20" />
            <a
              href={waLink(RUMAH_SAKIT.kontak.waIgd)}
              className="animate-badge-blink flex items-center gap-1.5 rounded px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white"
            >
              <Siren size={12} /> IGD Darurat 24 Jam
            </a>
          </div>
        </div>
      </div>

      <AnnouncementMarquee pengumuman={pengumuman} />

      <nav className="container-page flex items-center justify-between py-3">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src={RUMAH_SAKIT.logo.utama}
            alt={RUMAH_SAKIT.nama}
            width={640}
            height={160}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <div className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((link) =>
            link.dropdown ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setLayananOpen(true)}
                onMouseLeave={() => setLayananOpen(false)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-mist-100 hover:text-navy-800"
                >
                  {link.label}
                  <ChevronDown size={14} />
                </Link>
                {layananOpen && (
                  <div className="absolute left-0 top-full w-72 pt-2">
                    <div className="rounded-2xl border border-mist-200 bg-white p-2 shadow-lift">
                      {kategoriLayanan.map((kat) => (
                        <Link
                          key={kat.id}
                          href={`/layanan#${kat.id}`}
                          className="block rounded-xl px-3.5 py-2.5 text-sm text-ink-soft hover:bg-mist-100 hover:text-navy-800"
                        >
                          <span className="block font-medium text-navy-800">
                            {kat.judul}
                          </span>
                          <span className="block text-xs text-ink-faint">
                            {kat.ringkasan}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-mist-100 hover:text-navy-800"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <div className="hidden items-center gap-2 xl:flex">
          <a href={waLink(RUMAH_SAKIT.kontak.waIgd)} target="_blank" rel="noopener noreferrer" className="btn-navy">
            Hubungi IGD
          </a>
          <a href={waLink(RUMAH_SAKIT.kontak.waPendaftaran)} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Buat Perjanjian
          </a>
        </div>

        <button
          aria-label="Buka menu navigasi"
          className="rounded-lg p-2 text-navy-800 xl:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-mist-200 bg-white xl:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-mist-100"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <a href={waLink(RUMAH_SAKIT.kontak.waIgd)} className="btn-navy w-full">
                Hubungi IGD
              </a>
              <a href={waLink(RUMAH_SAKIT.kontak.waPendaftaran)} className="btn-primary w-full">
                Buat Perjanjian
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
