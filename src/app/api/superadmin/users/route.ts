import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function isAuth(req: NextRequest) {
  return req.cookies.get("sa_session")?.value === "authenticated";
}

export async function GET(req: NextRequest) {
  if (!isAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isBanned: true,
      createdAt: true,
      avatar: true,
      shop: { select: { displayName: true, slug: true, totalSales: true, isApproved: true } },
      _count: { select: { orders: true } },
    },
  });

  return NextResponse.json(users);
}

export async function PATCH(req: NextRequest) {
  if (!isAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, action, role } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  if (action === "ban") {
    const user = await prisma.user.update({ where: { id }, data: { isBanned: true } });
    return NextResponse.json(user);
  }
  if (action === "unban") {
    const user = await prisma.user.update({ where: { id }, data: { isBanned: false } });
    return NextResponse.json(user);
  }
  if (action === "setRole" && role) {
    const user = await prisma.user.update({ where: { id }, data: { role } });
    return NextResponse.json(user);
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
