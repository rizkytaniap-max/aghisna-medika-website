import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE_NAME, verifikasiSessionToken } from "@/lib/auth";

const ADMIN_BASE = "/admin-rsam-2026";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Halaman login sendiri tidak boleh ikut diproteksi (nanti infinite redirect)
  if (pathname === `${ADMIN_BASE}/login`) {
    return NextResponse.next();
  }

  if (pathname.startsWith(ADMIN_BASE)) {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const session = token ? await verifikasiSessionToken(token) : null;

    if (!session) {
      const loginUrl = new URL(`${ADMIN_BASE}/login`, request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin-rsam-2026/:path*"],
};
