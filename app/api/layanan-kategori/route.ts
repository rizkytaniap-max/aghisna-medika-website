import { NextResponse } from "next/server";
import slugify from "slugify";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";
import { unauthorized } from "@/lib/api-helpers";

export async function GET() {
  const data = await prisma.kategoriLayanan.findMany({
    include: { item: { orderBy: { urutan: "asc" } } },
    orderBy: { urutan: "asc" },
  });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) return unauthorized();

  const body = await request.json();
  const slug = slugify(body.judul, { lower: true, strict: true });

  const created = await prisma.kategoriLayanan.create({
    data: {
      slug,
      judul: body.judul,
      ikon: body.ikon ?? "stethoscope",
      ringkasan: body.ringkasan,
      urutan: body.urutan ?? 0,
    },
  });
  return NextResponse.json(created, { status: 201 });
}
