"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, X, Loader2, Package, Eye, Heart, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";

interface Artwork {
  id: string;
  title: string;
  slug: string;
  price: number;
  status: "ACTIVE" | "DRAFT" | "SOLD" | "ARCHIVED";
  isFeatured: boolean;
  viewCount: number;
  createdAt: string;
  images: { url: string; isPrimary: boolean }[];
  categories: { category: { name: string } }[];
  mediums: { medium: { name: string } }[];
  _count: { wishlist: number; orderItems: number };
}

const STATUS_OPTS = ["All", "ACTIVE", "DRAFT", "SOLD", "ARCHIVED"];

const STATUS_COLORS: Record<string, string> = {
  ACTIVE:   "bg-green-50 text-green-700 border-green-200",
  DRAFT:    "bg-amber-50 text-amber-700 border-amber-200",
  SOLD:     "bg-gray-100 text-gray-500 border-gray-200",
  ARCHIVED: "bg-gray-100 text-gray-400 border-gray-200",
};

export default function SellerArtworksPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetch("/api/seller/artworks")
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(setArtworks)
      .catch(() => setError("Could not load artworks."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = artworks.filter(a => {
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-gray-900">Artworks</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {loading ? "Loading…" : `${artworks.length} total`}
          </p>
        </div>
        <Link
          href="/seller/artworks/new"
          className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" /> Upload Artwork
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search artworks…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-xl pl-10 pr-10 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-rose-400"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUS_OPTS.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "px-3 py-2 text-xs font-semibold rounded-lg border transition-colors",
                statusFilter === s
                  ? "bg-rose-600 text-white border-rose-600"
                  : "border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* States */}
      {loading && (
        <div className="flex items-center justify-center py-24 gap-3 text-gray-400">
          <Loader2 className="w-5 h-5 animate-spin" /> Loading artworks…
        </div>
      )}
      {error && <div className="text-center py-16 text-red-500 text-sm">{error}</div>}

      {/* Grid */}
      {!loading && !error && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Package className="w-12 h-12 text-gray-200 mb-4" />
          <p className="text-gray-500 font-medium">
            {artworks.length === 0 ? "No artworks yet." : "No artworks match this filter."}
          </p>
          {artworks.length === 0 && (
            <Link href="/seller/artworks/new" className="mt-3 text-sm text-rose-600 hover:underline">
              Upload your first artwork
            </Link>
          )}
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {["Artwork", "Price", "Status", "Views", "Wishlisted", "Orders", "Actions"].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(a => {
                const thumb = a.images.find(i => i.isPrimary)?.url ?? a.images[0]?.url;
                return (
                  <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                    {/* Artwork */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 shrink-0 overflow-hidden">
                          {thumb
                            ? <img src={thumb} alt="" className="w-full h-full object-cover" />
                            : <Package className="w-5 h-5 text-gray-300 m-auto mt-2.5" />
                          }
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 max-w-[200px] truncate">{a.title}</p>
                          {a.categories[0] && (
                            <p className="text-xs text-gray-400">{a.categories[0].category.name}</p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-5 py-3 font-semibold text-gray-900">{formatPrice(Number(a.price))}</td>

                    {/* Status */}
                    <td className="px-5 py-3">
                      <span className={cn("text-xs px-2.5 py-1 rounded-full border font-medium", STATUS_COLORS[a.status])}>
                        {a.status}
                      </span>
                    </td>

                    {/* Views */}
                    <td className="px-5 py-3 text-gray-500">
                      <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {a.viewCount}</span>
                    </td>

                    {/* Wishlisted */}
                    <td className="px-5 py-3 text-gray-500">
                      <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {a._count.wishlist}</span>
                    </td>

                    {/* Orders */}
                    <td className="px-5 py-3 font-semibold text-gray-900">{a._count.orderItems}</td>

                    {/* Actions */}
                    <td className="px-5 py-3">
                      <Link
                        href={`/seller/artworks/${a.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <Pencil className="w-3 h-3" /> Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
