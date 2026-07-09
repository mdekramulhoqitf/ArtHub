import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function isAuth(req: NextRequest) {
  return req.cookies.get("sa_session")?.value === "authenticated";
}

export async function GET(req: NextRequest) {
  if (!isAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [
    totalUsers,
    activeShops,
    pendingShops,
    artworkCount,
    totalOrders,
    revenueResult,
    feeResult,
    pendingShopList,
    recentOrders,
    usersByRole,
    ordersByStatus,
    newUsersThisMonth,
    newShopsThisMonth,
    newOrdersThisWeek,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.shop.count({ where: { isApproved: true } }),
    prisma.shop.count({ where: { isApproved: false } }),
    prisma.artwork.count(),
    prisma.order.count(),

    // GMV: subtotal of paid/shipped/delivered
    prisma.order.aggregate({
      where: { status: { in: ["PAID", "SHIPPED", "DELIVERED"] } },
      _sum: { subtotal: true },
    }),

    // Platform fees = subtotal - sellerPayout
    prisma.order.findMany({
      where: { status: { in: ["PAID", "SHIPPED", "DELIVERED"] } },
      select: { subtotal: true, sellerPayout: true },
    }),

    // Pending shops with owner info
    prisma.shop.findMany({
      where: { isApproved: false },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        owner: { select: { name: true, email: true } },
        _count: { select: { artworks: true } },
      },
    }),

    // Recent orders
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      include: {
        buyer: { select: { name: true, email: true } },
        shop: { select: { displayName: true } },
        items: { take: 1, select: { snapshotTitle: true } },
      },
    }),

    prisma.user.groupBy({ by: ["role"], _count: { role: true } }),
    prisma.order.groupBy({ by: ["status"], _count: { status: true } }),

    prisma.user.count({
      where: { createdAt: { gte: new Date(new Date().setDate(1)) } },
    }),
    prisma.shop.count({
      where: { createdAt: { gte: new Date(new Date().setDate(1)) } },
    }),
    prisma.order.count({
      where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
    }),
  ]);

  const gmv = Number(revenueResult._sum.subtotal ?? 0);
  const totalFees = feeResult.reduce((sum, o) => sum + (Number(o.subtotal) - Number(o.sellerPayout)), 0);

  return NextResponse.json({
    stats: {
      totalUsers,
      activeShops,
      pendingShops,
      artworkCount,
      totalOrders,
      gmv,
      totalFees,
      newUsersThisMonth,
      newShopsThisMonth,
      newOrdersThisWeek,
    },
    pendingShopList,
    recentOrders,
    usersByRole: Object.fromEntries(usersByRole.map(r => [r.role, r._count.role])),
    ordersByStatus: Object.fromEntries(ordersByStatus.map(r => [r.status, r._count.status])),
  });
}
