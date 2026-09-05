import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";
import { unauthorized } from "@/lib/api-helpers";

export async function GET() {
  const data = await prisma.pengaturanBeranda.findUnique({
    where: { id: "beranda" },
  });
  return NextResponse.json({ heroGambar: data?.heroGambar ?? null });
}

export async function PATCH(request: Request) {
  const session = await requireAdminSession();
  if (!session) return unauthorized();

  const body = await request.json();
  const updated = await prisma.pengaturanBeranda.upsert({
    where: { id: "beranda" },
    update: { heroGambar: body.heroGambar || null },
    create: { id: "beranda", heroGambar: body.heroGambar || null },
  });
  return NextResponse.json({ heroGambar: updated.heroGambar });
}
