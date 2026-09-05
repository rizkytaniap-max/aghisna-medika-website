// Data dokter & tenaga medis RSU Aghisna Medika Sidareja
// SUMBER DATA TUNGGAL — dipakai bersama oleh:
//   1. Section "Direktori Dokter per Spesialisasi" (foto, nama, gelar, poliklinik)
//   2. Section "Jadwal Praktik Dokter" (jadwal per hari)
// di halaman /dokter. Edit di sini saja, tidak perlu duplikasi di tempat lain.

export type HariPraktik =
  | "Senin"
  | "Selasa"
  | "Rabu"
  | "Kamis"
  | "Jumat"
  | "Sabtu"
  | "Minggu"
  | "Sesuai Jadwal Operasi";

export type JamPraktik = {
  hari: HariPraktik;
  jam: string; // format "HH.MM–HH.MM" atau "On-call"
};

export type Dokter = {
  id: string;
  nama: string;
  gelar: string;
  spesialisasi: string;
  poliklinik: string;
  foto: string; // path placeholder, ganti dengan foto asli di /public/images/dokter
  jadwal: JamPraktik[];
};

export const DAFTAR_DOKTER: Dokter[] = [
  // ===== POLIKLINIK KANDUNGAN =====
  {
    id: "dok-01",
    nama: "dr. Ferry Gunawan",
    gelar: "Sp.OG",
    spesialisasi: "Obstetri & Ginekologi",
    poliklinik: "Poliklinik Kandungan",
    foto: "/images/dokter/dokter-ferry-gunawan.jpg",
    jadwal: [
      { hari: "Senin", jam: "08.00–10.00" },
      { hari: "Selasa", jam: "08.00–10.00" },
      { hari: "Rabu", jam: "08.00–10.00" },
      { hari: "Kamis", jam: "08.00–10.00" },
      { hari: "Jumat", jam: "08.00–10.00" },
      { hari: "Sabtu", jam: "08.00–10.00" },
    ],
  },
  {
    id: "dok-02",
    nama: "dr. Arga Kafi Perdana Kusuma",
    gelar: "Sp.OG",
    spesialisasi: "Obstetri & Ginekologi",
    poliklinik: "Poliklinik Kandungan",
    foto: "/images/dokter/dokter-arga-kafi-perdana-kusuma.jpg",
    jadwal: [
      { hari: "Senin", jam: "11.30–14.00" },
      { hari: "Kamis", jam: "11.30–14.00" },
      { hari: "Jumat", jam: "11.30–14.00" },
      { hari: "Minggu", jam: "13.00–16.00" },
    ],
  },

  // ===== POLIKLINIK BEDAH UMUM =====
  {
    id: "dok-03",
    nama: "dr. Nur Eko Hadi Sucipto",
    gelar: "Sp.B",
    spesialisasi: "Bedah Umum",
    poliklinik: "Poliklinik Bedah Umum",
    foto: "/images/dokter/dokter-nur-eko-hadi-sucipto.jpg",
    jadwal: [
      { hari: "Senin", jam: "17.00–20.00" },
      { hari: "Selasa", jam: "17.00–20.00" },
      { hari: "Rabu", jam: "17.00–20.00" },
      { hari: "Kamis", jam: "17.00–20.00" },
      { hari: "Jumat", jam: "17.00–20.00" },
    ],
  },

  // ===== POLIKLINIK SYARAF =====
  {
    id: "dok-04",
    nama: "dr. M. Sari'uddin Nuhriawangsa",
    gelar: "Sp.N",
    spesialisasi: "Saraf / Neurologi",
    poliklinik: "Poliklinik Syaraf",
    foto: "/images/dokter/dokter-muhamad-sariuddin-n.jpg",
    jadwal: [
      { hari: "Senin", jam: "17.00–20.00" },
      { hari: "Selasa", jam: "17.00–20.00" },
      { hari: "Rabu", jam: "17.00–20.00" },
      { hari: "Kamis", jam: "17.00–20.00" },
      { hari: "Jumat", jam: "07.00–11.00" },
    ],
  },

  {
    id: "dok-20",
    nama: "dr. Dhian Pangestiningrum",
    gelar: "Sp.N",
    spesialisasi: "Saraf / Neurologi",
    poliklinik: "Poliklinik Syaraf",
    foto: "/images/dokter/dokter-dhian-pangestiningrum.jpg",
    jadwal: [
      { hari: "Jumat", jam: "15.00–16.00" },
      { hari: "Sabtu", jam: "15.00–18.00" },
      { hari: "Minggu", jam: "08.00–12.00" },
    ],
  },

  // ===== POLIKLINIK PENYAKIT DALAM =====
  {
    id: "dok-05",
    nama: "dr. Irfan Alfarizi",
    gelar: "Sp.PD.FINASIM",
    spesialisasi: "Penyakit Dalam",
    poliklinik: "Poliklinik Penyakit Dalam",
    foto: "/images/dokter/dokter-irfan-alfarizi.jpg",
    jadwal: [
      { hari: "Senin", jam: "08.00–15.00" },
      { hari: "Selasa", jam: "08.00–15.00" },
      { hari: "Rabu", jam: "08.00–15.00" },
      { hari: "Kamis", jam: "08.00–15.00" },
      { hari: "Jumat", jam: "08.00–11.00" },
    ],
  },
  {
    id: "dok-06",
    nama: "dr. Dhika Triesnia Sagita",
    gelar: "Sp.PD",
    spesialisasi: "Penyakit Dalam",
    poliklinik: "Poliklinik Penyakit Dalam",
    foto: "/images/dokter/dokter-dhika-triesnia-sagita.jpg",
    jadwal: [
      { hari: "Senin", jam: "12.00–17.00" },
      { hari: "Selasa", jam: "12.00–17.00" },
      { hari: "Rabu", jam: "12.00–17.00" },
      { hari: "Kamis", jam: "12.00–17.00" },
      { hari: "Jumat", jam: "08.00–11.00" },
      { hari: "Sabtu", jam: "08.00–11.00" },
    ],
  },
  {
    id: "dok-07",
    nama: "dr. A Tri Tjahjono Budi Walujo",
    gelar: "Sp.PD",
    spesialisasi: "Penyakit Dalam",
    poliklinik: "Poliklinik Penyakit Dalam",
    foto: "/images/dokter/dokter-a-tri-tjahjono-budi-walujo.jpg",
    jadwal: [
      { hari: "Jumat", jam: "14.00–18.00" },
      { hari: "Sabtu", jam: "08.00–12.00" },
      { hari: "Minggu", jam: "08.00–12.00" },
    ],
  },

  // ===== POLIKLINIK JANTUNG =====
  {
    id: "dok-08",
    nama: "dr. Arif Setyo Hutomo",
    gelar: "Sp.JP, FIHA",
    spesialisasi: "Jantung & Pembuluh Darah",
    poliklinik: "Poliklinik Jantung",
    foto: "/images/dokter/dokter-arif-setyo-hutomo.jpg",
    jadwal: [
      { hari: "Selasa", jam: "09.00–15.00" },
      { hari: "Rabu", jam: "08.00–15.00" },
      { hari: "Rabu", jam: "16.00–21.00" },
      { hari: "Jumat", jam: "09.00–15.00" },
    ],
  },

  // ===== POLIKLINIK PARU =====
  {
    id: "dok-09",
    nama: "dr. Debra Anita Helmi",
    gelar: "Sp.P",
    spesialisasi: "Paru",
    poliklinik: "Poliklinik Paru",
    foto: "/images/dokter/dokter-debra-anita-helmi.jpg",
    jadwal: [
      { hari: "Senin", jam: "15.00–17.00" },
      { hari: "Rabu", jam: "15.00–17.00" },
      { hari: "Jumat", jam: "14.00–16.00" },
    ],
  },

  // ===== POLIKLINIK MATA =====
  {
    id: "dok-10",
    nama: "dr. Noor Hafizah Nasution",
    gelar: "Sp.M",
    spesialisasi: "Mata",
    poliklinik: "Poliklinik Mata",
    foto: "/images/dokter/dokter-noor-hafizah-nasution.jpg",
    jadwal: [
      { hari: "Senin", jam: "18.00–21.00" },
      { hari: "Selasa", jam: "08.00–12.00" },
      { hari: "Selasa", jam: "14.00–18.00" },
      { hari: "Rabu", jam: "08.00–12.00" },
      { hari: "Rabu", jam: "14.00–18.00" },
      { hari: "Kamis", jam: "08.00–12.00" },
    ],
  },

  // ===== POLIKLINIK ANAK =====
  {
    id: "dok-11",
    nama: "dr. Tri Hartono",
    gelar: "Sp.A",
    spesialisasi: "Kesehatan Anak",
    poliklinik: "Poliklinik Anak",
    foto: "/images/dokter/dokter-tri-hartono.jpg",
    jadwal: [
      { hari: "Senin", jam: "09.00–12.00" },
      { hari: "Selasa", jam: "09.00–12.00" },
      { hari: "Rabu", jam: "09.00–12.00" },
      { hari: "Kamis", jam: "09.00–12.00" },
      { hari: "Jumat", jam: "09.00–12.00" },
    ],
  },
  {
    id: "dok-12",
    nama: "dr. Yunita Desy Wulansari",
    gelar: "Sp.A",
    spesialisasi: "Kesehatan Anak",
    poliklinik: "Poliklinik Anak",
    foto: "/images/dokter/dokter-yunita-desy-wulansari.jpg",
    jadwal: [
      { hari: "Rabu", jam: "16.00–19.00" },
      { hari: "Sabtu", jam: "15.00–18.00" },
    ],
  },

  // ===== POLIKLINIK THT-KL =====
  // Update per SK Direktur 008/SK/RSU-AMS/IV/2026: dr. Yondi Piter Papulung
  // digantikan oleh dr. Nindra Oktras Vianata Nursetiyo, Sp.THT-BKL.
  {
    id: "dok-13",
    nama: "dr. Nindra Oktras Vianata Nursetiyo",
    gelar: "Sp.THT-BKL",
    spesialisasi: "THT-KL",
    poliklinik: "Poliklinik THT-KL",
    foto: "/images/dokter/dokter-nindra-oktras-vianata-nursetiyo.jpg",
    jadwal: [
      { hari: "Senin", jam: "16.15–18.00" },
      { hari: "Rabu", jam: "16.15–18.00" },
      { hari: "Jumat", jam: "15.00–17.00" },
    ],
  },

  // ===== POLIKLINIK KULIT, KELAMIN & ESTETIKA =====
  {
    id: "dok-14",
    nama: "dr. Noviana Sie",
    gelar: "Sp.DVE",
    spesialisasi: "Kulit, Kelamin & Estetika",
    poliklinik: "Poliklinik Kulit, Kelamin & Estetika",
    foto: "/images/dokter/dokter-noviana-sie.jpg",
    jadwal: [
      { hari: "Senin", jam: "15.00–17.00" },
      { hari: "Selasa", jam: "15.00–17.00" },
      { hari: "Jumat", jam: "14.00–17.00" },
    ],
  },

  // ===== SPESIALIS PATOLOGI KLINIK =====
  // Update per SK Direktur 008/SK/RSU-AMS/IV/2026: dr. Teddy Dharmawan
  // digantikan oleh dr. B. Renny Yuliantisari.
  {
    id: "dok-15",
    nama: "dr. B. Renny Yuliantisari",
    gelar: "M.M.R, M.Med.Sc, Sp.PK",
    spesialisasi: "Patologi Klinik",
    poliklinik: "Spesialis Patologi Klinik",
    foto: "/images/dokter/dokter-b-renny-yuliantisari.jpg",
    jadwal: [{ hari: "Selasa", jam: "09.00–14.00" }],
  },

  // ===== SPESIALIS RADIOLOGI =====
  {
    id: "dok-16",
    nama: "dr. Zaka Jauhar Firdaus",
    gelar: "Sp.Rad",
    spesialisasi: "Radiologi",
    poliklinik: "Spesialis Radiologi",
    foto: "/images/dokter/dokter-zaka-jauhar-firdaus.jpg",
    jadwal: [
      { hari: "Selasa", jam: "11.00–15.00" },
      { hari: "Rabu", jam: "09.00–13.00" },
      { hari: "Kamis", jam: "08.00–10.00" },
    ],
  },

  // ===== SPESIALIS ANESTESI (on-call, mengikuti jadwal operasi) =====
  {
    id: "dok-17",
    nama: "dr. Diana Anggraini",
    gelar: "Sp.AN",
    spesialisasi: "Anestesiologi",
    poliklinik: "Spesialis Anestesi",
    foto: "/images/dokter/dokter-diana-anggraeni.jpg",
    jadwal: [{ hari: "Sesuai Jadwal Operasi", jam: "On-call" }],
  },
  {
    id: "dok-18",
    nama: "dr. Anindito Andi Nugroho",
    gelar: "Sp.AN",
    spesialisasi: "Anestesiologi",
    poliklinik: "Spesialis Anestesi",
    foto: "/images/dokter/dokter-anindito-andi-nugroho.jpg",
    jadwal: [{ hari: "Sesuai Jadwal Operasi", jam: "On-call" }],
  },

  // ===== POLIKLINIK GIGI (baru, per SK Direktur 008/SK/RSU-AMS/IV/2026) =====
  {
    id: "dok-21",
    nama: "drg. Dhevina Adinda Salshabila",
    gelar: "",
    spesialisasi: "Kedokteran Gigi",
    poliklinik: "Poliklinik Gigi",
    foto: "/images/dokter/dokter-dhevina-adinda-salshabila.jpg",
    // Jadwal praktik belum tercantum di dokumen sumber — perlu dikonfirmasi ke pihak RS.
    jadwal: [],
  },

  // ===== LAYANAN FISIOTERAPI =====
  {
    id: "dok-19",
    nama: "Tim Fisioterapis",
    gelar: "",
    spesialisasi: "Fisioterapi",
    poliklinik: "Layanan Fisioterapi",
    foto: "/images/dokter/dokter-tim-fisioterapi.jpg",
    jadwal: [
      { hari: "Senin", jam: "08.00–20.00" },
      { hari: "Selasa", jam: "08.00–20.00" },
      { hari: "Rabu", jam: "08.00–20.00" },
      { hari: "Kamis", jam: "08.00–20.00" },
      { hari: "Jumat", jam: "08.00–20.00" },
      { hari: "Sabtu", jam: "08.00–20.00" },
    ],
  },
];

