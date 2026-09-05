# RSU Aghisna Medika Sidareja — Website + Admin Panel

Next.js 14 (App Router) + TypeScript + TailwindCSS + **Prisma/PostgreSQL** +
**Admin Panel** untuk mengelola konten tanpa perlu sentuh kode.

## 🚀 Setup Awal / Getting Started (dari nol, sekali saja)

Situs ini **butuh database PostgreSQL hosted** (bukan lagi konten statis
di `/data/*.ts`, dan bukan lagi file SQLite lokal — lihat penjelasan di
bagian "Kenapa PostgreSQL, bukan SQLite?" di bawah kalau penasaran).
Ikuti urutan ini **persis**, jangan ada yang dilewati:

### 1. Buat database PostgreSQL gratis (pilih salah satu)

**Opsi A — Neon (neon.tech), direkomendasikan:**
1. Buka https://neon.tech, daftar/login (bisa pakai akun GitHub)
2. Klik **Create a project**, kasih nama bebas (mis. `aghisna-medika`)
3. Setelah project dibuat, cari tombol **Connection String** / **Connect**
   di dashboard-nya
4. Pastikan formatnya **"Pooled connection"** (bukan direct), copy
   connection string-nya — bentuknya seperti:
   ```
   postgresql://user:password@ep-xxxx-pooler.region.aws.neon.tech/dbname?sslmode=require
   ```

**Opsi B — Vercel Postgres (terintegrasi langsung di dashboard Vercel):**
1. Buka dashboard project Vercel Anda → tab **Storage** → **Create Database** → pilih **Postgres**
2. Ikuti wizard-nya (pilih region terdekat, mis. Singapore)
3. Setelah dibuat, buka tab **.env.local** di halaman database itu, copy
   nilai `POSTGRES_PRISMA_URL` atau `DATABASE_URL`-nya

Simpan connection string itu, dipakai di langkah 3.

### 2. Install dependency

```bash
npm install
```

### 3. Buat file `.env`

File `.env` **tidak ikut di-share/di-commit** (demi keamanan password Anda),
jadi harus dibuat manual tiap kali clone/download project ini di komputer
baru. Salin dari template-nya:

```bash
cp .env.example .env
```

Lalu buka file `.env` yang baru dibuat, isi 4 baris ini (connection string
dari langkah 1 tadi):
```
DATABASE_URL="postgresql://user:password@host/db?sslmode=require"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="isi-password-kuat-anda-sendiri"
SESSION_SECRET="isi-string-acak-panjang"
```
Untuk `SESSION_SECRET`, generate string acak dengan perintah ini lalu
salin hasilnya ke `.env`:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

> Kalau muncul error **"DATABASE_URL tidak ditemukan"** kapan pun nanti
> (baik saat `npx prisma ...` maupun saat `npm run dev`), itu tandanya
> langkah ini terlewat atau file `.env` tidak ada di root project (sejajar
> dengan `package.json`). Ulangi langkah 3 di atas.

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Buat struktur tabel di database

Jalankan sekali di awal, atau setiap kali `prisma/schema.prisma` diubah:
```bash
npx prisma migrate dev --name init
```
Ini akan membuat tabel-tabel di database Postgres Anda (Neon/Vercel
Postgres) — bukan lagi bikin file `.db` lokal seperti sebelumnya.

### 6. Isi database dengan data awal + buat akun admin

```bash
npx prisma db seed
```
Ini mengisi database dengan konten yang sudah ada di `/data/*.ts`, **dan**
membuat akun admin dari `ADMIN_USERNAME`/`ADMIN_PASSWORD` di `.env` Anda.
Kalau output-nya bilang *"ADMIN_USERNAME / ADMIN_PASSWORD belum diisi"*,
berarti `.env` Anda belum lengkap — kembali ke langkah 3.

### 7. Jalankan

```bash
npm run dev
```

Buka http://localhost:3000 (situs publik) dan
http://localhost:3000/admin-rsam-2026/login (panel admin, login pakai
`ADMIN_USERNAME`/`ADMIN_PASSWORD` yang Anda isi sendiri di `.env`).

