import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function isAuth(req: NextRequest) {
  return req.cookies.get("sa_session")?.value === "authenticated";
}

export async function GET(req: NextRequest) {
  if (!isAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const artworks = await prisma.artwork.findMany({
    where: status ? { status: status as any } : {},
    orderBy: { createdAt: "desc" },
    include: {
      shop: { select: { id: true, displayName: true, slug: true } },
      images: { where: { isPrimary: true }, take: 1 },
      mediums: { include: { medium: { select: { name: true } } }, take: 1 },
      _count: { select: { wishlist: true, orderItems: true } },
    },
  });

  return NextResponse.json(artworks);
}

export async function PATCH(req: NextRequest) {
  if (!isAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, action } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  if (action === "toggleFeatured") {
    const current = await prisma.artwork.findUnique({ where: { id }, select: { isFeatured: true } });
    if (!current) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const updated = await prisma.artwork.update({ where: { id }, data: { isFeatured: !current.isFeatured } });
    return NextResponse.json(updated);
  }
  if (action === "archive") {
    const updated = await prisma.artwork.update({ where: { id }, data: { status: "ARCHIVED" } });
    return NextResponse.json(updated);
  }
  if (action === "activate") {
    const updated = await prisma.artwork.update({ where: { id }, data: { status: "ACTIVE" } });
    return NextResponse.json(updated);
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}

export async function DELETE(req: NextRequest) {
  if (!isAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await prisma.artwork.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
