"use client";

import { useState } from "react";
import Image from "next/image";
import { UploadCloud, X } from "lucide-react";

const MAKS_UKURAN_MB = 4;
const TIPE_DIIZINKAN = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export default function ImageUploadField({
  label,
  kategori,
  namaData,
  value,
  onChange,
}: {
  label: string;
  kategori: "dokter" | "fasilitas" | "kamar" | "berita" | "asuransi" | "logo" | "hero";
  namaData: string;
  value: string | null;
  onChange: (path: string) => void;
}) {
  const [preview, setPreview] = useState<string | null>(value);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);

    if (!TIPE_DIIZINKAN.includes(file.type)) {
      setError("Tipe file harus JPG, PNG, atau WEBP.");
      return;
    }
    if (file.size > MAKS_UKURAN_MB * 1024 * 1024) {
      setError(`Ukuran file maksimal ${MAKS_UKURAN_MB}MB.`);
      return;
    }

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("kategori", kategori);
    formData.append("namaData", namaData || "foto");

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      // Balasan bisa kosong/bukan JSON kalau server error, jadi jangan langsung res.json().
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.path) {
        throw new Error(data?.error || `Upload gagal (kode ${res.status}).`);
      }
      onChange(data.path);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload gagal.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>

      {preview ? (
        <div className="relative inline-block">
          <div className="relative h-32 w-32 overflow-hidden rounded-lg border border-gray-300 bg-gray-50">
            <Image src={preview} alt="Preview" fill className="object-cover" unoptimized />
          </div>
          <button
            type="button"
            onClick={() => {
              setPreview(null);
              onChange("");
            }}
            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white shadow"
          >
            <X size={13} />
          </button>
        </div>
      ) : (
        <label className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-gray-300 text-gray-400 hover:border-teal-400 hover:text-teal-500">
          <UploadCloud size={22} />
          <span className="text-xs">Pilih Gambar</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </label>
      )}

      {uploading && <p className="mt-1.5 text-xs text-teal-600">Mengunggah...</p>}
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
      <p className="mt-1.5 text-xs text-gray-400">JPG/PNG/WEBP, maksimal {MAKS_UKURAN_MB}MB.</p>
    </div>
  );
}
