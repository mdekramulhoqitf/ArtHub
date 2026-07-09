"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, Search, X, SlidersHorizontal,
  Package, Truck, ShieldCheck, RotateCcw,
  ChevronDown, ChevronRight,
} from "lucide-react";
import { ArtCard } from "@/components/artwork/art-card";
import { cn } from "@/lib/utils";

/* ─────────────────────── data ─────────────────────── */

const SCULPTURES = [
  { id:"s1",  slug:"bronze-figure-i",      title:"Bronze Figure I",       imageUrl:"https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600",  price:1850, status:"ACTIVE" as const, shopName:"Forge & Form",    shopSlug:"forge-form",    isFeatured:true,  widthCm:25,  heightCm:60,  medium:"Bronze"   },
  { id:"s2",  slug:"white-torso",           title:"White Torso",           imageUrl:"https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600",  price:2400, status:"ACTIVE" as const, shopName:"Marble House",   shopSlug:"marble-house",  isFeatured:true,  widthCm:30,  heightCm:75,  medium:"Marble"   },
  { id:"s3",  slug:"iron-spiral",           title:"Iron Spiral",           imageUrl:"https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600",  price:980,  status:"ACTIVE" as const, shopName:"Metal & Mind",   shopSlug:"metal-mind",    isFeatured:false, widthCm:20,  heightCm:40,  medium:"Steel"    },
  { id:"s4",  slug:"ceramic-vessel-ii",     title:"Ceramic Vessel II",     imageUrl:"https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600",  price:540,  status:"ACTIVE" as const, shopName:"Clay & Fire",    shopSlug:"clay-fire",     isFeatured:false, widthCm:18,  heightCm:28,  medium:"Ceramic"  },
  { id:"s5",  slug:"oak-abstraction",       title:"Oak Abstraction",       imageUrl:"https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600",  price:1200, status:"ACTIVE" as const, shopName:"Woodform",       shopSlug:"woodform",      isFeatured:true,  widthCm:35,  heightCm:55,  medium:"Wood"     },
  { id:"s6",  slug:"cast-glass-study",      title:"Cast Glass Study",      imageUrl:"https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600",  price:1650, status:"ACTIVE" as const, shopName:"Light & Cast",   shopSlug:"light-cast",    isFeatured:true,  widthCm:22,  heightCm:35,  medium:"Glass"    },
  { id:"s7",  slug:"marble-head",           title:"Marble Head",           imageUrl:"https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600",  price:3200, status:"ACTIVE" as const, shopName:"Marble House",   shopSlug:"marble-house",  isFeatured:true,  widthCm:20,  heightCm:45,  medium:"Marble"   },
  { id:"s8",  slug:"reclaimed-wood-totem",  title:"Reclaimed Wood Totem",  imageUrl:"https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600",  price:870,  status:"ACTIVE" as const, shopName:"Woodform",       shopSlug:"woodform",      isFeatured:false, widthCm:15,  heightCm:90,  medium:"Wood"     },
  { id:"s9",  slug:"bronze-hand",           title:"Bronze Hand",           imageUrl:"https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600",  price:760,  status:"ACTIVE" as const, shopName:"Forge & Form",   shopSlug:"forge-form",    isFeatured:false, widthCm:12,  heightCm:22,  medium:"Bronze"   },
  { id:"s10", slug:"stoneware-bowl",        title:"Stoneware Bowl",        imageUrl:"https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=600",  price:320,  status:"ACTIVE" as const, shopName:"Clay & Fire",    shopSlug:"clay-fire",     isFeatured:false, widthCm:30,  heightCm:15,  medium:"Ceramic"  },
  { id:"s11", slug:"steel-wave",            title:"Steel Wave",            imageUrl:"https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=600",  price:2800, status:"ACTIVE" as const, shopName:"Metal & Mind",   shopSlug:"metal-mind",    isFeatured:true,  widthCm:80,  heightCm:50,  medium:"Steel"    },
  { id:"s12", slug:"blown-glass-sphere",    title:"Blown Glass Sphere",    imageUrl:"https://images.unsplash.com/photo-1620421680010-0766ff230392?w=600",  price:1100, status:"SOLD" as const,   shopName:"Light & Cast",   shopSlug:"light-cast",    isFeatured:false, widthCm:25,  heightCm:25,  medium:"Glass"    },
  { id:"s13", slug:"figurative-bronze-ii",  title:"Figurative Bronze II",  imageUrl:"https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600",  price:4200, status:"ACTIVE" as const, shopName:"Forge & Form",   shopSlug:"forge-form",    isFeatured:true,  widthCm:30,  heightCm:85,  medium:"Bronze"   },
  { id:"s14", slug:"raku-teapot",           title:"Raku Teapot",           imageUrl:"https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=600",  price:490,  status:"ACTIVE" as const, shopName:"Clay & Fire",    shopSlug:"clay-fire",     isFeatured:false, widthCm:20,  heightCm:18,  medium:"Ceramic"  },
  { id:"s15", slug:"walnut-relief",         title:"Walnut Relief",         imageUrl:"https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600",  price:1450, status:"ACTIVE" as const, shopName:"Woodform",       shopSlug:"woodform",      isFeatured:false, widthCm:60,  heightCm:40,  medium:"Wood"     },
  { id:"s16", slug:"patinated-copper-bird", title:"Patinated Copper Bird", imageUrl:"https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600",  price:680,  status:"ACTIVE" as const, shopName:"Metal & Mind",   shopSlug:"metal-mind",    isFeatured:false, widthCm:18,  heightCm:30,  medium:"Bronze"   },
  { id:"s17", slug:"marble-fragment",       title:"Marble Fragment",       imageUrl:"https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600",  price:1900, status:"ACTIVE" as const, shopName:"Marble House",   shopSlug:"marble-house",  isFeatured:false, widthCm:28,  heightCm:50,  medium:"Marble"   },
  { id:"s18", slug:"kiln-form-study",       title:"Kiln Form Study",       imageUrl:"https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600",  price:720,  status:"ACTIVE" as const, shopName:"Clay & Fire",    shopSlug:"clay-fire",     isFeatured:false, widthCm:22,  heightCm:32,  medium:"Ceramic"  },
  { id:"s19", slug:"corten-portal",         title:"Corten Portal",         imageUrl:"https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=600",  price:5600, status:"ACTIVE" as const, shopName:"Metal & Mind",   shopSlug:"metal-mind",    isFeatured:true,  widthCm:120, heightCm:150, medium:"Steel"    },
  { id:"s20", slug:"fused-glass-panel",     title:"Fused Glass Panel",     imageUrl:"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600",  price:1380, status:"ACTIVE" as const, shopName:"Light & Cast",   shopSlug:"light-cast",    isFeatured:false, widthCm:50,  heightCm:70,  medium:"Glass"    },
  { id:"s21", slug:"elm-column",            title:"Elm Column",            imageUrl:"https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600",  price:1050, status:"ACTIVE" as const, shopName:"Woodform",       shopSlug:"woodform",      isFeatured:false, widthCm:15,  heightCm:100, medium:"Wood"     },
  { id:"s22", slug:"lost-wax-dancer",       title:"Lost Wax Dancer",       imageUrl:"https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600",  price:3800, status:"ACTIVE" as const, shopName:"Forge & Form",   shopSlug:"forge-form",    isFeatured:true,  widthCm:20,  heightCm:65,  medium:"Bronze"   },
  { id:"s23", slug:"carrara-fragment",      title:"Carrara Fragment",      imageUrl:"https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600",  price:2600, status:"ACTIVE" as const, shopName:"Marble House",   shopSlug:"marble-house",  isFeatured:false, widthCm:35,  heightCm:60,  medium:"Marble"   },
  { id:"s24", slug:"porcelain-moon",        title:"Porcelain Moon",        imageUrl:"https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=600",  price:890,  status:"ACTIVE" as const, shopName:"Clay & Fire",    shopSlug:"clay-fire",     isFeatured:false, widthCm:28,  heightCm:28,  medium:"Ceramic"  },
];

