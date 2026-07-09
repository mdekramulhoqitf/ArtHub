import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/seller/commissions — seller sees all commission requests for their shop
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { shop: { select: { id: true } } },
  });

  if (!user?.shop) return NextResponse.json({ error: "No shop found" }, { status: 404 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const commissions = await prisma.commissionRequest.findMany({
    where: {
      shopId: user.shop.id,
      ...(status && status !== "ALL" ? { status: status as any } : {}),
    },
    include: {
      buyer: { select: { id: true, name: true, email: true, avatar: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(commissions);
}
