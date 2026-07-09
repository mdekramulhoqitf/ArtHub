import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  LayoutDashboard, Package, ShoppingBag, MessageCircle,
  BarChart2, Settings, Store, CreditCard, Palette, LogOut, PenLine, Star
} from "lucide-react";

const sidebarLinks = [
  { href: "/seller/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/seller/artworks", icon: Package, label: "Artworks" },
  { href: "/seller/orders", icon: ShoppingBag, label: "Orders" },
  { href: "/seller/commissions", icon: PenLine, label: "Commissions" },
  { href: "/seller/reviews", icon: Star, label: "Reviews" },
  { href: "/seller/messages", icon: MessageCircle, label: "Messages" },
  { href: "/seller/analytics", icon: BarChart2, label: "Analytics" },
  { href: "/seller/payouts", icon: CreditCard, label: "Payouts" },
  { href: "/seller/shop", icon: Store, label: "Shop Settings" },
];

export default async function SellerLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const userId = (session.user as any).id as string;

  // Check DB role (JWT may be stale after admin approval)
  const dbUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true, name: true, email: true },
  });

  if (!dbUser || dbUser.role === "BUYER") redirect("/seller/shop/create");

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-white border-r border-gray-100 flex flex-col sticky top-0 h-screen">
        <div className="p-5 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading text-lg font-bold text-gray-900">Art<span className="text-rose-600">Hub</span></span>
          </Link>
          <p className="text-xs text-gray-400 mt-1 ml-10">Seller Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-rose-50 hover:text-rose-700 transition-colors group"
            >
              <Icon className="w-4 h-4 group-hover:text-rose-600" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 text-xs font-bold">
              {(dbUser.name ?? session.user?.email ?? "S").slice(0, 1).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{dbUser.name ?? "Seller"}</p>
              <p className="text-xs text-gray-400 truncate">{session.user?.email}</p>
            </div>
          </div>
          <Link href="/" className="flex items-center gap-3 px-3 py-2 mt-1 text-sm text-gray-500 hover:text-red-600 rounded-xl hover:bg-red-50 transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
