"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Loader2, Heart, Rss, Users, ArrowRight, Clock, Tag, ShoppingBag,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface FeedArtwork {
  id: string;
  title: string;
  slug: string;
  price: number;
  createdAt: string;
  shop: { displayName: string; slug: string; logoUrl: string | null };
  images: { url: string }[];
  categories: { category: { name: string } }[];
  _count: { wishlist: number };
}

interface FollowedShop {
  displayName: string;
  slug: string;
  logoUrl: string | null;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  if (days > 0) return `${days}d ago`;
  if (hrs > 0) return `${hrs}h ago`;
  if (mins > 0) return `${mins}m ago`;
  return "Just now";
}

export default function BuyerFeedPage() {
  const [artworks, setArtworks] = useState<FeedArtwork[]>([]);
  const [followedShops, setFollowedShops] = useState<FollowedShop[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [error, setError] = useState("");

  const loadFeed = useCallback(async (cursor?: string) => {
    const url = cursor ? `/api/feed?cursor=${encodeURIComponent(cursor)}` : "/api/feed";
    const res = await fetch(url);
    if (!res.ok) throw new Error();
    return res.json();
  }, []);

  useEffect(() => {
    loadFeed()
      .then((d) => {
        setArtworks(d.artworks);
        setFollowedShops(d.followedShops);
        setNextCursor(d.nextCursor);
      })
      .catch(() => setError("Could not load feed."))
      .finally(() => setLoading(false));
  }, [loadFeed]);

  async function loadMore() {
    if (!nextCursor || loadingMore) return;
    setLoadingMore(true);
    try {
      const d = await loadFeed(nextCursor);
      setArtworks((prev) => [...prev, ...d.artworks]);
      setNextCursor(d.nextCursor);
    } catch {
      setError("Failed to load more.");
    } finally {
      setLoadingMore(false);
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-24 gap-3 text-gray-400">
      <Loader2 className="w-5 h-5 animate-spin" /> Loading your feed…
    </div>
  );

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Rss className="w-5 h-5 text-rose-500" />
            <h1 className="font-heading text-2xl font-bold text-gray-900">Your Feed</h1>
          </div>
          <p className="text-gray-500 text-sm">New artworks from artists you follow</p>
        </div>
        <Link
          href="/shops"
          className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-medium border border-rose-200 px-3 py-2 hover:bg-rose-50 transition-colors"
        >
          <Users className="w-3.5 h-3.5" /> Discover Artists
        </Link>
      </div>

      {/* Following chips */}
      {followedShops.length > 0 && (
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Following ({followedShops.length})</p>
          <div className="flex flex-wrap gap-2">
            {followedShops.map((shop) => (
              <Link
                key={shop.slug}
                href={`/shop/${shop.slug}`}
                className="flex items-center gap-2 bg-white border border-gray-100 hover:border-rose-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-rose-700 transition-colors"
              >
                {shop.logoUrl ? (
                  <div className="relative w-4 h-4 overflow-hidden rounded-full shrink-0">
                    <Image src={shop.logoUrl} alt="" fill className="object-cover" sizes="16px" />
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                    <span className="text-rose-600 text-[9px] font-bold">{shop.displayName[0]}</span>
                  </div>
                )}
                {shop.displayName}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Empty state — not following anyone */}
      {followedShops.length === 0 && (
        <div className="bg-white border border-gray-100 py-20 text-center">
          <Heart className="w-14 h-14 text-gray-200 mx-auto mb-5" />
          <h2 className="font-heading text-xl font-semibold text-gray-700 mb-2">Your feed is empty</h2>
          <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto leading-relaxed">
            Follow artists to see their new artworks here as soon as they publish.
          </p>
          <Link
            href="/shops"
            className="inline-flex items-center gap-2 bg-[#1a1a2e] hover:bg-rose-700 text-white px-8 py-3 text-sm font-semibold transition-colors"
          >
            Browse Artists <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Feed artworks */}
      {artworks.length === 0 && followedShops.length > 0 && (
        <div className="bg-white border border-gray-100 py-16 text-center">
          <Rss className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400 text-sm">No new artworks from the artists you follow yet.</p>
          <p className="text-gray-300 text-xs mt-1">Check back when they publish new work.</p>
        </div>
      )}

      {artworks.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworks.map((artwork) => {
              const imgUrl = artwork.images[0]?.url;
              const category = artwork.categories[0]?.category?.name;

              return (
                <div key={artwork.id} className="bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all group overflow-hidden">
                  {/* Artist header */}
                  <Link href={`/shop/${artwork.shop.slug}`} className="flex items-center gap-2.5 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    {artwork.shop.logoUrl ? (
                      <div className="relative w-7 h-7 overflow-hidden rounded-full shrink-0">
                        <Image src={artwork.shop.logoUrl} alt="" fill className="object-cover" sizes="28px" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 bg-[#1a1a2e] rounded-full flex items-center justify-center shrink-0">
                        <span className="text-white text-[10px] font-bold">{artwork.shop.displayName[0]}</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 truncate">{artwork.shop.displayName}</p>
                      <p className="text-[10px] text-gray-400 flex items-center gap-0.5">
                        <Clock className="w-2.5 h-2.5" /> {timeAgo(artwork.createdAt)}
                      </p>
                    </div>
                    <span className="text-[10px] text-rose-500 font-semibold bg-rose-50 px-1.5 py-0.5 shrink-0">NEW</span>
                  </Link>

                  {/* Image */}
                  <Link href={`/artwork/${artwork.slug}`}>
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      {imgUrl ? (
                        <Image
                          src={imgUrl}
                          alt={artwork.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <ShoppingBag className="w-10 h-10" />
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="p-4">
                    <Link href={`/artwork/${artwork.slug}`}>
                      <h3 className="font-semibold text-gray-900 text-sm group-hover:text-rose-700 transition-colors leading-snug mb-1">
                        {artwork.title}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between">
                      <p className="font-bold text-rose-600">{formatPrice(artwork.price)}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        {category && (
                          <span className="flex items-center gap-0.5">
                            <Tag className="w-3 h-3" /> {category}
                          </span>
                        )}
                        {artwork._count.wishlist > 0 && (
                          <span className="flex items-center gap-0.5">
                            <Heart className="w-3 h-3 text-rose-400" /> {artwork._count.wishlist}
                          </span>
                        )}
                      </div>
                    </div>

                    <Link
                      href={`/artwork/${artwork.slug}`}
                      className="mt-3 w-full flex items-center justify-center gap-1.5 bg-[#1a1a2e] hover:bg-rose-700 text-white text-xs font-semibold py-2.5 transition-colors"
                    >
                      View Artwork <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load more */}
          {nextCursor && (
            <div className="text-center pt-4">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 hover:border-[#1a1a2e] hover:text-[#1a1a2e] px-8 py-3 text-sm font-medium transition-colors disabled:opacity-50"
              >
                {loadingMore ? <><Loader2 className="w-4 h-4 animate-spin" /> Loading…</> : "Load More"}
              </button>
            </div>
          )}

          {error && <p className="text-center text-red-500 text-sm">{error}</p>}
        </>
      )}
    </div>
  );
}
