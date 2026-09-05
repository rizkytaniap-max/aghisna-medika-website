import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getKategoriLayanan, getPengumumanAktif } from "@/lib/data";

export const revalidate = 0;

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [kategoriLayanan, pengumuman] = await Promise.all([
    getKategoriLayanan(),
    getPengumumanAktif(),
  ]);

  return (
    <>
      <a
        href="#konten-utama"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-navy-800 focus:px-4 focus:py-2 focus:text-white"
      >
        Lompat ke konten utama
      </a>
      <Navbar kategoriLayanan={kategoriLayanan} pengumuman={pengumuman} />
      <main id="konten-utama">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
