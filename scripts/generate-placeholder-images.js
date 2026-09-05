/**
 * Generator placeholder gambar untuk /public/images
 * ---------------------------------------------------
 * Membuat file PNG asli (bukan file kosong / SVG-disamarkan) untuk seluruh
 * 7 folder gambar situs, supaya komponen <Image> Next.js tidak pernah error
 * meski foto asli belum dipasang.
 *
 * Ditulis 100% pakai modul bawaan Node.js (fs, path, zlib) — TIDAK butuh
 * dependency native (seperti "canvas" / "sharp") supaya dijamin bisa
 * dijalankan di komputer manapun (Windows/Mac/Linux) tanpa compiler
 * tambahan.
 *
 * IDEMPOTENT: kalau sebuah file SUDAH ADA di folder tujuan (baik itu
 * placeholder lama maupun foto asli yang sudah Anda ganti), script ini
 * TIDAK akan menimpanya. Cukup jalankan ulang kapan saja dengan aman.
 *
 * Cara pakai:
 *   node scripts/generate-placeholder-images.js
 * (otomatis juga jalan sekali setelah `npm install`, lihat "postinstall"
 * di package.json)
 */

const fs = require("node:fs");
const path = require("node:path");
const zlib = require("node:zlib");

const PUBLIC_IMAGES_DIR = path.join(process.cwd(), "public", "images");

// ---------------------------------------------------------------------
// 1. PNG encoder minimal (RGB 8-bit, tanpa alpha, tanpa filter baris)
// ---------------------------------------------------------------------

let crcTable = null;
function crc32(buf) {
  if (!crcTable) {
    crcTable = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) {
        c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      }
      crcTable[n] = c >>> 0;
    }
  }
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function encodePNG(width, height, rgbBuffer) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 2; // color type: RGB
  ihdrData[10] = 0; // compression method
  ihdrData[11] = 0; // filter method
  ihdrData[12] = 0; // interlace method
  const ihdr = pngChunk("IHDR", ihdrData);

  const stride = width * 3;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0; // filter type "none" tiap baris
    rgbBuffer.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }
  const idat = pngChunk("IDAT", zlib.deflateSync(raw, { level: 9 }));
  const iend = pngChunk("IEND", Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

// ---------------------------------------------------------------------
// 2. "Kanvas" RGB sederhana + gradient + kotak
// ---------------------------------------------------------------------

function createCanvas(width, height, topColor, bottomColor) {
  const buf = Buffer.alloc(width * height * 3);
  for (let y = 0; y < height; y++) {
    const t = height <= 1 ? 0 : y / (height - 1);
    const r = Math.round(topColor[0] + (bottomColor[0] - topColor[0]) * t);
    const g = Math.round(topColor[1] + (bottomColor[1] - topColor[1]) * t);
    const b = Math.round(topColor[2] + (bottomColor[2] - topColor[2]) * t);
    const rowStart = y * width * 3;
    for (let x = 0; x < width; x++) {
      buf[rowStart + x * 3] = r;
      buf[rowStart + x * 3 + 1] = g;
      buf[rowStart + x * 3 + 2] = b;
    }
  }
  return buf;
}

function setPixel(buf, width, height, x, y, color) {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const idx = (y * width + x) * 3;
  buf[idx] = color[0];
  buf[idx + 1] = color[1];
  buf[idx + 2] = color[2];
}

function fillRect(buf, width, height, x0, y0, w, h, color) {
  for (let y = y0; y < y0 + h; y++) {
    for (let x = x0; x < x0 + w; x++) {
      setPixel(buf, width, height, x, y, color);
    }
  }
}

// ---------------------------------------------------------------------
// 3. Font pixel 3x5 super-kompak (huruf besar, angka, spasi, strip, titik)
//    Cukup untuk label placeholder — bukan untuk teks panjang.
// ---------------------------------------------------------------------

const FONT_3X5 = {
  " ": ["000", "000", "000", "000", "000"],
  "-": ["000", "000", "111", "000", "000"],
  ".": ["000", "000", "000", "000", "010"],
  "&": ["010", "101", "010", "101", "011"],
  0: ["111", "101", "101", "101", "111"],
  1: ["010", "110", "010", "010", "111"],
  2: ["111", "001", "111", "100", "111"],
  3: ["111", "001", "111", "001", "111"],
  4: ["101", "101", "111", "001", "001"],
  5: ["111", "100", "111", "001", "111"],
  6: ["111", "100", "111", "101", "111"],
  7: ["111", "001", "001", "001", "001"],
  8: ["111", "101", "111", "101", "111"],
  9: ["111", "101", "111", "001", "111"],
  A: ["010", "101", "111", "101", "101"],
  B: ["110", "101", "110", "101", "110"],
  C: ["011", "100", "100", "100", "011"],
  D: ["110", "101", "101", "101", "110"],
  E: ["111", "100", "110", "100", "111"],
  F: ["111", "100", "110", "100", "100"],
  G: ["011", "100", "101", "101", "011"],
  H: ["101", "101", "111", "101", "101"],
  I: ["111", "010", "010", "010", "111"],
  J: ["001", "001", "001", "101", "010"],
  K: ["101", "101", "110", "101", "101"],
  L: ["100", "100", "100", "100", "111"],
  M: ["101", "111", "111", "101", "101"],
  N: ["101", "111", "111", "111", "101"],
  O: ["010", "101", "101", "101", "010"],
  P: ["110", "101", "110", "100", "100"],
  Q: ["010", "101", "101", "111", "011"],
  R: ["110", "101", "110", "101", "101"],
  S: ["011", "100", "010", "001", "110"],
  T: ["111", "010", "010", "010", "010"],
  U: ["101", "101", "101", "101", "111"],
  V: ["101", "101", "101", "101", "010"],
  W: ["101", "101", "111", "111", "101"],
  X: ["101", "101", "010", "101", "101"],
  Y: ["101", "101", "010", "010", "010"],
  Z: ["111", "001", "010", "100", "111"],
};

function measureText(text, scale) {
  if (text.length === 0) return 0;
  return text.length * 4 * scale - scale; // 3 lebar + 1 spasi per huruf, minus spasi ekor
}

function drawChar(buf, width, height, ch, x, y, scale, color) {
  const glyph = FONT_3X5[ch] ?? FONT_3X5[" "];
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 3; col++) {
      if (glyph[row][col] === "1") {
        fillRect(
          buf, width, height,
          x + col * scale, y + row * scale,
          scale, scale, color
        );
      }
    }
  }
}

