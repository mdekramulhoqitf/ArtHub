"use client";

import { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft, Gavel, Clock, TrendingUp, User2, Info,
  ChevronRight, Flame, CalendarClock, CheckCircle2, Shield,
} from "lucide-react";
import { AUCTIONS } from "@/lib/auctions-data";
import { formatPrice } from "@/lib/utils";

function Countdown({ endTime }: { endTime: string }) {
  const [parts, setParts] = useState({ h: "00", m: "00", s: "00" });

  useEffect(() => {
    function calc() {
      const diff = new Date(endTime).getTime() - Date.now();
      if (diff <= 0) { setParts({ h: "00", m: "00", s: "00" }); return; }
      const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
      setParts({ h, m, s });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [endTime]);

  return (
    <div className="flex items-center gap-2">
      {[parts.h, parts.m, parts.s].map((val, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="bg-[#1a1a2e] text-white rounded-xl px-3 py-2 text-center min-w-[52px]">
            <p className="font-heading text-2xl font-bold leading-none">{val}</p>
            <p className="text-[9px] text-gray-400 mt-0.5">{["HRS", "MIN", "SEC"][i]}</p>
          </div>
          {i < 2 && <span className="font-bold text-gray-400 text-lg">:</span>}
        </div>
      ))}
    </div>
  );
}

export default function AuctionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const auctionData = AUCTIONS.find((a) => a.id === id);
  if (!auctionData) notFound();
  const auction = auctionData!;

  const [bidAmount, setBidAmount] = useState(auction.currentBid + 1000);
  const [bidPlaced, setBidPlaced] = useState(false);

  const isLive = auction.status === "LIVE";
  const isEnded = auction.status === "ENDED";

  function placeBid() {
    if (!isLive || bidAmount <= auction.currentBid) return;
    setBidPlaced(true);
    setTimeout(() => setBidPlaced(false), 3000);
  }

  return (
    <div className="min-h-screen bg-[#f5f2ea]">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Back */}
        <Link href="/auctions" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-rose-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Auctions
        </Link>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: images */}
          <div className="lg:col-span-3 space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src={auction.images[0]}
                alt={auction.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
              <div className="absolute top-4 left-4">
                {isLive && (
                  <span className="flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    <Flame className="w-3 h-3" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    LIVE NOW
                  </span>
                )}
                {auction.status === "UPCOMING" && (
                  <span className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    <CalendarClock className="w-3 h-3" /> UPCOMING
                  </span>
                )}
                {isEnded && (
                  <span className="flex items-center gap-1.5 bg-gray-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    <CheckCircle2 className="w-3 h-3" /> ENDED
                  </span>
                )}
              </div>
            </div>

            {auction.images.length > 1 && (
              <div className="flex gap-3">
                {auction.images.map((img, i) => (
                  <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-gray-200">
                    <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                  </div>
                ))}
              </div>
            )}

            {/* Details */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Info className="w-4 h-4 text-rose-500" /> Artwork Details
              </h3>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                {[
                  ["Artist", auction.artistName],
                  ["Medium", auction.medium],
                  ["Dimensions", auction.dimensions],
                  ["Year Created", auction.yearCreated],
                  ["Estimate", auction.estimatedValue],
                  ["Total Bids", auction.totalBids],
                ].map(([k, v]) => (
                  <div key={String(k)}>
                    <dt className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">{k}</dt>
                    <dd className="font-medium text-gray-900">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Right: bid panel */}
          <div className="lg:col-span-2 space-y-5">
            <div>
              <p className="text-gray-400 text-sm mb-1">{auction.artistName}</p>
              <h1 className="font-heading text-2xl font-bold text-gray-900">{auction.title}</h1>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">{auction.description}</p>

            {/* Current bid */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-gray-400 uppercase tracking-wider">{isEnded ? "Final Bid" : "Current Bid"}</p>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <TrendingUp className="w-3 h-3" /> {auction.totalBids} bids
                </span>
              </div>
              <p className="font-heading text-3xl font-bold text-rose-600 mb-1">{formatPrice(auction.currentBid)}</p>
              <p className="text-xs text-gray-400">Starting bid: {formatPrice(auction.startingBid)}</p>
            </div>

            {/* Countdown */}
            {isLive && (
              <div className="bg-white rounded-2xl border border-red-100 p-5">
                <p className="text-xs text-red-500 uppercase tracking-wider font-semibold flex items-center gap-1.5 mb-3">
                  <Clock className="w-3.5 h-3.5" /> Time Remaining
                </p>
                <Countdown endTime={auction.endTime} />
              </div>
            )}

            {auction.status === "UPCOMING" && (
              <div className="bg-blue-50 rounded-2xl border border-blue-100 p-5">
                <p className="text-xs text-blue-600 uppercase tracking-wider font-semibold mb-1">Auction Starts</p>
                <p className="font-bold text-gray-900">
                  {new Date(auction.startTime).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">
                  {new Date(auction.startTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} BST
                </p>
              </div>
            )}

            {/* Bid form */}
            {isLive && (
              <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
                <p className="text-sm font-semibold text-gray-900">Place Your Bid</p>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Your Bid (BDT)</label>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(Number(e.target.value))}
                    min={auction.currentBid + 500}
                    step={500}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-rose-400"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">Min bid: {formatPrice(auction.currentBid + 500)}</p>
                </div>
                <button
                  onClick={placeBid}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    bidPlaced
                      ? "bg-green-600 text-white"
                      : "bg-rose-600 hover:bg-rose-700 text-white"
                  }`}
                >
                  <Gavel className="w-4 h-4" />
                  {bidPlaced ? "Bid Placed! ✓" : `Bid ${formatPrice(bidAmount)}`}
                </button>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Shield className="w-3.5 h-3.5 text-green-500" />
                  Secure bidding · All bids are binding
                </div>
              </div>
            )}

            {/* Recent bids */}
            {auction.recentBids.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-rose-500" /> Bid History
                </h3>
                <div className="space-y-2">
                  {auction.recentBids.map((bid, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <User2 className="w-3.5 h-3.5 text-gray-400" /> {bid.bidder}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{formatPrice(bid.amount)}</p>
                        <p className="text-[10px] text-gray-400">{bid.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {auction.tags.map((tag) => (
                <span key={tag} className="text-xs text-gray-500 bg-white border border-gray-200 px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