// Daftar poliklinik unik, dipakai untuk filter di halaman Jadwal Dokter
export const DAFTAR_POLIKLINIK = Array.from(
  new Set(DAFTAR_DOKTER.map((d) => d.poliklinik))
);

// Urutan hari standar, dipakai untuk sorting & filter "hari ini"
export const URUTAN_HARI: HariPraktik[] = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

// Poli Umum — buka 24 jam dengan dokter jaga bergilir.
// Ditampilkan sebagai satu kartu khusus, bukan per-jadwal jam.
export type DokterJagaUmum = {
  nama: string;
  foto: string; // path placeholder, ganti dengan foto asli di /public/images/dokter
};

export const POLI_UMUM_24_JAM: {
  judul: string;
  keterangan: string;
  dokterJaga: DokterJagaUmum[];
} = {
  judul: "Poli Umum",
  keterangan: "Buka 24 Jam — Setiap Hari",
  dokterJaga: [
    { nama: "dr. Dzaka Alim Asyam", foto: "/images/dokter/dokter-dzaka-alim-asyam.jpg" },
    { nama: "dr. Atingul Ma'rifah", foto: "/images/dokter/dokter-atingul-marifah.jpg" },
    { nama: "dr. Laela Nurrochmah", foto: "/images/dokter/dokter-laela-nurrochmah.jpg" },
    { nama: "dr. Az-Zahra Mahrunnisa", foto: "/images/dokter/dokter-az-zahra-mahrunnisa.jpg" },
    { nama: "dr. Muhamad Farhan Naufal Siregar", foto: "/images/dokter/dokter-muhamad-farhan-naufal-siregar.jpg" },
    { nama: "dr. Nurnawansi Soga", foto: "/images/dokter/dokter-nurnawansi-soga.jpg" },
    { nama: "dr. Ratih Puspaningsih", foto: "/images/dokter/dokter-ratih-puspaningsih.jpg" },
    { nama: "dr. Vita Fatimah", foto: "/images/dokter/dokter-vita-fatimah.jpg" },
    { nama: "dr. Cindar Fatiha Sari", foto: "/images/dokter/dokter-cindar-fatiha-sari.jpg" },
    { nama: "dr. Fitri Chyndi Pangestiwi", foto: "/images/dokter/dokter-fitri-chyndi-pangestiwi.jpg" },
  ],
};

/**
 * Mengembalikan hari praktik dalam Bahasa Indonesia berdasarkan Date saat ini.
 * Gunakan di client component (bukan server) agar sesuai zona waktu pengunjung.
 */
export function getHariIniID(date: Date = new Date()): HariPraktik {
  const hari: HariPraktik[] = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  return hari[date.getDay()];
}
