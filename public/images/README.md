# Panduan Folder /public/images

Semua folder di sini sudah otomatis diisi **placeholder** (kotak warna + nama
file) oleh `scripts/generate-placeholder-images.js`, supaya situs tidak
pernah error karena foto belum ada. Untuk mengganti dengan foto asli:

1. Siapkan foto sesuai rasio yang disarankan di tabel masing-masing folder.
2. **Beri nama file PERSIS SAMA** seperti nama yang tercantum (termasuk huruf
   besar/kecil dan tanda hubung `-`).
3. Drag & drop / timpa file placeholder di folder yang sesuai.
4. Selesai — tidak perlu ubah kode apapun, situs otomatis pakai foto baru.

> Generator TIDAK akan pernah menimpa file yang sudah Anda ganti. Aman
> dijalankan ulang kapan saja: `npm run generate:images`

---

## 1. `/logo` — logo RS & logo group
Rasio landscape ~4:1 (640×160), kecuali disebutkan lain.

| File | Keterangan |
|---|---|
| `logo-rs-aghisna.png` | Logo utama RS (dipakai di Navbar) |
| `logo-rs-aghisna-white.png` | Versi putih, untuk latar gelap (Footer) |
| `logo-group-muhammadiyah-gombong.png` | Logo grup |
| `logo-pku-muhammadiyah-gombong.png` | Anggota grup |
| `logo-pku-muhammadiyah-amanah-sumpiuh.png` | Anggota grup |
| `logo-pku-muhammadiyah-aghisna-kroya.png` | Anggota grup |
| `logo-aisyiyah-purworejo.png` | Anggota grup |
| `logo-unimugo.png` | Anggota grup |
| `logo-akreditasi-paripurna.png` | Badge KARS Paripurna — 320×320 (persegi) |

## 2. `/hero` — foto besar untuk hero section
Rasio landscape lebar, minimal 1600×900.

| File | Keterangan |
|---|---|
| `hero-gedung-utama.jpg` | Foto gedung RS tampak depan (dipakai di Tentang Kami) |
| `hero-igd.jpg` | Foto area IGD (belum dipakai, siap untuk halaman IGD/darurat) |
| `hero-tim-medis.jpg` | Foto tim dokter/perawat (dipakai di Hero Beranda) |
| `hero-ambulans.jpg` | Foto ambulans RS (belum dipakai) |

## 3. `/dokter` — foto potret dokter
Rasio potret 3:4 (480×640). Semua nama file kebab-case berprefix `dokter-`.

27 dokter individual (sesuai urutan di `data/dokter.ts` — cari field `foto:`
untuk lihat nama lengkap tiap dokter) + 1 file tambahan untuk tim:
`dokter-tim-fisioterapi.jpg`.

## 4. `/fasilitas` — foto fasilitas RS
⚠️ **TIDAK dipakai di halaman manapun saat ini** (termasuk Beranda). Rasio
landscape 4:3 (800×600) kalau nanti dipakai. Data di `data/fasilitas.ts`
(belum ditampilkan di halaman manapun — siap dipakai untuk galeri fasilitas
kalau diminta nanti).

`fasilitas-igd`, `fasilitas-rawat-jalan`, `fasilitas-laboratorium`,
`fasilitas-radiologi`, `fasilitas-farmasi`, `fasilitas-icu`,
`fasilitas-ambulans`, `fasilitas-ruang-operasi`, `fasilitas-ruang-bersalin`,
`fasilitas-fisioterapi`, `fasilitas-medical-checkup` — semua `.jpg`.

## 5. `/kamar` — foto kamar rawat inap per kelas
⚠️ **TIDAK dipakai di halaman manapun saat ini.** Section "Fasilitas Rawat
Inap" di Beranda dan tabel kapasitas kamar di halaman Layanan & Fasilitas
sekarang tampil tanpa foto (pakai icon tempat tidur + aksen warna per
kelas). Rasio landscape 4:3 (800×600) kalau nanti dipakai. Data & label
lengkap tetap ada di `data/tempat-tidur.ts`.

`kamar-vvip`, `kamar-vip`, `kamar-kelas-1`, `kamar-kelas-2`, `kamar-kelas-3`,
`kamar-icu`, `kamar-hcu`, `kamar-nicu`, `kamar-picu`, `kamar-isolasi`,
`kamar-perinatologi` — semua `.jpg`.

## 6. `/berita` — thumbnail artikel kesehatan
Rasio landscape 16:9 (960×540). Data di `data/artikel.ts`.

`berita-thumbnail-1.jpg` s/d `berita-thumbnail-3.jpg` sudah dipakai oleh 3
artikel contoh saat ini. `berita-thumbnail-4.jpg` s/d `-6.jpg` disediakan
sebagai cadangan untuk artikel baru — tinggal tambah entri di
`data/artikel.ts` dan pakai salah satu path ini.

## 7. `/asuransi` — logo rekanan asuransi & BPJS
Ukuran fleksibel (kartu logo otomatis menyesuaikan, disarankan ~400×200).
Data di `data/asuransi-rekanan.ts`.

`bpjs-kesehatan.png`, `bpjs-ketenagakerjaan.png`, `jasa-raharja.png`,
`asuransi-mag.png`, `kai.png`, `higea.png`, `bca-life.png`, `bni-life.png`,
`bri-life.png`.

---

## Catatan teknis

- Placeholder dibuat oleh `scripts/generate-placeholder-images.js` — file
  PNG asli (bukan file kosong), jadi `<Image>` Next.js tidak akan pernah
  error meski foto asli belum dipasang.
- Untuk folder `dokter` dan `asuransi`, komponennya (`DoctorCard`,
  `PartnerLogoCard`) otomatis mendeteksi kalau file sudah diganti foto asli
  — tidak perlu ubah kode.
- Untuk folder `hero`, `kamar`, dan `berita`, path foto sudah langsung
  dirujuk di kode/data — mengganti file dengan nama yang sama otomatis
  mengganti tampilannya.
- Folder `logo` sudah disambungkan ke Navbar, Footer, `AccreditationSeal`
  (badge akreditasi), dan grid Muhammadiyah Gombong Group di Tentang Kami —
  cukup timpa file placeholder dengan logo asli, tampilan otomatis berubah.
