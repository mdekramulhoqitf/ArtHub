"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=1920",
    label: "Curated Collection",
    heading: "Discover Art",
    headingAccent: "That Moves You",
    sub: "Connecting art lovers with independent artists worldwide.",
    cta: { label: "Browse Art", href: "/browse" },
    ctaSecondary: { label: "Open Your Shop", href: "/seller/shop/create" },
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1920",
    label: "New Arrivals",
    heading: "Original Art,",
    headingAccent: "Directly From Artists",
    sub: "Buy directly from creators. Own something truly one-of-a-kind.",
    cta: { label: "New Arrivals", href: "/browse?sort=newest" },
    ctaSecondary: { label: "View Shops", href: "/shops" },
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1920",
    label: "For Artists",
    heading: "Sell Your Art",
    headingAccent: "To The World",
    sub: "Open your free shop in minutes. Only 2% platform fee per sale.",
    cta: { label: "Start Selling", href: "/seller/shop/create" },
    ctaSecondary: { label: "Learn More", href: "/about" },
  },
];

const STATS = [
  { value: "2,400+", label: "Artworks" },
  { value: "500+", label: "Artists" },
  { value: "12,000+", label: "Collectors" },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
      setProgressKey((k) => k + 1);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  function goTo(i: number) {
    setCurrent(i);
    setProgressKey((k) => k + 1);
  }

  const slide = SLIDES[current];
  const num = String(current + 1).padStart(2, "0");

  return (
    <section className="relative h-screen min-h-150 max-h-240 overflow-hidden bg-black">

      {/* ── Background images with Ken Burns ── */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0"
          style={{
            opacity: i === current ? 1 : 0,
            zIndex: i === current ? 10 : 0,
            transition: "opacity 1000ms ease-in-out",
          }}
        >
          <Image
            key={`${s.id}-${progressKey}`}
            src={s.image}
            alt={s.heading}
            fill
            className="object-cover animate-kenburns"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* ── Overlay: strong left, fades right ── */}
      <div className="absolute inset-0 z-20 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.50) 50%, rgba(0,0,0,0.10) 100%)" }} />
      <div className="absolute inset-0 z-20 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.60) 0%, transparent 50%, rgba(0,0,0,0.20) 100%)" }} />

      {/* ── Ghost slide number ── */}
      <div
        key={`num-${current}`}
        className="absolute left-0 bottom-0 z-20 font-heading font-bold text-white/4 leading-none select-none pointer-events-none"
        style={{ fontSize: "clamp(220px, 30vw, 420px)", lineHeight: 1 }}
      >
        {num}
      </div>

      {/* ── Main content ── */}
      <div className="relative z-30 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="max-w-2xl">

          {/* Label */}
          <div key={`label-${current}`} className="animate-hero-badge flex items-center gap-3 mb-7">
            <span className="w-8 h-px bg-rose-500" />
            <span className="text-rose-400 text-xs font-semibold uppercase tracking-[0.25em]">{slide.label}</span>
          </div>

          {/* Heading */}
          <h1
            key={`h-${current}`}
            className="animate-hero-h1 font-heading font-bold text-white leading-[1.05] mb-5"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
          >
            {slide.heading}
            <br />
            <span className="text-rose-400">{slide.headingAccent}</span>
          </h1>

          {/* Sub */}
          <p
            key={`p-${current}`}
            className="animate-hero-sub text-gray-300 text-lg leading-relaxed max-w-md mb-9"
          >
            {slide.sub}
          </p>

          {/* CTAs */}
          <div key={`cta-${current}`} className="animate-hero-cta flex flex-wrap gap-3">
            <Link href={slide.cta.href}>
              <button className="group flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold px-7 h-12 rounded-full transition-all duration-300 shadow-lg shadow-rose-900/40">
                {slide.cta.label}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
            <Link href={slide.ctaSecondary.href}>
              <button className="flex items-center gap-2 border border-white/25 hover:border-white/60 text-white text-sm font-semibold px-7 h-12 rounded-full backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                {slide.ctaSecondary.label}
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div key={`stats-${current}`} className="animate-hero-stats flex items-center gap-8 mt-12 pt-8 border-t border-white/10">
            {STATS.map(({ value, label }, i) => (
              <div key={label} className={cn("text-center", i !== 0 && "pl-8 border-l border-white/10")}>
                <p className="text-2xl font-bold text-white font-heading">{value}</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right side: slide thumbnails ── */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-3">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            className={cn(
              "relative overflow-hidden rounded-lg transition-all duration-500",
              i === current
                ? "w-16 h-20 ring-2 ring-rose-500 ring-offset-2 ring-offset-black/50"
                : "w-12 h-14 opacity-50 hover:opacity-80"
            )}
            aria-label={`Go to slide ${i + 1}`}
          >
            <Image src={s.image} alt={s.heading} fill className="object-cover" sizes="80px" />
            {i !== current && <div className="absolute inset-0 bg-black/40" />}
          </button>
        ))}
      </div>

      {/* ── Bottom progress bar ── */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-0.5 bg-white/10">
        <div
          key={progressKey}
          className="h-full bg-rose-500 animate-hero-progress"
        />
      </div>

      {/* ── Bottom: dot indicators + counter ── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={cn(
              "rounded-full transition-all duration-400",
              i === current ? "w-7 h-2 bg-rose-500" : "w-2 h-2 bg-white/30 hover:bg-white/60"
            )}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Slide counter ── */}
      <div className="absolute bottom-4 right-8 z-30 hidden lg:flex items-center gap-2 text-white/40 text-xs font-mono">
        <span className="text-white/80 font-semibold text-sm">{num}</span>
        <span>/</span>
        <span>{String(SLIDES.length).padStart(2, "0")}</span>
      </div>

      {/* ── Scroll hint ── */}
      <div className="absolute bottom-6 left-8 md:left-16 lg:left-24 z-30 hidden md:flex flex-col items-center gap-1.5 text-white/30">
        <div className="w-px h-10 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/60 animate-bounce" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] rotate-90 translate-y-4 origin-center">Scroll</span>
      </div>

    </section>
  );
}