> **Catatan dari proses pembuatan**: Prisma versi terbaru (7.x) mengubah
> total cara konfigurasi database (skema lama tidak kompatibel lagi) —
> karena itu, `prisma` dan `@prisma/client` di `package.json` sudah
> **dikunci ke versi 6.19.3** (versi stabil terakhir sebelum perubahan
> besar itu). Jangan hapus angka versinya jadi `^7.x.x` lagi.
>
> Prisma juga butuh download "engine" sekali dari internet saat
> `npm install` / `prisma generate` pertama kali. Di sandbox tempat saya
> membangun ini, domain tersebut (`binaries.prisma.sh`) diblokir jaringan
> sandbox-nya — jadi saya tidak bisa konek ke database sungguhan di sana.
> Tapi saya berhasil memverifikasi **seluruh kode** sejauh mungkin:
> `tsc --noEmit` lolos 100% tanpa error, dan `next build` berhasil compile
> + lolos pengecekan tipe penuh, cuma berhenti di langkah yang butuh
> koneksi database sungguhan (wajar, karena memang belum ada database
> sungguhan yang bisa diakses dari sandbox itu). Di komputer Anda dengan
> internet normal + `DATABASE_URL` yang benar, semua langkah di atas
> seharusnya berjalan lancar. Kalau ada error yang tidak terduga,
> screenshot pesan errornya dan tunjukkan ke saya.

### Kenapa PostgreSQL, bukan SQLite?

Versi awal project ini pakai SQLite (file `.db` lokal) karena simpel dan
tidak butuh setup server terpisah. Tapi Vercel (hosting yang dipakai)
bersifat **serverless** — tiap kali ada permintaan ke situs, kodenya
dijalankan di "fungsi" sementara yang **tidak punya penyimpanan
permanen**. File SQLite yang dibuat/diubah di situ akan hilang begitu
fungsinya selesai — makanya sebelumnya sempat muncul error *"table does
not exist"* di production.

PostgreSQL hosted (Neon/Vercel Postgres) itu **server database yang
selalu menyala secara terpisah**, jadi bisa diakses dari mana saja —
dari komputer Anda saat development, maupun dari fungsi serverless
Vercel saat production — datanya selalu ada, tersimpan permanen, tidak
peduli berapa kali server di-restart. Ini yang bikin admin panel sekarang
benar-benar berfungsi di situs yang sudah online, bukan cuma di
`localhost`.

### Deploy ke Production (Vercel)

**A. Setup Environment Variables di Vercel (sekali saja)**

File `.env` **tidak pernah ikut ter-push ke GitHub** (memang sengaja, demi
keamanan), jadi Vercel tidak otomatis tahu isinya. Anda perlu isi manual:

1. Buka project Anda di dashboard Vercel → **Settings** → **Environment Variables**
2. Tambahkan 4 variable ini (nilainya **sama persis** dengan `.env` di
   komputer Anda — pakai database Postgres yang **sama** dengan yang
   dipakai lokal, supaya data yang sudah Anda isi/seed tidak perlu
   diulang):
   ```
   DATABASE_URL     = (connection string Postgres yang sama dengan .env lokal)
   ADMIN_USERNAME   = admin
   ADMIN_PASSWORD   = (password admin Anda)
   SESSION_SECRET   = (string acak yang sama dengan di .env lokal)
   ```
3. Klik **Save**

**B. Push ke GitHub**

```bash
git add .
git commit -m "migrasi ke PostgreSQL"
git push
```

**C. Redeploy**

Vercel otomatis mendeteksi push baru dan build ulang. Karena script
`build` sekarang menjalankan `prisma migrate deploy` dulu sebelum
`next build`, tabel-tabel database akan otomatis ter-update mengikuti
`prisma/schema.prisma` setiap kali deploy — Anda **tidak perlu** jalankan
migrate manual lagi untuk production.

