"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Search, SlidersHorizontal, X, Grid3X3, Grid2X2, LayoutList } from "lucide-react";
import { ArtCard } from "@/components/artwork/art-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ALL_ARTWORKS = [
  { id: "1", slug: "golden-sunset", title: "Golden Sunset", imageUrl: "/images/public_art/download (3).png", price: 450, status: "ACTIVE" as const, shopName: "Studio Lumi", shopSlug: "studio-lumi", isFeatured: true, widthCm: 60, heightCm: 80, medium: "Oil" },
  { id: "2", slug: "blue-serenity", title: "Blue Serenity", imageUrl: "/images/public_art/download (9).png", price: 320, status: "ACTIVE" as const, shopName: "Art by Nadia", shopSlug: "art-by-nadia", widthCm: 50, heightCm: 70, medium: "Watercolor" },
  { id: "3", slug: "urban-echoes", title: "Urban Echoes", imageUrl: "/images/public_art/download (10).png", price: 780, status: "ACTIVE" as const, shopName: "UrbanCanvas", shopSlug: "urban-canvas", isFeatured: true, widthCm: 90, heightCm: 120, medium: "Acrylic" },
  { id: "4", slug: "forest-dream", title: "Forest Dream", imageUrl: "/images/public_art/download (11).png", price: 210, status: "SOLD" as const, shopName: "GreenStrokes", shopSlug: "green-strokes", widthCm: 40, heightCm: 50, medium: "Gouache" },
  { id: "5", slug: "abstract-thoughts", title: "Abstract Thoughts", imageUrl: "/images/public_art/download (2).jpg", price: 560, status: "ACTIVE" as const, shopName: "Studio Lumi", shopSlug: "studio-lumi", widthCm: 70, heightCm: 90, medium: "Mixed Media" },
  { id: "6", slug: "crimson-tide", title: "Crimson Tide", imageUrl: "/images/public_art/download (12).png", price: 390, status: "ACTIVE" as const, shopName: "RedBrush", shopSlug: "red-brush", widthCm: 55, heightCm: 75, medium: "Oil" },
  { id: "7", slug: "morning-mist", title: "Morning Mist", imageUrl: "/images/public_art/download (13).png", price: 290, status: "ACTIVE" as const, shopName: "Art by Nadia", shopSlug: "art-by-nadia", widthCm: 45, heightCm: 60, medium: "Watercolor" },
  { id: "8", slug: "fire-and-ice", title: "Fire and Ice", imageUrl: "/images/public_art/download (14).png", price: 650, status: "ACTIVE" as const, shopName: "UrbanCanvas", shopSlug: "urban-canvas", widthCm: 80, heightCm: 100, medium: "Digital" },
  { id: "9", slug: "quiet-harbor", title: "Quiet Harbor", imageUrl: "/images/public_art/download (15).png", price: 480, status: "ACTIVE" as const, shopName: "Studio Lumi", shopSlug: "studio-lumi", widthCm: 65, heightCm: 85, medium: "Oil" },
  { id: "10", slug: "dusk-portrait", title: "Dusk Portrait", imageUrl: "/images/public_art/download (16).png", price: 520, status: "ACTIVE" as const, shopName: "Atelier M", shopSlug: "atelier-m", widthCm: 60, heightCm: 80, medium: "Oil" },
  { id: "11", slug: "coastal-wind", title: "Coastal Wind", imageUrl: "/images/public_art/download (17).png", price: 340, status: "ACTIVE" as const, shopName: "SeaStudio", shopSlug: "sea-studio", widthCm: 70, heightCm: 50, medium: "Watercolor" },
  { id: "12", slug: "night-bloom", title: "Night Bloom", imageUrl: "/images/public_art/download (18).png", price: 410, status: "ACTIVE" as const, shopName: "Flora Arts", shopSlug: "flora-arts", widthCm: 50, heightCm: 70, medium: "Acrylic" },
  { id: "13", slug: "red-geometry", title: "Red Geometry", imageUrl: "/images/public_art/download (19).png", price: 720, status: "ACTIVE" as const, shopName: "UrbanCanvas", shopSlug: "urban-canvas", isFeatured: true, widthCm: 100, heightCm: 100, medium: "Acrylic" },
  { id: "14", slug: "silent-geometry", title: "Silent Geometry", imageUrl: "/images/public_art/download (20).png", price: 290, status: "ACTIVE" as const, shopName: "GeoArt", shopSlug: "geo-art", widthCm: 45, heightCm: 45, medium: "Acrylic" },
  { id: "15", slug: "morning-light", title: "Morning Light", imageUrl: "/images/public_art/download (21).png", price: 680, status: "ACTIVE" as const, shopName: "Studio Lumi", shopSlug: "studio-lumi", widthCm: 80, heightCm: 100, medium: "Oil" },
  { id: "16", slug: "summer-fields", title: "Summer Fields", imageUrl: "/images/public_art/download (22).png", price: 175, status: "ACTIVE" as const, shopName: "GreenStrokes", shopSlug: "green-strokes", widthCm: 35, heightCm: 45, medium: "Watercolor" },
  { id: "17", slug: "twilight-garden", title: "Twilight Garden", imageUrl: "/images/public_art/download (23).png", price: 430, status: "ACTIVE" as const, shopName: "Flora Arts", shopSlug: "flora-arts", widthCm: 60, heightCm: 80, medium: "Oil" },
  { id: "18", slug: "whisper-of-wind", title: "Whisper of Wind", imageUrl: "/images/public_art/download (24).png", price: 310, status: "ACTIVE" as const, shopName: "Art by Nadia", shopSlug: "art-by-nadia", widthCm: 50, heightCm: 65, medium: "Watercolor" },
  { id: "19", slug: "amber-glow", title: "Amber Glow", imageUrl: "/images/public_art/download (25).png", price: 590, status: "ACTIVE" as const, shopName: "Studio Lumi", shopSlug: "studio-lumi", widthCm: 75, heightCm: 95, medium: "Acrylic" },
  { id: "20", slug: "midnight-reflections", title: "Midnight Reflections", imageUrl: "/images/public_art/download (26).png", price: 670, status: "ACTIVE" as const, shopName: "UrbanCanvas", shopSlug: "urban-canvas", isFeatured: true, widthCm: 85, heightCm: 110, medium: "Oil" },
  { id: "21", slug: "spring-awakening", title: "Spring Awakening", imageUrl: "/images/public_art/download (27).png", price: 250, status: "ACTIVE" as const, shopName: "GreenStrokes", shopSlug: "green-strokes", widthCm: 40, heightCm: 55, medium: "Watercolor" },
  { id: "22", slug: "iron-petals", title: "Iron Petals", imageUrl: "/images/public_art/download (28).png", price: 820, status: "ACTIVE" as const, shopName: "RedBrush", shopSlug: "red-brush", widthCm: 90, heightCm: 120, medium: "Mixed Media" },
  { id: "23", slug: "lavender-haze", title: "Lavender Haze", imageUrl: "/images/public_art/download (29).png", price: 360, status: "ACTIVE" as const, shopName: "Atelier M", shopSlug: "atelier-m", widthCm: 55, heightCm: 70, medium: "Oil" },
  { id: "24", slug: "stone-symphony", title: "Stone Symphony", imageUrl: "/images/public_art/download (30).png", price: 440, status: "ACTIVE" as const, shopName: "GeoArt", shopSlug: "geo-art", widthCm: 60, heightCm: 60, medium: "Acrylic" },
  { id: "25", slug: "river-dance", title: "River Dance", imageUrl: "/images/public_art/download (31).png", price: 510, status: "ACTIVE" as const, shopName: "SeaStudio", shopSlug: "sea-studio", widthCm: 70, heightCm: 90, medium: "Watercolor" },
  { id: "26", slug: "eternal-flame", title: "Eternal Flame", imageUrl: "/images/public_art/download (32).png", price: 740, status: "ACTIVE" as const, shopName: "Studio Lumi", shopSlug: "studio-lumi", isFeatured: true, widthCm: 80, heightCm: 100, medium: "Oil" },
  { id: "27", slug: "cloud-fragments", title: "Cloud Fragments", imageUrl: "/images/public_art/download (33).png", price: 280, status: "ACTIVE" as const, shopName: "Art by Nadia", shopSlug: "art-by-nadia", widthCm: 45, heightCm: 60, medium: "Gouache" },
  { id: "28", slug: "velvet-horizon", title: "Velvet Horizon", imageUrl: "/images/public_art/download (34).png", price: 620, status: "ACTIVE" as const, shopName: "UrbanCanvas", shopSlug: "urban-canvas", widthCm: 85, heightCm: 65, medium: "Acrylic" },
  { id: "29", slug: "sunlit-path", title: "Sunlit Path", imageUrl: "/images/public_art/download (35).png", price: 350, status: "ACTIVE" as const, shopName: "GreenStrokes", shopSlug: "green-strokes", widthCm: 50, heightCm: 70, medium: "Watercolor" },
  { id: "30", slug: "neon-pulse", title: "Neon Pulse", imageUrl: "/images/public_art/download (36).png", price: 890, status: "ACTIVE" as const, shopName: "UrbanCanvas", shopSlug: "urban-canvas", widthCm: 100, heightCm: 80, medium: "Digital" },
  { id: "31", slug: "winter-silence", title: "Winter Silence", imageUrl: "/images/public_art/download (37).png", price: 470, status: "ACTIVE" as const, shopName: "Studio Lumi", shopSlug: "studio-lumi", widthCm: 65, heightCm: 85, medium: "Oil" },
  { id: "32", slug: "terra-firma", title: "Terra Firma", imageUrl: "/images/public_art/download (38).png", price: 330, status: "ACTIVE" as const, shopName: "GeoArt", shopSlug: "geo-art", widthCm: 55, heightCm: 55, medium: "Mixed Media" },
  { id: "33", slug: "jade-waters", title: "Jade Waters", imageUrl: "/images/public_art/download (39).png", price: 540, status: "ACTIVE" as const, shopName: "SeaStudio", shopSlug: "sea-studio", widthCm: 70, heightCm: 50, medium: "Watercolor" },
  { id: "34", slug: "copper-dreams", title: "Copper Dreams", imageUrl: "/images/public_art/download (40).png", price: 460, status: "SOLD" as const, shopName: "RedBrush", shopSlug: "red-brush", widthCm: 60, heightCm: 75, medium: "Oil" },
  { id: "35", slug: "pixel-garden", title: "Pixel Garden", imageUrl: "/images/public_art/download (41).png", price: 710, status: "ACTIVE" as const, shopName: "UrbanCanvas", shopSlug: "urban-canvas", widthCm: 90, heightCm: 90, medium: "Digital" },
  { id: "36", slug: "shadow-play", title: "Shadow Play", imageUrl: "/images/public_art/download (42).png", price: 380, status: "ACTIVE" as const, shopName: "Atelier M", shopSlug: "atelier-m", widthCm: 50, heightCm: 70, medium: "Charcoal" },
  { id: "37", slug: "golden-ratio", title: "Golden Ratio", imageUrl: "/images/public_art/download (43).png", price: 550, status: "ACTIVE" as const, shopName: "GeoArt", shopSlug: "geo-art", widthCm: 75, heightCm: 75, medium: "Acrylic" },
  { id: "38", slug: "monsoon-melody", title: "Monsoon Melody", imageUrl: "/images/public_art/download (44).png", price: 290, status: "ACTIVE" as const, shopName: "GreenStrokes", shopSlug: "green-strokes", widthCm: 45, heightCm: 60, medium: "Watercolor" },
  { id: "39", slug: "ethereal-bloom", title: "Ethereal Bloom", imageUrl: "/images/public_art/art (1).png", price: 420, status: "ACTIVE" as const, shopName: "Flora Arts", shopSlug: "flora-arts", widthCm: 55, heightCm: 75, medium: "Oil" },
  { id: "40", slug: "cosmic-drift", title: "Cosmic Drift", imageUrl: "/images/public_art/art (2).png", price: 760, status: "ACTIVE" as const, shopName: "Studio Lumi", shopSlug: "studio-lumi", isFeatured: true, widthCm: 85, heightCm: 110, medium: "Mixed Media" },
  { id: "41", slug: "rustic-charm", title: "Rustic Charm", imageUrl: "/images/public_art/art (3).png", price: 310, status: "ACTIVE" as const, shopName: "Art by Nadia", shopSlug: "art-by-nadia", widthCm: 50, heightCm: 65, medium: "Gouache" },
  { id: "42", slug: "ocean-whisper", title: "Ocean Whisper", imageUrl: "/images/public_art/art (4).png", price: 580, status: "ACTIVE" as const, shopName: "SeaStudio", shopSlug: "sea-studio", widthCm: 70, heightCm: 90, medium: "Watercolor" },
  { id: "43", slug: "crimson-canvas", title: "Crimson Canvas", imageUrl: "/images/public_art/art (5).png", price: 640, status: "ACTIVE" as const, shopName: "RedBrush", shopSlug: "red-brush", widthCm: 80, heightCm: 100, medium: "Acrylic" },
  { id: "44", slug: "aurora-sketch", title: "Aurora Sketch", imageUrl: "/images/public_art/art (6).png", price: 220, status: "ACTIVE" as const, shopName: "Atelier M", shopSlug: "atelier-m", widthCm: 35, heightCm: 45, medium: "Ink" },
  { id: "45", slug: "emerald-depths", title: "Emerald Depths", imageUrl: "/images/public_art/art (7).png", price: 490, status: "ACTIVE" as const, shopName: "GreenStrokes", shopSlug: "green-strokes", widthCm: 60, heightCm: 80, medium: "Oil" },
  { id: "46", slug: "paper-lanterns", title: "Paper Lanterns", imageUrl: "/images/public_art/art (8).png", price: 370, status: "ACTIVE" as const, shopName: "Flora Arts", shopSlug: "flora-arts", widthCm: 50, heightCm: 70, medium: "Watercolor" },
  { id: "47", slug: "urban-decay", title: "Urban Decay", imageUrl: "/images/public_art/art (9).png", price: 830, status: "ACTIVE" as const, shopName: "UrbanCanvas", shopSlug: "urban-canvas", widthCm: 95, heightCm: 120, medium: "Mixed Media" },
  { id: "48", slug: "citrus-burst", title: "Citrus Burst", imageUrl: "/images/public_art/art (10).png", price: 260, status: "ACTIVE" as const, shopName: "Art by Nadia", shopSlug: "art-by-nadia", widthCm: 40, heightCm: 50, medium: "Acrylic" },
  { id: "49", slug: "silk-threads", title: "Silk Threads", imageUrl: "/images/public_art/art (11).png", price: 550, status: "ACTIVE" as const, shopName: "Studio Lumi", shopSlug: "studio-lumi", widthCm: 65, heightCm: 85, medium: "Oil" },
  { id: "50", slug: "tempest-rising", title: "Tempest Rising", imageUrl: "/images/public_art/art (12).png", price: 690, status: "ACTIVE" as const, shopName: "SeaStudio", shopSlug: "sea-studio", widthCm: 80, heightCm: 60, medium: "Acrylic" },
  { id: "51", slug: "charcoal-whispers", title: "Charcoal Whispers", imageUrl: "/images/public_art/art (13).png", price: 340, status: "ACTIVE" as const, shopName: "Atelier M", shopSlug: "atelier-m", widthCm: 45, heightCm: 60, medium: "Charcoal" },
  { id: "52", slug: "sapphire-night", title: "Sapphire Night", imageUrl: "/images/public_art/art (14).png", price: 720, status: "ACTIVE" as const, shopName: "UrbanCanvas", shopSlug: "urban-canvas", widthCm: 90, heightCm: 70, medium: "Digital" },
  { id: "53", slug: "harvest-gold", title: "Harvest Gold", imageUrl: "/images/public_art/art (15).png", price: 410, status: "ACTIVE" as const, shopName: "GreenStrokes", shopSlug: "green-strokes", widthCm: 55, heightCm: 75, medium: "Oil" },
  { id: "54", slug: "timeless-portrait", title: "Timeless Portrait", imageUrl: "/images/public_art/H0769-L439811966.jpg", price: 950, status: "ACTIVE" as const, shopName: "Atelier M", shopSlug: "atelier-m", isFeatured: true, widthCm: 70, heightCm: 90, medium: "Oil" },
];

