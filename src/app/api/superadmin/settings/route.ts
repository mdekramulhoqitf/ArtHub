import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function isAuth(req: NextRequest) {
  return req.cookies.get("sa_session")?.value === "authenticated";
}

const KEYS = [
  "site_name",
  "site_tagline",
  "promo_bar",
  "platform_fee",
  "maintenance_mode",
  "new_registrations",
  "auto_approve_shops",
  "min_price",
  "max_price",
];

const DEFAULTS: Record<string, string> = {
  site_name: "ArtHub",
  site_tagline: "Buy & Sell Original Art",
  promo_bar: "Free worldwide shipping on orders over BDT 15,000 · 2% platform fee only",
  platform_fee: "2",
  maintenance_mode: "false",
  new_registrations: "true",
  auto_approve_shops: "false",
  min_price: "500",
  max_price: "500000",
};

export async function GET(req: NextRequest) {
  if (!isAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const rows = await prisma.platformSetting.findMany({ where: { key: { in: KEYS } } });
  const result: Record<string, string> = { ...DEFAULTS };
  for (const row of rows) result[row.key] = row.value;
  return NextResponse.json(result);
}

export async function PUT(req: NextRequest) {
  if (!isAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const ops = KEYS
    .filter(k => body[k] !== undefined)
    .map(k =>
      prisma.platformSetting.upsert({
        where: { key: k },
        update: { value: String(body[k]) },
        create: { key: k, value: String(body[k]) },
      })
    );
  await Promise.all(ops);
  return NextResponse.json({ success: true });
}
