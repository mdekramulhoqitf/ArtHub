import Link from "next/link";
import Image from "next/image";
import { Printer, Check, Shield, ArrowRight, Layers, Star } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const PRINT_SIZES = [
  { label: "A4 (21 × 29.7 cm)", price: 800 },
  { label: "A3 (29.7 × 42 cm)", price: 1400 },
  { label: "A2 (42 × 59.4 cm)", price: 2200 },
  { label: "A1 (59.4 × 84.1 cm)", price: 3200 },
  { label: "Custom / Large Format", price: null },
];

const PRINT_TYPES = [
  {
    title: "Giclée Fine Art Print",
    desc: "Museum-quality archival inkjet printing on 300gsm cotton rag paper. Lasts 100+ years without fading.",
    badge: "Most Popular",
    highlight: true,
  },
  {
    title: "Canvas Print",
    desc: "Printed on artist-grade canvas, gallery-wrapped on pine stretcher bars. Ready to hang.",
    badge: null,
    highlight: false,
  },
  {
    title: "Acrylic Face Mount",
    desc: "Printed on metallic paper and face-mounted behind 4mm clear acrylic. Vivid, contemporary look.",
    badge: "Premium",
    highlight: false,
  },
];

const FEATURED_PRINTS = [
  { title: "The Padma at Dusk", artist: "Rana Begum", fromPrice: 1400, image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600", slug: "padma-at-dusk" },
  { title: "Monsoon Study III", artist: "Parisa Ahmed", fromPrice: 800, image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600", slug: "monsoon-study-iii" },
  { title: "Blue Serenity", artist: "Art by Nadia", fromPrice: 800, image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600", slug: "blue-serenity" },
  { title: "Abstract Thoughts", artist: "Studio Lumi", fromPrice: 1400, image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600", slug: "abstract-thoughts" },
  { title: "Golden Sunset", artist: "Rana Begum", fromPrice: 1400, image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600", slug: "golden-sunset" },
  { title: "Urban Echoes", artist: "Moinul Islam", fromPrice: 2200, image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600", slug: "urban-echoes" },
];

export default function PrintsPage() {
  return (
    <div className="min-h-screen bg-[#f5f2ea]">
      {/* Hero */}
      <div className="bg-[#1a1a2e] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Printer className="w-6 h-6 text-rose-400" />
            <span className="text-rose-400 font-semibold text-sm uppercase tracking-widest">Print Shop</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Museum-Quality Prints</h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Own a piece of Bangladeshi art at an accessible price. Every print is produced on archival materials and authorized by the artist.
          </p>
          <div className="flex items-center justify-center gap-8 mt-8">
            {[["100+", "Artworks Available"], ["Giclée", "Print Quality"], ["Dhaka", "Printed In Bangladesh"]].map(([val, label]) => (
              <div key={label}>
                <p className="font-heading text-2xl font-bold text-white">{val}</p>
                <p className="text-gray-400 text-xs mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* Print types */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">Print Types</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {PRINT_TYPES.map((t) => (
              <div key={t.title} className={`rounded-2xl border p-5 ${t.highlight ? "bg-[#1a1a2e] border-[#1a1a2e] text-white" : "bg-white border-gray-100"}`}>
                {t.badge && <div className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${t.highlight ? "text-rose-400" : "text-rose-600"}`}>{t.badge}</div>}
                <p className={`font-semibold mb-2 ${t.highlight ? "text-white" : "text-gray-900"}`}>{t.title}</p>
                <p className={`text-sm leading-relaxed ${t.highlight ? "text-gray-300" : "text-gray-500"}`}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sizes + pricing */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-heading text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
            <Layers className="w-5 h-5 text-rose-500" /> Sizes & Pricing (Giclée)
          </h2>
          <div className="divide-y divide-gray-50">
            {PRINT_SIZES.map((s) => (
              <div key={s.label} className="flex items-center justify-between py-3">
                <p className="text-gray-700 text-sm">{s.label}</p>
                <p className="font-semibold text-rose-600">{s.price ? `from ${formatPrice(s.price)}` : "Contact us"}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">Canvas and acrylic prints are priced slightly higher. Framing available at extra cost.</p>
        </div>

        {/* Featured prints grid */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" /> Popular Prints
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURED_PRINTS.map((p) => (
              <Link key={p.slug} href={`/artwork/${p.slug}`} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all block">
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                  <div className="absolute top-2 right-2 bg-white/90 text-[#1a1a2e] text-[10px] font-bold px-2 py-0.5 rounded-full">PRINT AVAILABLE</div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-400">{p.artist}</p>
                  <p className="font-semibold text-gray-900 text-sm mt-0.5 group-hover:text-rose-700 transition-colors">{p.title}</p>
                  <p className="text-rose-600 font-bold text-sm mt-1">from {formatPrice(p.fromPrice)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quality guarantee */}
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            [Shield, "Artist Authorized", "Every print is licensed and authorized by the original artist, who receives a royalty."],
            [Check, "Archival Quality", "Pigment inks rated 100+ years. Acid-free papers. Colors won't fade or shift."],
            [Printer, "Made in Bangladesh", "Printed by certified fine art printers in Dhaka — supporting local industry."],
          ].map(([Icon, title, desc]) => (
            <div key={String(title)} className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
              <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                {/* @ts-ignore */}
                <Icon className="w-5 h-5 text-rose-600" />
              </div>
              <p className="font-semibold text-gray-900 text-sm mb-1">{String(title)}</p>
              <p className="text-gray-400 text-xs leading-relaxed">{String(desc)}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-rose-600 rounded-2xl p-8 text-center text-white">
          <h3 className="font-heading text-xl font-bold mb-2">Want a Custom Print?</h3>
          <p className="text-rose-100 text-sm mb-5">Contact us with the artwork, size, and print type — we'll handle the rest and deliver to your door.</p>
          <Link href="/contact?subject=print-order" className="inline-flex items-center gap-2 bg-white text-rose-700 hover:bg-rose-50 px-8 py-3 rounded-xl text-sm font-semibold transition-colors">
            Order a Print <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
