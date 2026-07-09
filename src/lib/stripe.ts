import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia",
});

export const PLATFORM_FEE_PERCENT = Number(process.env.PLATFORM_FEE_PERCENT ?? 2);

export function calcSellerPayout(subtotal: number): number {
  return subtotal * (1 - PLATFORM_FEE_PERCENT / 100);
}
