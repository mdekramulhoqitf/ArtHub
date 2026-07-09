"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard, Users, Store, Package, ShoppingBag,
  Flag, Settings, LogOut, ShieldCheck, Globe, TrendingUp,
  Megaphone, Image as ImageIcon, Frame, Sun, Moon, BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { href: "/superadmin/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/superadmin/users", icon: Users, label: "Users" },
  { href: "/superadmin/shops", icon: Store, label: "Shops" },
  { href: "/superadmin/artworks", icon: Package, label: "Artworks" },
  { href: "/superadmin/masterworks", icon: Frame, label: "Masterworks" },
  { href: "/superadmin/orders", icon: ShoppingBag, label: "Orders" },
  { href: "/superadmin/featured", icon: TrendingUp, label: "Featured" },
  { href: "/superadmin/banners", icon: ImageIcon, label: "Banners" },
  { href: "/superadmin/announcements", icon: Megaphone, label: "Announcements" },
  { href: "/superadmin/blog", icon: BookOpen, label: "Blog" },
  { href: "/superadmin/reports", icon: Flag, label: "Reports" },
  { href: "/superadmin/site", icon: Globe, label: "Site Settings" },
  { href: "/superadmin/settings", icon: Settings, label: "Config" },
];

// Theme tokens
const D = {
  wrap: "bg-gray-950 text-white",
  sidebar: "bg-gray-900 border-gray-800",
  sidebarBorder: "border-gray-800",
  logo: "text-white",
  navActive: "bg-rose-600 text-white shadow-md shadow-rose-900/40",
  navIdle: "text-gray-400 hover:bg-gray-800 hover:text-white",
  footer: "border-gray-800",
  footerSubtext: "text-gray-500",
  footerBtn: "text-gray-400 hover:text-red-400 hover:bg-red-900/20",
  main: "bg-gray-950",
  themeBtn: "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border-gray-700",
};

const L = {
  wrap: "bg-gray-100 text-gray-900",
  sidebar: "bg-white border-gray-200",
  sidebarBorder: "border-gray-200",
  logo: "text-gray-900",
  navActive: "bg-rose-600 text-white shadow-md shadow-rose-200/60",
  navIdle: "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
  footer: "border-gray-200",
  footerSubtext: "text-gray-400",
  footerBtn: "text-gray-500 hover:text-red-600 hover:bg-red-50",
  main: "bg-gray-100",
  themeBtn: "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 border-gray-300",
};

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [dark, setDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sa_theme");
    if (stored === "light") setDark(false);
    setMounted(true);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    localStorage.setItem("sa_theme", next ? "dark" : "light");
  }

  if (pathname === "/superadmin/login") return <>{children}</>;

  async function handleLogout() {
    await fetch("/api/superadmin/logout", { method: "POST" });
    router.push("/superadmin/login");
  }

  const t = dark ? D : L;

  if (!mounted) return null;

  return (
    <div className={cn("flex min-h-screen transition-colors duration-200", t.wrap, !dark && "sa-light")}>
      {/* Sidebar */}
      <aside className={cn("w-64 shrink-0 border-r flex flex-col sticky top-0 h-screen transition-colors duration-200", t.sidebar)}>
        {/* Logo */}
        <div className={cn("p-5 border-b", t.sidebarBorder)}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-rose-900/30">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className={cn("font-bold text-sm leading-none", t.logo)}>ArtHub</p>
              <p className="text-rose-500 text-xs mt-0.5 font-semibold tracking-wide">SUPER ADMIN</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {sidebarLinks.map(({ href, icon: Icon, label }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  active ? t.navActive : t.navIdle
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className={cn("p-3 border-t space-y-1", t.footer)}>
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium border transition-all",
              t.themeBtn
            )}
          >
            <span className="flex items-center gap-2.5">
              {dark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              {dark ? "Night Mode" : "Light Mode"}
            </span>
            {/* Toggle pill */}
            <div className={cn(
              "relative inline-flex items-center w-10 h-6 rounded-full shrink-0 transition-colors duration-200",
              dark ? "bg-rose-600" : "bg-gray-300"
            )}>
              <span className={cn(
                "absolute w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200",
                dark ? "translate-x-5" : "translate-x-1"
              )} />
            </div>
          </button>

          {/* User */}
          <div className="px-3 py-2 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center text-white text-xs font-bold shrink-0">SA</div>
            <div className="min-w-0">
              <p className={cn("text-sm font-semibold truncate", t.logo)}>Super Admin</p>
              <p className={cn("text-xs truncate", t.footerSubtext)}>Full Access</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className={cn("w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl transition-colors", t.footerBtn)}
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className={cn("flex-1 overflow-auto transition-colors duration-200", t.main)}>
        {children}
      </main>
    </div>
  );
}
