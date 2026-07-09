import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function isAuth(req: NextRequest) {
  return req.cookies.get("sa_session")?.value === "authenticated";
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET(req: NextRequest) {
  if (!isAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [shops, usersWithoutShop] = await Promise.all([
    prisma.shop.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        owner: { select: { id: true, name: true, email: true, avatar: true } },
        _count: { select: { artworks: true, orders: true } },
      },
    }),
    prisma.user.findMany({
      where: { shop: null },
      select: { id: true, name: true, email: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return NextResponse.json({ shops, usersWithoutShop });
}

export async function POST(req: NextRequest) {
  if (!isAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { ownerId, displayName, location, bio, websiteUrl, instagramUrl, isApproved } = await req.json();

  if (!ownerId || !displayName) {
    return NextResponse.json({ error: "ownerId and displayName required" }, { status: 400 });
  }

  const existing = await prisma.shop.findUnique({ where: { ownerId } });
  if (existing) {
    return NextResponse.json({ error: "User already has a shop" }, { status: 409 });
  }

  let slug = slugify(displayName);
  const slugExists = await prisma.shop.findUnique({ where: { slug } });
  if (slugExists) slug = `${slug}-${Date.now()}`;

  const [shop] = await prisma.$transaction([
    prisma.shop.create({
      data: {
        ownerId,
        slug,
        displayName,
        location: location || null,
        bio: bio || null,
        websiteUrl: websiteUrl || null,
        instagramUrl: instagramUrl || null,
        isApproved: isApproved ?? true,
      },
      include: {
        owner: { select: { id: true, name: true, email: true, avatar: true } },
        _count: { select: { artworks: true, orders: true } },
      },
    }),
    prisma.user.update({ where: { id: ownerId }, data: { role: "SELLER" } }),
  ]);

  return NextResponse.json(shop, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  if (!isAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, action } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  if (action === "approve") {
    const shop = await prisma.shop.update({ where: { id }, data: { isApproved: true } });
    await prisma.user.update({ where: { id: shop.ownerId }, data: { role: "SELLER" } });
    return NextResponse.json(shop);
  }
  if (action === "reject") {
    const shop = await prisma.shop.update({ where: { id }, data: { isApproved: false } });
    return NextResponse.json(shop);
  }
  if (action === "toggleFeatured") {
    const current = await prisma.shop.findUnique({ where: { id }, select: { isFeatured: true } });
    if (!current) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const shop = await prisma.shop.update({ where: { id }, data: { isFeatured: !current.isFeatured } });
    return NextResponse.json(shop);
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
