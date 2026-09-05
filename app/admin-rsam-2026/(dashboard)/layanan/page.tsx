"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import ListInput from "@/components/admin/ListInput";
import { Field, TextInput, TextArea, Select, Checkbox } from "@/components/admin/FormField";

type Kategori = { id: string; judul: string };
type LayananItem = {
  id: string;
  nama: string;
  deskripsiLengkap: string;
  listFasilitas: string;
  jamOperasional: string | null;
  terkaitPoliklinik: boolean;
  gambar: string | null;
  kategoriId: string;
  kategori?: Kategori;
};

const KOSONG = {
  nama: "",
  deskripsiLengkap: "",
  listFasilitas: [] as string[],
  jamOperasional: "",
  terkaitPoliklinik: false,
  gambar: "" as string | null,
  kategoriId: "",
};

export default function AdminLayananPage() {
  const [items, setItems] = useState<LayananItem[]>([]);
  const [kategoriList, setKategoriList] = useState<Kategori[]>([]);
  const [loading, setLoading] = useState(true);
  const [formTerbuka, setFormTerbuka] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(KOSONG);
  const [hapusId, setHapusId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [menyimpan, setMenyimpan] = useState(false);

  async function muatData() {
    setLoading(true);
    const [resItem, resKategori] = await Promise.all([
      fetch("/api/layanan-item"),
      fetch("/api/layanan-kategori"),
    ]);
    setItems(await resItem.json());
    setKategoriList(await resKategori.json());
    setLoading(false);
  }

  useEffect(() => {
    muatData();
  }, []);

  function bukaTambah() {
    setEditId(null);
    setForm({ ...KOSONG, kategoriId: kategoriList[0]?.id ?? "" });
    setFormTerbuka(true);
    setError(null);
  }

  function bukaEdit(item: LayananItem) {
    setEditId(item.id);
    setForm({
      nama: item.nama,
      deskripsiLengkap: item.deskripsiLengkap,
      listFasilitas: JSON.parse(item.listFasilitas || "[]"),
      jamOperasional: item.jamOperasional ?? "",
      terkaitPoliklinik: item.terkaitPoliklinik,
      gambar: item.gambar,
      kategoriId: item.kategoriId,
    });
    setFormTerbuka(true);
    setError(null);
  }

  async function simpan(e: React.FormEvent) {
    e.preventDefault();
    setMenyimpan(true);
    setError(null);

    const method = editId ? "PUT" : "POST";
    const url = editId ? `/api/layanan-item/${editId}` : "/api/layanan-item";

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
    await fetch(`/api/layanan-item/${hapusId}`, { method: "DELETE" });
    setHapusId(null);
    await muatData();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Layanan & Fasilitas</h1>
          <p className="mt-1 text-sm text-gray-500">
            Kelola daftar layanan yang tampil di halaman Layanan & Fasilitas.
          </p>
        </div>
        <button
          onClick={bukaTambah}
          className="flex items-center gap-1.5 rounded-md bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600"
        >
          <Plus size={16} /> Tambah Layanan
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Nama Layanan</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Jam Operasional</th>
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
                <td className="px-4 py-3 font-medium text-gray-900">{item.nama}</td>
                <td className="px-4 py-3 text-gray-600">{item.kategori?.judul ?? "-"}</td>
                <td className="px-4 py-3 text-gray-600">{item.jamOperasional ?? "-"}</td>
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
              {editId ? "Edit Layanan" : "Tambah Layanan"}
            </h2>

            <Field label="Nama Layanan">
              <TextInput
                required
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
              />
            </Field>

            <Field label="Kategori">
              <Select
                required
                value={form.kategoriId}
                onChange={(e) => setForm({ ...form, kategoriId: e.target.value })}
              >
                {kategoriList.map((k) => (
                  <option key={k.id} value={k.id}>{k.judul}</option>
                ))}
              </Select>
            </Field>

            <Field label="Deskripsi Lengkap">
              <TextArea
                required
                rows={3}
                value={form.deskripsiLengkap}
                onChange={(e) => setForm({ ...form, deskripsiLengkap: e.target.value })}
              />
            </Field>

            <ListInput
              label="Yang Tersedia (opsional)"
              items={form.listFasilitas}
              onChange={(v) => setForm({ ...form, listFasilitas: v })}
            />

            <Field label="Jam Operasional (opsional)">
              <TextInput
                placeholder="mis. 24 Jam, atau Senin–Sabtu 08.00–20.00"
                value={form.jamOperasional}
                onChange={(e) => setForm({ ...form, jamOperasional: e.target.value })}
              />
            </Field>

            <Checkbox
              label='Tampilkan tombol "Lihat Jadwal Dokter" (untuk layanan terkait poliklinik)'
              checked={form.terkaitPoliklinik}
              onChange={(e) => setForm({ ...form, terkaitPoliklinik: e.target.checked })}
            />

            {/* Upload gambar sengaja disembunyikan dari form ini — jumlah item
                Layanan & Fasilitas terlalu banyak dan sebagian besar bukan
                sesuatu yang perlu difoto, jadi hasilnya tidak konsisten kalau
                dipaksakan. Field "gambar" di database & API TETAP ada (tidak
                dihapus), jadi kalau suatu saat mau diaktifkan lagi untuk item
                tertentu, tinggal munculkan kembali <ImageUploadField /> ini
                tanpa perlu migrasi ulang. */}

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

      <ConfirmDialog
        isOpen={!!hapusId}
        onConfirm={hapus}
        onCancel={() => setHapusId(null)}
      />
    </div>
  );
}
