import Link from "next/link";
import { Building2, CheckCircle, Users, Shield, TrendingUp, Palette, ArrowRight, Star } from "lucide-react";

const PACKAGES = [
  {
    title: "Starter",
    ideal: "Startups, small offices",
    budget: "৳50,000 – ৳2,00,000",
    features: ["5–15 curated artworks", "Placement consultation", "Certificate of Authenticity for each", "Annual refresh option"],
  },
  {
    title: "Professional",
    ideal: "Mid-size companies, banks, clinics",
    budget: "৳2,00,000 – ৳8,00,000",
    features: ["15–50 artworks", "Brand-aligned curation", "Site visit + installation", "Inventory management", "Artist meet-and-greet option", "Branded plaques"],
    highlight: true,
  },
  {
    title: "Enterprise",
    ideal: "Hotels, corporate HQs, institutions",
    budget: "৳8,00,000+",
    features: ["Unlimited artworks", "Dedicated art manager", "Commission custom works", "Installation team", "Long-term collection management", "Annual valuation report", "PR & press support"],
  },
];

const BENEFITS = [
  { icon: TrendingUp, title: "Asset Appreciation", desc: "Original art appreciates over time. A corporate collection is a tangible investment, not just a cost." },
  { icon: Users, title: "Employee Wellbeing", desc: "Studies show art in workplaces reduces stress and increases creativity by up to 32%." },
  { icon: Shield, title: "Brand Positioning", desc: "Support Bangladeshi artists while projecting cultural depth and values to clients and partners." },
  { icon: Star, title: "ESG & CSR Value", desc: "Art investment in local culture counts toward ESG reporting and community support initiatives." },
];

const CLIENTS = ["Grameenphone", "BRAC", "Dutch-Bangla Bank", "Renata Ltd", "Square Group", "The Peninsula Dhaka"];

export default function CorporatePage() {
  return (
    <div className="min-h-screen bg-[#f5f2ea]">
      {/* Hero */}
      <div className="bg-[#1a1a2e] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <Building2 className="w-6 h-6 text-rose-400" />
            <span className="text-rose-400 font-semibold text-sm uppercase tracking-widest">Corporate Art Program</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-5 max-w-2xl leading-tight">
            Art That Works as Hard as You Do
          </h1>
          <p className="text-gray-400 text-lg max-w-xl leading-relaxed mb-8">
            Transform your office, hotel, or institution with a curated art collection. ArtHub handles everything — from selection to installation — while supporting Bangladeshi artists.
          </p>
          <Link href="/contact?subject=corporate" className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors">
            Request a Proposal <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-14 space-y-14">
        {/* Benefits */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-8 text-center">Why Invest in Corporate Art?</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 p-6 flex gap-4">
                <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">{title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Packages */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2 text-center">Collection Packages</h2>
          <p className="text-gray-500 text-sm text-center mb-8">All packages include certification, insurance guidance, and post-acquisition support.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {PACKAGES.map((p) => (
              <div
                key={p.title}
                className={`rounded-2xl border p-6 flex flex-col ${p.highlight ? "bg-[#1a1a2e] border-[#1a1a2e] text-white" : "bg-white border-gray-100"}`}
              >
                {p.highlight && <div className="text-rose-400 text-xs font-bold uppercase tracking-widest mb-3">Most Popular</div>}
                <p className={`font-heading text-xl font-bold mb-1 ${p.highlight ? "text-white" : "text-gray-900"}`}>{p.title}</p>
                <p className={`text-xs mb-1 ${p.highlight ? "text-gray-300" : "text-gray-400"}`}>Ideal for: {p.ideal}</p>
                <p className={`font-semibold text-sm mb-5 ${p.highlight ? "text-rose-400" : "text-rose-600"}`}>{p.budget}</p>
                <ul className="space-y-2 flex-1 mb-6">
                  {p.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${p.highlight ? "text-gray-200" : "text-gray-600"}`}>
                      <CheckCircle className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${p.highlight ? "text-rose-400" : "text-green-500"}`} /> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact?subject=corporate"
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    p.highlight ? "bg-rose-600 hover:bg-rose-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  }`}
                >
                  Get Quote <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Past clients */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-5">Trusted by Organizations Across Bangladesh</p>
          <div className="flex flex-wrap justify-center gap-4">
            {CLIENTS.map((c) => (
              <div key={c} className="bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl text-sm font-medium text-gray-700">
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="grid sm:grid-cols-4 gap-5 text-center">
          {[
            [Palette, "Brief", "We learn your space, brand, and aesthetic goals."],
            [Users, "Curate", "Our team selects 20–50 works for your review."],
            [Building2, "Install", "Professional installation with placement guidance."],
            [Shield, "Support", "Ongoing collection management and appraisals."],
          ].map(([Icon, title, desc]) => (
            <div key={String(title)} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                {/* @ts-ignore */}
                <Icon className="w-5 h-5 text-rose-600" />
              </div>
              <p className="font-semibold text-gray-900 text-sm mb-1">{String(title)}</p>
              <p className="text-gray-400 text-xs leading-relaxed">{String(desc)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
