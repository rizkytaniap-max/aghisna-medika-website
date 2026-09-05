import { prisma } from "@/lib/prisma";
import type {
  DokterDTO,
  KategoriLayananDTO,
  KelasKamarDTO,
  ArtikelDTO,
  LowonganDTO,
  AsuransiRekananDTO,
  PengumumanDTO,
  PengaturanBerandaDTO,
} from "@/lib/types";

function amanParseJSON<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

// Tipe baris mentah persis sesuai skema Prisma (prisma/schema.prisma).
// Dipakai supaya file ini tetap type-safe walau @prisma/client belum
// pernah di-generate (mis. saat linting di lingkungan tanpa akses
// internet ke binaries.prisma.sh) — begitu `npx prisma generate` sudah
// pernah dijalankan, tipe ini kompatibel dengan tipe asli yang dihasilkan.
type RawJadwalPraktik = {
  id: string;
  hari: string;
  jam: string;
  status: string;
  keterangan: string | null;
};
type RawDokter = {
  id: string;
  nama: string;
  gelar: string | null;
  spesialisasi: string;
  poliklinik: string;
  foto: string | null;
  tipe: string;
  jadwal: RawJadwalPraktik[];
};
type RawLayananItem = {
  id: string;
  nama: string;
  deskripsiLengkap: string;
  listFasilitas: string;
  jamOperasional: string | null;
  terkaitPoliklinik: boolean;
  gambar: string | null;
};
type RawKategoriLayanan = {
  id: string;
  judul: string;
  ikon: string;
  ringkasan: string;
  item: RawLayananItem[];
};
type RawKelasKamar = {
  id: string;
  slug: string;
  label: string;
  jumlah: number;
  kelompok: string;
  deskripsi: string;
  deskripsiLengkap: string;
  listFasilitas: string;
  gambar: string | null;
};
type RawArtikel = {
  id: string;
  slug: string;
  judul: string;
  kategori: string;
  tanggal: Date;
  ringkasan: string;
  konten: string;
  gambar: string | null;
  status: string;
};
type RawLowongan = {
  id: string;
  slug: string;
  posisi: string;
  kualifikasi: string;
  deskripsi: string;
  batasWaktu: Date | null;
  status: string;
};
type RawAsuransiRekanan = {
  id: string;
  slug: string;
  nama: string;
  logo: string | null;
  kategori: string;
  sejak: number | null;
};
type RawPengumuman = {
  id: string;
  teks: string;
  aktif: boolean;
};

export async function getSemuaDokter(): Promise<DokterDTO[]> {
  const data: RawDokter[] = await prisma.dokter.findMany({
    include: { jadwal: true },
    orderBy: { urutan: "asc" },
  });
  return data.map((d) => ({
    id: d.id,
    nama: d.nama,
    gelar: d.gelar,
    spesialisasi: d.spesialisasi,
    poliklinik: d.poliklinik,
    foto: d.foto,
    tipe: d.tipe,
    jadwal: d.jadwal.map((j) => ({
      id: j.id,
      hari: j.hari,
      jam: j.jam,
      status: j.status,
      keterangan: j.keterangan,
    })),
  }));
}

export async function getKategoriLayanan(): Promise<KategoriLayananDTO[]> {
  const data: RawKategoriLayanan[] = await prisma.kategoriLayanan.findMany({
    include: { item: { orderBy: { urutan: "asc" } } },
    orderBy: { urutan: "asc" },
  });
  return data.map((k) => ({
    id: k.id,
    judul: k.judul,
    ikon: k.ikon,
    ringkasan: k.ringkasan,
    item: k.item.map((i) => ({
      id: i.id,
      nama: i.nama,
      deskripsiLengkap: i.deskripsiLengkap,
      listFasilitas: amanParseJSON<string[]>(i.listFasilitas, []),
      jamOperasional: i.jamOperasional,
      terkaitPoliklinik: i.terkaitPoliklinik,
      gambar: i.gambar,
    })),
  }));
}

export async function getKelasKamar(): Promise<KelasKamarDTO[]> {
  const data: RawKelasKamar[] = await prisma.kelasKamar.findMany({
    orderBy: { urutan: "asc" },
  });
  return data.map((k) => ({
    id: k.id,
    slug: k.slug,
    label: k.label,
    jumlah: k.jumlah,
    kelompok: k.kelompok,
    deskripsi: k.deskripsi,
    deskripsiLengkap: k.deskripsiLengkap,
    listFasilitas: amanParseJSON<string[]>(k.listFasilitas, []),
    gambar: k.gambar,
  }));
}

export async function getArtikelPublished(): Promise<ArtikelDTO[]> {
  const data: RawArtikel[] = await prisma.artikel.findMany({
    where: { status: "published" },
    orderBy: { tanggal: "desc" },
  });
  return data.map((a) => ({
    id: a.id,
    slug: a.slug,
    judul: a.judul,
    kategori: a.kategori,
    tanggal: a.tanggal.toISOString(),
    ringkasan: a.ringkasan,
    konten: a.konten,
    gambar: a.gambar,
    status: a.status,
  }));
}

export async function getArtikelBySlug(slug: string): Promise<ArtikelDTO | null> {
  const a: RawArtikel | null = await prisma.artikel.findUnique({ where: { slug } });
  if (!a || a.status !== "published") return null;
  return {
    id: a.id,
    slug: a.slug,
    judul: a.judul,
    kategori: a.kategori,
    tanggal: a.tanggal.toISOString(),
    ringkasan: a.ringkasan,
    konten: a.konten,
    gambar: a.gambar,
    status: a.status,
  };
}

export async function getLowonganAktif(): Promise<LowonganDTO[]> {
  const now = new Date();
  const data: RawLowongan[] = await prisma.lowongan.findMany({
    where: {
      status: "dibuka",
      OR: [{ batasWaktu: null }, { batasWaktu: { gte: now } }],
    },
    orderBy: { createdAt: "desc" },
  });
  return data.map((l) => ({
    id: l.id,
    slug: l.slug,
    posisi: l.posisi,
    kualifikasi: amanParseJSON<string[]>(l.kualifikasi, []),
    deskripsi: l.deskripsi,
    batasWaktu: l.batasWaktu ? l.batasWaktu.toISOString() : null,
    status: l.status,
  }));
}

export async function getAsuransiRekanan(): Promise<AsuransiRekananDTO[]> {
  const data: RawAsuransiRekanan[] = await prisma.asuransiRekanan.findMany({
    orderBy: { urutan: "asc" },
  });
  return data.map((r) => ({
    id: r.id,
    slug: r.slug,
    nama: r.nama,
    logo: r.logo,
    kategori: r.kategori,
    sejak: r.sejak ?? null,
  }));
}

/** Dipakai header publik — hanya kembalikan pengumuman kalau aktif=true. */
export async function getPengumumanAktif(): Promise<PengumumanDTO | null> {
  const data: RawPengumuman | null = await prisma.pengumuman.findFirst({
    where: { aktif: true },
  });
  if (!data) return null;
  return { id: data.id, teks: data.teks, aktif: data.aktif };
}

/** Singleton — kalau baris "beranda" belum ada (belum pernah diedit lewat
 * admin), kembalikan heroGambar: null supaya Hero.tsx pakai fallback default. */
export async function getPengaturanBeranda(): Promise<PengaturanBerandaDTO> {
  const data = await prisma.pengaturanBeranda.findUnique({
    where: { id: "beranda" },
  });
  return { heroGambar: data?.heroGambar ?? null };
}
