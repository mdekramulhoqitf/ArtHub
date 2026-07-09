import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as any).id as string;

  const shop = await prisma.shop.findUnique({ where: { ownerId: userId }, select: { id: true } });
  if (!shop) return NextResponse.json({ error: "No shop" }, { status: 404 });

  const [
    revenueResult,
    orderCount,
    artworkCount,
    viewsResult,
    wishlistCount,
    reviewCount,
    ratingResult,
    topArtworks,
    recentAnalytics,
    ordersByStatus,
  ] = await Promise.all([
    prisma.order.aggregate({
      where: { shopId: shop.id, status: { in: ["PAID", "SHIPPED", "DELIVERED"] } },
      _sum: { sellerPayout: true },
    }),
    prisma.order.count({ where: { shopId: shop.id } }),
    prisma.artwork.count({ where: { shopId: shop.id } }),
    prisma.artwork.aggregate({ where: { shopId: shop.id }, _sum: { viewCount: true } }),
    prisma.wishlist.count({ where: { artwork: { shopId: shop.id } } }),
    prisma.review.count({ where: { shopId: shop.id } }),
    prisma.review.aggregate({ where: { shopId: shop.id }, _avg: { rating: true } }),
    prisma.artwork.findMany({
      where: { shopId: shop.id },
      orderBy: { viewCount: "desc" },
      take: 5,
      select: {
        id: true, title: true, price: true, viewCount: true, status: true,
        images: { where: { isPrimary: true }, take: 1 },
        _count: { select: { wishlist: true, orderItems: true } },
      },
    }),
    prisma.shopAnalytics.findMany({
      where: { shopId: shop.id },
      orderBy: { date: "asc" },
      take: 30,
    }),
    prisma.order.groupBy({
      by: ["status"],
      where: { shopId: shop.id },
      _count: { status: true },
    }),
  ]);

  return NextResponse.json({
    totalRevenue: Number(revenueResult._sum.sellerPayout ?? 0),
    orderCount,
    artworkCount,
    totalViews: viewsResult._sum.viewCount ?? 0,
    wishlistCount,
    reviewCount,
    avgRating: Number((ratingResult._avg.rating ?? 0).toFixed(1)),
    topArtworks,
    recentAnalytics,
    ordersByStatus: Object.fromEntries(ordersByStatus.map(r => [r.status, r._count.status])),
  });
}
