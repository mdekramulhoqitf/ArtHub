import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Truck, Award, Search, ShoppingBag, Heart } from "lucide-react";
import { BLOG_POSTS, CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/blog-data";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSlider } from "@/components/layout/hero-slider";
import { ArtCard } from "@/components/artwork/art-card";
import { ShopCard } from "@/components/shop/shop-card";
import { ExhibitionsCarousel } from "@/components/layout/exhibitions-carousel";

const FEATURED_ARTWORKS = [
  { id: "1", slug: "golden-sunset", title: "Golden Sunset", imageUrl: "/images/public_art/download (9).png", price: 450, status: "ACTIVE" as const, shopName: "Studio Lumi", shopSlug: "studio-lumi", isFeatured: true, widthCm: 60, heightCm: 80, medium: "Oil on canvas" },
  { id: "2", slug: "blue-serenity", title: "Blue Serenity", imageUrl: "/images/public_art/download (10).png", price: 320, status: "ACTIVE" as const, shopName: "Art by Nadia", shopSlug: "art-by-nadia", widthCm: 50, heightCm: 70, medium: "Watercolor" },
  { id: "3", slug: "urban-echoes", title: "Urban Echoes", imageUrl: "/images/public_art/download (11).png", price: 780, status: "ACTIVE" as const, shopName: "UrbanCanvas", shopSlug: "urban-canvas", isFeatured: true, widthCm: 90, heightCm: 120, medium: "Acrylic" },
  { id: "4", slug: "forest-dream", title: "Forest Dream", imageUrl: "/images/public_art/download (12).png", price: 210, status: "SOLD" as const, shopName: "GreenStrokes", shopSlug: "green-strokes", widthCm: 40, heightCm: 50, medium: "Gouache" },
  { id: "5", slug: "abstract-thoughts", title: "Abstract Thoughts", imageUrl: "/images/public_art/download (13).png", price: 560, status: "ACTIVE" as const, shopName: "Studio Lumi", shopSlug: "studio-lumi", widthCm: 70, heightCm: 90, medium: "Mixed media" },
  { id: "6", slug: "crimson-tide", title: "Crimson Tide", imageUrl: "/images/public_art/download (14).png", price: 390, status: "ACTIVE" as const, shopName: "RedBrush", shopSlug: "red-brush", widthCm: 55, heightCm: 75, medium: "Oil on canvas" },
  { id: "7", slug: "morning-light", title: "Morning Light", imageUrl: "/images/public_art/download (15).png", price: 680, status: "ACTIVE" as const, shopName: "Studio Lumi", shopSlug: "studio-lumi", widthCm: 80, heightCm: 100, medium: "Oil on canvas" },
  { id: "8", slug: "silent-geometry", title: "Silent Geometry", imageUrl: "/images/public_art/download (16).png", price: 290, status: "ACTIVE" as const, shopName: "GeoArt", shopSlug: "geo-art", widthCm: 45, heightCm: 45, medium: "Acrylic" },
];

const NEW_ARTWORKS = [
  { id: "9", slug: "dusk-portrait", title: "Dusk Portrait", imageUrl: "/images/public_art/download (17).png", price: 520, status: "ACTIVE" as const, shopName: "Atelier M", shopSlug: "atelier-m", widthCm: 60, heightCm: 80, medium: "Oil on linen" },
  { id: "10", slug: "coastal-wind", title: "Coastal Wind", imageUrl: "/images/public_art/download (18).png", price: 340, status: "ACTIVE" as const, shopName: "SeaStudio", shopSlug: "sea-studio", widthCm: 70, heightCm: 50, medium: "Watercolor" },
  { id: "11", slug: "night-bloom", title: "Night Bloom", imageUrl: "/images/public_art/download (19).png", price: 410, status: "ACTIVE" as const, shopName: "Flora Arts", shopSlug: "flora-arts", widthCm: 50, heightCm: 70, medium: "Photography" },
  { id: "12", slug: "red-geometry", title: "Red Geometry", imageUrl: "/images/public_art/download (20).png", price: 720, status: "ACTIVE" as const, shopName: "UrbanCanvas", shopSlug: "urban-canvas", isFeatured: true, widthCm: 100, heightCm: 100, medium: "Acrylic" },
];

const SAMPLE_SHOPS = [
  { slug: "studio-lumi", displayName: "Studio Lumi", location: "Paris, France", ratingAvg: 4.9, totalSales: 87, artworkCount: 24, isFeatured: true, bannerUrl: "/images/public_art/download (21).png" },
  { slug: "art-by-nadia", displayName: "Art by Nadia", location: "Dubai, UAE", ratingAvg: 4.7, totalSales: 52, artworkCount: 18, isFeatured: false, bannerUrl: "/images/public_art/download (22).png" },
  { slug: "urban-canvas", displayName: "Urban Canvas", location: "New York, USA", ratingAvg: 4.8, totalSales: 134, artworkCount: 41, isFeatured: true, bannerUrl: "/images/public_art/download (23).png" },
  { slug: "green-strokes", displayName: "Green Strokes", location: "London, UK", ratingAvg: 4.6, totalSales: 29, artworkCount: 12, isFeatured: false, bannerUrl: "/images/public_art/download (24).png" },
];

const CATEGORIES = [
  { label: "Paintings", href: "/browse?category=paintings", image: "/images/public_art/download (25).png", count: "840+" },
  { label: "Photography", href: "/browse?category=photography", image: "/images/public_art/download (26).png", count: "380+" },
  { label: "Sculpture", href: "/browse?category=sculptures", image: "/images/public_art/download (27).png", count: "210+" },
  { label: "Digital Art", href: "/browse?category=digital", image: "/images/public_art/download (28).png", count: "560+" },
  { label: "Drawings", href: "/browse?category=drawings", image: "/images/public_art/download (29).png", count: "290+" },
  { label: "Prints", href: "/browse?category=prints", image: "/images/public_art/download (30).png", count: "175+" },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">

        {/* Hero Slider */}
        <HeroSlider />

        {/* Welcome section */}
        <section className="bg-[#eeebe2] border-b border-[#d8d3c5]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">

              {/* Left — text */}
              <div className="flex flex-col justify-center py-20 pr-0 lg:pr-16">
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#1a1a2e] leading-tight mb-6">
                  A Marketplace<br />
                  Built for<br />
                  Original Art
                </h2>
                <p className="text-[#4a4a5a] text-sm leading-relaxed max-w-sm mb-10">
                  ArtHub connects independent artists directly with collectors worldwide. Every piece is original, every artist is verified, and every purchase supports a creator.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#1a1a2e] group w-fit"
                >
                  <span>Our Story</span>
                  <span className="w-9 h-9 rounded-full border border-[#1a1a2e] flex items-center justify-center group-hover:bg-[#1a1a2e] group-hover:text-white transition-all duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>

              {/* Right — image */}
              <div className="relative min-h-[380px] lg:min-h-0 overflow-hidden">
                <Image
                  src="/images/welcome/welcome.png"
                  alt="Welcome to Art Gallery"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

            </div>
          </div>
        </section>

        {/* Upcoming Exhibitions — carousel */}
        <ExhibitionsCarousel />

        {/* Shop by category — image grid */}
        <section className="py-20 border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">Explore</p>
                <h2 className="font-heading text-3xl font-bold text-gray-900">Shop by Category</h2>
              </div>
              <Link href="/browse" className="text-sm text-gray-500 hover:text-black underline underline-offset-4 transition-colors">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {CATEGORIES.map((cat) => (
                <Link key={cat.href} href={cat.href} className="group relative overflow-hidden aspect-square block">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 17vw"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-colors" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                    <span className="font-semibold text-sm tracking-wide">{cat.label}</span>
                    <span className="text-xs text-white/70 mt-1">{cat.count} works</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">Simple Process</p>
              <h2 className="font-heading text-3xl font-bold text-gray-900">How It Works</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-4xl mx-auto">
              {[
                {
                  step: "01",
                  icon: Search,
                  title: "Discover Art You Love",
                  desc: "Browse thousands of original works by independent artists. Filter by style, medium, size, and price.",
                },
                {
                  step: "02",
                  icon: ShoppingBag,
                  title: "Buy Directly & Securely",
                  desc: "Purchase directly from the artist. Payments secured by Stripe with full buyer protection.",
                },
                {
                  step: "03",
                  icon: Heart,
                  title: "Own Something Real",
                  desc: "Receive your artwork, a certificate of authenticity, and a direct connection to its creator.",
                },
              ].map(({ step, icon: Icon, title, desc }, i) => (
                <div key={step} className="relative flex flex-col items-center text-center px-8 py-10">
                  {i < 2 && (
                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 text-gray-200">
                      <ArrowRight className="w-8 h-8" />
                    </div>
                  )}
                  <div className="w-14 h-14 bg-rose-700 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-bold text-rose-700 tracking-[0.25em] uppercase mb-2">{step}</span>
                  <h3 className="font-heading text-lg font-bold text-gray-900 mb-3">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/how-to-buy" className="text-sm text-rose-700 underline underline-offset-4 hover:text-rose-800 transition-colors">
                Full buyer guide →
              </Link>
            </div>
          </div>
        </section>

        {/* Featured artworks — editorial grid */}
        <section className="py-20 border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">Curated Collection</p>
                <h2 className="font-heading text-3xl font-bold text-gray-900">Featured Artworks</h2>
              </div>
              <Link href="/browse" className="text-sm text-gray-500 hover:text-black underline underline-offset-4 transition-colors hidden sm:block">
                Browse all artworks
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
              {FEATURED_ARTWORKS.map((art) => (
                <ArtCard key={art.id} {...art} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/browse">
                <Button variant="outline" className="border-rose-700 text-rose-700 hover:bg-rose-700 hover:text-white transition-colors rounded-none px-10 h-12 text-sm font-semibold tracking-wide">
                  View All Artworks <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Full-bleed editorial banner */}
        <section className="relative h-[60vh] overflow-hidden">
          <Image
            src="/images/public_art/download (31).png"
            alt="Art studio"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-4">Limited Editions</p>
            <h2 className="font-heading text-4xl md:text-6xl font-bold max-w-3xl leading-tight mb-6">
              Own a Piece of<br />Something Real
            </h2>
            <p className="text-white/70 text-lg max-w-lg mb-8">
              Every artwork on ArtHub is created and sold by the artist directly. No prints. No reproductions unless stated.
            </p>
            <Link href="/browse?sort=newest">
              <Button className="bg-white text-black hover:bg-gray-100 rounded-none px-10 h-12 text-sm font-semibold tracking-wide">
                New This Week <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* New this week */}
        <section className="py-20 border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">Just Added</p>
                <h2 className="font-heading text-3xl font-bold text-gray-900">New This Week</h2>
              </div>
              <Link href="/browse?sort=newest" className="text-sm text-gray-500 hover:text-black underline underline-offset-4 transition-colors hidden sm:block">
                See all new arrivals
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
              {NEW_ARTWORKS.map((art) => (
                <ArtCard key={art.id} {...art} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Artists */}
        <section className="py-20 bg-gray-50 border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">Top Sellers</p>
                <h2 className="font-heading text-3xl font-bold text-gray-900">Featured Artists</h2>
              </div>
              <Link href="/shops" className="text-sm text-gray-500 hover:text-black underline underline-offset-4 transition-colors hidden sm:block">
                Browse all artists
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SAMPLE_SHOPS.map((shop) => (
                <ShopCard key={shop.slug} {...shop} />
              ))}
            </div>
          </div>
        </section>

        {/* Why buy here — horizontal strip */}
        <section className="py-16 border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              {[
                { icon: Shield, title: "Secure Payments", desc: "Every transaction protected by Stripe. Full buyer protection on every order." },
                { icon: Award, title: "Verified Artists", desc: "Every seller is manually reviewed. Only authentic artists and original works." },
                { icon: Truck, title: "Global Shipping", desc: "Artists ship worldwide with care. Track your artwork from studio to door." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4 px-8 py-8 first:pl-0 last:pr-0">
                  <div className="w-10 h-10 bg-rose-700 rounded flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-gray-900 border-b border-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "2,400+", label: "Artworks" },
                { value: "500+", label: "Independent Artists" },
                { value: "12,000+", label: "Collectors" },
                { value: "48", label: "Countries" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-4xl font-bold text-white mb-1">{s.value}</p>
                  <p className="text-sm text-gray-500 uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">Collector Stories</p>
              <h2 className="font-heading text-3xl font-bold text-gray-900">What Collectors Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Sarah M.", role: "Art Collector · Paris", quote: "Found my favorite painting here. Communication with the artist was incredible and shipping was perfect." },
                { name: "James L.", role: "Interior Designer · NYC", quote: "ArtHub is my go-to for sourcing unique pieces for client projects. The quality never disappoints." },
                { name: "Priya K.", role: "First-time Buyer · Dubai", quote: "Buying original art felt intimidating before ArtHub. Now I've bought three pieces and I'm hooked." },
              ].map((t) => (
                <div key={t.name} className="border border-gray-100 p-8">
                  <p className="text-sm text-gray-500 leading-relaxed mb-1">★★★★★</p>
                  <p className="text-gray-700 leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* From the Magazine */}
        {(() => {
          const posts = BLOG_POSTS.filter((p) => p.published).slice(0, 3);
          return (
            <section className="py-20 border-b border-gray-100">
              <div className="container mx-auto px-4">
                <div className="flex items-end justify-between mb-10">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">ArtHub Magazine</p>
                    <h2 className="font-heading text-3xl font-bold text-gray-900">From the Blog</h2>
                  </div>
                  <Link href="/blog" className="text-sm text-gray-500 hover:text-black underline underline-offset-4 transition-colors hidden sm:block">
                    All articles
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                      <div className="relative aspect-video overflow-hidden mb-4 bg-gray-100">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 border rounded-full mb-2 ${CATEGORY_COLORS[post.category]}`}>
                        {CATEGORY_LABELS[post.category]}
                      </span>
                      <h3 className="font-heading text-base font-bold text-gray-900 line-clamp-2 group-hover:text-rose-700 transition-colors mb-1">
                        {post.title}
                      </h3>
                      <p className="text-xs text-gray-400">{post.authorName} · {post.readTime} min read</p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        })()}

        {/* Seller CTA */}
        <section className="py-24 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">For Artists</p>
              <h2 className="font-heading text-5xl font-bold mb-5 leading-tight">
                Sell Your Art to<br />the World
              </h2>
              <p className="text-white/60 text-lg mb-4 max-w-lg mx-auto leading-relaxed">
                Open your free shop in minutes. Set your own prices. We handle payments and connect you with collectors globally.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-sm text-white/40">
                <span>✓ Free to open</span>
                <span>✓ Only 2% per sale</span>
                <span>✓ Direct Stripe payouts</span>
                <span>✓ Full inventory control</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/seller/shop/create">
                  <Button className="bg-white text-black hover:bg-gray-100 rounded-none px-10 h-13 text-sm font-semibold tracking-wide">
                    Open Your Shop — Free <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/browse">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-none px-10 h-13 text-sm font-semibold tracking-wide">
                    Browse as Buyer
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-[#eeebe2] border-b border-[#d8d3c5]">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">Stay in the Loop</p>
              <h2 className="font-heading text-2xl font-bold text-[#1a1a2e] mb-3">
                New Art, Every Week
              </h2>
              <p className="text-sm text-gray-500 mb-7 leading-relaxed">
                Get curated picks, artist spotlights, and new arrivals delivered to your inbox. No spam, unsubscribe anytime.
              </p>
              <NewsletterForm />
              <p className="text-[11px] text-gray-400 mt-3">
                Joining 12,000+ collectors worldwide.
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
