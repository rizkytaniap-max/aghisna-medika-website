"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import ImageUploadField from "@/components/admin/ImageUploadField";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { Field, TextInput, TextArea, Select } from "@/components/admin/FormField";

type Artikel = {
  id: string;
  judul: string;
  kategori: string;
  tanggal: string;
  ringkasan: string;
  konten: string;
  gambar: string | null;
  status: string;
};

const KOSONG = {
  judul: "",
  kategori: "",
  tanggal: new Date().toISOString().slice(0, 10),
  ringkasan: "",
  konten: "",
  gambar: "" as string | null,
  status: "draft",
};

export default function AdminBeritaPage() {
  const [items, setItems] = useState<Artikel[]>([]);
  const [loading, setLoading] = useState(true);
  const [formTerbuka, setFormTerbuka] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(KOSONG);
  const [hapusId, setHapusId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [menyimpan, setMenyimpan] = useState(false);

  async function muatData() {
    setLoading(true);
    const res = await fetch("/api/artikel");
    setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    muatData();
  }, []);

  function bukaTambah() {
    setEditId(null);
    setForm({ ...KOSONG, tanggal: new Date().toISOString().slice(0, 10) });
    setFormTerbuka(true);
    setError(null);
  }

  function bukaEdit(item: Artikel) {
    setEditId(item.id);
    setForm({
      judul: item.judul,
      kategori: item.kategori,
      tanggal: item.tanggal.slice(0, 10),
      ringkasan: item.ringkasan,
      konten: item.konten,
      gambar: item.gambar,
      status: item.status,
    });
    setFormTerbuka(true);
    setError(null);
  }

  async function simpan(e: React.FormEvent) {
    e.preventDefault();
    setMenyimpan(true);
    setError(null);

    const method = editId ? "PUT" : "POST";
    const url = editId ? `/api/artikel/${editId}` : "/api/artikel";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Gagal menyimpan.");
      }
      setFormTerbuka(false);
      await muatData();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal menyimpan.");
    } finally {
      setMenyimpan(false);
    }
  }

  async function hapus() {
    if (!hapusId) return;
    await fetch(`/api/artikel/${hapusId}`, { method: "DELETE" });
    setHapusId(null);
    await muatData();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Berita & Artikel Kesehatan</h1>
          <p className="mt-1 text-sm text-gray-500">
            Kelola artikel. Set status &ldquo;Draft&rdquo; untuk menyiapkan dulu sebelum tampil publik.
          </p>
        </div>
        <button
          onClick={bukaTambah}
          className="flex items-center gap-1.5 rounded-md bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600"
        >
          <Plus size={16} /> Tambah Artikel
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Judul</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Tanggal</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-400">Memuat...</td></tr>
            )}
            {!loading && items.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-400">Belum ada data.</td></tr>
            )}
            {items.map((item) => (
              <tr key={item.id} className="border-t border-gray-100">
                <td className="px-4 py-3 font-medium text-gray-900">{item.judul}</td>
                <td className="px-4 py-3 text-gray-600">{item.kategori}</td>
                <td className="px-4 py-3 text-gray-600">
                  {new Date(item.tanggal).toLocaleDateString("id-ID")}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      item.status === "published"
                        ? "bg-teal-100 text-teal-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.status === "published" ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => bukaEdit(item)} className="mr-2 text-teal-600 hover:text-teal-700">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => setHapusId(item.id)} className="text-red-500 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {formTerbuka && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/50 p-4">
          <form
            onSubmit={simpan}
            className="max-h-[90vh] w-full max-w-2xl space-y-4 overflow-y-auto rounded-xl bg-white p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              {editId ? "Edit Artikel" : "Tambah Artikel"}
            </h2>

            <Field label="Judul">
              <TextInput
                required
                value={form.judul}
                onChange={(e) => setForm({ ...form, judul: e.target.value })}
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Kategori">
                <TextInput
                  required
                  placeholder="mis. Gawat Darurat"
                  value={form.kategori}
                  onChange={(e) => setForm({ ...form, kategori: e.target.value })}
                />
              </Field>
              <Field label="Tanggal Publish">
                <TextInput
                  required
                  type="date"
                  value={form.tanggal}
                  onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
                />
              </Field>
            </div>

            <Field label="Ringkasan">
              <TextArea
                required
                rows={2}
                value={form.ringkasan}
                onChange={(e) => setForm({ ...form, ringkasan: e.target.value })}
              />
            </Field>

            <Field label="Isi Artikel">
              <RichTextEditor
                value={form.konten}
                onChange={(html) => setForm({ ...form, konten: html })}
              />
            </Field>

            <ImageUploadField
              label="Gambar Utama / Poster"
              kategori="berita"
              namaData={form.judul}
              value={form.gambar}
              onChange={(path) => setForm({ ...form, gambar: path })}
            />

            <Field label="Status">
              <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="draft">Draft (belum tampil publik)</option>
                <option value="published">Published (tampil di situs)</option>
              </Select>
            </Field>

            {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

            <div className="flex justify-end gap-2 border-t border-gray-100 pt-4">
              <button
                type="button"
                onClick={() => setFormTerbuka(false)}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={menyimpan}
                className="rounded-md bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600 disabled:opacity-60"
              >
                {menyimpan ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      )}

      <ConfirmDialog isOpen={!!hapusId} onConfirm={hapus} onCancel={() => setHapusId(null)} />
    </div>
  );
}
