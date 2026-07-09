"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { EXHIBITIONS as ALL_EXHIBITIONS } from "@/lib/exhibitions-data";

const EXHIBITIONS = ALL_EXHIBITIONS.map((e) => ({
  slug:  e.slug,
  title: e.title,
  dates: e.dates,
  desc:  e.about.split("\n\n")[0],
  image: e.image,
}));

export function ExhibitionsCarousel() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir]         = useState<"next" | "prev">("next");
  const [animating, setAnimating] = useState(false);

  function go(next: number, direction: "next" | "prev") {
    if (animating) return;
    setDir(direction);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(next);
      setAnimating(false);
    }, 320);
  }

  function goPrev() {
    go(current === 0 ? EXHIBITIONS.length - 1 : current - 1, "prev");
  }
  function goNext() {
    go(current === EXHIBITIONS.length - 1 ? 0 : current + 1, "next");
  }

  const ex = EXHIBITIONS[current];

  return (
    <section className="bg-[#eeebe2] border-b border-[#d8d3c5] py-16">
      <div className="container mx-auto px-4">

        {/* Header row */}
        <div className="flex items-center justify-between pb-6 border-b border-[#c5c0b0] mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1a1a2e]">
            Upcoming Exhibitions
          </h2>
          <Link
            href="/exhibitions"
            className="hidden sm:inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#1a1a2e] group"
          >
            <span>View All Exhibitions</span>
            <span className="w-9 h-9 rounded-full border border-[#1a1a2e] flex items-center justify-center group-hover:bg-[#1a1a2e] group-hover:text-white transition-all duration-300">
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        {/* Slide */}
        <div
          className={cn(
            "transition-all duration-300",
            animating
              ? dir === "next"
                ? "opacity-0 translate-x-6"
                : "opacity-0 -translate-x-6"
              : "opacity-100 translate-x-0"
          )}
        >
          {/* Panoramic image */}
          <div className="relative w-full aspect-21/7 overflow-hidden bg-[#d8d3c5] mb-7">
            <Image
              src={ex.image}
              alt={ex.title}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
          </div>

          {/* Info row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div>
              <h3 className="font-heading text-xl font-bold text-[#1a1a2e] leading-snug mb-1">
                {ex.title}
              </h3>
              <p className="text-sm text-[#7a7a8a]">{ex.dates}</p>
            </div>
            <div>
              <p className="text-sm text-[#4a4a5a] leading-relaxed">{ex.desc}</p>
            </div>
            <div className="flex md:justify-end items-start">
              <Link
                href={`/exhibitions/${ex.slug}`}
                className="inline-block border border-[#c5c0b0] bg-[#e6e2d8] hover:bg-[#1a1a2e] hover:text-white hover:border-[#1a1a2e] text-[#1a1a2e] text-xs uppercase tracking-[0.25em] px-7 py-3 transition-all duration-300"
              >
                More Info
              </Link>
            </div>
          </div>
        </div>

        {/* Prev / Next controls */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-[#c5c0b0]">

          {/* Counter */}
          <p className="text-xs text-[#7a7a8a] uppercase tracking-widest">
            <span className="text-[#1a1a2e] font-semibold">{String(current + 1).padStart(2, "0")}</span>
            &nbsp;/&nbsp;
            {String(EXHIBITIONS.length).padStart(2, "0")}
          </p>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {EXHIBITIONS.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i, i > current ? "next" : "prev")}
                className={cn(
                  "rounded-full transition-all duration-300",
                  i === current
                    ? "w-6 h-2 bg-[#1a1a2e]"
                    : "w-2 h-2 bg-[#c5c0b0] hover:bg-[#7a7a8a]"
                )}
              />
            ))}
          </div>

          {/* Arrow buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={goPrev}
              disabled={animating}
              className="w-11 h-11 rounded-full border border-[#c5c0b0] bg-[#e6e2d8] flex items-center justify-center text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white hover:border-[#1a1a2e] transition-all duration-300 disabled:opacity-40"
              aria-label="Previous exhibition"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goNext}
              disabled={animating}
              className="w-11 h-11 rounded-full border border-[#c5c0b0] bg-[#e6e2d8] flex items-center justify-center text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white hover:border-[#1a1a2e] transition-all duration-300 disabled:opacity-40"
              aria-label="Next exhibition"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
