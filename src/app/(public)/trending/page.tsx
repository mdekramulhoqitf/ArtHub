"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TrendingUp, Heart, Eye, ArrowRight, Flame, Star, Clock } from "lucide-react";
import { formatPrice } from "@/lib/utils";

type Period = "today" | "week" | "month";

const TRENDING_DATA: Record<Period, { id: string; rank: number; title: string; artistName: string; shopSlug: string; imageUrl: string; price: number; medium: string; slug: string; views: number; saves: number; trend: number }[]> = {
  today: [
    { id: "1", rank: 1, title: "The Padma at Dusk", artistName: "Rana Begum", shopSlug: "rana-begum", imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600", price: 12500, medium: "Oil on linen", slug: "padma-at-dusk", views: 348, saves: 41, trend: 82 },
    { id: "2", rank: 2, title: "Nakshi Dreams", artistName: "Dilara Jolly", shopSlug: "jolly-textile", imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600", price: 8700, medium: "Thread on cotton", slug: "nakshi-dreams", views: 291, saves: 38, trend: 67 },
    { id: "3", rank: 3, title: "Monsoon Study III", artistName: "Parisa Ahmed", shopSlug: "parisa-fine-art", imageUrl: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600", price: 5400, medium: "Watercolor", slug: "monsoon-study-iii", views: 247, saves: 29, trend: 54 },
    { id: "4", rank: 4, title: "Old Dhaka Fragments", artistName: "Moinul Islam", shopSlug: "moinul-studio", imageUrl: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600", price: 18000, medium: "Mixed media", slug: "old-dhaka-fragments", views: 203, saves: 24, trend: 43 },
    { id: "5", rank: 5, title: "Abstract Thoughts", artistName: "Studio Lumi", shopSlug: "studio-lumi", imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600", price: 5600, medium: "Mixed media", slug: "abstract-thoughts", views: 189, saves: 21, trend: 38 },
    { id: "6", rank: 6, title: "Blue Serenity", artistName: "Art by Nadia", shopSlug: "art-by-nadia", imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600", price: 3200, medium: "Watercolor", slug: "blue-serenity", views: 167, saves: 18, trend: 31 },
  ],
  week: [
    { id: "3", rank: 1, title: "Monsoon Study III", artistName: "Parisa Ahmed", shopSlug: "parisa-fine-art", imageUrl: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600", price: 5400, medium: "Watercolor", slug: "monsoon-study-iii", views: 1840, saves: 193, trend: 94 },
    { id: "1", rank: 2, title: "The Padma at Dusk", artistName: "Rana Begum", shopSlug: "rana-begum", imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600", price: 12500, medium: "Oil on linen", slug: "padma-at-dusk", views: 1629, saves: 174, trend: 88 },
    { id: "5", rank: 3, title: "Abstract Thoughts", artistName: "Studio Lumi", shopSlug: "studio-lumi", imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600", price: 5600, medium: "Mixed media", slug: "abstract-thoughts", views: 1402, saves: 158, trend: 71 },
    { id: "4", rank: 4, title: "Old Dhaka Fragments", artistName: "Moinul Islam", shopSlug: "moinul-studio", imageUrl: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600", price: 18000, medium: "Mixed media", slug: "old-dhaka-fragments", views: 1198, saves: 131, trend: 62 },
    { id: "2", rank: 5, title: "Nakshi Dreams", artistName: "Dilara Jolly", shopSlug: "jolly-textile", imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600", price: 8700, medium: "Thread on cotton", slug: "nakshi-dreams", views: 1043, saves: 119, trend: 54 },
    { id: "6", rank: 6, title: "Blue Serenity", artistName: "Art by Nadia", shopSlug: "art-by-nadia", imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600", price: 3200, medium: "Watercolor", slug: "blue-serenity", views: 892, saves: 97, trend: 41 },
  ],
  month: [
    { id: "4", rank: 1, title: "Old Dhaka Fragments", artistName: "Moinul Islam", shopSlug: "moinul-studio", imageUrl: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600", price: 18000, medium: "Mixed media", slug: "old-dhaka-fragments", views: 7240, saves: 812, trend: 98 },
    { id: "2", rank: 2, title: "Nakshi Dreams", artistName: "Dilara Jolly", shopSlug: "jolly-textile", imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600", price: 8700, medium: "Thread on cotton", slug: "nakshi-dreams", views: 6401, saves: 730, trend: 91 },
    { id: "1", rank: 3, title: "The Padma at Dusk", artistName: "Rana Begum", shopSlug: "rana-begum", imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600", price: 12500, medium: "Oil on linen", slug: "padma-at-dusk", views: 5988, saves: 641, trend: 84 },
    { id: "3", rank: 4, title: "Monsoon Study III", artistName: "Parisa Ahmed", shopSlug: "parisa-fine-art", imageUrl: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600", price: 5400, medium: "Watercolor", slug: "monsoon-study-iii", views: 5102, saves: 569, trend: 76 },
    { id: "5", rank: 5, title: "Abstract Thoughts", artistName: "Studio Lumi", shopSlug: "studio-lumi", imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600", price: 5600, medium: "Mixed media", slug: "abstract-thoughts", views: 4730, saves: 508, trend: 68 },
    { id: "6", rank: 6, title: "Blue Serenity", artistName: "Art by Nadia", shopSlug: "art-by-nadia", imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600", price: 3200, medium: "Watercolor", slug: "blue-serenity", views: 4210, saves: 447, trend: 59 },
  ],
};

const RANK_COLORS = ["text-amber-500", "text-gray-400", "text-amber-700", "text-gray-500", "text-gray-500", "text-gray-500"];

export default function TrendingPage() {
  const [period, setPeriod] = useState<Period>("today");
  const artworks = TRENDING_DATA[period];

  return (
    <div className="min-h-screen bg-[#f5f2ea]">
      {/* Hero */}
      <div className="bg-[#1a1a2e] text-white py-14 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flame className="w-6 h-6 text-rose-400" />
            <span className="text-rose-400 font-semibold text-sm uppercase tracking-widest">Trending Now</span>
          </div>
          <h1 className="font-heading text-4xl font-bold mb-3">What Collectors Are Watching</h1>
          <p className="text-gray-400 max-w-md mx-auto">Most viewed and saved artworks on ArtHub — updated in real time.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        {/* Period toggle */}
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 w-fit">
          {([["today", "Today"], ["week", "This Week"], ["month", "This Month"]] as [Period, string][]).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setPeriod(val)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                period === val ? "bg-[#1a1a2e] text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* #1 Featured */}
        <Link href={`/artwork/${artworks[0].slug}`} className="group block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
          <div className="grid md:grid-cols-2">
            <div className="relative h-72 md:h-auto overflow-hidden bg-gray-100">
              <Image src={artworks[0].imageUrl} alt={artworks[0].title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="absolute top-4 left-4 bg-amber-400 text-amber-900 font-bold text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-900" /> #1 Trending
              </div>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <p className="text-gray-400 text-sm mb-1">{artworks[0].artistName}</p>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2 group-hover:text-rose-700 transition-colors">{artworks[0].title}</h2>
              <p className="text-gray-400 text-sm mb-5">{artworks[0].medium}</p>
              <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                <span className="flex items-center gap-1.5"><Eye className="w-4 h-4 text-rose-400" /> {artworks[0].views.toLocaleString()} views</span>
                <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-rose-400" /> {artworks[0].saves} saves</span>
                <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-green-500" /> +{artworks[0].trend}% this {period}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-heading text-2xl font-bold text-rose-600">{formatPrice(artworks[0].price)}</p>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-rose-600 group-hover:gap-2.5 transition-all">View <ArrowRight className="w-4 h-4" /></span>
              </div>
            </div>
          </div>
        </Link>

        {/* Rest list */}
        <div className="space-y-3">
          {artworks.slice(1).map((art) => (
            <Link key={art.id} href={`/artwork/${art.slug}`} className="group flex items-center gap-5 bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md hover:border-rose-100 transition-all">
              <span className={`font-heading text-2xl font-bold w-8 text-center shrink-0 ${RANK_COLORS[art.rank - 1] ?? "text-gray-400"}`}>
                {art.rank}
              </span>
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                <Image src={art.imageUrl} alt={art.title} fill className="object-cover" sizes="64px" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400">{art.artistName}</p>
                <p className="font-semibold text-gray-900 group-hover:text-rose-700 transition-colors truncate">{art.title}</p>
                <p className="text-xs text-gray-400">{art.medium}</p>
              </div>
              <div className="hidden sm:flex items-center gap-5 text-xs text-gray-400 shrink-0">
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {art.views.toLocaleString()}</span>
                <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-rose-400" /> {art.saves}</span>
                <span className="flex items-center gap-1 text-green-600 font-semibold"><TrendingUp className="w-3 h-3" /> +{art.trend}%</span>
              </div>
              <p className="font-bold text-rose-600 shrink-0">{formatPrice(art.price)}</p>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/browse" className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 hover:border-[#1a1a2e] hover:text-[#1a1a2e] px-8 py-3 rounded-xl text-sm font-medium transition-colors">
            Browse All Artworks <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
