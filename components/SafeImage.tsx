import Image, { type ImageProps } from "next/image";
import { ImageOff } from "lucide-react";
import { fotoTersedia } from "@/lib/foto";

type SafeImageProps = Omit<ImageProps, "src"> & { src: string };

/**
 * Pengganti drop-in untuk next/image <Image fill ... /> khusus untuk foto
 * LOKAL (path /images/...). Server Component — cek fs.existsSync dulu:
 * - Kalau file beneran ada -> render <Image> seperti biasa.
 * - Kalau TIDAK ada (nama file salah ketik, belum diganti, dll) -> tampilkan
 *   kotak abu-abu jelas bertuliskan "Foto belum tersedia" alih-alih blank
 *   kosong tanpa penjelasan.
 *
 * Hanya untuk foto lokal di /public — jangan dipakai untuk URL eksternal
 * (mis. Unsplash), fs.existsSync tidak berlaku untuk itu.
 */
export default function SafeImage({ src, alt, className, ...props }: SafeImageProps) {
  const ada = fotoTersedia(src);

  if (!ada) {
    return (
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-mist-200 text-ink-faint ${className ?? ""}`}
      >
        <ImageOff size={20} />
        <span className="px-2 text-center text-[11px] font-medium leading-tight">
          Foto belum tersedia
        </span>
      </div>
    );
  }

  return <Image src={src} alt={alt} className={className} {...props} />;
}
