"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight, Users } from "lucide-react";
import { ARTISTS } from "@/lib/artists-data";

const INITIAL_COUNT = 12;

export default function ArtistsPage() {
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(INITIAL_COUNT);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return ARTISTS;
    return ARTISTS.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.style.some((s) => s.toLowerCase().includes(q)) ||
        a.birthPlace.toLowerCase().includes(q)
    );
  }, [query]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  return (
    <div className="min-h-screen bg-[#f5f2ea]">

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden bg-[#1a1a2e]">
        <Image
          src="/images/banners/banner_1.png"
          alt="Famous Artists"
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
            Famous Artists
          </h1>
          <p className="text-white/50 text-lg max-w-lg leading-relaxed">
            Journey into Art: Profiles that Inspire
          </p>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────── */}
      <div className="bg-[#1a1a2e] border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 divide-x divide-white/10 text-center">
            {[
              { v: ARTISTS.length, l: "Artists" },
              { v: ARTISTS.filter((a) => !a.died).length, l: "Living Masters" },
              { v: ARTISTS.filter((a) => !!a.died).length, l: "Legends" },
            ].map(({ v, l }) => (
              <div key={l} className="py-5">
                <p className="text-xl font-bold text-white">{v}</p>
                <p className="text-[10px] uppercase tracking-widest text-white/30 mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Search ────────────────────────────────────── */}
      <div className="container mx-auto px-4 pt-12 pb-6">
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9a9a8a]" />
          <input
            type="text"
            placeholder="Search artist by name..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setVisible(INITIAL_COUNT); }}
            className="w-full bg-white border border-[#d8d3c5] rounded-none pl-12 pr-4 py-3.5 text-sm text-[#1a1a2e] placeholder:text-[#9a9a8a] focus:outline-none focus:border-[#1a1a2e] transition-colors shadow-sm"
          />
        </div>
        {query && (
          <p className="text-center text-xs text-[#7a7a8a] mt-3">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &quot;{query}&quot;
          </p>
        )}
      </div>

      {/* ── Artist Grid ───────────────────────────────── */}
      <div className="container mx-auto px-4 pb-20">
        {shown.length === 0 ? (
          <div className="text-center py-24">
            <Users className="w-12 h-12 text-[#c5c0b0] mx-auto mb-4" />
            <p className="text-[#7a7a8a] text-lg">No artists found for &quot;{query}&quot;</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-0 border-l border-t border-[#d8d3c5]">
              {shown.map((artist) => (
                <Link
                  key={artist.slug}
                  href={`/artists/${artist.slug}`}
                  className="group border-r border-b border-[#d8d3c5] bg-white hover:bg-[#faf8f3] transition-colors duration-300 overflow-hidden"
                >
                  {/* Portrait */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#e8e3d5]">
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-[#1a1a2e]/0 group-hover:bg-[#1a1a2e]/30 transition-all duration-500 flex items-end justify-end p-3">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                        <ArrowRight className="w-4 h-4 text-[#1a1a2e]" />
                      </div>
                    </div>
                    {/* Died/Living tag */}
                    {!artist.died && (
                      <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5">
                        Living
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-heading text-sm md:text-base font-bold text-[#1a1a2e] leading-snug mb-0.5">
                      {artist.name}
                    </h3>
                    {artist.banglaName && (
                      <p className="text-xs text-[#7a7a8a] mb-1.5">{artist.banglaName}</p>
                    )}
                    <p className="text-[10px] text-[#9a9a8a] uppercase tracking-wider">
                      {artist.born.replace(/\d+ \w+ /, "").split(",")[0]}
                      {artist.died ? ` — ${artist.died.replace(/\d+ \w+ /, "").split(",")[0]}` : " — present"}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {artist.style.slice(0, 2).map((s) => (
                        <span
                          key={s}
                          className="text-[9px] uppercase tracking-wider bg-[#f0ece0] text-[#7a7a8a] px-2 py-0.5 border border-[#d8d3c5]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setVisible((v) => v + 8)}
                  className="inline-flex items-center gap-2 bg-[#1a1a2e] hover:bg-[#2a2a3e] text-white px-10 py-3.5 text-sm font-semibold uppercase tracking-widest transition-colors duration-300"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Newsletter CTA ────────────────────────────── */}
      <section className="bg-[#1a1a2e] py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-rose-400 mb-3">Stay Connected</p>
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Discover More Artists
          </h2>
          <p className="text-white/40 max-w-md mx-auto mb-8 text-sm leading-relaxed">
            Subscribe to receive profiles of new artists, exhibition news, and exclusive collection previews.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-rose-700 hover:bg-rose-600 text-white px-8 py-3.5 text-sm font-semibold tracking-wide transition-colors"
          >
            Create Free Account <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
