import Link from "next/link";
import { Sparkles, MessageCircle, Shield, Star, Check, ArrowRight, User } from "lucide-react";

const SERVICES = [
  {
    title: "Free Consultation",
    price: "Free",
    description: "A 20-minute online session with an ArtHub curator. Ideal for first-time buyers who want guidance without commitment.",
    features: ["Style assessment", "Budget recommendations", "3 artwork suggestions", "Email follow-up"],
    cta: "Book Free Call",
    highlight: false,
  },
  {
    title: "Home Art Plan",
    price: "৳5,000",
    description: "A full room-by-room art plan for your home or office. We'll create a curated shortlist tailored to your spaces, budget, and taste.",
    features: ["Full room assessment", "Mood board creation", "10–15 artwork shortlist", "Size & placement guide", "2 revision rounds", "30-day follow-up support"],
    cta: "Start My Plan",
    highlight: true,
  },
  {
    title: "Corporate Collection",
    price: "Custom",
    description: "A complete art acquisition strategy for offices, hotels, and corporate spaces — from selection through installation.",
    features: ["Site visit or virtual walkthrough", "Brand-aligned curation", "Artist liaison", "Procurement support", "Installation coordination", "Ongoing collection management"],
    cta: "Contact Us",
    highlight: false,
  },
];

const ADVISORS = [
  { name: "Shamima Rahman", role: "Senior Art Advisor", spec: "Contemporary Bangladeshi, Watercolor", avatar: "SR", bio: "15 years in Dhaka's gallery circuit. Expert in South Asian contemporary art and emerging artists." },
  { name: "Tariq Hassan", role: "Interior Art Specialist", spec: "Large Format, Corporate Spaces", avatar: "TH", bio: "Former creative director, specializes in matching art to architecture and interior design projects." },
  { name: "Nusrat Jahan", role: "Collection Curator", spec: "Traditional & Folk Art", avatar: "NJ", bio: "Dhaka University Fine Arts alumni. Deep expertise in Nakshi Kantha and heritage Bangladeshi art forms." },
];

export default function ArtAdvisoryPage() {
  return (
    <div className="min-h-screen bg-[#f5f2ea]">
      {/* Hero */}
      <div className="bg-[#1a1a2e] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-rose-400" />
            <span className="text-rose-400 font-semibold text-sm uppercase tracking-widest">Art Advisory</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-5">Your Personal Art Curator</h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Not sure where to start? Our expert advisors help you find, select, and acquire the right artwork — for your space, your story, and your budget.
          </p>
          <div className="flex items-center justify-center gap-8 mt-10">
            {[["200+", "Collections Built"], ["৳2Cr+", "Art Placed"], ["100%", "Client Satisfaction"]].map(([val, label]) => (
              <div key={label} className="text-center">
                <p className="font-heading text-3xl font-bold text-white">{val}</p>
                <p className="text-gray-400 text-xs mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-14 space-y-14">
        {/* Services */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2 text-center">Advisory Services</h2>
          <p className="text-gray-500 text-sm text-center mb-8">Choose the level of guidance that's right for you.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className={`rounded-2xl border p-6 flex flex-col ${
                  s.highlight ? "bg-[#1a1a2e] border-[#1a1a2e] text-white" : "bg-white border-gray-100 text-gray-900"
                }`}
              >
                {s.highlight && <div className="text-rose-400 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-1"><Star className="w-3 h-3 fill-rose-400" /> Most Popular</div>}
                <p className={`font-heading text-lg font-bold mb-1 ${s.highlight ? "text-white" : "text-gray-900"}`}>{s.title}</p>
                <p className={`text-2xl font-bold mb-3 ${s.highlight ? "text-rose-400" : "text-rose-600"}`}>{s.price}</p>
                <p className={`text-sm leading-relaxed mb-5 ${s.highlight ? "text-gray-300" : "text-gray-500"}`}>{s.description}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {s.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${s.highlight ? "text-gray-200" : "text-gray-600"}`}>
                      <Check className={`w-3.5 h-3.5 shrink-0 ${s.highlight ? "text-rose-400" : "text-green-500"}`} /> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact?subject=art-advisory"
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    s.highlight ? "bg-rose-600 hover:bg-rose-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  }`}
                >
                  {s.cta} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Advisors */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-8 text-center">Meet the Advisors</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {ADVISORS.map((a) => (
              <div key={a.name} className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-[#1a1a2e] flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {a.avatar}
                </div>
                <p className="font-semibold text-gray-900">{a.name}</p>
                <p className="text-rose-600 text-xs font-semibold mt-0.5 mb-1">{a.role}</p>
                <p className="text-gray-400 text-xs mb-3">Specializes in: {a.spec}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{a.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <h2 className="font-heading text-xl font-bold text-gray-900 mb-6 text-center">How It Works</h2>
          <div className="grid sm:grid-cols-4 gap-6 text-center">
            {[
              [MessageCircle, "1. Tell Us", "Share your space, budget, and style preferences through our intake form."],
              [User, "2. Meet Your Advisor", "We match you with the right curator and schedule your consultation."],
              [Sparkles, "3. Get Recommendations", "Receive a personalized shortlist with placement visualizations."],
              [Shield, "4. Acquire Confidently", "We handle everything from purchase to delivery — with full authenticity guarantee."],
            ].map(([Icon, title, desc]) => (
              <div key={String(title)}>
                <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  {/* @ts-ignore */}
                  <Icon className="w-5 h-5 text-rose-600" />
                </div>
                <p className="font-semibold text-gray-900 text-sm mb-1">{String(title)}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{String(desc)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/contact?subject=art-advisory"
            className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-10 py-4 rounded-xl text-base font-semibold transition-colors shadow-lg shadow-rose-200"
          >
            Book Free Consultation <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-gray-400 text-xs mt-3">No commitment · Free 20-minute call</p>
        </div>
      </div>
    </div>
  );
}
