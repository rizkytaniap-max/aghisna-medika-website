import type { Metadata } from "next";
import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Section from "@/components/Section";
import { getArtikelBySlug, getArtikelPublished } from "@/lib/data";

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const artikel = await getArtikelBySlug(params.slug);
  if (!artikel) return {};
  return {
    title: artikel.judul,
    description: artikel.ringkasan,
  };
}

function formatTanggal(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ArtikelDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const artikel = await getArtikelBySlug(params.slug);
  if (!artikel) notFound();

  const semuaArtikel = await getArtikelPublished();
  const artikelLain = semuaArtikel.filter((a) => a.slug !== artikel.slug).slice(0, 2);

  return (
    <article>
      <div className="relative h-72 w-full overflow-hidden bg-navy-900 sm:h-96">
        <SafeImage
          src={artikel.gambar ?? ""}
          alt={artikel.judul}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent" />
        <div className="container-page absolute inset-x-0 bottom-0 pb-10 text-white">
          <span className="eyebrow text-gold-200">{artikel.kategori}</span>
          <h1 className="mt-3 max-w-2xl font-display text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
            {artikel.judul}
          </h1>
          <p className="mt-2 text-sm text-white/70">
            {formatTanggal(artikel.tanggal)}
          </p>
        </div>
      </div>

      <Section tone="light">
        <Link
          href="/berita"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-700"
        >
          <ArrowLeft size={16} /> Kembali ke Berita & Artikel
        </Link>

        <div
          className="prose prose-sm sm:prose-base mt-8 max-w-2xl leading-relaxed text-ink-soft prose-headings:font-display prose-headings:text-navy-900 prose-a:text-teal-600"
          dangerouslySetInnerHTML={{ __html: artikel.konten }}
        />

        {artikelLain.length > 0 && (
          <div className="mt-16 border-t border-mist-200 pt-10">
            <h2 className="font-display text-lg font-bold text-navy-900">
              Artikel Lainnya
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {artikelLain.map((a) => (
                <Link
                  key={a.slug}
                  href={`/berita/${a.slug}`}
                  className="card-surface p-5"
                >
                  <span className="eyebrow">{a.kategori}</span>
                  <h3 className="mt-2 font-display text-sm font-semibold text-navy-900">
                    {a.judul}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Section>
    </article>
  );
}
