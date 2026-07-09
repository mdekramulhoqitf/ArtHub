import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/follow?shopSlug=xxx — check if current user follows this shop
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ following: false });

  const { searchParams } = new URL(req.url);
  const shopSlug = searchParams.get("shopSlug");
  if (!shopSlug) return NextResponse.json({ error: "shopSlug required" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ following: false });

  const shop = await prisma.shop.findUnique({ where: { slug: shopSlug }, select: { id: true, _count: { select: { followers: true } } } });
  if (!shop) return NextResponse.json({ following: false });

  const follow = await prisma.follow.findUnique({
    where: { buyerId_shopId: { buyerId: user.id, shopId: shop.id } },
  });

  return NextResponse.json({ following: !!follow, followerCount: shop._count.followers });
}

// POST /api/follow — follow a shop
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { shopSlug } = await req.json();
  if (!shopSlug) return NextResponse.json({ error: "shopSlug required" }, { status: 400 });

  const shop = await prisma.shop.findUnique({ where: { slug: shopSlug }, select: { id: true, ownerId: true, _count: { select: { followers: true } } } });
  if (!shop) return NextResponse.json({ error: "Shop not found" }, { status: 404 });
  if (shop.ownerId === user.id) return NextResponse.json({ error: "Cannot follow own shop" }, { status: 400 });

  await prisma.follow.upsert({
    where: { buyerId_shopId: { buyerId: user.id, shopId: shop.id } },
    update: {},
    create: { buyerId: user.id, shopId: shop.id },
  });

  const followerCount = await prisma.follow.count({ where: { shopId: shop.id } });
  return NextResponse.json({ following: true, followerCount });
}

// DELETE /api/follow — unfollow a shop
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { shopSlug } = await req.json();
  const shop = await prisma.shop.findUnique({ where: { slug: shopSlug }, select: { id: true } });
  if (!shop) return NextResponse.json({ error: "Shop not found" }, { status: 404 });

  await prisma.follow.deleteMany({
    where: { buyerId: user.id, shopId: shop.id },
  });

  const followerCount = await prisma.follow.count({ where: { shopId: shop.id } });
  return NextResponse.json({ following: false, followerCount });
}
