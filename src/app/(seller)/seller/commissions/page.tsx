"use client";

import { useEffect, useState } from "react";
import {
  Loader2, AlertCircle, CheckCircle, XCircle, Clock,
  DollarSign, ChevronDown, ChevronUp, User, Calendar, Ruler, Tag,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface Buyer {
  id: string;
  name: string | null;
  email: string;
  avatar: string | null;
}

interface Commission {
  id: string;
  title: string;
  description: string;
  category: string | null;
  budgetMin: number | null;
  budgetMax: number | null;
  deadline: string | null;
  widthCm: number | null;
  heightCm: number | null;
  referenceImages: string[];
  status: string;
  artistNote: string | null;
  quotedPrice: number | null;
  quotedDeadline: string | null;
  createdAt: string;
  buyer: Buyer;
}

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  PENDING:   { label: "Pending", color: "bg-amber-50 text-amber-700 border-amber-200" },
  ACCEPTED:  { label: "Accepted", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  QUOTED:    { label: "Quoted", color: "bg-blue-50 text-blue-700 border-blue-200" },
  REJECTED:  { label: "Declined", color: "bg-red-50 text-red-700 border-red-200" },
  PAID:      { label: "Paid", color: "bg-purple-50 text-purple-700 border-purple-200" },
  COMPLETED: { label: "Completed", color: "bg-gray-100 text-gray-600 border-gray-200" },
  CANCELLED: { label: "Cancelled", color: "bg-gray-50 text-gray-400 border-gray-100" },
};

const FILTERS = ["ALL", "PENDING", "ACCEPTED", "QUOTED", "COMPLETED", "REJECTED", "CANCELLED"];

export default function SellerCommissionsPage() {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Action form state
  const [actionForm, setActionForm] = useState<Record<string, { note: string; price: string; deadline: string }>>({});

  useEffect(() => {
    fetch(`/api/seller/commissions?status=${filter}`)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then(setCommissions)
      .catch(() => setError("Could not load commissions."))
      .finally(() => setLoading(false));
  }, [filter]);

  function getForm(id: string) {
    return actionForm[id] ?? { note: "", price: "", deadline: "" };
  }

  function setFormField(id: string, field: string, val: string) {
    setActionForm((prev) => ({ ...prev, [id]: { ...getForm(id), [field]: val } }));
  }

  async function doAction(id: string, action: string) {
    setActionLoading(id + action);
    const form = getForm(id);
    try {
      const res = await fetch(`/api/commission/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          artistNote: form.note || null,
          quotedPrice: form.price || null,
          quotedDeadline: form.deadline || null,
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setCommissions((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
        setExpandedId(null);
      }
    } finally {
      setActionLoading(null);
    }
  }

  const visible = filter === "ALL" ? commissions : commissions.filter((c) => c.status === filter);
  const pendingCount = commissions.filter((c) => c.status === "PENDING").length;

  if (loading) return (
    <div className="flex items-center justify-center py-24 gap-3 text-gray-400">
      <Loader2 className="w-5 h-5 animate-spin" /> Loading commissions…
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center py-16 gap-2 text-red-500 text-sm">
      <AlertCircle className="w-4 h-4" /> {error}
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="font-heading text-2xl font-bold text-gray-900">Commission Requests</h1>
          {pendingCount > 0 && (
            <span className="bg-rose-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
              {pendingCount} new
            </span>
          )}
        </div>
        <p className="text-gray-500 text-sm mt-0.5">Custom artwork requests from buyers</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total", value: commissions.length, color: "bg-gray-50" },
          { label: "Pending", value: commissions.filter(c => c.status === "PENDING").length, color: "bg-amber-50" },
          { label: "Active", value: commissions.filter(c => ["ACCEPTED","QUOTED","PAID"].includes(c.status)).length, color: "bg-emerald-50" },
          { label: "Completed", value: commissions.filter(c => c.status === "COMPLETED").length, color: "bg-blue-50" },
        ].map(({ label, value, color }) => (
          <div key={label} className={`${color} border border-black/5 rounded-xl p-4 text-center`}>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((tab) => {
          const count = tab === "ALL" ? commissions.length : commissions.filter(c => c.status === tab).length;
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

      {/* List */}
      {visible.length === 0 ? (
        <div className="bg-white border border-gray-100 py-16 text-center rounded-xl">
          <Clock className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400 text-sm">No commission requests in this category</p>
        </div>
      ) : (
        <div className="space-y-4">
          {visible.map((commission) => {
            const cfg = STATUS_CONFIG[commission.status] ?? STATUS_CONFIG["PENDING"];
            const isExpanded = expandedId === commission.id;
            const isPending = commission.status === "PENDING";
            const form = getForm(commission.id);

            return (
              <div key={commission.id} className="bg-white border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors">
                {/* Header row */}
                <div
                  className="flex items-start justify-between gap-4 p-5 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : commission.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm">{commission.title}</h3>
                      <span className={`text-xs px-2 py-0.5 border font-medium ${cfg.color}`}>
                        {cfg.label}
                      </span>
                      {isPending && (
                        <span className="text-xs bg-rose-600 text-white px-2 py-0.5 font-medium animate-pulse">
                          Action Required
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {commission.buyer.name ?? commission.buyer.email}
                      </span>
                      <span>{new Date(commission.createdAt).toLocaleDateString("en-BD", { day: "numeric", month: "short", year: "numeric" })}</span>
                      {commission.category && (
                        <span className="flex items-center gap-1">
                          <Tag className="w-3 h-3" /> {commission.category}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="shrink-0 text-gray-300">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="border-t border-gray-50 px-5 pb-5 pt-4 space-y-4">

                    <p className="text-sm text-gray-600 leading-relaxed">{commission.description}</p>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                      {(commission.budgetMin || commission.budgetMax) && (
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3 text-emerald-500" />
                          Budget: ৳{commission.budgetMin?.toLocaleString() ?? "?"} – ৳{commission.budgetMax?.toLocaleString() ?? "?"}
                        </span>
                      )}
                      {commission.deadline && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-rose-400" />
                          Deadline: {new Date(commission.deadline).toLocaleDateString("en-BD")}
                        </span>
                      )}
                      {(commission.widthCm || commission.heightCm) && (
                        <span className="flex items-center gap-1">
                          <Ruler className="w-3 h-3 text-blue-400" />
                          Size: {commission.widthCm ?? "?"}cm × {commission.heightCm ?? "?"}cm
                        </span>
                      )}
                    </div>

                    {/* Reference images */}
                    {commission.referenceImages.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Reference Images</p>
                        <div className="flex flex-wrap gap-2">
                          {commission.referenceImages.map((url, i) => (
                            <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                              className="text-xs text-rose-600 hover:underline border border-rose-100 bg-rose-50 px-2 py-1">
                              Reference {i + 1} ↗
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Buyer info */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Buyer</p>
                      <p className="text-sm font-medium text-gray-800">{commission.buyer.name ?? "Anonymous"}</p>
                      <p className="text-xs text-gray-400">{commission.buyer.email}</p>
                    </div>

                    {/* Action area — only for PENDING */}
                    {isPending && (
                      <div className="border-t border-gray-100 pt-4 space-y-4">
                        <p className="text-sm font-semibold text-gray-700">Respond to this request:</p>

                        <div>
                          <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">
                            Note to Buyer (optional)
                          </label>
                          <textarea
                            rows={3}
                            value={form.note}
                            onChange={(e) => setFormField(commission.id, "note", e.target.value)}
                            placeholder="Write a note to the buyer — explain your decision, ask for clarification, or give context..."
                            className="w-full border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#1a1a2e] transition-colors resize-none"
                          />
                        </div>

                        {/* Quote fields */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">
                              Your Quote Price (BDT) — for QUOTE action
                            </label>
                            <input
                              type="number"
                              value={form.price}
                              onChange={(e) => setFormField(commission.id, "price", e.target.value)}
                              placeholder="e.g. 25000"
                              min={0}
                              className="w-full border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#1a1a2e] transition-colors"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">
                              Your Delivery Date — for QUOTE
                            </label>
                            <input
                              type="date"
                              value={form.deadline}
                              onChange={(e) => setFormField(commission.id, "deadline", e.target.value)}
                              min={new Date().toISOString().split("T")[0]}
                              className="w-full border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#1a1a2e] transition-colors"
                            />
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => doAction(commission.id, "ACCEPT")}
                            disabled={!!actionLoading}
                            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-5 py-2.5 font-semibold transition-colors disabled:opacity-50"
                          >
                            {actionLoading === commission.id + "ACCEPT" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
                            Accept Commission
                          </button>
                          <button
                            onClick={() => doAction(commission.id, "QUOTE")}
                            disabled={!!actionLoading || !form.price}
                            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs px-5 py-2.5 font-semibold transition-colors disabled:opacity-50"
                          >
                            {actionLoading === commission.id + "QUOTE" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <DollarSign className="w-3.5 h-3.5" />}
                            Send Quote
                          </button>
                          <button
                            onClick={() => doAction(commission.id, "REJECT")}
                            disabled={!!actionLoading}
                            className="flex items-center gap-1.5 border border-red-200 text-red-600 hover:bg-red-50 text-xs px-5 py-2.5 font-semibold transition-colors disabled:opacity-50"
                          >
                            {actionLoading === commission.id + "REJECT" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
                            Decline
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Mark complete for ACCEPTED/PAID */}
                    {["ACCEPTED", "PAID"].includes(commission.status) && (
                      <div className="border-t border-gray-100 pt-4">
                        <button
                          onClick={() => doAction(commission.id, "COMPLETE")}
                          disabled={!!actionLoading}
                          className="flex items-center gap-1.5 bg-[#1a1a2e] hover:bg-rose-700 text-white text-xs px-5 py-2.5 font-semibold transition-colors disabled:opacity-50"
                        >
                          {actionLoading === commission.id + "COMPLETE" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
                          Mark as Completed
                        </button>
                      </div>
                    )}

                    {/* Show quote sent */}
                    {commission.status === "QUOTED" && commission.quotedPrice && (
                      <div className="bg-blue-50 border border-blue-100 p-3">
                        <p className="text-xs text-blue-400 uppercase tracking-wider mb-1">Quote Sent</p>
                        <p className="text-base font-bold text-blue-800">{formatPrice(commission.quotedPrice)}</p>
                        {commission.quotedDeadline && (
                          <p className="text-xs text-blue-600 mt-0.5">
                            Delivery by: {new Date(commission.quotedDeadline).toLocaleDateString("en-BD")}
                          </p>
                        )}
                      </div>
                    )}
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
