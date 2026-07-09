import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}

async function getShopId(userId: string) {
  const shop = await prisma.shop.findUnique({ where: { ownerId: userId }, select: { id: true } });
  return shop?.id ?? null;
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id as string;
  const shopId = await getShopId(userId);
  if (!shopId) return NextResponse.json({ error: "No shop" }, { status: 404 });

  const { id } = await params;

  const artwork = await prisma.artwork.findFirst({
    where: { id, shopId },
    include: {
      images: { orderBy: { displayOrder: "asc" } },
      categories: { include: { category: true } },
      mediums: { include: { medium: true } },
    },
  });

  if (!artwork) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(artwork);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id as string;
  const shopId = await getShopId(userId);
  if (!shopId) return NextResponse.json({ error: "No shop" }, { status: 404 });

  const { id } = await params;

  const existing = await prisma.artwork.findFirst({ where: { id, shopId } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  const {
    title, description, price, status,
    editionType, editionCount, stockQuantity,
    widthCm, heightCm, depthCm, yearCreated,
    tags, imageUrls, categoryNames, mediumNames,
  } = body;

  if (title !== undefined && !title?.trim()) return NextResponse.json({ error: "Title required" }, { status: 400 });
  if (price !== undefined && (isNaN(Number(price)) || Number(price) <= 0)) return NextResponse.json({ error: "Valid price required" }, { status: 400 });

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

  const artwork = await prisma.$transaction(async tx => {
    // Delete old images/categories/mediums, replace
    if (imageUrls !== undefined) {
      await tx.artworkImage.deleteMany({ where: { artworkId: id } });
    }
    if (categoryNames !== undefined) {
      await tx.artworkCategory.deleteMany({ where: { artworkId: id } });
    }
    if (mediumNames !== undefined) {
      await tx.artworkMedium.deleteMany({ where: { artworkId: id } });
    }

    return tx.artwork.update({
      where: { id },
      data: {
        ...(title !== undefined ? { title: title.trim() } : {}),
        ...(description !== undefined ? { description: description?.trim() || null } : {}),
        ...(price !== undefined ? { price: Number(price) } : {}),
        ...(status !== undefined ? { status } : {}),
        ...(editionType !== undefined ? { editionType } : {}),
        ...(editionCount !== undefined ? { editionCount: editionCount ? Number(editionCount) : null } : {}),
        ...(stockQuantity !== undefined ? { stockQuantity: Number(stockQuantity) } : {}),
        ...(widthCm !== undefined ? { widthCm: widthCm ? Number(widthCm) : null } : {}),
        ...(heightCm !== undefined ? { heightCm: heightCm ? Number(heightCm) : null } : {}),
        ...(depthCm !== undefined ? { depthCm: depthCm ? Number(depthCm) : null } : {}),
        ...(yearCreated !== undefined ? { yearCreated: yearCreated ? Number(yearCreated) : null } : {}),
        ...(tags !== undefined ? { tags } : {}),
        ...(imageUrls !== undefined ? {
          images: {
            create: (imageUrls as string[]).map((url, i) => ({
              url, isPrimary: i === 0, displayOrder: i,
            })),
          },
        } : {}),
        ...(categoryNames !== undefined ? {
          categories: { create: categoryIds.map(categoryId => ({ categoryId })) },
        } : {}),
        ...(mediumNames !== undefined ? {
          mediums: { create: mediumIds.map(mediumId => ({ mediumId })) },
        } : {}),
      },
      include: {
        images: { orderBy: { displayOrder: "asc" } },
        categories: { include: { category: true } },
        mediums: { include: { medium: true } },
      },
    });
  });

  return NextResponse.json(artwork);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id as string;
  const shopId = await getShopId(userId);
  if (!shopId) return NextResponse.json({ error: "No shop" }, { status: 404 });

  const { id } = await params;

  const existing = await prisma.artwork.findFirst({ where: { id, shopId } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.artwork.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
