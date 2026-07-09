import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id as string;

  const existing = await prisma.shop.findUnique({ where: { ownerId: userId } });
  if (existing) return NextResponse.json({ error: "Already has a shop" }, { status: 409 });

  const { displayName, location, bio, websiteUrl, instagramUrl } = await req.json();
  if (!displayName?.trim()) return NextResponse.json({ error: "Shop name required" }, { status: 400 });

  let slug = slugify(displayName);
  const slugExists = await prisma.shop.findUnique({ where: { slug } });
  if (slugExists) slug = `${slug}-${Date.now()}`;

  const shop = await prisma.shop.create({
    data: {
      ownerId: userId,
      slug,
      displayName: displayName.trim(),
      location: location?.trim() || null,
      bio: bio?.trim() || null,
      websiteUrl: websiteUrl?.trim() || null,
      instagramUrl: instagramUrl?.trim() || null,
      isApproved: false,
    },
  });

  return NextResponse.json(shop, { status: 201 });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id as string;
  const shop = await prisma.shop.findUnique({ where: { ownerId: userId } });
  return NextResponse.json(shop ?? null);
}
