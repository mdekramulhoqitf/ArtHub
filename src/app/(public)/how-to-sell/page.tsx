import Link from "next/link";
import { Store, Camera, Package, Wallet, Star, ArrowRight, CheckCircle, TrendingUp, Shield } from "lucide-react";

const STEPS = [
  {
    icon: Store,
    number: "01",
    title: "Open Your Shop",
    desc: "Create a free ArtHub seller account and set up your shop in minutes. Add your biography, studio story, and a profile photo to build trust with buyers.",
    tips: ["Choose a memorable shop name and slug", "Write a compelling bio that tells your story", "Add a banner image that reflects your artistic style"],
  },
  {
    icon: Camera,
    number: "02",
    title: "Photograph & List Your Work",
    desc: "Great photography is the single biggest factor in online art sales. Upload high-resolution images from multiple angles, in natural light, with a clean background.",
    tips: ["Minimum 1500px wide, natural daylight preferred", "Include at least 3 images — front, detail, and lifestyle (on a wall)", "Write a compelling description: technique, inspiration, story"],
  },
  {
    icon: TrendingUp,
    number: "03",
    title: "Set Your Price",
    desc: "Pricing original art is both art and science. Factor in materials, time, size, and your market reputation. ArtHub charges only 2% — one of the lowest fees in the industry.",
    tips: ["Research similar artists at your career stage", "Don't undervalue — low prices signal low quality to buyers", "ArtHub fee: 2% of sale price only"],
  },
  {
    icon: Package,
    number: "04",
    title: "Pack & Ship",
    desc: "When a sale is made, you have 3 business days to ship. Pack artwork securely with acid-free materials, bubble wrap, and rigid backing. Mark the package as 'Art — Fragile'.",
    tips: ["Use telescoping tubes for works on paper", "Double-box large canvases with foam corners", "Always include a Certificate of Authenticity"],
  },
  {
    icon: Wallet,
    number: "05",
    title: "Get Paid",
    desc: "Once the buyer confirms delivery, funds are transferred to your Stripe account within 2–5 business days. We support both bank transfer and mobile banking payout.",
    tips: ["Connect your Stripe account in shop settings", "Stripe supports bKash and Nagad via local partners", "Track all earnings in your seller analytics dashboard"],
  },
];

const WHY = [
  { title: "Only 2% Fee", desc: "Artsy charges 12–15%, Saatchi takes 35–40%. We take 2% — so you keep more of what you earn." },
  { title: "Bangladesh-Focused", desc: "Our entire buyer base knows and values Bangladeshi art. Sell to people who actually want what you make." },
  { title: "Free Forever", desc: "No monthly subscription, no listing fee. Open your shop and list unlimited artworks for free." },
  { title: "Built-In Audience", desc: "Access thousands of collectors, corporates, and gift buyers without spending a taka on marketing." },
];

const FAQS = [
  { q: "How much does it cost to sell on ArtHub?", a: "Opening a shop and listing artworks is completely free. ArtHub charges only 2% on completed sales — nothing else." },
  { q: "When do I get paid?", a: "Payment is released 2–5 business days after the buyer confirms delivery, or 14 days after shipping if no dispute is raised." },
  { q: "Do I need to be a professional artist?", a: "No — any artist, hobbyist, or emerging creator can sell on ArtHub. We do review every shop application to maintain quality standards." },
  { q: "Can I sell digital art?", a: "Yes — ArtHub supports digital art sales as downloadable files or limited edition prints." },
  { q: "What if a buyer claims the artwork is damaged?", a: "We mediate disputes fairly. We strongly recommend photographing your packaging process for your own protection." },
  { q: "How do I handle commissions?", a: "ArtHub has a built-in commission request system. Buyers can request custom works directly through your shop page." },
];

export default function HowToSellPage() {
  return (
    <div className="min-h-screen bg-[#f5f2ea]">
      {/* Hero */}
      <div className="bg-[#1a1a2e] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Store className="w-6 h-6 text-rose-400" />
            <span className="text-rose-400 font-semibold text-sm uppercase tracking-widest">Seller's Guide</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Start Selling Your Art Today</h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Free to start. 2% fee only on sales. No subscription. Just you, your art, and thousands of collectors ready to buy.
          </p>
          <Link href="/seller/shop/create" className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-xl font-semibold mt-8 transition-colors">
            Open My Free Shop <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* Why ArtHub */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WHY.map((w) => (
            <div key={w.title} className="bg-white rounded-2xl border border-gray-100 p-5">
              <p className="font-heading text-lg font-bold text-rose-600 mb-1">{w.title}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>

        {/* Steps */}
        <div className="space-y-5">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-[#1a1a2e] rounded-2xl flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-rose-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-heading text-3xl font-bold text-gray-100">{step.number}</span>
                      <h2 className="font-heading text-xl font-bold text-gray-900">{step.title}</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-4">{step.desc}</p>
                    <ul className="space-y-2">
                      {step.tips.map((tip) => (
                        <li key={tip} className="flex items-start gap-2 text-sm text-gray-500">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Seller protections */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
          <h2 className="font-heading text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-600" /> Seller Protections
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              ["Secure Payouts", "All funds held securely in Stripe until order is confirmed delivered."],
              ["Dispute Mediation", "ArtHub mediates all disputes fairly, requiring evidence from both parties."],
              ["Fraud Protection", "Suspicious buyers and fraudulent orders are blocked by Stripe's ML systems."],
            ].map(([title, desc]) => (
              <div key={String(title)} className="bg-white rounded-xl p-4">
                <p className="font-semibold text-gray-900 text-sm mb-1">{String(title)}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{String(desc)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">Seller FAQ</h2>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl border border-gray-100 p-5">
                <p className="font-semibold text-gray-900 mb-1.5">{faq.q}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-rose-600 to-rose-700 rounded-2xl p-10 text-center text-white">
          <Star className="w-10 h-10 text-rose-200 mx-auto mb-3" />
          <h3 className="font-heading text-2xl font-bold mb-2">Ready to Start Selling?</h3>
          <p className="text-rose-100 text-sm mb-6 max-w-md mx-auto">
            Join thousands of Bangladeshi artists earning from their passion. Free to start, 2% fee only when you sell.
          </p>
          <Link href="/seller/shop/create" className="inline-flex items-center gap-2 bg-white text-rose-700 hover:bg-rose-50 px-10 py-4 rounded-xl text-base font-bold transition-colors">
            Open My Free Shop <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
