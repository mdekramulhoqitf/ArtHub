import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

function isAuth(req: NextRequest) {
  return req.cookies.get("sa_session")?.value === "authenticated";
}

const KEY = "banners";

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  link: string;
  active: boolean;
}

async function readBanners(): Promise<Banner[]> {
  const row = await prisma.platformSetting.findUnique({ where: { key: KEY } });
  if (!row) return [];
  try { return JSON.parse(row.value); } catch { return []; }
}

async function writeBanners(banners: Banner[]) {
  await prisma.platformSetting.upsert({
    where: { key: KEY },
    update: { value: JSON.stringify(banners) },
    create: { key: KEY, value: JSON.stringify(banners) },
  });
}

export async function GET(req: NextRequest) {
  if (!isAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await readBanners());
}

export async function POST(req: NextRequest) {
  if (!isAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { title, subtitle, imageUrl, link } = await req.json();
  if (!title || !imageUrl) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  const banners = await readBanners();
  const newBanner: Banner = { id: randomUUID(), title, subtitle: subtitle ?? "", imageUrl, link: link ?? "/browse", active: true };
  banners.push(newBanner);
  await writeBanners(banners);
  return NextResponse.json(newBanner);
}

export async function PATCH(req: NextRequest) {
  if (!isAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const banners = await readBanners();
  const updated = banners.map(b => b.id === id ? { ...b, active: !b.active } : b);
  await writeBanners(updated);
  return NextResponse.json(updated.find(b => b.id === id));
}

export async function DELETE(req: NextRequest) {
  if (!isAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const banners = await readBanners();
  await writeBanners(banners.filter(b => b.id !== id));
  return NextResponse.json({ success: true });
}
