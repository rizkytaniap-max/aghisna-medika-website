"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import ListInput from "@/components/admin/ListInput";
import { Field, TextInput, TextArea, Select } from "@/components/admin/FormField";

type Lowongan = {
  id: string;
  posisi: string;
  kualifikasi: string;
  deskripsi: string;
  batasWaktu: string | null;
  status: string;
};

const KOSONG = {
  posisi: "",
  kualifikasi: [] as string[],
  deskripsi: "",
  batasWaktu: "",
  status: "dibuka",
};

export default function AdminKarirPage() {
  const [items, setItems] = useState<Lowongan[]>([]);
  const [loading, setLoading] = useState(true);
  const [formTerbuka, setFormTerbuka] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(KOSONG);
  const [hapusId, setHapusId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [menyimpan, setMenyimpan] = useState(false);

  async function muatData() {
    setLoading(true);
    const res = await fetch("/api/lowongan");
    setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    muatData();
  }, []);

  function bukaTambah() {
    setEditId(null);
    setForm(KOSONG);
    setFormTerbuka(true);
    setError(null);
  }

  function bukaEdit(item: Lowongan) {
    setEditId(item.id);
    setForm({
      posisi: item.posisi,
      kualifikasi: JSON.parse(item.kualifikasi || "[]"),
      deskripsi: item.deskripsi,
      batasWaktu: item.batasWaktu ? item.batasWaktu.slice(0, 10) : "",
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
    const url = editId ? `/api/lowongan/${editId}` : "/api/lowongan";

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
    await fetch(`/api/lowongan/${hapusId}`, { method: "DELETE" });
    setHapusId(null);
    await muatData();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Lowongan Karir</h1>
          <p className="mt-1 text-sm text-gray-500">
            Lowongan yang lewat batas waktu atau berstatus &ldquo;Ditutup&rdquo; otomatis tersembunyi di halaman publik.
          </p>
        </div>
        <button
          onClick={bukaTambah}
          className="flex items-center gap-1.5 rounded-md bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600"
        >
          <Plus size={16} /> Tambah Lowongan
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Posisi</th>
              <th className="px-4 py-3">Batas Waktu</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={4} className="px-4 py-6 text-center text-gray-400">Memuat...</td></tr>
            )}
            {!loading && items.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-6 text-center text-gray-400">Belum ada lowongan.</td></tr>
            )}
            {items.map((item) => (
              <tr key={item.id} className="border-t border-gray-100">
                <td className="px-4 py-3 font-medium text-gray-900">{item.posisi}</td>
                <td className="px-4 py-3 text-gray-600">
                  {item.batasWaktu ? new Date(item.batasWaktu).toLocaleDateString("id-ID") : "-"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      item.status === "dibuka"
                        ? "bg-teal-100 text-teal-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.status === "dibuka" ? "Dibuka" : "Ditutup"}
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
            className="max-h-[90vh] w-full max-w-lg space-y-4 overflow-y-auto rounded-xl bg-white p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              {editId ? "Edit Lowongan" : "Tambah Lowongan"}
            </h2>

            <Field label="Posisi / Jabatan">
              <TextInput
                required
                value={form.posisi}
                onChange={(e) => setForm({ ...form, posisi: e.target.value })}
              />
            </Field>

            <ListInput
              label="Kualifikasi"
              items={form.kualifikasi}
              onChange={(v) => setForm({ ...form, kualifikasi: v })}
              placeholder="mis. Minimal S1 Kedokteran"
            />

            <Field label="Deskripsi Tugas">
              <TextArea
                required
                rows={3}
                value={form.deskripsi}
                onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Batas Waktu Lamaran (opsional)">
                <TextInput
                  type="date"
                  value={form.batasWaktu}
                  onChange={(e) => setForm({ ...form, batasWaktu: e.target.value })}
                />
              </Field>
              <Field label="Status">
                <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option value="dibuka">Dibuka</option>
                  <option value="ditutup">Ditutup</option>
                </Select>
              </Field>
            </div>

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
