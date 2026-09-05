"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { Field, TextInput, Select } from "@/components/admin/FormField";

const HARI_OPSI = [
  "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu",
  "Sesuai Jadwal Operasi", "Setiap Hari",
];

type Jadwal = { id?: string; hari: string; jam: string; status: string; keterangan: string };
type Dokter = {
  id: string;
  nama: string;
  gelar: string | null;
  spesialisasi: string;
  poliklinik: string;
  foto: string | null;
  tipe: string;
  jadwal: Jadwal[];
};

const KOSONG = {
  nama: "",
  gelar: "",
  spesialisasi: "",
  poliklinik: "",
  foto: "" as string | null,
  tipe: "spesialis",
  jadwal: [] as Jadwal[],
};

export default function AdminDokterPage() {
  const [items, setItems] = useState<Dokter[]>([]);
  const [loading, setLoading] = useState(true);
  const [formTerbuka, setFormTerbuka] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(KOSONG);
  const [hapusId, setHapusId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [menyimpan, setMenyimpan] = useState(false);

  async function muatData() {
    setLoading(true);
    const res = await fetch("/api/dokter");
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

  function bukaEdit(item: Dokter) {
    setEditId(item.id);
    setForm({
      nama: item.nama,
      gelar: item.gelar ?? "",
      spesialisasi: item.spesialisasi,
      poliklinik: item.poliklinik,
      foto: item.foto,
      tipe: item.tipe,
      jadwal: item.jadwal.map((j) => ({
        hari: j.hari,
        jam: j.jam,
        status: j.status,
        keterangan: j.keterangan ?? "",
      })),
    });
    setFormTerbuka(true);
    setError(null);
  }

  function tambahJadwal() {
    setForm({
      ...form,
      jadwal: [...form.jadwal, { hari: "Senin", jam: "", status: "normal", keterangan: "" }],
    });
  }

  function updateJadwal(idx: number, patch: Partial<Jadwal>) {
    const next = [...form.jadwal];
    next[idx] = { ...next[idx], ...patch };
    setForm({ ...form, jadwal: next });
  }

  function hapusJadwal(idx: number) {
    setForm({ ...form, jadwal: form.jadwal.filter((_, i) => i !== idx) });
  }

  async function simpan(e: React.FormEvent) {
    e.preventDefault();
    setMenyimpan(true);
    setError(null);

    const method = editId ? "PUT" : "POST";
    const url = editId ? `/api/dokter/${editId}` : "/api/dokter";

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
    await fetch(`/api/dokter/${hapusId}`, { method: "DELETE" });
    setHapusId(null);
    await muatData();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Dokter & Jadwal Praktik</h1>
          <p className="mt-1 text-sm text-gray-500">
            Kelola data dokter dan jadwal praktiknya. Set status &ldquo;Cuti&rdquo; untuk menyembunyikan jadwal tanpa hapus data.
          </p>
        </div>
        <button
          onClick={bukaTambah}
          className="flex items-center gap-1.5 rounded-md bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600"
        >
          <Plus size={16} /> Tambah Dokter
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Nama</th>
              <th className="px-4 py-3">Poliklinik</th>
              <th className="px-4 py-3">Jumlah Jadwal</th>
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
                <td className="px-4 py-3 font-medium text-gray-900">
                  {item.nama}{item.gelar ? `, ${item.gelar}` : ""}
                </td>
                <td className="px-4 py-3 text-gray-600">{item.poliklinik}</td>
                <td className="px-4 py-3 text-gray-600">
                  {item.jadwal.length}
                  {item.jadwal.some((j) => j.status === "cuti") && (
                    <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                      Ada cuti
                    </span>
                  )}
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
              {editId ? "Edit Dokter" : "Tambah Dokter"}
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Nama (dengan gelar dr./drg. di depan)">
                <TextInput
                  required
                  placeholder="dr. Ferry Gunawan"
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                />
              </Field>
              <Field label="Gelar (opsional)">
                <TextInput
                  placeholder="Sp.OG"
                  value={form.gelar}
                  onChange={(e) => setForm({ ...form, gelar: e.target.value })}
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Spesialisasi">
                <TextInput
                  required
                  placeholder="Obstetri & Ginekologi"
                  value={form.spesialisasi}
                  onChange={(e) => setForm({ ...form, spesialisasi: e.target.value })}
                />
              </Field>
              <Field label="Poliklinik">
                <TextInput
                  required
                  placeholder="Poliklinik Kandungan"
                  value={form.poliklinik}
                  onChange={(e) => setForm({ ...form, poliklinik: e.target.value })}
                />
              </Field>
            </div>

            <Field label="Tipe">
              <Select value={form.tipe} onChange={(e) => setForm({ ...form, tipe: e.target.value })}>
                <option value="spesialis">Dokter Spesialis</option>
                <option value="poli_umum">Dokter Jaga Poli Umum</option>
              </Select>
            </Field>

            <ImageUploadField
              label="Foto Dokter (opsional)"
              kategori="dokter"
              namaData={form.nama}
              value={form.foto}
              onChange={(path) => setForm({ ...form, foto: path })}
            />

            <div className="border-t border-gray-100 pt-4">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Jadwal Praktik</label>
                <button
                  type="button"
                  onClick={tambahJadwal}
                  className="flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700"
                >
                  <Plus size={14} /> Tambah Slot Jadwal
                </button>
              </div>

              <div className="space-y-3">
                {form.jadwal.map((j, idx) => (
                  <div key={idx} className="rounded-lg border border-gray-200 p-3">
                    <div className="grid grid-cols-2 gap-2">
                      <Select
                        value={j.hari}
                        onChange={(e) => updateJadwal(idx, { hari: e.target.value })}
                      >
                        {HARI_OPSI.map((h) => (
                          <option key={h} value={h}>{h}</option>
                        ))}
                      </Select>
                      <TextInput
                        placeholder="08.00–10.00 atau On-call"
                        value={j.jam}
                        onChange={(e) => updateJadwal(idx, { jam: e.target.value })}
                      />
                    </div>
                    <div className="mt-2 grid grid-cols-[auto,1fr,auto] items-start gap-2">
                      <Select
                        value={j.status}
                        onChange={(e) => updateJadwal(idx, { status: e.target.value })}
                      >
                        <option value="normal">Praktik Normal</option>
                        <option value="cuti">Cuti / Tidak Praktik Sementara</option>
                      </Select>
                      <TextInput
                        placeholder='Keterangan (opsional), mis. "Cuti hingga 25 Juli 2026"'
                        value={j.keterangan}
                        onChange={(e) => updateJadwal(idx, { keterangan: e.target.value })}
                      />
                      <button
                        type="button"
                        onClick={() => hapusJadwal(idx)}
                        className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 text-gray-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
                {form.jadwal.length === 0 && (
                  <p className="text-sm text-gray-400">Belum ada jadwal ditambahkan.</p>
                )}
              </div>
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
