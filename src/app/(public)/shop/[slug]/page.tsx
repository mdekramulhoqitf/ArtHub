"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Star, MapPin, Globe, Link2, MessageCircle, Heart,
  Share2, BadgeCheck, Phone, Mail, ExternalLink, Palette, Camera, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArtCard } from "@/components/artwork/art-card";
import { getInitials, formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { getShopBySlug } from "@/lib/shops-data";

const ARTWORKS_BY_SHOP: Record<string, any[]> = {
  "dhaka-canvas": [
    { id: "dc1", slug: "padma-evening", title: "Padma Evening", imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600", price: 28000, status: "ACTIVE" as const, shopName: "Dhaka Canvas", shopSlug: "dhaka-canvas", isFeatured: true, widthCm: 60, heightCm: 80, medium: "Oil on canvas" },
    { id: "dc2", slug: "old-dhaka-alley", title: "Old Dhaka Alley", imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600", price: 22000, status: "ACTIVE" as const, shopName: "Dhaka Canvas", shopSlug: "dhaka-canvas", widthCm: 50, heightCm: 70, medium: "Oil on canvas" },
    { id: "dc3", slug: "sundarbans-dusk", title: "Sundarbans Dusk", imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600", price: 35000, status: "ACTIVE" as const, shopName: "Dhaka Canvas", shopSlug: "dhaka-canvas", widthCm: 80, heightCm: 100, medium: "Oil on canvas" },
    { id: "dc4", slug: "rickshaw-rain", title: "Rickshaw in the Rain", imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600", price: 18000, status: "SOLD" as const, shopName: "Dhaka Canvas", shopSlug: "dhaka-canvas", widthCm: 45, heightCm: 60, medium: "Oil on canvas" },
    { id: "dc5", slug: "morning-bazar", title: "Morning Bazar", imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600", price: 42000, status: "ACTIVE" as const, shopName: "Dhaka Canvas", shopSlug: "dhaka-canvas", widthCm: 90, heightCm: 120, medium: "Oil on canvas" },
    { id: "dc6", slug: "river-horizon", title: "River Horizon", imageUrl: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600", price: 25000, status: "ACTIVE" as const, shopName: "Dhaka Canvas", shopSlug: "dhaka-canvas", widthCm: 55, heightCm: 75, medium: "Mixed media" },
  ],
  "ruposhi-art": [
    { id: "ra1", slug: "haor-morning", title: "Haor Morning Mist", imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600", price: 14000, status: "ACTIVE" as const, shopName: "Ruposhi Art", shopSlug: "ruposhi-art", isFeatured: true, widthCm: 40, heightCm: 50, medium: "Watercolor" },
    { id: "ra2", slug: "mustard-fields", title: "Mustard Fields Jessore", imageUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=600", price: 11000, status: "ACTIVE" as const, shopName: "Ruposhi Art", shopSlug: "ruposhi-art", widthCm: 35, heightCm: 45, medium: "Watercolor" },
    { id: "ra3", slug: "village-pond", title: "Village Pond at Noon", imageUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=600", price: 9500, status: "ACTIVE" as const, shopName: "Ruposhi Art", shopSlug: "ruposhi-art", widthCm: 30, heightCm: 40, medium: "Watercolor" },
    { id: "ra4", slug: "boat-festival", title: "Boat Festival", imageUrl: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600", price: 16500, status: "SOLD" as const, shopName: "Ruposhi Art", shopSlug: "ruposhi-art", widthCm: 50, heightCm: 65, medium: "Watercolor" },
  ],
  "chittagong-art-house": [
    { id: "cah1", slug: "shipyard-giants", title: "Shipyard Giants", imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600", price: 32000, status: "ACTIVE" as const, shopName: "Chittagong Art House", shopSlug: "chittagong-art-house", isFeatured: true, widthCm: 70, heightCm: 90, medium: "Acrylic" },
    { id: "cah2", slug: "port-night", title: "Port at Night", imageUrl: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=600", price: 27000, status: "ACTIVE" as const, shopName: "Chittagong Art House", shopSlug: "chittagong-art-house", widthCm: 60, heightCm: 80, medium: "Acrylic" },
    { id: "cah3", slug: "hill-tracts-green", title: "Hill Tracts Green", imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600", price: 21000, status: "ACTIVE" as const, shopName: "Chittagong Art House", shopSlug: "chittagong-art-house", widthCm: 50, heightCm: 65, medium: "Acrylic" },
  ],
};

const DEFAULT_ARTWORKS = [
  { id: "def1", slug: "golden-light", title: "Golden Light", imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600", price: 15000, status: "ACTIVE" as const, shopName: "", shopSlug: "", widthCm: 50, heightCm: 65, medium: "Oil on canvas" },
  { id: "def2", slug: "river-song", title: "River Song", imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600", price: 12000, status: "ACTIVE" as const, shopName: "", shopSlug: "", widthCm: 40, heightCm: 55, medium: "Watercolor" },
  { id: "def3", slug: "quiet-village", title: "Quiet Village", imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600", price: 18000, status: "ACTIVE" as const, shopName: "", shopSlug: "", widthCm: 60, heightCm: 80, medium: "Acrylic" },
];

const REVIEWS_BY_SHOP: Record<string, any[]> = {
  "dhaka-canvas": [
    { name: "Tahmina Sultana", rating: 5, date: "এপ্রিল ২০২৫", comment: "অসাধারণ শিল্পকর্ম। ছবিটি দেখে মনে হচ্ছে পদ্মার পাড়ে দাঁড়িয়ে আছি। অত্যন্ত যত্নসহকারে প্যাক করা এবং সময়মতো পৌঁছে দেওয়া হয়েছে।" },
    { name: "Rakibul Hassan", rating: 5, date: "মার্চ ২০২৫", comment: "Rahim bhai's work is world-class. Bought my second painting and it's even more beautiful than the first. Highly recommended." },
    { name: "Dilruba Akter", rating: 4, date: "ফেব্রুয়ারি ২০২৫", comment: "Beautiful craftsmanship. Shipping was a little slow but the artwork was absolutely worth the wait. Will order again." },
  ],
  "default": [
    { name: "Karim Saheb", rating: 5, date: "এপ্রিল ২০২৫", comment: "অনেক সুন্দর কাজ। সময়মতো পৌঁছে দিয়েছে এবং প্যাকিং ছিল চমৎকার।" },
    { name: "Nasreen Begum", rating: 4, date: "মার্চ ২০২৫", comment: "Very professional artist. The painting looks even better in person than in the photos." },
  ],
};

const FILTER_TABS = ["All", "Available", "Sold"];

interface RealReview {
  id: string;
  rating: number;
  body: string | null;
  photos: string[];
  createdAt: string;
  buyer: { name: string | null; avatar: string | null };
  order: { items: { snapshotTitle: string }[] };
}

export default function ShopPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const shop = getShopBySlug(slug);

  const [activeTab, setActiveTab] = useState("All");
  const [followed, setFollowed] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followLoading, setFollowLoading] = useState(false);
  const [realReviews, setRealReviews] = useState<RealReview[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    // Load follow state
    fetch(`/api/follow?shopSlug=${slug}`)
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d) { setFollowed(d.following); setFollowerCount(d.followerCount ?? 0); } })
      .catch(() => {});

    // Load reviews
    fetch(`/api/reviews/shop/${slug}`)
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d?.reviews) setRealReviews(d.reviews); })
      .catch(() => {})
      .finally(() => setReviewsLoading(false));
  }, [slug]);

  async function handleFollow() {
    setFollowLoading(true);
    try {
      const method = followed ? "DELETE" : "POST";
      const res = await fetch("/api/follow", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shopSlug: slug }),
      });
      if (res.ok) {
        const d = await res.json();
        setFollowed(d.following);
        setFollowerCount(d.followerCount);
      } else if (res.status === 401) {
        window.location.href = `/login?callbackUrl=/shop/${slug}`;
      }
    } finally {
      setFollowLoading(false);
    }
  }

  if (!shop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-gray-900 mb-4">Shop Not Found</h1>
          <Link href="/shops" className="text-rose-600 hover:text-rose-700 underline">Browse all shops</Link>
        </div>
      </div>
    );
  }

  const artworks = (ARTWORKS_BY_SHOP[slug] ?? DEFAULT_ARTWORKS).map((a) => ({
    ...a,
    shopName: a.shopName || shop.displayName,
    shopSlug: a.shopSlug || slug,
  }));

  const reviews = REVIEWS_BY_SHOP[slug] ?? REVIEWS_BY_SHOP["default"];

  const filtered = artworks.filter((a) => {
    if (activeTab === "All") return true;
    if (activeTab === "Available") return a.status === "ACTIVE";
    if (activeTab === "Sold") return a.status === "SOLD";
    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <div className="relative h-72 md:h-96 bg-gray-100 overflow-hidden">
        <Image src={shop.bannerUrl} alt={shop.displayName} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute top-4 right-4 flex gap-2">
          {shop.isFeatured && (
            <span className="bg-rose-700/90 text-white text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 backdrop-blur">
              Featured
            </span>
          )}
          {shop.isApproved && (
            <span className="bg-white/90 text-black text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 flex items-center gap-1 backdrop-blur">
              <BadgeCheck className="w-3 h-3 text-emerald-600" /> Verified
            </span>
          )}
        </div>
        <button className="absolute top-4 left-4 bg-white/90 backdrop-blur text-gray-700 hover:text-black p-2 rounded">
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="container mx-auto px-4">
        {/* Profile */}
        <div className="relative -mt-16 pb-8 border-b border-gray-100">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-24 h-24 md:w-28 md:h-28 border-4 border-white shadow-xl bg-gray-100 overflow-hidden rounded shrink-0 -mt-2 md:mt-0">
              {shop.logoUrl ? (
                <Image src={shop.logoUrl} alt={shop.displayName} width={112} height={112} className="object-cover w-full h-full" />
              ) : (
                <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white text-2xl font-bold">
                  {getInitials(shop.displayName)}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 mt-4 md:mt-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="font-heading text-2xl md:text-3xl font-bold text-gray-900">{shop.displayName}</h1>
                    {shop.isApproved && <BadgeCheck className="w-5 h-5 text-emerald-500 shrink-0" />}
                  </div>
                  <p className="text-sm text-gray-500 italic mt-0.5">by {shop.ownerName}</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-rose-500" /> {shop.location}</span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <strong className="text-gray-900">{shop.ratingAvg}</strong>
                      <span className="text-gray-400">({shop.reviewCount} reviews)</span>
                    </span>
                    <span>Member since {shop.memberSince}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleFollow}
                    disabled={followLoading}
                    className={cn(
                      "flex items-center gap-1.5 text-sm px-4 py-2 border rounded transition-colors font-medium disabled:opacity-60",
                      followed ? "bg-rose-50 border-rose-200 text-rose-600" : "border-gray-200 text-gray-700 hover:border-black hover:text-black"
                    )}
                  >
                    <Heart className={cn("w-4 h-4", followed && "fill-rose-500 text-rose-500")} />
                    {followed ? `Following${followerCount > 0 ? ` · ${followerCount}` : ""}` : `Follow${followerCount > 0 ? ` · ${followerCount}` : ""}`}
                  </button>
                  <Button variant="outline" size="sm" className="gap-1.5 border-gray-200 hover:border-black rounded text-sm">
                    <MessageCircle className="w-4 h-4" /> Message
                  </Button>
                  <Link href={`/commission/request/${slug}`}>
                    <Button size="sm" className="gap-1.5 bg-rose-700 hover:bg-rose-800 text-white rounded text-sm border-0">
                      <Palette className="w-4 h-4" /> Request Custom Work
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="mt-4 max-w-2xl">
                <p className="text-sm text-gray-600 leading-relaxed">{shop.bio.split("\n")[0]}</p>
              </div>
              <p className="text-xs text-emerald-600 mt-2 font-medium">✓ {shop.responseTime}</p>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 border-b border-gray-100">
          {[
            { value: shop.artworkCount, label: "Artworks" },
            { value: shop.totalSales, label: "Sales" },
            { value: `${shop.ratingAvg} ★`, label: `${shop.reviewCount} Reviews` },
          ].map(({ value, label }) => (
            <div key={label} className="py-5 text-center border-r border-gray-100 last:border-r-0">
              <p className="text-xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Artworks */}
        <div className="py-10">
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-gray-100">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "shrink-0 px-5 py-2 text-sm font-medium border-b-2 transition-colors -mb-4",
                  activeTab === tab ? "border-rose-600 text-rose-700" : "border-transparent text-gray-500 hover:text-gray-900"
                )}
              >
                {tab}
                {tab === "All" && <span className="ml-1.5 text-xs text-gray-400">{artworks.length}</span>}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400 text-sm">No artworks in this category</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
              {filtered.map((art) => <ArtCard key={art.id} {...art} />)}
            </div>
          )}
        </div>

        {/* About + Contact + Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-20 border-t border-gray-100 pt-12">
          {/* About + Contact */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">About the Artist</h2>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{shop.bio}</p>
            </div>

            {/* Contact details */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-4">
              <h3 className="font-heading text-base font-bold text-gray-900">Contact & Details</h3>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">{shop.location}</p>
                    <p className="text-xs text-gray-400">{shop.district} District · {shop.division} Division</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-rose-500 shrink-0" />
                  <a href={`tel:${shop.phone}`} className="hover:text-rose-600 transition-colors">{shop.phone}</a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-rose-500 shrink-0" />
                  <a href={`mailto:${shop.email}`} className="hover:text-rose-600 transition-colors break-all">{shop.email}</a>
                </div>

                {shop.websiteUrl && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-rose-500 shrink-0" />
                    <a href={shop.websiteUrl} target="_blank" rel="noopener noreferrer" className="hover:text-rose-600 transition-colors underline underline-offset-2">
                      {shop.websiteUrl.replace("https://", "")}
                    </a>
                  </div>
                )}

                {shop.instagramUrl && (
                  <div className="flex items-center gap-3">
                    <ExternalLink className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>Instagram: {shop.instagramUrl}</span>
                  </div>
                )}

                {shop.facebookUrl && (
                  <div className="flex items-center gap-3">
                    <ExternalLink className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>Facebook: {shop.facebookUrl}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-gray-200">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <BadgeCheck className="w-4 h-4 text-emerald-500" />
                  <span>Verified Bangladeshi Artist</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Member since {shop.memberSince} · {shop.specialty}</p>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="lg:col-span-2">
            {/* Photo lightbox */}
            {selectedPhoto && (
              <div
                className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
                onClick={() => setSelectedPhoto(null)}
              >
                <img src={selectedPhoto} alt="Review photo" className="max-w-full max-h-[85vh] object-contain" />
              </div>
            )}

            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-bold text-gray-900">
                Reviews{" "}
                <span className="text-gray-400 font-normal text-base">
                  ({reviewsLoading ? "…" : realReviews.length || shop.reviewCount})
                </span>
              </h2>
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <strong>{shop.ratingAvg}</strong>
                <span className="text-gray-400">/ 5</span>
              </div>
            </div>

            {reviewsLoading ? (
              <div className="flex items-center gap-2 text-gray-400 py-8">
                <Loader2 className="w-4 h-4 animate-spin" /> Loading reviews…
              </div>
            ) : realReviews.length === 0 ? (
              /* Fall back to static reviews if no real ones yet */
              <div className="space-y-5">
                {reviews.map((r: any) => (
                  <div key={r.name} className="border border-gray-100 p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {r.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{r.name}</p>
                          <p className="text-xs text-gray-400">{r.date}</p>
                        </div>
                      </div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={cn("w-3.5 h-3.5", i < r.rating ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200")} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{r.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-5">
                {(showAllReviews ? realReviews : realReviews.slice(0, 5)).map((r) => {
                  const initials = (r.buyer.name ?? "A").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
                  const artworkTitle = r.order?.items?.[0]?.snapshotTitle;
                  return (
                    <div key={r.id} className="border border-gray-100 p-5 hover:border-gray-200 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          {r.buyer.avatar ? (
                            <div className="relative w-9 h-9 shrink-0 overflow-hidden rounded-full">
                              <Image src={r.buyer.avatar} alt={r.buyer.name ?? ""} fill className="object-cover" sizes="36px" />
                            </div>
                          ) : (
                            <div className="w-9 h-9 bg-[#1a1a2e] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                              {initials}
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{r.buyer.name ?? "Verified Buyer"}</p>
                            <p className="text-xs text-gray-400">
                              {new Date(r.createdAt).toLocaleDateString("en-BD", { day: "numeric", month: "long", year: "numeric" })}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={cn("w-3.5 h-3.5", i < r.rating ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200")} />
                          ))}
                        </div>
                      </div>

                      {artworkTitle && (
                        <p className="text-xs text-gray-400 mb-2 italic">Purchased: {artworkTitle}</p>
                      )}

                      {r.body && (
                        <p className="text-sm text-gray-600 leading-relaxed mb-3">{r.body}</p>
                      )}

                      {/* Review photos */}
                      {r.photos.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          <p className="w-full flex items-center gap-1 text-xs text-gray-400 mb-1">
                            <Camera className="w-3 h-3" /> Photos from buyer
                          </p>
                          {r.photos.map((photo, idx) => (
                            <button
                              key={idx}
                              onClick={() => setSelectedPhoto(photo)}
                              className="relative w-20 h-20 overflow-hidden border border-gray-100 hover:border-rose-300 transition-colors"
                            >
                              <Image src={photo} alt={`Review photo ${idx + 1}`} fill className="object-cover hover:scale-105 transition-transform" sizes="80px" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                {realReviews.length > 5 && (
                  <button
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    className="text-sm text-gray-500 hover:text-black underline underline-offset-2 transition-colors"
                  >
                    {showAllReviews ? "Show fewer reviews" : `Show all ${realReviews.length} reviews →`}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
