"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Heart, MessageCircle, User, Rss, Bell, PenLine } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/buyer/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/buyer/orders", icon: ShoppingBag, label: "My Orders" },
  { href: "/buyer/wishlist", icon: Heart, label: "Wishlist" },
  { href: "/buyer/feed", icon: Rss, label: "My Feed" },
  { href: "/buyer/commissions", icon: PenLine, label: "Commissions" },
  { href: "/buyer/messages", icon: MessageCircle, label: "Messages" },
  { href: "/buyer/notifications", icon: Bell, label: "Notifications" },
  { href: "/buyer/profile", icon: User, label: "Profile" },
];

export function BuyerNav() {
  const pathname = usePathname();
  return (
    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
      {links.map(({ href, icon: Icon, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
              active ? "bg-rose-50 text-rose-700" : "text-gray-600 hover:bg-rose-50 hover:text-rose-700"
            )}
          >
            <Icon className={cn("w-4 h-4", active ? "text-rose-600" : "group-hover:text-rose-600")} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
