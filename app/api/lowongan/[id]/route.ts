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
  const updated = await prisma.lowongan.update({
    where: { id: params.id },
    data: {
      posisi: body.posisi,
      kualifikasi: JSON.stringify(body.kualifikasi ?? []),
      deskripsi: body.deskripsi,
      batasWaktu: body.batasWaktu ? new Date(body.batasWaktu) : null,
      status: body.status,
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

  await prisma.lowongan.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
