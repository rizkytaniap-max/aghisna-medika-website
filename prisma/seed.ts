// Seed database dari data statis yang sudah ada di /data/*.ts, supaya tidak
// kehilangan data yang sudah pernah diisi sebelumnya.
// Jalankan: npx prisma db seed  (atau otomatis ikut saat `npx prisma migrate dev`)

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { KATEGORI_LAYANAN } from "../data/layanan";
import { TEMPAT_TIDUR } from "../data/tempat-tidur";
import { DAFTAR_DOKTER, POLI_UMUM_24_JAM } from "../data/dokter";
import { ARTIKEL } from "../data/artikel";
import { ASURANSI_REKANAN } from "../data/asuransi-rekanan";

if (!process.env.DATABASE_URL) {
  console.error(
    "\n❌ DATABASE_URL tidak ditemukan.\n" +
      "   Pastikan file .env sudah ada di root project dan berisi:\n" +
      '     DATABASE_URL="file:./dev.db"\n' +
      "   Kalau belum ada, salin dulu: cp .env.example .env\n"
  );
  process.exit(1);
}

const prisma = new PrismaClient();

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function seedAdminUser() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    console.warn(
      "⚠️  ADMIN_USERNAME / ADMIN_PASSWORD belum diisi di .env — akun admin TIDAK dibuat. " +
        "Isi dulu .env lalu jalankan ulang `npx prisma db seed`."
    );
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.adminUser.upsert({
    where: { username },
    update: { passwordHash },
    create: { username, passwordHash },
  });
  console.log(`✓ Akun admin "${username}" siap.`);
}

async function seedLayanan() {
  for (let kategoriIdx = 0; kategoriIdx < KATEGORI_LAYANAN.length; kategoriIdx++) {
    const kat = KATEGORI_LAYANAN[kategoriIdx];
    const kategori = await prisma.kategoriLayanan.upsert({
      where: { slug: kat.id },
      update: {
        judul: kat.judul,
        ikon: kat.ikon,
        ringkasan: kat.ringkasan,
        urutan: kategoriIdx,
      },
      create: {
        slug: kat.id,
        judul: kat.judul,
        ikon: kat.ikon,
        ringkasan: kat.ringkasan,
        urutan: kategoriIdx,
      },
    });

    for (let itemIdx = 0; itemIdx < kat.item.length; itemIdx++) {
      const item = kat.item[itemIdx];
      await prisma.layananItem.upsert({
        where: { slug: item.id },
        update: {
          nama: item.nama,
          deskripsiLengkap: item.deskripsiLengkap,
          listFasilitas: JSON.stringify(item.listFasilitas ?? []),
          jamOperasional: item.jamOperasional ?? null,
          terkaitPoliklinik: !!item.terkaitPoliklinik,
          urutan: itemIdx,
          kategoriId: kategori.id,
        },
        create: {
          slug: item.id,
          nama: item.nama,
          deskripsiLengkap: item.deskripsiLengkap,
          listFasilitas: JSON.stringify(item.listFasilitas ?? []),
          jamOperasional: item.jamOperasional ?? null,
          terkaitPoliklinik: !!item.terkaitPoliklinik,
          urutan: itemIdx,
          kategoriId: kategori.id,
        },
      });
    }
  }
  console.log(`✓ ${KATEGORI_LAYANAN.length} kategori layanan ter-seed.`);
}

async function seedKamar() {
  for (let idx = 0; idx < TEMPAT_TIDUR.length; idx++) {
    const kamar = TEMPAT_TIDUR[idx];
    await prisma.kelasKamar.upsert({
      where: { slug: kamar.id },
      update: {
        label: kamar.label,
        jumlah: kamar.jumlah,
        kelompok: kamar.kelompok,
        deskripsi: kamar.deskripsi,
        deskripsiLengkap: kamar.deskripsiLengkap,
        listFasilitas: JSON.stringify(kamar.listFasilitas ?? []),
        gambar: kamar.foto,
        urutan: idx,
      },
      create: {
        slug: kamar.id,
        label: kamar.label,
        jumlah: kamar.jumlah,
        kelompok: kamar.kelompok,
        deskripsi: kamar.deskripsi,
        deskripsiLengkap: kamar.deskripsiLengkap,
        listFasilitas: JSON.stringify(kamar.listFasilitas ?? []),
        gambar: kamar.foto,
        urutan: idx,
      },
    });
  }
  console.log(`✓ ${TEMPAT_TIDUR.length} kelas kamar ter-seed.`);
}

