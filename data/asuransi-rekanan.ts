export type RekananAsuransi = {
  nama: string;
  logo: string; // path ke /public/images/asuransi/ — ganti dengan logo asli nanti
  kategori: "BPJS" | "Asuransi Swasta" | "Korporat/Lainnya";
  sejak?: number; // tahun mulai kerjasama, sesuai SK Direktur 008/SK/RSU-AMS/IV/2026
};

// Sumber data tunggal untuk grid "Daftar Asuransi Rekanan" di halaman
// Informasi Berobat. Tambah/kurangi rekanan cukup edit array ini.
//
// CATATAN — BNI LIFE: rekanan ini ADA di data lama sistem, tapi TIDAK
// disebutkan di dokumen resmi "Profil RSU Aghisna Medika Sidareja Tahun
// 2026". TIDAK dihapus di sini — perlu dikonfirmasi manual ke pihak RS
// apakah kerjasama masih berjalan (mungkin memang masih aktif tapi tidak
// tercantum di dokumen ini, atau mungkin sudah berakhir).
export const ASURANSI_REKANAN: RekananAsuransi[] = [
  {
    nama: "BPJS Ketenagakerjaan",
    logo: "/images/asuransi/bpjs-ketenagakerjaan.png",
    kategori: "BPJS",
    sejak: 2019,
  },
  {
    nama: "Jasa Raharja",
    logo: "/images/asuransi/jasa-raharja.png",
    kategori: "Korporat/Lainnya",
    sejak: 2019,
  },
  {
    nama: "BPJS Kesehatan",
    logo: "/images/asuransi/bpjs-kesehatan.png",
    kategori: "BPJS",
    sejak: 2021,
  },
  {
    nama: "PT Kereta Api Indonesia (Persero)",
    logo: "/images/asuransi/kai.png",
    kategori: "Korporat/Lainnya",
    sejak: 2022,
  },
  {
    nama: "HIGEA (Health Insurance Platform)",
    logo: "/images/asuransi/higea.png",
    kategori: "Asuransi Swasta",
    sejak: 2025,
  },
  {
    nama: "BCA Life",
    logo: "/images/asuransi/bca-life.png",
    kategori: "Asuransi Swasta",
    sejak: 2025,
  },
  {
    nama: "Asuransi MAG (A Fairfax Company)",
    logo: "/images/asuransi/asuransi-mag.png",
    kategori: "Asuransi Swasta",
    sejak: 2025,
  },
  {
    nama: "Asuransi PAMA PERSADA",
    logo: "/images/asuransi/pama-persada.png",
    kategori: "Korporat/Lainnya",
    sejak: 2026,
  },
  // Belum disebut di dokumen resmi 2026 — perlu konfirmasi manual ke pihak RS.
  {
    nama: "BNI Life",
    logo: "/images/asuransi/bni-life.png",
    kategori: "Asuransi Swasta",
  },
  {
    nama: "BRI Life",
    logo: "/images/asuransi/bri-life.png",
    kategori: "Asuransi Swasta",
  },
];
