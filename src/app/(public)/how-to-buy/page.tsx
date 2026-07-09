import Link from "next/link";
import { ShoppingBag, Search, Heart, Shield, Truck, Star, ArrowRight, CheckCircle, MessageCircle } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    title: "Discover",
    number: "01",
    desc: "Browse thousands of original artworks by Bangladeshi artists. Use filters to narrow by medium, style, price, and size. Save works to your wishlist as you explore.",
    tips: ["Use the Art Finder quiz to get personalized recommendations", "Filter by price range, medium, and size", "Follow artists to see new work in your feed"],
  },
  {
    icon: Heart,
    title: "Save & Compare",
    number: "02",
    desc: "Add artworks to your wishlist to compare them side by side. Take your time — great art decisions aren't rushed. You can message the artist directly to ask questions.",
    tips: ["Message artists for more photos or studio visits", "Check the size guide to visualize artwork in your space", "Read shop reviews from previous buyers"],
  },
  {
    icon: ShoppingBag,
    title: "Purchase Securely",
    number: "03",
    desc: "All purchases are processed through Stripe — the same payment system used by Amazon and Shopify. Your payment is held securely until the artwork is delivered.",
    tips: ["All prices shown in BDT including applicable taxes", "Your card is never stored on ArtHub servers", "Stripe's buyer protection applies to every transaction"],
  },
  {
    icon: Truck,
    title: "Receive Your Art",
    number: "04",
    desc: "The artist packages and ships your artwork with professional art-safe materials. You'll receive tracking information and can monitor your delivery.",
    tips: ["Artworks are packaged to survive international transit", "Inspect on arrival — photograph any damage immediately", "Contact seller within 7 days if artwork arrives damaged"],
  },
  {
    icon: Star,
    title: "Leave a Review",
    number: "05",
    desc: "Once your artwork is delivered, share your experience. Your review helps other collectors and supports the artist's reputation on the platform.",
    tips: ["Honest reviews help other collectors make decisions", "Include a photo of the artwork in your space", "Artists can respond to your review publicly"],
  },
];

const FAQS = [
  { q: "Are all artworks original?", a: "Yes — every artwork sold by artists on ArtHub is an original, one-of-a-kind work unless explicitly marked as a Limited or Open Edition. Each comes with a Certificate of Authenticity." },
  { q: "Can I return an artwork?", a: "Contact the seller within 7 days of delivery if the artwork arrives damaged or significantly different from what was shown. Each seller has their own return policy — check it before purchase." },
  { q: "How do I know the artist is legitimate?", a: "Every seller goes through an approval process. You can read their reviews, view their full portfolio, and message them directly before purchasing." },
  { q: "What if I have questions about the artwork?", a: "Use the 'Message the Artist' button on any artwork page or shop page. Most artists respond within 24 hours." },
  { q: "Do you ship internationally?", a: "Yes — most sellers on ArtHub ship internationally. Shipping costs and timelines vary by seller and destination. Check the shop page for details." },
  { q: "Is my payment secure?", a: "All payments are processed through Stripe, one of the world's most trusted payment processors. ArtHub never stores your card details." },
];

export default function HowToBuyPage() {
  return (
    <div className="min-h-screen bg-[#f5f2ea]">
      {/* Hero */}
      <div className="bg-[#1a1a2e] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ShoppingBag className="w-6 h-6 text-rose-400" />
            <span className="text-rose-400 font-semibold text-sm uppercase tracking-widest">Buyer's Guide</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">How to Buy Art on ArtHub</h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Buying original art for the first time? We've made it simple, safe, and enjoyable. Here's everything you need to know.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* Steps */}
        <div className="space-y-6">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
                <div className="flex items-start gap-5">
                  <div className="shrink-0">
                    <div className="w-12 h-12 bg-[#1a1a2e] rounded-2xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-rose-400" />
                    </div>
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

        {/* Guarantees */}
        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6">
          <h2 className="font-heading text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-rose-600" /> ArtHub Buyer Guarantees
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              ["Certificate of Authenticity", "Every original artwork includes a signed certificate proving its authenticity."],
              ["Secure Payments", "All transactions processed through Stripe with full encryption and fraud protection."],
              ["Damage Protection", "If artwork arrives damaged, contact us within 7 days for full resolution support."],
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
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
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
        <div className="grid sm:grid-cols-2 gap-5">
          <Link href="/browse" className="bg-rose-600 hover:bg-rose-700 text-white rounded-2xl p-6 flex items-center justify-between transition-colors group">
            <div>
              <p className="font-heading text-lg font-bold">Start Browsing</p>
              <p className="text-rose-200 text-sm mt-0.5">Thousands of original artworks</p>
            </div>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/art-advisory" className="bg-[#1a1a2e] hover:bg-gray-800 text-white rounded-2xl p-6 flex items-center justify-between transition-colors group">
            <div>
              <p className="font-heading text-lg font-bold">Talk to an Advisor</p>
              <p className="text-gray-400 text-sm mt-0.5">Free 20-minute consultation</p>
            </div>
            <MessageCircle className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
