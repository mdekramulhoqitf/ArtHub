"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Users, Store, Package, DollarSign, TrendingUp,
  ShoppingBag, Flag, CheckCircle, Clock, AlertCircle,
  ArrowUpRight, Activity, Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashData {
  stats: {
    totalUsers: number;
    activeShops: number;
    pendingShops: number;
    artworkCount: number;
    totalOrders: number;
    gmv: number;
    totalFees: number;
    newUsersThisMonth: number;
    newShopsThisMonth: number;
    newOrdersThisWeek: number;
  };
  pendingShopList: {
    id: string;
    displayName: string;
    location: string | null;
    createdAt: string;
    owner: { name: string | null; email: string };
    _count: { artworks: number };
  }[];
  recentOrders: {
    id: string;
    status: string;
    subtotal: number;
    sellerPayout: number;
    createdAt: string;
    buyer: { name: string | null; email: string };
    shop: { displayName: string };
    items: { snapshotTitle: string }[];
  }[];
  usersByRole: Record<string, number>;
  ordersByStatus: Record<string, number>;
}

const ORDER_STATUS_COLORS: Record<string, string> = {
  PENDING:   "bg-yellow-900/30 text-yellow-400 border-yellow-800/40",
  PAID:      "bg-blue-900/30 text-blue-400 border-blue-800/40",
  SHIPPED:   "bg-purple-900/30 text-purple-400 border-purple-800/40",
  DELIVERED: "bg-emerald-900/30 text-emerald-400 border-emerald-800/40",
  CANCELLED: "bg-red-900/30 text-red-400 border-red-800/40",
  REFUNDED:  "bg-gray-800 text-gray-500 border-gray-700",
};

function fmtBDT(n: number) {
  return "BDT " + n.toLocaleString("en-BD");
}

const QUICK_LINKS = [
  { href: "/superadmin/users", label: "Manage Users", icon: Users },
  { href: "/superadmin/shops", label: "Approve Shops", icon: Store },
  { href: "/superadmin/artworks", label: "Review Artworks", icon: Package },
  { href: "/superadmin/reports", label: "Handle Reports", icon: Flag },
  { href: "/superadmin/featured", label: "Set Featured", icon: TrendingUp },
  { href: "/superadmin/site", label: "Site Settings", icon: Activity },
];

