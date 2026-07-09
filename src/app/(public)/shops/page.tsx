"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Star, X } from "lucide-react";
import { ShopCard } from "@/components/shop/shop-card";
import { cn } from "@/lib/utils";
import { ALL_SHOPS } from "@/lib/shops-data";

const SPECIALTIES = ["All", "Oil Paintings", "Watercolor", "Acrylic", "Photography", "Digital Art", "Mixed Media", "Gouache"];
const DIVISIONS = ["All Divisions", "Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barisal", "Mymensingh", "Rangpur"];
const SORT_OPTIONS = [
  { value: "featured", label: "Featured First" },
  { value: "rating", label: "Highest Rated" },
  { value: "sales", label: "Most Sales" },
  { value: "artworks", label: "Most Artworks" },
];

export default function ShopsPage() {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [division, setDivision] = useState("All Divisions");
  const [sort, setSort] = useState("featured");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const filtered = useMemo(() => {
    let list = [...ALL_SHOPS];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((s) =>
        s.displayName.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q) ||
        s.specialty.toLowerCase().includes(q) ||
        s.ownerName.toLowerCase().includes(q)
      );
    }
    if (specialty !== "All") list = list.filter((s) => s.specialty === specialty);
    if (featuredOnly) list = list.filter((s) => s.isFeatured);
    if (division !== "All Divisions") list = list.filter((s) => s.division === division);
    if (sort === "rating") list.sort((a, b) => b.ratingAvg - a.ratingAvg);
    if (sort === "sales") list.sort((a, b) => b.totalSales - a.totalSales);
    if (sort === "artworks") list.sort((a, b) => b.artworkCount - a.artworkCount);
    if (sort === "featured") list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    return list;
  }, [search, specialty, division, sort, featuredOnly]);

  const featuredShops = ALL_SHOPS.filter((s) => s.isFeatured).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="relative overflow-hidden bg-gray-900 text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600"
            alt="Artists"
            fill
            className="object-cover opacity-25"
            priority
          />
        </div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-rose-400 mb-3">Made in Bangladesh</p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Bangladeshi Art Shops
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">
            Discover original works from {ALL_SHOPS.length}+ independent Bangladeshi artists and studios across every division.
          </p>
          <div className="max-w-lg mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search artists, cities, styles…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-900 text-base shadow-xl outline-none focus:ring-2 focus:ring-rose-500"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="relative border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-4 divide-x divide-white/10 text-center">
              {[
                { value: `${ALL_SHOPS.length}+`, label: "Artists" },
                { value: `${ALL_SHOPS.reduce((acc, s) => acc + s.artworkCount, 0)}+`, label: "Artworks" },
                { value: "8", label: "Divisions" },
                { value: `${ALL_SHOPS.reduce((acc, s) => acc + s.totalSales, 0)}+`, label: "Sales" },
              ].map((s) => (
                <div key={s.label} className="py-5">
                  <p className="text-xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-white/40 uppercase tracking-widest mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured spotlight */}
      <section className="py-16 border-b border-gray-100 bg-rose-50/40">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-rose-500 mb-1">Hand-Picked</p>
              <h2 className="font-heading text-2xl font-bold text-gray-900">Spotlight Artists</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredShops.map((shop) => (
              <Link key={shop.slug} href={`/shop/${shop.slug}`} className="group relative overflow-hidden rounded-sm aspect-video block">
                <Image src={shop.bannerUrl} alt={shop.displayName} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-xs uppercase tracking-widest text-rose-400 mb-1">{shop.specialty}</p>
                  <h3 className="text-white font-bold text-lg leading-tight">{shop.displayName}</h3>
                  <p className="text-white/60 text-xs mt-0.5 italic">{shop.ownerName}</p>
                  <p className="text-white/60 text-xs mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {shop.location}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-white/60">
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {shop.ratingAvg}</span>
                    <span>{shop.artworkCount} works</span>
                    <span>{shop.totalSales} sales</span>
                  </div>
                </div>
                <div className="absolute top-3 left-3 bg-rose-700 text-white text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1">
                  Featured
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row gap-3 mb-6 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-2 flex-wrap flex-1">
            {SPECIALTIES.map((s) => (
              <button
                key={s}
                onClick={() => setSpecialty(s)}
                className={cn(
                  "shrink-0 px-3.5 py-1.5 text-sm font-medium rounded-full border transition-colors",
                  specialty === s
                    ? "bg-rose-700 text-white border-rose-700"
                    : "border-gray-200 text-gray-600 hover:border-rose-600 hover:text-rose-700 bg-white"
                )}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <select
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="text-sm border border-gray-200 px-3 py-2 rounded hover:border-rose-600 focus:outline-none focus:border-rose-600 transition-colors bg-white"
            >
              {DIVISIONS.map((l) => <option key={l}>{l}</option>)}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-sm border border-gray-200 px-3 py-2 rounded hover:border-rose-600 focus:outline-none focus:border-rose-600 transition-colors bg-white"
            >
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <button
              onClick={() => setFeaturedOnly(!featuredOnly)}
              className={cn(
                "flex items-center gap-1.5 text-sm px-3 py-2 border rounded transition-colors",
                featuredOnly ? "bg-rose-700 text-white border-rose-700" : "border-gray-200 text-gray-600 hover:border-rose-600"
              )}
            >
              <Star className="w-3.5 h-3.5" />
              Featured
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-8">
          Showing <span className="font-semibold text-gray-900">{filtered.length}</span> artists
          {specialty !== "All" && <span className="ml-1">in <span className="text-rose-700 font-medium">{specialty}</span></span>}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🎨</div>
            <h3 className="font-semibold text-gray-900 text-lg mb-2">No artists found</h3>
            <p className="text-gray-500 text-sm mb-4">Try a different search or filter</p>
            <button
              onClick={() => { setSearch(""); setSpecialty("All"); setDivision("All Divisions"); setFeaturedOnly(false); }}
              className="text-sm underline text-rose-600 hover:text-rose-700"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((shop) => (
              <ShopCard key={shop.slug} {...shop} />
            ))}
          </div>
        )}
      </div>

      <section className="py-20 bg-gray-900 text-white mt-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-rose-400 mb-3">For Artists</p>
          <h2 className="font-heading text-4xl font-bold mb-4">Start Selling Your Art</h2>
          <p className="text-white/60 max-w-md mx-auto mb-8 text-lg">
            Join Bangladesh's finest artists. Open your free shop and reach collectors nationwide.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-rose-700 hover:bg-rose-800 text-white px-8 py-3.5 text-sm font-semibold tracking-wide transition-colors"
          >
            Open Your Free Shop
          </Link>
        </div>
      </section>
    </div>
  );
}
