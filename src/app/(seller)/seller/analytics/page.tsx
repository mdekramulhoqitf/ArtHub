"use client";

import { useEffect, useState } from "react";
import { TrendingUp, ShoppingBag, Eye, Heart, Star, Package, Loader2, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";

interface Analytics {
  totalRevenue: number;
  orderCount: number;
  artworkCount: number;
  totalViews: number;
  wishlistCount: number;
  reviewCount: number;
  avgRating: number;
  topArtworks: {
    id: string; title: string; price: number; viewCount: number; status: string;
    images: { url: string }[];
    _count: { wishlist: number; orderItems: number };
  }[];
  recentAnalytics: { date: string; views: number; ordersCount: number; revenue: number }[];
  ordersByStatus: Record<string, number>;
}

const STATUS_COLORS: Record<string, string> = {
  PENDING:   "bg-yellow-100 text-yellow-700",
  PAID:      "bg-blue-100 text-blue-700",
  SHIPPED:   "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
  REFUNDED:  "bg-gray-100 text-gray-500",
};

export default function SellerAnalyticsPage() {
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/seller/analytics")
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(setData)
      .catch(() => setError("Could not load analytics."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center py-24 gap-3 text-gray-400">
      <Loader2 className="w-5 h-5 animate-spin" /> Loading analytics…
    </div>
  );
  if (error) return <div className="text-center py-16 text-red-500 text-sm">{error}</div>;
  if (!data) return null;

  const statCards = [
    { label: "Total Revenue", value: formatPrice(data.totalRevenue), icon: TrendingUp, color: "bg-rose-50 text-rose-600" },
    { label: "Total Orders", value: data.orderCount.toString(), icon: ShoppingBag, color: "bg-blue-50 text-blue-600" },
    { label: "Artwork Views", value: data.totalViews.toLocaleString(), icon: Eye, color: "bg-amber-50 text-amber-600" },
    { label: "Wishlisted", value: data.wishlistCount.toString(), icon: Heart, color: "bg-pink-50 text-pink-600" },
    { label: "Reviews", value: data.reviewCount.toString(), icon: Star, color: "bg-purple-50 text-purple-600" },
    { label: "Avg Rating", value: data.avgRating > 0 ? `★ ${data.avgRating}` : "—", icon: Star, color: "bg-amber-50 text-amber-600" },
    { label: "Artworks", value: data.artworkCount.toString(), icon: Package, color: "bg-gray-50 text-gray-600" },
  ];

  // Simple bar chart for recent analytics (views)
  const maxViews = Math.max(...data.recentAnalytics.map(r => r.views), 1);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500 text-sm mt-0.5">All-time performance overview</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", color)}>
              <Icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders by status */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Orders by Status</h2>
          {Object.keys(data.ordersByStatus).length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-400 text-sm">No orders yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {Object.entries(data.ordersByStatus).map(([status, count]) => {
                const pct = data.orderCount > 0 ? Math.round((count / data.orderCount) * 100) : 0;
                return (
                  <div key={status}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={cn("text-xs px-2.5 py-1 rounded-full font-medium", STATUS_COLORS[status] ?? "bg-gray-100 text-gray-500")}>{status}</span>
                      <span className="text-sm font-semibold text-gray-700">{count} <span className="text-gray-400 font-normal">({pct}%)</span></span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Daily views chart */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-5 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-rose-500" /> Daily Views (last 30 days)
          </h2>
          {data.recentAnalytics.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-400 text-sm">No analytics data yet.</p>
            </div>
          ) : (
            <div className="flex items-end gap-1 h-32">
              {data.recentAnalytics.map((r, i) => {
                const h = maxViews > 0 ? Math.max(4, Math.round((r.views / maxViews) * 100)) : 4;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                    <div
                      className="w-full bg-rose-200 hover:bg-rose-500 rounded-t transition-colors cursor-default"
                      style={{ height: `${h}%`, minHeight: 4 }}
                    />
                    <div className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10">
                      {new Date(r.date).toLocaleDateString("en-BD", { month: "short", day: "numeric" })}: {r.views} views
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Top artworks */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Top Artworks by Views</h2>
        </div>
        {data.topArtworks.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-400 text-sm">No artworks yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {data.topArtworks.map((a, i) => {
              const thumb = a.images[0]?.url;
              return (
                <div key={a.id} className="flex items-center gap-4 px-6 py-4">
                  <span className="text-lg font-bold text-gray-200 w-6 shrink-0">#{i + 1}</span>
                  <div className="w-10 h-10 rounded-xl bg-gray-100 shrink-0 overflow-hidden">
                    {thumb && <img src={thumb} alt="" className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{a.title}</p>
                    <p className="text-xs text-gray-400">{formatPrice(Number(a.price))}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 shrink-0">
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{a.viewCount}</span>
                    <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" />{a._count.wishlist}</span>
                    <span className="flex items-center gap-1"><ShoppingBag className="w-3.5 h-3.5" />{a._count.orderItems}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
