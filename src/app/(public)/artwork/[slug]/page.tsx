"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Heart, Share2, ShoppingCart, Star, MapPin, Shield, Truck,
  RotateCcw, Loader2, CheckCircle, MessageCircle, Tag,
  ArrowLeft, Award,
} from "lucide-react";
import { ArtworkGallery } from "@/components/artwork/artwork-gallery";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatPrice, cn } from "@/lib/utils";

const RECENTLY_VIEWED_KEY = "arthub_recently_viewed";
const MAX_RECENTLY_VIEWED = 6;

interface RecentItem {
  slug: string;
  title: string;
  price: number;
  image: string;
  shop: string;
}

function useRecentlyViewed(currentSlug: string, artwork: Artwork | null) {
  const [items, setItems] = useState<RecentItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
      const existing: RecentItem[] = raw ? JSON.parse(raw) : [];
      setItems(existing.filter((i) => i.slug !== currentSlug));
    } catch {}
  }, [currentSlug]);

  useEffect(() => {
    if (!artwork) return;
    try {
      const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
      const existing: RecentItem[] = raw ? JSON.parse(raw) : [];
      const next: RecentItem = {
        slug: artwork.slug,
        title: artwork.title,
        price: artwork.price,
        image: artwork.images.find((i) => i.isPrimary)?.url ?? artwork.images[0]?.url ?? "",
        shop: artwork.shop.displayName,
      };
      const filtered = existing.filter((i) => i.slug !== artwork.slug);
      const updated = [next, ...filtered].slice(0, MAX_RECENTLY_VIEWED);
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
      setItems(updated.filter((i) => i.slug !== currentSlug));
    } catch {}
  }, [artwork, currentSlug]);

  return items;
}

interface Review {
  id: string;
  rating: number;
  body: string | null;
  photos: string[];
  createdAt: string;
  buyer: { name: string | null };
}

interface Artwork {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  price: number;
  currency: string;
  status: string;
  editionType: string;
  widthCm: number | null;
  heightCm: number | null;
  yearCreated: number | null;
  tags: string[];
  viewCount: number;
  inWishlist: boolean;
  images: { url: string; isPrimary: boolean }[];
  mediums: { medium: { name: string } }[];
  categories: { category: { name: string } }[];
  shop: { id: string; slug: string; displayName: string; logoUrl: string | null; location: string | null; ratingAvg: number; totalSales: number };
  _count: { wishlist: number };
  related: { id: string; slug: string; title: string; price: number; images: { url: string }[]; shop?: { displayName: string } }[];
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={cn("w-4 h-4", s <= rating ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200")} />
      ))}
    </div>
  );
}

