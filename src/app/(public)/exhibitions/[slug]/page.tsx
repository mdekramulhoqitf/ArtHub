import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight, ArrowLeft, MapPin, Clock, Calendar,
  Ticket, Users, CheckCircle2, Info,
} from "lucide-react";
import { EXHIBITIONS } from "@/lib/exhibitions-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return EXHIBITIONS.map((e) => ({ slug: e.slug }));
}

export default async function ExhibitionDetailPage({ params }: Props) {
  const { slug } = await params;
  const ex = EXHIBITIONS.find((e) => e.slug === slug);
  if (!ex) notFound();

  const idx  = EXHIBITIONS.indexOf(ex);
  const prev = EXHIBITIONS[idx - 1] ?? null;
  const next = EXHIBITIONS[idx + 1] ?? null;

  return (
    <div className="min-h-screen bg-[#eeebe2]">

      {/* ── Full-bleed banner ──────────────────────── */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden bg-[#1a1a2e]">
        <Image
          src={ex.bannerImage}
          alt={ex.title}
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#1a1a2e]/40 to-[#1a1a2e]/90" />

        <Link
          href="/exhibitions"
          className="absolute top-8 left-8 inline-flex items-center gap-2 text-white/60 hover:text-white text-xs uppercase tracking-widest transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> All Exhibitions
        </Link>

        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {ex.tags.map((t) => (
              <span key={t} className="text-[10px] uppercase tracking-widest bg-rose-700 text-white px-2.5 py-1 font-semibold">
                {t}
              </span>
            ))}
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white leading-tight mb-2">
            {ex.title}
          </h1>
          <p className="text-white/50 text-lg">{ex.subtitle}</p>
        </div>
      </section>

      {/* ── Sticky info bar ────────────────────────── */}
      <div className="sticky top-16 z-20 bg-[#1a1a2e]/95 backdrop-blur-sm border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 py-3 text-xs text-white/50">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-rose-400" /> {ex.dates}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-400" /> {ex.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-rose-400" /> {ex.openingHours.split(",")[0]}
            </span>
            <span className="ml-auto hidden sm:flex items-center gap-1.5 text-rose-300 font-semibold">
              <Ticket className="w-3.5 h-3.5" /> From ৳{ex.ticketPrice.student}
            </span>
          </div>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────── */}
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* ── Left: main content ─────────────────── */}
          <div className="lg:col-span-2 space-y-14">

            {/* About */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-rose-500" />
                <p className="text-xs uppercase tracking-[0.3em] text-rose-600">About This Exhibition</p>
              </div>
              <div className="space-y-5">
                {ex.about.split("\n\n").filter(Boolean).map((para, i) => (
                  <p key={i} className="text-[#4a4a5a] text-base leading-relaxed">{para}</p>
                ))}
              </div>
            </section>

            {/* Highlights */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-rose-500" />
                <p className="text-xs uppercase tracking-[0.3em] text-rose-600">Exhibition Highlights</p>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ex.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 bg-white border border-[#d8d3c5] p-4">
                    <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-[#4a4a5a]">{h}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Location & Hours */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-rose-500" />
                <p className="text-xs uppercase tracking-[0.3em] text-rose-600">Location & Hours</p>
              </div>
              <div className="bg-white border border-[#d8d3c5] p-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#7a7a8a] mb-2">Venue</p>
                  <p className="font-semibold text-[#1a1a2e] text-sm">{ex.location}</p>
                  <p className="text-sm text-[#7a7a8a] mt-1">{ex.address}</p>
                  <p className="text-sm text-[#7a7a8a]">{ex.city}, {ex.country}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#7a7a8a] mb-2">Opening Hours</p>
                  <p className="text-sm text-[#4a4a5a] leading-relaxed">{ex.openingHours}</p>
                  <p className="text-xs text-[#7a7a8a] mt-2">Closed Mondays & public holidays</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#7a7a8a] mb-2">Exhibition Dates</p>
                  <p className="text-sm text-[#4a4a5a]">{ex.startDate} —</p>
                  <p className="text-sm text-[#4a4a5a]">{ex.endDate}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#7a7a8a] mb-2">Curator</p>
                  <p className="text-sm text-[#4a4a5a]">{ex.curator}</p>
                </div>
              </div>
            </section>

            {/* Other exhibitions */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-rose-500" />
                <p className="text-xs uppercase tracking-[0.3em] text-rose-600">Other Exhibitions</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {EXHIBITIONS.filter((e) => e.slug !== ex.slug).slice(0, 2).map((other) => (
                  <Link
                    key={other.slug}
                    href={`/exhibitions/${other.slug}`}
                    className="group flex gap-4 bg-white border border-[#d8d3c5] p-4 hover:border-rose-300 transition-colors"
                  >
                    <div className="relative w-20 h-20 shrink-0 overflow-hidden bg-[#d8d3c5]">
                      <Image src={other.image} alt={other.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-[#1a1a2e] text-sm leading-snug line-clamp-2">{other.title}</p>
                      <p className="text-xs text-[#7a7a8a] mt-1">{other.dates}</p>
                      <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1">
                        More Info <ArrowRight className="w-3 h-3" />
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

          </div>

          {/* ── Right: ticket sidebar ──────────────── */}
          <div className="lg:col-span-1">
            <div className="sticky top-36 space-y-4">

              {/* Ticket card */}
              <div className="bg-white border border-[#d8d3c5] overflow-hidden">
                <div className="bg-[#1a1a2e] px-6 py-4 flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-rose-400" />
                  <p className="text-white font-semibold text-sm uppercase tracking-widest">Admission</p>
                </div>
                <div className="divide-y divide-[#f0ede6]">
                  {[
                    { label: "General",           price: ex.ticketPrice.general },
                    { label: "Student (with ID)", price: ex.ticketPrice.student },
                    { label: "Senior (60+)",      price: ex.ticketPrice.senior  },
                    { label: "Child (under 12)",  price: ex.ticketPrice.child   },
                  ].map(({ label, price }) => (
                    <div key={label} className="flex items-center justify-between px-6 py-3.5">
                      <span className="text-sm text-[#4a4a5a]">{label}</span>
                      {price === 0
                        ? <span className="text-emerald-600 font-semibold text-sm">Free</span>
                        : <span className="font-bold text-[#1a1a2e]">৳{price.toLocaleString()}</span>
                      }
                    </div>
                  ))}
                </div>
                <div className="px-6 py-5">
                  <button className="w-full bg-rose-700 hover:bg-rose-800 text-white text-sm font-semibold uppercase tracking-widest py-3.5 transition-colors">
                    Book Tickets
                  </button>
                  <p className="text-[10px] text-[#7a7a8a] text-center mt-3">
                    Online booking · No booking fee
                  </p>
                </div>
              </div>

              {/* Quick info */}
              <div className="bg-white border border-[#d8d3c5] p-5 space-y-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#7a7a8a]">Quick Info</p>
                {[
                  { icon: Calendar, label: "Opens",    val: ex.startDate },
                  { icon: Calendar, label: "Closes",   val: ex.endDate   },
                  { icon: Clock,    label: "Hours",    val: ex.openingHours.split(",")[0] },
                  { icon: MapPin,   label: "Location", val: `${ex.city}, ${ex.country}` },
                  { icon: Users,    label: "Curator",  val: ex.curator   },
                ].map(({ icon: Icon, label, val }) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-[#7a7a8a]">{label}</p>
                      <p className="text-sm text-[#1a1a2e] font-medium">{val}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Share */}
              <div className="bg-[#e6e2d8] border border-[#c5c0b0] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#7a7a8a] mb-3">Share This Exhibition</p>
                <div className="flex gap-2">
                  {["Facebook", "Twitter", "Copy Link"].map((s) => (
                    <button key={s}
                      className="flex-1 text-[9px] uppercase tracking-widest border border-[#c5c0b0] bg-white hover:bg-[#1a1a2e] hover:text-white hover:border-[#1a1a2e] text-[#4a4a5a] py-2 transition-all duration-200">
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Info note */}
              <div className="flex gap-3 bg-rose-50 border border-rose-100 p-4">
                <Info className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <p className="text-xs text-rose-700 leading-relaxed">
                  Ticket prices include general admission to the full gallery on the day of visit.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── Prev / Next ────────────────────────────── */}
      <div className="border-t border-[#c5c0b0] bg-[#e6e2d8]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 divide-x divide-[#c5c0b0]">
            {prev ? (
              <Link href={`/exhibitions/${prev.slug}`}
                className="group flex items-center gap-4 py-8 pr-8 hover:bg-[#eeebe2] transition-colors">
                <ArrowLeft className="w-5 h-5 text-[#7a7a8a] group-hover:text-[#1a1a2e] shrink-0 transition-colors" />
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-widest text-[#7a7a8a] mb-1">Previous</p>
                  <p className="font-heading font-bold text-[#1a1a2e] text-sm truncate">{prev.title}</p>
                  <p className="text-xs text-[#7a7a8a] truncate">{prev.dates}</p>
                </div>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/exhibitions/${next.slug}`}
                className="group flex items-center justify-end gap-4 py-8 pl-8 hover:bg-[#eeebe2] transition-colors">
                <div className="min-w-0 text-right">
                  <p className="text-[10px] uppercase tracking-widest text-[#7a7a8a] mb-1">Next</p>
                  <p className="font-heading font-bold text-[#1a1a2e] text-sm truncate">{next.title}</p>
                  <p className="text-xs text-[#7a7a8a] truncate">{next.dates}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-[#7a7a8a] group-hover:text-[#1a1a2e] shrink-0 transition-colors" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </div>

    </div>
  );
}
