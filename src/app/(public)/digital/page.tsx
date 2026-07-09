"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, Search, X, SlidersHorizontal,
  Monitor, Download, Shield, Zap, ChevronDown, Layers,
} from "lucide-react";
import { ArtCard } from "@/components/artwork/art-card";
import { cn } from "@/lib/utils";

/* ─────────────────── data ─────────────────── */

const DIGITAL_WORKS = [
  { id:"d1",  slug:"neon-cityscape",       title:"Neon Cityscape",        imageUrl:"https://images.unsplash.com/photo-1620421680010-0766ff230392?w=600", price:280,  status:"ACTIVE" as const, shopName:"Pixel Loft",    shopSlug:"pixel-loft",   isFeatured:true,  widthCm:100, heightCm:70,  medium:"Generative"     },
  { id:"d2",  slug:"abstract-flow-i",      title:"Abstract Flow I",       imageUrl:"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600", price:195,  status:"ACTIVE" as const, shopName:"Pixel Loft",    shopSlug:"pixel-loft",   isFeatured:true,  widthCm:80,  heightCm:80,  medium:"Digital Painting"},
  { id:"d3",  slug:"fractal-bloom",        title:"Fractal Bloom",         imageUrl:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600", price:150,  status:"ACTIVE" as const, shopName:"GeoArt",        shopSlug:"geo-art",      isFeatured:false, widthCm:60,  heightCm:60,  medium:"Generative"     },
  { id:"d4",  slug:"cyber-portrait",       title:"Cyber Portrait",        imageUrl:"https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600", price:340,  status:"ACTIVE" as const, shopName:"Ink Motion",    shopSlug:"ink-motion",   isFeatured:true,  widthCm:70,  heightCm:90,  medium:"Digital Painting"},
  { id:"d5",  slug:"voxel-landscape",      title:"Voxel Landscape",       imageUrl:"https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=600", price:420,  status:"ACTIVE" as const, shopName:"Pixel Loft",    shopSlug:"pixel-loft",   isFeatured:false, widthCm:90,  heightCm:60,  medium:"3D Render"      },
  { id:"d6",  slug:"data-portrait",        title:"Data Portrait",         imageUrl:"https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600", price:260,  status:"ACTIVE" as const, shopName:"GeoArt",        shopSlug:"geo-art",      isFeatured:false, widthCm:50,  heightCm:70,  medium:"Generative"     },
  { id:"d7",  slug:"glitch-series-ii",     title:"Glitch Series II",      imageUrl:"https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600", price:175,  status:"ACTIVE" as const, shopName:"Ink Motion",    shopSlug:"ink-motion",   isFeatured:false, widthCm:60,  heightCm:60,  medium:"Glitch Art"     },
  { id:"d8",  slug:"synth-wave-dusk",      title:"Synth Wave Dusk",       imageUrl:"https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600", price:310,  status:"ACTIVE" as const, shopName:"Pixel Loft",    shopSlug:"pixel-loft",   isFeatured:true,  widthCm:120, heightCm:80,  medium:"Digital Painting"},
  { id:"d9",  slug:"quantum-garden",       title:"Quantum Garden",        imageUrl:"https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=600", price:240,  status:"ACTIVE" as const, shopName:"Flora Arts",    shopSlug:"flora-arts",   isFeatured:false, widthCm:70,  heightCm:70,  medium:"Generative"     },
  { id:"d10", slug:"pixel-deity",          title:"Pixel Deity",           imageUrl:"https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600", price:390,  status:"ACTIVE" as const, shopName:"Ink Motion",    shopSlug:"ink-motion",   isFeatured:true,  widthCm:80,  heightCm:100, medium:"Pixel Art"      },
  { id:"d11", slug:"render-001",           title:"Render 001",            imageUrl:"https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=600", price:480,  status:"ACTIVE" as const, shopName:"GeoArt",        shopSlug:"geo-art",      isFeatured:false, widthCm:100, heightCm:100, medium:"3D Render"      },
  { id:"d12", slug:"ai-landscape-v3",      title:"AI Landscape v3",       imageUrl:"https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600", price:130,  status:"ACTIVE" as const, shopName:"Pixel Loft",    shopSlug:"pixel-loft",   isFeatured:false, widthCm:90,  heightCm:60,  medium:"AI-Assisted"    },
  { id:"d13", slug:"chromatic-noise",      title:"Chromatic Noise",       imageUrl:"https://images.unsplash.com/photo-1620421680010-0766ff230392?w=600", price:220,  status:"ACTIVE" as const, shopName:"GeoArt",        shopSlug:"geo-art",      isFeatured:false, widthCm:60,  heightCm:60,  medium:"Generative"     },
  { id:"d14", slug:"hyperreal-still",      title:"Hyperreal Still",       imageUrl:"https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600", price:350,  status:"ACTIVE" as const, shopName:"Atelier M",     shopSlug:"atelier-m",    isFeatured:false, widthCm:80,  heightCm:60,  medium:"3D Render"      },
  { id:"d15", slug:"neon-bloom",           title:"Neon Bloom",            imageUrl:"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600", price:185,  status:"ACTIVE" as const, shopName:"Flora Arts",    shopSlug:"flora-arts",   isFeatured:false, widthCm:50,  heightCm:70,  medium:"Digital Painting"},
  { id:"d16", slug:"brutalist-grid",       title:"Brutalist Grid",        imageUrl:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600", price:290,  status:"ACTIVE" as const, shopName:"GeoArt",        shopSlug:"geo-art",      isFeatured:false, widthCm:70,  heightCm:70,  medium:"Generative"     },
  { id:"d17", slug:"deep-dream-forest",    title:"Deep Dream Forest",     imageUrl:"https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=600", price:160,  status:"ACTIVE" as const, shopName:"Pixel Loft",    shopSlug:"pixel-loft",   isFeatured:false, widthCm:80,  heightCm:55,  medium:"AI-Assisted"    },
  { id:"d18", slug:"isometric-city",       title:"Isometric City",        imageUrl:"https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600", price:410,  status:"ACTIVE" as const, shopName:"GeoArt",        shopSlug:"geo-art",      isFeatured:true,  widthCm:100, heightCm:100, medium:"Pixel Art"      },
  { id:"d19", slug:"mograph-still-iv",     title:"Mograph Still IV",      imageUrl:"https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600", price:320,  status:"ACTIVE" as const, shopName:"Ink Motion",    shopSlug:"ink-motion",   isFeatured:false, widthCm:90,  heightCm:60,  medium:"3D Render"      },
  { id:"d20", slug:"ascii-portrait",       title:"ASCII Portrait",        imageUrl:"https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600", price:140,  status:"ACTIVE" as const, shopName:"Ink Motion",    shopSlug:"ink-motion",   isFeatured:false, widthCm:50,  heightCm:70,  medium:"Pixel Art"      },
  { id:"d21", slug:"void-series-i",        title:"Void Series I",         imageUrl:"https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600", price:520,  status:"ACTIVE" as const, shopName:"Pixel Loft",    shopSlug:"pixel-loft",   isFeatured:true,  widthCm:100, heightCm:130, medium:"Digital Painting"},
  { id:"d22", slug:"particle-wave",        title:"Particle Wave",         imageUrl:"https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=600", price:275,  status:"ACTIVE" as const, shopName:"GeoArt",        shopSlug:"geo-art",      isFeatured:false, widthCm:110, heightCm:70,  medium:"Generative"     },
  { id:"d23", slug:"retrowave-grid",       title:"Retrowave Grid",        imageUrl:"https://images.unsplash.com/photo-1620421680010-0766ff230392?w=600", price:195,  status:"ACTIVE" as const, shopName:"Pixel Loft",    shopSlug:"pixel-loft",   isFeatured:false, widthCm:80,  heightCm:55,  medium:"Digital Painting"},
  { id:"d24", slug:"neural-texture-ii",    title:"Neural Texture II",     imageUrl:"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600", price:230,  status:"ACTIVE" as const, shopName:"Ink Motion",    shopSlug:"ink-motion",   isFeatured:false, widthCm:60,  heightCm:80,  medium:"AI-Assisted"    },
];

const MEDIUMS = ["All", "Digital Painting", "Generative", "3D Render", "Pixel Art", "Glitch Art", "AI-Assisted"];

const MEDIUM_COLORS: Record<string, string> = {
  "Digital Painting": "from-violet-600 to-purple-400",
  "Generative":       "from-rose-600 to-pink-400",
  "3D Render":        "from-cyan-600 to-sky-400",
  "Pixel Art":        "from-amber-600 to-yellow-400",
  "Glitch Art":       "from-green-600 to-emerald-400",
  "AI-Assisted":      "from-indigo-600 to-blue-400",
};

const SORT_OPTIONS = [
  { value: "featured",   label: "Featured"          },
  { value: "price_asc",  label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
];

const FORMAT_TYPES = [
  {
    title: "Digital Download",
    icon: Download,
    desc: "Receive a high-resolution file (300+ dpi) instantly after purchase. Print at home or at a local print shop.",
    color: "border-violet-200 bg-violet-50",
    iconColor: "text-violet-600 bg-violet-100",
  },
  {
    title: "Printed & Shipped",
    icon: Monitor,
    desc: "Artist prints on archival media and ships to your door. Same archival quality as photography prints.",
    color: "border-rose-200 bg-rose-50",
    iconColor: "text-rose-600 bg-rose-100",
  },
  {
    title: "Certificate of Authenticity",
    icon: Shield,
    desc: "Every edition comes with a signed, numbered certificate verifying its authenticity and limited edition status.",
    color: "border-cyan-200 bg-cyan-50",
    iconColor: "text-cyan-600 bg-cyan-100",
  },
];

/* ─────────────────── component ─────────────────── */

export default function DigitalPage() {
  const [medium, setMedium]             = useState("All");
  const [search, setSearch]             = useState("");
  const [sort, setSort]                 = useState("featured");
  const [priceMin, setPriceMin]         = useState("");
  const [priceMax, setPriceMax]         = useState("");
  const [filtersOpen, setFiltersOpen]   = useState(false);
  const [displayCount, setDisplayCount] = useState(12);
  const [glitchActive, setGlitchActive] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Random glitch effect on hero text
  useEffect(() => {
    const cycle = () => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 180);
    };
    const t = setInterval(cycle, 3200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => { setDisplayCount(12); }, [medium, search, sort, priceMin, priceMax]);

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
    let list = [...DIGITAL_WORKS];
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
  }, [medium, search, sort, priceMin, priceMax]);

  const featured = DIGITAL_WORKS.filter((d) => d.isFeatured);
  const hasMore  = displayCount < filtered.length;
  const showEditorial = medium === "All" && !search && !priceMin && !priceMax;

  return (
    <div className="min-h-screen bg-[#07070f]">

      {/* ══ HERO ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">

        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(rgba(244,63,94,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(244,63,94,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rose-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl" />

        {/* Featured hero image — right side */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
          <Image
            src="https://images.unsplash.com/photo-1620421680010-0766ff230392?w=1200"
            alt="Digital art hero"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#07070f] via-[#07070f]/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 pt-32 pb-24">
          <div className="max-w-2xl">

            {/* Eyebrow with animated line */}
            <div className="flex items-center gap-3 mb-8">
              <div className="relative w-12 h-px bg-rose-500">
                <div className="absolute inset-0 bg-rose-400 animate-pulse" />
              </div>
              <p className="text-xs uppercase tracking-[0.4em] text-rose-400">Digital Art Marketplace</p>
            </div>

            {/* Glitch headline */}
            <div className="mb-6 relative">
              <h1
                className={cn(
                  "font-heading text-7xl md:text-9xl font-black leading-none tracking-tighter text-white transition-all duration-75 select-none",
                  glitchActive && "translate-x-[2px]"
                )}
                style={glitchActive ? { textShadow: "-2px 0 #f43f5e, 2px 0 #06b6d4" } : {}}
              >
                DIGITAL
              </h1>
              <h1
                className={cn(
                  "font-heading text-7xl md:text-9xl font-black leading-none tracking-tighter transition-all duration-75 select-none",
                  glitchActive ? "text-rose-400 -translate-x-[2px]" : "text-rose-500/80"
                )}
              >
                ART
              </h1>
            </div>

            <p className="text-white/50 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
              Original digital works from independent artists — generative, painted, rendered, and pixel-crafted. Yours to own.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3 mb-10">
              {[
                { v: "560+", l: "Works"    },
                { v: "80+",  l: "Artists"  },
                { v: "6",    l: "Mediums"  },
                { v: "$130", l: "From"     },
              ].map(({ v, l }) => (
                <div key={l} className="border border-white/10 bg-white/3 p-3 text-center backdrop-blur-sm">
                  <p className="text-lg font-bold text-white leading-none">{v}</p>
                  <p className="text-[9px] uppercase tracking-widest text-white/30 mt-1">{l}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link href="#browse"
                className="inline-flex items-center gap-2 bg-rose-700 hover:bg-rose-600 text-white px-8 py-3.5 text-sm font-semibold tracking-wide transition-colors">
                Browse Works <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="#medium-guide"
                className="inline-flex items-center gap-2 border border-white/15 text-white/60 hover:text-white hover:border-white/40 px-8 py-3.5 text-sm font-medium tracking-wide transition-colors">
                <Layers className="w-4 h-4" /> Explore Mediums
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 animate-bounce">
          <p className="text-[9px] uppercase tracking-[0.4em]">Scroll</p>
          <ChevronDown className="w-4 h-4" />
        </div>

        {/* Ticker tape */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 bg-white/3 backdrop-blur-sm py-2.5 overflow-hidden">
          <div className="flex gap-8 animate-marquee whitespace-nowrap text-[10px] uppercase tracking-[0.3em] text-white/20 select-none">
            {Array(6).fill(["Digital Painting", "Generative Art", "3D Render", "Pixel Art", "Glitch Art", "AI-Assisted", "Limited Edition", "Archival Print"]).flat().map((t, i) => (
              <span key={i} className="shrink-0">{t} <span className="text-rose-600/50 mx-2">·</span></span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MEDIUM FILTER STRIP ════════════════════════════ */}
      <div id="medium-guide" className="sticky top-16 z-30 bg-[#07070f]/95 backdrop-blur-sm border-b border-white/5">
        <div className="container mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {MEDIUMS.map((m) => {
            const grad = MEDIUM_COLORS[m];
            return (
              <button
                key={m}
                onClick={() => setMedium(m)}
                className={cn(
                  "shrink-0 px-4 py-1.5 text-sm font-medium rounded-full border transition-all",
                  medium === m
                    ? "bg-rose-700 text-white border-rose-700 shadow-lg shadow-rose-900/40"
                    : "border-white/10 text-white/50 hover:text-white hover:border-white/30 bg-transparent"
                )}
              >
                {m !== "All" && grad && (
                  <span className={cn("inline-block w-1.5 h-1.5 rounded-full bg-linear-to-r mr-1.5 align-middle", grad)} />
                )}
                {m}
              </button>
            );
          })}
        </div>
      </div>

      {/* ══ MEDIUM CARDS ══════════════════════════════════ */}
      {showEditorial && (
        <section className="bg-[#07070f] py-20 border-b border-white/5">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-px w-8 bg-rose-500" />
                  <p className="text-xs uppercase tracking-[0.3em] text-rose-400">Explore</p>
                </div>
                <h2 className="font-heading text-3xl font-bold text-white">Six Digital Mediums</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {MEDIUMS.filter((m) => m !== "All").map((m) => {
                const count = DIGITAL_WORKS.filter((d) => d.medium === m).length;
                const grad  = MEDIUM_COLORS[m] ?? "from-gray-600 to-gray-400";
                return (
                  <button
                    key={m}
                    onClick={() => { setMedium(medium === m ? "All" : m); document.getElementById("browse")?.scrollIntoView({ behavior:"smooth" }); }}
                    className={cn(
                      "group relative overflow-hidden p-5 border transition-all text-left aspect-square flex flex-col justify-between",
                      medium === m ? "border-rose-500 bg-rose-950/30" : "border-white/8 bg-white/3 hover:border-white/20 hover:bg-white/5"
                    )}
                  >
                    {/* Gradient blob */}
                    <div className={cn("absolute -top-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-40 bg-linear-to-br", grad)} />

                    <div>
                      <div className={cn("w-8 h-1 rounded-full bg-linear-to-r mb-4", grad)} />
                      <p className="font-bold text-sm text-white leading-snug">{m}</p>
                    </div>
                    <p className="text-[10px] text-white/30 uppercase tracking-widest">{count} works</p>

                    {medium === m && (
                      <div className="absolute top-2 right-2 w-4 h-4 bg-rose-600 rounded-full flex items-center justify-center">
                        <X className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══ FEATURED WORKS ════════════════════════════════ */}
      {showEditorial && (
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-rose-500 mb-2">Curated</p>
                <h2 className="font-heading text-3xl font-bold text-gray-900">Featured Works</h2>
              </div>
              <Link href="#browse" className="hidden sm:flex items-center gap-1 text-sm text-gray-500 hover:text-rose-700 underline underline-offset-4 transition-colors">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 5-piece mosaic — 2 tall left + 1 wide centre + 2 right */}
            <div className="grid grid-cols-12 gap-3" style={{ height: 620 }}>

              {/* Left — 2 stacked */}
              <div className="col-span-12 md:col-span-3 grid grid-rows-2 gap-3">
                {featured.slice(0, 2).map((d) => (
                  <Link key={d.id} href={`/artwork/${d.slug}`} className="group relative overflow-hidden bg-gray-100 block">
                    <Image src={d.imageUrl} alt={d.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-linear-to-t from-[#07070f]/80 via-transparent to-transparent" />
                    <div className="absolute top-2 left-2 bg-rose-700 text-white text-[9px] font-bold tracking-widest uppercase px-2 py-0.5">
                      Featured
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <p className="text-[10px] text-white/40 uppercase tracking-widest">{d.medium}</p>
                      <p className="text-sm font-semibold">{d.title}</p>
                      <p className="text-xs text-white/50">${d.price}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Centre — hero */}
              {featured[2] && (
                <Link href={`/artwork/${featured[2].slug}`} className="group relative col-span-12 md:col-span-6 overflow-hidden bg-gray-100 block">
                  <Image src={featured[2].imageUrl} alt={featured[2].title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-linear-to-t from-[#07070f]/90 via-[#07070f]/20 to-transparent" />
                  <div className="absolute top-4 left-4 bg-rose-700 text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1">
                    Editor's Pick
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-xs text-rose-300 uppercase tracking-widest mb-1">{featured[2].medium}</p>
                    <h3 className="font-heading text-2xl font-bold mb-1">{featured[2].title}</h3>
                    <p className="text-sm text-white/50">{featured[2].shopName} · ${featured[2].price}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs text-white/40 hover:text-white transition-colors">
                      View work <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              )}

              {/* Right — 2 stacked */}
              <div className="col-span-12 md:col-span-3 grid grid-rows-2 gap-3">
                {featured.slice(3, 5).map((d) => (
                  <Link key={d.id} href={`/artwork/${d.slug}`} className="group relative overflow-hidden bg-gray-100 block">
                    <Image src={d.imageUrl} alt={d.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-linear-to-t from-[#07070f]/80 via-transparent to-transparent" />
                    <div className="absolute top-2 left-2 bg-rose-700 text-white text-[9px] font-bold tracking-widest uppercase px-2 py-0.5">
                      Featured
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <p className="text-[10px] text-white/40 uppercase tracking-widest">{d.medium}</p>
                      <p className="text-sm font-semibold">{d.title}</p>
                      <p className="text-xs text-white/50">${d.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══ FORMAT GUIDE ══════════════════════════════════ */}
      {showEditorial && (
        <section className="bg-gray-50 border-t border-gray-100 py-14">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1">How It Works</p>
              <h2 className="font-heading text-2xl font-bold text-gray-900">What You Receive</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {FORMAT_TYPES.map(({ title, icon: Icon, desc, color, iconColor }) => (
                <div key={title} className={cn("border-2 p-6", color)}>
                  <div className={cn("w-10 h-10 rounded flex items-center justify-center mb-4", iconColor)}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ BROWSE GRID ═══════════════════════════════════ */}
      <section id="browse" className="bg-white py-14">
        <div className="container mx-auto px-4">

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-8 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search digital works…"
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

          {/* Price panel */}
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
                {[["Under $200","","200"],["$200–350","200","350"],["$350–500","350","500"],["Over $500","500",""]].map(([l,mn,mx]) => (
                  <button key={l} onClick={() => { setPriceMin(mn); setPriceMax(mx); }}
                    className="text-xs px-3 py-1.5 border border-gray-200 hover:border-rose-600 hover:text-rose-700 rounded transition-colors">{l}</button>
                ))}
              </div>
              {(priceMin || priceMax) && (
                <button onClick={() => { setPriceMin(""); setPriceMax(""); }} className="text-xs text-rose-600 underline underline-offset-2">Clear</button>
              )}
            </div>
          )}

          {/* Active chips */}
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
              <div className="text-5xl mb-4">💻</div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">No works found</h3>
              <p className="text-gray-500 text-sm mb-5">Try a different medium or clear filters</p>
              <button onClick={() => { setMedium("All"); setSearch(""); setPriceMin(""); setPriceMax(""); }}
                className="text-sm underline text-rose-600 hover:text-rose-700">Clear all</button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
                {filtered.slice(0, displayCount).map((d) => <ArtCard key={d.id} {...d} />)}
              </div>
              {hasMore ? (
                <div ref={loaderRef} className="flex items-center justify-center gap-2 py-12 text-sm text-gray-400">
                  <span className="w-4 h-4 border-2 border-gray-300 border-t-rose-600 rounded-full animate-spin" />
                  Loading more…
                </div>
              ) : (
                <p className="text-center text-xs text-gray-400 py-10 uppercase tracking-widest">
                  All {filtered.length} works shown
                </p>
              )}
            </>
          )}
        </div>
      </section>

      {/* ══ CREATOR CTA ═══════════════════════════════════ */}
      <section className="bg-[#07070f] py-24 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest text-white/40 mb-6">
              <Zap className="w-3 h-3 text-rose-500" /> For Digital Artists
            </div>
            <h2 className="font-heading text-5xl font-bold text-white mb-5 leading-tight">
              Sell Your Digital Art<br />
              <span className="text-rose-500">Your Terms.</span>
            </h2>
            <p className="text-white/40 text-lg mb-4 max-w-lg mx-auto leading-relaxed">
              Set edition sizes, choose download or print delivery, price your work exactly as you see fit. Only 2% platform fee.
            </p>
            <div className="flex flex-wrap gap-3 justify-center text-sm text-white/25 mb-10">
              <span>✓ Unlimited uploads</span>
              <span>✓ Instant payouts</span>
              <span>✓ Edition control</span>
              <span>✓ Free to start</span>
            </div>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-rose-700 hover:bg-rose-600 text-white px-10 py-4 text-sm font-semibold tracking-wide transition-colors"
            >
              Start Selling — Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
