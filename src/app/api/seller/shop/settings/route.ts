import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as any).id as string;

  const shop = await prisma.shop.findUnique({
    where: { ownerId: userId },
    include: { owner: { select: { name: true, email: true, avatar: true } } },
  });
  if (!shop) return NextResponse.json({ error: "No shop" }, { status: 404 });

  return NextResponse.json(shop);
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as any).id as string;

  const shop = await prisma.shop.findUnique({ where: { ownerId: userId }, select: { id: true } });
  if (!shop) return NextResponse.json({ error: "No shop" }, { status: 404 });

  const { displayName, bio, location, websiteUrl, instagramUrl, logoUrl, bannerUrl } = await req.json();

  if (displayName !== undefined && !displayName?.trim()) {
    return NextResponse.json({ error: "Shop name cannot be empty" }, { status: 400 });
  }

  const updated = await prisma.shop.update({
    where: { id: shop.id },
    data: {
      ...(displayName !== undefined ? { displayName: displayName.trim() } : {}),
      ...(bio !== undefined ? { bio: bio?.trim() || null } : {}),
      ...(location !== undefined ? { location: location?.trim() || null } : {}),
      ...(websiteUrl !== undefined ? { websiteUrl: websiteUrl?.trim() || null } : {}),
      ...(instagramUrl !== undefined ? { instagramUrl: instagramUrl?.trim() || null } : {}),
      ...(logoUrl !== undefined ? { logoUrl: logoUrl?.trim() || null } : {}),
      ...(bannerUrl !== undefined ? { bannerUrl: bannerUrl?.trim() || null } : {}),
    },
  });

  return NextResponse.json(updated);
}
