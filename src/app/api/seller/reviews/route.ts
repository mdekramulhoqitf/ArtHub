import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/seller/reviews — seller sees all reviews for their shop
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { shop: { select: { id: true, ratingAvg: true } } },
  });
  if (!user?.shop) return NextResponse.json({ error: "No shop found" }, { status: 404 });

  const reviews = await prisma.review.findMany({
    where: { shopId: user.shop.id },
    include: {
      buyer: { select: { name: true, avatar: true, email: true } },
      order: { select: { items: { select: { snapshotTitle: true }, take: 1 } } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ reviews, avgRating: user.shop.ratingAvg });
}
