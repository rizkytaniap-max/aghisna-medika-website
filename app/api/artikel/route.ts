import { NextResponse } from "next/server";
import slugify from "slugify";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";
import { unauthorized } from "@/lib/api-helpers";

export async function GET() {
  const data = await prisma.artikel.findMany({ orderBy: { tanggal: "desc" } });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) return unauthorized();

  const body = await request.json();
  const slug = slugify(body.judul, { lower: true, strict: true });

  const created = await prisma.artikel.create({
    data: {
      slug,
      judul: body.judul,
      kategori: body.kategori,
      tanggal: body.tanggal ? new Date(body.tanggal) : new Date(),
      ringkasan: body.ringkasan,
      konten: body.konten,
      gambar: body.gambar || null,
      status: body.status ?? "draft",
    },
  });
  return NextResponse.json(created, { status: 201 });
}
