"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArtworkGalleryProps {
  mainImage: string;
  images: string[];
  title: string;
}

export function ArtworkGallery({ mainImage, images, title }: ArtworkGalleryProps) {
  const all = [mainImage, ...images.filter((img) => img !== mainImage)];
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  return (
    <>
      <div className="space-y-4">
        <div
          className="relative aspect-4/5 rounded-2xl overflow-hidden bg-gray-100 group cursor-zoom-in"
          onClick={() => setZoomed(true)}
        >
          <Image
            src={all[active]}
            alt={title}
            fill
            className="object-cover transition-opacity duration-300"
            priority
          />
          <button
            className="absolute top-4 right-4 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
            onClick={(e) => { e.stopPropagation(); setZoomed(true); }}
            aria-label="Zoom image"
          >
            <ZoomIn className="w-4 h-4 text-gray-700" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {all.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-square rounded-xl overflow-hidden bg-gray-100 border-2 transition-colors",
                i === active ? "border-rose-500" : "border-transparent hover:border-rose-300"
              )}
              aria-label={`View image ${i + 1}`}
            >
              <Image src={img} alt={`${title} view ${i + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setZoomed(false)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            onClick={() => setZoomed(false)}
            aria-label="Close zoom"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative max-w-4xl w-full max-h-[90vh] aspect-4/5" onClick={(e) => e.stopPropagation()}>
            <Image
              src={all[active]}
              alt={title}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