function drawTextCentered(buf, width, height, text, centerX, centerY, scale, color) {
  const textWidth = measureText(text, scale);
  let x = Math.round(centerX - textWidth / 2);
  const y = Math.round(centerY - (5 * scale) / 2);
  for (const ch of text) {
    drawChar(buf, width, height, ch.toUpperCase(), x, y, scale, color);
    x += 4 * scale;
  }
}

function wrapText(text, maxWidthPx, scale) {
  const words = text.split(" ").filter(Boolean);
  const lines = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (measureText(candidate, scale) <= maxWidthPx || !current) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/** Cari skala terbesar supaya teks (boleh multi-baris) muat di dalam kotak target. */
function fitTextBlock(text, maxWidthPx, maxHeightPx, maxScale) {
  for (let scale = maxScale; scale >= 1; scale--) {
    const lines = wrapText(text, maxWidthPx, scale);
    const lineHeight = 6 * scale; // tinggi glyph (5) + jarak antar baris (1)
    const blockHeight = lines.length * lineHeight;
    const widestLine = Math.max(...lines.map((l) => measureText(l, scale)));
    if (blockHeight <= maxHeightPx && widestLine <= maxWidthPx) {
      return { lines, scale, lineHeight };
    }
  }
  const lines = wrapText(text, maxWidthPx, 1);
  return { lines, scale: 1, lineHeight: 6 };
}

// ---------------------------------------------------------------------
// 4. Komposisi 1 gambar placeholder utuh
// ---------------------------------------------------------------------

function generatePlaceholder({
  width,
  height,
  topColor,
  bottomColor,
  textColor,
  subtitleColor,
  accentColor,
  label,
  subtitle = "PLACEHOLDER",
}) {
  const buf = createCanvas(width, height, topColor, bottomColor);

  // aksen tipis di bagian bawah (senada dengan aksen di kartu dokter/kamar situs)
  const accentHeight = Math.max(4, Math.round(height * 0.015));
  fillRect(buf, width, height, 0, height - accentHeight, width, accentHeight, accentColor);

  const maxTextWidth = Math.round(width * 0.82);
  const maxTextHeight = Math.round(height * 0.5);
  const maxScale = Math.max(2, Math.floor(width / 90));

  const mainBlock = fitTextBlock(label, maxTextWidth, maxTextHeight, maxScale);
  const subtitleScale = Math.max(1, Math.floor(mainBlock.scale * 0.45));
  const subtitleHeight = 6 * subtitleScale;
  const gap = Math.max(4, Math.round(mainBlock.scale * 2));

  const totalHeight =
    mainBlock.lines.length * mainBlock.lineHeight + gap + subtitleHeight;
  let cursorY = Math.round(height / 2 - totalHeight / 2 + mainBlock.lineHeight / 2);

  for (const line of mainBlock.lines) {
    drawTextCentered(buf, width, height, line, width / 2, cursorY, mainBlock.scale, textColor);
    cursorY += mainBlock.lineHeight;
  }
  cursorY += gap - mainBlock.lineHeight / 2 + subtitleHeight / 2;
  drawTextCentered(buf, width, height, subtitle, width / 2, cursorY, subtitleScale, subtitleColor);

  return encodePNG(width, height, buf);
}

// ---------------------------------------------------------------------
// 5. Palet warna brand RSU Aghisna Medika (disamakan dengan tailwind.config.ts)
// ---------------------------------------------------------------------

const WARNA = {
  navyDeep: [6, 35, 56], // navy-900
  navy: [11, 52, 84], // navy-800
  navyLight: [18, 63, 99], // navy-700
  teal: [29, 143, 137], // teal-500
  tealSoft: [204, 233, 231], // teal-100
  tealPale: [232, 245, 244], // teal-50
  mistLight: [247, 249, 250], // mist-50
  mist: [238, 242, 245], // mist-100
  mistDeep: [227, 233, 237], // mist-200
  gold: [205, 163, 74], // gold-400
  goldDeep: [169, 129, 47], // gold-600
  goldPale: [251, 246, 233], // gold-50
  white: [255, 255, 255],
  tealDeep: [17, 107, 103], // teal-700
};

// ---------------------------------------------------------------------
// 6. Definisi kategori & daftar file wajib per folder
// ---------------------------------------------------------------------

function labelFromFilename(filename, stripPrefix) {
  let stem = filename.replace(/\.(png|jpe?g)$/i, "");
  if (stripPrefix && stem.startsWith(stripPrefix)) {
    stem = stem.slice(stripPrefix.length);
  }
  return stem.replace(/-/g, " ").trim().toUpperCase();
}

const KATEGORI = [
  {
    folder: "logo",
    width: 640,
    height: 160,
    prefix: "logo-",
    style: {
      topColor: WARNA.navyLight,
      bottomColor: WARNA.navyDeep,
      textColor: WARNA.gold,
      subtitleColor: WARNA.white,
      accentColor: WARNA.gold,
    },
    files: [
      "logo-rs-aghisna.png",
      {
        filename: "logo-rs-aghisna-white.png",
        style: { textColor: WARNA.white, subtitleColor: WARNA.tealSoft },
      },
      "logo-group-muhammadiyah-gombong.png",
      "logo-pku-muhammadiyah-gombong.png",
      "logo-pku-muhammadiyah-amanah-sumpiuh.png",
      "logo-pku-muhammadiyah-aghisna-kroya.png",
      "logo-aisyiyah-purworejo.png",
      "logo-unimugo.png",
      {
        filename: "logo-akreditasi-paripurna.png",
        width: 320,
        height: 320,
        style: {
          topColor: WARNA.gold,
          bottomColor: WARNA.goldDeep,
          textColor: WARNA.navyDeep,
          subtitleColor: WARNA.navy,
          accentColor: WARNA.navyDeep,
        },
      },
    ],
  },
  {
    folder: "hero",
    width: 1600,
    height: 900,
    prefix: "hero-",
    style: {
      topColor: WARNA.teal,
      bottomColor: WARNA.navy,
      textColor: WARNA.white,
      subtitleColor: WARNA.tealSoft,
      accentColor: WARNA.gold,
    },
    files: [
      "hero-gedung-utama.jpg",
      "hero-igd.jpg",
      "hero-tim-medis.jpg",
      "hero-ambulans.jpg",
    ],
  },
  {
    folder: "dokter",
    width: 480,
    height: 640,
    prefix: "dokter-",
    style: {
      topColor: WARNA.tealPale,
      bottomColor: WARNA.tealSoft,
      textColor: WARNA.navyLight,
      subtitleColor: WARNA.teal,
      accentColor: WARNA.teal,
    },
    files: [
      "dokter-ferry-gunawan.jpg",
      "dokter-arga-kafi-perdana-kusuma.jpg",
      "dokter-nur-eko-hadi-sucipto.jpg",
      "dokter-muhamad-sariuddin-n.jpg",
      "dokter-irfan-alfarizi.jpg",
      "dokter-dhika-triesnia-sagita.jpg",
      "dokter-a-tri-tjahjono-budi-walujo.jpg",
      "dokter-arif-setyo-hutomo.jpg",
      "dokter-debra-anita-helmi.jpg",
      "dokter-noor-hafizah-nasution.jpg",
      "dokter-tri-hartono.jpg",
      "dokter-yunita-desy-wulansari.jpg",
      "dokter-yondi-piter-papulung.jpg",
      "dokter-noviana-sie.jpg",
      "dokter-teddy-dharmawan.jpg",
      "dokter-zaka-jauhar-firdaus.jpg",
      "dokter-diana-anggraeni.jpg",
      "dokter-anindito-andi-nugroho.jpg",
      "dokter-az-zahra-mahrunnisa.jpg",
      "dokter-nurnawasi-soga.jpg",
      "dokter-ratih-puspaningsih.jpg",
      "dokter-cindar-fatiha-sari.jpg",
      "dokter-fitri-sindi-chyndi-pangestini.jpg",
      "dokter-laela-nurrochmah.jpg",
      "dokter-vita-fatimah.jpg",
      "dokter-dzaka-alim-asyam.jpg",
      "dokter-muhammad-farhan-naufal-siregar.jpg",
      // Tambahan konsistensi (di luar daftar awal, tim non-individual):
      "dokter-tim-fisioterapi.jpg",
    ],
  },
  {
    folder: "fasilitas",
    width: 800,
    height: 600,
    prefix: "fasilitas-",
    style: {
      topColor: WARNA.mistLight,
      bottomColor: WARNA.mistDeep,
      textColor: WARNA.navy,
      subtitleColor: WARNA.teal,
      accentColor: WARNA.teal,
    },
    files: [
      "fasilitas-igd.jpg",
      "fasilitas-rawat-jalan.jpg",
      "fasilitas-laboratorium.jpg",
      "fasilitas-radiologi.jpg",
      "fasilitas-farmasi.jpg",
      "fasilitas-icu.jpg",
      "fasilitas-ambulans.jpg",
      "fasilitas-ruang-operasi.jpg",
      "fasilitas-ruang-bersalin.jpg",
      "fasilitas-fisioterapi.jpg",
      "fasilitas-medical-checkup.jpg",
    ],
  },
  {
    folder: "kamar",
    width: 800,
    height: 600,
    prefix: "kamar-",
    style: {
      topColor: WARNA.mist,
      bottomColor: WARNA.mistDeep,
      textColor: WARNA.navy,
      subtitleColor: WARNA.goldDeep,
      accentColor: WARNA.gold,
    },
    files: [
      "kamar-vvip.jpg",
      "kamar-vip.jpg",
      "kamar-kelas-1.jpg",
      "kamar-kelas-2.jpg",
      "kamar-kelas-3.jpg",
      "kamar-icu.jpg",
      "kamar-hcu.jpg",
      "kamar-nicu.jpg",
      "kamar-picu.jpg",
      "kamar-isolasi.jpg",
      "kamar-perinatologi.jpg",
    ],
  },
  {
    folder: "berita",
    width: 960,
    height: 540,
    prefix: "berita-",
    style: {
      topColor: WARNA.mistLight,
      bottomColor: WARNA.tealPale,
      textColor: WARNA.navy,
      subtitleColor: WARNA.tealDeep,
      accentColor: WARNA.teal,
    },
    files: [
      "berita-thumbnail-1.jpg",
      "berita-thumbnail-2.jpg",
      "berita-thumbnail-3.jpg",
      "berita-thumbnail-4.jpg",
      "berita-thumbnail-5.jpg",
      "berita-thumbnail-6.jpg",
    ],
  },
  {
    folder: "asuransi",
    width: 400,
    height: 200,
    prefix: "",
    style: {
      topColor: WARNA.white,
      bottomColor: WARNA.mistLight,
      textColor: WARNA.navy,
      subtitleColor: WARNA.goldDeep,
      accentColor: WARNA.gold,
    },
    files: [
      "bpjs-kesehatan.png",
      "bpjs-ketenagakerjaan.png",
      "jasa-raharja.png",
      "asuransi-mag.png",
      "kai.png",
      "higea.png",
      "bca-life.png",
      "bni-life.png",
      "bri-life.png",
    ],
  },
];

// ---------------------------------------------------------------------
// 7. Jalankan generator
// ---------------------------------------------------------------------

function run() {
  let dibuat = 0;
  let dilewati = 0;

  for (const kategori of KATEGORI) {
    const folderPath = path.join(PUBLIC_IMAGES_DIR, kategori.folder);
    fs.mkdirSync(folderPath, { recursive: true });

    for (const entry of kategori.files) {
      const isObj = typeof entry === "object";
      const filename = isObj ? entry.filename : entry;
      const width = (isObj && entry.width) || kategori.width;
      const height = (isObj && entry.height) || kategori.height;
      const style = { ...kategori.style, ...((isObj && entry.style) || {}) };

      const targetPath = path.join(folderPath, filename);

      // IDEMPOTENT: kalau file sudah ada (placeholder lama ATAU foto asli
      // yang sudah diganti user), JANGAN ditimpa.
      if (fs.existsSync(targetPath)) {
        dilewati++;
        continue;
      }

      const label = labelFromFilename(filename, kategori.prefix);
      const png = generatePlaceholder({
        width,
        height,
        label,
        ...style,
      });
      fs.writeFileSync(targetPath, png);
      dibuat++;
      console.log(`  + ${kategori.folder}/${filename}`);
    }
  }

  console.log("");
  console.log(
    `Selesai. ${dibuat} file placeholder dibuat, ${dilewati} file dilewati (sudah ada).`
  );
}

run();
