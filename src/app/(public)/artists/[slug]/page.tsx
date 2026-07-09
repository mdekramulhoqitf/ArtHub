import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Calendar, Award, GraduationCap, Quote, ArrowRight } from "lucide-react";
import { ARTISTS } from "@/lib/artists-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTISTS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const artist = ARTISTS.find((a) => a.slug === slug);
  if (!artist) return {};
  return {
    title: `${artist.name} — ArtHub Artists`,
    description: artist.bio,
  };
}

export default async function ArtistProfilePage({ params }: Props) {
  const { slug } = await params;
  const artist = ARTISTS.find((a) => a.slug === slug);
  if (!artist) notFound();

  const related = ARTISTS.filter((a) => a.slug !== artist.slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#f5f2ea]">

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative h-[65vh] min-h-[480px] overflow-hidden bg-[#1a1a2e]">
        <Image
          src={artist.coverImage}
          alt={artist.name}
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e]/95 via-[#1a1a2e]/70 to-transparent" />

        {/* Back link */}
        <div className="absolute top-6 left-0 right-0 container mx-auto px-4">
          <Link
            href="/artists"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-xs uppercase tracking-wider transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            All Artists
          </Link>
        </div>

        {/* Artist identity */}
        <div className="absolute inset-0 flex items-end container mx-auto px-4 pb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
            {/* Portrait thumbnail */}
            <div className="relative w-28 h-36 sm:w-36 sm:h-44 overflow-hidden border-2 border-white/20 shrink-0 shadow-2xl">
              <Image
                src={artist.image}
                alt={artist.name}
                fill
                className="object-cover object-top"
                sizes="144px"
              />
            </div>

            <div className="pb-1">
              {artist.banglaName && (
                <p className="text-rose-300/80 text-sm mb-1">{artist.banglaName}</p>
              )}
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-white leading-tight mb-3">
                {artist.name}
              </h1>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-white/50 text-xs">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-rose-400" />
                  {artist.born}{artist.died ? ` — ${artist.died}` : " — Present"}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  {artist.birthPlace}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {artist.style.map((s) => (
                  <span
                    key={s}
                    className="text-[9px] uppercase tracking-widest border border-white/20 text-white/60 px-2.5 py-1"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ──────────────────────────────────────── */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

          {/* ── Left: bio & timeline ─────────────────── */}
          <div className="lg:col-span-2 space-y-12">

            {/* Bio */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-[#1a1a2e] mb-1 pb-3 border-b border-[#d8d3c5]">
                Biography
              </h2>
              <div className="mt-6 space-y-4 text-[#3a3a4a] leading-relaxed text-[15px]">
                {artist.longBio.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>

            {/* Quote */}
            {artist.quote && (
              <blockquote className="border-l-4 border-rose-600 pl-6 py-2">
                <Quote className="w-5 h-5 text-rose-300 mb-2" />
                <p className="text-[#1a1a2e] font-heading text-lg italic leading-relaxed mb-2">
                  &ldquo;{artist.quote}&rdquo;
                </p>
                <cite className="text-xs text-[#7a7a8a] uppercase tracking-wider not-italic">
                  — {artist.name}
                </cite>
              </blockquote>
            )}

            {/* Timeline */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-[#1a1a2e] mb-1 pb-3 border-b border-[#d8d3c5]">
                Life &amp; Career
              </h2>
              <div className="mt-6 relative">
                {/* Vertical line */}
                <div className="absolute left-[52px] top-2 bottom-2 w-px bg-[#d8d3c5]" />
                <div className="space-y-6">
                  {artist.timeline.map((evt, i) => (
                    <div key={i} className="flex items-start gap-5">
                      <div className="w-[52px] shrink-0 text-right">
                        <span className="text-xs font-bold text-rose-600 font-heading">{evt.year}</span>
                      </div>
                      {/* Dot */}
                      <div className="relative z-10 w-2.5 h-2.5 mt-1 rounded-full bg-rose-600 border-2 border-white shrink-0 shadow" />
                      <p className="text-sm text-[#3a3a4a] leading-relaxed pt-0.5">{evt.event}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* ── Right: sidebar ───────────────────────── */}
          <aside className="space-y-8 lg:sticky lg:top-24">

            {/* Famous for */}
            <div className="bg-white border border-[#d8d3c5] p-6">
              <h3 className="font-heading text-sm font-bold text-[#1a1a2e] uppercase tracking-wider mb-3">
                Known For
              </h3>
              <p className="text-sm text-[#3a3a4a] leading-relaxed">{artist.famousFor}</p>
            </div>

            {/* Awards */}
            <div className="bg-white border border-[#d8d3c5] p-6">
              <h3 className="font-heading text-sm font-bold text-[#1a1a2e] uppercase tracking-wider mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-rose-600" /> Awards &amp; Honours
              </h3>
              <ul className="space-y-2">
                {artist.awards.map((award, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#3a3a4a]">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                    {award}
                  </li>
                ))}
              </ul>
            </div>

            {/* Education */}
            <div className="bg-white border border-[#d8d3c5] p-6">
              <h3 className="font-heading text-sm font-bold text-[#1a1a2e] uppercase tracking-wider mb-3 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-rose-600" /> Education
              </h3>
              <ul className="space-y-2">
                {artist.education.map((edu, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#3a3a4a]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c5c0b0] mt-1.5 shrink-0" />
                    {edu}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick facts */}
            <div className="bg-[#1a1a2e] p-6">
              <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-4">
                Quick Facts
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-white/30 mb-0.5">Nationality</dt>
                  <dd className="text-sm text-white">{artist.nationality}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-white/30 mb-0.5">Born</dt>
                  <dd className="text-sm text-white">{artist.born}</dd>
                </div>
                {artist.died && (
                  <div>
                    <dt className="text-[10px] uppercase tracking-widest text-white/30 mb-0.5">Died</dt>
                    <dd className="text-sm text-white">{artist.died}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-white/30 mb-0.5">Birthplace</dt>
                  <dd className="text-sm text-white">{artist.birthPlace}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-white/30 mb-0.5">Styles</dt>
                  <dd className="text-sm text-white">{artist.style.join(", ")}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>

      {/* ── Famous Works ──────────────────────────────── */}
      <section className="bg-white border-t border-[#d8d3c5] py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between pb-6 border-b border-[#d8d3c5] mb-10">
            <h2 className="font-heading text-2xl font-bold text-[#1a1a2e]">
              Notable Works
            </h2>
            <span className="text-xs text-[#7a7a8a] uppercase tracking-widest">
              {artist.famousWorks.length} works
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {artist.famousWorks.map((work, i) => (
              <div key={i} className="group">
                <div className="relative aspect-square overflow-hidden bg-[#e8e3d5] mb-3">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 16vw"
                  />
                  <div className="absolute inset-0 bg-[#1a1a2e]/0 group-hover:bg-[#1a1a2e]/40 transition-all duration-500" />
                </div>
                <h4 className="text-xs font-bold text-[#1a1a2e] leading-snug">{work.title}</h4>
                <p className="text-[10px] text-[#7a7a8a] mt-0.5">{work.year} · {work.medium}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── More Artists ──────────────────────────────── */}
      <section className="py-16 bg-[#f0ece0] border-t border-[#d8d3c5]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between pb-6 border-b border-[#c5c0b0] mb-10">
            <h2 className="font-heading text-2xl font-bold text-[#1a1a2e]">More Artists</h2>
            <Link
              href="/artists"
              className="text-xs uppercase tracking-wider text-rose-600 hover:text-rose-700 flex items-center gap-1.5 transition-colors"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {related.map((a) => (
              <Link
                key={a.slug}
                href={`/artists/${a.slug}`}
                className="group text-center"
              >
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto overflow-hidden rounded-full mb-3 border-2 border-[#d8d3c5] group-hover:border-rose-300 transition-colors shadow">
                  <Image
                    src={a.image}
                    alt={a.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="112px"
                  />
                </div>
                <h3 className="text-xs font-bold text-[#1a1a2e] group-hover:text-rose-700 transition-colors leading-snug">
                  {a.name}
                </h3>
                <p className="text-[10px] text-[#7a7a8a] mt-0.5">{a.style[0]}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
