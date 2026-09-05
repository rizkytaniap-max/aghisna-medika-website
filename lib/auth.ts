import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "rsam_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 8; // 8 jam

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "SESSION_SECRET belum diisi di .env (atau terlalu pendek). Lihat .env.example."
    );
  }
  return new TextEncoder().encode(secret);
}

export async function buatSessionToken(username: string) {
  return new SignJWT({ username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifikasiSessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as { username: string };
  } catch {
    return null;
  }
}

/**
 * Dipakai di dalam API route (Route Handler) untuk memastikan request
 * datang dari admin yang sudah login. Return null kalau tidak valid.
 */
export async function requireAdminSession() {
  const token = cookies().get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifikasiSessionToken(token);
}

export { SESSION_COOKIE_NAME, SESSION_DURATION_SECONDS };
