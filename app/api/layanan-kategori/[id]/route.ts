import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";
import { unauthorized } from "@/lib/api-helpers";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await requireAdminSession();
  if (!session) return unauthorized();

  const body = await request.json();
  const updated = await prisma.kategoriLayanan.update({
    where: { id: params.id },
    data: {
      judul: body.judul,
      ikon: body.ikon,
      ringkasan: body.ringkasan,
      urutan: body.urutan,
    },
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const session = await requireAdminSession();
  if (!session) return unauthorized();

  await prisma.kategoriLayanan.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
