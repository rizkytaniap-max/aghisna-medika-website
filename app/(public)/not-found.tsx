import Link from "next/link";
import { Compass, PhoneCall } from "lucide-react";
import { RUMAH_SAKIT, waLink } from "@/data/rumah-sakit";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-navy-gradient text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-seal-radial"
        aria-hidden
      />
      <div className="container-page relative py-20 text-center">
        <span className="eyebrow justify-center text-gold-200">
          Halaman Tidak Ditemukan
        </span>
        <h1 className="mt-4 font-display text-5xl font-bold sm:text-6xl">
          404
        </h1>
        <p className="mx-auto mt-4 max-w-md text-white/75">
          Maaf, halaman yang Anda cari tidak tersedia atau sudah dipindahkan.
          Silakan kembali ke beranda atau hubungi kami bila membutuhkan
          bantuan.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-gold">
            <Compass size={17} /> Kembali ke Beranda
          </Link>
          <a
            href={waLink(RUMAH_SAKIT.kontak.waCs)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <PhoneCall size={17} /> Hubungi Customer Care
          </a>
        </div>
      </div>
    </section>
  );
}
