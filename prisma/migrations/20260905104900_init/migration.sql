-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "KategoriLayanan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "ikon" TEXT NOT NULL DEFAULT 'stethoscope',
    "ringkasan" TEXT NOT NULL,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "LayananItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsiLengkap" TEXT NOT NULL,
    "listFasilitas" TEXT NOT NULL DEFAULT '[]',
    "jamOperasional" TEXT,
    "terkaitPoliklinik" BOOLEAN NOT NULL DEFAULT false,
    "gambar" TEXT,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "kategoriId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "LayananItem_kategoriId_fkey" FOREIGN KEY ("kategoriId") REFERENCES "KategoriLayanan" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "KelasKamar" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "kelompok" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "deskripsiLengkap" TEXT NOT NULL,
    "listFasilitas" TEXT NOT NULL DEFAULT '[]',
    "gambar" TEXT,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Dokter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "gelar" TEXT,
    "spesialisasi" TEXT NOT NULL,
    "poliklinik" TEXT NOT NULL,
    "foto" TEXT,
    "tipe" TEXT NOT NULL DEFAULT 'spesialis',
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "JadwalPraktik" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dokterId" TEXT NOT NULL,
    "hari" TEXT NOT NULL,
    "jam" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'normal',
    "keterangan" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "JadwalPraktik_dokterId_fkey" FOREIGN KEY ("dokterId") REFERENCES "Dokter" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Artikel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "tanggal" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ringkasan" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "gambar" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Lowongan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "posisi" TEXT NOT NULL,
    "kualifikasi" TEXT NOT NULL DEFAULT '[]',
    "deskripsi" TEXT NOT NULL,
    "batasWaktu" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'dibuka',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AsuransiRekanan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "logo" TEXT,
    "kategori" TEXT NOT NULL,
    "sejak" INTEGER,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Pengumuman" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teks" TEXT NOT NULL,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PengaturanBeranda" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'beranda',
    "heroGambar" TEXT,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_username_key" ON "AdminUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "KategoriLayanan_slug_key" ON "KategoriLayanan"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "LayananItem_slug_key" ON "LayananItem"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "KelasKamar_slug_key" ON "KelasKamar"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Dokter_slug_key" ON "Dokter"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Artikel_slug_key" ON "Artikel"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Lowongan_slug_key" ON "Lowongan"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "AsuransiRekanan_slug_key" ON "AsuransiRekanan"("slug");
