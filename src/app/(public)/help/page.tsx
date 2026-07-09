import { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Package, CreditCard, Store, ShieldCheck } from "lucide-react";

export const metadata: Metadata = { title: "Help Center" };

const CATEGORIES = [
  {
    icon: Package,
    title: "Orders & Shipping",
    color: "text-rose-600 bg-rose-50",
    faqs: [
      { q: "How long does shipping take?", a: "Shipping times vary by artist location and your destination. Most domestic orders arrive in 5–10 business days. International orders typically take 10–21 business days. Each listing shows the artist's estimated shipping time." },
      { q: "Can I track my order?", a: "Yes. Once the artist ships your order, you'll receive a tracking number by email. You can also view tracking status in your buyer dashboard under Orders." },
      { q: "My order arrived damaged. What do I do?", a: "Take photos of the damage immediately and contact our support team within 48 hours of delivery. We'll work with the artist to arrange a replacement or refund." },
      { q: "Can I change my shipping address after ordering?", a: "Contact us immediately at support@arthub.com. If the artist hasn't shipped yet, we can update the address. Once shipped, changes are not possible." },
    ],
  },
  {
    icon: CreditCard,
    title: "Payments & Refunds",
    color: "text-violet-600 bg-violet-50",
    faqs: [
      { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards (Visa, Mastercard, Amex), and digital wallets (Apple Pay, Google Pay) via Stripe. All transactions are secured with 256-bit encryption." },
      { q: "Can I get a refund?", a: "Original artworks are non-refundable unless they arrive damaged or significantly different from the listing. Prints and reproductions can be returned within 14 days if unopened. See our full Returns Policy for details." },
      { q: "When is payment taken?", a: "Payment is taken immediately at checkout. The artist receives their payout (minus the 2% platform fee) after the order is confirmed as delivered." },
      { q: "Is it safe to pay on ArtHub?", a: "Yes. All payments are processed by Stripe, which is PCI DSS Level 1 certified — the highest level of payment security. ArtHub never stores your card details." },
    ],
  },
  {
    icon: Store,
    title: "Selling on ArtHub",
    color: "text-emerald-600 bg-emerald-50",
    faqs: [
      { q: "How do I open a shop?", a: "Go to /seller/shop/create, fill in your shop details, and you're live in minutes. Opening a shop is completely free. We charge only 2% per sale." },
      { q: "How does the 2% fee work?", a: "When you make a sale, ArtHub deducts 2% of the sale price before paying you out via Stripe. So if a work sells for $500, you receive $490." },
      { q: "When do I get paid?", a: "Payouts are processed automatically via Stripe Connect 7 days after the order is confirmed as delivered. You need to connect a Stripe account to receive payouts." },
      { q: "Can I sell internationally?", a: "Yes. ArtHub is available worldwide. You set your own shipping rates and regions in your shop settings. Buyers see prices in USD." },
    ],
  },
  {
    icon: ShieldCheck,
    title: "Trust & Safety",
    color: "text-sky-600 bg-sky-50",
    faqs: [
      { q: "How do I know artworks are authentic?", a: "Every seller is manually reviewed before their shop goes live. All listed works must be original or clearly labelled as prints. Each purchase includes a certificate of authenticity signed by the artist." },
      { q: "What if a seller is unresponsive?", a: "If a seller hasn't shipped within the stated timeframe and isn't responding, contact our support team. We'll investigate and can issue a refund if the order cannot be fulfilled." },
      { q: "How do I report a listing?", a: "Click the flag icon on any listing to report it. Our moderation team reviews all reports within 24 hours." },
    ],
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[#f5f2ea]">
      {/* Hero */}
      <div className="bg-[#1a1a2e] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-rose-400 mb-2">Support</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Help Center</h1>
          <p className="text-white/50 max-w-lg mx-auto">
            Find answers to common questions, or get in touch with our support team.
          </p>
        </div>
      </div>

      {/* Quick contact strip */}
      <div className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">Can&apos;t find your answer?</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-rose-700 text-white px-6 py-2.5 text-sm font-semibold hover:bg-rose-800 transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> Contact Support
          </Link>
        </div>
      </div>

      {/* FAQ sections */}
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-14">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <div key={cat.title}>
              <div className="flex items-center gap-3 mb-8">
                <div className={`w-10 h-10 rounded flex items-center justify-center ${cat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-[#1a1a2e]">{cat.title}</h2>
              </div>
              <div className="space-y-6">
                {cat.faqs.map((faq) => (
                  <div key={faq.q} className="bg-white border border-gray-100 p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="bg-[#1a1a2e] text-white py-14 text-center px-4">
        <h2 className="font-heading text-2xl font-bold mb-3">Still need help?</h2>
        <p className="text-white/50 text-sm mb-6">Our support team replies within 24 hours.</p>
        <Link href="/contact" className="inline-flex items-center gap-2 bg-rose-700 hover:bg-rose-800 text-white px-8 py-3 text-sm font-semibold transition-colors">
          <MessageCircle className="w-4 h-4" /> Contact Us
        </Link>
      </div>
    </div>
  );
}
