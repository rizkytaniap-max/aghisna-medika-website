import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";
import { unauthorized } from "@/lib/api-helpers";

type JadwalInput = {
  hari: string;
  jam: string;
  status?: string;
  keterangan?: string;
};

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await requireAdminSession();
  if (!session) return unauthorized();

  const body = await request.json();
  const jadwalList: JadwalInput[] = body.jadwal ?? [];

  // Ganti seluruh jadwal (hapus lama, buat baru) - lebih sederhana daripada
  // diff per baris, dan jumlah jadwal per dokter kecil jadi tidak masalah.
  await prisma.jadwalPraktik.deleteMany({ where: { dokterId: params.id } });

  const updated = await prisma.dokter.update({
    where: { id: params.id },
    data: {
      nama: body.nama,
      gelar: body.gelar || null,
      spesialisasi: body.spesialisasi,
      poliklinik: body.poliklinik,
      foto: body.foto || null,
      tipe: body.tipe,
      urutan: body.urutan,
      jadwal: {
        create: jadwalList.map((j) => ({
          hari: j.hari,
          jam: j.jam,
          status: j.status ?? "normal",
          keterangan: j.keterangan || null,
        })),
      },
    },
    include: { jadwal: true },
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const session = await requireAdminSession();
  if (!session) return unauthorized();

  await prisma.dokter.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
