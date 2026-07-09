"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Bell, BellOff, CheckCheck, Package, Truck, Star, MessageCircle, Heart, Store, Wallet, PenLine } from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: string;
  title: string;
  body: string;
  link: string | null;
  readAt: string | null;
  createdAt: string;
}

const TYPE_ICON: Record<string, React.ElementType> = {
  ORDER_NEW: Package,
  ORDER_SHIPPED: Truck,
  ORDER_DELIVERED: CheckCheck,
  MESSAGE_NEW: MessageCircle,
  REVIEW_NEW: Star,
  ARTWORK_FEATURED: Heart,
  SHOP_APPROVED: Store,
  SHOP_FEATURED: Store,
  PAYOUT_SENT: Wallet,
  COMMISSION_NEW: PenLine,
  COMMISSION_ACCEPTED: PenLine,
  COMMISSION_QUOTED: PenLine,
  COMMISSION_REJECTED: PenLine,
};

const TYPE_COLOR: Record<string, string> = {
  ORDER_NEW: "bg-blue-50 text-blue-600",
  ORDER_SHIPPED: "bg-purple-50 text-purple-600",
  ORDER_DELIVERED: "bg-green-50 text-green-600",
  MESSAGE_NEW: "bg-gray-100 text-gray-600",
  REVIEW_NEW: "bg-amber-50 text-amber-600",
  ARTWORK_FEATURED: "bg-rose-50 text-rose-600",
  SHOP_APPROVED: "bg-emerald-50 text-emerald-600",
  SHOP_FEATURED: "bg-emerald-50 text-emerald-600",
  PAYOUT_SENT: "bg-green-50 text-green-600",
  COMMISSION_NEW: "bg-violet-50 text-violet-600",
  COMMISSION_ACCEPTED: "bg-emerald-50 text-emerald-600",
  COMMISSION_QUOTED: "bg-blue-50 text-blue-600",
  COMMISSION_REJECTED: "bg-red-50 text-red-600",
};

function timeAgo(d: string) {
  const diff = Date.now() - new Date(d).getTime();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(m / 60);
  const day = Math.floor(h / 24);
  if (day > 0) return `${day}d ago`;
  if (h > 0) return `${h}h ago`;
  if (m > 0) return `${m}m ago`;
  return "Just now";
}

export default function NotificationsPage() {
  const [notes, setNotes] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notifications")
      .then((r) => r.json())
      .then((data) => setNotes(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  async function markAllRead() {
    await fetch("/api/notifications", { method: "PATCH" });
    setNotes((prev) => prev.map((n) => ({ ...n, readAt: n.readAt ?? new Date().toISOString() })));
  }

  const unread = notes.filter((n) => !n.readAt).length;

  if (loading) return (
    <div className="flex items-center justify-center py-24 gap-2 text-gray-400">
      <Loader2 className="w-5 h-5 animate-spin" /> Loading notifications…
    </div>
  );

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Bell className="w-6 h-6 text-rose-500" /> Notifications
          </h1>
          {unread > 0 && <p className="text-sm text-gray-500 mt-1">{unread} unread</p>}
        </div>
        {unread > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-medium border border-rose-200 px-3 py-2 rounded-lg hover:bg-rose-50 transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5" /> Mark all read
          </button>
        )}
      </div>

      {notes.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 py-24 text-center">
          <BellOff className="w-14 h-14 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400 text-sm">No notifications yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 overflow-hidden">
          {notes.map((n) => {
            const Icon = TYPE_ICON[n.type] ?? Bell;
            const color = TYPE_COLOR[n.type] ?? "bg-gray-100 text-gray-500";
            const isUnread = !n.readAt;

            const inner = (
              <div className={cn("flex items-start gap-4 px-5 py-4 transition-colors", isUnread ? "bg-rose-50/30" : "hover:bg-gray-50")}>
                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5", color)}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn("text-sm font-medium leading-snug", isUnread ? "text-gray-900" : "text-gray-700")}>{n.title}</p>
                    <span className="text-[10px] text-gray-400 shrink-0">{timeAgo(n.createdAt)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{n.body}</p>
                </div>
                {isUnread && <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-2" />}
              </div>
            );

            return n.link ? (
              <Link key={n.id} href={n.link}>{inner}</Link>
            ) : (
              <div key={n.id}>{inner}</div>
            );
          })}
        </div>
      )}
    </div>
  );
}
