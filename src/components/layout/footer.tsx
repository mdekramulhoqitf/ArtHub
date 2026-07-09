import Link from "next/link";
import { Palette } from "lucide-react";

const FOOTER_LINKS = {
  Explore: [
    { label: "All Artworks", href: "/browse" },
    { label: "Paintings", href: "/browse?category=paintings" },
    { label: "Photography", href: "/browse?category=photography" },
    { label: "Sculpture", href: "/browse?category=sculptures" },
    { label: "Digital Art", href: "/browse?category=digital" },
    { label: "All Artists", href: "/shops" },
  ],
  Sell: [
    { label: "Open a Shop", href: "/seller/shop/create" },
    { label: "Seller Dashboard", href: "/seller/dashboard" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Fees & Pricing", href: "/pricing" },
    { label: "Artist Resources", href: "/artist-resources" },
    { label: "How to Sell", href: "/how-to-sell" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "Returns", href: "/returns" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-500">
      <div className="container mx-auto px-4 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <Palette className="w-4 h-4 text-black" />
              </div>
              <span className="font-heading text-xl font-bold text-white tracking-tight">
                Art<span className="text-rose-500">Hub</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              The marketplace for original art. Connecting collectors with independent artists worldwide since 2024.
            </p>
            <div className="space-y-1 text-sm">
              <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Follow Us</p>
              <div className="flex items-center gap-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-sm">Instagram</a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-sm">Pinterest</a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-sm">Twitter / X</a>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">{group}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} ArtHub. All rights reserved.</p>
          <p className="text-gray-600">Platform fee 2% per sale · Payments secured by Stripe</p>
        </div>
      </div>
    </footer>
  );
}
