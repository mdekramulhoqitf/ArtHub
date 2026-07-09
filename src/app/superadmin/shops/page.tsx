"use client";

import { useEffect, useState } from "react";
import {
  Search, CheckCircle, XCircle, Eye, MapPin, X, Plus, Star,
  Loader2, Store, ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ShopRow {
  id: string;
  slug: string;
  displayName: string;
  location: string | null;
  bio: string | null;
  logoUrl: string | null;
  bannerUrl: string | null;
  websiteUrl: string | null;
  instagramUrl: string | null;
  isFeatured: boolean;
  isApproved: boolean;
  totalSales: number;
  ratingAvg: number;
  createdAt: string;
  owner: { id: string; name: string | null; email: string; avatar: string | null };
  _count: { artworks: number; orders: number };
}

interface UserOption {
  id: string;
  name: string | null;
  email: string;
}

const EMPTY_FORM = {
  ownerId: "",
  displayName: "",
  location: "",
  bio: "",
  websiteUrl: "",
  instagramUrl: "",
  isApproved: true,
};

export default function SuperAdminShops() {
  const [shops, setShops] = useState<ShopRow[]>([]);
  const [userOptions, setUserOptions] = useState<UserOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"all" | "pending">("all");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Create panel
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  async function fetchData() {
    try {
      const res = await fetch("/api/superadmin/shops");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setShops(data.shops);
      setUserOptions(data.usersWithoutShop);
    } catch {
      setError("Could not load shops.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchData(); }, []);

  async function doAction(id: string, action: string) {
    setActionLoading(id + action);
    try {
      const res = await fetch("/api/superadmin/shops", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setShops(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
    } catch {
      alert("Action failed.");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.ownerId || !form.displayName.trim()) {
      setCreateError("Owner and shop name required.");
      return;
    }
    setCreating(true);
    setCreateError("");
    try {
      const res = await fetch("/api/superadmin/shops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed");
      }
      const newShop = await res.json();
      setShops(prev => [newShop, ...prev]);
      setUserOptions(prev => prev.filter(u => u.id !== form.ownerId));
      setForm(EMPTY_FORM);
      setShowCreate(false);
    } catch (err: unknown) {
      setCreateError(err instanceof Error ? err.message : "Create failed.");
    } finally {
      setCreating(false);
    }
  }

  const allShops = shops.filter(s => {
    const q = search.toLowerCase();
    return !search
      || s.displayName.toLowerCase().includes(q)
      || (s.location ?? "").toLowerCase().includes(q)
      || (s.owner.name ?? "").toLowerCase().includes(q)
      || s.owner.email.toLowerCase().includes(q);
  });

  const pendingShops = allShops.filter(s => !s.isApproved);
  const activeShops = allShops.filter(s => s.isApproved);
  const displayed = tab === "pending" ? pendingShops : activeShops;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Shop Management</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {loading ? "Loading…" : `${shops.filter(s => s.isApproved).length} active · ${shops.filter(s => !s.isApproved).length} pending approval`}
          </p>
        </div>
        <button
          onClick={() => { setShowCreate(true); setCreateError(""); }}
          className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" /> Create Shop
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-900 border border-gray-800 rounded-xl p-1 w-fit">
        {(["all", "pending"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize",
              tab === t ? "bg-rose-600 text-white" : "text-gray-400 hover:text-white"
            )}
          >
            {t === "pending"
              ? `Pending (${loading ? "…" : shops.filter(s => !s.isApproved).length})`
              : `All Shops (${loading ? "…" : shops.filter(s => s.isApproved).length})`
            }
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search by shop name, owner, location…"
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

      {/* Loading / Error */}
      {loading && (
        <div className="flex items-center justify-center py-24 gap-3 text-gray-500">
          <Loader2 className="w-5 h-5 animate-spin" /> Loading shops…
        </div>
      )}
      {error && <div className="text-center py-16 text-red-400 text-sm">{error}</div>}

      {/* Result count */}
      {!loading && !error && (
        <p className="text-xs text-gray-500">
          Showing <span className="text-white font-semibold">{displayed.length}</span> shop{displayed.length !== 1 ? "s" : ""}
          {search && <span> matching <span className="text-rose-400">&ldquo;{search}&rdquo;</span></span>}
        </p>
      )}

      {/* Table */}
      {!loading && !error && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                {["#", "Shop", "Owner", "Location", "Artworks", "Orders", "Sales", "Rating", "Status", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {displayed.map((s, idx) => {
                const busy = actionLoading?.startsWith(s.id);
                return (
                  <tr key={s.id} className="hover:bg-gray-800/40 transition-colors">
                    <td className="px-4 py-3 text-gray-600 text-xs font-mono w-10">{idx + 1}</td>
                    {/* Shop */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-lg bg-gray-700 shrink-0 overflow-hidden flex items-center justify-center">
                          {s.logoUrl
                            ? <img src={s.logoUrl} alt="" className="w-full h-full object-cover" />
                            : s.bannerUrl
                              ? <img src={s.bannerUrl} alt="" className="w-full h-full object-cover" />
                              : <Store className="w-4 h-4 text-gray-400" />
                          }
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="text-white font-medium">{s.displayName}</p>
                            {s.isFeatured && <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />}
                          </div>
                          <p className="text-gray-600 text-xs">/{s.slug}</p>
                        </div>
                      </div>
                    </td>

                    {/* Owner */}
                    <td className="px-4 py-3">
                      <p className="text-white text-xs font-medium">{s.owner.name ?? "—"}</p>
                      <p className="text-gray-500 text-xs">{s.owner.email}</p>
                    </td>

                    {/* Location */}
                    <td className="px-4 py-3">
                      {s.location ? (
                        <span className="flex items-center gap-1 text-gray-400 text-xs">
                          <MapPin className="w-3 h-3 text-rose-500 shrink-0" /> {s.location}
                        </span>
                      ) : (
                        <span className="text-gray-700 text-xs">—</span>
                      )}
                    </td>

                    {/* Artworks */}
                    <td className="px-4 py-3 text-white font-semibold">{s._count.artworks}</td>

                    {/* Orders */}
                    <td className="px-4 py-3 text-white font-semibold">{s._count.orders}</td>

                    {/* Sales */}
                    <td className="px-4 py-3 text-white font-semibold">{s.totalSales}</td>

                    {/* Rating */}
                    <td className="px-4 py-3 text-amber-400 font-semibold">
                      {s.ratingAvg > 0 ? `★ ${s.ratingAvg.toFixed(1)}` : <span className="text-gray-700">—</span>}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <span className={cn(
                        "text-xs px-2.5 py-1 rounded-full font-medium",
                        s.isApproved ? "bg-emerald-900/30 text-emerald-400" : "bg-yellow-900/30 text-yellow-400"
                      )}>
                        {s.isApproved ? "Active" : "Pending"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <a
                          href={`/shop/${s.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-gray-500 hover:text-blue-400 hover:bg-blue-900/20 rounded-lg transition-colors"
                          title="View shop"
                        >
                          <Eye className="w-4 h-4" />
                        </a>

                        <button
                          disabled={!!busy}
                          onClick={() => doAction(s.id, "toggleFeatured")}
                          className={cn(
                            "p-1.5 rounded-lg transition-colors disabled:opacity-40",
                            s.isFeatured
                              ? "text-amber-400 hover:bg-amber-900/20"
                              : "text-gray-500 hover:text-amber-400 hover:bg-amber-900/20"
                          )}
                          title={s.isFeatured ? "Unfeature" : "Feature"}
                        >
                          {busy && actionLoading === s.id + "toggleFeatured"
                            ? <Loader2 className="w-4 h-4 animate-spin" />
                            : <Star className="w-4 h-4" />
                          }
                        </button>

                        {s.isApproved ? (
                          <button
                            disabled={!!busy}
                            onClick={() => { if (confirm(`Reject/suspend "${s.displayName}"?`)) doAction(s.id, "reject"); }}
                            className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-40"
                            title="Suspend"
                          >
                            {busy && actionLoading === s.id + "reject"
                              ? <Loader2 className="w-4 h-4 animate-spin" />
                              : <XCircle className="w-4 h-4" />
                            }
                          </button>
                        ) : (
                          <button
                            disabled={!!busy}
                            onClick={() => doAction(s.id, "approve")}
                            className="p-1.5 text-gray-500 hover:text-emerald-400 hover:bg-emerald-900/20 rounded-lg transition-colors disabled:opacity-40"
                            title="Approve"
                          >
                            {busy && actionLoading === s.id + "approve"
                              ? <Loader2 className="w-4 h-4 animate-spin" />
                              : <CheckCircle className="w-4 h-4" />
                            }
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {displayed.length === 0 && !loading && (
            <div className="text-center py-16 text-gray-600 text-sm">
              {shops.length === 0
                ? "No shops have been created yet."
                : tab === "pending"
                  ? "No pending shops."
                  : "No shops match this filter."
              }
            </div>
          )}
        </div>
      )}

      {/* Create Shop Slide-over */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={() => setShowCreate(false)} />
          <div className="w-full max-w-md bg-gray-900 border-l border-gray-800 flex flex-col h-full overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 shrink-0">
              <div>
                <h2 className="text-white font-bold text-lg">Create Shop</h2>
                <p className="text-gray-500 text-xs mt-0.5">Assign to existing user · sets role to SELLER</p>
              </div>
              <button onClick={() => setShowCreate(false)} className="p-2 text-gray-500 hover:text-white rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreate} className="flex-1 flex flex-col px-6 py-5 gap-5">
              {/* Owner select */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Owner *</label>
                {userOptions.length === 0 ? (
                  <p className="text-sm text-gray-600 py-2">No users without a shop.</p>
                ) : (
                  <select
                    value={form.ownerId}
                    onChange={e => setForm(f => ({ ...f, ownerId: e.target.value }))}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="">Select user…</option>
                    {userOptions.map(u => (
                      <option key={u.id} value={u.id}>
                        {u.name ? `${u.name} (${u.email})` : u.email}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Shop name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Shop Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Rahim Art Studio"
                  value={form.displayName}
                  onChange={e => setForm(f => ({ ...f, displayName: e.target.value }))}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-rose-500"
                />
                {form.displayName && (
                  <p className="text-xs text-gray-600">
                    Slug: <span className="text-gray-400">/{form.displayName.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "")}</span>
                  </p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Dhanmondi, Dhaka"
                  value={form.location}
                  onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-rose-500"
                />
              </div>

              {/* Bio */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Bio</label>
                <textarea
                  placeholder="Short description of the shop…"
                  value={form.bio}
                  onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-rose-500 resize-none"
                />
              </div>

              {/* Website */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Website URL</label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={form.websiteUrl}
                  onChange={e => setForm(f => ({ ...f, websiteUrl: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-rose-500"
                />
              </div>

              {/* Instagram */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Instagram URL</label>
                <input
                  type="url"
                  placeholder="https://instagram.com/handle"
                  value={form.instagramUrl}
                  onChange={e => setForm(f => ({ ...f, instagramUrl: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-rose-500"
                />
              </div>

              {/* Auto-approve toggle */}
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div
                  onClick={() => setForm(f => ({ ...f, isApproved: !f.isApproved }))}
                  className={cn(
                    "relative inline-flex items-center w-10 h-6 rounded-full transition-colors duration-200 cursor-pointer",
                    form.isApproved ? "bg-emerald-600" : "bg-gray-700"
                  )}
                >
                  <span className={cn(
                    "absolute w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200",
                    form.isApproved ? "translate-x-5" : "translate-x-1"
                  )} />
                </div>
                <span className="text-sm text-gray-300">Approve immediately</span>
              </label>

              {createError && (
                <p className="text-sm text-red-400 bg-red-900/20 border border-red-800/40 rounded-xl px-4 py-3">{createError}</p>
              )}

              {/* Footer */}
              <div className="flex gap-3 mt-auto pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating || !form.ownerId || !form.displayName.trim()}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {creating ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating…</> : "Create Shop"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
