"use client";

import { useEffect, useState } from "react";
import { Search, X, Loader2, ShoppingBag, MapPin, ChevronDown, ChevronUp, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";

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
  sellerPayout: number;
  trackingNumber: string | null;
  createdAt: string;
  buyer: { name: string | null; email: string; avatar: string | null };
  items: OrderItem[];
  shippingAddress: {
    fullName: string; line1: string; line2: string | null;
    city: string; state: string | null; country: string; postalCode: string;
  } | null;
}

const STATUS_OPTS = ["All", "PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"];
const NEXT_STATUS: Record<string, string> = {
  PAID: "SHIPPED",
  SHIPPED: "DELIVERED",
};

const STATUS_COLORS: Record<string, string> = {
  PENDING:   "bg-yellow-50 text-yellow-700 border-yellow-200",
  PAID:      "bg-blue-50 text-blue-700 border-blue-200",
  SHIPPED:   "bg-purple-50 text-purple-700 border-purple-200",
  DELIVERED: "bg-green-50 text-green-700 border-green-200",
  CANCELLED: "bg-red-50 text-red-700 border-red-200",
  REFUNDED:  "bg-gray-100 text-gray-500 border-gray-200",
};

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [trackingInputs, setTrackingInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/seller/orders")
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => {
        setOrders(data);
        const inputs: Record<string, string> = {};
        data.forEach((o: Order) => { inputs[o.id] = o.trackingNumber ?? ""; });
        setTrackingInputs(inputs);
      })
      .catch(() => setError("Could not load orders."))
      .finally(() => setLoading(false));
  }, []);

  async function updateOrder(id: string, payload: { status?: string; trackingNumber?: string }) {
    setActionLoading(id);
    try {
      const res = await fetch("/api/seller/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...payload }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setOrders(prev => prev.map(o => o.id === id ? { ...o, ...updated } : o));
    } catch {
      alert("Action failed.");
    } finally {
      setActionLoading(null);
    }
  }

  const filtered = orders.filter(o => {
    const q = search.toLowerCase();
    const matchSearch = !search
      || o.id.toLowerCase().includes(q)
      || (o.buyer.name ?? "").toLowerCase().includes(q)
      || o.buyer.email.toLowerCase().includes(q)
      || o.items.some(i => i.snapshotTitle.toLowerCase().includes(q));
    const matchStatus = statusFilter === "All" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = orders
    .filter(o => ["PAID", "SHIPPED", "DELIVERED"].includes(o.status))
    .reduce((sum, o) => sum + Number(o.sellerPayout), 0);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {loading ? "Loading…" : `${orders.length} total · ${formatPrice(totalRevenue)} earned`}
          </p>
        </div>
      </div>

      {/* Summary cards */}
      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(["PENDING","PAID","SHIPPED","DELIVERED"] as const).map(s => (
            <div key={s} className="bg-white border border-gray-100 rounded-xl p-4">
              <p className="text-2xl font-bold text-gray-900">{orders.filter(o => o.status === s).length}</p>
              <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium", STATUS_COLORS[s])}>{s}</span>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by order ID, buyer, artwork…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:border-rose-400"
          />
          {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><X className="w-4 h-4" /></button>}
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUS_OPTS.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={cn("px-3 py-2 text-xs font-semibold rounded-lg border transition-colors",
                statusFilter === s ? "bg-rose-600 text-white border-rose-600" : "border-gray-200 text-gray-500 hover:border-gray-400"
              )}
            >{s}</button>
          ))}
        </div>
      </div>

      {loading && <div className="flex items-center justify-center py-24 gap-3 text-gray-400"><Loader2 className="w-5 h-5 animate-spin" /> Loading orders…</div>}
      {error && <div className="text-center py-16 text-red-500 text-sm">{error}</div>}

      {!loading && !error && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <ShoppingBag className="w-12 h-12 text-gray-200 mb-4" />
          <p className="text-gray-500">{orders.length === 0 ? "No orders yet." : "No orders match this filter."}</p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="space-y-3">
          {filtered.map(o => {
            const busy = actionLoading === o.id;
            const isExpanded = expanded === o.id;
            const nextStatus = NEXT_STATUS[o.status];
            const thumb = o.items[0]?.artwork.images[0]?.url;

            return (
              <div key={o.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                {/* Row */}
                <div
                  className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpanded(isExpanded ? null : o.id)}
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-100 shrink-0 overflow-hidden">
                    {thumb && <img src={thumb} alt="" className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-gray-400">{o.id.slice(-10).toUpperCase()}</span>
                      <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium", STATUS_COLORS[o.status])}>{o.status}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 mt-0.5 truncate">
                      {o.items[0]?.snapshotTitle}{o.items.length > 1 ? ` +${o.items.length - 1} more` : ""}
                    </p>
                    <p className="text-xs text-gray-400">{o.buyer.name ?? o.buyer.email} · {new Date(o.createdAt).toLocaleDateString("en-BD", { day: "numeric", month: "short", year: "numeric" })}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-semibold text-gray-900">{formatPrice(Number(o.sellerPayout))}</p>
                    <p className="text-xs text-gray-400">payout</p>
                  </div>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
                </div>

                {/* Expanded */}
                {isExpanded && (
                  <div className="border-t border-gray-100 px-5 py-4 space-y-4 bg-gray-50">
                    {/* Items */}
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Items</p>
                      <div className="space-y-2">
                        {o.items.map(item => (
                          <div key={item.id} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-100">
                            <div className="w-8 h-8 rounded-lg bg-gray-100 shrink-0 overflow-hidden">
                              {item.artwork.images[0]?.url && <img src={item.artwork.images[0].url} alt="" className="w-full h-full object-cover" />}
                            </div>
                            <div className="flex-1 text-sm text-gray-700">{item.snapshotTitle}</div>
                            <span className="text-xs text-gray-400">×{item.quantity}</span>
                            <span className="font-semibold text-sm">{formatPrice(Number(item.unitPrice))}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping address */}
                    {o.shippingAddress && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Ship To</p>
                        <div className="bg-white rounded-xl px-4 py-3 border border-gray-100 text-sm text-gray-700 flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          <span>
                            {o.shippingAddress.fullName}, {o.shippingAddress.line1}
                            {o.shippingAddress.line2 ? `, ${o.shippingAddress.line2}` : ""}, {o.shippingAddress.city}, {o.shippingAddress.country} {o.shippingAddress.postalCode}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Tracking + actions */}
                    <div className="flex flex-wrap items-end gap-3">
                      <div className="flex-1 min-w-[200px]">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Tracking Number</p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Enter tracking number…"
                            value={trackingInputs[o.id] ?? ""}
                            onChange={e => setTrackingInputs(p => ({ ...p, [o.id]: e.target.value }))}
                            className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-rose-400"
                          />
                          <button
                            disabled={busy}
                            onClick={() => updateOrder(o.id, { trackingNumber: trackingInputs[o.id] })}
                            className="px-3 py-2 bg-gray-900 text-white text-xs font-semibold rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-50"
                          >
                            Save
                          </button>
                        </div>
                      </div>

                      {nextStatus && (
                        <button
                          disabled={busy}
                          onClick={() => updateOrder(o.id, { status: nextStatus })}
                          className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
                        >
                          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Truck className="w-4 h-4" />}
                          Mark as {nextStatus}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
