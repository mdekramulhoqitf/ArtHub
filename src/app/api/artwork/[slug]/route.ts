import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const artwork = await prisma.artwork.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { displayOrder: "asc" } },
      categories: { include: { category: true } },
      mediums: { include: { medium: true } },
      shop: {
        select: {
          id: true,
          slug: true,
          displayName: true,
          logoUrl: true,
          location: true,
          ratingAvg: true,
          totalSales: true,
        },
      },
      _count: { select: { wishlist: true } },
    },
  });

  if (!artwork || artwork.status !== "ACTIVE") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Increment view count (fire-and-forget)
  prisma.artwork.update({ where: { id: artwork.id }, data: { viewCount: { increment: 1 } } }).catch(() => {});

  // Check wishlist status for current user
  const session = await getServerSession(authOptions);
  let inWishlist = false;
  if (session?.user) {
    const buyerId = (session.user as any).id as string;
    const w = await prisma.wishlist.findUnique({ where: { buyerId_artworkId: { buyerId, artworkId: artwork.id } } });
    inWishlist = !!w;
  }

  // Related artworks from same shop
  const related = await prisma.artwork.findMany({
    where: { shopId: artwork.shopId, status: "ACTIVE", id: { not: artwork.id } },
    take: 4,
    include: { images: { where: { isPrimary: true }, take: 1 } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ ...artwork, inWishlist, related });
}
