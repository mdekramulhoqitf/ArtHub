"use client";

import { useEffect, useState } from "react";
import { Star, Loader2, Store } from "lucide-react";
import { cn } from "@/lib/utils";

interface Shop {
  id: string;
  displayName: string;
  slug: string;
  location: string | null;
  isFeatured: boolean;
  logoUrl: string | null;
  bannerUrl: string | null;
  _count: { artworks: number };
}

export default function SuperAdminFeatured() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/superadmin/shops")
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => setShops(data.shops ?? data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function toggleFeatured(shop: Shop) {
    setToggling(shop.id);
    try {
      const res = await fetch("/api/superadmin/shops", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: shop.id, action: "toggleFeatured" }),
      });
      if (!res.ok) throw new Error();
      setShops(prev => prev.map(s => s.id === shop.id ? { ...s, isFeatured: !s.isFeatured } : s));
    } catch {
      alert("Failed to update featured status.");
    } finally {
      setToggling(null);
    }
  }

  const featured = shops.filter(s => s.isFeatured);
  const rest = shops.filter(s => !s.isFeatured);

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white">Featured Management</h1>
        <p className="text-gray-500 text-sm mt-0.5">Control which shops appear as featured across the site</p>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-24 gap-3 text-gray-500">
          <Loader2 className="w-5 h-5 animate-spin" /> Loading shops…
        </div>
      )}

      {!loading && (
        <>
          {/* Featured count badge */}
          <div className="flex items-center gap-3">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-white font-semibold">Featured Shops</span>
            <span className="text-xs bg-amber-900/30 text-amber-400 px-2 py-0.5 rounded-full">
              {featured.length} featured
            </span>
            <span className="text-gray-600 text-xs">of {shops.length} total</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...featured, ...rest].map(s => {
              const thumb = s.bannerUrl || s.logoUrl;
              const busy = toggling === s.id;
              return (
                <div
                  key={s.id}
                  className={cn(
                    "relative rounded-xl overflow-hidden border-2 transition-all",
                    s.isFeatured ? "border-amber-500" : "border-gray-700"
                  )}
                >
                  <div className="relative aspect-video bg-gray-800">
                    {thumb ? (
                      <img src={thumb} alt={s.displayName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Store className="w-8 h-8 text-gray-600" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-xs font-semibold truncate">{s.displayName}</p>
                      <p className="text-gray-400 text-[10px]">{s.location ?? "—"} · {s._count.artworks} artworks</p>
                    </div>
                    {s.isFeatured && (
                      <div className="absolute top-2 right-2 bg-amber-500 rounded-full p-1">
                        <Star className="w-2.5 h-2.5 text-white fill-white" />
                      </div>
                    )}
                  </div>
                  <div className="p-2 bg-gray-800">
                    <button
                      disabled={busy}
                      onClick={() => toggleFeatured(s)}
                      className={cn(
                        "w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50",
                        s.isFeatured
                          ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/10"
                          : "bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white"
                      )}
                    >
                      {busy
                        ? <Loader2 className="w-3 h-3 animate-spin" />
                        : <Star className={cn("w-3 h-3", s.isFeatured && "fill-amber-400 text-amber-400")} />
                      }
                      {s.isFeatured ? "Remove Featured" : "Set Featured"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {shops.length === 0 && (
            <div className="text-center py-20 text-gray-600 text-sm">No shops yet.</div>
          )}
        </>
      )}
    </div>
  );
}
