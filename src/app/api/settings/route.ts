import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const PUBLIC_KEYS = ["platform_fee", "site_name", "site_tagline", "promo_bar", "min_price", "max_price"];

const DEFAULTS: Record<string, string> = {
  platform_fee: "2",
  site_name: "ArtHub",
  site_tagline: "Buy & Sell Original Art",
  promo_bar: "Free worldwide shipping on orders over BDT 15,000 · 2% platform fee only",
  min_price: "500",
  max_price: "500000",
};

export async function GET() {
  const rows = await prisma.platformSetting.findMany({ where: { key: { in: PUBLIC_KEYS } } });
  const result: Record<string, string> = { ...DEFAULTS };
  for (const row of rows) result[row.key] = row.value;
  return NextResponse.json(result);
}
