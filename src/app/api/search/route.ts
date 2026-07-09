import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) return NextResponse.json({ artworks: [], shops: [], artists: [] });

  const [artworks, shops, artists] = await Promise.all([
    prisma.artwork.findMany({
      where: {
        status: "ACTIVE",
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { tags: { has: q } },
        ],
      },
      take: 5,
      select: {
        slug: true,
        title: true,
        price: true,
        images: { where: { isPrimary: true }, take: 1, select: { url: true } },
        shop: { select: { displayName: true } },
      },
      orderBy: { viewCount: "desc" },
    }),
    prisma.shop.findMany({
      where: {
        isApproved: true,
        displayName: { contains: q, mode: "insensitive" },
      },
      take: 3,
      select: { slug: true, displayName: true, logoUrl: true, _count: { select: { artworks: true } } },
    }),
    prisma.user.findMany({
      where: {
        role: "SELLER",
        name: { contains: q, mode: "insensitive" },
      },
      take: 3,
      select: { id: true, name: true, avatar: true, shop: { select: { slug: true } } },
    }),
  ]);

  return NextResponse.json({ artworks, shops, artists });
}
