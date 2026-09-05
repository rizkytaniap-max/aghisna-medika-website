// Tipe data untuk komponen publik yang sekarang mengambil data dari
// database (Prisma), menggantikan tipe yang dulu diimpor dari /data/*.ts.
// File /data/*.ts asli TETAP ADA tapi sekarang HANYA dipakai oleh
// prisma/seed.ts (sumber data awal saat setup database).

export type StatusJadwal = "normal" | "cuti";

export type JadwalPraktikDTO = {
  id: string;
  hari: string;
  jam: string;
  status: string; // "normal" | "cuti"
  keterangan: string | null;
};

export type DokterDTO = {
  id: string;
  nama: string;
  gelar: string | null;
  spesialisasi: string;
  poliklinik: string;
  foto: string | null;
  tipe: string; // "spesialis" | "poli_umum"
  jadwal: JadwalPraktikDTO[];
};

export type LayananItemDTO = {
  id: string;
  nama: string;
  deskripsiLengkap: string;
  listFasilitas: string[];
  jamOperasional: string | null;
  terkaitPoliklinik: boolean;
  gambar: string | null;
};

export type KategoriLayananDTO = {
  id: string;
  judul: string;
  ikon: string;
  ringkasan: string;
  item: LayananItemDTO[];
};

export type KelasKamarDTO = {
  id: string;
  slug: string;
  label: string;
  jumlah: number;
  kelompok: string;
  deskripsi: string;
  deskripsiLengkap: string;
  listFasilitas: string[];
  gambar: string | null;
};

export type ArtikelDTO = {
  id: string;
  slug: string;
  judul: string;
  kategori: string;
  tanggal: string;
  ringkasan: string;
  konten: string;
  gambar: string | null;
  status: string;
};

export type LowonganDTO = {
  id: string;
  slug: string;
  posisi: string;
  kualifikasi: string[];
  deskripsi: string;
  batasWaktu: string | null;
  status: string;
};

export type AsuransiRekananDTO = {
  id: string;
  slug: string;
  nama: string;
  logo: string | null;
  kategori: string;
  sejak: number | null;
};

/** Urutan hari standar, dipakai untuk sorting & filter "hari ini" */
export type PengumumanDTO = {
  id: string;
  teks: string;
  aktif: boolean;
};

export type PengaturanBerandaDTO = {
  heroGambar: string | null;
};

export const URUTAN_HARI = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

export function getHariIniID(date: Date = new Date()): string {
  const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  return hari[date.getDay()];
}
