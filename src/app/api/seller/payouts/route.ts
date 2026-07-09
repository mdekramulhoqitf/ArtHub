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

  const orders = await prisma.order.findMany({
    where: { shopId: shop.id, status: { in: ["PAID", "SHIPPED", "DELIVERED"] } },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      status: true,
      sellerPayout: true,
      subtotal: true,
      platformFeePercent: true,
      createdAt: true,
      stripeTransferId: true,
      items: {
        select: {
          snapshotTitle: true,
          quantity: true,
          unitPrice: true,
        },
      },
    },
  });

  const totalEarned = orders.reduce((s, o) => s + Number(o.sellerPayout), 0);
  const paid = orders.filter(o => o.stripeTransferId);
  const pending = orders.filter(o => !o.stripeTransferId);
  const totalPaid = paid.reduce((s, o) => s + Number(o.sellerPayout), 0);
  const totalPending = pending.reduce((s, o) => s + Number(o.sellerPayout), 0);

  return NextResponse.json({ orders, totalEarned, totalPaid, totalPending });
}
