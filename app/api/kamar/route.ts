import { NextResponse } from "next/server";
import slugify from "slugify";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";
import { unauthorized } from "@/lib/api-helpers";

export async function GET() {
  const data = await prisma.kelasKamar.findMany({ orderBy: { urutan: "asc" } });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) return unauthorized();

  const body = await request.json();
  const slug = slugify(body.label, { lower: true, strict: true });

  const created = await prisma.kelasKamar.create({
    data: {
      slug,
      label: body.label,
      jumlah: Number(body.jumlah) || 0,
      kelompok: body.kelompok,
      deskripsi: body.deskripsi,
      deskripsiLengkap: body.deskripsiLengkap,
      listFasilitas: JSON.stringify(body.listFasilitas ?? []),
      gambar: body.gambar || null,
      urutan: body.urutan ?? 0,
    },
  });
  return NextResponse.json(created, { status: 201 });
}
