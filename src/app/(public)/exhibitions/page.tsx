import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, Calendar } from "lucide-react";
import { EXHIBITIONS } from "@/lib/exhibitions-data";

const STATUS_LABEL: Record<string, string> = {
  upcoming: "Upcoming",
  ongoing:  "Now On",
  past:     "Past",
};
const STATUS_COLOR: Record<string, string> = {
  upcoming: "bg-rose-50 text-rose-700 border-rose-200",
  ongoing:  "bg-emerald-50 text-emerald-700 border-emerald-200",
  past:     "bg-gray-100 text-gray-500 border-gray-200",
};

export default function ExhibitionsPage() {
  return (
    <div className="min-h-screen bg-[#eeebe2]">

      {/* ── Hero ───────────────────────────────────── */}
      <section className="relative h-[50vh] min-h-[380px] overflow-hidden bg-[#1a1a2e]">
        <Image
          src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1800"
          alt="Exhibitions"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#1a1a2e]/20 to-[#1a1a2e]/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="text-xs uppercase tracking-[0.4em] text-rose-300 mb-3">ArtHub Gallery</p>
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-white leading-tight mb-4">
            Exhibitions
          </h1>
          <p className="text-white/50 text-lg max-w-lg">
            Past, present and upcoming exhibitions at ArtHub Gallery.
          </p>
        </div>
      </section>

      {/* ── Stats strip ────────────────────────────── */}
      <div className="bg-[#1a1a2e] border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 divide-x divide-white/10 text-center">
            {[
              { v: EXHIBITIONS.length, l: "Exhibitions" },
              { v: EXHIBITIONS.filter((e) => e.status === "upcoming").length, l: "Upcoming" },
              { v: EXHIBITIONS.filter((e) => e.status === "ongoing").length,  l: "Now On"   },
            ].map(({ v, l }) => (
              <div key={l} className="py-5">
                <p className="text-xl font-bold text-white">{v}</p>
                <p className="text-[10px] uppercase tracking-widest text-white/30 mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Exhibition list ─────────────────────────── */}
      <div className="container mx-auto px-4 py-16">

        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#c5c0b0] mb-12">
          <h2 className="font-heading text-2xl font-bold text-[#1a1a2e]">All Exhibitions</h2>
          <p className="text-xs text-[#7a7a8a] uppercase tracking-widest">{EXHIBITIONS.length} total</p>
        </div>

        {/* Cards */}
        <div className="space-y-0 divide-y divide-[#c5c0b0]">
          {EXHIBITIONS.map((ex, i) => (
            <article key={ex.slug} className="group py-10 first:pt-0">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                {/* Number */}
                <div className="hidden lg:flex items-start pt-1">
                  <span className="text-2xl font-bold text-[#c5c0b0] font-heading">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Image */}
                <div className="lg:col-span-4 relative aspect-[16/9] overflow-hidden bg-[#d8d3c5]">
                  <Image
                    src={ex.image}
                    alt={ex.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width:1024px) 100vw, 33vw"
                  />
                  {/* Status badge */}
                  <span className={`absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 border ${STATUS_COLOR[ex.status]}`}>
                    {STATUS_LABEL[ex.status]}
                  </span>
                </div>

                {/* Info */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-rose-600 mb-1">{ex.tags.slice(0,3).join(" · ")}</p>
                    <h3 className="font-heading text-xl md:text-2xl font-bold text-[#1a1a2e] mb-1 leading-snug">
                      {ex.title}
                    </h3>
                    <p className="text-sm text-[#4a4a5a] italic mb-4">{ex.subtitle}</p>
                    <p className="text-sm text-[#4a4a5a] leading-relaxed line-clamp-3">
                      {ex.about.split("\n")[0]}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-[#7a7a8a]">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-rose-500" /> {ex.dates}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" /> {ex.city}, {ex.country}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-rose-500" /> {ex.openingHours.split(",")[0]}
                    </span>
                  </div>
                </div>

                {/* Ticket + CTA */}
                <div className="lg:col-span-2 flex flex-col items-start lg:items-end justify-between gap-4 h-full">
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-[#7a7a8a] mb-1">From</p>
                    <p className="font-heading text-2xl font-bold text-[#1a1a2e]">
                      ৳{ex.ticketPrice.student}
                    </p>
                    <p className="text-[10px] text-[#7a7a8a]">Student ticket</p>
                  </div>
                  <Link
                    href={`/exhibitions/${ex.slug}`}
                    className="inline-flex items-center gap-2 border border-[#1a1a2e] text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white text-xs uppercase tracking-[0.2em] px-5 py-2.5 transition-all duration-300 group/btn"
                  >
                    More Info
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ── Bottom CTA ─────────────────────────────── */}
      <section className="bg-[#1a1a2e] py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-rose-400 mb-3">Stay Updated</p>
          <h2 className="font-heading text-3xl font-bold text-white mb-4">Never Miss an Exhibition</h2>
          <p className="text-white/40 max-w-md mx-auto mb-8 text-sm leading-relaxed">
            Get notified when new exhibitions are announced and receive early-bird ticket offers.
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