const MATERIALS = ["All", "Bronze", "Marble", "Steel", "Wood", "Ceramic", "Glass"];

const MATERIAL_META: Record<string, { color: string; desc: string; image: string }> = {
  Bronze:  { color: "from-amber-900 to-amber-700",   desc: "Cast & lost-wax works",   image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600"  },
  Marble:  { color: "from-slate-400 to-slate-200",   desc: "Hand-carved originals",   image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600"  },
  Steel:   { color: "from-zinc-700 to-zinc-500",     desc: "Welded & fabricated",     image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600" },
  Wood:    { color: "from-orange-900 to-amber-600",  desc: "Carved & assembled",      image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600"  },
  Ceramic: { color: "from-stone-500 to-stone-300",   desc: "Wheel-thrown & hand-built",image:"https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600" },
  Glass:   { color: "from-teal-700 to-cyan-400",     desc: "Blown, cast & fused",     image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600" },
};

const SIZE_FILTERS = [
  { label: "Tabletop",    desc: "Under 30 cm",   test: (h: number) => h < 30   },
  { label: "Medium",      desc: "30 – 60 cm",    test: (h: number) => h >= 30 && h <= 60 },
  { label: "Statement",   desc: "60 – 100 cm",   test: (h: number) => h > 60 && h <= 100 },
  { label: "Monumental",  desc: "Over 100 cm",   test: (h: number) => h > 100  },
];

const SORT_OPTIONS = [
  { value: "featured",   label: "Featured"          },
  { value: "price_asc",  label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
];

const PROCESS_STEPS = [
  { n: "01", title: "Material Selection",  body: "Artists source bronze alloys, Carrara marble, sustainably harvested hardwoods and kiln-grade ceramics — each material chosen for its unique character." },
  { n: "02", title: "Form & Fabrication",  body: "From hand-carved stone to lost-wax bronze casting, every sculpture is built through a deeply physical process spanning days to months." },
  { n: "03", title: "Finishing & Patina",  body: "Surface treatment — acid patina, stone polishing, wood oiling — gives each piece its final voice and ensures lasting beauty." },
  { n: "04", title: "Crating & Delivery",  body: "Sculptures are custom-crated by specialist art handlers and shipped with full insurance, tracking, and white-glove delivery options." },
];

/* ─────────────────────── component ─────────────────── */

export default function SculpturePage() {
  const [material, setMaterial]         = useState("All");
  const [sizeFilter, setSizeFilter]     = useState("All");
  const [search, setSearch]             = useState("");
  const [sort, setSort]                 = useState("featured");
  const [priceMin, setPriceMin]         = useState("");
  const [priceMax, setPriceMax]         = useState("");
  const [filtersOpen, setFiltersOpen]   = useState(false);
  const [displayCount, setDisplayCount] = useState(12);
  const [activeProcess, setActiveProcess] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);
  const heroRef   = useRef<HTMLDivElement>(null);

  // Reset count on filter change
  useEffect(() => { setDisplayCount(12); }, [material, sizeFilter, search, sort, priceMin, priceMax]);

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
    let list = [...SCULPTURES];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((s) =>
        s.title.toLowerCase().includes(q) ||
        s.medium.toLowerCase().includes(q) ||
        s.shopName.toLowerCase().includes(q)
      );
    }
    if (material !== "All") list = list.filter((s) => s.medium === material);
    if (sizeFilter !== "All") {
      const rule = SIZE_FILTERS.find((f) => f.label === sizeFilter);
      if (rule) list = list.filter((s) => rule.test(s.heightCm ?? 0));
    }
    if (priceMin) list = list.filter((s) => s.price >= Number(priceMin));
    if (priceMax) list = list.filter((s) => s.price <= Number(priceMax));
    if (sort === "price_asc")  list.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
    if (sort === "featured")   list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    return list;
  }, [material, sizeFilter, search, sort, priceMin, priceMax]);

  const featured       = SCULPTURES.filter((s) => s.isFeatured);
  const hasMore        = displayCount < filtered.length;
  const showEditorial  = material === "All" && sizeFilter === "All" && !search && !priceMin && !priceMax;
  const activeFilters  = [material !== "All" && material, sizeFilter !== "All" && sizeFilter, search && `"${search}"`, (priceMin || priceMax) && `$${priceMin || "0"}–$${priceMax || "∞"}`].filter(Boolean) as string[];

  return (
    <div className="min-h-screen bg-[#0e0e0e]">

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-end overflow-hidden">

        {/* Background — layered images */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=1800"
            alt="Sculpture hero"
            fill
            className="object-cover opacity-50"
            priority
          />
          {/* Gradient layers */}
          <div className="absolute inset-0 bg-linear-to-r from-[#0e0e0e] via-[#0e0e0e]/60 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-[#0e0e0e] via-transparent to-[#0e0e0e]/30" />
        </div>

        {/* Vertical text — right side decoration */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3 text-white/15 select-none">
          <div className="h-16 w-px bg-white/15" />
          <p className="text-[10px] uppercase tracking-[0.5em] writing-mode-vertical" style={{ writingMode: "vertical-rl", letterSpacing: "0.4em" }}>
            Three-Dimensional Art
          </p>
          <div className="h-16 w-px bg-white/15" />
        </div>

        {/* Hero content */}
        <div className="relative container mx-auto px-4 pb-24 pt-40">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-rose-500" />
              <p className="text-xs uppercase tracking-[0.4em] text-rose-400">Original Sculpture</p>
            </div>

            {/* Headline — staggered */}
            <h1 className="font-heading leading-none text-white mb-6">
              <span className="block text-6xl md:text-8xl font-bold tracking-tight">Sculp-</span>
              <span className="block text-6xl md:text-8xl font-bold tracking-tight text-rose-500 ml-8 md:ml-16">ture.</span>
            </h1>

            <p className="text-white/50 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
              Three-dimensional originals in bronze, marble, steel, wood, ceramic and glass — handmade by independent sculptors worldwide.
            </p>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-3 mb-12">
              {[
                { v: "210+", l: "Sculptures" },
                { v: "60+",  l: "Sculptors"  },
                { v: "6",    l: "Materials"  },
                { v: "48",   l: "Countries"  },
              ].map(({ v, l }) => (
                <div key={l} className="border border-white/10 bg-white/5 backdrop-blur px-5 py-2.5 text-center">
                  <p className="text-xl font-bold text-white leading-none">{v}</p>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">{l}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="#browse"
                className="inline-flex items-center gap-2 bg-rose-700 hover:bg-rose-600 text-white px-8 py-3.5 text-sm font-semibold tracking-wide transition-colors"
              >
                Browse Sculptures <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#materials"
                className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/50 px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
              >
                Explore by Material
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
          <p className="text-[10px] uppercase tracking-[0.3em]">Scroll</p>
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      {/* ══ MATERIALS GRID ════════════════════════════════ */}
      <section id="materials" className="bg-[#0e0e0e] py-20 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-rose-500" />
                <p className="text-xs uppercase tracking-[0.3em] text-rose-400">Filter</p>
              </div>
              <h2 className="font-heading text-3xl font-bold text-white">Browse by Material</h2>
            </div>
            <p className="text-white/30 text-sm hidden sm:block">Click to filter</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {MATERIALS.filter((m) => m !== "All").map((mat) => {
              const meta = MATERIAL_META[mat];
              const count = SCULPTURES.filter((s) => s.medium === mat).length;
              return (
                <button
                  key={mat}
                  onClick={() => setMaterial(material === mat ? "All" : mat)}
                  className={cn(
                    "group relative overflow-hidden aspect-square transition-all duration-300",
                    material === mat ? "ring-2 ring-rose-500 ring-offset-2 ring-offset-[#0e0e0e]" : "opacity-80 hover:opacity-100"
                  )}
                >
                  <Image src={meta.image} alt={mat} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className={cn("absolute inset-0 bg-linear-to-t opacity-80", meta.color)} />
                  {material === mat && (
                    <div className="absolute inset-0 bg-rose-700/20" />
                  )}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-2">
                    <p className="font-bold text-sm tracking-wide">{mat}</p>
                    <p className="text-[10px] text-white/60 mt-1">{meta.desc}</p>
                    <p className="text-[10px] text-white/40 mt-0.5">{count} works</p>
                  </div>
                  {material === mat && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-rose-600 rounded-full flex items-center justify-center">
                      <X className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ FEATURED EDITORIAL ════════════════════════════ */}
      {showEditorial && (
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-rose-500 mb-2">Masterworks</p>
                <h2 className="font-heading text-3xl font-bold text-gray-900">Featured Sculptures</h2>
              </div>
              <Link href="#browse" className="hidden sm:flex items-center gap-1 text-sm text-gray-500 hover:text-rose-700 underline underline-offset-4 transition-colors">
                See all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Asymmetric bento grid */}
            <div className="grid grid-cols-12 grid-rows-2 gap-4 h-[600px] md:h-[700px]">
              {/* Hero piece — spans 5 cols × 2 rows */}
              <Link href={`/artwork/${featured[0]?.slug}`}
                className="group relative col-span-12 md:col-span-5 row-span-2 overflow-hidden bg-gray-100">
                <Image src={featured[0]?.imageUrl ?? ""} alt={featured[0]?.title ?? ""} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-gray-900/90 via-gray-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <span className="inline-block bg-rose-700 text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 mb-3">Featured Work</span>
                  <h3 className="font-heading text-2xl font-bold mb-1">{featured[0]?.title}</h3>
                  <p className="text-white/60 text-sm">{featured[0]?.medium} · {featured[0]?.heightCm}cm · ${featured[0]?.price?.toLocaleString()}</p>
                  <p className="text-white/40 text-xs mt-1">{featured[0]?.shopName}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors">
                    View piece <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>

              {/* Top-right — spans 7 cols row 1, split into 3+4 */}
              <Link href={`/artwork/${featured[1]?.slug}`}
                className="group relative col-span-12 md:col-span-4 row-span-1 overflow-hidden bg-gray-100">
                <Image src={featured[1]?.imageUrl ?? ""} alt={featured[1]?.title ?? ""} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-gray-900/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="text-xs text-white/50 uppercase tracking-widest">{featured[1]?.medium}</p>
                  <h3 className="font-semibold text-sm mt-0.5">{featured[1]?.title}</h3>
                  <p className="text-xs text-white/50">${featured[1]?.price?.toLocaleString()}</p>
                </div>
              </Link>

              <Link href={`/artwork/${featured[2]?.slug}`}
                className="group relative col-span-12 md:col-span-3 row-span-1 overflow-hidden bg-gray-100">
                <Image src={featured[2]?.imageUrl ?? ""} alt={featured[2]?.title ?? ""} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-gray-900/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="text-xs text-white/50 uppercase tracking-widest">{featured[2]?.medium}</p>
                  <h3 className="font-semibold text-sm mt-0.5">{featured[2]?.title}</h3>
                  <p className="text-xs text-white/50">${featured[2]?.price?.toLocaleString()}</p>
                </div>
              </Link>

              {/* Bottom-right row */}
              <Link href={`/artwork/${featured[3]?.slug}`}
                className="group relative col-span-6 md:col-span-3 row-span-1 overflow-hidden bg-gray-100">
                <Image src={featured[3]?.imageUrl ?? ""} alt={featured[3]?.title ?? ""} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-gray-900/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold text-sm">{featured[3]?.title}</h3>
                  <p className="text-xs text-white/50">${featured[3]?.price?.toLocaleString()}</p>
                </div>
              </Link>
              <Link href={`/artwork/${featured[4]?.slug}`}
                className="group relative col-span-6 md:col-span-4 row-span-1 overflow-hidden bg-gray-100">
                <Image src={featured[4]?.imageUrl ?? ""} alt={featured[4]?.title ?? ""} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-gray-900/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold text-sm">{featured[4]?.title}</h3>
                  <p className="text-xs text-white/50">${featured[4]?.price?.toLocaleString()}</p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ══ SIZE GUIDE ════════════════════════════════════ */}
      {showEditorial && (
        <section className="bg-gray-50 border-t border-b border-gray-100 py-14">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1">Filter by</p>
                <h2 className="font-heading text-2xl font-bold text-gray-900">Size</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {SIZE_FILTERS.map((sf) => {
                const count = SCULPTURES.filter((s) => sf.test(s.heightCm ?? 0)).length;
                return (
                  <button
                    key={sf.label}
                    onClick={() => { setSizeFilter(sizeFilter === sf.label ? "All" : sf.label); document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" }); }}
                    className={cn(
                      "border-2 p-6 text-left transition-all group",
                      sizeFilter === sf.label
                        ? "border-rose-600 bg-rose-50"
                        : "border-gray-200 bg-white hover:border-rose-400"
                    )}
                  >
                    {/* Scale visual */}
                    <div className="flex items-end gap-1 mb-4 h-10">
                      {sf.label === "Tabletop"   && <div className="w-4 bg-rose-200 rounded-sm" style={{ height: "30%" }} />}
                      {sf.label === "Medium"     && <div className="w-4 bg-rose-300 rounded-sm" style={{ height: "55%" }} />}
                      {sf.label === "Statement"  && <div className="w-4 bg-rose-500 rounded-sm" style={{ height: "75%" }} />}
                      {sf.label === "Monumental" && <div className="w-4 bg-rose-700 rounded-sm" style={{ height: "100%" }} />}
                      <div className="w-px h-full bg-gray-200 ml-1" />
                    </div>
                    <p className={cn("font-bold text-base mb-0.5", sizeFilter === sf.label ? "text-rose-700" : "text-gray-900")}>{sf.label}</p>
                    <p className="text-xs text-gray-400">{sf.desc}</p>
                    <p className="text-xs text-gray-400 mt-1">{count} works</p>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══ THE PROCESS ═══════════════════════════════════ */}
      {showEditorial && (
        <section className="bg-[#0e0e0e] py-20 border-t border-white/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left — image */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800"
                  alt="Sculpture process"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-tr from-[#0e0e0e]/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white/30 text-xs uppercase tracking-widest mb-1">Studio Process</p>
                  <p className="text-white font-heading text-xl font-bold">From Raw Material<br/>to Finished Work</p>
                </div>
              </div>

              {/* Right — accordion steps */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-rose-500" />
                  <p className="text-xs uppercase tracking-[0.3em] text-rose-400">Behind the Work</p>
                </div>
                <h2 className="font-heading text-3xl font-bold text-white mb-8">The Sculptor's Process</h2>

                <div className="space-y-0">
                  {PROCESS_STEPS.map((step, i) => (
                    <button
                      key={step.n}
                      onClick={() => setActiveProcess(i)}
                      className="w-full text-left border-t border-white/10 py-5 group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <span className={cn("text-xs font-bold mt-0.5 shrink-0 transition-colors", activeProcess === i ? "text-rose-500" : "text-white/20 group-hover:text-white/40")}>
                            {step.n}
                          </span>
                          <div>
                            <p className={cn("font-semibold text-sm transition-colors", activeProcess === i ? "text-white" : "text-white/50 group-hover:text-white/80")}>
                              {step.title}
                            </p>
                            {activeProcess === i && (
                              <p className="text-white/50 text-sm mt-2 leading-relaxed pr-4">{step.body}</p>
                            )}
                          </div>
                        </div>
                        <ChevronDown className={cn("w-4 h-4 shrink-0 mt-0.5 transition-all", activeProcess === i ? "text-rose-500 rotate-180" : "text-white/20")} />
                      </div>
                    </button>
                  ))}
                  <div className="border-t border-white/10" />
                </div>
              </div>
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
                  placeholder="Search sculptures…"
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

          {/* Price / size filter panel */}
          {filtersOpen && (
            <div className="mb-8 p-5 bg-gray-50 border border-gray-100 rounded-lg flex flex-wrap gap-6 items-end">
              <div>
                <p className="text-xs font-semibold text-gray-700 uppercase tracking-widest mb-2">Price Range</p>
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Min $" value={priceMin} onChange={(e) => setPriceMin(e.target.value)}
                    className="w-28 border border-gray-200 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-rose-600" />
                  <span className="text-gray-400">—</span>
                  <input type="number" placeholder="Max $" value={priceMax} onChange={(e) => setPriceMax(e.target.value)}
                    className="w-28 border border-gray-200 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-rose-600" />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[["Under $500","","500"],["$500–1k","500","1000"],["$1k–3k","1000","3000"],["Over $3k","3000",""]].map(([l,mn,mx]) => (
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
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {activeFilters.map((f) => (
                <span key={f} className="flex items-center gap-1 text-xs bg-rose-50 border border-rose-200 text-rose-700 px-3 py-1 rounded-full">
                  {f}
                  <button onClick={() => {
                    if (f === material) setMaterial("All");
                    else if (f === sizeFilter) setSizeFilter("All");
                    else if (f.startsWith('"')) setSearch("");
                    else { setPriceMin(""); setPriceMax(""); }
                  }}><X className="w-3 h-3" /></button>
                </span>
              ))}
              <button
                onClick={() => { setMaterial("All"); setSizeFilter("All"); setSearch(""); setPriceMin(""); setPriceMax(""); }}
                className="text-xs text-gray-400 hover:text-rose-600 underline underline-offset-2 ml-1"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">🗿</div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">No sculptures found</h3>
              <p className="text-gray-500 text-sm mb-5">Try a different material or clear filters</p>
              <button
                onClick={() => { setMaterial("All"); setSizeFilter("All"); setSearch(""); setPriceMin(""); setPriceMax(""); }}
                className="text-sm underline text-rose-600 hover:text-rose-700"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
                {filtered.slice(0, displayCount).map((s) => <ArtCard key={s.id} {...s} />)}
              </div>
              {hasMore ? (
                <div ref={loaderRef} className="flex items-center justify-center gap-2 py-12 text-sm text-gray-400">
                  <span className="w-4 h-4 border-2 border-gray-300 border-t-rose-600 rounded-full animate-spin" />
                  Loading more…
                </div>
              ) : (
                <p className="text-center text-xs text-gray-400 py-10 uppercase tracking-widest">
                  All {filtered.length} sculptures shown
                </p>
              )}
            </>
          )}
        </div>
      </section>

      {/* ══ TRUST STRIP ═══════════════════════════════════ */}
      <section className="bg-gray-50 border-t border-gray-100 py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Package,     title: "Custom Crating",    desc: "Every sculpture custom-packed by art handlers." },
              { icon: Truck,       title: "White Glove",       desc: "Room-of-choice delivery available worldwide."    },
              { icon: ShieldCheck, title: "Fully Insured",     desc: "Full replacement value insurance included."      },
              { icon: RotateCcw,   title: "14-Day Returns",    desc: "Not right for your space? Return it, hassle-free." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-3">
                <div className="w-10 h-10 bg-rose-50 border border-rose-100 rounded flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ COMMISSION CTA ════════════════════════════════ */}
      <section className="bg-[#0e0e0e] py-24 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-rose-500" />
                <p className="text-xs uppercase tracking-[0.3em] text-rose-400">Custom Work</p>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
                Commission a<br />
                <span className="text-rose-500">Unique Piece</span>
              </h2>
              <p className="text-white/50 text-lg mb-8 leading-relaxed max-w-md">
                Many sculptors on ArtHub accept commissions — contact them directly to discuss your vision, scale and material.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/shops" className="inline-flex items-center gap-2 bg-rose-700 hover:bg-rose-600 text-white px-8 py-3.5 text-sm font-semibold tracking-wide transition-colors">
                  Browse Sculptors <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/register" className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/50 px-8 py-3.5 text-sm font-medium tracking-wide transition-colors">
                  Sell Your Work
                </Link>
              </div>
            </div>

            {/* Stacked image collage */}
            <div className="relative h-80 lg:h-96 hidden lg:block">
              <div className="absolute inset-0 grid grid-cols-2 gap-3">
                <div className="relative overflow-hidden">
                  <Image src="https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600" alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-70 hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="relative flex-1 overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600" alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-70 hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="relative flex-1 overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600" alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-70 hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
              {/* Overlay label */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/5 backdrop-blur border border-white/10 p-4">
                <p className="text-white/60 text-xs uppercase tracking-widest">Average commission timeline</p>
                <p className="text-white font-semibold text-lg mt-0.5">4 – 16 weeks</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
