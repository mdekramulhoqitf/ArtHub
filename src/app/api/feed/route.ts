import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/feed — artworks from shops the current user follows
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get("cursor");
  const limit = 12;

  // Get followed shop IDs
  const follows = await prisma.follow.findMany({
    where: { buyerId: user.id },
    select: { shopId: true, shop: { select: { displayName: true, slug: true, logoUrl: true } } },
  });

  if (follows.length === 0) {
    return NextResponse.json({ artworks: [], followedShops: [], nextCursor: null });
  }

  const shopIds = follows.map((f) => f.shopId);

  const artworks = await prisma.artwork.findMany({
    where: {
      shopId: { in: shopIds },
      status: "ACTIVE",
      ...(cursor ? { createdAt: { lt: new Date(cursor) } } : {}),
    },
    include: {
      shop: { select: { displayName: true, slug: true, logoUrl: true } },
      images: { where: { isPrimary: true }, take: 1 },
      categories: { include: { category: { select: { name: true } } }, take: 1 },
      _count: { select: { wishlist: true } },
    },
    orderBy: { createdAt: "desc" },
    take: limit + 1,
  });

  const hasMore = artworks.length > limit;
  const result = hasMore ? artworks.slice(0, limit) : artworks;
  const nextCursor = hasMore ? result[result.length - 1].createdAt.toISOString() : null;

  const followedShops = follows.map((f) => f.shop);

  return NextResponse.json({ artworks: result, followedShops, nextCursor });
}
