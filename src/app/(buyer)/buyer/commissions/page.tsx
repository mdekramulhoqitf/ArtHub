"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Palette, Clock, CheckCircle, XCircle, DollarSign, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface Commission {
  id: string;
  title: string;
  description: string;
  category: string | null;
  budgetMin: number | null;
  budgetMax: number | null;
  deadline: string | null;
  status: string;
  artistNote: string | null;
  quotedPrice: number | null;
  quotedDeadline: string | null;
  createdAt: string;
  shop: { displayName: string; slug: string; logoUrl: string | null };
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  PENDING:   { label: "Pending Review", color: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock },
  ACCEPTED:  { label: "Accepted", color: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle },
  QUOTED:    { label: "Quote Received", color: "bg-blue-50 text-blue-700 border-blue-200", icon: DollarSign },
  REJECTED:  { label: "Declined", color: "bg-red-50 text-red-700 border-red-200", icon: XCircle },
  PAID:      { label: "Paid", color: "bg-purple-50 text-purple-700 border-purple-200", icon: CheckCircle },
  COMPLETED: { label: "Completed", color: "bg-gray-50 text-gray-700 border-gray-200", icon: CheckCircle },
  CANCELLED: { label: "Cancelled", color: "bg-gray-50 text-gray-400 border-gray-100", icon: XCircle },
};

const FILTER_TABS = ["ALL", "PENDING", "ACCEPTED", "QUOTED", "COMPLETED", "CANCELLED"];

export default function BuyerCommissionsPage() {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/commission")
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then(setCommissions)
      .catch(() => setError("Could not load commissions."))
      .finally(() => setLoading(false));
  }, []);

  async function handleCancel(id: string) {
    setCancellingId(id);
    try {
      const res = await fetch(`/api/commission/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "CANCEL" }),
      });
      if (res.ok) {
        setCommissions((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: "CANCELLED" } : c))
        );
      }
    } finally {
      setCancellingId(null);
    }
  }

  const visible = filter === "ALL" ? commissions : commissions.filter((c) => c.status === filter);

  if (loading) return (
    <div className="flex items-center justify-center py-24 gap-3 text-gray-400">
      <Loader2 className="w-5 h-5 animate-spin" /> Loading commissions…
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center py-16 gap-2 text-red-500">
      <AlertCircle className="w-4 h-4" /> {error}
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-gray-900">My Commissions</h1>
          <p className="text-gray-500 text-sm mt-0.5">Custom artwork requests you've sent to artists</p>
        </div>
        <Link
          href="/shops"
          className="flex items-center gap-1.5 bg-[#1a1a2e] text-white text-xs px-4 py-2.5 font-medium hover:bg-rose-700 transition-colors"
        >
          <Palette className="w-3.5 h-3.5" /> Browse Artists
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {FILTER_TABS.map((tab) => {
          const count = tab === "ALL" ? commissions.length : commissions.filter((c) => c.status === tab).length;
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
              <span className="ml-1.5 opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <div className="bg-white border border-gray-100 py-16 text-center">
          <Palette className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400 text-sm mb-4">No commission requests yet</p>
          <Link href="/shops" className="text-rose-600 text-sm font-medium hover:underline">
            Browse artists to commission →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {visible.map((commission) => {
            const cfg = STATUS_CONFIG[commission.status] ?? STATUS_CONFIG["PENDING"];
            const Icon = cfg.icon;
            const canCancel = ["PENDING", "ACCEPTED", "QUOTED"].includes(commission.status);

            return (
              <div key={commission.id} className="bg-white border border-gray-100 p-5 hover:border-gray-200 transition-colors">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm">{commission.title}</h3>
                      <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 border font-medium ${cfg.color}`}>
                        <Icon className="w-3 h-3" /> {cfg.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      To: <span className="text-rose-600 font-medium">{commission.shop.displayName}</span>
                      {" · "}
                      {new Date(commission.createdAt).toLocaleDateString("en-BD", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-3">{commission.description}</p>

                <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-4">
                  {commission.category && (
                    <span className="bg-gray-50 border border-gray-100 px-2 py-0.5">{commission.category}</span>
                  )}
                  {(commission.budgetMin || commission.budgetMax) && (
                    <span>
                      Budget: ৳{commission.budgetMin?.toLocaleString() ?? "?"} – ৳{commission.budgetMax?.toLocaleString() ?? "?"}
                    </span>
                  )}
                  {commission.deadline && (
                    <span>Deadline: {new Date(commission.deadline).toLocaleDateString("en-BD")}</span>
                  )}
                </div>

                {/* Quote received highlight */}
                {commission.status === "QUOTED" && commission.quotedPrice && (
                  <div className="bg-blue-50 border border-blue-100 px-4 py-3 mb-3">
                    <p className="text-xs text-blue-500 uppercase tracking-wider font-semibold mb-1">Artist Quote</p>
                    <p className="text-lg font-bold text-blue-800">{formatPrice(commission.quotedPrice)}</p>
                    {commission.quotedDeadline && (
                      <p className="text-xs text-blue-600 mt-0.5">
                        Delivery by: {new Date(commission.quotedDeadline).toLocaleDateString("en-BD")}
                      </p>
                    )}
                    {commission.artistNote && (
                      <p className="text-xs text-blue-600 mt-2 leading-relaxed">{commission.artistNote}</p>
                    )}
                  </div>
                )}

                {/* Artist note for rejected */}
                {commission.status === "REJECTED" && commission.artistNote && (
                  <div className="bg-red-50 border border-red-100 px-4 py-3 mb-3">
                    <p className="text-xs text-red-400 uppercase tracking-wider font-semibold mb-1">Artist Note</p>
                    <p className="text-xs text-red-700">{commission.artistNote}</p>
                  </div>
                )}

                {/* Artist note for accepted */}
                {commission.status === "ACCEPTED" && commission.artistNote && (
                  <div className="bg-emerald-50 border border-emerald-100 px-4 py-3 mb-3">
                    <p className="text-xs text-emerald-500 uppercase tracking-wider font-semibold mb-1">Artist Note</p>
                    <p className="text-xs text-emerald-800">{commission.artistNote}</p>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Link
                    href={`/shop/${commission.shop.slug}`}
                    className="text-xs text-rose-600 font-medium hover:text-rose-700 flex items-center gap-1"
                  >
                    Visit Shop <ArrowRight className="w-3 h-3" />
                  </Link>

                  {canCancel && (
                    <button
                      onClick={() => handleCancel(commission.id)}
                      disabled={cancellingId === commission.id}
                      className="text-xs text-gray-400 hover:text-red-500 transition-colors ml-auto disabled:opacity-50"
                    >
                      {cancellingId === commission.id ? "Cancelling…" : "Cancel Request"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
