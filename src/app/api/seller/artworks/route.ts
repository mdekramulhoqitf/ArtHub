import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function getShop(userId: string) {
  return prisma.shop.findUnique({ where: { ownerId: userId }, select: { id: true, isApproved: true } });
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
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id as string;
  const shop = await getShop(userId);
  if (!shop) return NextResponse.json({ error: "No shop" }, { status: 404 });

  const { searchParams } = new URL(req.url);
  const statusFilter = searchParams.get("status");

  const artworks = await prisma.artwork.findMany({
    where: {
      shopId: shop.id,
      ...(statusFilter ? { status: statusFilter as any } : {}),
    },
    orderBy: { createdAt: "desc" },
    include: {
      images: { orderBy: { displayOrder: "asc" } },
      categories: { include: { category: true } },
      mediums: { include: { medium: true } },
      _count: { select: { wishlist: true, orderItems: true } },
    },
  });

  return NextResponse.json(artworks);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id as string;
  const shop = await getShop(userId);
  if (!shop) return NextResponse.json({ error: "No shop" }, { status: 404 });

  const body = await req.json();
  const {
    title, description, price, status,
    editionType, editionCount, stockQuantity,
    widthCm, heightCm, depthCm, yearCreated,
    tags, imageUrls, categoryNames, mediumNames,
  } = body;

  if (!title?.trim()) return NextResponse.json({ error: "Title required" }, { status: 400 });
  if (!price || isNaN(Number(price)) || Number(price) <= 0) return NextResponse.json({ error: "Valid price required" }, { status: 400 });

  let slug = slugify(title);
  const exists = await prisma.artwork.findUnique({ where: { slug } });
  if (exists) slug = `${slug}-${Date.now()}`;

  // Upsert categories
  const categoryIds: string[] = [];
  for (const name of (categoryNames ?? []) as string[]) {
    const cat = await prisma.category.upsert({
      where: { slug: slugify(name) },
      create: { name, slug: slugify(name) },
      update: {},
    });
    categoryIds.push(cat.id);
  }

  // Upsert mediums
  const mediumIds: string[] = [];
  for (const name of (mediumNames ?? []) as string[]) {
    const med = await prisma.medium.upsert({
      where: { slug: slugify(name) },
      create: { name, slug: slugify(name) },
      update: {},
    });
    mediumIds.push(med.id);
  }

  const artwork = await prisma.artwork.create({
    data: {
      shopId: shop.id,
      sellerId: userId,
      title: title.trim(),
      slug,
      description: description?.trim() || null,
      price: Number(price),
      currency: "BDT",
      status: status ?? "DRAFT",
      editionType: editionType ?? "ORIGINAL",
      editionCount: editionCount ? Number(editionCount) : null,
      stockQuantity: stockQuantity ? Number(stockQuantity) : 1,
      widthCm: widthCm ? Number(widthCm) : null,
      heightCm: heightCm ? Number(heightCm) : null,
      depthCm: depthCm ? Number(depthCm) : null,
      yearCreated: yearCreated ? Number(yearCreated) : null,
      tags: tags ?? [],
      images: {
        create: (imageUrls ?? []).map((url: string, i: number) => ({
          url,
          isPrimary: i === 0,
          displayOrder: i,
        })),
      },
      categories: {
        create: categoryIds.map(categoryId => ({ categoryId })),
      },
      mediums: {
        create: mediumIds.map(mediumId => ({ mediumId })),
      },
    },
    include: {
      images: true,
      categories: { include: { category: true } },
      mediums: { include: { medium: true } },
    },
  });

  // Notify followers if artwork is published (ACTIVE)
  if ((status ?? "DRAFT") === "ACTIVE") {
    const followers = await prisma.follow.findMany({
      where: { shopId: shop.id },
      select: { buyerId: true },
    });
    if (followers.length > 0) {
      const shopInfo = await prisma.shop.findUnique({ where: { id: shop.id }, select: { displayName: true, slug: true } });
      await prisma.notification.createMany({
        data: followers.map((f) => ({
          userId: f.buyerId,
          type: "ARTWORK_FEATURED" as const,
          title: `New artwork by ${shopInfo?.displayName}`,
          body: `"${title.trim()}" was just published — check it out!`,
          link: `/artwork/${artwork.slug}`,
        })),
        skipDuplicates: true,
      });
    }
  }

  return NextResponse.json(artwork, { status: 201 });
}
