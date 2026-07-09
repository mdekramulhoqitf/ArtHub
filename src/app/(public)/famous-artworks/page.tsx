"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight, Frame, Globe, Flag } from "lucide-react";
import { FAMOUS_ARTWORKS } from "@/lib/famous-artworks-data";

type Filter = "all" | "bangladeshi" | "international";

const INITIAL_COUNT = 12;

export default function FamousArtworksPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [visible, setVisible] = useState(INITIAL_COUNT);

  const filtered = useMemo(() => {
    let list = FAMOUS_ARTWORKS;
    if (filter !== "all") list = list.filter((a) => a.category === filter);
    const q = query.toLowerCase().trim();
    if (q) {
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.artistName.toLowerCase().includes(q) ||
          a.movement.toLowerCase().includes(q) ||
          a.tags.some((t) => t.includes(q))
      );
    }
    return list;
  }, [query, filter]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const counts = {
    all: FAMOUS_ARTWORKS.length,
    bangladeshi: FAMOUS_ARTWORKS.filter((a) => a.category === "bangladeshi").length,
    international: FAMOUS_ARTWORKS.filter((a) => a.category === "international").length,
  };

  return (
    <div className="min-h-screen bg-[#f5f2ea]">

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden bg-[#1a1a2e]">
        <Image
          src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1800"
          alt="Famous Artworks"
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e]/30 via-transparent to-[#1a1a2e]/90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="text-xs uppercase tracking-[0.4em] text-rose-300 mb-3 font-medium">
            ArtHub Gallery
          </p>
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-white leading-tight mb-4">
            Famous Artworks
          </h1>
          <p className="text-white/50 text-lg max-w-xl leading-relaxed">
            Masterworks from Bangladesh and around the world — their stories, techniques, and journeys.
          </p>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────── */}
      <div className="bg-[#1a1a2e] border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 divide-x divide-white/10 text-center">
            {[
              { v: counts.all, l: "Total Works" },
              { v: counts.bangladeshi, l: "Bangladeshi" },
              { v: counts.international, l: "International" },
            ].map(({ v, l }) => (
              <div key={l} className="py-5">
                <p className="text-xl font-bold text-white">{v}</p>
                <p className="text-[10px] uppercase tracking-widest text-white/30 mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filters + Search ──────────────────────────── */}
      <div className="container mx-auto px-4 pt-10 pb-6 space-y-5">
        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2">
          {(["all", "bangladeshi", "international"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => { setFilter(f); setVisible(INITIAL_COUNT); }}
              className={`flex items-center gap-2 px-5 py-2 text-xs uppercase tracking-widest font-semibold border transition-all duration-200 ${
                filter === f
                  ? "bg-[#1a1a2e] text-white border-[#1a1a2e]"
                  : "bg-white text-[#7a7a8a] border-[#d8d3c5] hover:border-[#1a1a2e] hover:text-[#1a1a2e]"
              }`}
            >
              {f === "all" && <Frame className="w-3.5 h-3.5" />}
              {f === "bangladeshi" && <Flag className="w-3.5 h-3.5" />}
              {f === "international" && <Globe className="w-3.5 h-3.5" />}
              {f === "all" ? "All Works" : f === "bangladeshi" ? "Bangladesh" : "International"}
              <span className="opacity-60">({counts[f]})</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9a9a8a]" />
          <input
            type="text"
            placeholder="Search by title, artist, movement..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setVisible(INITIAL_COUNT); }}
            className="w-full bg-white border border-[#d8d3c5] rounded-none pl-12 pr-4 py-3.5 text-sm text-[#1a1a2e] placeholder:text-[#9a9a8a] focus:outline-none focus:border-[#1a1a2e] transition-colors shadow-sm"
          />
        </div>

        {query && (
          <p className="text-center text-xs text-[#7a7a8a]">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &quot;{query}&quot;
          </p>
        )}
      </div>

      {/* ── Artwork Grid ──────────────────────────────── */}
      <div className="container mx-auto px-4 pb-20">
        {shown.length === 0 ? (
          <div className="text-center py-24">
            <Frame className="w-12 h-12 text-[#c5c0b0] mx-auto mb-4" />
            <p className="text-[#7a7a8a] text-lg">No artworks found.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 border-l border-t border-[#d8d3c5]">
              {shown.map((art) => (
                <Link
                  key={art.slug}
                  href={`/famous-artworks/${art.slug}`}
                  className="group border-r border-b border-[#d8d3c5] bg-white hover:bg-[#faf8f3] transition-colors duration-300 overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e3d5]">
                    <Image
                      src={art.image}
                      alt={art.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                    />
                    {/* Category badge */}
                    <span className={`absolute top-3 left-3 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 ${
                      art.category === "bangladeshi"
                        ? "bg-emerald-600 text-white"
                        : "bg-[#1a1a2e] text-white"
                    }`}>
                      {art.category === "bangladeshi" ? "Bangladesh" : "International"}
                    </span>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#1a1a2e]/0 group-hover:bg-[#1a1a2e]/40 transition-all duration-500 flex items-end justify-end p-3">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                        <ArrowRight className="w-4 h-4 text-[#1a1a2e]" />
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <p className="text-[10px] text-rose-600 uppercase tracking-wider font-medium mb-1">{art.movement}</p>
                    <h3 className="font-heading text-sm md:text-base font-bold text-[#1a1a2e] leading-snug mb-0.5 line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="text-xs text-[#7a7a8a]">{art.artistName} · {art.year}</p>
                    <p className="text-xs text-[#9a9a8a] mt-2 line-clamp-2 leading-relaxed">
                      {art.shortDescription}
                    </p>
                    <div className="mt-3 flex items-center gap-1">
                      {art.currentLocation.type === "museum" && (
                        <span className="text-[9px] uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5">Museum</span>
                      )}
                      {art.currentLocation.type === "private" && (
                        <span className="text-[9px] uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5">Private Collection</span>
                      )}
                      {art.currentLocation.type === "gallery" && (
                        <span className="text-[9px] uppercase tracking-wider bg-purple-50 text-purple-600 border border-purple-200 px-2 py-0.5">Gallery</span>
                      )}
                      {art.currentLocation.city && (
                        <span className="text-[9px] text-[#9a9a8a] ml-1">{art.currentLocation.city}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {hasMore ? (
              <div className="text-center mt-12">
                <button
                  onClick={() => setVisible((v) => v + 8)}
                  className="inline-flex items-center gap-2 bg-[#1a1a2e] hover:bg-[#2a2a3e] text-white px-10 py-3.5 text-sm font-semibold uppercase tracking-widest transition-colors duration-300"
                >
                  Load More
                </button>
              </div>
            ) : filtered.length > 0 && (
              <p className="text-center mt-12 text-xs text-[#9a9a8a] uppercase tracking-widest">
                — All {filtered.length} Works Loaded —
              </p>
            )}
          </>
        )}
      </div>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="bg-[#1a1a2e] py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-rose-400 mb-3">Explore More</p>
          <h2 className="font-heading text-3xl font-bold text-white mb-4">Meet the Artists</h2>
          <p className="text-white/40 max-w-md mx-auto mb-8 text-sm leading-relaxed">
            Discover the lives and legacies of the masters who created these iconic works.
          </p>
          <Link
            href="/artists"
            className="inline-flex items-center gap-2 bg-rose-700 hover:bg-rose-600 text-white px-8 py-3.5 text-sm font-semibold tracking-wide transition-colors"
          >
            Famous Artists <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
