"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, X, Camera, Aperture, SlidersHorizontal, ChevronDown } from "lucide-react";
import { ArtCard } from "@/components/artwork/art-card";
import { cn } from "@/lib/utils";

const PHOTOS = [
  { id: "p1",  slug: "night-bloom",         title: "Night Bloom",         imageUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=600", price: 410,  status: "ACTIVE" as const, shopName: "Flora Arts",    shopSlug: "flora-arts",    isFeatured: true,  widthCm: 50,  heightCm: 70,  medium: "Fine Art Print" },
  { id: "p2",  slug: "dusk-portrait",        title: "Dusk Portrait",        imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600", price: 520,  status: "ACTIVE" as const, shopName: "Atelier M",     shopSlug: "atelier-m",     isFeatured: true,  widthCm: 60,  heightCm: 80,  medium: "Silver Gelatin" },
  { id: "p3",  slug: "coastal-wind",         title: "Coastal Wind",         imageUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=600", price: 340,  status: "ACTIVE" as const, shopName: "Sea Studio",    shopSlug: "sea-studio",    isFeatured: false, widthCm: 70,  heightCm: 50,  medium: "C-Print" },
  { id: "p4",  slug: "fire-and-ice",         title: "Fire and Ice",         imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600", price: 650,  status: "ACTIVE" as const, shopName: "Urban Canvas",  shopSlug: "urban-canvas",  isFeatured: true,  widthCm: 80,  heightCm: 100, medium: "Archival Pigment" },
  { id: "p5",  slug: "urban-light",          title: "Urban Light",          imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600", price: 480,  status: "ACTIVE" as const, shopName: "Urban Canvas",  shopSlug: "urban-canvas",  isFeatured: false, widthCm: 90,  heightCm: 60,  medium: "Archival Pigment" },
  { id: "p6",  slug: "morning-fog",          title: "Morning Fog",          imageUrl: "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=600", price: 290,  status: "ACTIVE" as const, shopName: "Sea Studio",    shopSlug: "sea-studio",    isFeatured: false, widthCm: 60,  heightCm: 40,  medium: "Fine Art Print" },
  { id: "p7",  slug: "floral-whisper",       title: "Floral Whisper",       imageUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=600", price: 375,  status: "ACTIVE" as const, shopName: "Flora Arts",    shopSlug: "flora-arts",    isFeatured: false, widthCm: 50,  heightCm: 70,  medium: "C-Print" },
  { id: "p8",  slug: "desert-horizon",       title: "Desert Horizon",       imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600", price: 590,  status: "ACTIVE" as const, shopName: "Desert Light",  shopSlug: "desert-light",  isFeatured: true,  widthCm: 100, heightCm: 70,  medium: "Archival Pigment" },
  { id: "p9",  slug: "city-rain",            title: "City Rain",            imageUrl: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600", price: 310,  status: "ACTIVE" as const, shopName: "Ink Motion",    shopSlug: "ink-motion",    isFeatured: false, widthCm: 60,  heightCm: 90,  medium: "Silver Gelatin" },
  { id: "p10", slug: "still-water",          title: "Still Water",          imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600", price: 445,  status: "ACTIVE" as const, shopName: "Sea Studio",    shopSlug: "sea-studio",    isFeatured: false, widthCm: 70,  heightCm: 90,  medium: "Fine Art Print" },
  { id: "p11", slug: "golden-hour-street",   title: "Golden Hour Street",   imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600", price: 695,  status: "ACTIVE" as const, shopName: "Pixel Loft",    shopSlug: "pixel-loft",    isFeatured: true,  widthCm: 80,  heightCm: 120, medium: "Archival Pigment" },
  { id: "p12", slug: "winter-forest",        title: "Winter Forest",        imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600", price: 260,  status: "ACTIVE" as const, shopName: "GreenStrokes",  shopSlug: "green-strokes", isFeatured: false, widthCm: 45,  heightCm: 60,  medium: "C-Print" },
  { id: "p13", slug: "abstract-light",       title: "Abstract Light",       imageUrl: "https://images.unsplash.com/photo-1620421680010-0766ff230392?w=600", price: 820,  status: "ACTIVE" as const, shopName: "Pixel Loft",    shopSlug: "pixel-loft",    isFeatured: true,  widthCm: 90,  heightCm: 90,  medium: "Diasec Face Mount" },
  { id: "p14", slug: "old-paris",            title: "Old Paris",            imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600", price: 550,  status: "ACTIVE" as const, shopName: "Studio Lumi",   shopSlug: "studio-lumi",   isFeatured: false, widthCm: 70,  heightCm: 50,  medium: "Silver Gelatin" },
  { id: "p15", slug: "tide-pools",           title: "Tide Pools",           imageUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=600", price: 385,  status: "ACTIVE" as const, shopName: "Sea Studio",    shopSlug: "sea-studio",    isFeatured: false, widthCm: 60,  heightCm: 45,  medium: "Fine Art Print" },
  { id: "p16", slug: "portrait-in-blue",     title: "Portrait in Blue",     imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600", price: 470,  status: "ACTIVE" as const, shopName: "Atelier M",     shopSlug: "atelier-m",     isFeatured: false, widthCm: 50,  heightCm: 70,  medium: "C-Print" },
  { id: "p17", slug: "mountain-mist",        title: "Mountain Mist",        imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600", price: 620,  status: "ACTIVE" as const, shopName: "Desert Light",  shopSlug: "desert-light",  isFeatured: false, widthCm: 80,  heightCm: 60,  medium: "Archival Pigment" },
  { id: "p18", slug: "bloom-series-i",       title: "Bloom Series I",       imageUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=600", price: 330,  status: "SOLD" as const,   shopName: "Flora Arts",    shopSlug: "flora-arts",    isFeatured: false, widthCm: 40,  heightCm: 55,  medium: "Fine Art Print" },
  { id: "p19", slug: "subway-shadows",       title: "Subway Shadows",       imageUrl: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600", price: 410,  status: "ACTIVE" as const, shopName: "Ink Motion",    shopSlug: "ink-motion",    isFeatured: false, widthCm: 60,  heightCm: 80,  medium: "Silver Gelatin" },
  { id: "p20", slug: "last-light",           title: "Last Light",           imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600", price: 760,  status: "ACTIVE" as const, shopName: "Pixel Loft",    shopSlug: "pixel-loft",    isFeatured: true,  widthCm: 100, heightCm: 75,  medium: "Diasec Face Mount" },
  { id: "p21", slug: "empty-streets",        title: "Empty Streets",        imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600", price: 295,  status: "ACTIVE" as const, shopName: "Urban Canvas",  shopSlug: "urban-canvas",  isFeatured: false, widthCm: 70,  heightCm: 50,  medium: "C-Print" },
  { id: "p22", slug: "sea-foam",             title: "Sea Foam",             imageUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=600", price: 490,  status: "ACTIVE" as const, shopName: "Sea Studio",    shopSlug: "sea-studio",    isFeatured: false, widthCm: 80,  heightCm: 55,  medium: "Fine Art Print" },
  { id: "p23", slug: "the-red-door",         title: "The Red Door",         imageUrl: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600", price: 355,  status: "ACTIVE" as const, shopName: "Art by Nadia",  shopSlug: "art-by-nadia",  isFeatured: false, widthCm: 45,  heightCm: 65,  medium: "Archival Pigment" },
  { id: "p24", slug: "neon-rain",            title: "Neon Rain",            imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600", price: 870,  status: "ACTIVE" as const, shopName: "Pixel Loft",    shopSlug: "pixel-loft",    isFeatured: true,  widthCm: 90,  heightCm: 120, medium: "Diasec Face Mount" },
];

const FORMATS    = ["All", "Fine Art Print", "Archival Pigment", "C-Print", "Silver Gelatin", "Diasec Face Mount"];
const GENRES     = ["Landscape", "Portrait", "Street", "Nature", "Abstract", "Architecture", "Still Life", "Aerial"];
const SORT_OPTIONS = [
  { value: "featured",    label: "Featured"          },
  { value: "price_asc",   label: "Price: Low → High" },
  { value: "price_desc",  label: "Price: High → Low" },
];

const HERO_SLIDES = [
  { src: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=1600", label: "Portraiture" },
  { src: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=1600", label: "Coastal"     },
  { src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600", label: "Fine Art"    },
  { src: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=1600", label: "Botanical"   },
];

const PRINT_INFO = [
  { icon: Camera,   title: "Museum-Grade Prints",   desc: "Every print produced on acid-free, archival media with pigment inks rated 100+ year lightfastness." },
  { icon: Aperture, title: "Limited Editions",      desc: "Most photographers offer strictly limited edition runs — each print comes with a certificate of authenticity." },
  { icon: Camera,   title: "Artist-Signed Option",  desc: "Many photographers offer hand-signed editions. Look for the 'Signed' badge on the product page." },
];

export default function PhotographyPage() {
  const [slideIdx, setSlideIdx]       = useState(0);
  const [search, setSearch]           = useState("");
  const [format, setFormat]           = useState("All");
  const [sort, setSort]               = useState("featured");
  const [priceMin, setPriceMin]       = useState("");
  const [priceMax, setPriceMax]       = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(12);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Slide auto-rotate
  useEffect(() => {
    const t = setInterval(() => setSlideIdx((i) => (i + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  // Reset on filter change
  useEffect(() => { setDisplayCount(12); }, [search, format, sort, priceMin, priceMax]);

  // Infinite scroll
  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setDisplayCount((c) => c + 8); },
      { rootMargin: "300px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const filtered = useMemo(() => {
    let list = [...PHOTOS];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((a) => a.title.toLowerCase().includes(q) || a.medium.toLowerCase().includes(q) || a.shopName.toLowerCase().includes(q));
    }
    if (format !== "All") list = list.filter((a) => a.medium === format);
    if (priceMin) list = list.filter((a) => a.price >= Number(priceMin));
    if (priceMax) list = list.filter((a) => a.price <= Number(priceMax));
    if (sort === "price_asc")  list.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
    if (sort === "featured")   list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    return list;
  }, [search, format, sort, priceMin, priceMax]);

  const featured = PHOTOS.filter((p) => p.isFeatured);
  const hasMore  = displayCount < filtered.length;
  const showEditorial = format === "All" && !search && !priceMin && !priceMax;

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero Slideshow ─────────────────────────────── */}
      <section className="relative h-screen max-h-[85vh] min-h-[560px] overflow-hidden bg-gray-900">
        {HERO_SLIDES.map((slide, i) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.label}
            fill
            className={cn("object-cover transition-opacity duration-1200", i === slideIdx ? "opacity-100" : "opacity-0")}
            priority={i === 0}
          />
        ))}

        {/* Dark vignette */}
        <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/30 to-black/85" />

        {/* Slide label — top right */}
        <div className="absolute top-8 right-8 text-right">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1">Currently Viewing</p>
          <p className="text-sm font-semibold text-white/80">{HERO_SLIDES[slideIdx].label}</p>
        </div>

        {/* Slide thumbnails — left strip */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3">
          {HERO_SLIDES.map((slide, i) => (
            <button
              key={i}
              onClick={() => setSlideIdx(i)}
              className={cn(
                "w-14 h-10 overflow-hidden border-2 transition-all",
                i === slideIdx ? "border-rose-500 opacity-100 scale-110" : "border-white/20 opacity-50 hover:opacity-80"
              )}
            >
              <Image src={slide.src} alt={slide.label} width={56} height={40} className="object-cover w-full h-full" />
            </button>
          ))}
        </div>

        {/* Centre content */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 text-white text-center px-4">
          <p className="text-xs uppercase tracking-[0.4em] text-rose-300 mb-3">Fine Art Photography</p>
          <h1 className="font-heading text-6xl md:text-8xl font-bold leading-none mb-5 tracking-tight drop-shadow-2xl">
            Photography
          </h1>
          <p className="text-white/60 text-lg max-w-lg mb-8 leading-relaxed">
            Limited-edition prints and one-of-a-kind photographs from the world's independent photographers.
          </p>
          <div className="flex flex-wrap gap-3 justify-center text-sm">
            {["380+ photographs", "Limited editions", "Archival quality prints"].map((s) => (
              <span key={s} className="bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-white/80 text-xs">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom dot nav */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIdx(i)}
              className={cn("transition-all rounded-full", i === slideIdx ? "w-6 h-2 bg-rose-500" : "w-2 h-2 bg-white/30 hover:bg-white/60")}
            />
          ))}
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-4 right-8 text-white/30 animate-bounce">
          <ChevronDown className="w-5 h-5" />
        </div>
      </section>

      {/* ── Format filter pills ─────────────────────────── */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {FORMATS.map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={cn(
                "shrink-0 px-4 py-1.5 text-sm font-medium rounded-full border transition-colors",
                format === f
                  ? "bg-rose-700 text-white border-rose-700"
                  : "border-gray-200 text-gray-600 hover:border-rose-600 hover:text-rose-700 bg-white"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── Editorial — Featured grid ────────────────────── */}
      {showEditorial && (
        <section className="py-16 border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-rose-500 mb-1">Highlights</p>
                <h2 className="font-heading text-2xl font-bold text-gray-900">Featured Photographs</h2>
              </div>
              <Link href="#all" className="hidden sm:flex items-center gap-1 text-sm text-gray-500 hover:text-rose-700 underline underline-offset-4 transition-colors">
                Browse all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Masonry-style 3-col editorial */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Tall left column */}
              <div className="flex flex-col gap-4">
                {featured.slice(0, 2).map((p) => (
                  <Link key={p.id} href={`/artwork/${p.slug}`} className="group relative overflow-hidden bg-gray-100 block aspect-3/4">
                    <Image src={p.imageUrl} alt={p.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 bg-rose-700 text-white text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1">
                      Featured
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <p className="text-xs text-white/50 uppercase tracking-widest mb-0.5">{p.medium}</p>
                      <h3 className="font-semibold text-sm">{p.title}</h3>
                      <p className="text-xs text-white/60 mt-0.5">${p.price} · {p.shopName}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Wide centre — hero shot */}
              {featured[2] && (
                <Link href={`/artwork/${featured[2].slug}`} className="group relative overflow-hidden bg-gray-100 block md:row-span-2">
                  <Image src={featured[2].imageUrl} alt={featured[2].title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute top-3 left-3 bg-rose-700 text-white text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1">
                    Editor's Pick
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-xs text-rose-300 uppercase tracking-widest mb-1">{featured[2].medium}</p>
                    <h3 className="font-heading text-xl font-bold">{featured[2].title}</h3>
                    <p className="text-sm text-white/60 mt-1">{featured[2].shopName} · ${featured[2].price}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs text-white/50 hover:text-white transition-colors">
                      View work <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              )}

              {/* Right column */}
              <div className="flex flex-col gap-4">
                {featured.slice(3, 5).map((p) => (
                  <Link key={p.id} href={`/artwork/${p.slug}`} className="group relative overflow-hidden bg-gray-100 block aspect-3/4">
                    <Image src={p.imageUrl} alt={p.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 bg-rose-700 text-white text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1">
                      Featured
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <p className="text-xs text-white/50 uppercase tracking-widest mb-0.5">{p.medium}</p>
                      <h3 className="font-semibold text-sm">{p.title}</h3>
                      <p className="text-xs text-white/60 mt-0.5">${p.price} · {p.shopName}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Browse by Genre ───────────────────────────────── */}
      {showEditorial && (
        <section className="py-14 bg-gray-50 border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-7">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1">Filter</p>
                <h2 className="font-heading text-2xl font-bold text-gray-900">Browse by Genre</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {GENRES.map((genre) => {
                const genreImages: Record<string, string> = {
                  Landscape:     "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400",
                  Portrait:      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400",
                  Street:        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400",
                  Nature:        "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=400",
                  Abstract:      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400",
                  Architecture:  "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=400",
                  "Still Life":  "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400",
                  Aerial:        "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=400",
                };
                return (
                  <button
                    key={genre}
                    onClick={() => setSearch(genre)}
                    className="group relative overflow-hidden aspect-video bg-gray-200 block text-left"
                  >
                    <Image src={genreImages[genre] ?? ""} alt={genre} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-3 left-3 text-white text-sm font-semibold tracking-wide">{genre}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Print Quality Info ────────────────────────────── */}
      {showEditorial && (
        <section className="py-14 border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PRINT_INFO.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-10 h-10 bg-rose-50 border border-rose-100 rounded flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── All Photographs ──────────────────────────────── */}
      <section id="all" className="py-12">
        <div className="container mx-auto px-4">

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-8 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search photographs…"
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
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className={cn(
                  "flex items-center gap-1.5 text-sm border px-3 py-2 rounded transition-colors",
                  filtersOpen ? "bg-rose-700 text-white border-rose-700" : "border-gray-200 text-gray-600 hover:border-rose-600"
                )}
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
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
                  <input type="number" placeholder="Min $" value={priceMin} onChange={(e) => setPriceMin(e.target.value)}
                    className="w-24 border border-gray-200 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-rose-600" />
                  <span className="text-gray-400">—</span>
                  <input type="number" placeholder="Max $" value={priceMax} onChange={(e) => setPriceMax(e.target.value)}
                    className="w-24 border border-gray-200 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-rose-600" />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[["Under $350", "", "350"], ["$350–600", "350", "600"], ["$600–1k", "600", "1000"], ["Over $1k", "1000", ""]].map(([l, mn, mx]) => (
                  <button key={l} onClick={() => { setPriceMin(mn); setPriceMax(mx); }}
                    className="text-xs px-3 py-1.5 border border-gray-200 hover:border-rose-600 hover:text-rose-700 rounded transition-colors">{l}</button>
                ))}
              </div>
              {(priceMin || priceMax) && (
                <button onClick={() => { setPriceMin(""); setPriceMax(""); }} className="text-xs text-rose-600 hover:text-rose-700 underline underline-offset-2">Clear price</button>
              )}
            </div>
          )}

          {/* Active chips */}
          {(format !== "All" || search || priceMin || priceMax) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {format !== "All" && (
                <button onClick={() => setFormat("All")} className="flex items-center gap-1 text-xs bg-rose-50 border border-rose-200 text-rose-700 px-3 py-1 rounded-full hover:bg-rose-100 transition-colors">
                  {format} <X className="w-3 h-3" />
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
              <div className="text-5xl mb-4">📷</div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">No photographs found</h3>
              <p className="text-gray-500 text-sm mb-5">Try a different format or clear the search</p>
              <button
                onClick={() => { setSearch(""); setFormat("All"); setPriceMin(""); setPriceMax(""); }}
                className="text-sm underline text-rose-600 hover:text-rose-700"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
                {filtered.slice(0, displayCount).map((p) => <ArtCard key={p.id} {...p} />)}
              </div>
              {hasMore ? (
                <div ref={loaderRef} className="flex items-center justify-center gap-2 py-12 text-sm text-gray-400">
                  <span className="w-4 h-4 border-2 border-gray-300 border-t-rose-600 rounded-full animate-spin" />
                  Loading more…
                </div>
              ) : (
                <p className="text-center text-xs text-gray-400 py-10 uppercase tracking-widest">
                  All {filtered.length} photographs shown
                </p>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Full-bleed CTA ────────────────────────────────── */}
      <section className="relative h-72 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600"
          alt="Photography CTA"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/75" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-xs uppercase tracking-[0.35em] text-rose-300 mb-3">For Photographers</p>
          <h2 className="font-heading text-4xl font-bold mb-4">Sell Your Photography</h2>
          <p className="text-white/60 mb-7 max-w-sm">
            Reach collectors worldwide. Limited editions, open editions — you control your prints.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-rose-700 hover:bg-rose-800 text-white px-8 py-3.5 text-sm font-semibold tracking-wide transition-colors"
          >
            Open Your Free Shop <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
