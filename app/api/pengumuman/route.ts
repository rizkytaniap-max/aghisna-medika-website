import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";
import { unauthorized } from "@/lib/api-helpers";

export async function GET() {
  const session = await requireAdminSession();
  if (!session) return unauthorized();

  const data = await prisma.pengumuman.findFirst({
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const session = await requireAdminSession();
  if (!session) return unauthorized();

  const body = await request.json();
  const existing = await prisma.pengumuman.findFirst();

  const updated = existing
    ? await prisma.pengumuman.update({
        where: { id: existing.id },
        data: { teks: body.teks, aktif: !!body.aktif },
      })
    : await prisma.pengumuman.create({
        data: { teks: body.teks, aktif: !!body.aktif },
      });

  return NextResponse.json(updated);
}
