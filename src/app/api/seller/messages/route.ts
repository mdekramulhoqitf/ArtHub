import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as any).id as string;

  const conversations = await prisma.conversation.findMany({
    where: { sellerId: userId },
    orderBy: { lastMessageAt: "desc" },
    include: {
      buyer: { select: { id: true, name: true, email: true, avatar: true } },
      messages: {
        orderBy: { createdAt: "asc" },
        include: { sender: { select: { id: true, name: true } } },
      },
    },
  });

  return NextResponse.json(conversations);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as any).id as string;

  const { conversationId, body } = await req.json();
  if (!conversationId || !body?.trim()) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const conv = await prisma.conversation.findUnique({ where: { id: conversationId } });
  if (!conv || conv.sellerId !== userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const [message] = await prisma.$transaction([
    prisma.message.create({
      data: { conversationId, senderId: userId, body: body.trim() },
      include: { sender: { select: { id: true, name: true } } },
    }),
    prisma.conversation.update({
      where: { id: conversationId },
      data: { lastMessageAt: new Date() },
    }),
  ]);

  return NextResponse.json(message, { status: 201 });
}
