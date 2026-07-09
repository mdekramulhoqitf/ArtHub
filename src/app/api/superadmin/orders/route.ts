import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function isAuth(req: NextRequest) {
  return req.cookies.get("sa_session")?.value === "authenticated";
}

export async function GET(req: NextRequest) {
  if (!isAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const [orders, summary] = await Promise.all([
    prisma.order.findMany({
      where: status ? { status: status as any } : {},
      orderBy: { createdAt: "desc" },
      include: {
        buyer: { select: { name: true, email: true } },
        shop: { select: { displayName: true, slug: true } },
        items: { take: 1, select: { snapshotTitle: true } },
      },
    }),
    prisma.order.aggregate({
      where: { status: { in: ["PAID", "SHIPPED", "DELIVERED"] } },
      _sum: { subtotal: true, sellerPayout: true },
      _count: { id: true },
      _avg: { subtotal: true },
    }),
  ]);

  const gmv = Number(summary._sum.subtotal ?? 0);
  const fees = gmv - Number(summary._sum.sellerPayout ?? 0);

  return NextResponse.json({
    orders,
    summary: {
      gmv,
      fees,
      total: await prisma.order.count(),
      avgOrderValue: Number(summary._avg.subtotal ?? 0),
    },
  });
}
