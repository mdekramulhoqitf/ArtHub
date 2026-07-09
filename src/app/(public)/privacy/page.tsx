import { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

const SECTIONS = [
  {
    title: "Information We Collect",
    body: `We collect information you provide directly: name, email address, shipping address, and payment details when you create an account or place an order. We also collect usage data — pages visited, searches made, artworks viewed — to improve the platform. Payment details are processed by Stripe and never stored on our servers.`,
  },
  {
    title: "How We Use Your Information",
    body: `We use your data to process orders, send order confirmations and shipping updates, personalise your browsing experience, and send marketing emails (only with your consent). We never sell your personal data to third parties. We share data only with service providers necessary to operate ArtHub — Stripe for payments, Cloudinary for image storage, and our email provider.`,
  },
  {
    title: "Cookies",
    body: `ArtHub uses essential cookies to keep you signed in and remember your preferences. We also use analytics cookies (with your consent) to understand how visitors use the site. You can disable non-essential cookies at any time through your browser settings.`,
  },
  {
    title: "Your Rights",
    body: `You have the right to access, correct, or delete your personal data at any time. To request a copy of your data or to have it deleted, email us at privacy@arthub.com. We will respond within 30 days. If you are based in the EU, you have additional rights under GDPR including the right to data portability and the right to object to processing.`,
  },
  {
    title: "Data Retention",
    body: `We retain your account data for as long as your account is active. Order records are kept for 7 years for tax and legal compliance. If you delete your account, personal data is removed within 30 days, except where retention is required by law.`,
  },
  {
    title: "Security",
    body: `All data is encrypted in transit (TLS 1.3) and at rest. Payment processing uses Stripe, which is PCI DSS Level 1 certified. We conduct regular security audits and follow industry best practices to protect your information.`,
  },
  {
    title: "Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. When we do, we will notify registered users by email and update the "Last updated" date below. Continued use of ArtHub after changes constitutes acceptance of the updated policy.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-[#1a1a2e] text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-rose-400 mb-2">Legal</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-white/50 text-sm">Last updated: 1 January 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-16 space-y-12">
        <p className="text-gray-600 leading-relaxed">
          ArtHub (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is committed to protecting your privacy. This policy explains what personal data we collect, how we use it, and your rights regarding that data.
        </p>

        {SECTIONS.map((s, i) => (
          <div key={i} className="border-t border-gray-100 pt-8">
            <h2 className="font-heading text-xl font-bold text-[#1a1a2e] mb-4">{s.title}</h2>
            <p className="text-gray-600 leading-relaxed">{s.body}</p>
          </div>
        ))}

        <div className="border-t border-gray-100 pt-8">
          <h2 className="font-heading text-xl font-bold text-[#1a1a2e] mb-4">Contact Us</h2>
          <p className="text-gray-600 leading-relaxed">
            Questions about this policy? Email <a href="mailto:privacy@arthub.com" className="text-rose-700 underline underline-offset-2">privacy@arthub.com</a> or write to: ArtHub Privacy Team, Dhaka, Bangladesh.
          </p>
        </div>
      </div>
    </div>
  );
}
