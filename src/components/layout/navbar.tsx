"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  User,
  LayoutDashboard,
  Store,
  LogOut,
  ChevronDown,
  Palette,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, getInitials } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/browse", label: "All Art" },
  { href: "/artists", label: "Artists" },
  { href: "/shops", label: "Shops" },
  { href: "/auctions", label: "Auctions" },
  { href: "/events", label: "Events" },
  { href: "/blog", label: "Magazine" },
];

const discoverLinks = [
  { href: "/collections", label: "Collections", desc: "Curated sets of related artworks" },
  { href: "/graphic-art", label: "Graphic Art", desc: "Poster, illustration, type & brand" },
  { href: "/find-your-art", label: "Find Your Art", desc: "5-question quiz to match your taste" },
  { href: "/trending", label: "Trending Now", desc: "Most viewed & saved artworks" },
  { href: "/size-guide", label: "Size Guide", desc: "How to choose the right size" },
  { href: "/exhibitions", label: "Exhibitions", desc: "Online & physical exhibitions" },
  { href: "/universities", label: "Universities", desc: "Art departments & student work" },
  { href: "/famous-artworks", label: "Masterworks", desc: "Bangladesh's most celebrated art" },
];

const buyLinks = [
  { href: "/gifts", label: "Art as a Gift", desc: "Perfect for every occasion" },
  { href: "/prints", label: "Print Shop", desc: "Museum-quality prints from ৳800" },
  { href: "/art-advisory", label: "Art Advisory", desc: "Free 20-min consultation" },
  { href: "/corporate", label: "Corporate Art", desc: "Curated collections for offices" },
  { href: "/how-to-buy", label: "How to Buy", desc: "Buyer's guide & FAQs" },
  { href: "/how-to-sell", label: "How to Sell", desc: "Start selling in minutes" },
];

const aboutLinks = [
  { href: "/about", label: "About Us", desc: "Our story and mission" },
  { href: "/partners", label: "Partners", desc: "Galleries & collaborators" },
  { href: "/contact", label: "Contact", desc: "Get in touch with us" },
  { href: "/contact?subject=press", label: "Press & Media", desc: "Media kit and press inquiries" },
  { href: "/contact?subject=partnership", label: "Partnerships", desc: "Collaborate with ArtHub" },
];

