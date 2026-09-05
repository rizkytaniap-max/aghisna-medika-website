import { NextResponse } from "next/server";
import slugify from "slugify";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";
import { unauthorized } from "@/lib/api-helpers";

export async function GET() {
  const data = await prisma.lowongan.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) return unauthorized();

  const body = await request.json();
  const slug = slugify(body.posisi, { lower: true, strict: true });

  const created = await prisma.lowongan.create({
    data: {
      slug,
      posisi: body.posisi,
      kualifikasi: JSON.stringify(body.kualifikasi ?? []),
      deskripsi: body.deskripsi,
      batasWaktu: body.batasWaktu ? new Date(body.batasWaktu) : null,
      status: body.status ?? "dibuka",
    },
  });
  return NextResponse.json(created, { status: 201 });
}