export default function SuperAdminDashboard() {
  const [data, setData] = useState<DashData | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  async function fetchData() {
    try {
      const res = await fetch("/api/superadmin/dashboard");
      if (!res.ok) throw new Error();
      setData(await res.json());
    } catch {
      // silently fail, show zeros
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchData(); }, []);

  async function approveShop(id: string) {
    setActionLoading(id + "approve");
    try {
      const res = await fetch("/api/superadmin/shops", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "approve" }),
      });
      if (!res.ok) throw new Error();
      setData(prev => prev ? {
        ...prev,
        stats: { ...prev.stats, pendingShops: prev.stats.pendingShops - 1, activeShops: prev.stats.activeShops + 1 },
        pendingShopList: prev.pendingShopList.filter(s => s.id !== id),
      } : prev);
    } catch {
      alert("Failed.");
    } finally {
      setActionLoading(null);
    }
  }

  async function rejectShop(id: string) {
    setActionLoading(id + "reject");
    try {
      const res = await fetch("/api/superadmin/shops", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "reject" }),
      });
      if (!res.ok) throw new Error();
      setData(prev => prev ? {
        ...prev,
        stats: { ...prev.stats, pendingShops: prev.stats.pendingShops - 1 },
        pendingShopList: prev.pendingShopList.filter(s => s.id !== id),
      } : prev);
    } catch {
      alert("Failed.");
    } finally {
      setActionLoading(null);
    }
  }

  const s = data?.stats;

  const STATS = s ? [
    { label: "Total GMV", value: fmtBDT(s.gmv), sub: `${s.totalOrders} orders total`, icon: DollarSign, color: "from-rose-500 to-rose-700" },
    { label: "Total Users", value: s.totalUsers.toLocaleString(), sub: `+${s.newUsersThisMonth} this month`, icon: Users, color: "from-blue-500 to-blue-700" },
    { label: "Active Shops", value: s.activeShops.toLocaleString(), sub: `${s.pendingShops} pending approval`, icon: Store, color: "from-amber-500 to-amber-700" },
    { label: "Artworks Listed", value: s.artworkCount.toLocaleString(), sub: "across all shops", icon: Package, color: "from-purple-500 to-purple-700" },
    { label: "Total Orders", value: s.totalOrders.toLocaleString(), sub: `+${s.newOrdersThisWeek} this week`, icon: ShoppingBag, color: "from-emerald-500 to-emerald-700" },
    { label: "Platform Fees", value: fmtBDT(s.totalFees), sub: "from completed orders", icon: TrendingUp, color: "from-sky-500 to-sky-700" },
  ] : [];

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Platform Overview</h1>
          <p className="text-gray-500 text-sm mt-0.5">ArtHub Super Admin · Full Control</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-900/30 border border-emerald-700/40 rounded-xl px-4 py-2 text-emerald-400 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          System Online
        </div>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-16 gap-3 text-gray-500">
          <Loader2 className="w-5 h-5 animate-spin" /> Loading stats…
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {STATS.map(({ label, value, sub, icon: Icon, color }) => (
            <div key={label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${color} flex items-center justify-center mb-4 shadow-lg`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              <p className="text-xs text-emerald-400 mt-2">{sub}</p>
            </div>
          ))}
        </div>
      )}

      {/* Role + Order status breakdown */}
      {!loading && data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Users by role */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Users by Role</h3>
            <div className="space-y-3">
              {[["BUYER","bg-blue-500"],["SELLER","bg-amber-500"],["ADMIN","bg-purple-500"]] .map(([role, barColor]) => {
                const count = data.usersByRole[role] ?? 0;
                const pct = s && s.totalUsers > 0 ? Math.round((count / s.totalUsers) * 100) : 0;
                return (
                  <div key={role}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400 font-medium">{role}</span>
                      <span className="text-white font-semibold">{count} <span className="text-gray-500">({pct}%)</span></span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full", barColor)} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Orders by status */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Orders by Status</h3>
            {Object.keys(data.ordersByStatus).length === 0 ? (
              <p className="text-sm text-gray-600">No orders yet.</p>
            ) : (
              <div className="space-y-2">
                {Object.entries(data.ordersByStatus).map(([status, count]) => (
                  <div key={status} className="flex items-center justify-between">
                    <span className={cn("text-xs px-2.5 py-1 rounded-full border font-medium", ORDER_STATUS_COLORS[status] ?? "bg-gray-800 text-gray-400 border-gray-700")}>{status}</span>
                    <span className="text-white font-semibold text-sm">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {QUICK_LINKS.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="bg-gray-900 border border-gray-800 hover:border-rose-600/50 hover:bg-gray-800 rounded-xl p-4 text-center group transition-all">
              <Icon className="w-5 h-5 text-gray-400 group-hover:text-rose-400 mx-auto mb-2 transition-colors" />
              <p className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors">{label}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Shops */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
            <h2 className="font-semibold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" /> Pending Shop Approvals
              <span className="bg-amber-900/40 text-amber-400 text-xs px-2 py-0.5 rounded-full">
                {loading ? "…" : (data?.stats.pendingShops ?? 0)}
              </span>
            </h2>
            <Link href="/superadmin/shops" className="text-xs text-gray-500 hover:text-rose-400 flex items-center gap-1 transition-colors">
              View all <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-800">
            {loading && (
              <div className="flex items-center justify-center py-8 text-gray-600">
                <Loader2 className="w-4 h-4 animate-spin mr-2" /> Loading…
              </div>
            )}
            {!loading && data?.pendingShopList.length === 0 && (
              <div className="px-5 py-8 text-center text-gray-600 text-sm">No pending shops.</div>
            )}
            {!loading && data?.pendingShopList.map(shop => {
              const busy = actionLoading?.startsWith(shop.id);
              return (
                <div key={shop.id} className="px-5 py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{shop.displayName}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {shop.owner.name ?? shop.owner.email}
                      {shop.location ? ` · ${shop.location}` : ""}
                      {` · ${shop._count.artworks} artworks`}
                    </p>
                    <p className="text-xs text-gray-700 mt-0.5">
                      {new Date(shop.createdAt).toLocaleDateString("en-BD", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      disabled={!!busy}
                      onClick={() => approveShop(shop.id)}
                      className="flex items-center gap-1 bg-emerald-900/30 hover:bg-emerald-700/30 text-emerald-400 text-xs px-3 py-1.5 rounded-lg transition-colors border border-emerald-800/40 disabled:opacity-40"
                    >
                      {busy && actionLoading === shop.id + "approve"
                        ? <Loader2 className="w-3 h-3 animate-spin" />
                        : <CheckCircle className="w-3 h-3" />
                      } Approve
                    </button>
                    <button
                      disabled={!!busy}
                      onClick={() => rejectShop(shop.id)}
                      className="flex items-center gap-1 bg-red-900/20 hover:bg-red-700/20 text-red-400 text-xs px-3 py-1.5 rounded-lg transition-colors border border-red-800/30 disabled:opacity-40"
                    >
                      {busy && actionLoading === shop.id + "reject"
                        ? <Loader2 className="w-3 h-3 animate-spin" />
                        : null
                      } Reject
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Orders by status summary */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
            <h2 className="font-semibold text-white flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-blue-400" /> Platform Stats
            </h2>
            <Link href="/superadmin/orders" className="text-xs text-gray-500 hover:text-rose-400 flex items-center gap-1 transition-colors">
              View orders <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="p-5 space-y-4">
            {loading ? (
              <div className="flex items-center justify-center py-8 text-gray-600">
                <Loader2 className="w-4 h-4 animate-spin mr-2" /> Loading…
              </div>
            ) : s ? (
              <>
                {[
                  { label: "Sellers", value: data?.usersByRole["SELLER"] ?? 0, sub: "active sellers", color: "text-amber-400" },
                  { label: "Buyers", value: data?.usersByRole["BUYER"] ?? 0, sub: "registered buyers", color: "text-blue-400" },
                  { label: "Pending Approvals", value: s.pendingShops, sub: "shops awaiting review", color: "text-yellow-400" },
                  { label: "New This Month", value: s.newUsersThisMonth, sub: "new user registrations", color: "text-emerald-400" },
                ].map(({ label, value, sub, color }) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                    <div>
                      <p className="text-sm text-gray-300 font-medium">{label}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{sub}</p>
                    </div>
                    <span className={cn("text-xl font-bold", color)}>{value.toLocaleString()}</span>
                  </div>
                ))}
              </>
            ) : null}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
          <h2 className="font-semibold text-white flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-blue-400" /> Recent Orders
          </h2>
          <Link href="/superadmin/orders" className="text-xs text-gray-500 hover:text-rose-400 flex items-center gap-1 transition-colors">
            View all <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-12 text-gray-600">
            <Loader2 className="w-4 h-4 animate-spin mr-2" /> Loading…
          </div>
        ) : !data?.recentOrders.length ? (
          <div className="text-center py-12 text-gray-600 text-sm">No orders yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  {["Order ID", "Artwork", "Buyer", "Shop", "Amount", "Platform Fee", "Status"].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {data.recentOrders.map(o => {
                  const fee = Number(o.subtotal) - Number(o.sellerPayout);
                  return (
                    <tr key={o.id} className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-5 py-3 text-gray-400 font-mono text-xs">{o.id.slice(-10).toUpperCase()}</td>
                      <td className="px-5 py-3 text-white font-medium max-w-[140px] truncate">{o.items[0]?.snapshotTitle ?? "—"}</td>
                      <td className="px-5 py-3 text-gray-400 text-xs">{o.buyer.name ?? o.buyer.email}</td>
                      <td className="px-5 py-3 text-gray-400 text-xs">{o.shop.displayName}</td>
                      <td className="px-5 py-3 text-white font-semibold">{fmtBDT(Number(o.subtotal))}</td>
                      <td className="px-5 py-3 text-emerald-400 font-semibold">{fmtBDT(fee)}</td>
                      <td className="px-5 py-3">
                        <span className={cn("text-xs px-2.5 py-1 rounded-full border font-medium", ORDER_STATUS_COLORS[o.status] ?? "bg-gray-800 text-gray-400 border-gray-700")}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
