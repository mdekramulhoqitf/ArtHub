import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/buyer/orders — buyer gets their own orders
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const orders = await prisma.order.findMany({
    where: { buyerId: user.id },
    include: {
      shop: { select: { displayName: true, slug: true, logoUrl: true } },
      items: {
        include: {
          artwork: { select: { title: true, images: { where: { isPrimary: true }, take: 1 } } },
        },
      },
      review: { select: { id: true, rating: true } },
      shippingAddress: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders);
}
