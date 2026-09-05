"use client";

import { useEffect, useState } from "react";
import { Megaphone } from "lucide-react";
import { Field, TextArea } from "@/components/admin/FormField";

type Pengumuman = { id: string; teks: string; aktif: boolean };

export default function AdminPengumumanPage() {
  const [data, setData] = useState<Pengumuman | null>(null);
  const [teks, setTeks] = useState("");
  const [aktif, setAktif] = useState(true);
  const [loading, setLoading] = useState(true);
  const [menyimpan, setMenyimpan] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sukses, setSukses] = useState(false);

  useEffect(() => {
    fetch("/api/pengumuman")
      .then((res) => res.json())
      .then((d: Pengumuman | null) => {
        if (d) {
          setData(d);
          setTeks(d.teks);
          setAktif(d.aktif);
        }
        setLoading(false);
      });
  }, []);

  async function simpan(e: React.FormEvent) {
    e.preventDefault();
    setMenyimpan(true);
    setError(null);
    setSukses(false);
    try {
      const res = await fetch("/api/pengumuman", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teks, aktif }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Gagal menyimpan.");
      }
      const updated = await res.json();
      setData(updated);
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
      <h1 className="text-xl font-semibold text-gray-900">Pengumuman</h1>
      <p className="mt-1 text-sm text-gray-500">
        Baris running text yang tampil di header paling atas semua halaman
        publik. Nonaktifkan untuk menyembunyikannya sepenuhnya.
      </p>

      {loading ? (
        <p className="mt-6 text-sm text-gray-400">Memuat...</p>
      ) : (
        <form
          onSubmit={simpan}
          className="mt-6 max-w-2xl space-y-5 rounded-xl border border-gray-200 bg-white p-6"
        >
          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
              <Megaphone size={18} />
            </span>
            <div>
              <p className="text-sm font-medium text-gray-900">Preview badge</p>
              <p className="text-xs text-gray-500">
                Badge hijau &ldquo;PENGUMUMAN&rdquo; tampil di kiri, teks di
                bawah ini berjalan otomatis (marquee) di sebelahnya.
              </p>
            </div>
          </div>

          <Field label="Teks Pengumuman">
            <TextArea
              required
              rows={4}
              value={teks}
              onChange={(e) => setTeks(e.target.value)}
              placeholder="Tulis isi pengumuman yang akan berjalan di header situs..."
            />
          </Field>

          <label className="flex items-center gap-2.5 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={aktif}
              onChange={(e) => setAktif(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            />
            Tampilkan di situs publik (aktif)
          </label>
          <p className="-mt-3 text-xs text-gray-400">
            Kalau dimatikan, seluruh baris pengumuman ini disembunyikan dari
            header — bukan cuma teksnya dikosongkan.
          </p>

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
              type="submit"
              disabled={menyimpan}
              className="rounded-md bg-teal-500 px-5 py-2 text-sm font-semibold text-white hover:bg-teal-600 disabled:opacity-60"
            >
              {menyimpan ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      )}

      {!loading && !data && (
        <p className="mt-4 text-xs text-gray-400">
          Belum ada pengumuman tersimpan — isi form di atas lalu klik Simpan
          untuk membuat pengumuman pertama.
        </p>
      )}
    </div>
  );
}
