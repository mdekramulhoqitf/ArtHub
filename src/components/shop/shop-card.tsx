import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { getInitials } from "@/lib/utils";

interface ShopCardProps {
  slug: string;
  displayName: string;
  logoUrl?: string | null;
  bannerUrl?: string | null;
  location?: string | null;
  ratingAvg: number;
  totalSales: number;
  artworkCount: number;
  isFeatured?: boolean;
}

export function ShopCard({
  slug,
  displayName,
  logoUrl,
  bannerUrl,
  location,
  ratingAvg,
  totalSales,
  artworkCount,
  isFeatured,
}: ShopCardProps) {
  return (
    <Link href={`/shop/${slug}`} className="group block">
      {/* Banner image */}
      <div className="relative overflow-hidden bg-gray-100 aspect-4/3">
        {bannerUrl ? (
          <Image
            src={bannerUrl}
            alt={displayName}
            fill
            className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-gray-200 to-gray-100" />
        )}
        {isFeatured && (
          <div className="absolute top-3 left-3 bg-rose-700 text-white text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1">
            Featured
          </div>
        )}
        {/* Logo overlay */}
        <div className="absolute bottom-3 left-3">
          <div className="w-12 h-12 border-2 border-white shadow-md bg-white overflow-hidden flex items-center justify-center">
            {logoUrl ? (
              <Image src={logoUrl} alt={displayName} width={48} height={48} className="object-cover" />
            ) : (
              <span className="text-sm font-bold text-gray-800">{getInitials(displayName)}</span>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="pt-3">
        <h3 className="text-sm font-semibold text-gray-900 group-hover:text-rose-600 transition-colors">
          {displayName}
        </h3>
        {location && (
          <p className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
            <MapPin className="w-3 h-3" /> {location}
          </p>
        )}
        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
          <span>{artworkCount} works</span>
          <span className="text-gray-200">|</span>
          <span>{totalSales} sales</span>
          <span className="text-gray-200">|</span>
          <span>★ {ratingAvg.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}
