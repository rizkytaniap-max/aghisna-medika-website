export type KelasTempatTidur = {
  id: string;
  label: string;
  jumlah: number;
  kelompok: "Rawat Inap" | "Intensif" | "Khusus";
  deskripsi: string;
  deskripsiLengkap: string;
  listFasilitas: string[];
  foto: string;
};

// Catatan: deskripsiLengkap & listFasilitas di bawah ini adalah DRAF standar
// umum kelas rawat inap rumah sakit — perlu dikonfirmasi ke pihak RS untuk
// kesesuaian fasilitas aktual sebelum dipublikasikan final.
//
// PENTING — jumlah kamar VVIP, Kelas I, II, III, dan Perinatologi BELUM
// diupdate dari draf SK Direktur 008/SK/RSU-AMS/IV/2026 karena dokumen
// sumber sendiri punya 2 versi angka yang berbeda (Bab V vs Lampiran I).
// Lihat tabel perbandingan di ringkasan chat untuk konfirmasi manual ke
// pihak RS sebelum angka-angka ini diupdate.
export const TEMPAT_TIDUR: KelasTempatTidur[] = [
  {
    id: "vvip",
    label: "VVIP / Super VIP",
    jumlah: 6,
    kelompok: "Rawat Inap",
    deskripsi: "Kamar privat dengan fasilitas terlengkap untuk kenyamanan maksimal.",
    deskripsiLengkap:
      "Kelas VVIP/Super VIP dilengkapi fasilitas terlengkap untuk kenyamanan maksimal pasien dan penunggu, dengan 1 tempat tidur per kamar. (Draf — perlu dikonfirmasi ke pihak RS)",
    listFasilitas: [
      "AC & TV",
      "Kamar mandi dalam dengan air panas",
      "Sofa bed untuk penunggu pasien",
      "Layanan makan pasien",
      "1 tempat tidur per kamar",
    ],
    foto: "/images/kamar/kamar-vvip.jpg",
  },
  {
    id: "vip",
    label: "VIP",
    jumlah: 4,
    kelompok: "Rawat Inap",
    deskripsi: "Kamar privat dengan fasilitas lengkap dan suasana tenang.",
    deskripsiLengkap:
      "Kelas VIP menawarkan kamar privat dengan fasilitas lengkap dan suasana tenang. (Jumlah kamar masih menunggu konfirmasi — lihat catatan Bab V vs Lampiran I)",
    listFasilitas: [
      "Single bed pasien",
      "Sofa",
      "Kursi & meja balkon",
      "TV",
      "Kamar mandi dalam",
      "AC",
      "Lemari pendingin",
      // Daftar dari Lampiran I belum lengkap di dokumen — perlu dilengkapi dari sumber asli.
    ],
    foto: "/images/kamar/kamar-vip.jpg",
  },
  {
    id: "kelas-1",
    label: "Kelas I",
    jumlah: 10,
    kelompok: "Rawat Inap",
    deskripsi: "Kamar dengan maksimal 2 tempat tidur per ruang.",
    deskripsiLengkap:
      "Kelas I merupakan kamar dengan maksimal 2 tempat tidur per ruang, cocok bagi yang menginginkan privasi lebih dengan biaya terjangkau. (Draf — perlu dikonfirmasi ke pihak RS)",
    listFasilitas: [
      "AC",
      "Kamar mandi dalam",
      "Maksimal 2 tempat tidur per kamar",
      "Kursi penunggu pasien",
    ],
    foto: "/images/kamar/kamar-kelas-1.jpg",
  },
  {
    id: "kelas-2",
    label: "Kelas II",
    jumlah: 12,
    kelompok: "Rawat Inap",
    deskripsi: "Kamar bersama dengan fasilitas standar yang nyaman.",
    deskripsiLengkap:
      "Kelas II adalah kamar bersama dengan fasilitas standar yang nyaman, diisi beberapa tempat tidur per ruang. (Draf — perlu dikonfirmasi ke pihak RS)",
    listFasilitas: [
      "AC",
      "Kamar mandi dalam/luar (sesuai ruang)",
      "Beberapa tempat tidur per kamar",
    ],
    foto: "/images/kamar/kamar-kelas-2.jpg",
  },
  {
    id: "kelas-3",
    label: "Kelas III",
    jumlah: 77,
    kelompok: "Rawat Inap",
    deskripsi: "Kamar rawat inap dengan kapasitas terbesar, termasuk untuk peserta BPJS.",
    deskripsiLengkap:
      "Kelas III adalah kamar rawat inap dengan kapasitas terbesar di RS kami, termasuk yang dapat digunakan oleh peserta BPJS Kesehatan. (Draf — perlu dikonfirmasi ke pihak RS)",
    listFasilitas: [
      "Kipas angin / ventilasi ruangan",
      "Kamar mandi bersama",
      "Beberapa tempat tidur per kamar",
      "Dapat digunakan peserta BPJS Kesehatan",
    ],
    foto: "/images/kamar/kamar-kelas-3.jpg",
  },
  {
    id: "icu",
    label: "ICU (tanpa ventilator)",
    jumlah: 6,
    kelompok: "Intensif",
    deskripsi: "Perawatan intensif dengan pemantauan ketat 24 jam.",
    deskripsiLengkap:
      "ICU menyediakan perawatan intensif dengan pemantauan ketat 24 jam oleh tim medis terlatih untuk pasien dengan kondisi kritis. (Draf — perlu dikonfirmasi ke pihak RS)",
    listFasilitas: [
      "Monitor tanda vital 24 jam",
      "Rasio perawat-pasien intensif",
      "Akses cepat ke tim dokter jaga",
    ],
    foto: "/images/kamar/kamar-icu.jpg",
  },
  {
    id: "hcu",
    label: "HCU",
    jumlah: 2,
    kelompok: "Intensif",
    deskripsi: "Perawatan intensif tingkat menengah bagi pasien pasca-kritis.",
    deskripsiLengkap:
      "HCU (High Care Unit) memberikan perawatan intensif tingkat menengah bagi pasien pasca-kritis yang masih memerlukan pemantauan lebih dari kamar rawat inap biasa. (Draf — perlu dikonfirmasi ke pihak RS)",
    listFasilitas: ["Monitor tanda vital", "Pemantauan berkala oleh perawat"],
    foto: "/images/kamar/kamar-hcu.jpg",
  },
  {
    id: "nicu",
    label: "NICU (tanpa ventilator)",
    jumlah: 1,
    kelompok: "Intensif",
    deskripsi: "Perawatan intensif khusus bayi baru lahir.",
    deskripsiLengkap:
      "NICU (Neonatal Intensive Care Unit) menyediakan perawatan intensif khusus bayi baru lahir yang memerlukan penanganan medis khusus. (Draf — perlu dikonfirmasi ke pihak RS)",
    listFasilitas: ["Inkubator", "Monitor khusus neonatal", "Tim medis terlatih neonatologi"],
    foto: "/images/kamar/kamar-nicu.jpg",
  },
  {
    id: "picu",
    label: "PICU (tanpa ventilator)",
    jumlah: 1,
    kelompok: "Intensif",
    deskripsi: "Perawatan intensif khusus anak.",
    deskripsiLengkap:
      "PICU (Pediatric Intensive Care Unit) memberikan perawatan intensif khusus anak dengan kondisi kritis, didukung tim medis terlatih. (Draf — perlu dikonfirmasi ke pihak RS)",
    listFasilitas: ["Monitor tanda vital anak", "Tim medis terlatih kasus anak"],
    foto: "/images/kamar/kamar-picu.jpg",
  },
  {
    id: "isolasi",
    label: "Ruang Isolasi",
    jumlah: 10,
    kelompok: "Khusus",
    deskripsi: "Ruang perawatan terpisah untuk pasien dengan penyakit menular.",
    deskripsiLengkap:
      "Ruang Isolasi merupakan ruang perawatan terpisah untuk pasien dengan penyakit menular, guna mencegah penyebaran infeksi ke pasien lain. (Draf — perlu dikonfirmasi ke pihak RS)",
    listFasilitas: ["Ruang terpisah/tersekat", "Protokol pencegahan infeksi"],
    foto: "/images/kamar/kamar-isolasi.jpg",
  },
  {
    id: "perinatologi",
    label: "Perinatologi",
    jumlah: 6,
    kelompok: "Khusus",
    deskripsi: "Perawatan khusus bayi baru lahir yang memerlukan pemantauan.",
    deskripsiLengkap:
      "Ruang Perinatologi menyediakan perawatan khusus bayi baru lahir yang memerlukan pemantauan tambahan namun tidak dalam kondisi kritis. (Draf — perlu dikonfirmasi ke pihak RS)",
    listFasilitas: ["Boks bayi", "Pemantauan rutin oleh perawat/bidan"],
    foto: "/images/kamar/kamar-perinatologi.jpg",
  },
];

export const TOTAL_TEMPAT_TIDUR = TEMPAT_TIDUR.reduce(
  (total, item) => total + item.jumlah,
  0
);
