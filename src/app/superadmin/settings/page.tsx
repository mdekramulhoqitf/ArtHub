import Link from "next/link";
import { ArrowRight, Globe, Percent, Image, Megaphone, Star } from "lucide-react";

const SECTIONS = [
  { href: "/superadmin/site", icon: Globe, label: "Site Settings", desc: "Platform name, promo bar, maintenance mode, fee %" },
  { href: "/superadmin/banners", icon: Image, label: "Hero Banners", desc: "Homepage slider images and links" },
  { href: "/superadmin/announcements", icon: Megaphone, label: "Announcements", desc: "Site-wide promo bar messages" },
  { href: "/superadmin/featured", icon: Star, label: "Featured", desc: "Which shops and artworks get the spotlight" },
];

export default function SuperAdminSettings() {
  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white">Configuration</h1>
        <p className="text-gray-500 text-sm mt-0.5">All platform settings in one place</p>
      </div>

      <div className="grid gap-3">
        {SECTIONS.map(({ href, icon: Icon, label, desc }) => (
          <Link key={href} href={href} className="bg-gray-900 border border-gray-800 hover:border-rose-600/50 rounded-2xl p-5 flex items-center gap-5 group transition-all">
            <div className="w-10 h-10 bg-rose-600/10 rounded-xl flex items-center justify-center group-hover:bg-rose-600/20 transition-colors">
              <Icon className="w-5 h-5 text-rose-400" />
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold">{label}</p>
              <p className="text-gray-500 text-sm mt-0.5">{desc}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-rose-400 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
