import fs from "node:fs";
import path from "node:path";

/**
 * Cek apakah sebuah file di /public sudah benar-benar ada (bukan cuma
 * path placeholder di data). HANYA boleh dipakai di Server Component
 * (mengandalkan Node.js fs) — jangan import di file "use client".
 */
export function fotoTersedia(publicPath: string): boolean {
  // Foto yang diunggah lewat panel admin disimpan di Vercel Blob dan
  // alamatnya berupa URL lengkap (https://...), bukan file di /public.
  if (/^https?:\/\//i.test(publicPath)) return true;
  try {
    const absolute = path.join(process.cwd(), "public", publicPath);
    return fs.existsSync(absolute);
  } catch {
    return false;
  }
}
