"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, Plus, Trash2 } from "lucide-react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { Field, TextInput, Select } from "@/components/admin/FormField";

type Asuransi = {
  id: string;
  nama: string;
  logo: string | null;
  kategori: string;
};

const KOSONG = {
  nama: "",
  logo: "" as string | null,
  kategori: "Asuransi Swasta",
};

export default function AdminAsuransiPage() {
  const [items, setItems] = useState<Asuransi[]>([]);
  const [loading, setLoading] = useState(true);
  const [formTerbuka, setFormTerbuka] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(KOSONG);
  const [hapusId, setHapusId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [menyimpan, setMenyimpan] = useState(false);

  async function muatData() {
    setLoading(true);
    const res = await fetch("/api/asuransi");
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

  function bukaEdit(item: Asuransi) {
    setEditId(item.id);
    setForm({ nama: item.nama, logo: item.logo, kategori: item.kategori });
    setFormTerbuka(true);
    setError(null);
  }

  async function simpan(e: React.FormEvent) {
    e.preventDefault();
    setMenyimpan(true);
    setError(null);

    const method = editId ? "PUT" : "POST";
    const url = editId ? `/api/asuransi/${editId}` : "/api/asuransi";

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
    await fetch(`/api/asuransi/${hapusId}`, { method: "DELETE" });
    setHapusId(null);
    await muatData();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Asuransi Rekanan</h1>
          <p className="mt-1 text-sm text-gray-500">
            Kelola daftar logo asuransi/BPJS di halaman Informasi Berobat.
          </p>
        </div>
        <button
          onClick={bukaTambah}
          className="flex items-center gap-1.5 rounded-md bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600"
        >
          <Plus size={16} /> Tambah Rekanan
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {loading && <p className="col-span-full text-center text-gray-400">Memuat...</p>}
        {!loading && items.length === 0 && (
          <p className="col-span-full text-center text-gray-400">Belum ada data.</p>
        )}
        {items.map((item) => (
          <div key={item.id} className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="relative mb-3 h-16 w-full">
              {item.logo ? (
                <Image src={item.logo} alt={item.nama} fill className="object-contain" unoptimized />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-gray-400">
                  Belum ada logo
                </div>
              )}
            </div>
            <p className="text-sm font-medium text-gray-900">{item.nama}</p>
            <p className="text-xs text-gray-500">{item.kategori}</p>
            <div className="mt-2 flex gap-2">
              <button onClick={() => bukaEdit(item)} className="text-teal-600 hover:text-teal-700">
                <Pencil size={15} />
              </button>
              <button onClick={() => setHapusId(item.id)} className="text-red-500 hover:text-red-600">
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {formTerbuka && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/50 p-4">
          <form
            onSubmit={simpan}
            className="max-h-[90vh] w-full max-w-md space-y-4 overflow-y-auto rounded-xl bg-white p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              {editId ? "Edit Rekanan" : "Tambah Rekanan"}
            </h2>

            <Field label="Nama Rekanan">
              <TextInput
                required
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
              />
            </Field>

            <Field label="Kategori">
              <Select
                value={form.kategori}
                onChange={(e) => setForm({ ...form, kategori: e.target.value })}
              >
                <option value="BPJS">BPJS</option>
                <option value="Asuransi Swasta">Asuransi Swasta</option>
                <option value="Korporat/Lainnya">Korporat/Lainnya</option>
              </Select>
            </Field>

            <ImageUploadField
              label="Logo"
              kategori="asuransi"
              namaData={form.nama}
              value={form.logo}
              onChange={(path) => setForm({ ...form, logo: path })}
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
