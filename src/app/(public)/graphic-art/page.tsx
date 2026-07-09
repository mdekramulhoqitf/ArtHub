"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, Search, X, ChevronDown,
  Layers, PenTool, Layout, Type, Star,
} from "lucide-react";
import { ArtCard } from "@/components/artwork/art-card";
import { cn } from "@/lib/utils";

/* ─────────────────── DATA ─────────────────── */

const SECTION_FILES: { key: string; medium: string; files: string[] }[] = [
  {
    key: "poster_art",
    medium: "Poster Art",
    files: [
      "download (3).png","download (9).png","download (10).png","download (11).png",
      "download (12).png","download (13).png","download (14).png","download (15).png",
      "download (16).png","download (17).png","download (18).png","vice-web.jpg",
      "download (19).png","download (20).png",
    ],
  },
  {
    key: "typography_art",
    medium: "Typography Art",
    files: [
      "download (3).png","download (9).png","download (10).png","download (11).png",
      "download (12).png","download (13).png","download (14).png","download (15).png",
      "download (16).png","download (17).png","download (18).png","download (19).png",
      "download (20).png","download (21).png","download (22).png","download (23).png",
      "download (24).png","download (25).png","download (26).png","download (27).png",
      "download (28).png",
    ],
  },
  {
    key: "illustration",
    medium: "Illustration",
    files: [
      "download (11).png","download (12).png","download (13).png","download (14).png",
      "download (15).png","download (16).png","download (17).png","download (18).png",
      "download (19).png","download (20).png","download (21).png","download (22).png",
      "download (23).png","download (24).png","download (25).png","download (26).png",
      "download (27).png","download (28).png","download (29).png","download (30).png",
      "download (31).png","download (32).png","download (33).png","download (34).png",
      "download (35).png","download (36).png","download (37).png",
    ],
  },
  {
    key: "brand_itentity",
    medium: "Brand Identity",
    files: [
      "download (11).png","download (12).png","download (13).png","download (14).png",
      "download.webp","download (15).png","download (16).png","download (17).png",
      "download (18).png","download (19).png","download (20).png","download (21).png",
      "download (22).png","download (23).png","download (24).png",
    ],
  },
  {
    key: "infographic_art",
    medium: "Infographic Art",
    files: [
      "download (3).png","download (9).png","download (10).png","download (11).png",
      "download (12).png","download (13).png","download (14).png",
    ],
  },
];

const GRAPHIC_WORKS = SECTION_FILES.flatMap((section) =>
  section.files.map((file, i) => ({
    id: `${section.key}-${i}`,
    slug: `${section.key}-${i + 1}`,
    title: `${section.medium} ${String(i + 1).padStart(2, "0")}`,
    imageUrl: `/images/graphics_art/${section.key}/${file}`,
    price: 0,
    status: "ACTIVE" as const,
    shopName: "Ekram Studio",
    shopSlug: "ekram-studio",
    isFeatured: i < 2,
    widthCm: 60,
    heightCm: 80,
    medium: section.medium,
  }))
);

const DISCIPLINES = [
  "All",
  "Poster Art",
  "Typography Art",
  "Illustration",
  "Brand Identity",
  "Infographic Art",
];

const DISCIPLINE_META: Record<string, { icon: React.ElementType; color: string; bg: string; desc: string }> = {
  "Poster Art":       { icon: Layout,     color: "text-violet-600", bg: "bg-violet-50 border-violet-200",   desc: "Prints, event flyers, editorial posters" },
  "Typography Art":   { icon: Type,       color: "text-amber-600",  bg: "bg-amber-50 border-amber-200",     desc: "Lettering, calligraphy, type as image" },
  "Illustration":     { icon: PenTool,    color: "text-emerald-600",bg: "bg-emerald-50 border-emerald-200", desc: "Vector & raster hand-drawn works" },
  "Brand Identity":   { icon: Star,       color: "text-rose-600",   bg: "bg-rose-50 border-rose-200",       desc: "Logo art, mark systems, brand sheets" },
  "Infographic Art":  { icon: Layers,     color: "text-sky-600",    bg: "bg-sky-50 border-sky-200",         desc: "Data visualised as printable art" },
};

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest",   label: "Newest"   },
];