> `prisma migrate deploy` beda dari `prisma migrate dev` yang dipakai di
> lokal — versi `deploy` khusus untuk otomasi (CI/CD), tidak akan minta
> konfirmasi interaktif apapun, aman dijalankan otomatis oleh Vercel.

**D. Selesai — admin panel sekarang berfungsi penuh di situs online**

Karena database-nya sama-sama nyambung ke Postgres yang sama (lokal
maupun production memakai `DATABASE_URL` yang sama persis), Anda sekarang
bisa edit data **langsung dari admin panel di URL Vercel** (tidak perlu
lagi selalu edit dari `localhost` seperti alur sebelumnya) — perubahan
akan langsung tersimpan permanen dan tampil di situs publik.

### Menjalankan proyek (setelah database di-setup)

```bash
npm run dev
```

## Panel Admin

URL: **`/admin-rsam-2026`** (tidak muncul di Navbar/Footer/sitemap manapun,
dan `robots.txt` sudah men-disallow supaya tidak terindex Google).

- Login: `/admin-rsam-2026/login`
- Semua halaman lain di bawah `/admin-rsam-2026/*` otomatis redirect ke
  login kalau belum login (session cookie JWT, berlaku 8 jam).
- **Cara ganti path `/admin-rsam-2026` ke path lain**: cari-ganti string
  `admin-rsam-2026` di 3 tempat: (1) nama folder `app/admin-rsam-2026`,
  (2) `middleware.ts` (konstanta `ADMIN_BASE`), (3) `app/robots.ts`. Rename
  folder lewat File Explorer/VS Code, lalu edit 2 file itu.

Menu yang tersedia setelah login:
1. **Layanan & Fasilitas** — CRUD item layanan (nama, kategori, deskripsi,
   list fasilitas, jam operasional, upload gambar)
2. **Kamar Rawat Inap** — CRUD kelas kamar (label, kapasitas TT, deskripsi,
   fasilitas, upload gambar)
3. **Dokter & Jadwal** — CRUD dokter + jadwal praktik (multi-slot per
   dokter). Set status **"Cuti / Tidak Praktik Sementara"** per slot jadwal
   untuk menyembunyikannya dari halaman publik tanpa menghapus datanya.
4. **Berita & Artikel** — CRUD artikel dengan rich text editor (Tiptap:
   bold/italic/heading/list/link), upload gambar poster, toggle
   Draft/Published.
5. **Lowongan Karir** — CRUD lowongan (posisi, kualifikasi, batas waktu,
   status). Lowongan yang lewat batas waktu atau berstatus "Ditutup"
   otomatis tersembunyi di halaman publik `/karir`.
6. **Asuransi Rekanan** — CRUD logo rekanan asuransi/BPJS.
7. **Pengumuman** — atur teks & aktif/nonaktif baris running text (marquee)
   di header paling atas semua halaman publik.

Sidebar admin bisa **di-collapse jadi mode ikon saja** (tombol panah di
tepi kanan sidebar) — lebih leluasa saat kelola tabel data yang lebar.
Preferensi collapsed/expanded tersimpan di browser masing-masing
(localStorage), tidak reset tiap refresh.

Semua form upload gambar: validasi tipe (JPG/PNG/WEBP) & ukuran maksimal
5MB, preview sebelum simpan, otomatis tersimpan ke
`/public/images/[kategori]/` dengan nama file slug+timestamp (tidak akan
bentrok nama).

## Struktur database (Prisma)

Skema lengkap ada di `prisma/schema.prisma`. Ringkasan tabel:

```
AdminUser          → 1 akun admin (username + password ter-hash)
KategoriLayanan    → 5 kategori layanan (Gawat Darurat, Poliklinik Spesialis, dst.)
  └─ LayananItem   → item layanan individual di dalam tiap kategori
KelasKamar         → kelas kamar rawat inap (VVIP, VIP, ICU, dst.)
Dokter             → data dokter (spesialis maupun dokter jaga Poli Umum)
  └─ JadwalPraktik → jadwal per dokter (hari, jam, status normal/cuti, keterangan)
Artikel            → berita & artikel kesehatan (draft/published)
Lowongan           → lowongan karir (dibuka/ditutup, batas waktu)
AsuransiRekanan    → logo rekanan asuransi/BPJS
Pengumuman         → satu baris teks running-text header (aktif/nonaktif)
```

