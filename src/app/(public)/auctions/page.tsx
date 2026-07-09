"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Gavel, Clock, TrendingUp, Eye, ArrowRight, Flame, CalendarClock, CheckCircle2 } from "lucide-react";
import { AUCTIONS, type AuctionStatus } from "@/lib/auctions-data";
import { formatPrice } from "@/lib/utils";

function Countdown({ endTime }: { endTime: string }) {
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    function calc() {
      const diff = new Date(endTime).getTime() - Date.now();
      if (diff <= 0) { setRemaining("Ended"); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setRemaining(`${h}h ${m}m ${s}s`);
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [endTime]);

  return <span>{remaining}</span>;
}

const STATUS_FILTER: { value: AuctionStatus | "ALL"; label: string }[] = [
  { value: "ALL", label: "All Auctions" },
  { value: "LIVE", label: "Live Now" },
  { value: "UPCOMING", label: "Upcoming" },
  { value: "ENDED", label: "Ended" },
];

const STATUS_CONFIG = {
  LIVE: { label: "Live", icon: Flame, color: "bg-red-50 text-red-600 border-red-200", dot: "bg-red-500 animate-pulse" },
  UPCOMING: { label: "Upcoming", icon: CalendarClock, color: "bg-blue-50 text-blue-600 border-blue-200", dot: "bg-blue-400" },
  ENDED: { label: "Ended", icon: CheckCircle2, color: "bg-gray-100 text-gray-500 border-gray-200", dot: "bg-gray-400" },
};

export default function AuctionsPage() {
  const [filter, setFilter] = useState<AuctionStatus | "ALL">("ALL");

  const filtered = filter === "ALL" ? AUCTIONS : AUCTIONS.filter((a) => a.status === filter);
  const live = AUCTIONS.filter((a) => a.status === "LIVE");

  return (
    <div className="min-h-screen bg-[#f5f2ea]">
      {/* Hero */}
      <div className="bg-[#1a1a2e] text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gavel className="w-6 h-6 text-rose-400" />
            <span className="text-rose-400 font-semibold text-sm uppercase tracking-widest">Live Auctions</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Bid on Exceptional Art</h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Compete for rare, museum-quality Bangladeshi artworks. Every bid is a chance to own something extraordinary.
          </p>
          <div className="flex items-center justify-center gap-8 mt-8">
            {[
              { label: "Live Auctions", value: live.length },
              { label: "Total Artworks", value: AUCTIONS.length },
              { label: "Active Bidders", value: "50+" },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="font-heading text-3xl font-bold text-white">{value}</p>
                <p className="text-gray-400 text-xs mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTER.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                filter === value
                  ? "bg-[#1a1a2e] text-white border-[#1a1a2e]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              {label}
              {value !== "ALL" && (
                <span className="ml-1.5 text-[10px] opacity-70">
                  ({AUCTIONS.filter((a) => a.status === value).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Auction cards */}
        <div className="space-y-6">
          {filtered.map((auction) => {
            const cfg = STATUS_CONFIG[auction.status];
            const StatusIcon = cfg.icon;
            const isLive = auction.status === "LIVE";
            const isEnded = auction.status === "ENDED";

            return (
              <Link key={auction.id} href={`/auctions/${auction.id}`} className="block group">
                <div className="bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:border-rose-100 transition-all overflow-hidden">
                  <div className="grid md:grid-cols-5">
                    {/* Image */}
                    <div className="relative aspect-square md:aspect-auto md:col-span-2 overflow-hidden bg-gray-100">
                      <Image
                        src={auction.imageUrl}
                        alt={auction.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                          {cfg.label}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="md:col-span-3 p-6 flex flex-col justify-between">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">{auction.artistName}</p>
                        <h2 className="font-heading text-xl font-bold text-gray-900 mb-2 group-hover:text-rose-700 transition-colors">
                          {auction.title}
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">{auction.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {auction.tags.map((tag) => (
                            <span key={tag} className="text-[10px] bg-gray-50 text-gray-500 border border-gray-100 px-2 py-0.5 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">{isEnded ? "Final Bid" : "Current Bid"}</p>
                          <p className="font-bold text-rose-600 text-lg">{formatPrice(auction.currentBid)}</p>
                          {auction.startingBid !== auction.currentBid && (
                            <p className="text-[10px] text-gray-400">Started at {formatPrice(auction.startingBid)}</p>
                          )}
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">
                            {isEnded ? "Total Bids" : "Bids"}
                          </p>
                          <p className="font-bold text-gray-900 flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5 text-rose-400" /> {auction.totalBids}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">
                            {isLive ? "Ends In" : isEnded ? "Ended" : "Starts"}
                          </p>
                          <p className="font-bold text-gray-900 text-sm flex items-center gap-1">
                            <Clock className={`w-3.5 h-3.5 ${isLive ? "text-red-500" : "text-gray-400"}`} />
                            {isLive ? <Countdown endTime={auction.endTime} /> : isEnded ? "Closed" : new Date(auction.startTime).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {isLive && (
                          <span className="flex-1 flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors">
                            <Gavel className="w-4 h-4" /> Place Bid
                          </span>
                        )}
                        {!isLive && (
                          <span className="flex-1 flex items-center justify-center gap-2 bg-[#1a1a2e] hover:bg-gray-800 text-white py-2.5 rounded-xl text-sm font-medium transition-colors">
                            <Eye className="w-4 h-4" /> View Details <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        )}
                        <span className="text-xs text-gray-400 shrink-0">Est. {auction.estimatedValue}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA for sellers */}
        <div className="bg-[#1a1a2e] rounded-2xl p-8 text-white text-center">
          <Gavel className="w-10 h-10 text-rose-400 mx-auto mb-3" />
          <h3 className="font-heading text-xl font-bold mb-2">Sell Through Auction</h3>
          <p className="text-gray-400 text-sm mb-5 max-w-md mx-auto">
            Have a special piece ready for auction? Our team can feature it in the next live sale. Contact us to get started.
          </p>
          <Link href="/contact?subject=auction" className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors">
            Apply to Auction <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
