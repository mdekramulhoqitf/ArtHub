"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useState } from "react";
import { cn, formatPrice } from "@/lib/utils";

interface ArtCardProps {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  price: number;
  currency?: string;
  status: "ACTIVE" | "SOLD" | "DRAFT" | "ARCHIVED";
  shopName: string;
  shopSlug: string;
  isFeatured?: boolean;
  widthCm?: number;
  heightCm?: number;
  medium?: string;
}

export function ArtCard({
  slug,
  title,
  imageUrl,
  price,
  currency = "USD",
  status,
  shopName,
  shopSlug,
  isFeatured,
  widthCm,
  heightCm,
  medium,
}: ArtCardProps) {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="group">
      {/* Image */}
      <Link href={`/artwork/${slug}`} className="block relative overflow-hidden bg-gray-100 aspect-3/4">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Sold overlay */}
        {status === "SOLD" && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="border border-rose-700 text-rose-700 text-xs font-semibold tracking-[0.2em] uppercase px-4 py-2">
              Sold
            </span>
          </div>
        )}

        {/* Featured tag */}
        {isFeatured && (
          <div className="absolute top-3 left-3 bg-rose-700 text-white text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1">
            Featured
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setWishlisted(!wishlisted);
          }}
          className={cn(
            "absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm transition-all opacity-0 group-hover:opacity-100",
            wishlisted ? "text-rose-600" : "text-gray-400 hover:text-rose-600"
          )}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={cn("w-4 h-4", wishlisted && "fill-current")} />
        </button>
      </Link>

      {/* Info */}
      <div className="pt-3 pb-1">
        <Link href={`/shop/${shopSlug}`} className="text-xs text-gray-400 hover:text-black transition-colors uppercase tracking-wider">
          {shopName}
        </Link>
        <Link href={`/artwork/${slug}`}>
          <h3 className="text-sm font-medium text-gray-900 mt-0.5 hover:text-rose-600 transition-colors leading-snug line-clamp-2">
            {title}
          </h3>
        </Link>
        {medium && (
          <p className="text-xs text-gray-400 mt-0.5">
            {medium}{widthCm && heightCm && ` · ${widthCm} × ${heightCm} cm`}
          </p>
        )}
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-semibold text-gray-900">{formatPrice(price, currency)}</span>
          {status === "ACTIVE" && (
            <Link href={`/artwork/${slug}`} className="text-xs text-gray-400 hover:text-black transition-colors underline underline-offset-2">
              View
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