Field berbentuk daftar (list fasilitas, kualifikasi) disimpan sebagai
JSON string di kolom `String` (bukan tipe array/JSON native Postgres —
sengaja dibuat begini sejak awal biar skemanya tetap sama walau provider
database berubah) — di-parse otomatis oleh `lib/data.ts` sebelum dipakai
halaman publik.

### Perintah database yang sering dipakai

```bash
npx prisma studio          # buka GUI untuk lihat/edit isi database langsung
npx prisma migrate dev     # setelah edit schema.prisma, buat migration baru
npx prisma db seed         # jalankan ulang seed (aman, pakai upsert)
```

### File `/data/*.ts` — sekarang HANYA untuk seed awal

File-file lama (`dokter.ts`, `layanan.ts`, `tempat-tidur.ts`, `artikel.ts`,
`asuransi-rekanan.ts`) **tetap ada** tapi sekarang **hanya dipakai oleh
`prisma/seed.ts`** sebagai data awal saat setup database pertama kali.
Semua halaman publik sekarang membaca dari database (lewat `lib/data.ts`),
**bukan** dari file-file ini lagi. Untuk mengubah konten setelah situs
berjalan, gunakan panel admin — bukan edit file `.ts` ini.

File yang TETAP dipakai langsung oleh kode (tidak lewat database, karena
tidak diminta untuk di-CRUD-kan): `data/rumah-sakit.ts` (profil/kontak RS),
`data/group.ts` (Muhammadiyah Gombong Group), `data/tenaga-medis.ts`
(statistik rekap tenaga medis), `data/layanan.ts` (khusus untuk field
`LAYANAN_24_JAM`, bukan `KATEGORI_LAYANAN`-nya).

## Struktur folder (ringkas)

```
app/
  layout.tsx                → root layout: font, metadata SEO (tanpa Navbar/Footer)
  (public)/                 → route group berisi SEMUA halaman publik, dibungkus
                               layout.tsx-nya sendiri (Navbar+Footer+WhatsApp button)
    page.tsx                  → Beranda
    tentang-kami/, layanan/, dokter/, informasi-berobat/,
    berita/, berita/[slug]/, karir/, kontak/, not-found.tsx
  admin-rsam-2026/           → panel admin (lihat section di atas)
    layout.tsx                 → set metadata noindex untuk seluruh admin
    login/page.tsx              → halaman login (tanpa sidebar)
    (dashboard)/layout.tsx        → bungkus AdminShell (sidebar) untuk halaman terproteksi
    (dashboard)/{layanan,kamar,dokter,berita,karir,asuransi}/page.tsx
  api/                       → API routes CRUD (dipakai admin) + /api/upload + /api/auth
  robots.ts, sitemap.ts      → otomatis, admin sudah di-disallow

lib/
  prisma.ts                  → Prisma Client singleton
  auth.ts                     → JWT session (jose, edge-compatible) + password check helper
  api-helpers.ts                → helper response 401
  data.ts                      → SEMUA query Prisma untuk halaman publik (single source)
  types.ts                     → tipe DTO yang dipakai komponen publik
  foto.ts                       → cek file ada/tidak (dipakai SafeImage, DoctorCard, dll)

prisma/
  schema.prisma               → skema database
  seed.ts                      → migrasi data lama /data/*.ts -> database

components/
  admin/                      → AdminShell, DataTable helpers, ImageUploadField,
                                 ListInput, ConfirmDialog, RichTextEditor (Tiptap), FormField
  (komponen publik lainnya — lihat riwayat revisi di bawah untuk detail tiap komponen)

middleware.ts                 → proteksi semua route /admin-rsam-2026/* kecuali /login

scripts/generate-placeholder-images.js → generator placeholder gambar (tetap ada, tidak berubah)
```

