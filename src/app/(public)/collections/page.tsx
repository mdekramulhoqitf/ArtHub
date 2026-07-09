import Link from "next/link";
import Image from "next/image";
import { Layers, ArrowRight, Sparkles } from "lucide-react";
import { COLLECTIONS } from "@/lib/collections-data";

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-[#f5f2ea]">
      {/* Hero */}
      <div className="bg-[#1a1a2e] text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Layers className="w-6 h-6 text-rose-400" />
            <span className="text-rose-400 font-semibold text-sm uppercase tracking-widest">Curated Collections</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Art, Expertly Curated</h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Handpicked selections by theme, style, budget, and occasion — making it easier to find exactly the right artwork.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-6">
        {/* Featured top 2 */}
        <div className="grid md:grid-cols-2 gap-6">
          {COLLECTIONS.slice(0, 2).map((col) => (
            <Link key={col.slug} href={`/collections/${col.slug}`} className="group relative overflow-hidden rounded-2xl h-64 block">
              <Image
                src={col.coverImage}
                alt={col.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${col.accentColor} opacity-80`} />
              <div className="absolute inset-0 p-7 flex flex-col justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-white/80" />
                  <span className="text-white/80 text-xs font-semibold uppercase tracking-widest">Featured</span>
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-white mb-1">{col.title}</h2>
                  <p className="text-white/80 text-sm mb-4">{col.subtitle}</p>
                  <div className="flex items-center gap-2 text-white text-sm font-semibold group-hover:gap-3 transition-all">
                    Explore {col.artworks.length} works <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Rest grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COLLECTIONS.slice(2).map((col) => (
            <Link key={col.slug} href={`/collections/${col.slug}`} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-rose-100 transition-all">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={col.coverImage}
                  alt={col.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${col.accentColor} opacity-70`} />
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-heading text-lg font-bold text-white">{col.title}</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">{col.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {col.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-rose-600 text-xs font-semibold group-hover:gap-2 transition-all">
                    View <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
