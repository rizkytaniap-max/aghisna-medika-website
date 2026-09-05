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
  const updated = await prisma.asuransiRekanan.update({
    where: { id: params.id },
    data: {
      nama: body.nama,
      logo: body.logo || null,
      kategori: body.kategori,
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

  await prisma.asuransiRekanan.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
