import { NextResponse } from "next/server";
import slugify from "slugify";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";
import { unauthorized } from "@/lib/api-helpers";

export async function GET() {
  const data = await prisma.dokter.findMany({
    include: { jadwal: true },
    orderBy: { urutan: "asc" },
  });
  return NextResponse.json(data);
}

type JadwalInput = {
  hari: string;
  jam: string;
  status?: string;
  keterangan?: string;
};

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) return unauthorized();

  const body = await request.json();
  const slug = slugify(body.nama, { lower: true, strict: true });
  const jadwalList: JadwalInput[] = body.jadwal ?? [];

  const created = await prisma.dokter.create({
    data: {
      slug,
      nama: body.nama,
      gelar: body.gelar || null,
      spesialisasi: body.spesialisasi,
      poliklinik: body.poliklinik,
      foto: body.foto || null,
      tipe: body.tipe ?? "spesialis",
      urutan: body.urutan ?? 0,
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
  return NextResponse.json(created, { status: 201 });
}
