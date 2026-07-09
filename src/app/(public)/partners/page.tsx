import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Partners",
  description: "Meet the trusted partners and collaborators who power the ArtHub marketplace.",
};

const partners = Array.from({ length: 29 }, (_, i) => ({
  id: i + 60,
  src: `/images/partners/image ${i + 60}.png`,
  alt: `Partner ${i + 60}`,
}));

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-gray-50 border-b border-gray-100 py-20 text-center px-4">
        <p className="text-xs font-semibold tracking-[0.2em] text-rose-600 uppercase mb-4">
          Trusted Collaborations
        </p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Our Partners
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
          We work with world-class galleries, institutions, and platforms to bring the finest art experiences to our community.
        </p>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {partners.map((p) => (
            <div
              key={p.id}
              className="group flex items-center justify-center bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-rose-100 transition-all duration-300"
            >
              <div className="relative w-full aspect-[3/2]">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-rose-700 text-white text-center py-16 px-4">
        <h2 className="font-heading text-3xl font-bold mb-3">Become a Partner</h2>
        <p className="text-rose-100 max-w-md mx-auto mb-8 text-sm leading-relaxed">
          Join our growing network of galleries, publishers, and platforms shaping the future of art commerce.
        </p>
        <a
          href="/contact"
          className="inline-block bg-white text-rose-700 font-semibold text-sm px-8 py-3 rounded-xl hover:bg-rose-50 transition-colors"
        >
          Get in Touch
        </a>
      </section>
    </main>
  );
}
