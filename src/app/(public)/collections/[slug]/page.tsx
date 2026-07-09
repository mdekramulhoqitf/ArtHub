import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Tag } from "lucide-react";
import { COLLECTIONS } from "@/lib/collections-data";
import { formatPrice } from "@/lib/utils";

export default async function CollectionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const col = COLLECTIONS.find((c) => c.slug === slug);
  if (!col) notFound();

  return (
    <div className="min-h-screen bg-[#f5f2ea]">
      {/* Hero banner */}
      <div className={`relative h-72 overflow-hidden`}>
        <Image src={col.coverImage} alt={col.title} fill className="object-cover" sizes="100vw" priority />
        <div className={`absolute inset-0 bg-gradient-to-br ${col.accentColor} opacity-80`} />
        <div className="absolute inset-0 flex flex-col justify-end p-8 max-w-5xl mx-auto">
          <Link href="/collections" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-4 transition-colors w-fit">
            <ArrowLeft className="w-4 h-4" /> All Collections
          </Link>
          <h1 className="font-heading text-4xl font-bold text-white mb-2">{col.title}</h1>
          <p className="text-white/80 text-lg">{col.subtitle}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        {/* Description + tags */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col sm:flex-row gap-6 items-start">
          <div className="flex-1">
            <p className="text-gray-600 leading-relaxed">{col.description}</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:max-w-[200px]">
            {col.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                <Tag className="w-2.5 h-2.5" /> {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Artworks grid */}
        {col.artworks.length === 0 ? (
          <div className="bg-white rounded-2xl py-20 text-center border border-gray-100">
            <p className="text-gray-400 text-sm">New works being added to this collection soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {col.artworks.map((art) => (
              <Link key={art.id} href={`/artwork/${art.slug}`} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:border-rose-100 transition-all block">
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={art.imageUrl}
                    alt={art.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-400 truncate">{art.artistName}</p>
                  <p className="text-sm font-semibold text-gray-900 line-clamp-1 mt-0.5 group-hover:text-rose-700 transition-colors">
                    {art.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{art.medium}</p>
                  <p className="font-bold text-rose-600 text-sm mt-1">{formatPrice(art.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Browse more CTA */}
        <div className="bg-[#1a1a2e] rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
          <div>
            <p className="font-heading text-lg font-bold">Looking for more?</p>
            <p className="text-gray-400 text-sm mt-1">Browse thousands of original artworks from Bangladeshi artists.</p>
          </div>
          <Link
            href="/browse"
            className="shrink-0 flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors"
          >
            Browse All Art <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
