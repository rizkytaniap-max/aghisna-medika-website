export type Fasilitas = {
  id: string;
  nama: string;
  foto: string; // path placeholder, ganti dengan foto asli di /public/images/fasilitas
};

// Sumber data fasilitas RSU Aghisna Medika Sidareja. Belum dipakai di
// halaman manapun saat ini — siap dipakai kalau nanti dibuat section
// "Galeri Fasilitas" (misalnya di halaman Layanan & Fasilitas atau Tentang Kami).
export const DAFTAR_FASILITAS: Fasilitas[] = [
  { id: "igd", nama: "Instalasi Gawat Darurat (IGD)", foto: "/images/fasilitas/fasilitas-igd.jpg" },
  { id: "rawat-jalan", nama: "Rawat Jalan / Poliklinik", foto: "/images/fasilitas/fasilitas-rawat-jalan.jpg" },
  { id: "laboratorium", nama: "Laboratorium / Patologi Klinik", foto: "/images/fasilitas/fasilitas-laboratorium.jpg" },
  { id: "radiologi", nama: "Radiologi", foto: "/images/fasilitas/fasilitas-radiologi.jpg" },
  { id: "farmasi", nama: "Farmasi", foto: "/images/fasilitas/fasilitas-farmasi.jpg" },
  { id: "icu", nama: "ICU", foto: "/images/fasilitas/fasilitas-icu.jpg" },
  { id: "ambulans", nama: "Ambulans", foto: "/images/fasilitas/fasilitas-ambulans.jpg" },
  { id: "ruang-operasi", nama: "Ruang Operasi", foto: "/images/fasilitas/fasilitas-ruang-operasi.jpg" },
  { id: "ruang-bersalin", nama: "Ruang Bersalin", foto: "/images/fasilitas/fasilitas-ruang-bersalin.jpg" },
  { id: "fisioterapi", nama: "Fisioterapi", foto: "/images/fasilitas/fasilitas-fisioterapi.jpg" },
  { id: "medical-checkup", nama: "Medical Check Up", foto: "/images/fasilitas/fasilitas-medical-checkup.jpg" },
  { id: "bedah-sentral", nama: "Instalasi Bedah Sentral", foto: "/images/fasilitas/fasilitas-bedah-sentral.jpg" },
  { id: "poliklinik-gigi", nama: "Poliklinik Gigi", foto: "/images/fasilitas/fasilitas-poliklinik-gigi.jpg" },
  { id: "home-care", nama: "Home Care", foto: "/images/fasilitas/fasilitas-home-care.jpg" },
];
