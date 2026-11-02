import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import slugify from "slugify";
import { put } from "@vercel/blob";
import { requireAdminSession } from "@/lib/auth";
import { unauthorized } from "@/lib/api-helpers";

const KATEGORI_DIIZINKAN = [
  "dokter",
  "fasilitas",
  "kamar",
  "berita",
  "asuransi",
  "logo",
  "hero",
];

const TIPE_DIIZINKAN = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
// Vercel membatasi isi request fungsi serverless sekitar 4,5MB, jadi batas
// dibuat 4MB supaya selalu lolos dan errornya tampil jelas.
const MAKS_UKURAN_BYTES = 4 * 1024 * 1024;

function galat(pesan: string, status: number) {
  return NextResponse.json({ error: pesan }, { status });
}

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) return unauthorized();

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const kategori = String(formData.get("kategori") ?? "");
    const namaData = String(formData.get("namaData") ?? "foto");

    if (!(file instanceof File)) {
      return galat("File tidak ditemukan.", 400);
    }
    if (!KATEGORI_DIIZINKAN.includes(kategori)) {
      return galat(
        `Kategori tidak valid. Pilihan: ${KATEGORI_DIIZINKAN.join(", ")}`,
        400
      );
    }
    if (!TIPE_DIIZINKAN.includes(file.type)) {
      return galat("Tipe file harus JPG, PNG, atau WEBP.", 400);
    }
    if (file.size > MAKS_UKURAN_BYTES) {
      return galat("Ukuran file maksimal 4MB.", 400);
    }

    const ekstensi =
      file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    const slug = slugify(namaData, { lower: true, strict: true }) || "foto";
    const namaFile = `${slug}-${Date.now()}.${ekstensi}`;

    // Produksi (Vercel): simpan ke Vercel Blob. Token otomatis tersedia lewat
    // env BLOB_READ_WRITE_TOKEN setelah Blob store dihubungkan ke project.
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`${kategori}/${namaFile}`, file, {
        access: "public",
        contentType: file.type,
      });
      return NextResponse.json({ path: blob.url });
    }

    // Di Vercel tanpa token: disk tidak bisa ditulis, jadi beri pesan yang jelas.
    if (process.env.VERCEL) {
      return galat(
        "Penyimpanan foto belum dikonfigurasi (BLOB_READ_WRITE_TOKEN belum ada).",
        503
      );
    }

    // Pengembangan lokal: simpan ke folder public/images seperti sebelumnya.
    const folderTujuan = path.join(process.cwd(), "public", "images", kategori);
    await fs.mkdir(folderTujuan, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(path.join(folderTujuan, namaFile), buffer);
    return NextResponse.json({ path: `/images/${kategori}/${namaFile}` });
  } catch (err) {
    console.error("Upload gagal:", err);
    return galat("Upload gagal di server. Coba lagi atau hubungi pengembang.", 500);
  }
}
