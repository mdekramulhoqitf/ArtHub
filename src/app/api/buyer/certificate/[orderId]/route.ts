import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ orderId: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const buyerId = (session.user as any).id as string;

  const { orderId } = await params;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      buyer: { select: { name: true, email: true } },
      shop: { select: { displayName: true } },
      items: {
        take: 1,
        include: {
          artwork: {
            select: {
              title: true,
              mediums: { include: { medium: true } },
              widthCm: true,
              heightCm: true,
              yearCreated: true,
              editionType: true,
            },
          },
        },
      },
    },
  });

  if (!order || order.buyerId !== buyerId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (order.status !== "DELIVERED") {
    return NextResponse.json({ error: "Order not yet delivered" }, { status: 400 });
  }

  const item = order.items[0];
  const art = item?.artwork;

  const dimensions =
    art?.widthCm && art?.heightCm
      ? `${art.widthCm} × ${art.heightCm} cm`
      : null;

  const medium = art?.mediums[0]?.medium?.name ?? null;

  return NextResponse.json({
    orderId: order.id,
    artworkTitle: item?.snapshotTitle ?? art?.title ?? "Unknown",
    artistName: order.shop.displayName,
    shopName: order.shop.displayName,
    medium,
    dimensions,
    yearCreated: art?.yearCreated ?? null,
    price: Number(order.subtotal),
    currency: "BDT",
    editionType: art?.editionType ?? "ORIGINAL",
    purchaseDate: order.createdAt.toISOString(),
    buyerName: order.buyer.name ?? order.buyer.email,
  });
}
