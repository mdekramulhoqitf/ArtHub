import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST /api/reviews — buyer submits review for a delivered order
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const body = await req.json();
  const { orderId, rating, reviewBody, photos } = body;

  if (!orderId || !rating) {
    return NextResponse.json({ error: "orderId and rating required" }, { status: 400 });
  }
  if (rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating must be 1–5" }, { status: 400 });
  }

  // Verify order belongs to buyer and is DELIVERED
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { review: true },
  });

  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  if (order.buyerId !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (order.status !== "DELIVERED") return NextResponse.json({ error: "Order not delivered yet" }, { status: 400 });
  if (order.review) return NextResponse.json({ error: "Review already submitted" }, { status: 400 });

  const review = await prisma.review.create({
    data: {
      buyerId: user.id,
      shopId: order.shopId,
      orderId,
      rating,
      body: reviewBody?.trim() || null,
      photos: (photos ?? []).filter((p: string) => p.trim()),
      isApproved: true,
    },
    include: {
      buyer: { select: { name: true, avatar: true } },
    },
  });

  // Update shop rating avg
  const shopReviews = await prisma.review.findMany({
    where: { shopId: order.shopId, isApproved: true },
    select: { rating: true },
  });
  const avg = shopReviews.reduce((s, r) => s + r.rating, 0) / shopReviews.length;
  await prisma.shop.update({
    where: { id: order.shopId },
    data: { ratingAvg: Math.round(avg * 10) / 10 },
  });

  // Notify seller
  await prisma.notification.create({
    data: {
      userId: (await prisma.shop.findUnique({ where: { id: order.shopId }, select: { ownerId: true } }))!.ownerId,
      type: "REVIEW_NEW",
      title: "New Review Received",
      body: `${user.name ?? "A buyer"} left a ${rating}-star review on your shop.`,
      link: "/seller/reviews",
    },
  });

  return NextResponse.json(review, { status: 201 });
}
