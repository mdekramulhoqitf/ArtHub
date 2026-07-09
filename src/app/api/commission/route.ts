import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST /api/commission — buyer creates a commission request
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const body = await req.json();
  const { shopSlug, title, description, category, budgetMin, budgetMax, deadline, widthCm, heightCm, referenceImages } = body;

  if (!shopSlug || !title || !description) {
    return NextResponse.json({ error: "shopSlug, title, description required" }, { status: 400 });
  }

  const shop = await prisma.shop.findUnique({ where: { slug: shopSlug } });
  if (!shop) return NextResponse.json({ error: "Shop not found" }, { status: 404 });
  if (!shop.isApproved) return NextResponse.json({ error: "Shop not active" }, { status: 400 });

  // Prevent artist from commissioning own shop
  if (shop.ownerId === user.id) {
    return NextResponse.json({ error: "Cannot commission your own shop" }, { status: 400 });
  }

  const commission = await prisma.commissionRequest.create({
    data: {
      buyerId: user.id,
      shopId: shop.id,
      title: title.trim(),
      description: description.trim(),
      category: category || null,
      budgetMin: budgetMin ? parseFloat(budgetMin) : null,
      budgetMax: budgetMax ? parseFloat(budgetMax) : null,
      deadline: deadline ? new Date(deadline) : null,
      widthCm: widthCm ? parseFloat(widthCm) : null,
      heightCm: heightCm ? parseFloat(heightCm) : null,
      referenceImages: referenceImages ?? [],
    },
    include: { shop: { select: { displayName: true, slug: true } } },
  });

  // Notify shop owner
  await prisma.notification.create({
    data: {
      userId: shop.ownerId,
      type: "COMMISSION_NEW",
      title: "New Commission Request",
      body: `${user.name ?? "Someone"} sent you a commission request: "${title}"`,
      link: `/seller/commissions`,
    },
  });

  return NextResponse.json(commission, { status: 201 });
}

// GET /api/commission — buyer gets their own commission requests
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const commissions = await prisma.commissionRequest.findMany({
    where: { buyerId: user.id },
    include: {
      shop: { select: { displayName: true, slug: true, logoUrl: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(commissions);
}
