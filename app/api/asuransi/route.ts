import { NextResponse } from "next/server";
import slugify from "slugify";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";
import { unauthorized } from "@/lib/api-helpers";

export async function GET() {
  const data = await prisma.asuransiRekanan.findMany({ orderBy: { urutan: "asc" } });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) return unauthorized();

  const body = await request.json();
  const slug = slugify(body.nama, { lower: true, strict: true });

  const created = await prisma.asuransiRekanan.create({
    data: {
      slug,
      nama: body.nama,
      logo: body.logo || null,
      kategori: body.kategori,
      urutan: body.urutan ?? 0,
    },
  });
  return NextResponse.json(created, { status: 201 });
}
