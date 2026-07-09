import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id as string;
  const shop = await prisma.shop.findUnique({ where: { ownerId: userId }, select: { id: true } });
  if (!shop) return NextResponse.json({ error: "No shop" }, { status: 404 });

  const { searchParams } = new URL(req.url);
  const statusFilter = searchParams.get("status");

  const orders = await prisma.order.findMany({
    where: {
      shopId: shop.id,
      ...(statusFilter ? { status: statusFilter as any } : {}),
    },
    orderBy: { createdAt: "desc" },
    include: {
      buyer: { select: { name: true, email: true, avatar: true } },
      items: {
        include: {
          artwork: { select: { title: true, images: { where: { isPrimary: true }, take: 1 } } },
        },
      },
      shippingAddress: true,
    },
  });

  return NextResponse.json(orders);
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id as string;
  const shop = await prisma.shop.findUnique({ where: { ownerId: userId }, select: { id: true } });
  if (!shop) return NextResponse.json({ error: "No shop" }, { status: 404 });

  const { id, status, trackingNumber } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const order = await prisma.order.findFirst({ where: { id, shopId: shop.id } });
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updated = await prisma.order.update({
    where: { id },
    data: {
      ...(status ? { status } : {}),
      ...(trackingNumber !== undefined ? { trackingNumber } : {}),
    },
  });

  return NextResponse.json(updated);
}
