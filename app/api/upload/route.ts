import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import slugify from "slugify";
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
const MAKS_UKURAN_BYTES = 5 * 1024 * 1024; // 5MB

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) return unauthorized();

  const formData = await request.formData();
  const file = formData.get("file");
  const kategori = String(formData.get("kategori") ?? "");
  const namaData = String(formData.get("namaData") ?? "foto");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File tidak ditemukan." }, { status: 400 });
  }
  if (!KATEGORI_DIIZINKAN.includes(kategori)) {
    return NextResponse.json(
      { error: `Kategori tidak valid. Pilihan: ${KATEGORI_DIIZINKAN.join(", ")}` },
      { status: 400 }
    );
  }
  if (!TIPE_DIIZINKAN.includes(file.type)) {
    return NextResponse.json(
      { error: "Tipe file harus JPG, PNG, atau WEBP." },
      { status: 400 }
    );
  }
  if (file.size > MAKS_UKURAN_BYTES) {
    return NextResponse.json(
      { error: "Ukuran file maksimal 5MB." },
      { status: 400 }
    );
  }

  const ekstensi = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const slug = slugify(namaData, { lower: true, strict: true }) || "foto";
  const namaFile = `${slug}-${Date.now()}.${ekstensi}`;

  const folderTujuan = path.join(process.cwd(), "public", "images", kategori);
  await fs.mkdir(folderTujuan, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(folderTujuan, namaFile), buffer);

  return NextResponse.json({ path: `/images/${kategori}/${namaFile}` });
}
