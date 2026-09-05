"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import ImageUploadField from "@/components/admin/ImageUploadField";
import ListInput from "@/components/admin/ListInput";
import { Field, TextInput, TextArea, Select } from "@/components/admin/FormField";

type Kamar = {
  id: string;
  label: string;
  jumlah: number;
  kelompok: string;
  deskripsi: string;
  deskripsiLengkap: string;
  listFasilitas: string;
  gambar: string | null;
};

const KOSONG = {
  label: "",
  jumlah: 0,
  kelompok: "Rawat Inap",
  deskripsi: "",
  deskripsiLengkap: "",
  listFasilitas: [] as string[],
  gambar: "" as string | null,
};

export default function AdminKamarPage() {
  const [items, setItems] = useState<Kamar[]>([]);
  const [loading, setLoading] = useState(true);
  const [formTerbuka, setFormTerbuka] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(KOSONG);
  const [hapusId, setHapusId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [menyimpan, setMenyimpan] = useState(false);

  async function muatData() {
    setLoading(true);
    const res = await fetch("/api/kamar");
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

  function bukaEdit(item: Kamar) {
    setEditId(item.id);
    setForm({
      label: item.label,
      jumlah: item.jumlah,
      kelompok: item.kelompok,
      deskripsi: item.deskripsi,
      deskripsiLengkap: item.deskripsiLengkap,
      listFasilitas: JSON.parse(item.listFasilitas || "[]"),
      gambar: item.gambar,
    });
    setFormTerbuka(true);
    setError(null);
  }

  async function simpan(e: React.FormEvent) {
    e.preventDefault();
    setMenyimpan(true);
    setError(null);

    const method = editId ? "PUT" : "POST";
    const url = editId ? `/api/kamar/${editId}` : "/api/kamar";

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
    await fetch(`/api/kamar/${hapusId}`, { method: "DELETE" });
    setHapusId(null);
    await muatData();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Kamar Rawat Inap</h1>
          <p className="mt-1 text-sm text-gray-500">
            Kelola kelas kamar & kapasitas tempat tidur.
          </p>
        </div>
        <button
          onClick={bukaTambah}
          className="flex items-center gap-1.5 rounded-md bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600"
        >
          <Plus size={16} /> Tambah Kelas Kamar
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Kelas</th>
              <th className="px-4 py-3">Kelompok</th>
              <th className="px-4 py-3">Tempat Tidur</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={4} className="px-4 py-6 text-center text-gray-400">Memuat...</td></tr>
            )}
            {!loading && items.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-6 text-center text-gray-400">Belum ada data.</td></tr>
            )}
            {items.map((item) => (
              <tr key={item.id} className="border-t border-gray-100">
                <td className="px-4 py-3 font-medium text-gray-900">{item.label}</td>
                <td className="px-4 py-3 text-gray-600">{item.kelompok}</td>
                <td className="px-4 py-3 text-gray-600">{item.jumlah}</td>
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
              {editId ? "Edit Kelas Kamar" : "Tambah Kelas Kamar"}
            </h2>

            <Field label="Nama Kelas">
              <TextInput
                required
                placeholder="mis. VVIP / Super VIP"
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Jumlah Tempat Tidur">
                <TextInput
                  required
                  type="number"
                  min={0}
                  value={form.jumlah}
                  onChange={(e) => setForm({ ...form, jumlah: Number(e.target.value) })}
                />
              </Field>
              <Field label="Kelompok">
                <Select
                  value={form.kelompok}
                  onChange={(e) => setForm({ ...form, kelompok: e.target.value })}
                >
                  <option value="Rawat Inap">Rawat Inap</option>
                  <option value="Intensif">Intensif</option>
                  <option value="Khusus">Khusus</option>
                </Select>
              </Field>
            </div>

            <Field label="Deskripsi Singkat (untuk kartu)">
              <TextInput
                required
                value={form.deskripsi}
                onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
              />
            </Field>

            <Field label="Deskripsi Lengkap (untuk modal detail)">
              <TextArea
                required
                rows={3}
                value={form.deskripsiLengkap}
                onChange={(e) => setForm({ ...form, deskripsiLengkap: e.target.value })}
              />
            </Field>

            <ListInput
              label="Fasilitas dalam Kamar"
              items={form.listFasilitas}
              onChange={(v) => setForm({ ...form, listFasilitas: v })}
            />

            <ImageUploadField
              label="Gambar (opsional)"
              kategori="kamar"
              namaData={form.label}
              value={form.gambar}
              onChange={(path) => setForm({ ...form, gambar: path })}
            />

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
