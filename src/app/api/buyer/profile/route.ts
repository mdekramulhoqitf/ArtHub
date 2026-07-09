import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as any).id as string;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      createdAt: true,
      _count: { select: { orders: true, wishlist: true, reviews: true, following: true } },
    },
  });

  return NextResponse.json(user);
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as any).id as string;

  const { name, avatar } = await req.json();
  const updated = await prisma.user.update({
    where: { id: userId },
    data: {
      ...(name?.trim() ? { name: name.trim() } : {}),
      ...(avatar !== undefined ? { avatar } : {}),
    },
    select: { id: true, name: true, email: true, avatar: true },
  });

  return NextResponse.json(updated);
}