export default function ArtworkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();

  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const recentlyViewed = useRecentlyViewed(slug, artwork);

  useEffect(() => {
    fetch(`/api/artwork/${slug}`)
      .then((r) => {
        if (!r.ok) { setNotFound(true); return null; }
        return r.json();
      })
      .then((data) => {
        if (!data) return;
        setArtwork(data);
        setWishlist(data.inWishlist);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (!artwork) return;
    fetch(`/api/reviews/shop/${artwork.shop.slug}`)
      .then((r) => r.json())
      .then((d) => setReviews(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, [artwork]);

  async function toggleWishlist() {
    if (!artwork) return;
    setWishlistLoading(true);
    const method = wishlist ? "DELETE" : "POST";
    const res = await fetch("/api/wishlist", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ artworkId: artwork.id }),
    });
    if (res.status === 401) {
      router.push("/login");
      return;
    }
    setWishlist(!wishlist);
    setWishlistLoading(false);
  }

  function share() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh] gap-2 text-gray-400">
      <Loader2 className="w-5 h-5 animate-spin" /> Loading artwork…
    </div>
  );

  if (notFound || !artwork) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <p className="text-gray-500">Artwork not found.</p>
      <Link href="/browse" className="text-rose-600 hover:underline text-sm">Browse all artworks</Link>
    </div>
  );

  const mainImage = artwork.images.find((i) => i.isPrimary)?.url ?? artwork.images[0]?.url ?? "";
  const allImages = artwork.images.map((i) => i.url);
  const medium = artwork.mediums[0]?.medium?.name;

  const avgRating = reviews.length
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : artwork.shop.ratingAvg;

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-10">
        {/* Back */}
        <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-rose-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <ArtworkGallery mainImage={mainImage} images={allImages} title={artwork.title} />

          {/* Info */}
          <div className="lg:sticky lg:top-24 space-y-6 self-start">
            {/* Shop */}
            <Link href={`/shop/${artwork.shop.slug}`} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-rose-100 flex items-center justify-center text-rose-700 font-bold text-sm shrink-0">
                {artwork.shop.logoUrl ? (
                  <Image src={artwork.shop.logoUrl} alt="" width={40} height={40} className="object-cover" />
                ) : (
                  artwork.shop.displayName[0]
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900 group-hover:text-rose-600 transition-colors text-sm">
                  {artwork.shop.displayName}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  {artwork.shop.location && <><MapPin className="w-3 h-3" /> {artwork.shop.location}</>}
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400 ml-1" />
                  {avgRating.toFixed(1)} · {artwork.shop.totalSales} sales
                </div>
              </div>
            </Link>

            <Separator />

            {/* Title + actions */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <h1 className="font-heading text-3xl font-bold text-gray-900">{artwork.title}</h1>
                <div className="flex gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleWishlist}
                    disabled={wishlistLoading}
                    title={wishlist ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    {wishlistLoading
                      ? <Loader2 className="w-4 h-4 animate-spin" />
                      : <Heart className={cn("w-5 h-5 transition-colors", wishlist ? "fill-rose-500 text-rose-500" : "text-gray-400")} />
                    }
                  </Button>
                  <Button variant="ghost" size="icon" onClick={share} title="Copy link">
                    {copied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Share2 className="w-5 h-5 text-gray-400" />}
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge className="bg-rose-50 text-rose-700 border-rose-200">{artwork.editionType}</Badge>
                {medium && <Badge variant="outline">{medium}</Badge>}
                {artwork.yearCreated && <Badge variant="outline">{artwork.yearCreated}</Badge>}
                {artwork.categories.map((c) => (
                  <Badge key={c.category.name} variant="outline" className="text-gray-500">{c.category.name}</Badge>
                ))}
              </div>
            </div>

            {/* Price + CTA */}
            <div className="bg-gray-50 rounded-2xl p-5">
              <p className="font-heading text-4xl font-bold text-gray-900">{formatPrice(artwork.price)}</p>
              <p className="text-sm text-gray-500 mt-1">Free shipping on orders over ৳15,000 · Secure payment</p>
              <Button className="w-full mt-4 h-12 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl text-base">
                <ShoppingCart className="w-5 h-5 mr-2" /> Buy Now
              </Button>
              <Button
                variant="outline"
                className={cn("w-full mt-2 h-12 border-gray-200 transition-colors", wishlist && "border-rose-200 bg-rose-50 text-rose-700")}
                onClick={toggleWishlist}
                disabled={wishlistLoading}
              >
                <Heart className={cn("w-5 h-5 mr-2", wishlist ? "fill-rose-500 text-rose-500" : "")} />
                {wishlist ? "Saved to Wishlist" : "Add to Wishlist"}
              </Button>
              <Link href={`/shop/${artwork.shop.slug}`}>
                <Button variant="ghost" className="w-full mt-1 h-11 text-sm text-gray-500">
                  <MessageCircle className="w-4 h-4 mr-2" /> Message the Artist
                </Button>
              </Link>
            </div>

            {/* Details */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Artwork Details</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {([
                  artwork.widthCm && artwork.heightCm ? ["Size", `${artwork.widthCm} × ${artwork.heightCm} cm`] : null,
                  medium ? ["Medium", medium] : null,
                  artwork.yearCreated ? ["Year", String(artwork.yearCreated)] : null,
                  ["Edition", artwork.editionType.charAt(0) + artwork.editionType.slice(1).toLowerCase()],
                  artwork._count.wishlist > 0 ? ["Saved by", `${artwork._count.wishlist} collectors`] : null,
                  artwork.viewCount > 0 ? ["Views", String(artwork.viewCount)] : null,
                ] as [string, string][]).filter(Boolean).map(([label, value]) => (
                  <div key={String(label)} className="bg-gray-50 rounded-xl p-3">
                    <p className="text-gray-400 text-xs">{label}</p>
                    <p className="font-medium text-gray-900 mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            {artwork.description && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">About This Work</h3>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{artwork.description}</p>
              </div>
            )}

            {/* Tags */}
            {(artwork.tags ?? []).length > 0 && (
              <div className="flex flex-wrap gap-2">
                {(artwork.tags ?? []).map((tag) => (
                  <Link key={tag} href={`/browse?tag=${encodeURIComponent(tag)}`}>
                    <Badge variant="outline" className="hover:bg-rose-50 hover:border-rose-300 cursor-pointer flex items-center gap-1">
                      <Tag className="w-2.5 h-2.5" /> {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}

            {/* Certificate badge */}
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-amber-800">
              <Award className="w-4 h-4 text-amber-500 shrink-0" />
              Certificate of Authenticity included with every purchase
            </div>

            {/* Guarantees */}
            <div className="border border-gray-100 rounded-2xl p-4 space-y-3">
              {[
                [Shield, "Secure checkout", "Payments protected by Stripe"],
                [Truck, "Safe shipping", "Artist ships with professional packaging"],
                [RotateCcw, "Return policy", "Contact seller within 7 days if damaged"],
              ].map(([Icon, title, desc]) => (
                <div key={String(title)} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-rose-50 rounded-lg flex items-center justify-center shrink-0">
                    {/* @ts-ignore */}
                    <Icon className="w-4 h-4 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{String(title)}</p>
                    <p className="text-xs text-gray-500">{String(desc)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews section */}
        {reviews.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl font-bold text-gray-900">
                Reviews for {artwork.shop.displayName}
              </h2>
              <div className="flex items-center gap-2">
                <StarRow rating={Math.round(avgRating)} />
                <span className="font-bold text-gray-900">{avgRating.toFixed(1)}</span>
                <span className="text-gray-400 text-sm">({reviews.length})</span>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {reviews.slice(0, 6).map((review) => (
                <div key={review.id} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#1a1a2e] text-white text-xs font-bold flex items-center justify-center">
                        {(review.buyer.name ?? "A")[0].toUpperCase()}
                      </div>
                      <p className="text-sm font-medium text-gray-900">{review.buyer.name ?? "Anonymous"}</p>
                    </div>
                    <StarRow rating={review.rating} />
                  </div>
                  {review.body && <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{review.body}</p>}
                  {review.photos.length > 0 && (
                    <div className="flex gap-2 mt-3">
                      {review.photos.slice(0, 3).map((photo, i) => (
                        <div key={i} className="relative w-14 h-14 rounded-lg overflow-hidden">
                          <Image src={photo} alt="" fill className="object-cover" sizes="56px" />
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(review.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related artworks */}
        {artwork.related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-8">More from {artwork.shop.displayName}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {artwork.related.map((rel) => {
                const img = rel.images[0]?.url;
                return (
                  <Link key={rel.id} href={`/artwork/${rel.slug}`} className="group block bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative aspect-square bg-gray-100 overflow-hidden">
                      {img && (
                        <Image
                          src={img}
                          alt={rel.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 50vw, 25vw"
                        />
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1 group-hover:text-rose-700 transition-colors">{rel.title}</p>
                      <p className="text-sm font-bold text-rose-600 mt-0.5">{formatPrice(rel.price)}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <div className="mt-16 pt-10 border-t border-gray-100">
            <h2 className="font-heading text-xl font-bold text-gray-900 mb-6">Recently Viewed</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {recentlyViewed.map((item) => (
                <Link key={item.slug} href={`/artwork/${item.slug}`} className="group block">
                  <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden mb-2">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, 16vw"
                      />
                    )}
                  </div>
                  <p className="text-xs font-medium text-gray-900 line-clamp-1 group-hover:text-rose-700 transition-colors">{item.title}</p>
                  <p className="text-xs text-gray-400">{item.shop}</p>
                  <p className="text-xs font-bold text-rose-600 mt-0.5">{formatPrice(item.price)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
