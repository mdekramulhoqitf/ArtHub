"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star, Loader2, AlertCircle, Camera, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  rating: number;
  body: string | null;
  photos: string[];
  createdAt: string;
  isApproved: boolean;
  buyer: { name: string | null; avatar: string | null; email: string };
  order: { items: { snapshotTitle: string }[] };
}

export default function SellerReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avgRating, setAvgRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [filter, setFilter] = useState<number | "ALL">("ALL");

  useEffect(() => {
    fetch("/api/seller/reviews")
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((d) => { setReviews(d.reviews); setAvgRating(d.avgRating); })
      .catch(() => setError("Could not load reviews."))
      .finally(() => setLoading(false));
  }, []);

  const visible = filter === "ALL" ? reviews : reviews.filter((r) => r.rating === filter);
  const ratingDist = [5, 4, 3, 2, 1].map((s) => ({
    star: s,
    count: reviews.filter((r) => r.rating === s).length,
  }));

  if (loading) return (
    <div className="flex items-center justify-center py-24 gap-3 text-gray-400">
      <Loader2 className="w-5 h-5 animate-spin" /> Loading reviews…
    </div>
  );
  if (error) return (
    <div className="flex items-center justify-center py-16 gap-2 text-red-500 text-sm">
      <AlertCircle className="w-4 h-4" /> {error}
    </div>
  );

  return (
    <>
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedPhoto(null)}
        >
          <img src={selectedPhoto} alt="Review photo" className="max-w-full max-h-[85vh] object-contain" />
        </div>
      )}

      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-gray-900">Reviews</h1>
          <p className="text-gray-500 text-sm mt-0.5">Buyer feedback on your shop</p>
        </div>

        {/* Summary */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col sm:flex-row gap-6">
          <div className="text-center sm:pr-6 sm:border-r border-gray-100">
            <p className="text-5xl font-bold text-gray-900">{avgRating.toFixed(1)}</p>
            <div className="flex justify-center gap-0.5 my-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={cn("w-4 h-4", i < Math.round(avgRating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200")} />
              ))}
            </div>
            <p className="text-xs text-gray-400">{reviews.length} reviews</p>
          </div>

          <div className="flex-1 space-y-2">
            {ratingDist.map(({ star, count }) => (
              <button
                key={star}
                onClick={() => setFilter(filter === star ? "ALL" : star)}
                className={cn(
                  "w-full flex items-center gap-3 text-xs hover:opacity-80 transition-opacity",
                  filter === star && "font-semibold"
                )}
              >
                <span className="w-6 text-right text-gray-500">{star}</span>
                <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
                <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all"
                    style={{ width: reviews.length ? `${(count / reviews.length) * 100}%` : "0%" }}
                  />
                </div>
                <span className="w-6 text-gray-400">{count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filter label */}
        {filter !== "ALL" && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Showing {filter}-star reviews</span>
            <button onClick={() => setFilter("ALL")} className="text-xs text-rose-500 hover:underline">Clear filter</button>
          </div>
        )}

        {/* Review list */}
        {visible.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl py-16 text-center">
            <MessageSquare className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 text-sm">No reviews yet</p>
            <p className="text-gray-300 text-xs mt-1">Reviews appear after buyers receive their orders</p>
          </div>
        ) : (
          <div className="space-y-4">
            {visible.map((review) => {
              const initials = (review.buyer.name ?? "A").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
              const artworkTitle = review.order?.items?.[0]?.snapshotTitle;

              return (
                <div key={review.id} className="bg-white border border-gray-100 rounded-2xl p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      {review.buyer.avatar ? (
                        <div className="relative w-9 h-9 shrink-0 overflow-hidden rounded-full">
                          <Image src={review.buyer.avatar} alt="" fill className="object-cover" sizes="36px" />
                        </div>
                      ) : (
                        <div className="w-9 h-9 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                          {initials}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{review.buyer.name ?? "Verified Buyer"}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(review.createdAt).toLocaleDateString("en-BD", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={cn("w-4 h-4", i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200")} />
                      ))}
                    </div>
                  </div>

                  {artworkTitle && (
                    <p className="text-xs text-gray-400 mb-2 italic bg-gray-50 inline-block px-2 py-0.5 rounded">
                      Artwork: {artworkTitle}
                    </p>
                  )}

                  {review.body && (
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{review.body}</p>
                  )}

                  {review.photos.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mb-2">
                        <Camera className="w-3 h-3" /> Buyer photos ({review.photos.length})
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {review.photos.map((photo, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedPhoto(photo)}
                            className="relative w-20 h-20 overflow-hidden border border-gray-100 hover:border-rose-300 transition-colors rounded"
                          >
                            <Image src={photo} alt="" fill className="object-cover hover:scale-105 transition-transform" sizes="80px" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
