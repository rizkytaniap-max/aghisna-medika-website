"use client";

import { useEffect, useState } from "react";
import { ImageIcon } from "lucide-react";
import ImageUploadField from "@/components/admin/ImageUploadField";

export default function AdminPengaturanBerandaPage() {
  const [heroGambar, setHeroGambar] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [menyimpan, setMenyimpan] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sukses, setSukses] = useState(false);

  useEffect(() => {
    fetch("/api/pengaturan-beranda")
      .then((res) => res.json())
      .then((d: { heroGambar: string | null }) => {
        setHeroGambar(d.heroGambar);
        setLoading(false);
      });
  }, []);

  async function simpan() {
    setMenyimpan(true);
    setError(null);
    setSukses(false);
    try {
      const res = await fetch("/api/pengaturan-beranda", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heroGambar }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Gagal menyimpan.");
      }
      setSukses(true);
      setTimeout(() => setSukses(false), 3000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal menyimpan.");
    } finally {
      setMenyimpan(false);
    }
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900">Pengaturan Beranda</h1>
      <p className="mt-1 text-sm text-gray-500">
        Kelola foto besar di section Hero (paling atas halaman Beranda).
      </p>

      {loading ? (
        <p className="mt-6 text-sm text-gray-400">Memuat...</p>
      ) : (
        <div className="mt-6 max-w-2xl space-y-5 rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
              <ImageIcon size={18} />
            </span>
            <div>
              <p className="text-sm font-medium text-gray-900">Foto Hero</p>
              <p className="text-xs text-gray-500">
                Upload lewat sini — otomatis tersimpan ke folder dan
                database, tidak perlu drag & drop manual ke folder project.
              </p>
            </div>
          </div>

          <ImageUploadField
            label="Foto Hero (rasio potret disarankan, mis. 4:5)"
            kategori="hero"
            namaData="hero-beranda"
            value={heroGambar}
            onChange={(path) => setHeroGambar(path)}
          />

          {error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
          )}
          {sukses && (
            <p className="rounded-md bg-teal-50 px-3 py-2 text-sm text-teal-700">
              Tersimpan. Refresh situs publik untuk melihat perubahan.
            </p>
          )}

          <div className="flex justify-end border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={simpan}
              disabled={menyimpan}
              className="rounded-md bg-teal-500 px-5 py-2 text-sm font-semibold text-white hover:bg-teal-600 disabled:opacity-60"
            >
              {menyimpan ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
