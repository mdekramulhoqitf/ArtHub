"use client";

import { useEffect, useState } from "react";
import { Search, Eye, Trash2, Star, CheckCircle, X, Loader2, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface Artwork {
  id: string;
  title: string;
  slug: string;
  price: number;
  status: string;
  isFeatured: boolean;
  viewCount: number;
  createdAt: string;
  shop: { id: string; displayName: string; slug: string };
  images: { url: string }[];
  mediums: { medium: { name: string } }[];
  _count: { wishlist: number; orderItems: number };
}

const STATUS_OPTS = ["All", "ACTIVE", "DRAFT", "SOLD", "ARCHIVED"];

const STATUS_COLOR: Record<string, string> = {
  ACTIVE:   "bg-emerald-900/30 text-emerald-400",
  DRAFT:    "bg-gray-700 text-gray-400",
  SOLD:     "bg-blue-900/30 text-blue-400",
  ARCHIVED: "bg-yellow-900/30 text-yellow-400",
};

export default function SuperAdminArtworks() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/superadmin/artworks")
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(setArtworks)
      .catch(() => setError("Could not load artworks."))
      .finally(() => setLoading(false));
  }, []);

  async function doAction(id: string, action: string) {
    setActionLoading(id + action);
    try {
      const res = await fetch("/api/superadmin/artworks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setArtworks(prev => prev.map(a => a.id === id ? { ...a, ...updated } : a));
    } catch {
      alert("Action failed.");
    } finally {
      setActionLoading(null);
    }
  }

  async function doDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setActionLoading(id + "delete");
    try {
      const res = await fetch("/api/superadmin/artworks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error();
      setArtworks(prev => prev.filter(a => a.id !== id));
    } catch {
      alert("Delete failed.");
    } finally {
      setActionLoading(null);
    }
  }

  const filtered = artworks.filter(a => {
    const q = search.toLowerCase();
    const matchSearch = !search
      || a.title.toLowerCase().includes(q)
      || a.shop.displayName.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white">Artwork Management</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          {loading ? "Loading…" : `${artworks.length} total artworks`}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by title or shop…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-rose-500"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
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
                statusFilter === s ? "bg-rose-600 text-white border-rose-600" : "border-gray-700 text-gray-400 hover:text-white hover:border-gray-500"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      {!loading && !error && (
        <p className="text-xs text-gray-500">
          Showing <span className="text-white font-semibold">{filtered.length}</span> artwork{filtered.length !== 1 ? "s" : ""}
          {search && <span> matching <span className="text-rose-400">&ldquo;{search}&rdquo;</span></span>}
        </p>
      )}

      {/* States */}
      {loading && (
        <div className="flex items-center justify-center py-24 gap-3 text-gray-500">
          <Loader2 className="w-5 h-5 animate-spin" /> Loading artworks…
        </div>
      )}
      {error && <div className="text-center py-16 text-red-400 text-sm">{error}</div>}

      {/* Table */}
      {!loading && !error && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                {["#", "Artwork", "Shop", "Medium", "Price (BDT)", "Views", "Orders", "Status", "Featured", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filtered.map((a, idx) => {
                const busy = actionLoading?.startsWith(a.id);
                const thumb = a.images[0]?.url;
                const medium = a.mediums[0]?.medium.name ?? "—";
                return (
                  <tr key={a.id} className="hover:bg-gray-800/40 transition-colors">
                    {/* # */}
                    <td className="px-4 py-3 text-gray-600 text-xs font-mono w-8">{idx + 1}</td>

                    {/* Artwork */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-800 shrink-0 flex items-center justify-center">
                          {thumb
                            ? <img src={thumb} alt="" className="w-full h-full object-cover" />
                            : <Package className="w-4 h-4 text-gray-600" />
                          }
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm max-w-[160px] truncate">{a.title}</p>
                          <p className="text-gray-600 text-xs">/{a.slug}</p>
                        </div>
                      </div>
                    </td>

                    {/* Shop */}
                    <td className="px-4 py-3 text-gray-400 text-xs">
                      <a href={`/shop/${a.shop.slug}`} target="_blank" rel="noopener noreferrer"
                        className="hover:text-rose-400 transition-colors">
                        {a.shop.displayName}
                      </a>
                    </td>

                    {/* Medium */}
                    <td className="px-4 py-3 text-gray-400 text-xs">{medium}</td>

                    {/* Price */}
                    <td className="px-4 py-3 text-white font-semibold">
                      {Number(a.price).toLocaleString("en-BD")}
                    </td>

                    {/* Views */}
                    <td className="px-4 py-3 text-gray-400 text-xs">{a.viewCount}</td>

                    {/* Orders */}
                    <td className="px-4 py-3 text-white font-semibold">{a._count.orderItems}</td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <span className={cn("text-xs px-2.5 py-1 rounded-full font-medium", STATUS_COLOR[a.status] ?? "bg-gray-700 text-gray-400")}>
                        {a.status}
                      </span>
                    </td>

                    {/* Featured */}
                    <td className="px-4 py-3">
                      <button
                        disabled={!!busy}
                        onClick={() => doAction(a.id, "toggleFeatured")}
                        className={cn(
                          "p-1.5 rounded-lg transition-colors disabled:opacity-40",
                          a.isFeatured ? "text-amber-400 bg-amber-900/20" : "text-gray-600 hover:text-amber-400 hover:bg-amber-900/20"
                        )}
                        title={a.isFeatured ? "Unfeature" : "Feature"}
                      >
                        {busy && actionLoading === a.id + "toggleFeatured"
                          ? <Loader2 className="w-4 h-4 animate-spin" />
                          : <Star className={cn("w-4 h-4", a.isFeatured && "fill-amber-400")} />
                        }
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <a
                          href={`/artwork/${a.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-gray-500 hover:text-blue-400 hover:bg-blue-900/20 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </a>

                        {a.status === "ARCHIVED" ? (
                          <button
                            disabled={!!busy}
                            onClick={() => doAction(a.id, "activate")}
                            className="p-1.5 text-gray-500 hover:text-emerald-400 hover:bg-emerald-900/20 rounded-lg transition-colors disabled:opacity-40"
                            title="Activate"
                          >
                            {busy && actionLoading === a.id + "activate"
                              ? <Loader2 className="w-4 h-4 animate-spin" />
                              : <CheckCircle className="w-4 h-4" />
                            }
                          </button>
                        ) : (
                          <button
                            disabled={!!busy}
                            onClick={() => doAction(a.id, "archive")}
                            className="p-1.5 text-gray-500 hover:text-yellow-400 hover:bg-yellow-900/20 rounded-lg transition-colors disabled:opacity-40"
                            title="Archive"
                          >
                            {busy && actionLoading === a.id + "archive"
                              ? <Loader2 className="w-4 h-4 animate-spin" />
                              : <CheckCircle className="w-4 h-4" />
                            }
                          </button>
                        )}

                        <button
                          disabled={!!busy}
                          onClick={() => doDelete(a.id, a.title)}
                          className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-40"
                          title="Delete"
                        >
                          {busy && actionLoading === a.id + "delete"
                            ? <Loader2 className="w-4 h-4 animate-spin" />
                            : <Trash2 className="w-4 h-4" />
                          }
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && !loading && (
            <div className="text-center py-16 text-gray-600 text-sm">
              {artworks.length === 0 ? "No artworks uploaded yet." : "No artworks match this filter."}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
