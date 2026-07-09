import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/commission/[id]
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const commission = await prisma.commissionRequest.findUnique({
    where: { id },
    include: {
      buyer: { select: { id: true, name: true, email: true, avatar: true } },
      shop: { select: { id: true, displayName: true, slug: true, logoUrl: true, ownerId: true } },
    },
  });

  if (!commission) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Only buyer or shop owner can view
  const isOwner = commission.shop.ownerId === user.id;
  const isBuyer = commission.buyerId === user.id;
  if (!isOwner && !isBuyer) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  return NextResponse.json(commission);
}

// PATCH /api/commission/[id] — artist accepts/rejects/quotes, buyer cancels
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const commission = await prisma.commissionRequest.findUnique({
    where: { id },
    include: { shop: { select: { ownerId: true } } },
  });
  if (!commission) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const isShopOwner = commission.shop.ownerId === user.id;
  const isBuyer = commission.buyerId === user.id;

  if (!isShopOwner && !isBuyer) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const { action, artistNote, quotedPrice, quotedDeadline } = body;

  let updateData: Record<string, unknown> = {};
  let notifType: string | null = null;
  let notifTitle = "";
  let notifBody = "";
  let notifUserId = "";

  if (isShopOwner) {
    if (action === "ACCEPT") {
      updateData = { status: "ACCEPTED", artistNote: artistNote ?? null };
      notifType = "COMMISSION_ACCEPTED";
      notifTitle = "Commission Accepted!";
      notifBody = `Your commission "${commission.title}" was accepted by the artist.`;
      notifUserId = commission.buyerId;
    } else if (action === "REJECT") {
      updateData = { status: "REJECTED", artistNote: artistNote ?? null };
      notifType = "COMMISSION_REJECTED";
      notifTitle = "Commission Declined";
      notifBody = `Your commission "${commission.title}" was declined.`;
      notifUserId = commission.buyerId;
    } else if (action === "QUOTE") {
      if (!quotedPrice) return NextResponse.json({ error: "quotedPrice required" }, { status: 400 });
      updateData = {
        status: "QUOTED",
        quotedPrice: parseFloat(quotedPrice),
        quotedDeadline: quotedDeadline ? new Date(quotedDeadline) : null,
        artistNote: artistNote ?? null,
      };
      notifType = "COMMISSION_QUOTED";
      notifTitle = "Commission Quoted";
      notifBody = `The artist sent a quote of ৳${parseFloat(quotedPrice).toLocaleString()} for "${commission.title}".`;
      notifUserId = commission.buyerId;
    } else if (action === "COMPLETE") {
      updateData = { status: "COMPLETED" };
    } else {
      return NextResponse.json({ error: "Invalid action for artist" }, { status: 400 });
    }
  } else if (isBuyer) {
    if (action === "CANCEL") {
      if (!["PENDING", "QUOTED", "ACCEPTED"].includes(commission.status)) {
        return NextResponse.json({ error: "Cannot cancel at this stage" }, { status: 400 });
      }
      updateData = { status: "CANCELLED" };
    } else {
      return NextResponse.json({ error: "Invalid action for buyer" }, { status: 400 });
    }
  }

  const updated = await prisma.commissionRequest.update({ where: { id }, data: updateData });

  if (notifType && notifUserId) {
    await prisma.notification.create({
      data: {
        userId: notifUserId,
        type: notifType as any,
        title: notifTitle,
        body: notifBody,
        link: `/buyer/commissions`,
      },
    });
  }

  return NextResponse.json(updated);
}