const CATEGORIES = ["All", "Paintings", "Photography", "Sculpture", "Digital Art", "Drawings", "Prints"];
const MEDIUMS = ["Oil", "Watercolor", "Acrylic", "Digital", "Gouache", "Mixed Media", "Charcoal", "Ink"];
const SIZES = [
  { label: "Small", desc: "< 40cm" },
  { label: "Medium", desc: "40–80cm" },
  { label: "Large", desc: "> 80cm" },
];
const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
];

type GridLayout = "3" | "4" | "list";

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedMediums, setSelectedMediums] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sort, setSort] = useState("featured");
  const [layout, setLayout] = useState<GridLayout>("4");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [displayCount, setDisplayCount] = useState(12);
  const loaderRef = useRef<HTMLDivElement>(null);

  function toggleMedium(m: string) {
    setSelectedMediums((prev) => prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]);
  }
  function toggleSize(s: string) {
    setSelectedSizes((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  }

  const filtered = useMemo(() => {
    let list = [...ALL_ARTWORKS];
    if (search) list = list.filter((a) => a.title.toLowerCase().includes(search.toLowerCase()) || a.shopName.toLowerCase().includes(search.toLowerCase()));
    if (showAvailableOnly) list = list.filter((a) => a.status === "ACTIVE");
    if (selectedMediums.length) list = list.filter((a) => selectedMediums.includes(a.medium));
    if (priceMin) list = list.filter((a) => a.price >= Number(priceMin));
    if (priceMax) list = list.filter((a) => a.price <= Number(priceMax));
    if (selectedSizes.includes("Small")) list = list.filter((a) => (a.widthCm ?? 999) < 40 || (a.heightCm ?? 999) < 40);
    if (selectedSizes.includes("Medium")) list = list.filter((a) => {
      const max = Math.max(a.widthCm ?? 0, a.heightCm ?? 0);
      return max >= 40 && max <= 80;
    });
    if (selectedSizes.includes("Large")) list = list.filter((a) => (a.widthCm ?? 0) > 80 || (a.heightCm ?? 0) > 80);
    if (sort === "price_asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
    if (sort === "featured") list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    return list;
  }, [search, category, selectedMediums, priceMin, priceMax, selectedSizes, sort, showAvailableOnly]);

  const activeFiltersCount = selectedMediums.length + selectedSizes.length + (priceMin ? 1 : 0) + (priceMax ? 1 : 0) + (showAvailableOnly ? 1 : 0);

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(12);
  }, [search, category, selectedMediums.join(","), priceMin, priceMax, selectedSizes.join(","), sort, showAvailableOnly]);

  // Infinite scroll
  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDisplayCount((c) => c + 8);
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function clearAll() {
    setSearch("");
    setCategory("All");
    setSelectedMediums([]);
    setPriceMin("");
    setPriceMax("");
    setSelectedSizes([]);
    setShowAvailableOnly(false);
  }

  const gridClass = {
    "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    "4": "grid-cols-2 md:grid-cols-3 xl:grid-cols-4",
    "list": "grid-cols-1 sm:grid-cols-2",
  }[layout];

  return (
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4 py-10">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1">Marketplace</p>
          <h1 className="font-heading text-4xl font-bold text-gray-900">Browse Artworks</h1>
          <p className="text-gray-500 mt-1 text-sm">Discover original art from independent artists worldwide</p>

          {/* Search */}
          <form className="flex gap-3 mt-6 max-w-xl" onSubmit={(e) => e.preventDefault()}>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search artworks, artists, styles…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 h-11 border border-gray-200 bg-gray-50 text-sm rounded-lg focus:outline-none focus:border-rose-600 focus:bg-white transition-colors"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>

          {/* Category tabs */}
          <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "shrink-0 px-4 py-1.5 text-sm font-medium rounded-full border transition-colors",
                  category === cat
                    ? "bg-rose-700 text-white border-rose-700"
                    : "border-gray-200 text-gray-600 hover:border-rose-600 hover:text-rose-700 bg-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar — desktop */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-24 space-y-7">
              {/* Available toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">Available Only</span>
                <button
                  onClick={() => setShowAvailableOnly(!showAvailableOnly)}
                  className={cn(
                    "w-11 h-6 rounded-full transition-colors relative",
                    showAvailableOnly ? "bg-rose-700" : "bg-gray-200"
                  )}
                >
                  <span className={cn(
                    "absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform",
                    showAvailableOnly ? "translate-x-6" : "translate-x-1"
                  )} />
                </button>
              </div>

              <div className="border-t border-gray-100" />

              {/* Price range */}
              <div>
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-3">Price Range</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min $"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    className="w-full border border-gray-200 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-rose-600"
                  />
                  <span className="text-gray-300">—</span>
                  <input
                    type="number"
                    placeholder="Max $"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className="w-full border border-gray-200 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-rose-600"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {[["<৳5k", "", "5000"], ["৳5k–15k", "5000", "15000"], ["৳15k–30k", "15000", "30000"], [">৳30k", "30000", ""]].map(([label, min, max]) => (
                    <button
                      key={label}
                      onClick={() => { setPriceMin(min); setPriceMax(max); }}
                      className="text-xs px-2.5 py-1 border border-gray-200 hover:border-black rounded transition-colors"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100" />

              {/* Medium */}
              <div>
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-3">Medium</h3>
                <div className="space-y-1.5">
                  {MEDIUMS.map((m) => (
                    <button
                      key={m}
                      onClick={() => toggleMedium(m)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded text-sm transition-colors text-left",
                        selectedMediums.includes(m) ? "bg-rose-700 text-white" : "text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      {m}
                      {selectedMediums.includes(m) && <X className="w-3 h-3" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100" />

              {/* Size */}
              <div>
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-3">Size</h3>
                <div className="space-y-1.5">
                  {SIZES.map((s) => (
                    <button
                      key={s.label}
                      onClick={() => toggleSize(s.label)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded text-sm transition-colors text-left",
                        selectedSizes.includes(s.label) ? "bg-rose-700 text-white" : "text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      <span>{s.label}</span>
                      <span className={cn("text-xs", selectedSizes.includes(s.label) ? "text-rose-200" : "text-gray-400")}>{s.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {activeFiltersCount > 0 && (
                <>
                  <div className="border-t border-gray-100" />
                  <button
                    onClick={clearAll}
                    className="w-full text-sm text-center text-rose-600 hover:text-rose-700 underline underline-offset-2"
                  >
                    Clear all filters ({activeFiltersCount})
                  </button>
                </>
              )}
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-900">{filtered.length}</span> artworks
                </span>
                {/* Active filter chips */}
                <div className="hidden sm:flex flex-wrap gap-1.5">
                  {selectedMediums.map((m) => (
                    <button key={m} onClick={() => toggleMedium(m)} className="flex items-center gap-1 text-xs bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-full transition-colors">
                      {m} <X className="w-3 h-3" />
                    </button>
                  ))}
                  {selectedSizes.map((s) => (
                    <button key={s} onClick={() => toggleSize(s)} className="flex items-center gap-1 text-xs bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-full transition-colors">
                      {s} <X className="w-3 h-3" />
                    </button>
                  ))}
                  {(priceMin || priceMax) && (
                    <button onClick={() => { setPriceMin(""); setPriceMax(""); }} className="flex items-center gap-1 text-xs bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-full transition-colors">
                      ৳{priceMin || "0"}–৳{priceMax || "∞"} <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Mobile filter button */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 text-sm border border-gray-200 px-3 py-2 rounded hover:border-black transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="w-5 h-5 bg-rose-700 text-white text-xs rounded-full flex items-center justify-center">{activeFiltersCount}</span>
                  )}
                </button>

                {/* Sort */}
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="text-sm border border-gray-200 px-3 py-2 rounded hover:border-black focus:outline-none focus:border-black transition-colors bg-white"
                >
                  {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>

                {/* Grid toggle */}
                <div className="hidden sm:flex items-center border border-gray-200 rounded overflow-hidden">
                  {([
                    { id: "4", icon: Grid3X3 },
                    { id: "3", icon: Grid2X2 },
                    { id: "list", icon: LayoutList },
                  ] as const).map(({ id, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setLayout(id)}
                      className={cn(
                        "w-9 h-9 flex items-center justify-center transition-colors",
                        layout === id ? "bg-rose-700 text-white" : "text-gray-400 hover:text-gray-700"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="text-5xl mb-4">🎨</div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">No artworks found</h3>
                <p className="text-gray-500 text-sm mb-6">Try adjusting your filters or search terms</p>
                <button onClick={clearAll} className="text-sm underline text-rose-600 hover:text-rose-700">
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className={cn("grid gap-x-5 gap-y-10", gridClass)}>
                  {filtered.slice(0, displayCount).map((art) => <ArtCard key={art.id} {...art} />)}
                </div>
                {/* Infinite scroll sentinel */}
                {displayCount < filtered.length ? (
                  <div ref={loaderRef} className="flex items-center justify-center gap-2 py-12 text-sm text-gray-400">
                    <span className="w-4 h-4 border-2 border-gray-300 border-t-rose-600 rounded-full animate-spin" />
                    Loading more…
                  </div>
                ) : (
                  <p className="text-center text-xs text-gray-400 py-10 uppercase tracking-widest">
                    All {filtered.length} artworks shown
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sidebar drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Filters</h2>
              <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-6">
              {/* Available toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">Available Only</span>
                <button
                  onClick={() => setShowAvailableOnly(!showAvailableOnly)}
                  className={cn("w-11 h-6 rounded-full transition-colors relative", showAvailableOnly ? "bg-rose-700" : "bg-gray-200")}
                >
                  <span className={cn("absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform", showAvailableOnly ? "translate-x-6" : "translate-x-1")} />
                </button>
              </div>

              {/* Price */}
              <div>
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-3">Price</h3>
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Min ৳" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} className="w-full border border-gray-200 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-rose-600" />
                  <span className="text-gray-300">—</span>
                  <input type="number" placeholder="Max ৳" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} className="w-full border border-gray-200 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-rose-600" />
                </div>
              </div>

              {/* Medium */}
              <div>
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-3">Medium</h3>
                <div className="flex flex-wrap gap-2">
                  {MEDIUMS.map((m) => (
                    <button key={m} onClick={() => toggleMedium(m)} className={cn("text-sm px-3 py-1.5 rounded border transition-colors", selectedMediums.includes(m) ? "bg-rose-700 text-white border-rose-700" : "border-gray-200 text-gray-600 hover:border-rose-600")}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((s) => (
                    <button key={s.label} onClick={() => toggleSize(s.label)} className={cn("text-sm px-3 py-1.5 rounded border transition-colors", selectedSizes.includes(s.label) ? "bg-rose-700 text-white border-rose-700" : "border-gray-200 text-gray-600 hover:border-rose-600")}>
                      {s.label} <span className="text-xs opacity-60">{s.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={clearAll} className="flex-1 py-2.5 border border-gray-200 text-sm rounded hover:border-black transition-colors">
                  Clear All
                </button>
                <button onClick={() => setSidebarOpen(false)} className="flex-1 py-2.5 bg-rose-700 text-white text-sm rounded">
                  Show {filtered.length} Results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
