import type { Metadata } from "next";
import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { getArtikelPublished } from "@/lib/data";

export const metadata: Metadata = {
  title: "Berita & Artikel Kesehatan",
  description:
    "Informasi dan edukasi kesehatan terbaru dari RSU Aghisna Medika Sidareja.",
};

function formatTanggal(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const revalidate = 0;

export default async function BeritaPage() {
  const artikel = await getArtikelPublished();

  return (
    <>
      <PageHeader
        eyebrow="Berita & Artikel"
        title="Informasi & Edukasi Kesehatan"
        description="Kumpulan artikel kesehatan dari tim medis RSU Aghisna Medika Sidareja untuk membantu Anda hidup lebih sehat."
      />

      <Reveal>
      <Section tone="light">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {artikel.map((a) => (
            <Link
              key={a.slug}
              href={`/berita/${a.slug}`}
              className="card-surface group overflow-hidden"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <SafeImage
                  src={a.gambar ?? ""}
                  alt={a.judul}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-ink-faint">
                  <span className="rounded-full bg-teal-50 px-2.5 py-1 font-semibold text-teal-700">
                    {a.kategori}
                  </span>
                  <span>{formatTanggal(a.tanggal)}</span>
                </div>
                <h2 className="mt-3 font-display text-base font-semibold leading-snug text-navy-900">
                  {a.judul}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm text-ink-soft">
                  {a.ringkasan}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Section>
      </Reveal>
    </>
  );
}
