import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { LayoutDashboard, Users, Package, ShoppingBag, Star, Settings, Palette, LogOut, TrendingUp, Flag } from "lucide-react";

const sidebarLinks = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/sellers", icon: Users, label: "Sellers" },
  { href: "/admin/artworks", icon: Package, label: "Artworks" },
  { href: "/admin/orders", icon: ShoppingBag, label: "Orders" },
  { href: "/admin/featured", icon: TrendingUp, label: "Featured" },
  { href: "/admin/reports", icon: Flag, label: "Reports" },
  { href: "/admin/reviews", icon: Star, label: "Reviews" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") redirect("/login");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-60 shrink-0 bg-gray-950 flex flex-col sticky top-0 h-screen">
        <div className="p-5 border-b border-gray-800">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading text-lg font-bold text-white">Art<span className="text-rose-500">Hub</span></span>
          </Link>
          <p className="text-xs text-gray-500 mt-1 ml-10">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-rose-600/10 hover:text-rose-400 transition-colors group">
              <Icon className="w-4 h-4 group-hover:text-rose-500" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <div className="px-3 py-2 flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center text-white text-xs font-bold">A</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{session.user?.name}</p>
              <p className="text-xs text-gray-500 truncate">Super Admin</p>
            </div>
          </div>
          <Link href="/" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-500 hover:text-red-400 rounded-xl hover:bg-red-900/20 transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
