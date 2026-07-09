import { Metadata } from "next";
import Link from "next/link";
import { Search, ShoppingBag, Package, Star, Store, Upload, CreditCard, ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "How It Works" };

const BUYER_STEPS = [
  { icon: Search,      step: "01", title: "Browse & Discover",   desc: "Search thousands of original artworks by style, medium, price, and size. Filter by category or explore curated collections." },
  { icon: ShoppingBag, step: "02", title: "Buy Directly",        desc: "Purchase directly from the artist with no gallery markup. Payment is secured by Stripe with full buyer protection." },
  { icon: Package,     step: "03", title: "Artwork Ships to You", desc: "The artist packs your artwork professionally and ships it to your door, fully insured. Track it every step of the way." },
  { icon: Star,        step: "04", title: "Own Something Real",  desc: "Receive your artwork with a signed certificate of authenticity. Leave a review to support the artist." },
];

const SELLER_STEPS = [
  { icon: Store,       step: "01", title: "Open Your Free Shop",  desc: "Create your seller account and set up your shop in minutes. Choose your shop name, add a bio, and you're ready." },
  { icon: Upload,      step: "02", title: "List Your Artworks",   desc: "Upload photos, add dimensions, medium, and price. Set your own shipping rates and regions." },
  { icon: ShoppingBag, step: "03", title: "Receive Orders",       desc: "When a buyer purchases your work, you'll receive an email and dashboard notification. Pack the artwork securely and ship." },
  { icon: CreditCard,  step: "04", title: "Get Paid",             desc: "Payouts are processed via Stripe Connect 7 days after delivery. Only 2% platform fee — no other charges." },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-[#1a1a2e] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-rose-400 mb-2">Simple Process</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-5">How ArtHub Works</h1>
          <p className="text-white/50 max-w-xl mx-auto text-lg leading-relaxed">
            Whether you&apos;re buying original art or selling yours, ArtHub makes it straightforward.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-20 space-y-24">

        {/* Buyers */}
        <div>
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-gray-100" />
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-1">Collectors</p>
              <h2 className="font-heading text-3xl font-bold text-[#1a1a2e]">Buying on ArtHub</h2>
            </div>
            <div className="h-px flex-1 bg-gray-100" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BUYER_STEPS.map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="relative">
                <div className="absolute -top-3 -left-3 text-[80px] font-black text-gray-100 font-heading leading-none select-none pointer-events-none">
                  {step}
                </div>
                <div className="relative pt-8 pl-2">
                  <div className="w-12 h-12 bg-rose-700 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/browse" className="inline-flex items-center gap-2 bg-rose-700 text-white px-8 py-3.5 text-sm font-semibold hover:bg-rose-800 transition-colors">
              Start Browsing <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Sellers */}
        <div>
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-gray-100" />
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-1">Artists</p>
              <h2 className="font-heading text-3xl font-bold text-[#1a1a2e]">Selling on ArtHub</h2>
            </div>
            <div className="h-px flex-1 bg-gray-100" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SELLER_STEPS.map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="relative">
                <div className="absolute -top-3 -left-3 text-[80px] font-black text-gray-100 font-heading leading-none select-none pointer-events-none">
                  {step}
                </div>
                <div className="relative pt-8 pl-2">
                  <div className="w-12 h-12 bg-[#1a1a2e] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/seller/shop/create" className="inline-flex items-center gap-2 border-2 border-[#1a1a2e] text-[#1a1a2e] px-8 py-3.5 text-sm font-semibold hover:bg-[#1a1a2e] hover:text-white transition-colors">
              Open Your Shop — Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Trust strip */}
        <div className="bg-[#f5f2ea] border border-[#d8d3c5] p-10">
          <h2 className="font-heading text-2xl font-bold text-[#1a1a2e] text-center mb-8">Why ArtHub?</h2>
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              { stat: "2%", label: "Platform fee — the lowest in the market" },
              { stat: "12,000+", label: "Collectors worldwide" },
              { stat: "100%", label: "Original art — no fakes, no reproductions" },
            ].map(({ stat, label }) => (
              <div key={stat}>
                <p className="font-heading text-4xl font-bold text-rose-700 mb-2">{stat}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
