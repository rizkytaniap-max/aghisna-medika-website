import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Section, { SectionHeading } from "@/components/Section";
import type { ArtikelDTO } from "@/lib/types";

export default function ArtikelTerbaru({ artikelList }: { artikelList: ArtikelDTO[] }) {
  return (
    <Section tone="light">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="Berita & Artikel"
          title="Informasi & Edukasi Kesehatan Terbaru"
        />
        <Link
          href="/berita"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-700"
        >
          Lihat semua artikel <ArrowUpRight size={16} />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {artikelList.slice(0, 3).map((a) => (
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
              <span className="eyebrow">{a.kategori}</span>
              <h3 className="mt-2 font-display text-base font-semibold leading-snug text-navy-900">
                {a.judul}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-ink-soft">
                {a.ringkasan}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