const INFO_BLOCKS = [
  {
    title: "What Is Graphic Art?",
    body: "Graphic art spans every discipline where visual design and artistic intent intersect — from hand-lettered posters and editorial illustrations to brand identities and concept environments. Unlike fine art, graphic art is built around communication: it guides the eye, shapes emotion, and encodes meaning through composition, type, and colour.",
  },
  {
    title: "Why Collect It?",
    body: "Graphic works are among the most versatile pieces you can own. A typographic print brings rhythm to a home office wall. A vintage-style poster anchors a living room. Illustration originals reward repeat viewing — the more you look, the more you find. And unlike reproductions, an original or limited-edition print holds its value.",
  },
  {
    title: "Authenticity & Editions",
    body: "Every work listed here comes with a signed certificate of authenticity. Limited-edition prints show the edition number (e.g. 3/50). Original digital works include a verifiable certificate. Artists set their own edition sizes — once sold out, the edition closes.",
  },
];

/* ─────────────────── PAGE ─────────────────── */

export default function GraphicArtPage() {
  const [discipline, setDiscipline]   = useState("All");
  const [search, setSearch]           = useState("");
  const [sort, setSort]               = useState("featured");
  const [displayCount, setDisplayCount] = useState(12);
  const [heroTick, setHeroTick]       = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Hero text cycle
  useEffect(() => {
    const t = setInterval(() => setHeroTick((n) => n + 1), 2800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => { setDisplayCount(12); }, [discipline, search, sort]);

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
    let list = [...GRAPHIC_WORKS];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((a) =>
        a.title.toLowerCase().includes(q) ||
        a.medium.toLowerCase().includes(q) ||
        a.shopName.toLowerCase().includes(q)
      );
    }
    if (discipline !== "All") list = list.filter((a) => a.medium === discipline);
    if (sort === "featured") list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    return list;
  }, [discipline, search, sort]);

  const featured     = GRAPHIC_WORKS.filter((w) => w.isFeatured);
  const hasMore      = displayCount < filtered.length;
  const showEditorial = discipline === "All" && !search;

  const HERO_WORDS = ["Poster", "Type", "Vector", "Identity", "Infographic"];
  const heroWord   = HERO_WORDS[heroTick % HERO_WORDS.length];

  return (
    <div className="min-h-screen bg-white">

      {/* ══ HERO ════════════════════════════════════════════ */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-[#0d0d14]">

        {/* Background mosaic images */}
        <div className="absolute inset-0 grid grid-cols-3 gap-0 opacity-20">
          {[
            "/images/graphics_art/poster_art/download (3).png",
            "/images/graphics_art/typography_art/download (3).png",
            "/images/graphics_art/illustration/download (11).png",
          ].map((src, i) => (
            <div key={i} className="relative overflow-hidden">
              <Image src={src} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>
          ))}
        </div>
        {/* Left-to-right fade over the mosaic */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d14] via-[#0d0d14]/80 to-[#0d0d14]/40" />

        {/* Content */}
        <div className="relative container mx-auto px-4 pt-32 pb-24 z-10">
          <div className="max-w-3xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-1.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-[11px] uppercase tracking-[0.35em] text-white/50">Graphic Art Marketplace</span>
            </div>

            {/* Headline with animated word */}
            <h1 className="font-heading font-black leading-none mb-6 select-none">
              <span className="block text-6xl md:text-8xl text-white tracking-tight">
                Design
              </span>
              <span className="block text-6xl md:text-8xl tracking-tight">
                <span
                  key={heroWord}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-violet-400 transition-all duration-300"
                >
                  {heroWord}
                </span>
                <span className="text-white"> Art</span>
              </span>
            </h1>

            <p className="text-white/50 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              Original graphic works — posters, illustrations, typography, concept art, brand identity and more. Direct from the artists who made them.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { v: "83+",  l: "Works"      },
                { v: "5",    l: "Disciplines"},
                { v: "1",    l: "Studio"     },
              ].map(({ v, l }) => (
                <div key={l} className="border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-2.5 text-center">
                  <p className="text-xl font-bold text-white leading-none">{v}</p>
                  <p className="text-[9px] uppercase tracking-widest text-white/30 mt-1">{l}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="#browse"
                className="inline-flex items-center gap-2 bg-rose-700 hover:bg-rose-600 text-white px-8 py-3.5 text-sm font-semibold tracking-wide transition-colors"
              >
                Browse Works <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#disciplines"
                className="inline-flex items-center gap-2 border border-white/15 text-white/60 hover:text-white hover:border-white/40 px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
              >
                <Layers className="w-4 h-4" /> Explore Disciplines
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 animate-bounce">
          <p className="text-[9px] uppercase tracking-[0.4em]">Scroll</p>
          <ChevronDown className="w-4 h-4" />
        </div>

        {/* Ticker */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 py-2.5 overflow-hidden">
          <div className="flex gap-8 animate-marquee whitespace-nowrap text-[10px] uppercase tracking-[0.3em] text-white/20 select-none">
            {Array(4).fill([
              "Poster Art", "Typography Art", "Illustration", "Brand Identity",
              "Infographic Art",
            ]).flat().map((t, i) => (
              <span key={i} className="shrink-0">{t} <span className="text-rose-600/40 mx-2">·</span></span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DISCIPLINE FILTER STRIP ════════════════════════ */}
      <div id="disciplines" className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {DISCIPLINES.map((d) => (
            <button
              key={d}
              onClick={() => setDiscipline(d)}
              className={cn(
                "shrink-0 px-4 py-1.5 text-sm font-medium rounded-full border transition-colors",
                discipline === d
                  ? "bg-rose-700 text-white border-rose-700"
                  : "border-gray-200 text-gray-600 hover:border-rose-600 hover:text-rose-700 bg-white"
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* ══ DISCIPLINE CARDS ══════════════════════════════ */}
      {showEditorial && (
        <section className="py-20 border-b border-gray-100 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="mb-10">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">What We Cover</p>
              <h2 className="font-heading text-3xl font-bold text-gray-900">5 Graphic Disciplines</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {DISCIPLINES.filter((d) => d !== "All").map((d) => {
                const meta  = DISCIPLINE_META[d];
                const count = GRAPHIC_WORKS.filter((w) => w.medium === d).length;
                const Icon  = meta.icon;
                return (
                  <button
                    key={d}
                    onClick={() => { setDiscipline(d); document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" }); }}
                    className={cn(
                      "group flex flex-col items-start text-left p-5 border-2 rounded-none transition-all hover:shadow-md",
                      discipline === d ? meta.bg : "border-gray-100 bg-white hover:border-gray-300"
                    )}
                  >
                    <div className={cn("w-9 h-9 rounded flex items-center justify-center mb-3", meta.color, "bg-current/10")}>
                      <Icon className={cn("w-4 h-4", meta.color)} />
                    </div>
                    <p className="font-bold text-gray-900 text-sm leading-snug mb-1">{d}</p>
                    <p className="text-[11px] text-gray-400 leading-snug mb-3 line-clamp-2">{meta.desc}</p>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">
                      {count} work{count !== 1 ? "s" : ""}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══ FEATURED BENTO GRID ═══════════════════════════ */}
      {showEditorial && (
        <section className="py-20 border-b border-gray-100 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-rose-500 mb-2">Curated Picks</p>
                <h2 className="font-heading text-3xl font-bold text-gray-900">Editor&apos;s Selection</h2>
              </div>
              <Link href="#browse" className="hidden sm:flex items-center gap-1 text-sm text-gray-500 hover:text-rose-700 underline underline-offset-4 transition-colors">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Bento: 1 hero (col-span-2 row-span-2) + 4 small + 1 wide */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[220px] md:auto-rows-[260px]">
              {/* Hero */}
              {featured[0] && (
                <Link href={`/artwork/${featured[0].slug}`} className="group relative col-span-2 row-span-2 overflow-hidden bg-gray-100 block">
                  <Image src={featured[0].imageUrl} alt={featured[0].title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 bg-rose-700 text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1">
                    Editor&apos;s Pick
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-xs text-rose-300 uppercase tracking-widest mb-1">{featured[0].medium}</p>
                    <h3 className="font-heading text-2xl font-bold mb-1">{featured[0].title}</h3>
                    <p className="text-sm text-white/50">{featured[0].shopName}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs text-white/40 hover:text-white transition-colors">
                      View work <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              )}
              {/* 4 small */}
              {featured.slice(1, 5).map((w) => (
                <Link key={w.id} href={`/artwork/${w.slug}`} className="group relative overflow-hidden bg-gray-100 block">
                  <Image src={w.imageUrl} alt={w.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">{w.medium}</p>
                    <p className="text-sm font-semibold line-clamp-1">{w.title}</p>
                  </div>
                </Link>
              ))}
              {/* Wide bottom strip */}
              {featured[5] && (
                <Link href={`/artwork/${featured[5].slug}`} className="group relative col-span-2 overflow-hidden bg-gray-100 block">
                  <Image src={featured[5].imageUrl} alt={featured[5].title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                  <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-center p-6 text-white max-w-xs">
                    <p className="text-xs text-rose-300 uppercase tracking-widest mb-2">{featured[5].medium}</p>
                    <h3 className="font-heading text-xl font-bold mb-1">{featured[5].title}</h3>
                    <p className="text-sm text-white/50">{featured[5].shopName}</p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ══ WHAT IS GRAPHIC ART ════════════════════════════ */}
      {showEditorial && (
        <section className="py-20 bg-[#0d0d14] border-b border-white/5">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-rose-400 mb-2">Context</p>
              <h2 className="font-heading text-3xl font-bold text-white">About Graphic Art</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {INFO_BLOCKS.map((block, i) => (
                <div key={i} className="border border-white/8 p-8 bg-white/3">
                  <span className="block text-4xl font-black text-white/10 font-heading mb-4 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-white mb-3">{block.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{block.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ BROWSE GRID ═══════════════════════════════════ */}
      <section id="browse" className="py-14 bg-white">
        <div className="container mx-auto px-4">

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-8 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search graphic works…"
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
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-sm border border-gray-200 px-3 py-2 rounded hover:border-rose-600 focus:outline-none focus:border-rose-600 transition-colors bg-white"
              >
                {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {/* Active chips */}
          {(discipline !== "All" || search) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {discipline !== "All" && (
                <button onClick={() => setDiscipline("All")} className="flex items-center gap-1 text-xs bg-rose-50 border border-rose-200 text-rose-700 px-3 py-1 rounded-full hover:bg-rose-100 transition-colors">
                  {discipline} <X className="w-3 h-3" />
                </button>
              )}
              {search && (
                <button onClick={() => setSearch("")} className="flex items-center gap-1 text-xs bg-rose-50 border border-rose-200 text-rose-700 px-3 py-1 rounded-full hover:bg-rose-100 transition-colors">
                  &ldquo;{search}&rdquo; <X className="w-3 h-3" />
                </button>
              )}
            </div>
          )}

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">✏️</div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">No works found</h3>
              <p className="text-gray-500 text-sm mb-5">Try a different discipline or clear the filters</p>
              <button onClick={() => { setDiscipline("All"); setSearch(""); }}
                className="text-sm underline text-rose-600 hover:text-rose-700">
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
                {filtered.slice(0, displayCount).map((w) => (
                  <ArtCard key={w.id} {...w} />
                ))}
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

      {/* ══ PROCESS INFO STRIP ════════════════════════════ */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Original Files Included</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Many graphic works include the original working file (AI, PSD, or Procreate). Check each listing — artists choose what to include.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Limited Editions</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Graphic prints are released in limited runs of 10, 25, or 50. Each comes numbered and signed. Once the edition closes, it&apos;s gone.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Commission a Custom Work</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Like a studio&apos;s style? Many graphic artists accept commissions — logo redesigns, custom poster art, bespoke illustrations.{" "}
                <Link href="/browse" className="text-rose-700 underline underline-offset-2 hover:text-rose-800">Find a studio →</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ARTIST CTA ═══════════════════════════════════ */}
      <section className="relative py-28 overflow-hidden bg-[#0d0d14]">
        {/* Subtle background image */}
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/graphics_art/brand_itentity/download (11).png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[#0d0d14]/70" />
        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest text-white/40 mb-6">
            <PenTool className="w-3 h-3 text-rose-500" /> For Graphic Artists
          </div>
          <h2 className="font-heading text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
            Sell Your<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-violet-400">
              Graphic Work
            </span>
          </h2>
          <p className="text-white/40 text-lg mb-4 max-w-lg mx-auto leading-relaxed">
            Open your free shop in minutes. Set your own prices and edition sizes. We handle payments and connect you with collectors globally.
          </p>
          <div className="flex flex-wrap gap-3 justify-center text-sm text-white/25 mb-10">
            <span>✓ Free to start</span>
            <span>✓ Only 2% per sale</span>
            <span>✓ Edition control</span>
            <span>✓ Instant Stripe payouts</span>
          </div>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-rose-700 hover:bg-rose-600 text-white px-10 py-4 text-sm font-semibold tracking-wide transition-colors"
          >
            Open Your Free Shop <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
