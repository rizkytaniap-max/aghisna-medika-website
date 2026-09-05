import { NextResponse } from "next/server";

export function unauthorized() {
  return NextResponse.json(
    { error: "Tidak diizinkan. Silakan login terlebih dahulu." },
    { status: 401 }
  );
}
