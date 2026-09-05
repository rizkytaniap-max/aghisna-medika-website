export type Artikel = {
  slug: string;
  judul: string;
  ringkasan: string;
  kategori: string;
  tanggal: string;
  gambar: string;
  konten: string[];
};

export const ARTIKEL: Artikel[] = [
  {
    slug: "kenali-tanda-bahaya-perlu-ke-igd",
    judul: "Kenali Tanda Bahaya yang Perlu Segera Dibawa ke IGD",
    ringkasan:
      "Tidak semua keluhan perlu ke IGD, tapi beberapa gejala berikut tidak boleh ditunda. Kenali tandanya sebelum terlambat.",
    kategori: "Gawat Darurat",
    tanggal: "2026-06-18",
    gambar: "/images/berita/berita-thumbnail-1.jpg",
    konten: [
      "Nyeri dada mendadak, sesak napas berat, kelemahan separuh badan, dan perdarahan hebat adalah beberapa tanda yang memerlukan penanganan segera.",
      "IGD RSU Aghisna Medika Sidareja siap 24 jam dengan tim medis terlatih untuk menangani kondisi kegawatdaruratan dewasa maupun anak.",
      "Jangan menunggu gejala memburuk. Segera hubungi ambulans atau datang langsung ke IGD terdekat.",
    ],
  },
  {
    slug: "pentingnya-medical-check-up-rutin",
    judul: "Pentingnya Medical Check Up Rutin bagi Kesehatan Jangka Panjang",
    ringkasan:
      "Deteksi dini adalah kunci pencegahan penyakit kronis. Simak manfaat pemeriksaan kesehatan berkala.",
    kategori: "Gaya Hidup Sehat",
    tanggal: "2026-06-10",
    gambar: "/images/berita/berita-thumbnail-2.jpg",
    konten: [
      "Medical Check Up (MCU) membantu mendeteksi risiko penyakit sejak dini, sebelum gejala muncul.",
      "RSU Aghisna Medika Sidareja menyediakan layanan MCU dengan pemeriksaan laboratorium dan penunjang yang lengkap.",
      "Disarankan melakukan MCU minimal satu kali dalam setahun, terutama bagi yang berusia di atas 35 tahun.",
    ],
  },
  {
    slug: "menjaga-kesehatan-ibu-hamil-trimester-ketiga",
    judul: "Menjaga Kesehatan Ibu Hamil di Trimester Ketiga",
    ringkasan:
      "Trimester ketiga adalah masa persiapan menuju persalinan. Ketahui apa saja yang perlu diperhatikan.",
    kategori: "Kandungan & Persalinan",
    tanggal: "2026-05-28",
    gambar: "/images/berita/berita-thumbnail-3.jpg",
    konten: [
      "Pemeriksaan kandungan rutin di trimester ketiga penting untuk memantau posisi janin dan kesiapan persalinan.",
      "Poliklinik Kandungan RSU Aghisna Medika Sidareja melayani konsultasi kehamilan bersama dokter spesialis Obstetri & Ginekologi.",
      "Layanan Persalinan tersedia 24 jam untuk memastikan ibu dan bayi mendapat penanganan terbaik kapan pun dibutuhkan.",
    ],
  },
];
