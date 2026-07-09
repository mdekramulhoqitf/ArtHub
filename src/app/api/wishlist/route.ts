import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const buyerId = (session.user as any).id as string;

  const items = await prisma.wishlist.findMany({
    where: { buyerId },
    orderBy: { createdAt: "desc" },
    include: {
      artwork: {
        include: {
          images: { where: { isPrimary: true }, take: 1 },
          shop: { select: { displayName: true, slug: true } },
        },
      },
    },
  });

  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const buyerId = (session.user as any).id as string;

  const { artworkId } = await req.json();
  if (!artworkId) return NextResponse.json({ error: "artworkId required" }, { status: 400 });

  const item = await prisma.wishlist.upsert({
    where: { buyerId_artworkId: { buyerId, artworkId } },
    create: { buyerId, artworkId },
    update: {},
  });

  return NextResponse.json(item, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const buyerId = (session.user as any).id as string;

  const { artworkId } = await req.json();
  await prisma.wishlist.deleteMany({ where: { buyerId, artworkId } });

  return NextResponse.json({ ok: true });
}