## Desain

- Palet: navy (`navy-800/900`) warna utama, teal (`teal-500`) aksen aktif/CTA,
  emas (`gold-400`) aksen premium & badge akreditasi.
- Tipografi: **Plus Jakarta Sans** (heading) + **Inter** (body).
- Panel admin sengaja polos (abu-abu/putih, tanpa Tailwind design token
  publik) — fokus fungsional, bukan showcase desain.

## Yang masih perlu Anda lakukan

- **Buat database PostgreSQL** (Neon/Vercel Postgres) dan **jalankan setup
  database** (lihat bagian paling atas) — situs tidak akan jalan tanpa ini.
- Login ke `/admin-rsam-2026/login`, cek semua data hasil migrasi sudah
  benar, lalu mulai kelola dari sana (bukan edit `/data/*.ts` lagi).
- Setup Environment Variables di dashboard Vercel (lihat section "Deploy
  ke Production" di atas) sebelum deploy ulang — pakai `DATABASE_URL`
  Postgres yang **sama** dengan yang di `.env` lokal.
- Ganti foto placeholder di `public/images/*` — bisa lewat admin panel
  (upload gambar per data) atau tetap manual drag & drop nama file yang
  sama seperti sebelumnya.
- Nomor WhatsApp Customer Care sudah diganti ke **0812-3688-3111** di
  seluruh bagian situs (`data/rumah-sakit.ts`, satu sumber untuk semuanya).

## Riwayat revisi (ringkas, terbaru di atas)

- **Revisi terbaru — Migrasi ke PostgreSQL**: ganti provider database dari
  SQLite ke PostgreSQL hosted (Neon/Vercel Postgres) — memperbaiki error
  "table does not exist" saat deploy ke Vercel, karena SQLite file lokal
  memang tidak cocok untuk serverless. Script `build` sekarang otomatis
  jalankan `prisma migrate deploy` sebelum `next build`. Halaman dashboard
  admin ditandai `force-dynamic` supaya tidak dicoba di-generate statis
  saat build. Admin panel sekarang berfungsi penuh langsung dari situs
  online (alur "Edit Lokal → Push → Live" dari revisi sebelumnya sudah
  tidak diperlukan lagi).
- Alur kerja "Edit Lokal → Push → Live" supaya bisa
  tetap pakai Vercel + SQLite tanpa ganti database (sudah digantikan
  pendekatan Postgres di atas).
- **Database + Admin Panel**: setup Prisma + SQLite,
  migrasi seluruh data statis ke database, admin panel penuh di
  `/admin-rsam-2026` (CRUD Layanan, Kamar, Dokter+Jadwal dengan status
  cuti, Berita dengan rich text editor, Karir, Asuransi), upload gambar,
  auth JWT. Nomor WhatsApp Customer Care diganti ke 0812-3688-3111.
- Popup/modal detail saat kartu Layanan & Kamar diklik (`DetailModal`,
  reusable, animasi fade/scale, tutup via X/klik luar/Escape).
- Perbaikan bug grid kartu Layanan & Kamar sempat tidak muncul (pola
  animasi bersarang `display:contents` + Framer Motion disederhanakan).
- Foto kartu dokter "Jadwal Hari Ini", `SafeImage` fallback "Foto belum
  tersedia" kalau file tidak ditemukan.
- Logo asli disambungkan ke Navbar/Footer/badge akreditasi/grid group.
- Struktur `/public/images` distandarkan + generator placeholder otomatis
  (`scripts/generate-placeholder-images.js`, lihat `public/images/README.md`).
- Section "Cara Pendaftaran Pasien" (BPJS/Umum) + "Daftar Asuransi Rekanan"
  di halaman Informasi Berobat.
- Halaman "Dokter & Tenaga Medis" + "Jadwal Dokter" digabung jadi `/dokter`.
- Rilis awal: 8 halaman lengkap, desain navy/teal/emas, animasi scroll-reveal,
  404 kustom, favicon.
