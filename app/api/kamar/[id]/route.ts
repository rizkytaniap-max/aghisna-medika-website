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
  const updated = await prisma.kelasKamar.update({
    where: { id: params.id },
    data: {
      label: body.label,
      jumlah: Number(body.jumlah) || 0,
      kelompok: body.kelompok,
      deskripsi: body.deskripsi,
      deskripsiLengkap: body.deskripsiLengkap,
      listFasilitas: JSON.stringify(body.listFasilitas ?? []),
      gambar: body.gambar || null,
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

  await prisma.kelasKamar.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
