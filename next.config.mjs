/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      // Foto yang diunggah lewat panel admin (Vercel Blob)
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  // PENTING untuk deploy preview cepat pakai SQLite di Vercel: Next.js
  // secara default tidak tahu file database SQLite harus ikut dibundel ke
  // serverless function (karena Prisma membacanya lewat env var saat
  // runtime, bukan lewat import statis yang bisa dideteksi otomatis).
  // Baris ini memaksa file prisma/dev.db ikut disertakan.
  // Catatan: ini hanya solusi untuk PREVIEW/DEMO tampilan.
  // Untuk production sungguhan, pindah ke database cloud (Postgres).
  experimental: {
    outputFileTracingIncludes: {
      "/**": ["./prisma/dev.db"],
    },
  },
  async redirects() {
    return [
      {
        source: "/jadwal-dokter",
        destination: "/dokter#jadwal-praktik",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