const ALL_PAGES = [
  { href: "/", label: "Home", desc: "ArtHub homepage" },
  { href: "/browse", label: "All Art", desc: "Browse all artworks" },
  { href: "/artists", label: "Artists", desc: "Discover Bangladeshi artists" },
  { href: "/shops", label: "Shops", desc: "All artist shops" },
  { href: "/auctions", label: "Auctions", desc: "Live & upcoming art auctions" },
  { href: "/events", label: "Events", desc: "Art events & openings" },
  { href: "/blog", label: "Magazine", desc: "Art stories, news & interviews" },
  { href: "/collections", label: "Collections", desc: "Curated sets of related artworks" },
  { href: "/find-your-art", label: "Find Your Art", desc: "Style quiz to match your taste" },
  { href: "/trending", label: "Trending Now", desc: "Most viewed & saved artworks" },
  { href: "/size-guide", label: "Size Guide", desc: "How to choose the right art size" },
  { href: "/exhibitions", label: "Exhibitions", desc: "Online & physical exhibitions" },
  { href: "/universities", label: "Universities", desc: "Art departments & student work" },
  { href: "/famous-artworks", label: "Masterworks", desc: "Bangladesh's most celebrated art" },
  { href: "/paintings", label: "Paintings", desc: "Browse paintings" },
  { href: "/photography", label: "Photography", desc: "Browse photography" },
  { href: "/sculpture", label: "Sculpture", desc: "Browse sculptures" },
  { href: "/digital", label: "Digital Art", desc: "Browse digital artworks" },
  { href: "/graphic-art", label: "Graphic Art", desc: "Posters, illustration, type & brand" },
  { href: "/gifts", label: "Art as a Gift", desc: "Original art for every occasion" },
  { href: "/prints", label: "Print Shop", desc: "Museum-quality prints from ৳800" },
  { href: "/art-advisory", label: "Art Advisory", desc: "Free 20-min art consultation" },
  { href: "/corporate", label: "Corporate Art", desc: "Curated collections for offices & hotels" },
  { href: "/how-to-buy", label: "How to Buy", desc: "Buyer's guide & FAQs" },
  { href: "/how-to-sell", label: "How to Sell", desc: "Start selling your art in minutes" },
  { href: "/about", label: "About Us", desc: "ArtHub's story and mission" },
  { href: "/contact", label: "Contact", desc: "Get in touch with us" },
  { href: "/partners", label: "Partners", desc: "Galleries & collaborators" },
  { href: "/contact?subject=press", label: "Press & Media", desc: "Media kit and press inquiries" },
  { href: "/contact?subject=partnership", label: "Partnerships", desc: "Collaborate with ArtHub" },
  { href: "/seller/shop/create", label: "Open a Shop", desc: "Start selling your art for free" },
  { href: "/login", label: "Sign In", desc: "Log in to your account" },
  { href: "/register", label: "Join Free", desc: "Create your ArtHub account" },
];

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<{ artworks: any[]; shops: any[]; artists: any[] } | null>(null);
  const [suggestLoading, setSuggestLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { setSearchOpen(false); setSuggestions(null); }
    }
    if (searchOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  const fetchSuggestions = useCallback((q: string) => {
    if (q.length < 2) { setSuggestions(null); return; }
    setSuggestLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(q)}`)
      .then((r) => r.json())
      .then((d) => setSuggestions(d))
      .catch(() => {})
      .finally(() => setSuggestLoading(false));
  }, []);

  function onQueryChange(val: string) {
    setSearchQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(val), 300);
  }

  function closeSearch() {
    setSearchOpen(false);
    setSuggestions(null);
    setSearchQuery("");
  }

  const matchedPages = searchQuery.length >= 2
    ? ALL_PAGES.filter((p) =>
        p.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  const hasSuggestions = matchedPages.length > 0 || (suggestions && (
    suggestions.artworks.length > 0 || suggestions.shops.length > 0 || suggestions.artists.length > 0
  ));

  const user = session?.user;
  const role = (user as any)?.role;

  function getDashboardHref() {
    if (role === "ADMIN") return "/admin/dashboard";
    if (role === "SELLER") return "/seller/dashboard";
    return "/buyer/dashboard";
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/browse?q=${encodeURIComponent(searchQuery.trim())}`);
      closeSearch();
    }
  }

  return (
    <>
      {/* Top promo bar */}
      <div className="bg-rose-700 text-white text-center text-xs py-2 tracking-wide">
        Free worldwide shipping on orders over $500 &nbsp;·&nbsp; 2% platform fee only
      </div>

      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 bg-rose-700 rounded flex items-center justify-center">
                <Palette className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading text-xl font-bold text-black tracking-tight">
                Art<span className="text-rose-600">Hub</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-black",
                    pathname === link.href ? "text-rose-700 border-b-2 border-rose-600 pb-0.5" : "text-gray-500"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {/* Discover dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors hover:text-black focus:outline-none",
                  discoverLinks.some(l => pathname === l.href)
                    ? "text-rose-700 border-b-2 border-rose-600 pb-0.5"
                    : "text-gray-500"
                )}>
                  Discover <ChevronDown className="w-3.5 h-3.5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-60 rounded-xl shadow-lg border border-gray-100 p-1.5">
                  {discoverLinks.map((link) => (
                    <DropdownMenuItem
                      key={link.href}
                      onClick={() => router.push(link.href)}
                      className={cn(
                        "flex flex-col gap-0.5 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-rose-50 focus:bg-rose-50",
                        pathname === link.href ? "bg-rose-50" : ""
                      )}
                    >
                      <span className={cn("text-sm font-medium", pathname === link.href ? "text-rose-700" : "text-gray-800")}>
                        {link.label}
                      </span>
                      <span className="text-xs text-gray-400">{link.desc}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Buy/Sell dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors hover:text-black focus:outline-none",
                  buyLinks.some(l => pathname === l.href)
                    ? "text-rose-700 border-b-2 border-rose-600 pb-0.5"
                    : "text-gray-500"
                )}>
                  Buy & Sell <ChevronDown className="w-3.5 h-3.5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-60 rounded-xl shadow-lg border border-gray-100 p-1.5">
                  {buyLinks.map((link) => (
                    <DropdownMenuItem
                      key={link.href}
                      onClick={() => router.push(link.href)}
                      className={cn(
                        "flex flex-col gap-0.5 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-rose-50 focus:bg-rose-50",
                        pathname === link.href ? "bg-rose-50" : ""
                      )}
                    >
                      <span className={cn("text-sm font-medium", pathname === link.href ? "text-rose-700" : "text-gray-800")}>
                        {link.label}
                      </span>
                      <span className="text-xs text-gray-400">{link.desc}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Company dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors hover:text-black focus:outline-none",
                  ["/about", "/partners", "/contact"].some(p => pathname.startsWith(p))
                    ? "text-rose-700 border-b-2 border-rose-600 pb-0.5"
                    : "text-gray-500"
                )}>
                  Company <ChevronDown className="w-3.5 h-3.5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 rounded-xl shadow-lg border border-gray-100 p-1.5">
                  {aboutLinks.map((link) => (
                    <DropdownMenuItem
                      key={link.href}
                      onClick={() => router.push(link.href)}
                      className={cn(
                        "flex flex-col gap-0.5 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-rose-50 focus:bg-rose-50",
                        pathname === link.href ? "bg-rose-50" : ""
                      )}
                    >
                      <span className={cn("text-sm font-medium", pathname === link.href ? "text-rose-700" : "text-gray-800")}>
                        {link.label}
                      </span>
                      <span className="text-xs text-gray-400">{link.desc}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-600 hover:text-black transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {user ? (
                <>
                  <Link href="/buyer/wishlist" className="p-2 text-gray-600 hover:text-black transition-colors">
                    <Heart className="w-5 h-5" />
                  </Link>

                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-2 px-2 rounded hover:bg-gray-50 focus:outline-none ml-1">
                      <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white text-xs font-bold overflow-hidden">
                        {user.image ? (
                          <img src={user.image} alt={user.name ?? ""} className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                          getInitials(user.name ?? user.email ?? "U")
                        )}
                      </div>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-lg border border-gray-100">
                      <div className="px-3 py-2.5 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <DropdownMenuItem onClick={() => window.location.href = getDashboardHref()} className="flex items-center gap-2 cursor-pointer text-sm mx-1 rounded-lg">
                          <LayoutDashboard className="w-4 h-4" /> Dashboard
                        </DropdownMenuItem>
                        {role === "BUYER" && (
                          <DropdownMenuItem onClick={() => window.location.href = "/seller/shop/create"} className="flex items-center gap-2 cursor-pointer text-sm mx-1 rounded-lg">
                            <Store className="w-4 h-4" /> Open a Shop
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => window.location.href = "/buyer/profile"} className="flex items-center gap-2 cursor-pointer text-sm mx-1 rounded-lg">
                          <User className="w-4 h-4" /> My Profile
                        </DropdownMenuItem>
                      </div>
                      <DropdownMenuSeparator />
                      <div className="py-1">
                        <DropdownMenuItem
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="text-red-500 cursor-pointer flex items-center gap-2 text-sm mx-1 rounded-lg"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <div className="flex items-center gap-2 ml-2">
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm" className="bg-rose-700 hover:bg-rose-800 text-white rounded-lg text-sm font-medium px-4">
                      Join Free
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile toggle */}
              <button
                className="lg:hidden p-2 text-gray-600 hover:text-black ml-1"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2.5 text-sm font-medium text-gray-700 hover:text-black border-b border-gray-50"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 pb-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-0 pb-1">Discover</p>
              {discoverLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block py-2.5 text-sm font-medium text-gray-700 hover:text-black border-b border-gray-50" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="pt-2 pb-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-0 pb-1">Buy & Sell</p>
              {buyLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block py-2.5 text-sm font-medium text-gray-700 hover:text-black border-b border-gray-50" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="pt-2 pb-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-0 pb-1">Company</p>
              {aboutLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block py-2.5 text-sm font-medium text-gray-700 hover:text-black border-b border-gray-50" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </div>
            {!user && (
              <div className="flex gap-2 pt-3">
                <Link href="/login" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full text-sm">Sign In</Button>
                </Link>
                <Link href="/register" className="flex-1">
                  <Button size="sm" className="w-full bg-rose-700 hover:bg-rose-800 text-white text-sm">Join Free</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4" onClick={closeSearch}>
          <div className="w-full max-w-xl" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                autoFocus
                type="text"
                placeholder="Search artworks, artists, shops..."
                value={searchQuery}
                onChange={(e) => onQueryChange(e.target.value)}
                className="w-full bg-white rounded-2xl pl-12 pr-16 py-4 text-base shadow-2xl outline-none border border-gray-200 focus:border-rose-600"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {suggestLoading && <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />}
                <button type="button" onClick={closeSearch} className="text-gray-400 hover:text-black">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Suggestions panel */}
            {hasSuggestions && (
              <div className="bg-white rounded-2xl mt-2 shadow-2xl border border-gray-100 overflow-hidden">
                {matchedPages.length > 0 && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-4 pt-3 pb-1">Pages</p>
                    {matchedPages.map((p) => (
                      <button
                        key={p.href}
                        type="button"
                        onClick={() => { router.push(p.href); closeSearch(); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-rose-50 transition-colors text-left"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#1a1a2e] flex items-center justify-center shrink-0">
                          <Search className="w-3.5 h-3.5 text-rose-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{p.label}</p>
                          <p className="text-xs text-gray-400">{p.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {suggestions && suggestions.artworks.length > 0 && (
                  <div className={matchedPages.length > 0 ? "border-t border-gray-50" : ""}>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-4 pt-3 pb-1">Artworks</p>
                    {suggestions.artworks.map((a: any) => (
                      <button
                        key={a.slug}
                        type="button"
                        onClick={() => { router.push(`/artwork/${a.slug}`); closeSearch(); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-rose-50 transition-colors text-left"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0 relative">
                          {a.images[0]?.url && (
                            <Image src={a.images[0].url} alt={a.title} fill className="object-cover" sizes="40px" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{a.title}</p>
                          <p className="text-xs text-gray-400">{a.shop?.displayName}</p>
                        </div>
                        <p className="text-sm font-bold text-rose-600 shrink-0">
                          ৳{Number(a.price).toLocaleString()}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
                {suggestions && suggestions.shops.length > 0 && (
                  <div className="border-t border-gray-50">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-4 pt-3 pb-1">Shops</p>
                    {suggestions.shops.map((s: any) => (
                      <button
                        key={s.slug}
                        type="button"
                        onClick={() => { router.push(`/shop/${s.slug}`); closeSearch(); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-rose-50 transition-colors text-left"
                      >
                        <div className="w-10 h-10 rounded-lg bg-rose-100 overflow-hidden shrink-0 flex items-center justify-center text-rose-700 font-bold text-sm relative">
                          {s.logoUrl ? (
                            <Image src={s.logoUrl} alt={s.displayName} fill className="object-cover" sizes="40px" />
                          ) : s.displayName[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{s.displayName}</p>
                          <p className="text-xs text-gray-400">{s._count?.artworks ?? 0} artworks</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {suggestions && suggestions.artists.length > 0 && (
                  <div className="border-t border-gray-50">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-4 pt-3 pb-1">Artists</p>
                    {suggestions.artists.map((a: any) => (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => { if (a.shop?.slug) router.push(`/shop/${a.shop.slug}`); closeSearch(); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-rose-50 transition-colors text-left"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#1a1a2e] overflow-hidden shrink-0 flex items-center justify-center text-white font-bold text-sm relative">
                          {a.avatar ? (
                            <Image src={a.avatar} alt={a.name ?? ""} fill className="object-cover" sizes="40px" />
                          ) : (a.name ?? "A")[0].toUpperCase()}
                        </div>
                        <p className="text-sm font-medium text-gray-900">{a.name}</p>
                      </button>
                    ))}
                  </div>
                )}
                <div className="border-t border-gray-50 px-4 py-3">
                  <button
                    type="button"
                    onClick={() => { router.push(`/browse?q=${encodeURIComponent(searchQuery)}`); closeSearch(); }}
                    className="flex items-center gap-2 text-sm text-rose-600 hover:text-rose-700 font-medium"
                  >
                    <Search className="w-4 h-4" /> See all results for &quot;{searchQuery}&quot;
                  </button>
                </div>
              </div>
            )}

            {!hasSuggestions && searchQuery.length >= 2 && !suggestLoading && (
              <div className="bg-white rounded-2xl mt-2 shadow-2xl border border-gray-100 px-4 py-5 text-center text-gray-500 text-sm">
                No results for &quot;{searchQuery}&quot; — press Enter to search all artworks
              </div>
            )}

            {!hasSuggestions && searchQuery.length < 2 && (
              <p className="text-white/60 text-sm text-center mt-4">Type at least 2 characters · Enter to search · Esc to close</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
