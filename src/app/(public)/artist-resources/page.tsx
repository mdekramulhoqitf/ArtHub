import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Camera, DollarSign, Users, ArrowRight, ExternalLink } from "lucide-react";

export const metadata: Metadata = { title: "Artist Resources" };

const GUIDES = [
  {
    icon: Camera,
    title: "Photographing Your Art",
    desc: "Natural light, flat-lay setup, colour calibration — how to take listing photos that make your work look its best and sell faster.",
    tag: "Guide",
    color: "bg-rose-50 text-rose-700",
  },
  {
    icon: DollarSign,
    title: "Pricing Your Work",
    desc: "A practical framework for pricing original art — factoring in materials, time, size, and market positioning without underselling yourself.",
    tag: "Guide",
    color: "bg-violet-50 text-violet-700",
  },
  {
    icon: BookOpen,
    title: "Writing Listing Descriptions",
    desc: "What collectors want to know: medium, dimensions, inspiration, process. Templates and examples for compelling artwork descriptions.",
    tag: "Template",
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: Users,
    title: "Building Your Following",
    desc: "How to grow your ArtHub shop through consistent posting, social media, and engaging with the collector community.",
    tag: "Strategy",
    color: "bg-amber-50 text-amber-700",
  },
];

const FAQ = [
  { q: "How do I get my shop featured?", a: "Featured shops are selected by our curation team based on work quality, listing completeness, and positive reviews. Keep your shop updated and respond to enquiries promptly." },
  { q: "Can I list both originals and prints?", a: "Yes. You can list original works, limited edition prints, and open-edition reproductions in the same shop. Each listing must clearly indicate its type." },
  { q: "What resolution should my photos be?", a: "Upload photos at a minimum of 2000px on the longest side. We recommend 3000px+. Use sRGB colour space and save as JPEG at 90% quality." },
  { q: "Can I offer commissions through ArtHub?", a: "Yes. Enable the commissions feature in your shop settings and set your commission terms, starting price, and turnaround time." },
  { q: "How does the certificate of authenticity work?", a: "When you fulfil an order, ArtHub automatically generates a digital certificate of authenticity linked to the buyer's account. You can also include a physical signed certificate in your packaging." },
];

export default function ArtistResourcesPage() {
  return (
    <div className="min-h-screen bg-[#f5f2ea]">
      {/* Hero */}
      <div className="bg-[#1a1a2e] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-rose-400 mb-2">For Artists</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Artist Resources</h1>
          <p className="text-white/50 max-w-xl leading-relaxed">
            Guides, templates, and advice to help you set up your shop, price your work, and grow your collector base on ArtHub.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 space-y-16">

        {/* Guides */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-[#1a1a2e] mb-8">Seller Guides</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {GUIDES.map(({ icon: Icon, title, desc, tag, color }) => (
              <div key={title} className="bg-white border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-gray-50 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#1a1a2e]" />
                  </div>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full ${color}`}>{tag}</span>
                </div>
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="bg-white border border-gray-100 p-8">
          <h2 className="font-heading text-xl font-bold text-[#1a1a2e] mb-6">Quick Links</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Open Your Shop", href: "/seller/shop/create", internal: true },
              { label: "Seller Dashboard", href: "/seller/dashboard", internal: true },
              { label: "View Fees & Pricing", href: "/pricing", internal: true },
              { label: "How to Sell Guide", href: "/how-to-sell", internal: true },
              { label: "Contact Support", href: "/contact", internal: true },
              { label: "Community Forum", href: "#", internal: false },
            ].map(({ label, href, internal }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center justify-between border border-gray-100 px-4 py-3 text-sm text-gray-700 hover:border-rose-300 hover:text-rose-700 transition-colors group"
              >
                <span>{label}</span>
                {internal ? (
                  <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-rose-500 transition-colors" />
                ) : (
                  <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-rose-500 transition-colors" />
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-[#1a1a2e] mb-8">Seller FAQ</h2>
          <div className="space-y-5">
            {FAQ.map((faq) => (
              <div key={faq.q} className="bg-white border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#1a1a2e] text-white p-10 text-center">
          <h2 className="font-heading text-2xl font-bold mb-3">Ready to Start Selling?</h2>
          <p className="text-white/50 text-sm mb-6">Free to open. Only 2% per sale.</p>
          <Link href="/seller/shop/create" className="inline-flex items-center gap-2 bg-rose-700 hover:bg-rose-800 text-white px-8 py-3 text-sm font-semibold transition-colors">
            Open Your Free Shop <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
