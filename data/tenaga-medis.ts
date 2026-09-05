export type StatistikDokter = {
  label: string;
  singkatan: string;
  jumlah: number;
};

export const STATISTIK_DOKTER: StatistikDokter[] = [
  { label: "Dokter Umum", singkatan: "dr.", jumlah: 10 },
  { label: "Dokter Gigi", singkatan: "drg.", jumlah: 1 },
  { label: "Sp. Penyakit Dalam", singkatan: "Sp.PD", jumlah: 3 },
  { label: "Sp. Obstetri & Ginekologi", singkatan: "Sp.OG", jumlah: 2 },
  { label: "Sp. Anak", singkatan: "Sp.A", jumlah: 2 },
  { label: "Sp. Bedah", singkatan: "Sp.B", jumlah: 1 },
  { label: "Sp. Radiologi", singkatan: "Sp.Rad", jumlah: 1 },
  { label: "Sp. Anestesiologi", singkatan: "Sp.An", jumlah: 2 },
  { label: "Sp. Patologi Klinik", singkatan: "Sp.PK", jumlah: 1 },
  { label: "Sp. Kulit, Kelamin & Estetika", singkatan: "Sp.DV", jumlah: 1 },
  { label: "Sp. Saraf / Neurologi", singkatan: "Sp.N", jumlah: 2 },
  { label: "Sp. Mata", singkatan: "Sp.M", jumlah: 1 },
  { label: "Sp. THT-KL", singkatan: "Sp.THT-BKL", jumlah: 1 },
  { label: "Sp. Jantung & Pembuluh Darah", singkatan: "Sp.JP", jumlah: 1 },
  { label: "Sp. Paru", singkatan: "Sp.P", jumlah: 1 },
];

export const TOTAL_DOKTER_SPESIALIS = STATISTIK_DOKTER.filter(
  (d) => d.singkatan !== "dr." && d.singkatan !== "drg."
).reduce((total, d) => total + d.jumlah, 0);

// Sesuai SK Direktur Nomor 008/SK/RSU-AMS/IV/2026
export const TENAGA_PENDUKUNG = [
  { label: "Perawat", jumlah: "67" },
  { label: "Bidan", jumlah: "24" },
  { label: "Tenaga Kesehatan Lain", jumlah: "31" },
  { label: "Non-klinis", jumlah: "19" },
];

export const RINGKASAN_TENAGA_MEDIS = {
  totalTenagaMedisKesehatan: "150+",
  deskripsi:
    "Didukung 150+ tenaga medis & kesehatan profesional yang siap melayani Anda dan keluarga.",
};
