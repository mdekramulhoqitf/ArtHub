import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  ArrowRight,
  Frame,
  Globe,
  Users,
  Calendar,
} from "lucide-react";
import { ART_OWNERS } from "@/lib/art-owners-data";
import { FAMOUS_ARTWORKS } from "@/lib/famous-artworks-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ART_OWNERS.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const owner = ART_OWNERS.find((o) => o.slug === slug);
  if (!owner) return {};
  return {
    title: `${owner.name} — Art Collection · ArtHub`,
    description: owner.bio,
  };
}

export default async function ArtOwnerPage({ params }: Props) {
  const { slug } = await params;
  const owner = ART_OWNERS.find((o) => o.slug === slug);
  if (!owner) notFound();

  const collection = FAMOUS_ARTWORKS.filter((a) =>
    owner.collectionSlugs.includes(a.slug)
  );

  return (
    <div className="min-h-screen bg-[#f5f2ea]">

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative h-[55vh] min-h-[420px] overflow-hidden bg-[#1a1a2e]">
        <Image
          src={owner.coverImage}
          alt={owner.name}
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e]/95 via-[#1a1a2e]/70 to-transparent" />

        {/* Back */}
        <div className="absolute top-6 left-0 right-0 container mx-auto px-4">
          <Link
            href="/famous-artworks"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-xs uppercase tracking-wider transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Artworks
          </Link>
        </div>

        {/* Owner identity */}
        <div className="absolute inset-0 flex items-end container mx-auto px-4 pb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
            {/* Photo */}
            <div className="relative w-28 h-36 sm:w-36 sm:h-44 overflow-hidden border-2 border-white/20 shrink-0 shadow-2xl">
              <Image
                src={owner.image}
                alt={owner.name}
                fill
                className="object-cover object-top"
                sizes="144px"
              />
            </div>
            <div className="pb-1">
              <p className="text-[10px] uppercase tracking-[0.3em] text-rose-300 mb-2">
                {owner.title}
              </p>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-white leading-tight mb-3">
                {owner.name}
              </h1>
              <span className="flex items-center gap-1.5 text-white/50 text-xs">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                {owner.location}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────── */}
      <div className="bg-[#1a1a2e] border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 divide-x divide-white/10 text-center">
            {[
              { v: owner.stats.totalWorks, l: "Works Owned" },
              { v: owner.stats.yearsCollecting, l: "Years Collecting" },
              { v: owner.stats.countries, l: "Countries" },
            ].map(({ v, l }) => (
              <div key={l} className="py-5">
                <p className="text-xl font-bold text-white">{v}</p>
                <p className="text-[10px] uppercase tracking-widest text-white/30 mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────── */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

          {/* ── Left: bio ────────────────────────────── */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="font-heading text-2xl font-bold text-[#1a1a2e] pb-3 border-b border-[#d8d3c5] mb-6">
                About the Collector
              </h2>
              <div className="space-y-4 text-[#3a3a4a] leading-relaxed text-[15px]">
                {owner.longBio.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>
          </div>

          {/* ── Right: sidebar ───────────────────────── */}
          <aside className="lg:sticky lg:top-24 space-y-6">
            <div className="bg-[#1a1a2e] p-6">
              <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-4">
                Collection Focus
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">{owner.collectionFocus}</p>
            </div>

            <div className="bg-white border border-[#d8d3c5] p-6 space-y-4">
              {[
                { icon: Frame, label: "Total Works", value: `${owner.stats.totalWorks}+ artworks` },
                { icon: Calendar, label: "Collecting Since", value: `${new Date().getFullYear() - owner.stats.yearsCollecting}` },
                { icon: Globe, label: "Countries Represented", value: `${owner.stats.countries} countries` },
                { icon: MapPin, label: "Based In", value: owner.location },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#f0ece0] border border-[#d8d3c5] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#9a9a8a]">{label}</p>
                    <p className="text-sm font-semibold text-[#1a1a2e]">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>

      {/* ── Collection Grid ───────────────────────────── */}
      <section className="bg-white border-t border-[#d8d3c5] py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between pb-6 border-b border-[#d8d3c5] mb-10">
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#1a1a2e]">
                Art Collection
              </h2>
              <p className="text-xs text-[#7a7a8a] mt-1">
                {collection.length} works on display · {owner.stats.totalWorks} total in collection
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#7a7a8a] uppercase tracking-wider">
              <Users className="w-4 h-4" />
              Private Collection
            </div>
          </div>

          {collection.length === 0 ? (
            <div className="text-center py-20">
              <Frame className="w-10 h-10 text-[#c5c0b0] mx-auto mb-3" />
              <p className="text-[#7a7a8a]">No artworks on display yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {collection.map((art) => (
                <Link
                  key={art.slug}
                  href={`/famous-artworks/${art.slug}`}
                  className="group"
                >
                  {/* Artwork image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e3d5] mb-4">
                    <Image
                      src={art.image}
                      alt={art.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#1a1a2e]/0 group-hover:bg-[#1a1a2e]/50 transition-all duration-500 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 border border-white text-white text-xs uppercase tracking-widest px-5 py-2.5">
                        View Details <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Category tag */}
                    <span className={`absolute top-3 left-3 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 ${
                      art.category === "bangladeshi"
                        ? "bg-emerald-600 text-white"
                        : "bg-[#1a1a2e] text-white"
                    }`}>
                      {art.category === "bangladeshi" ? "Bangladesh" : "International"}
                    </span>
                  </div>

                  {/* Info */}
                  <div>
                    <p className="text-[10px] text-rose-600 uppercase tracking-wider mb-1">{art.movement}</p>
                    <h3 className="font-heading text-lg font-bold text-[#1a1a2e] group-hover:text-rose-700 transition-colors leading-snug mb-1">
                      {art.title}
                    </h3>
                    <p className="text-sm text-[#7a7a8a]">{art.artistName} · {art.year}</p>
                    <p className="text-xs text-[#9a9a8a] mt-2 leading-relaxed line-clamp-2">
                      {art.shortDescription}
                    </p>

                    {/* Details link */}
                    <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#1a1a2e] group-hover:text-rose-700 transition-colors uppercase tracking-wider">
                      View Artwork <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────── */}
      <section className="bg-[#1a1a2e] py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-rose-400 mb-3">Explore More</p>
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Discover Famous Artworks
          </h2>
          <p className="text-white/40 max-w-md mx-auto mb-8 text-sm leading-relaxed">
            Browse our curated collection of masterworks from Bangladesh and around the world.
          </p>
          <Link
            href="/famous-artworks"
            className="inline-flex items-center gap-2 bg-rose-700 hover:bg-rose-600 text-white px-8 py-3.5 text-sm font-semibold tracking-wide transition-colors"
          >
            All Masterworks <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
