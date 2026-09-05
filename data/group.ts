export type AnggotaGroup = {
  id: string;
  nama: string;
  jenis: "Rumah Sakit" | "Perguruan Tinggi";
  logo: string;
};

// Logo grup (dipakai kalau nanti ditampilkan sebagai satu badge gabungan)
export const LOGO_GROUP = "/images/logo/logo-group-muhammadiyah-gombong.png";

export const MUHAMMADIYAH_GOMBONG_GROUP: AnggotaGroup[] = [
  {
    id: "pku-gombong",
    nama: "RS PKU Muhammadiyah Gombong",
    jenis: "Rumah Sakit",
    logo: "/images/logo/logo-pku-muhammadiyah-gombong.png",
  },
  {
    id: "pku-amanah-sumpiuh",
    nama: "RS PKU Muhammadiyah Amanah Sumpiuh",
    jenis: "Rumah Sakit",
    logo: "/images/logo/logo-pku-muhammadiyah-amanah-sumpiuh.png",
  },
  {
    id: "pku-aghisna-kroya",
    nama: "RS PKU Muhammadiyah Aghisna Kroya",
    jenis: "Rumah Sakit",
    logo: "/images/logo/logo-pku-muhammadiyah-aghisna-kroya.png",
  },
  {
    id: "aisyiyah-purworejo",
    nama: "RSU 'Aisyiyah Purworejo",
    jenis: "Rumah Sakit",
    logo: "/images/logo/logo-aisyiyah-purworejo.png",
  },
  {
    id: "unimugo",
    nama: "UNIMUGO — Universitas Muhammadiyah Gombong",
    jenis: "Perguruan Tinggi",
    logo: "/images/logo/logo-unimugo.png",
  },
];
