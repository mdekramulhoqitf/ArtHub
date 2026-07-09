import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

function isAuth(req: NextRequest) {
  return req.cookies.get("sa_session")?.value === "authenticated";
}

const KEY = "announcements";

interface Announcement {
  id: string;
  message: string;
  type: string;
  active: boolean;
  createdAt: string;
}

async function readAnnouncements(): Promise<Announcement[]> {
  const row = await prisma.platformSetting.findUnique({ where: { key: KEY } });
  if (!row) return [];
  try { return JSON.parse(row.value); } catch { return []; }
}

async function writeAnnouncements(items: Announcement[]) {
  await prisma.platformSetting.upsert({
    where: { key: KEY },
    update: { value: JSON.stringify(items) },
    create: { key: KEY, value: JSON.stringify(items) },
  });
}

export async function GET(req: NextRequest) {
  if (!isAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await readAnnouncements());
}

export async function POST(req: NextRequest) {
  if (!isAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { message, type } = await req.json();
  if (!message?.trim()) return NextResponse.json({ error: "Missing message" }, { status: 400 });
  const items = await readAnnouncements();
  const newItem: Announcement = {
    id: randomUUID(),
    message: message.trim(),
    type: type ?? "promo",
    active: true,
    createdAt: new Date().toISOString(),
  };
  items.unshift(newItem);
  await writeAnnouncements(items);
  return NextResponse.json(newItem);
}

export async function PATCH(req: NextRequest) {
  if (!isAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const items = await readAnnouncements();
  const updated = items.map(a => a.id === id ? { ...a, active: !a.active } : a);
  await writeAnnouncements(updated);
  return NextResponse.json(updated.find(a => a.id === id));
}

export async function DELETE(req: NextRequest) {
  if (!isAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const items = await readAnnouncements();
  await writeAnnouncements(items.filter(a => a.id !== id));
  return NextResponse.json({ success: true });
}
