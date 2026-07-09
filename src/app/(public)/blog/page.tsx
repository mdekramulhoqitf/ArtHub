"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Clock, Search, Tag, ArrowRight, TrendingUp } from "lucide-react";
import { BLOG_POSTS, CATEGORY_LABELS, CATEGORY_COLORS, type BlogCategory } from "@/lib/blog-data";

const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS) as BlogCategory[];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "ALL">("ALL");
  const [search, setSearch] = useState("");

  const published = BLOG_POSTS.filter((p) => p.published);

  const filtered = published.filter((p) => {
    const matchCat = activeCategory === "ALL" || p.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  const featured = published[0];
  const rest = filtered.filter((p) => p.slug !== featured?.slug);
  const showFeatured = activeCategory === "ALL" && !search && featured;

  return (
    <div className="min-h-screen bg-[#f5f2ea]">
      {/* Hero */}
      <div className="bg-[#1a1a2e] text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-rose-400" />
            <span className="text-rose-400 font-semibold text-sm uppercase tracking-widest">ArtHub Magazine</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Art Stories, Techniques<br />& Inspiration
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Deep dives into Bangladeshi art history, painting techniques, artist interviews, and the modern art scene.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        {/* Search + Filters */}
        <div className="space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-rose-400"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory("ALL")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                activeCategory === "ALL"
                  ? "bg-[#1a1a2e] text-white border-[#1a1a2e]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              All Articles
            </button>
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  activeCategory === cat
                    ? "bg-[#1a1a2e] text-white border-[#1a1a2e]"
                    : `bg-white border-gray-200 hover:border-gray-400 text-gray-600`
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        </div>

        {/* Featured post */}
        {showFeatured && (
          <Link href={`/blog/${featured.slug}`} className="block group">
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="grid md:grid-cols-2">
                <div className="relative aspect-video md:aspect-auto md:min-h-72 overflow-hidden bg-gray-100">
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[featured.category]}`}>
                      {CATEGORY_LABELS[featured.category]}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <TrendingUp className="w-2.5 h-2.5" /> FEATURED
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3 group-hover:text-rose-700 transition-colors leading-snug">
                    {featured.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="font-medium text-gray-600">{featured.authorName}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featured.readTime} min read</span>
                    </div>
                    <span className="flex items-center gap-1 text-rose-600 text-sm font-semibold">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Article grid */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl py-20 text-center border border-gray-100">
            <BookOpen className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 text-sm">No articles found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(showFeatured ? rest : filtered).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:border-rose-100 transition-all h-full flex flex-col">
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-2 left-2">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[post.category]}`}>
                        {CATEGORY_LABELS[post.category]}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2 group-hover:text-rose-700 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed mb-4 flex-1 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-50">
                      <span className="font-medium text-gray-600 truncate max-w-[120px]">{post.authorName}</span>
                      <span className="flex items-center gap-1 shrink-0">
                        <Clock className="w-3 h-3" /> {post.readTime} min
                      </span>
                    </div>
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2.5">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="flex items-center gap-0.5 text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                            <Tag className="w-2.5 h-2.5" /> {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
