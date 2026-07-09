import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/reviews/shop/[shopSlug] — public, get approved reviews for a shop
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ shopSlug: string }> }
) {
  const { shopSlug } = await params;

  const shop = await prisma.shop.findUnique({ where: { slug: shopSlug } });
  if (!shop) return NextResponse.json({ error: "Shop not found" }, { status: 404 });

  const reviews = await prisma.review.findMany({
    where: { shopId: shop.id, isApproved: true },
    include: {
      buyer: { select: { name: true, avatar: true } },
      order: {
        select: {
          items: { select: { snapshotTitle: true }, take: 1 },
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json({
    reviews,
    total: reviews.length,
    avgRating: shop.ratingAvg,
  });
}
