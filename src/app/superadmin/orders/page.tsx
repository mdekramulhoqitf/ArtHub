"use client";

import { useEffect, useState } from "react";
import { Search, X, Loader2, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

interface Order {
  id: string;
  status: string;
  subtotal: number;
  sellerPayout: number;
  createdAt: string;
  trackingNumber: string | null;
  buyer: { name: string | null; email: string };
  shop: { displayName: string; slug: string };
  items: { snapshotTitle: string }[];
}

interface Summary {
  gmv: number;
  fees: number;
  total: number;
  avgOrderValue: number;
}

const STATUS_OPTS = ["All", "PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"];

const STATUS_COLOR: Record<string, string> = {
  PENDING:   "bg-yellow-900/30 text-yellow-400",
  PAID:      "bg-blue-900/30 text-blue-400",
  SHIPPED:   "bg-amber-900/30 text-amber-400",
  DELIVERED: "bg-emerald-900/30 text-emerald-400",
  CANCELLED: "bg-red-900/30 text-red-400",
  REFUNDED:  "bg-gray-700 text-gray-400",
};

function fmtBDT(n: number) {
  return "BDT " + Math.round(n).toLocaleString("en-BD");
}

export default function SuperAdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetch("/api/superadmin/orders")
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => { setOrders(data.orders); setSummary(data.summary); })
      .catch(() => setError("Could not load orders."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = orders.filter(o => {
    const q = search.toLowerCase();
    const matchSearch = !search
      || o.id.toLowerCase().includes(q)
      || (o.items[0]?.snapshotTitle ?? "").toLowerCase().includes(q)
      || (o.buyer.name ?? "").toLowerCase().includes(q)
      || o.buyer.email.toLowerCase().includes(q)
      || o.shop.displayName.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white">Orders</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          {loading ? "Loading…" : `${summary?.total ?? 0} total orders`}
        </p>
      </div>

      {/* Summary cards */}
      {!loading && summary && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total GMV", value: fmtBDT(summary.gmv) },
            { label: "Platform Fees", value: fmtBDT(summary.fees) },
            { label: "Total Orders", value: summary.total.toString() },
            { label: "Avg. Order Value", value: fmtBDT(summary.avgOrderValue) },
          ].map(s => (
            <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-gray-500 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by order ID, artwork, buyer, shop…"
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
          Showing <span className="text-white font-semibold">{filtered.length}</span> order{filtered.length !== 1 ? "s" : ""}
          {search && <span> matching <span className="text-rose-400">&ldquo;{search}&rdquo;</span></span>}
        </p>
      )}

      {loading && (
        <div className="flex items-center justify-center py-24 gap-3 text-gray-500">
          <Loader2 className="w-5 h-5 animate-spin" /> Loading orders…
        </div>
      )}
      {error && <div className="text-center py-16 text-red-400 text-sm">{error}</div>}

      {!loading && !error && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                {["#", "Order ID", "Artwork", "Buyer", "Shop", "Amount", "Fee", "Date", "Status"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filtered.map((o, idx) => {
                const fee = Number(o.subtotal) - Number(o.sellerPayout);
                return (
                  <tr key={o.id} className="hover:bg-gray-800/40 transition-colors">
                    <td className="px-4 py-3 text-gray-600 text-xs font-mono w-8">{idx + 1}</td>
                    <td className="px-4 py-3 text-gray-400 font-mono text-xs">{o.id.slice(-10).toUpperCase()}</td>
                    <td className="px-4 py-3 text-white font-medium max-w-37.5 truncate">
                      {o.items[0]?.snapshotTitle ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <p className="text-gray-300">{o.buyer.name ?? "—"}</p>
                      <p className="text-gray-600">{o.buyer.email}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{o.shop.displayName}</td>
                    <td className="px-4 py-3 text-white font-semibold text-xs">{fmtBDT(Number(o.subtotal))}</td>
                    <td className="px-4 py-3 text-emerald-400 font-semibold text-xs">{fmtBDT(fee)}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {new Date(o.createdAt).toLocaleDateString("en-BD", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("text-xs px-2.5 py-1 rounded-full font-medium", STATUS_COLOR[o.status] ?? "bg-gray-700 text-gray-400")}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-600">
              <ShoppingBag className="w-10 h-10 mb-3 text-gray-800" />
              <p className="text-sm">{orders.length === 0 ? "No orders yet." : "No orders match this filter."}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
