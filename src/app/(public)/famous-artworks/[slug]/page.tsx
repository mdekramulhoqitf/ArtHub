import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Palette,
  Ruler,
  ArrowRight,
  Building2,
  Lock,
  Globe,
  Quote,
} from "lucide-react";
import { FAMOUS_ARTWORKS } from "@/lib/famous-artworks-data";
import { ARTISTS } from "@/lib/artists-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return FAMOUS_ARTWORKS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const art = FAMOUS_ARTWORKS.find((a) => a.slug === slug);
  if (!art) return {};
  return {
    title: `${art.title} — ${art.artistName} · ArtHub`,
    description: art.shortDescription,
  };
}

export default async function FamousArtworkDetailPage({ params }: Props) {
  const { slug } = await params;
  const art = FAMOUS_ARTWORKS.find((a) => a.slug === slug);
  if (!art) notFound();

  const artist = ARTISTS.find((a) => a.slug === art.artistSlug);
  const related = FAMOUS_ARTWORKS.filter(
    (a) => a.slug !== art.slug && (art.relatedSlugs.includes(a.slug) || a.category === art.category)
  ).slice(0, 4);

  const loc = art.currentLocation;

  const LocationIcon =
    loc.type === "museum" ? Building2 :
    loc.type === "private" ? Lock :
    loc.type === "gallery" ? Globe :
    MapPin;

  const locationColor =
    loc.type === "museum" ? "text-blue-600 bg-blue-50 border-blue-200" :
    loc.type === "private" ? "text-amber-700 bg-amber-50 border-amber-200" :
    loc.type === "gallery" ? "text-purple-600 bg-purple-50 border-purple-200" :
    "text-gray-600 bg-gray-50 border-gray-200";

  return (
    <div className="min-h-screen bg-[#f5f2ea]">

      {/* ── Hero artwork image ─────────────────────────── */}
      <section className="relative bg-[#1a1a2e]">
        {/* Back */}
        <div className="absolute top-6 left-0 right-0 z-10 container mx-auto px-4">
          <Link
            href="/famous-artworks"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-xs uppercase tracking-wider transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            All Artworks
          </Link>
        </div>

        <div className="container mx-auto px-4 pt-20 pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-end">
            {/* Image panel */}
            <div className="relative">
              <div className="relative aspect-[4/3] lg:aspect-[3/4] overflow-hidden">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Title panel */}
            <div className="bg-[#1a1a2e] px-8 py-12 lg:py-16 lg:min-h-[60vh] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-3 py-1 border ${
                    art.category === "bangladeshi"
                      ? "bg-emerald-600/20 text-emerald-300 border-emerald-500/30"
                      : "bg-white/10 text-white/60 border-white/20"
                  }`}>
                    {art.category === "bangladeshi" ? "Bangladeshi" : "International"}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-3 py-1 border border-rose-500/30 text-rose-300 bg-rose-500/10">
                    {art.movement}
                  </span>
                </div>

                <h1 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                  {art.title}
                </h1>

                <p className="text-white/60 text-base leading-relaxed mb-8 max-w-lg">
                  {art.shortDescription}
                </p>
              </div>

              {/* Meta grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Calendar, label: "Year", value: art.year },
                  { icon: Palette, label: "Medium", value: art.medium },
                  ...(art.dimensions ? [{ icon: Ruler, label: "Dimensions", value: art.dimensions }] : []),
                  { icon: LocationIcon, label: "Location", value: loc.type === "private" ? "Private Collection" : loc.name },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-white/5 border border-white/10 px-4 py-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon className="w-3.5 h-3.5 text-rose-400" />
                      <p className="text-[9px] uppercase tracking-widest text-white/30">{label}</p>
                    </div>
                    <p className="text-xs text-white font-medium leading-snug">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ──────────────────────────────────────── */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

          {/* ── Left: main content ───────────────────── */}
          <div className="lg:col-span-2 space-y-12">

            {/* Why Famous */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-[#1a1a2e] pb-3 border-b border-[#d8d3c5] mb-6">
                Why Is This Work Famous?
              </h2>
              <div className="space-y-4 text-[#3a3a4a] leading-relaxed text-[15px]">
                {art.whyFamous.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>

            {/* Creation Story */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-[#1a1a2e] pb-3 border-b border-[#d8d3c5] mb-6">
                The Story Behind the Work
              </h2>
              <div className="space-y-4 text-[#3a3a4a] leading-relaxed text-[15px]">
                {art.creationStory.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>

            {/* Technique */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-[#1a1a2e] pb-3 border-b border-[#d8d3c5] mb-6">
                Technique &amp; Materials
              </h2>
              <div className="space-y-4 text-[#3a3a4a] leading-relaxed text-[15px]">
                {art.technique.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {art.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-wider bg-[#f0ece0] text-[#7a7a8a] border border-[#d8d3c5] px-3 py-1"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: sidebar ───────────────────────── */}
          <aside className="space-y-6 lg:sticky lg:top-24">

            {/* Artist card */}
            {artist ? (
              <div className="bg-white border border-[#d8d3c5] overflow-hidden">
                <div className="relative h-32 bg-[#1a1a2e]">
                  <Image
                    src={artist.coverImage}
                    alt={artist.name}
                    fill
                    className="object-cover opacity-30"
                    sizes="400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] to-transparent" />
                </div>
                <div className="px-5 pb-5 -mt-10 relative">
                  <div className="relative w-16 h-20 overflow-hidden border-2 border-white shadow-lg mb-3">
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      fill
                      className="object-cover object-top"
                      sizes="64px"
                    />
                  </div>
                  <h3 className="font-heading text-base font-bold text-[#1a1a2e]">{artist.name}</h3>
                  {artist.banglaName && (
                    <p className="text-xs text-[#7a7a8a] mb-2">{artist.banglaName}</p>
                  )}
                  <p className="text-[10px] text-[#9a9a8a] uppercase tracking-wider mb-3">
                    {artist.born}{artist.died ? ` — ${artist.died}` : " — Present"}
                  </p>
                  <p className="text-xs text-[#3a3a4a] leading-relaxed mb-4">{artist.bio}</p>
                  <Link
                    href={`/artists/${artist.slug}`}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#1a1a2e] border border-[#1a1a2e] px-4 py-2 hover:bg-[#1a1a2e] hover:text-white transition-colors"
                  >
                    About Artist <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-[#d8d3c5] p-5">
                <h3 className="font-heading text-base font-bold text-[#1a1a2e] mb-1">{art.artistName}</h3>
                <p className="text-xs text-[#7a7a8a]">Artist profile not available</p>
              </div>
            )}

            {/* Current Location */}
            <div className="bg-white border border-[#d8d3c5] p-5">
              <h3 className="font-heading text-sm font-bold text-[#1a1a2e] uppercase tracking-wider mb-4">
                Current Location
              </h3>
              <div className={`flex items-start gap-3 p-3 border ${locationColor}`}>
                <LocationIcon className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs font-bold text-[#1a1a2e] leading-snug">{loc.name}</p>
                  {loc.city && (
                    <p className="text-[10px] text-[#7a7a8a] mt-0.5">
                      {loc.city}{loc.country ? `, ${loc.country}` : ""}
                    </p>
                  )}
                  <p className="text-[10px] uppercase tracking-wider mt-1.5 font-semibold" style={{ color: "inherit" }}>
                    {loc.type === "museum" ? "Public Museum" :
                     loc.type === "private" ? "Private Collection" :
                     loc.type === "gallery" ? "Public Gallery" : "Unknown"}
                  </p>
                </div>
              </div>
            </div>

            {/* Artwork details quick facts */}
            <div className="bg-[#1a1a2e] p-5">
              <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-4">
                Artwork Details
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-white/30 mb-0.5">Title</dt>
                  <dd className="text-sm text-white">{art.title}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-white/30 mb-0.5">Artist</dt>
                  <dd className="text-sm text-white">{art.artistName}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-white/30 mb-0.5">Year Created</dt>
                  <dd className="text-sm text-white">{art.year}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-white/30 mb-0.5">Medium</dt>
                  <dd className="text-sm text-white">{art.medium}</dd>
                </div>
                {art.dimensions && (
                  <div>
                    <dt className="text-[10px] uppercase tracking-widest text-white/30 mb-0.5">Dimensions</dt>
                    <dd className="text-sm text-white">{art.dimensions}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-white/30 mb-0.5">Movement</dt>
                  <dd className="text-sm text-white">{art.movement}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-white/30 mb-0.5">Category</dt>
                  <dd className="text-sm text-white capitalize">{art.category}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>

      {/* ── Private Collector Card ─────────────────────── */}
      {loc.owner && (
        <section className="bg-[#f0ece0] border-t border-[#d8d3c5] py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-2xl font-bold text-[#1a1a2e] pb-6 border-b border-[#c5c0b0] mb-10">
              Current Owner
            </h2>
            <div className="max-w-2xl">
              {/* Golden owner card — matches screenshot style */}
              <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "#b8955a" }}>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-8">
                  {/* Owner photo */}
                  <div className="relative w-36 h-44 shrink-0 overflow-hidden border-4 border-white/30 rounded-sm shadow-xl">
                    <Image
                      src={loc.owner.image}
                      alt={loc.owner.name}
                      fill
                      className="object-cover object-top"
                      sizes="144px"
                    />
                  </div>

                  {/* Owner info */}
                  <div className="flex-1 text-white">
                    <h3 className="font-heading text-xl font-bold mb-3">
                      About {loc.owner.name}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-6">
                      {loc.owner.bio}
                    </p>
                    {loc.owner.slug && (
                      <Link
                        href={`/art-owners/${loc.owner.slug}`}
                        className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-semibold text-white/90 hover:text-white group"
                      >
                        More About
                        <span className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Related Works ─────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-16 bg-white border-t border-[#d8d3c5]">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between pb-6 border-b border-[#d8d3c5] mb-10">
              <h2 className="font-heading text-2xl font-bold text-[#1a1a2e]">Related Works</h2>
              <Link
                href="/famous-artworks"
                className="text-xs uppercase tracking-wider text-rose-600 hover:text-rose-700 flex items-center gap-1.5 transition-colors"
              >
                All Works <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/famous-artworks/${rel.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e3d5] mb-3">
                    <Image
                      src={rel.image}
                      alt={rel.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width:640px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-[#1a1a2e]/0 group-hover:bg-[#1a1a2e]/30 transition-all duration-500" />
                  </div>
                  <h4 className="text-xs font-bold text-[#1a1a2e] group-hover:text-rose-700 transition-colors leading-snug line-clamp-2">
                    {rel.title}
                  </h4>
                  <p className="text-[10px] text-[#7a7a8a] mt-0.5">{rel.artistName}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Explore Artists CTA ───────────────────────── */}
      <section className="bg-[#1a1a2e] py-20">
        <div className="container mx-auto px-4 text-center">
          <Quote className="w-8 h-8 text-rose-400/40 mx-auto mb-4" />
          <p className="font-heading text-2xl md:text-3xl font-bold text-white mb-6 max-w-2xl mx-auto leading-relaxed">
            Art is not what you see, but what you make others see.
          </p>
          <p className="text-white/30 text-xs uppercase tracking-widest mb-8">— Edgar Degas</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/famous-artworks"
              className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white px-7 py-3 text-sm font-medium tracking-wide transition-colors"
            >
              More Artworks <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/artists"
              className="inline-flex items-center gap-2 bg-rose-700 hover:bg-rose-600 text-white px-7 py-3 text-sm font-semibold tracking-wide transition-colors"
            >
              Explore Artists <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
