"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Megaphone, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Announcement {
  id: string;
  message: string;
  type: string;
  active: boolean;
  createdAt: string;
}

const TYPES = ["promo", "discount", "info", "warning"];

const TYPE_COLOR: Record<string, string> = {
  promo:    "bg-rose-900/30 text-rose-400",
  discount: "bg-emerald-900/30 text-emerald-400",
  info:     "bg-blue-900/30 text-blue-400",
  warning:  "bg-amber-900/30 text-amber-400",
};

export default function SuperAdminAnnouncements() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMsg, setNewMsg] = useState("");
  const [newType, setNewType] = useState("promo");
  const [adding, setAdding] = useState(false);
  const [toggling, setToggling] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/superadmin/announcements")
      .then(r => r.json())
      .then(setItems)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function add() {
    if (!newMsg.trim()) return;
    setAdding(true);
    try {
      const res = await fetch("/api/superadmin/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMsg, type: newType }),
      });
      if (!res.ok) throw new Error();
      const newItem = await res.json();
      setItems(prev => [newItem, ...prev]);
      setNewMsg("");
    } catch {
      alert("Failed to add announcement.");
    } finally {
      setAdding(false);
    }
  }

  async function toggle(id: string) {
    setToggling(id);
    try {
      const res = await fetch("/api/superadmin/announcements", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error();
      setItems(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
    } catch {
      alert("Failed to update.");
    } finally {
      setToggling(null);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this announcement?")) return;
    setDeleting(id);
    try {
      const res = await fetch("/api/superadmin/announcements", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error();
      setItems(prev => prev.filter(a => a.id !== id));
    } catch {
      alert("Failed to delete.");
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white">Announcements</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          {loading ? "Loading…" : `${items.filter(a => a.active).length} active · ${items.length} total`}
        </p>
      </div>

      {/* Add new */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-4">
        <h2 className="font-semibold text-white flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4 text-rose-400" /> New Announcement
        </h2>
        <div className="flex gap-3">
          <select
            value={newType}
            onChange={e => setNewType(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-xl px-3 py-2.5 focus:outline-none shrink-0"
          >
            {TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
          <input
            type="text"
            value={newMsg}
            onChange={e => setNewMsg(e.target.value)}
            onKeyDown={e => e.key === "Enter" && add()}
            placeholder="Announcement message…"
            className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-rose-500"
          />
          <button
            onClick={add}
            disabled={adding || !newMsg.trim()}
            className="bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shrink-0 flex items-center gap-2"
          >
            {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Add
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-16 gap-3 text-gray-500">
          <Loader2 className="w-5 h-5 animate-spin" /> Loading…
        </div>
      )}

      {!loading && (
        <div className="space-y-3">
          {items.map(a => (
            <div
              key={a.id}
              className={cn("bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-5", !a.active && "opacity-50")}
            >
              <Megaphone className={cn("w-5 h-5 shrink-0", a.active ? "text-rose-400" : "text-gray-600")} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn("text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded", TYPE_COLOR[a.type] ?? "bg-gray-700 text-gray-400")}>
                    {a.type}
                  </span>
                  <span className="text-gray-600 text-xs">
                    {new Date(a.createdAt).toLocaleDateString("en-BD", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>
                <p className="text-sm text-white truncate">{a.message}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggle(a.id)}
                  disabled={toggling === a.id}
                  className={cn(
                    "text-xs px-3 py-1.5 rounded-lg font-medium transition-colors border disabled:opacity-40",
                    a.active
                      ? "bg-emerald-900/20 text-emerald-400 border-emerald-800/30 hover:bg-emerald-700/20"
                      : "bg-gray-800 text-gray-500 border-gray-700 hover:text-white"
                  )}
                >
                  {toggling === a.id ? <Loader2 className="w-3 h-3 animate-spin inline" /> : (a.active ? "Active" : "Inactive")}
                </button>
                <button
                  onClick={() => remove(a.id)}
                  disabled={deleting === a.id}
                  className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-40"
                >
                  {deleting === a.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <div className="text-center py-16 text-gray-600 text-sm">No announcements yet.</div>
          )}
        </div>
      )}
    </div>
  );
}
