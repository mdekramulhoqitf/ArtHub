"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  Tag,
  X,
  GraduationCap,
  Palette,
  Clock,
  BookOpen,
} from "lucide-react";
import { UNIVERSITIES, type UniversityArtwork } from "@/lib/universities-data";
import { use } from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function UniversityDetailPage({ params }: Props) {
  const { slug } = use(params);
  const university = UNIVERSITIES.find((u) => u.slug === slug);
  if (!university) notFound();

  const [selectedArtwork, setSelectedArtwork] = useState<UniversityArtwork | null>(null);
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(university.artworks.map((a) => a.category)))];

  const visibleArtworks =
    filter === "All"
      ? university.artworks
      : university.artworks.filter((a) => a.category === filter);

  return (
    <div className="min-h-screen bg-[#f5f2ea]">

      {/* Hero */}
      <section className="relative h-[65vh] min-h-[480px] overflow-hidden bg-[#1a1a2e]">
        <Image
          src={university.coverImage}
          alt={university.name}
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e]/95 via-[#1a1a2e]/70 to-transparent" />

        {/* Back */}
        <div className="absolute top-6 left-0 right-0 container mx-auto px-4">
          <Link
            href="/universities"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-xs uppercase tracking-wider transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            All Universities
          </Link>
        </div>

        {/* Identity */}
        <div className="absolute inset-0 flex items-end container mx-auto px-4 pb-12">
          <div className="max-w-2xl">
            <div className="inline-block bg-rose-600 text-white text-xs font-bold px-3 py-1 tracking-widest mb-4">
              {university.shortName}
            </div>
            <p className="text-rose-300/80 text-lg mb-2">{university.nameBangla}</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              {university.name}
            </h1>
            <p className="text-white/50 text-sm mb-5">{university.departmentName}</p>
            <div className="flex flex-wrap items-center gap-5 text-white/50 text-xs">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                {university.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-rose-400" />
                Established {university.established}
              </span>
              <span className="flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-rose-400" />
                {university.totalArtworks} Artworks
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <div className="bg-white border-b border-[#1a1a2e]/8">
        <div className="container mx-auto px-4 py-8">
          <p className="text-[#1a1a2e]/70 text-base leading-relaxed max-w-3xl">
            {university.about}
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-[#f5f2ea] border-b border-[#1a1a2e]/8 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-all ${
                  filter === cat
                    ? "bg-[#1a1a2e] text-white"
                    : "bg-white text-[#1a1a2e]/60 hover:bg-[#1a1a2e]/5 border border-[#1a1a2e]/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Artworks Grid */}
      <div className="container mx-auto px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-heading text-2xl font-bold text-[#1a1a2e]">
            {filter === "All" ? "All Artworks" : filter}
            <span className="text-[#1a1a2e]/30 text-lg font-normal ml-2">
              ({visibleArtworks.length})
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleArtworks.map((artwork) => (
            <button
              key={artwork.id}
              onClick={() => setSelectedArtwork(artwork)}
              className="group text-left bg-white border border-[#1a1a2e]/8 hover:border-rose-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-[#1a1a2e]/10">
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-3 left-3 bg-rose-600/90 text-white text-xs px-2 py-0.5">
                  {artwork.category}
                </div>
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-[#1a1a2e] text-xs px-3 py-1 font-medium">
                  View Details
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-heading text-base font-bold text-[#1a1a2e] group-hover:text-rose-700 transition-colors leading-snug">
                    {artwork.title}
                  </h3>
                  <span className="text-rose-500 font-bold text-sm shrink-0">{artwork.year}</span>
                </div>
                <p className="text-[#1a1a2e]/60 text-xs mb-1">{artwork.artist}</p>
                {artwork.artistBangla && (
                  <p className="text-rose-400/70 text-xs mb-3">{artwork.artistBangla}</p>
                )}
                <p className="text-[#1a1a2e]/40 text-xs mb-3 italic">{artwork.medium}</p>
                <p className="text-[#1a1a2e]/60 text-xs leading-relaxed line-clamp-2">
                  {artwork.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {artwork.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#1a1a2e]/5 text-[#1a1a2e]/40 text-xs px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Artwork Detail Modal */}
      {selectedArtwork && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedArtwork(null);
          }}
        >
          <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="sticky top-0 bg-[#1a1a2e] px-6 py-4 flex items-start justify-between z-10">
              <div>
                <p className="text-rose-300 text-xs uppercase tracking-wider mb-1">
                  {university.shortName} — {selectedArtwork.department}
                </p>
                <h2 className="font-heading text-xl font-bold text-white">
                  {selectedArtwork.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedArtwork(null)}
                className="text-white/40 hover:text-white transition-colors ml-4 shrink-0 mt-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative aspect-square bg-[#1a1a2e]/5">
                <Image
                  src={selectedArtwork.image}
                  alt={selectedArtwork.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Details */}
              <div className="p-6 space-y-5 overflow-y-auto">

                {/* Artist */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#1a1a2e]/30 mb-1">Artist</p>
                  <p className="font-bold text-[#1a1a2e] text-base">{selectedArtwork.artist}</p>
                  {selectedArtwork.artistBangla && (
                    <p className="text-rose-500 text-sm">{selectedArtwork.artistBangla}</p>
                  )}
                </div>

                {/* Meta grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#1a1a2e]/30 mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Year
                    </p>
                    <p className="font-bold text-rose-600 text-lg">{selectedArtwork.year}</p>
                  </div>
                  {selectedArtwork.date && selectedArtwork.date !== selectedArtwork.year && (
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#1a1a2e]/30 mb-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Date
                      </p>
                      <p className="text-[#1a1a2e] text-sm font-medium">{selectedArtwork.date}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#1a1a2e]/30 mb-1 flex items-center gap-1">
                      <Palette className="w-3 h-3" /> Medium
                    </p>
                    <p className="text-[#1a1a2e] text-sm">{selectedArtwork.medium}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#1a1a2e]/30 mb-1 flex items-center gap-1">
                      <Tag className="w-3 h-3" /> Category
                    </p>
                    <p className="text-[#1a1a2e] text-sm">{selectedArtwork.category}</p>
                  </div>
                </div>

                {/* Team */}
                {selectedArtwork.team && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#1a1a2e]/30 mb-1 flex items-center gap-1">
                      <Users className="w-3 h-3" /> Team / Creator
                    </p>
                    <p className="text-[#1a1a2e] text-sm leading-relaxed">{selectedArtwork.team}</p>
                  </div>
                )}

                {/* Description */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#1a1a2e]/30 mb-2 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> About This Artwork
                  </p>
                  <p className="text-[#1a1a2e]/70 text-sm leading-relaxed">
                    {selectedArtwork.description}
                  </p>
                </div>

                {/* Why created */}
                <div className="bg-rose-50 border-l-2 border-rose-400 pl-4 py-3 pr-3">
                  <p className="text-xs uppercase tracking-wider text-rose-400 mb-2">
                    Why It Was Created
                  </p>
                  <p className="text-[#1a1a2e]/70 text-sm leading-relaxed">
                    {selectedArtwork.whyCreated}
                  </p>
                </div>

                {/* Department */}
                {selectedArtwork.department && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#1a1a2e]/30 mb-1 flex items-center gap-1">
                      <GraduationCap className="w-3 h-3" /> Department
                    </p>
                    <p className="text-[#1a1a2e] text-sm">{selectedArtwork.department}</p>
                  </div>
                )}

                {/* Tags */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#1a1a2e]/30 mb-2">Tags</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedArtwork.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#1a1a2e]/8 text-[#1a1a2e]/60 text-xs px-2.5 py-1"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
