import Hero from "@/components/beranda/Hero";
import StatsStrip from "@/components/beranda/StatsStrip";
import LayananGrid from "@/components/beranda/LayananGrid";
import JadwalHariIni from "@/components/beranda/JadwalHariIni";
import FasilitasKamar from "@/components/beranda/FasilitasKamar";
import ArtikelTerbaru from "@/components/beranda/ArtikelTerbaru";
import CtaPeta from "@/components/beranda/CtaPeta";
import InfoBerobatRingkas from "@/components/beranda/InfoBerobatRingkas";
import Reveal from "@/components/Reveal";
import { fotoTersedia } from "@/lib/foto";
import {
  getSemuaDokter,
  getKategoriLayanan,
  getKelasKamar,
  getArtikelPublished,
} from "@/lib/data";

export const revalidate = 0; // selalu ambil data terbaru dari database

export default async function BerandaPage() {
  const [semuaDokter, kategoriLayanan, kelasKamar, artikel] = await Promise.all([
    getSemuaDokter(),
    getKategoriLayanan(),
    getKelasKamar(),
    getArtikelPublished(),
  ]);

  // Dicek di server (bukan di JadwalHariIni yang client component) supaya
  // bisa akses filesystem — begitu foto asli ditaruh di
  // /public/images/dokter/, otomatis terpakai tanpa ubah kode.
  const dokterDenganStatusFoto = semuaDokter.map((dok) => ({
    ...dok,
    fotoAda: fotoTersedia(dok.foto ?? ""),
  }));
  const dokterSpesialis = dokterDenganStatusFoto.filter((d) => d.tipe === "spesialis");
  const dokterPoliUmum = dokterDenganStatusFoto.filter((d) => d.tipe === "poli_umum");

  // Sama seperti dokter: dicek di server supaya bisa akses filesystem.
  // Begitu foto asli diupload lewat Admin > Kamar Rawat Inap (atau ditaruh
  // manual dengan nama file yang PERSIS sama dengan yang tersimpan di
  // database), otomatis terpakai tanpa perlu ubah kode.
  const kelasKamarDenganFoto = kelasKamar.map((k) => ({
    ...k,
    gambarKonfirmasi: k.gambar && fotoTersedia(k.gambar) ? k.gambar : null,
  }));

  return (
    <>
      <Hero />
      <StatsStrip />
      <Reveal>
        <LayananGrid kategoriList={kategoriLayanan} />
      </Reveal>
      <Reveal>
        <JadwalHariIni dokterList={dokterSpesialis} poliUmumDokter={dokterPoliUmum} />
      </Reveal>
      <Reveal>
        <FasilitasKamar kamarList={kelasKamarDenganFoto} />
      </Reveal>
      <Reveal>
        <ArtikelTerbaru artikelList={artikel} />
      </Reveal>
      <Reveal>
        <InfoBerobatRingkas />
      </Reveal>
      <Reveal>
        <CtaPeta />
      </Reveal>
    </>
  );
}
