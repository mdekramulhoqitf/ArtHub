import { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Fees & Pricing" };

const BUYER_FEES = [
  "No buyer fees — you pay only the listed price",
  "Free worldwide shipping on orders over $500",
  "Stripe-secured payments with full buyer protection",
  "Certificate of authenticity included free",
];

const SELLER_FEES = [
  "Free to open a shop — no monthly fee ever",
  "2% platform fee on each completed sale",
  "No listing fees — upload as many works as you like",
  "No fee on cancelled or refunded orders",
  "Stripe Connect payouts — 7 days after delivery",
];

const EXAMPLES = [
  { price: 200,  fee: 4,   payout: 196  },
  { price: 500,  fee: 10,  payout: 490  },
  { price: 1000, fee: 20,  payout: 980  },
  { price: 2500, fee: 50,  payout: 2450 },
  { price: 5000, fee: 100, payout: 4900 },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-[#1a1a2e] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-rose-400 mb-2">Transparent</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Fees & Pricing</h1>
          <p className="text-white/50 max-w-xl mx-auto">
            Simple, honest pricing. No surprises for buyers or sellers.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 space-y-16">

        {/* Two columns */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Buyers */}
          <div className="border border-gray-100 p-8">
            <div className="text-5xl font-black text-gray-100 font-heading mb-4">$0</div>
            <h2 className="font-heading text-2xl font-bold text-[#1a1a2e] mb-2">For Buyers</h2>
            <p className="text-sm text-gray-500 mb-6">No fees, no markup. You pay the artist&apos;s listed price.</p>
            <ul className="space-y-3">
              {BUYER_FEES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/browse" className="mt-8 inline-flex items-center gap-2 border border-[#1a1a2e] text-[#1a1a2e] px-6 py-2.5 text-sm font-semibold hover:bg-[#1a1a2e] hover:text-white transition-colors">
              Start Browsing <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Sellers */}
          <div className="border-2 border-rose-700 p-8 relative">
            <div className="absolute top-0 right-0 bg-rose-700 text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1">
              Artist Plan
            </div>
            <div className="text-5xl font-black text-rose-100 font-heading mb-4">2%</div>
            <h2 className="font-heading text-2xl font-bold text-[#1a1a2e] mb-2">For Sellers</h2>
            <p className="text-sm text-gray-500 mb-6">Only 2% per completed sale. Nothing else.</p>
            <ul className="space-y-3">
              {SELLER_FEES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/seller/shop/create" className="mt-8 inline-flex items-center gap-2 bg-rose-700 text-white px-6 py-2.5 text-sm font-semibold hover:bg-rose-800 transition-colors">
              Open Your Shop <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Payout examples */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-[#1a1a2e] mb-6">Payout Examples</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-[#1a1a2e]">
                  <th className="text-left py-3 pr-6 font-semibold text-gray-900">Sale Price</th>
                  <th className="text-left py-3 pr-6 font-semibold text-gray-900">Platform Fee (2%)</th>
                  <th className="text-left py-3 font-semibold text-gray-900">Your Payout</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {EXAMPLES.map((e) => (
                  <tr key={e.price} className="hover:bg-gray-50">
                    <td className="py-3.5 pr-6 text-gray-900 font-medium">${e.price.toLocaleString()}</td>
                    <td className="py-3.5 pr-6 text-gray-500">${e.fee}</td>
                    <td className="py-3.5 text-rose-700 font-bold">${e.payout.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-[#f5f2ea] border border-[#d8d3c5] p-8 space-y-6">
          <h2 className="font-heading text-xl font-bold text-[#1a1a2e]">Common Questions</h2>
          {[
            { q: "Are there any hidden fees?", a: "No. The 2% platform fee is the only charge. No listing fees, no monthly fees, no withdrawal fees." },
            { q: "What currency are prices in?", a: "All prices on ArtHub are in USD. Currency conversion happens automatically via Stripe for buyers paying in other currencies." },
            { q: "Does the 2% apply to refunded orders?", a: "No. If an order is refunded or cancelled before the payout is processed, no fee is charged." },
          ].map((faq) => (
            <div key={faq.q} className="border-t border-[#d8d3c5] pt-6 first:border-t-0 first:pt-0">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
