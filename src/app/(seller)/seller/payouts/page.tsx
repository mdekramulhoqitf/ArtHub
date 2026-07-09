"use client";

import { useEffect, useState } from "react";
import { Loader2, CreditCard, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";

interface PayoutOrder {
  id: string;
  status: string;
  sellerPayout: number;
  subtotal: number;
  platformFeePercent: number;
  createdAt: string;
  stripeTransferId: string | null;
  items: { snapshotTitle: string; quantity: number; unitPrice: number }[];
}

interface PayoutData {
  orders: PayoutOrder[];
  totalEarned: number;
  totalPaid: number;
  totalPending: number;
}

export default function SellerPayoutsPage() {
  const [data, setData] = useState<PayoutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/seller/payouts")
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(setData)
      .catch(() => setError("Could not load payout data."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center py-24 gap-3 text-gray-400">
      <Loader2 className="w-5 h-5 animate-spin" /> Loading payouts…
    </div>
  );
  if (error) return <div className="text-center py-16 text-red-500 text-sm">{error}</div>;
  if (!data) return null;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-gray-900">Payouts</h1>
        <p className="text-gray-500 text-sm mt-0.5">Your earnings from completed orders</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Earned", value: formatPrice(data.totalEarned), icon: TrendingUp, color: "bg-rose-50 text-rose-600", sub: "All time" },
          { label: "Paid Out", value: formatPrice(data.totalPaid), icon: CheckCircle, color: "bg-green-50 text-green-600", sub: "Transferred" },
          { label: "Pending", value: formatPrice(data.totalPending), icon: Clock, color: "bg-amber-50 text-amber-600", sub: "Awaiting transfer" },
        ].map(({ label, value, icon: Icon, color, sub }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", color)}>
              <Icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* Platform fee note */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
        <CreditCard className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-blue-800">Platform Fee: 2%</p>
          <p className="text-xs text-blue-600 mt-0.5">ArtHub deducts 2% from each sale. Payouts are processed after order delivery is confirmed. Contact support for payout method setup.</p>
        </div>
      </div>

      {/* Order payout history */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Payout History</h2>
        </div>

        {data.orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <CreditCard className="w-12 h-12 text-gray-200 mb-4" />
            <p className="text-gray-400 text-sm">No payouts yet. Complete orders will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {data.orders.map(o => (
              <div key={o.id} className="flex items-center gap-4 px-6 py-4">
                <div className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                  o.stripeTransferId ? "bg-green-50" : "bg-amber-50"
                )}>
                  {o.stripeTransferId
                    ? <CheckCircle className="w-5 h-5 text-green-500" />
                    : <Clock className="w-5 h-5 text-amber-500" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {o.items[0]?.snapshotTitle}{o.items.length > 1 ? ` +${o.items.length - 1} more` : ""}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-400">
                      {new Date(o.createdAt).toLocaleDateString("en-BD", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <span className="text-xs text-gray-300">·</span>
                    <span className="text-xs text-gray-400">Sale: {formatPrice(Number(o.subtotal))}</span>
                    <span className="text-xs text-gray-300">·</span>
                    <span className="text-xs text-gray-400">Fee: {o.platformFeePercent}%</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className={cn("font-semibold", o.stripeTransferId ? "text-green-600" : "text-amber-600")}>
                    {formatPrice(Number(o.sellerPayout))}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {o.stripeTransferId ? "Paid" : "Pending"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
