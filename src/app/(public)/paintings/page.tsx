"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { ArtCard } from "@/components/artwork/art-card";
import { cn } from "@/lib/utils";

const PAINTINGS = [
  { id: "1",  slug: "golden-sunset",       title: "Golden Sunset",       imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600",  price: 450,  status: "ACTIVE" as const, shopName: "Studio Lumi",    shopSlug: "studio-lumi",   isFeatured: true,  widthCm: 60,  heightCm: 80,  medium: "Oil on canvas" },
  { id: "2",  slug: "blue-serenity",       title: "Blue Serenity",       imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600",  price: 320,  status: "ACTIVE" as const, shopName: "Art by Nadia",  shopSlug: "art-by-nadia",  isFeatured: false, widthCm: 50,  heightCm: 70,  medium: "Watercolor" },
  { id: "3",  slug: "urban-echoes",        title: "Urban Echoes",        imageUrl: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600",  price: 780,  status: "ACTIVE" as const, shopName: "Urban Canvas",  shopSlug: "urban-canvas",  isFeatured: true,  widthCm: 90,  heightCm: 120, medium: "Acrylic" },
  { id: "4",  slug: "forest-dream",        title: "Forest Dream",        imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600",  price: 210,  status: "SOLD" as const,   shopName: "GreenStrokes", shopSlug: "green-strokes", isFeatured: false, widthCm: 40,  heightCm: 50,  medium: "Gouache" },
  { id: "5",  slug: "abstract-thoughts",   title: "Abstract Thoughts",   imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600",  price: 560,  status: "ACTIVE" as const, shopName: "Studio Lumi",   shopSlug: "studio-lumi",   isFeatured: true,  widthCm: 70,  heightCm: 90,  medium: "Mixed Media" },
  { id: "6",  slug: "crimson-tide",        title: "Crimson Tide",        imageUrl: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600",  price: 390,  status: "ACTIVE" as const, shopName: "RedBrush",     shopSlug: "red-brush",     isFeatured: false, widthCm: 55,  heightCm: 75,  medium: "Oil on canvas" },
  { id: "7",  slug: "morning-mist",        title: "Morning Mist",        imageUrl: "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=600",  price: 290,  status: "ACTIVE" as const, shopName: "Art by Nadia", shopSlug: "art-by-nadia",  isFeatured: false, widthCm: 45,  heightCm: 60,  medium: "Watercolor" },
  { id: "8",  slug: "quiet-harbor",        title: "Quiet Harbor",        imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600",  price: 480,  status: "ACTIVE" as const, shopName: "Studio Lumi",   shopSlug: "studio-lumi",   isFeatured: false, widthCm: 65,  heightCm: 85,  medium: "Oil on canvas" },
  { id: "9",  slug: "dusk-portrait",       title: "Dusk Portrait",       imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600",  price: 520,  status: "ACTIVE" as const, shopName: "Atelier M",    shopSlug: "atelier-m",     isFeatured: true,  widthCm: 60,  heightCm: 80,  medium: "Oil on linen" },
  { id: "10", slug: "coastal-wind",        title: "Coastal Wind",        imageUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=600",  price: 340,  status: "ACTIVE" as const, shopName: "Sea Studio",   shopSlug: "sea-studio",    isFeatured: false, widthCm: 70,  heightCm: 50,  medium: "Watercolor" },
  { id: "11", slug: "morning-light",       title: "Morning Light",       imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600",  price: 680,  status: "ACTIVE" as const, shopName: "Studio Lumi",   shopSlug: "studio-lumi",   isFeatured: false, widthCm: 80,  heightCm: 100, medium: "Oil on canvas" },
  { id: "12", slug: "silent-geometry",     title: "Silent Geometry",     imageUrl: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=600",  price: 290,  status: "ACTIVE" as const, shopName: "GeoArt",       shopSlug: "geo-art",       isFeatured: false, widthCm: 45,  heightCm: 45,  medium: "Acrylic" },
  { id: "13", slug: "summer-fields",       title: "Summer Fields",       imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600",  price: 175,  status: "ACTIVE" as const, shopName: "GreenStrokes", shopSlug: "green-strokes", isFeatured: false, widthCm: 35,  heightCm: 45,  medium: "Watercolor" },
  { id: "14", slug: "desert-light",        title: "Desert Light",        imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600",  price: 610,  status: "ACTIVE" as const, shopName: "Desert Light", shopSlug: "desert-light",  isFeatured: true,  widthCm: 75,  heightCm: 95,  medium: "Oil on canvas" },
  { id: "15", slug: "violet-dusk",         title: "Violet Dusk",         imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600",  price: 430,  status: "ACTIVE" as const, shopName: "Atelier M",    shopSlug: "atelier-m",     isFeatured: false, widthCm: 55,  heightCm: 70,  medium: "Gouache" },
  { id: "16", slug: "warm-still-life",     title: "Warm Still Life",     imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600",  price: 365,  status: "ACTIVE" as const, shopName: "RedBrush",     shopSlug: "red-brush",     isFeatured: false, widthCm: 40,  heightCm: 50,  medium: "Oil on canvas" },
  { id: "17", slug: "tide-and-stone",      title: "Tide and Stone",      imageUrl: "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=600",  price: 495,  status: "ACTIVE" as const, shopName: "Sea Studio",   shopSlug: "sea-studio",    isFeatured: false, widthCm: 60,  heightCm: 80,  medium: "Acrylic" },
  { id: "18", slug: "autumn-study",        title: "Autumn Study",        imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600",  price: 240,  status: "ACTIVE" as const, shopName: "GreenStrokes", shopSlug: "green-strokes", isFeatured: false, widthCm: 30,  heightCm: 40,  medium: "Gouache" },
  { id: "19", slug: "red-geometry",        title: "Red Geometry",        imageUrl: "https://images.unsplash.com/photo-1620421680010-0766ff230392?w=600",  price: 720,  status: "ACTIVE" as const, shopName: "Urban Canvas", shopSlug: "urban-canvas",  isFeatured: true,  widthCm: 100, heightCm: 100, medium: "Acrylic" },
  { id: "20", slug: "paris-window",        title: "Paris Window",        imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600",  price: 850,  status: "ACTIVE" as const, shopName: "Studio Lumi",   shopSlug: "studio-lumi",   isFeatured: true,  widthCm: 80,  heightCm: 110, medium: "Oil on canvas" },
];

const MEDIUMS = ["All", "Oil on canvas", "Oil on linen", "Watercolor", "Acrylic", "Gouache", "Mixed Media"];
const STYLES  = ["Abstract", "Realism", "Impressionism", "Expressionism", "Minimalism", "Still Life", "Landscape", "Portrait"];
const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest",   label: "Newest"   },
  { value: "price_asc",  label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
];

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1600",
  "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1600",
  "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1600",
];

export default function PaintingsPage() {
  const [heroIdx, setHeroIdx]         = useState(0);
  const [search, setSearch]           = useState("");
  const [medium, setMedium]           = useState("All");
  const [sort, setSort]               = useState("featured");
  const [priceMin, setPriceMin]       = useState("");
  const [priceMax, setPriceMax]       = useState("");
  const [displayCount, setDisplayCount] = useState(12);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Hero auto-rotate
  useEffect(() => {
    const t = setInterval(() => setHeroIdx((i) => (i + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  // Reset on filter change
  useEffect(() => {
    setDisplayCount(12);
  }, [search, medium, sort, priceMin, priceMax]);

  // Infinite scroll
  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setDisplayCount((c) => c + 8); },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const filtered = useMemo(() => {
    let list = [...PAINTINGS];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((a) => a.title.toLowerCase().includes(q) || a.medium.toLowerCase().includes(q) || a.shopName.toLowerCase().includes(q));
    }
    if (medium !== "All") list = list.filter((a) => a.medium === medium);
    if (priceMin) list = list.filter((a) => a.price >= Number(priceMin));
    if (priceMax) list = list.filter((a) => a.price <= Number(priceMax));
    if (sort === "price_asc")  list.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
    if (sort === "featured")   list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    return list;
  }, [search, medium, sort, priceMin, priceMax]);

  const featuredPaintings = PAINTINGS.filter((p) => p.isFeatured).slice(0, 5);
  const hasMore = displayCount < filtered.length;

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        {HERO_IMAGES.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt="Paintings hero"
            fill
            className={cn(
              "object-cover transition-opacity duration-1000",
              i === heroIdx ? "opacity-100" : "opacity-0"
            )}
            priority={i === 0}
          />
        ))}
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black/80" />

        {/* dot nav */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIdx(i)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                i === heroIdx ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70"
              )}
            />
          ))}
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-xs uppercase tracking-[0.35em] text-rose-300 mb-3">Original Works</p>
          <h1 className="font-heading text-5xl md:text-7xl font-bold leading-tight mb-5 drop-shadow-lg">
            Paintings
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
            Hand-crafted originals in oil, watercolour, acrylic and more — direct from independent artists worldwide.
          </p>
          <div className="flex flex-wrap gap-3 justify-center text-sm">
            {["840+ paintings", "120+ artists", "Free worldwide shipping over $500"].map((s) => (
              <span key={s} className="bg-white/10 border border-white/20 backdrop-blur px-4 py-1.5 rounded-full text-white/80">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* ── Medium pills ──────────────────────────────────── */}
      <section className="border-b border-gray-100 bg-white sticky top-16 z-30 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {MEDIUMS.map((m) => (
            <button
              key={m}
              onClick={() => setMedium(m)}
              className={cn(
                "shrink-0 px-4 py-1.5 text-sm font-medium rounded-full border transition-colors",
                medium === m
                  ? "bg-rose-700 text-white border-rose-700"
                  : "border-gray-200 text-gray-600 hover:border-rose-600 hover:text-rose-700 bg-white"
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </section>

      {/* ── Featured Paintings — editorial strip ──────────── */}
      {medium === "All" && !search && (
        <section className="py-16 border-b border-gray-100 bg-rose-50/30">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-rose-500 mb-1">Curated Picks</p>
                <h2 className="font-heading text-2xl font-bold text-gray-900">Editor's Selection</h2>
              </div>
              <Link href="#all" className="text-sm text-gray-500 hover:text-rose-700 underline underline-offset-4 transition-colors hidden sm:flex items-center gap-1">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 1 large + 4 small bento layout */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[240px] md:auto-rows-[280px]">
              {/* Main feature */}
              <Link
                href={`/artwork/${featuredPaintings[0]?.slug}`}
                className="group relative col-span-2 row-span-2 overflow-hidden bg-gray-100 block"
              >
                <Image src={featuredPaintings[0]?.imageUrl ?? ""} alt={featuredPaintings[0]?.title ?? ""} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-rose-300 font-semibold">Featured</span>
                  <h3 className="font-heading text-xl font-bold mt-1">{featuredPaintings[0]?.title}</h3>
                  <p className="text-sm text-white/60 mt-0.5">{featuredPaintings[0]?.medium} · ${featuredPaintings[0]?.price}</p>
                </div>
              </Link>
              {/* 4 smaller */}
              {featuredPaintings.slice(1, 5).map((p) => (
                <Link key={p.id} href={`/artwork/${p.slug}`} className="group relative overflow-hidden bg-gray-100 block">
                  <Image src={p.imageUrl} alt={p.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <p className="text-xs font-semibold leading-snug">{p.title}</p>
                    <p className="text-[11px] text-white/60">${p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Browse by Style ───────────────────────────────── */}
      {medium === "All" && !search && (
        <section className="py-14 border-b border-gray-100">
          <div className="container mx-auto px-4">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1">Explore</p>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-7">Browse by Style</h2>
            <div className="flex flex-wrap gap-3">
              {STYLES.map((style) => (
                <button
                  key={style}
                  onClick={() => setSearch(style)}
                  className="px-5 py-2.5 border border-gray-200 text-sm text-gray-700 hover:border-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors rounded-sm font-medium"
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── All Paintings ─────────────────────────────────── */}
      <section id="all" className="py-12">
        <div className="container mx-auto px-4">

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-8 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {/* Search */}
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search paintings…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-8 h-10 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-rose-600 bg-gray-50 focus:bg-white transition-colors"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <span className="text-sm text-gray-500 shrink-0">
                <span className="font-semibold text-gray-900">{filtered.length}</span> works
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Price filter toggle */}
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className={cn(
                  "flex items-center gap-1.5 text-sm border px-3 py-2 rounded transition-colors",
                  filtersOpen ? "bg-rose-700 text-white border-rose-700" : "border-gray-200 text-gray-600 hover:border-rose-600"
                )}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>

              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-sm border border-gray-200 px-3 py-2 rounded hover:border-rose-600 focus:outline-none focus:border-rose-600 transition-colors bg-white"
              >
                {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {/* Price filter panel */}
          {filtersOpen && (
            <div className="mb-8 p-5 bg-gray-50 border border-gray-100 rounded-lg flex flex-wrap gap-6 items-end">
              <div>
                <p className="text-xs font-semibold text-gray-700 uppercase tracking-widest mb-2">Price Range</p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min $"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    className="w-24 border border-gray-200 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-rose-600"
                  />
                  <span className="text-gray-400">—</span>
                  <input
                    type="number"
                    placeholder="Max $"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className="w-24 border border-gray-200 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-rose-600"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[["Under $300", "", "300"], ["$300–600", "300", "600"], ["$600–1k", "600", "1000"], ["Over $1k", "1000", ""]].map(([l, mn, mx]) => (
                  <button
                    key={l}
                    onClick={() => { setPriceMin(mn); setPriceMax(mx); }}
                    className="text-xs px-3 py-1.5 border border-gray-200 hover:border-rose-600 hover:text-rose-700 rounded transition-colors"
                  >
                    {l}
                  </button>
                ))}
              </div>
              {(priceMin || priceMax) && (
                <button onClick={() => { setPriceMin(""); setPriceMax(""); }} className="text-xs text-rose-600 hover:text-rose-700 underline underline-offset-2">
                  Clear price
                </button>
              )}
            </div>
          )}

          {/* Active filter chips */}
          {(medium !== "All" || search || priceMin || priceMax) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {medium !== "All" && (
                <button onClick={() => setMedium("All")} className="flex items-center gap-1 text-xs bg-rose-50 border border-rose-200 text-rose-700 px-3 py-1 rounded-full hover:bg-rose-100 transition-colors">
                  {medium} <X className="w-3 h-3" />
                </button>
              )}
              {search && (
                <button onClick={() => setSearch("")} className="flex items-center gap-1 text-xs bg-rose-50 border border-rose-200 text-rose-700 px-3 py-1 rounded-full hover:bg-rose-100 transition-colors">
                  "{search}" <X className="w-3 h-3" />
                </button>
              )}
              {(priceMin || priceMax) && (
                <button onClick={() => { setPriceMin(""); setPriceMax(""); }} className="flex items-center gap-1 text-xs bg-rose-50 border border-rose-200 text-rose-700 px-3 py-1 rounded-full hover:bg-rose-100 transition-colors">
                  ${priceMin || "0"}–${priceMax || "∞"} <X className="w-3 h-3" />
                </button>
              )}
            </div>
          )}

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">No paintings found</h3>
              <p className="text-gray-500 text-sm mb-5">Try a different medium or clear the search</p>
              <button
                onClick={() => { setSearch(""); setMedium("All"); setPriceMin(""); setPriceMax(""); }}
                className="text-sm underline text-rose-600 hover:text-rose-700"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
                {filtered.slice(0, displayCount).map((art) => (
                  <ArtCard key={art.id} {...art} />
                ))}
              </div>

              {hasMore ? (
                <div ref={loaderRef} className="flex items-center justify-center gap-2 py-12 text-sm text-gray-400">
                  <span className="w-4 h-4 border-2 border-gray-300 border-t-rose-600 rounded-full animate-spin" />
                  Loading more…
                </div>
              ) : (
                <p className="text-center text-xs text-gray-400 py-10 uppercase tracking-widest">
                  All {filtered.length} paintings shown
                </p>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── About Paintings ── informational strip ─────────── */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Only Originals</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Every painting listed is a one-of-a-kind original. No giclee prints or reproductions unless the artist explicitly states otherwise.</p>
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Artist-Direct Pricing</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Artists set their own prices. You pay the artist directly with no gallery markup — just a 2% platform fee to keep ArtHub running.</p>
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Safe Shipping</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Every painting ships with professional art packaging. Track your order from studio to door, fully insured.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA banner ──────────────────────────────────────── */}
      <section className="relative h-64 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600"
          alt="Studio"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-xs uppercase tracking-[0.3em] text-rose-300 mb-2">For Artists</p>
          <h2 className="font-heading text-3xl font-bold mb-4">Sell Your Paintings Here</h2>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-rose-700 hover:bg-rose-800 text-white px-7 py-3 text-sm font-semibold tracking-wide transition-colors"
          >
            Open Your Free Shop <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
