"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Loader2, Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface WishlistItem {
  id: string;
  artworkId: string;
  createdAt: string;
  artwork: {
    id: string;
    title: string;
    slug: string;
    price: number;
    status: string;
    images: { url: string }[];
    shop: { displayName: string; slug: string };
  };
}

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/wishlist")
      .then((r) => r.json())
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  async function remove(artworkId: string) {
    setRemoving(artworkId);
    await fetch("/api/wishlist", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ artworkId }),
    });
    setItems((prev) => prev.filter((i) => i.artworkId !== artworkId));
    setRemoving(null);
  }

  if (loading) return (
    <div className="flex items-center justify-center py-24 gap-2 text-gray-400">
      <Loader2 className="w-5 h-5 animate-spin" /> Loading wishlist…
    </div>
  );

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" /> My Wishlist
          </h1>
          <p className="text-gray-500 text-sm mt-1">{items.length} saved artwork{items.length !== 1 ? "s" : ""}</p>
        </div>
        <Link href="/browse" className="text-sm text-rose-600 hover:underline flex items-center gap-1">
          Browse more <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 py-24 text-center">
          <Heart className="w-14 h-14 text-gray-200 mx-auto mb-5" />
          <h2 className="font-heading text-xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto">Save artworks you love — click the heart on any artwork to add it here.</p>
          <Link href="/browse" className="inline-flex items-center gap-2 bg-[#1a1a2e] hover:bg-rose-700 text-white px-8 py-3 text-sm font-semibold transition-colors rounded-xl">
            Discover Art <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const art = item.artwork;
            const imgUrl = art.images[0]?.url;
            const sold = art.status === "SOLD";

            return (
              <div key={item.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  {imgUrl ? (
                    <Image
                      src={imgUrl}
                      alt={art.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <ShoppingBag className="w-10 h-10" />
                    </div>
                  )}
                  {sold && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-white text-gray-900 text-xs font-bold px-3 py-1 rounded-full">SOLD</span>
                    </div>
                  )}
                  <button
                    onClick={() => remove(art.id)}
                    disabled={removing === art.id}
                    className="absolute top-2 right-2 w-8 h-8 bg-white/90 hover:bg-red-50 rounded-full flex items-center justify-center shadow-sm transition-colors"
                  >
                    {removing === art.id
                      ? <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-400" />
                      : <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                    }
                  </button>
                </div>

                <div className="p-4">
                  <Link href={`/shop/${art.shop.slug}`} className="text-xs text-gray-400 hover:text-rose-600 transition-colors">
                    {art.shop.displayName}
                  </Link>
                  <Link href={`/artwork/${art.slug}`}>
                    <h3 className="font-semibold text-gray-900 text-sm mt-0.5 mb-3 group-hover:text-rose-700 transition-colors leading-snug line-clamp-2">
                      {art.title}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-rose-600">{formatPrice(art.price)}</p>
                    {!sold && (
                      <Link
                        href={`/artwork/${art.slug}`}
                        className="flex items-center gap-1 text-xs bg-[#1a1a2e] hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Buy <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
