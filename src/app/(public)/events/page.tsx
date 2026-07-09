"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Clock, Ticket, ExternalLink, Search, Star } from "lucide-react";
import { EVENTS, EVENT_TYPE_LABELS, EVENT_TYPE_COLORS, type EventType } from "@/lib/events-data";

const ALL_TYPES = Object.keys(EVENT_TYPE_LABELS) as EventType[];

function formatDateRange(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  if (start === end) return s.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  if (s.getMonth() === e.getMonth()) {
    return `${s.toLocaleDateString("en-US", opts)} – ${e.getDate()}, ${e.getFullYear()}`;
  }
  return `${s.toLocaleDateString("en-US", opts)} – ${e.toLocaleDateString("en-US", opts)}, ${e.getFullYear()}`;
}

function isUpcoming(start: string) {
  return new Date(start).getTime() > Date.now();
}

export default function EventsPage() {
  const [typeFilter, setTypeFilter] = useState<EventType | "ALL">("ALL");
  const [search, setSearch] = useState("");
  const [showPast, setShowPast] = useState(false);

  const filtered = EVENTS.filter((e) => {
    if (!showPast && !isUpcoming(e.startDate)) return false;
    if (typeFilter !== "ALL" && e.type !== typeFilter) return false;
    const q = search.toLowerCase();
    return !q || e.title.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q) || e.city.toLowerCase().includes(q);
  });

  const featured = EVENTS.filter((e) => e.featured && isUpcoming(e.startDate));

  return (
    <div className="min-h-screen bg-[#f5f2ea]">
      {/* Hero */}
      <div className="bg-[#1a1a2e] text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="w-6 h-6 text-rose-400" />
            <span className="text-rose-400 font-semibold text-sm uppercase tracking-widest">Events Calendar</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Art Events in Bangladesh</h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Exhibitions, workshops, auctions, and artist talks — your guide to the Bangladeshi art scene.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        {/* Featured events */}
        {featured.length > 0 && (
          <div>
            <h2 className="font-heading text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-rose-500 fill-rose-500" /> Featured Events
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featured.slice(0, 2).map((event) => (
                <div key={event.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${EVENT_TYPE_COLORS[event.type]}`}>
                        {EVENT_TYPE_LABELS[event.type]}
                      </span>
                      <h3 className="font-heading text-white font-bold mt-1 leading-snug">{event.title}</h3>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Calendar className="w-3.5 h-3.5 text-rose-400" />
                      {formatDateRange(event.startDate, event.endDate)}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      {event.venue}, {event.city}
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className={`text-xs font-semibold ${event.isFree ? "text-green-600" : "text-gray-700"}`}>
                        {event.isFree ? "Free Entry" : event.price}
                      </span>
                      {event.ticketUrl && (
                        <Link href={event.ticketUrl} className="flex items-center gap-1 text-xs text-rose-600 font-medium hover:underline">
                          <Ticket className="w-3 h-3" /> Register
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-rose-400 w-52"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={showPast}
                onChange={(e) => setShowPast(e.target.checked)}
                className="rounded"
              />
              Show past events
            </label>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTypeFilter("ALL")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                typeFilter === "ALL" ? "bg-[#1a1a2e] text-white border-[#1a1a2e]" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              All Types
            </button>
            {ALL_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  typeFilter === type ? "bg-[#1a1a2e] text-white border-[#1a1a2e]" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
              >
                {EVENT_TYPE_LABELS[type]}
              </button>
            ))}
          </div>
        </div>

        {/* Event list */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 py-20 text-center">
            <Calendar className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 text-sm">No events found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((event) => {
              const past = !isUpcoming(event.startDate);
              return (
                <div key={event.id} className={`bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group ${past ? "opacity-70" : ""}`}>
                  <div className="grid sm:grid-cols-4 gap-0">
                    {/* Date block */}
                    <div className="sm:col-span-1 bg-[#1a1a2e] flex flex-col items-center justify-center py-6 px-4 text-center min-h-[100px]">
                      <p className="text-rose-400 text-xs font-semibold uppercase tracking-widest">
                        {new Date(event.startDate).toLocaleDateString("en-US", { month: "short" })}
                      </p>
                      <p className="font-heading text-3xl font-bold text-white">
                        {new Date(event.startDate).getDate()}
                      </p>
                      {event.startDate !== event.endDate && (
                        <p className="text-gray-400 text-xs mt-1">
                          – {new Date(event.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </p>
                      )}
                    </div>

                    {/* Info */}
                    <div className="sm:col-span-3 p-5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border mr-2 ${EVENT_TYPE_COLORS[event.type]}`}>
                              {EVENT_TYPE_LABELS[event.type]}
                            </span>
                            {past && <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Past</span>}
                          </div>
                          {event.isFree ? (
                            <span className="text-xs font-semibold text-green-600 shrink-0">Free</span>
                          ) : (
                            <span className="text-xs font-semibold text-gray-700 shrink-0">{event.price}</span>
                          )}
                        </div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-rose-700 transition-colors mb-2">
                          {event.title}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-2">{event.description}</p>
                      </div>
                      <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {event.venue}, {event.city}
                          </span>
                          {event.startTime && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {event.startTime}
                            </span>
                          )}
                        </div>
                        {event.ticketUrl && !past && (
                          <Link
                            href={event.ticketUrl}
                            className="flex items-center gap-1 text-xs text-rose-600 font-semibold hover:text-rose-700 transition-colors"
                          >
                            <Ticket className="w-3.5 h-3.5" /> Register <ExternalLink className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Submit event CTA */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <Calendar className="w-10 h-10 text-rose-400 mx-auto mb-3" />
          <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Have an Event to Share?</h3>
          <p className="text-gray-500 text-sm mb-4 max-w-md mx-auto">
            Submit your gallery opening, workshop, or exhibition to be listed on ArtHub's events calendar.
          </p>
          <Link
            href="/contact?subject=event"
            className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors"
          >
            Submit an Event
          </Link>
        </div>
      </div>
    </div>
  );
}
