"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, GraduationCap, MapPin, Calendar, ArrowRight } from "lucide-react";
import { UNIVERSITIES } from "@/lib/universities-data";

export default function UniversitiesPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return UNIVERSITIES;
    return UNIVERSITIES.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.nameBangla.includes(q) ||
        u.location.toLowerCase().includes(q) ||
        u.departmentName.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-[#f5f2ea]">

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden bg-[#1a1a2e]">
        <Image
          src="/images/banners/banner_1.png"
          alt="Bangladesh University Art Departments"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e]/40 via-transparent to-[#1a1a2e]/90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="text-xs uppercase tracking-[0.4em] text-rose-300 mb-3 font-medium">
            ArtHub Gallery
          </p>
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-white leading-tight mb-4">
            বিশ্ববিদ্যালয় শিল্পকলা
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-2xl leading-relaxed mb-2">
            University Art Departments of Bangladesh
          </p>
          <p className="text-white/40 text-sm max-w-xl">
            বাংলাদেশের বিশ্ববিদ্যালয়গুলোর চারুকলা বিভাগের শিল্পকর্ম সংগ্রহ
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-[#1a1a2e] border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 divide-x divide-white/10 text-center">
            {[
              { v: UNIVERSITIES.length, l: "Universities" },
              {
                v: UNIVERSITIES.reduce((s, u) => s + u.totalArtworks, 0),
                l: "Artworks",
              },
              {
                v: new Set(UNIVERSITIES.map((u) => u.location)).size,
                l: "Cities",
              },
            ].map(({ v, l }) => (
              <div key={l} className="py-4 px-2">
                <div className="text-2xl font-bold text-white">{v}</div>
                <div className="text-white/40 text-xs uppercase tracking-wider mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-[#1a1a2e]/5 border-b border-[#1a1a2e]/10">
        <div className="container mx-auto px-4 py-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1a1a2e]/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search universities, locations, departments..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-[#1a1a2e]/10 text-[#1a1a2e] placeholder-[#1a1a2e]/30 text-sm focus:outline-none focus:border-rose-400 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* University Grid */}
      <div className="container mx-auto px-4 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-[#1a1a2e]/40">
            <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg">No universities found for &quot;{query}&quot;</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((university) => (
              <Link
                key={university.slug}
                href={`/universities/${university.slug}`}
                className="group block bg-white border border-[#1a1a2e]/8 hover:border-rose-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Cover image */}
                <div className="relative h-48 overflow-hidden bg-[#1a1a2e]">
                  <Image
                    src={university.coverImage}
                    alt={university.name}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/80 to-transparent" />

                  {/* Short name badge */}
                  <div className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold px-3 py-1 tracking-wider">
                    {university.shortName}
                  </div>

                  {/* Artwork count */}
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 backdrop-blur-sm">
                    {university.totalArtworks} artworks
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-rose-500 text-sm font-medium mb-1">{university.nameBangla}</p>
                  <h2 className="font-heading text-xl font-bold text-[#1a1a2e] mb-1 group-hover:text-rose-700 transition-colors leading-tight">
                    {university.name}
                  </h2>
                  <p className="text-[#1a1a2e]/50 text-xs mb-4">{university.departmentName}</p>

                  <div className="flex items-center gap-4 text-xs text-[#1a1a2e]/50 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-400" />
                      {university.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-rose-400" />
                      Est. {university.established}
                    </span>
                  </div>

                  <p className="text-[#1a1a2e]/60 text-sm leading-relaxed line-clamp-2 mb-5">
                    {university.about}
                  </p>

                  <div className="flex items-center gap-1.5 text-rose-600 text-xs font-medium group-hover:gap-3 transition-all">
                    Explore Artworks
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
