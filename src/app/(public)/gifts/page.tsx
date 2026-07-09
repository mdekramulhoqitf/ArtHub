import Link from "next/link";
import Image from "next/image";
import { Gift, ArrowRight, Heart, Star, Package } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const OCCASIONS = [
  { emoji: "💍", label: "Wedding Gift", collection: "under-5000", desc: "Original art as a lasting wedding gift — something the couple will treasure for decades." },
  { emoji: "🎂", label: "Birthday", collection: "new-arrivals", desc: "Celebrate someone special with a one-of-a-kind original artwork just for them." },
  { emoji: "🏠", label: "Housewarming", collection: "landscapes", desc: "Help them transform a house into a home with art that tells a story of their space." },
  { emoji: "🎓", label: "Graduation", collection: "abstract", desc: "Mark a milestone with a piece that inspires ambition and celebrates achievement." },
  { emoji: "💼", label: "Corporate Gift", collection: "home-office", desc: "Impress clients and partners with thoughtful, culturally meaningful original art." },
  { emoji: "❤️", label: "Anniversary", collection: "gift-ideas", desc: "Express love and commitment with an artwork that grows more meaningful with time." },
];

const PRICE_GUIDES = [
  { label: "Under ৳3,000", desc: "Prints, small originals", slug: "under-5000", image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600" },
  { label: "৳3,000 – ৳10,000", desc: "Medium originals, watercolors", slug: "watercolor", image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600" },
  { label: "৳10,000 – ৳30,000", desc: "Large originals, statement pieces", slug: "landscapes", image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600" },
  { label: "৳30,000+", desc: "Investment-grade, collector works", slug: "large-format", image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600" },
];

const TOP_GIFTS = [
  { title: "Golden Sunset", artist: "Rana Begum", price: 4500, image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600", slug: "golden-sunset", badge: "Best Seller" },
  { title: "Quiet Harbor", artist: "Studio Lumi", price: 4800, image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600", slug: "quiet-harbor", badge: "Most Gifted" },
  { title: "Blue Serenity", artist: "Art by Nadia", price: 3200, image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600", slug: "blue-serenity", badge: "Under ৳5K" },
  { title: "Abstract Thoughts", artist: "Studio Lumi", price: 5600, image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600", slug: "abstract-thoughts", badge: "Trending" },
];

export default function GiftsPage() {
  return (
    <div className="min-h-screen bg-[#f5f2ea]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-rose-700 to-[#1a1a2e] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gift className="w-6 h-6 text-rose-300" />
            <span className="text-rose-300 font-semibold text-sm uppercase tracking-widest">Art as a Gift</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Give Something That Lasts Forever</h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            Original art is the gift that never becomes outdated — it grows more meaningful with every passing year. Find the perfect piece for every occasion.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* By occasion */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">Shop by Occasion</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {OCCASIONS.map((o) => (
              <Link key={o.label} href={`/collections/${o.collection}`} className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:border-rose-100 transition-all">
                <div className="text-3xl mb-3">{o.emoji}</div>
                <p className="font-semibold text-gray-900 mb-1 group-hover:text-rose-700 transition-colors">{o.label}</p>
                <p className="text-gray-400 text-xs leading-relaxed mb-3">{o.desc}</p>
                <span className="flex items-center gap-1 text-rose-600 text-xs font-semibold">
                  Browse gifts <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Top gift picks */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" /> Most Gifted Artworks
            </h2>
            <Link href="/browse" className="text-sm text-rose-600 hover:underline">See all</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TOP_GIFTS.map((art) => (
              <Link key={art.slug} href={`/artwork/${art.slug}`} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all block">
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Image src={art.image} alt={art.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="25vw" />
                  <div className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{art.badge}</div>
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-400">{art.artist}</p>
                  <p className="font-semibold text-gray-900 text-sm group-hover:text-rose-700 transition-colors mt-0.5">{art.title}</p>
                  <p className="font-bold text-rose-600 mt-1">{formatPrice(art.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* By price */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">Shop by Budget</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRICE_GUIDES.map((p) => (
              <Link key={p.label} href={`/collections/${p.slug}`} className="group relative h-40 rounded-2xl overflow-hidden block">
                <Image src={p.image} alt={p.label} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="font-bold text-white text-sm">{p.label}</p>
                  <p className="text-white/70 text-xs">{p.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Gift wrapping + certificate */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 flex gap-4">
            <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center shrink-0">
              <Package className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">Premium Packaging</p>
              <p className="text-gray-500 text-sm">Every artwork ships in protective, gift-ready packaging with acid-free materials — ready to present immediately.</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 flex gap-4">
            <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">Certificate of Authenticity</p>
              <p className="text-gray-500 text-sm">Every original artwork includes a signed Certificate of Authenticity — adding to its sentimental and financial value.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#1a1a2e] rounded-2xl p-8 text-center text-white">
          <Gift className="w-10 h-10 text-rose-400 mx-auto mb-3" />
          <h3 className="font-heading text-xl font-bold mb-2">Not Sure What to Choose?</h3>
          <p className="text-gray-400 text-sm mb-5">Our advisors can help you find the perfect artwork for any occasion and budget.</p>
          <Link href="/art-advisory" className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-xl text-sm font-semibold transition-colors">
            Get Gift Advice <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
