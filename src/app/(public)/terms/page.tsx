import { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using ArtHub, you agree to be bound by these Terms of Service. If you do not agree, do not use the platform. These terms apply to all visitors, buyers, and sellers.",
  },
  {
    title: "2. Accounts",
    body: "You must be at least 18 years old to create an account. You are responsible for maintaining the confidentiality of your login credentials. You agree to provide accurate, current information and to update it if it changes. ArtHub reserves the right to suspend or terminate accounts that violate these terms.",
  },
  {
    title: "3. Buying",
    body: "When you purchase an artwork, you enter into a direct contract with the seller. ArtHub facilitates the transaction but is not a party to it. Prices are set by sellers and displayed in USD. All payments are processed securely by Stripe. ArtHub charges no additional buyer fees beyond the listed price.",
  },
  {
    title: "4. Selling",
    body: "To sell on ArtHub, you must create a verified seller account and open a shop. You represent that all works you list are original, that you own the rights to sell them, and that all descriptions are accurate. ArtHub charges a 2% platform fee on each completed sale, deducted before payout via Stripe.",
  },
  {
    title: "5. Intellectual Property",
    body: "Sellers retain all intellectual property rights to their work. By listing on ArtHub, sellers grant ArtHub a non-exclusive licence to display images of the work for marketing and promotional purposes. Buyers receive ownership of the physical artwork only — not copyright or reproduction rights unless explicitly agreed in writing.",
  },
  {
    title: "6. Prohibited Content",
    body: "You may not list works that are counterfeit, infringe third-party rights, contain illegal content, or misrepresent the work's authenticity or authorship. ArtHub reserves the right to remove any listing and suspend any account that violates these rules.",
  },
  {
    title: "7. Dispute Resolution",
    body: "Disputes between buyers and sellers should first be resolved directly. If unresolved within 7 days, either party may escalate to ArtHub's support team. ArtHub's decision in disputes is final. For legal disputes with ArtHub itself, the governing law is Bangladesh law and the courts of Dhaka have jurisdiction.",
  },
  {
    title: "8. Limitation of Liability",
    body: "ArtHub is a marketplace platform. We are not liable for the quality, safety, or legality of listed artworks, the accuracy of descriptions, or the ability of sellers to complete transactions. Our maximum liability to any user is limited to fees paid to ArtHub in the 12 months preceding the claim.",
  },
  {
    title: "9. Changes to Terms",
    body: "We may update these terms at any time. Registered users will be notified by email. Continued use of ArtHub after the effective date constitutes acceptance.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#1a1a2e] text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-rose-400 mb-2">Legal</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-3">Terms of Service</h1>
          <p className="text-white/50 text-sm">Last updated: 1 January 2025</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-10">
        <p className="text-gray-600 leading-relaxed">
          Please read these Terms of Service carefully before using ArtHub. These terms govern your use of our marketplace platform for buying and selling original artwork.
        </p>
        {SECTIONS.map((s) => (
          <div key={s.title} className="border-t border-gray-100 pt-8">
            <h2 className="font-heading text-xl font-bold text-[#1a1a2e] mb-4">{s.title}</h2>
            <p className="text-gray-600 leading-relaxed">{s.body}</p>
          </div>
        ))}
        <div className="border-t border-gray-100 pt-8">
          <p className="text-gray-600 leading-relaxed">
            Questions? Email <a href="mailto:legal@arthub.com" className="text-rose-700 underline underline-offset-2">legal@arthub.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
