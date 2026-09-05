export const RUMAH_SAKIT = {
  nama: "RSU Aghisna Medika Sidareja",
  namaSingkat: "RSU Aghisna Medika",
  tagline: "Melayani dengan Cepat, Akurat dan Profesional",
  alamat:
    "Jl. Jenderal Sudirman No. 1, Sidamulya, Kecamatan Sidareja, Kabupaten Cilacap, Jawa Tengah 53261",
  jenis: "Rumah Sakit Umum",
  kelas: "D",
  kepemilikan: "Swasta",
  pemilik: "PT. Aghisna Centra Medica",
  direkturUtama: "Muslimah, S.E., M.M.",
  direktur: "H. Darsino, S.Kep., Ns., MARS",
  mulaiOperasional: "15 Juni 2019 (Soft Opening)",
  luasTanah: "3.550 m²",
  luasBangunan: "7.703 m²",
  akreditasi: "Terakreditasi Paripurna",
  logo: {
    utama: "/images/logo/logo-rs-aghisna.png",
    utamaPutih: "/images/logo/logo-rs-aghisna-white.png",
    badgeAkreditasi: "/images/logo/logo-akreditasi-paripurna.png",
  },
  email: "rsaghisna.sidareja@gmail.com",
  totalTempatTidur: 138,
  kontak: {
    teleponUtama: "0822-6525-0744",
    teleponIgdKantor: "(0280) 5264266",
    waPendaftaran: "6282265250744",
    waIgd: "6282265250743",
    waHumas: "6289619235016",
    waCs: "6281236883111",
    // Dikonfirmasi ulang sesuai SK Direktur 008/SK/RSU-AMS/IV/2026:
    // Telepon (0280) 5264266, WA 0822-6525-0743 / 0822-6525-0744 — cocok dengan data di atas.
    instagram: "https://instagram.com/aghisnamedikasidareja",
    facebook: "https://facebook.com/rsuaghisnamedika.sidareja",
  },
  maps: {
    embedQuery:
      "Jalan Jenderal Sudirman Nomor 1, Sidareja, Cilacap, Jawa Tengah",
  },
} as const;

export function waLink(nomor: string, pesan?: string) {
  const base = `https://wa.me/${nomor}`;
  return pesan ? `${base}?text=${encodeURIComponent(pesan)}` : base;
}
