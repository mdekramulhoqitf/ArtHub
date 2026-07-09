import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about ArtHub — the marketplace connecting independent artists with art lovers worldwide.",
};

const values = [
  {
    icon: "🎨",
    title: "Artist First",
    desc: "Every decision we make starts with what's best for the creator. Artists keep up to 98% of every sale.",
  },
  {
    icon: "🌍",
    title: "Global Reach",
    desc: "We connect artists and collectors across 80+ countries, making original art accessible everywhere.",
  },
  {
    icon: "🔒",
    title: "Trusted & Secure",
    desc: "Secure payments, verified sellers, and buyer protection on every transaction.",
  },
  {
    icon: "✨",
    title: "Curated Quality",
    desc: "Every artwork is reviewed by our team to ensure authenticity and creative merit.",
  },
];

const stats = [
  { value: "12,000+", label: "Artists" },
  { value: "80+", label: "Countries" },
  { value: "250,000+", label: "Artworks" },
  { value: "BDT 18Cr+", label: "Paid to Artists" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-linear-to-br from-rose-50 via-white to-gray-50 border-b border-gray-100 py-24 px-4 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-rose-600 uppercase mb-4">Our Story</p>
        <h1 className="font-heading text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Art for Everyone,<br />
          <span className="text-rose-600">Everywhere.</span>
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
          ArtHub was founded with one belief: original art shouldn't be locked inside galleries. We built a marketplace where independent artists thrive and collectors discover work that moves them.
        </p>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-100 py-14 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-heading text-4xl font-bold text-rose-600 mb-1">{s.value}</p>
                <p className="text-gray-500 text-sm font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="container mx-auto px-4 py-20 max-w-3xl text-center">
        <h2 className="font-heading text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-4">
          We exist to make the art world more open, more diverse, and more fair. By removing the gatekeepers and reducing fees to just 2%, we ensure artists earn what they deserve.
        </p>
        <p className="text-gray-600 text-lg leading-relaxed">
          Whether you're an emerging painter in Dhaka or an established sculptor in Paris — ArtHub is your global stage.
        </p>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="container mx-auto">
          <h2 className="font-heading text-3xl font-bold text-center text-gray-900 mb-12">What We Stand For</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-3xl block mb-4">{v.icon}</span>
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-rose-700 text-white text-center py-16 px-4">
        <h2 className="font-heading text-3xl font-bold mb-3">Join the ArtHub Community</h2>
        <p className="text-rose-100 max-w-md mx-auto mb-8 text-sm leading-relaxed">
          Browse thousands of original artworks or start selling your own — it's free to join.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/browse" className="bg-white text-rose-700 font-semibold text-sm px-8 py-3 rounded-xl hover:bg-rose-50 transition-colors">
            Browse Art
          </Link>
          <Link href="/register" className="bg-rose-800 text-white font-semibold text-sm px-8 py-3 rounded-xl hover:bg-rose-900 transition-colors border border-rose-600">
            Start Selling
          </Link>
        </div>
      </section>
    </main>
  );
}
