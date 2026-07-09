"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Loader2, AlertCircle, Star, Package, CheckCircle,
  Truck, Clock, X, Camera, Send, ChevronDown, ChevronUp,
} from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";

interface OrderItem {
  id: string;
  quantity: number;
  unitPrice: number;
  snapshotTitle: string;
  artwork: { title: string; images: { url: string }[] };
}

interface Order {
  id: string;
  status: string;
  subtotal: number;
  createdAt: string;
  trackingNumber: string | null;
  shop: { displayName: string; slug: string; logoUrl: string | null };
  items: OrderItem[];
  review: { id: string; rating: number } | null;
  shippingAddress: {
    fullName: string; line1: string; city: string; country: string;
  } | null;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  PENDING:   { label: "Pending",   color: "bg-amber-50 text-amber-700 border-amber-200",   icon: Clock },
  PAID:      { label: "Paid",      color: "bg-blue-50 text-blue-700 border-blue-200",       icon: CheckCircle },
  SHIPPED:   { label: "Shipped",   color: "bg-purple-50 text-purple-700 border-purple-200", icon: Truck },
  DELIVERED: { label: "Delivered", color: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle },
  CANCELLED: { label: "Cancelled", color: "bg-gray-50 text-gray-400 border-gray-100",       icon: X },
  REFUNDED:  { label: "Refunded",  color: "bg-gray-50 text-gray-400 border-gray-100",       icon: X },
};

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onMouseEnter={() => setHovered(s)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(s)}
          className="p-0.5"
        >
          <Star
            className={cn(
              "w-8 h-8 transition-colors",
              (hovered || value) >= s ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"
            )}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewModal({
  order,
  onClose,
  onSubmitted,
}: {
  order: Order;
  onClose: () => void;
  onSubmitted: (orderId: string, rating: number) => void;
}) {
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState("");
  const [photos, setPhotos] = useState(["", "", ""]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function setPhoto(idx: number, val: string) {
    setPhotos((p) => { const n = [...p]; n[idx] = val; return n; });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rating) { setError("Please select a star rating."); return; }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.id,
          rating,
          reviewBody: body,
          photos: photos.filter((p) => p.trim()),
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        setError(d.error ?? "Failed to submit review.");
        return;
      }
      onSubmitted(order.id, rating);
      onClose();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const artwork = order.items[0]?.artwork;
  const imgUrl = artwork?.images?.[0]?.url;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-[#1a1a2e] px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-heading text-lg font-bold text-white">Write a Review</h2>
            <p className="text-white/40 text-xs">{order.shop.displayName}</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Artwork preview */}
          {imgUrl && (
            <div className="flex items-center gap-3 bg-gray-50 p-3">
              <div className="relative w-14 h-14 shrink-0 overflow-hidden">
                <Image src={imgUrl} alt={artwork.title} fill className="object-cover" sizes="56px" />
              </div>
              <div>
                <p className="text-xs text-gray-400">You're reviewing</p>
                <p className="text-sm font-semibold text-gray-800">{order.items[0].snapshotTitle}</p>
              </div>
            </div>
          )}

          {/* Star rating */}
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">
              Overall Rating <span className="text-rose-500">*</span>
            </p>
            <StarPicker value={rating} onChange={setRating} />
            {rating > 0 && (
              <p className="text-xs text-amber-600 mt-1">
                {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
              </p>
            )}
          </div>

          {/* Review text */}
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">Your Review</p>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              placeholder="Share your experience — quality of artwork, packaging, delivery, communication with the artist..."
              className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#1a1a2e] transition-colors resize-none"
              maxLength={1000}
            />
            <p className="text-xs text-gray-300 text-right mt-0.5">{body.length}/1000</p>
          </div>

          {/* Photos */}
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-1 font-medium flex items-center gap-1">
              <Camera className="w-3.5 h-3.5" /> Artwork Photos (Optional)
            </p>
            <p className="text-xs text-gray-300 mb-2">Paste image URLs showing the artwork in your home/space.</p>
            <div className="space-y-2">
              {photos.map((url, idx) => (
                <input
                  key={idx}
                  type="url"
                  value={url}
                  onChange={(e) => setPhoto(idx, e.target.value)}
                  placeholder={`Photo ${idx + 1} URL`}
                  className="w-full border border-gray-200 px-3 py-2 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#1a1a2e] transition-colors"
                />
              ))}
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || !rating}
            className="w-full bg-[#1a1a2e] hover:bg-rose-700 text-white py-3.5 text-sm font-semibold tracking-wide transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</> : <><Send className="w-4 h-4" /> Submit Review</>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function BuyerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [reviewingOrder, setReviewingOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetch("/api/buyer/orders")
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then(setOrders)
      .catch(() => setError("Could not load orders."))
      .finally(() => setLoading(false));
  }, []);

  function onReviewSubmitted(orderId: string, rating: number) {
    setOrders((prev) =>
      prev.map((o) => o.id === orderId ? { ...o, review: { id: "done", rating } } : o)
    );
  }

  const STATUS_TABS = ["ALL", "PENDING", "PAID", "SHIPPED", "DELIVERED"];
  const visible = filter === "ALL" ? orders : orders.filter((o) => o.status === filter);

  if (loading) return (
    <div className="flex items-center justify-center py-24 gap-3 text-gray-400">
      <Loader2 className="w-5 h-5 animate-spin" /> Loading orders…
    </div>
  );
  if (error) return (
    <div className="flex items-center justify-center py-16 text-red-500 text-sm gap-2">
      <AlertCircle className="w-4 h-4" /> {error}
    </div>
  );

  return (
    <>
      {reviewingOrder && (
        <ReviewModal
          order={reviewingOrder}
          onClose={() => setReviewingOrder(null)}
          onSubmitted={onReviewSubmitted}
        />
      )}

      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-500 text-sm mt-0.5">Track and review your purchases</p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2">
          {STATUS_TABS.map((tab) => {
            const count = tab === "ALL" ? orders.length : orders.filter((o) => o.status === tab).length;
            return (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 text-xs font-medium transition-all ${
                  filter === tab
                    ? "bg-[#1a1a2e] text-white"
                    : "bg-white text-gray-500 border border-gray-200 hover:border-gray-400"
                }`}
              >
                {tab === "ALL" ? "All" : STATUS_CONFIG[tab]?.label ?? tab}
                <span className="ml-1 opacity-60">({count})</span>
              </button>
            );
          })}
        </div>

        {visible.length === 0 ? (
          <div className="bg-white border border-gray-100 py-16 text-center">
            <Package className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 text-sm mb-4">No orders found</p>
            <Link href="/browse" className="text-rose-600 text-sm font-medium hover:underline">
              Browse artworks →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {visible.map((order) => {
              const cfg = STATUS_CONFIG[order.status] ?? STATUS_CONFIG["PENDING"];
              const Icon = cfg.icon;
              const isExpanded = expandedId === order.id;
              const canReview = order.status === "DELIVERED" && !order.review;
              const reviewed = !!order.review;
              const primaryImage = order.items[0]?.artwork?.images?.[0]?.url;

              return (
                <div key={order.id} className="bg-white border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors">
                  {/* Order header */}
                  <div
                    className="flex items-center gap-4 p-5 cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : order.id)}
                  >
                    {/* Artwork thumbnail */}
                    {primaryImage && (
                      <div className="relative w-14 h-14 shrink-0 overflow-hidden bg-gray-100">
                        <Image src={primaryImage} alt="" fill className="object-cover" sizes="56px" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <p className="font-mono text-xs text-gray-400">{order.id.slice(-8).toUpperCase()}</p>
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 border font-medium ${cfg.color}`}>
                          <Icon className="w-3 h-3" /> {cfg.label}
                        </span>
                        {reviewed && (
                          <span className="inline-flex items-center gap-1 text-xs text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {order.review!.rating}/5 Reviewed
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {order.items.map((i) => i.snapshotTitle).join(", ")}
                      </p>
                      <p className="text-xs text-gray-400">
                        {order.shop.displayName} · {new Date(order.createdAt).toLocaleDateString("en-BD", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="font-bold text-gray-900">{formatPrice(order.subtotal)}</p>
                      <p className="text-gray-300 mt-1">
                        {isExpanded ? <ChevronUp className="w-4 h-4 inline" /> : <ChevronDown className="w-4 h-4 inline" />}
                      </p>
                    </div>
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="border-t border-gray-50 px-5 pb-5 pt-4 space-y-4">
                      {/* Items */}
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">{item.snapshotTitle} × {item.quantity}</span>
                            <span className="font-medium text-gray-900">{formatPrice(item.unitPrice * item.quantity)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tracking */}
                      {order.trackingNumber && (
                        <div className="bg-purple-50 border border-purple-100 px-4 py-2 flex items-center gap-2">
                          <Truck className="w-4 h-4 text-purple-500" />
                          <span className="text-xs text-purple-700">Tracking: <strong>{order.trackingNumber}</strong></span>
                        </div>
                      )}

                      {/* Shipping address */}
                      {order.shippingAddress && (
                        <div className="text-xs text-gray-400">
                          Shipping to: {order.shippingAddress.fullName}, {order.shippingAddress.line1}, {order.shippingAddress.city}, {order.shippingAddress.country}
                        </div>
                      )}

                      {/* Review CTA */}
                      {canReview && (
                        <button
                          onClick={() => setReviewingOrder(order)}
                          className="w-full flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 py-3 text-sm font-semibold transition-colors"
                        >
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          Write a Review for this Order
                        </button>
                      )}

                      {reviewed && (
                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-3 text-sm text-gray-500">
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          You reviewed this order — {order.review!.rating} stars
                        </div>
                      )}

                      <Link
                        href={`/shop/${order.shop.slug}`}
                        className="text-xs text-rose-600 font-medium hover:text-rose-700"
                      >
                        Visit {order.shop.displayName} →
                      </Link>
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
