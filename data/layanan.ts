export type LayananItem = {
  id: string;
  nama: string;
  deskripsiLengkap: string;
  listFasilitas?: string[]; // "Yang Tersedia"
  jamOperasional?: string;
  terkaitPoliklinik?: boolean; // tampilkan CTA "Lihat Jadwal Dokter"
};

export type KategoriLayanan = {
  id: string;
  judul: string;
  ikon:
    | "ambulance"
    | "stethoscope"
    | "flask-conical"
    | "bed-double"
    | "heart-pulse";
  ringkasan: string;
  item: LayananItem[];
};

export const KATEGORI_LAYANAN: KategoriLayanan[] = [
  {
    id: "gawat-darurat",
    judul: "Gawat Darurat",
    ikon: "ambulance",
    ringkasan: "Siap 24 jam, 7 hari, menangani kondisi darurat dewasa & anak.",
    item: [
      {
        id: "igd-24-jam",
        nama: "IGD 24 Jam & 7 Hari",
        deskripsiLengkap:
          "Instalasi Gawat Darurat kami siaga 24 jam setiap hari, ditangani dokter dan perawat terlatih untuk kondisi kegawatdaruratan medis dari yang ringan hingga kritis.",
        listFasilitas: [
          "Ruang tindakan & resusitasi",
          "Tim medis siaga 24 jam",
          "Ambulans siap antar-jemput pasien",
          "Akses langsung ke ICU/HCU bila diperlukan",
        ],
        jamOperasional: "24 Jam, 7 Hari Seminggu",
      },
      {
        id: "pelayanan-emergensi",
        nama: "Pelayanan Emergensi",
        deskripsiLengkap:
          "Penanganan cepat untuk kondisi darurat medis umum, termasuk stabilisasi awal sebelum pasien dirujuk atau dirawat lebih lanjut.",
        jamOperasional: "24 Jam, 7 Hari Seminggu",
      },
      {
        id: "emergensi-rawat-intensif-anak",
        nama: "Emergensi & Rawat Intensif Anak",
        deskripsiLengkap:
          "Layanan kegawatdaruratan khusus anak, didukung ruang PICU untuk perawatan intensif bagi anak dengan kondisi kritis.",
        listFasilitas: ["Ruang PICU", "Dokter jaga terlatih kasus anak"],
        jamOperasional: "24 Jam, 7 Hari Seminggu",
      },
    ],
  },
  {
    id: "poliklinik-spesialis",
    judul: "Poliklinik Spesialis",
    ikon: "stethoscope",
    ringkasan: "11 bidang spesialisasi untuk kebutuhan konsultasi & pengobatan.",
    item: [
      {
        id: "penyakit-dalam",
        nama: "Penyakit Dalam",
        deskripsiLengkap:
          "Konsultasi dan penanganan penyakit dalam seperti diabetes, hipertensi, gangguan pencernaan, dan penyakit kronis lainnya oleh dokter spesialis Penyakit Dalam.",
        terkaitPoliklinik: true,
      },
      {
        id: "kesehatan-anak",
        nama: "Kesehatan Anak",
        deskripsiLengkap:
          "Pemeriksaan tumbuh kembang, imunisasi, dan penanganan keluhan kesehatan anak oleh dokter spesialis Anak.",
        terkaitPoliklinik: true,
      },
      {
        id: "bedah",
        nama: "Bedah",
        deskripsiLengkap:
          "Konsultasi dan tindakan bedah umum, termasuk persiapan dan perawatan pasca-operasi oleh dokter spesialis Bedah.",
        terkaitPoliklinik: true,
      },
      {
        id: "obstetri-ginekologi",
        nama: "Obstetri & Ginekologi (Kandungan)",
        deskripsiLengkap:
          "Pemeriksaan kehamilan, persalinan, KB, hingga gangguan kandungan, ditangani dokter spesialis Obstetri & Ginekologi.",
        listFasilitas: ["USG kandungan", "Layanan persalinan 24 jam"],
        terkaitPoliklinik: true,
      },
      {
        id: "radiologi-poli",
        nama: "Radiologi",
        deskripsiLengkap:
          "Konsultasi hasil pencitraan medis (rontgen, USG, dan pemeriksaan penunjang lain) bersama dokter spesialis Radiologi.",
        terkaitPoliklinik: true,
      },
      {
        id: "kulit-kelamin",
        nama: "Kulit & Kelamin",
        deskripsiLengkap:
          "Penanganan masalah kulit, kelamin, hingga perawatan estetika dasar oleh dokter spesialis Kulit, Kelamin & Estetika.",
        terkaitPoliklinik: true,
      },
      {
        id: "tht-kl",
        nama: "THT-KL",
        deskripsiLengkap:
          "Pemeriksaan dan penanganan gangguan telinga, hidung, tenggorokan, kepala, dan leher oleh dokter spesialis THT-KL.",
        terkaitPoliklinik: true,
      },
      {
        id: "saraf-neurologi",
        nama: "Saraf / Neurologi",
        deskripsiLengkap:
          "Konsultasi dan penanganan gangguan saraf seperti stroke, sakit kepala kronis, dan kesemutan oleh dokter spesialis Saraf.",
        terkaitPoliklinik: true,
      },
      {
        id: "mata",
        nama: "Mata",
        deskripsiLengkap:
          "Pemeriksaan dan penanganan gangguan penglihatan serta kesehatan mata oleh dokter spesialis Mata.",
        terkaitPoliklinik: true,
      },
      {
        id: "jantung-pembuluh-darah",
        nama: "Jantung & Pembuluh Darah",
        deskripsiLengkap:
          "Konsultasi dan pemeriksaan jantung (termasuk EKG dan Ekokardiografi) oleh dokter spesialis Jantung & Pembuluh Darah.",
        listFasilitas: ["EKG", "Ekokardiografi"],
        terkaitPoliklinik: true,
      },
      {
        id: "anestesi",
        nama: "Anestesi",
        deskripsiLengkap:
          "Layanan anestesi untuk mendukung tindakan operasi dan persalinan, mengikuti jadwal tindakan (on-call).",
        jamOperasional: "Sesuai jadwal operasi (on-call)",
        terkaitPoliklinik: true,
      },
    ],
  },
  {
    id: "penunjang-medis",
    judul: "Penunjang Medis",
    ikon: "flask-conical",
    ringkasan: "Fasilitas diagnostik & penunjang lengkap dalam satu atap.",
    item: [
      {
        id: "laboratorium",
        nama: "Laboratorium / Patologi Klinik",
        deskripsiLengkap:
          "Pemeriksaan laboratorium lengkap untuk mendukung diagnosis dokter, mulai dari pemeriksaan darah rutin hingga kimia klinik.",
        listFasilitas: [
          "Pemeriksaan darah lengkap",
          "Pemeriksaan urine",
          "Kimia klinik",
          "Pemeriksaan penunjang lain sesuai rujukan dokter",
        ],
        terkaitPoliklinik: true,
      },
      {
        id: "radiologi-penunjang",
        nama: "Radiologi (USG, Ekokardiografi, EKG/EEG, Brain Mapping)",
        deskripsiLengkap:
          "Fasilitas pencitraan medis lengkap untuk mendukung diagnosis, mulai dari USG Color Doppler hingga EEG Brain Mapping.",
        listFasilitas: [
          "USG Color Doppler",
          "Rontgen Umum",
          "Rontgen Gigi Khusus (Panoramic)",
          "Ekokardiografi",
          "EKG",
          "EEG / Brain Mapping",
        ],
        terkaitPoliklinik: true,
      },
      {
        id: "bedah-sentral",
        nama: "Instalasi Bedah Sentral",
        deskripsiLengkap:
          "Instalasi Bedah Sentral dengan 2 ruang operasi (OK) — Bedah Umum dan Bedah Khusus — untuk mendukung tindakan operasi terjadwal maupun cito.",
        listFasilitas: ["Ruang OK Bedah Umum", "Ruang OK Bedah Khusus"],
      },
      {
        id: "farmasi",
        nama: "Farmasi",
        deskripsiLengkap:
          "Layanan penyediaan obat dengan Resep Elektronik, didukung apoteker profesional untuk memastikan ketepatan obat pasien.",
      },
      {
        id: "rehabilitasi-fisioterapi",
        nama: "Rehabilitasi Medik / Fisioterapi",
        deskripsiLengkap:
          "Layanan fisioterapi untuk pemulihan pasca-cedera, pasca-operasi, maupun terapi rutin sesuai anjuran dokter.",
        // BELUM DIUBAH — dokumen resmi 2026 menyebutkan jam "setiap hari,
        // 08.00–21.00", berbeda dari jam sistem saat ini
        // ("Senin–Sabtu, 08.00–20.00"). Perlu dikonfirmasi ke pihak RS
        // sebelum diubah.
        jamOperasional: "Senin–Sabtu, 08.00–20.00",
        terkaitPoliklinik: true,
      },
    ],
  },
  {
    id: "rawat-inap-intensif",
    judul: "Rawat Inap & Intensif",
    ikon: "bed-double",
    ringkasan: "138+ tempat tidur dari kelas VVIP hingga III, serta unit intensif.",
    item: [
      {
        id: "rawat-inap-vvip-3",
        nama: "Rawat Inap Kelas VVIP – III",
        deskripsiLengkap:
          "Pilihan kamar rawat inap dari VVIP hingga Kelas III, sesuai kebutuhan dan preferensi Anda. Lihat detail tiap kelas di section Fasilitas Rawat Inap.",
      },
      {
        id: "icu-layanan",
        nama: "ICU",
        deskripsiLengkap:
          "Perawatan intensif dengan pemantauan ketat 24 jam untuk pasien dengan kondisi kritis.",
      },
      {
        id: "hcu-layanan",
        nama: "HCU",
        deskripsiLengkap:
          "Perawatan intensif tingkat menengah bagi pasien pasca-kritis yang masih memerlukan pemantauan lebih dari kamar biasa.",
      },
      {
        id: "nicu-layanan",
        nama: "NICU",
        deskripsiLengkap:
          "Perawatan intensif khusus bayi baru lahir yang memerlukan penanganan medis khusus.",
      },
      {
        id: "picu-layanan",
        nama: "PICU",
        deskripsiLengkap:
          "Perawatan intensif khusus anak dengan kondisi kritis, didukung tim medis terlatih.",
      },
      {
        id: "perinatologi-layanan",
        nama: "Perinatologi",
        deskripsiLengkap:
          "Perawatan khusus bayi baru lahir yang memerlukan pemantauan tambahan namun tidak dalam kondisi kritis.",
      },
      {
        id: "ruang-isolasi-layanan",
        nama: "Ruang Isolasi",
        deskripsiLengkap:
          "Ruang perawatan terpisah untuk pasien dengan penyakit menular, guna mencegah penyebaran infeksi ke pasien lain.",
      },
    ],
  },
  {
    id: "layanan-lainnya",
    judul: "Layanan Lainnya",
    ikon: "heart-pulse",
    ringkasan: "Kemudahan tambahan untuk pengalaman berobat yang lebih baik.",
    item: [
      {
        id: "medical-check-up",
        nama: "Medical Check Up",
        deskripsiLengkap:
          "Paket pemeriksaan kesehatan menyeluruh untuk deteksi dini risiko penyakit, disarankan minimal setahun sekali.",
      },
      {
        id: "day-care",
        nama: "Day Care",
        deskripsiLengkap:
          "Layanan rawat singkat untuk tindakan medis tertentu yang tidak memerlukan rawat inap penuh.",
      },
      {
        id: "resep-elektronik",
        nama: "Resep Elektronik",
        deskripsiLengkap:
          "Resep obat dikelola secara digital untuk mempercepat proses pengambilan obat di Farmasi.",
      },
      {
        id: "jasa-pengantaran-obat",
        nama: "Jasa Pengantaran Obat",
        deskripsiLengkap:
          "Layanan antar obat bagi pasien yang membutuhkan kemudahan pengambilan resep tanpa perlu datang langsung ke Farmasi.",
      },
      {
        id: "ambulans-layanan",
        nama: "Ambulans",
        deskripsiLengkap:
          "Layanan ambulans untuk rujukan maupun kondisi darurat, siaga 24 jam.",
        jamOperasional: "24 Jam",
      },
      {
        id: "cssd-sterilisasi",
        nama: "CSSD / Sterilisasi",
        deskripsiLengkap:
          "Unit sterilisasi alat-alat medis untuk menjaga standar kebersihan dan keselamatan pasien.",
      },
      {
        id: "home-care",
        nama: "Home Care",
        deskripsiLengkap:
          "Layanan perawatan kesehatan di rumah pasien dalam radius tertentu, tersedia dengan perjanjian terlebih dahulu.",
      },
    ],
  },
];

export const LAYANAN_24_JAM: string[] = [
  "Rontgen",
  "Laboratorium",
  "Farmasi",
  "IGD / Ambulans",
  "Persalinan",
  "Bank Darah",
];
