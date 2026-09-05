import SafeImage from "@/components/SafeImage";
import { ArrowRight, PhoneCall } from "lucide-react";
import { RUMAH_SAKIT, waLink } from "@/data/rumah-sakit";
import AccreditationSeal from "@/components/AccreditationSeal";
import { getPengaturanBeranda } from "@/lib/data";

const HERO_GAMBAR_DEFAULT = "/images/hero/hero-tim-medis.jpg";

export default async function Hero() {
  const pengaturan = await getPengaturanBeranda();
  const heroGambar = pengaturan.heroGambar || HERO_GAMBAR_DEFAULT;

  return (
    <section className="relative overflow-hidden bg-navy-gradient text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-seal-radial"
        aria-hidden
      />
      <div className="container-page relative grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr,0.95fr] lg:py-28">
        <div className="animate-fade-up">
          <span className="eyebrow text-gold-200">
            Rumah Sakit Umum Kelas D · Sidareja, Cilacap
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
            {RUMAH_SAKIT.nama}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
            &ldquo;{RUMAH_SAKIT.tagline}&rdquo; — melayani masyarakat Sidareja
            dan sekitarnya dengan IGD 24 jam, dokter spesialis, dan fasilitas
            rawat inap lengkap.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={waLink(
                RUMAH_SAKIT.kontak.waIgd,
                "Assalamu'alaikum, saya membutuhkan bantuan IGD."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              <PhoneCall size={17} /> Hubungi IGD
            </a>
            <a
              href={waLink(
                RUMAH_SAKIT.kontak.waPendaftaran,
                "Assalamu'alaikum, saya ingin membuat perjanjian berobat."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Buat Perjanjian <ArrowRight size={17} />
            </a>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <AccreditationSeal size="sm" />
            <div className="text-sm text-white/75">
              <p className="font-semibold text-white">
                {RUMAH_SAKIT.akreditasi}
              </p>
              <p>Standar mutu & keselamatan pasien nasional</p>
            </div>
          </div>
        </div>

        <div className="relative animate-fade-in">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl2 shadow-lift sm:aspect-[5/4] lg:aspect-[4/5]">
            <SafeImage
              src={heroGambar}
              alt="Fasilitas dan tenaga medis RSU Aghisna Medika Sidareja"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-white p-5 shadow-lift sm:block">
            <p className="font-display text-3xl font-bold text-navy-800">
              {RUMAH_SAKIT.totalTempatTidur}+
            </p>
            <p className="text-xs font-medium text-ink-faint">
              Tempat Tidur Tersedia
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
