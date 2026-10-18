import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import {
  buatSessionToken,
  SESSION_COOKIE_NAME,
  SESSION_DURATION_SECONDS,
} from "@/lib/auth";

// Pembatasan percobaan login: maks 5 kali gagal per 15 menit per IP.
// Disimpan di memori server (cukup untuk menghambat tebak-password otomatis).
const MAKS_GAGAL = 5;
const JENDELA_MS = 15 * 60 * 1000;
const percobaan = new Map<string, { jumlah: number; reset: number }>();

function ipDari(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  );
}

function terkunci(ip: string) {
  const data = percobaan.get(ip);
  if (!data) return false;
  if (Date.now() > data.reset) {
    percobaan.delete(ip);
    return false;
  }
  return data.jumlah >= MAKS_GAGAL;
}

function catatGagal(ip: string) {
  const sekarang = Date.now();
  const data = percobaan.get(ip);
  if (!data || sekarang > data.reset) {
    percobaan.set(ip, { jumlah: 1, reset: sekarang + JENDELA_MS });
  } else {
    data.jumlah += 1;
  }
}

export async function POST(request: Request) {
  const ip = ipDari(request);
  if (terkunci(ip)) {
    return NextResponse.json(
      { error: "Terlalu banyak percobaan login. Coba lagi 15 menit lagi." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  const username = body?.username?.trim();
  const password = body?.password;

  if (!username || !password) {
    return NextResponse.json(
      { error: "Username dan password wajib diisi." },
      { status: 400 }
    );
  }

  const user = await prisma.adminUser.findUnique({ where: { username } });
  if (!user) {
    catatGagal(ip);
    return NextResponse.json(
      { error: "Username atau password salah." },
      { status: 401 }
    );
  }

  const passwordValid = await bcrypt.compare(password, user.passwordHash);
  if (!passwordValid) {
    catatGagal(ip);
    return NextResponse.json(
      { error: "Username atau password salah." },
      { status: 401 }
    );
  }

  percobaan.delete(ip);
  const token = await buatSessionToken(user.username);

  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });
  return response;
}
