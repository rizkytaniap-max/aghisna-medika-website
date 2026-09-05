import { PrismaClient } from "@prisma/client";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "\n\n" +
      "❌ DATABASE_URL tidak ditemukan.\n" +
      "   Pastikan file .env sudah ada di root project (sejajar dengan\n" +
      "   package.json) dan berisi baris:\n" +
      '     DATABASE_URL="file:./dev.db"\n\n' +
      "   Kalau file .env belum ada, salin dari template-nya dulu:\n" +
      "     cp .env.example .env\n" +
      "   lalu isi ADMIN_USERNAME, ADMIN_PASSWORD, dan SESSION_SECRET\n" +
      "   sebelum menjalankan `npx prisma migrate dev` / `npm run dev`.\n"
  );
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