async function seedDokter() {
  for (let idx = 0; idx < DAFTAR_DOKTER.length; idx++) {
    const dok = DAFTAR_DOKTER[idx];
    const dokter = await prisma.dokter.upsert({
      where: { slug: dok.id },
      update: {
        nama: dok.nama,
        gelar: dok.gelar || null,
        spesialisasi: dok.spesialisasi,
        poliklinik: dok.poliklinik,
        foto: dok.foto,
        tipe: "spesialis",
        urutan: idx,
      },
      create: {
        slug: dok.id,
        nama: dok.nama,
        gelar: dok.gelar || null,
        spesialisasi: dok.spesialisasi,
        poliklinik: dok.poliklinik,
        foto: dok.foto,
        tipe: "spesialis",
        urutan: idx,
      },
    });

    // Hindari duplikasi jadwal kalau seed dijalankan berkali-kali
    await prisma.jadwalPraktik.deleteMany({ where: { dokterId: dokter.id } });
    await prisma.jadwalPraktik.createMany({
      data: dok.jadwal.map((j: { hari: string; jam: string }) => ({
        dokterId: dokter.id,
        hari: j.hari,
        jam: j.jam,
        status: "normal",
      })),
    });
  }

  // Poli Umum (dokter jaga 24 jam) — disimpan sebagai Dokter juga, dengan
  // tipe "poli_umum" dan satu jadwal "Setiap Hari, 24 Jam"
  for (let idx = 0; idx < POLI_UMUM_24_JAM.dokterJaga.length; idx++) {
    const d = POLI_UMUM_24_JAM.dokterJaga[idx];
    const slug = `poli-umum-${slugify(d.nama)}`;
    const dokter = await prisma.dokter.upsert({
      where: { slug },
      update: {
        nama: d.nama,
        spesialisasi: "Dokter Umum",
        poliklinik: POLI_UMUM_24_JAM.judul,
        foto: d.foto,
        tipe: "poli_umum",
        urutan: idx,
      },
      create: {
        slug,
        nama: d.nama,
        spesialisasi: "Dokter Umum",
        poliklinik: POLI_UMUM_24_JAM.judul,
        foto: d.foto,
        tipe: "poli_umum",
        urutan: idx,
      },
    });
    await prisma.jadwalPraktik.deleteMany({ where: { dokterId: dokter.id } });
    await prisma.jadwalPraktik.create({
      data: {
        dokterId: dokter.id,
        hari: "Setiap Hari",
        jam: "24 Jam",
        status: "normal",
      },
    });
  }

  console.log(
    `✓ ${DAFTAR_DOKTER.length} dokter spesialis + ${POLI_UMUM_24_JAM.dokterJaga.length} dokter poli umum ter-seed.`
  );
}

async function seedArtikel() {
  for (const a of ARTIKEL) {
    await prisma.artikel.upsert({
      where: { slug: a.slug },
      update: {
        judul: a.judul,
        kategori: a.kategori,
        tanggal: new Date(a.tanggal),
        ringkasan: a.ringkasan,
        konten: a.konten.map((p) => `<p>${p}</p>`).join("\n"),
        gambar: a.gambar,
        status: "published",
      },
      create: {
        slug: a.slug,
        judul: a.judul,
        kategori: a.kategori,
        tanggal: new Date(a.tanggal),
        ringkasan: a.ringkasan,
        konten: a.konten.map((p) => `<p>${p}</p>`).join("\n"),
        gambar: a.gambar,
        status: "published",
      },
    });
  }
  console.log(`✓ ${ARTIKEL.length} artikel ter-seed.`);
}

async function seedAsuransi() {
  for (let idx = 0; idx < ASURANSI_REKANAN.length; idx++) {
    const r = ASURANSI_REKANAN[idx];
    const slug = slugify(r.nama);
    await prisma.asuransiRekanan.upsert({
      where: { slug },
      update: { nama: r.nama, logo: r.logo, kategori: r.kategori, sejak: r.sejak ?? null, urutan: idx },
      create: { slug, nama: r.nama, logo: r.logo, kategori: r.kategori, sejak: r.sejak ?? null, urutan: idx },
    });
  }
  console.log(`✓ ${ASURANSI_REKANAN.length} rekanan asuransi ter-seed.`);
}

async function seedPengaturanBeranda() {
  // create-only: kalau admin sudah pernah ganti gambar hero lewat panel
  // admin, seed berikutnya TIDAK menimpa pilihan admin.
  await prisma.pengaturanBeranda.upsert({
    where: { id: "beranda" },
    update: {},
    create: { id: "beranda", heroGambar: "/images/hero/hero-tim-medis.jpg" },
  });
  console.log("✓ Pengaturan beranda (hero) ter-seed.");
}

async function main() {
  console.log("Mulai seeding database...\n");
  await seedAdminUser();
  await seedLayanan();
  await seedKamar();
  await seedDokter();
  await seedArtikel();
  await seedAsuransi();
  await seedPengaturanBeranda();
  console.log("\nSelesai. Data lama (dari /data/*.ts) sudah masuk ke database.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
