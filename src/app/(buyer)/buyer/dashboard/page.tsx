import Link from "next/link";
import { Heart, ShoppingBag, MessageCircle, Package, ArrowUpRight, PenLine, Rss } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

const ORDERS = [
  { id: "ORD-201", artwork: "Golden Sunset", shop: "Studio Lumi", price: 450, status: "DELIVERED", date: "May 2, 2025" },
  { id: "ORD-202", artwork: "Blue Serenity", shop: "Art by Nadia", price: 320, status: "SHIPPED", date: "May 8, 2025" },
  { id: "ORD-203", artwork: "Urban Echoes", shop: "Urban Canvas", price: 780, status: "PAID", date: "May 10, 2025" },
];

const WISHLIST = [
  { id: "1", title: "Abstract Thoughts", shopName: "Studio Lumi", price: 560, imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200", status: "ACTIVE" },
  { id: "2", title: "Quiet Harbor", shopName: "Studio Lumi", price: 480, imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=200", status: "ACTIVE" },
  { id: "3", title: "Crimson Tide", shopName: "Red Brush", price: 390, imageUrl: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=200", status: "SOLD" },
];

const STATUS_COLORS: Record<string, string> = {
  PAID: "bg-blue-50 text-blue-700 border-blue-200",
  SHIPPED: "bg-purple-50 text-purple-700 border-purple-200",
  DELIVERED: "bg-green-50 text-green-700 border-green-200",
  ACTIVE: "bg-green-50 text-green-700",
  SOLD: "bg-gray-100 text-gray-500",
};

export default function BuyerDashboardPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-gray-900">My Account</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here's your activity.</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "My Orders", value: "View", icon: ShoppingBag, href: "/buyer/orders" },
          { label: "Wishlist", value: "View", icon: Heart, href: "/buyer/wishlist" },
          { label: "My Feed", value: "View", icon: Rss, href: "/buyer/feed" },
          { label: "Commissions", value: "View", icon: PenLine, href: "/buyer/commissions" },
        ].map(({ label, value, icon: Icon, href }) => (
          <Link key={href} href={href}>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-rose-200 hover:shadow-md transition-all group cursor-pointer">
              <div className="w-9 h-9 bg-rose-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-rose-100">
                <Icon className="w-5 h-5 text-rose-600" />
              </div>
              <p className="text-xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* My Orders */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">My Orders</h2>
          <Link href="/buyer/orders" className="text-sm text-rose-600 hover:underline flex items-center gap-1">
            View all <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {ORDERS.map((order) => (
            <div key={order.id} className="flex items-center gap-4 px-6 py-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs text-gray-400 font-mono">{order.id}</span>
                  <Badge variant="outline" className={`text-xs ${STATUS_COLORS[order.status]}`}>{order.status}</Badge>
                </div>
                <p className="font-medium text-gray-900 text-sm">{order.artwork}</p>
                <p className="text-xs text-gray-400">{order.shop} · {order.date}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-semibold text-gray-900">{formatPrice(order.price)}</p>
                {order.status === "DELIVERED" && (
                  <Button variant="ghost" size="sm" className="text-xs text-rose-600 mt-1 h-6 px-2">Leave Review</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wishlist */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Wishlist</h2>
          <Link href="/buyer/wishlist" className="text-sm text-rose-600 hover:underline flex items-center gap-1">
            View all <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {WISHLIST.map((item) => (
            <div key={item.id} className="flex items-center gap-4 px-6 py-4">
              <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm">{item.title}</p>
                <p className="text-xs text-gray-400">{item.shopName}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-semibold text-gray-900 text-sm">{formatPrice(item.price)}</p>
                <Badge variant="outline" className={`text-xs mt-1 ${STATUS_COLORS[item.status]}`}>{item.status}</Badge>
              </div>
              {item.status === "ACTIVE" && (
                <Button size="sm" className="shrink-0 bg-rose-600 hover:bg-rose-700 text-white text-xs">Buy</Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Become a seller CTA */}
      <div className="bg-linear-to-r from-rose-600 to-rose-700 rounded-2xl p-8 text-white">
        <h3 className="font-heading text-xl font-bold mb-2">Are you an artist?</h3>
        <p className="text-rose-100 text-sm mb-4">Open your free shop on ArtHub and start selling your work to collectors worldwide.</p>
        <Link href="/seller/shop/create">
          <Button className="bg-white text-rose-700 hover:bg-rose-50 font-semibold">Open My Shop</Button>
        </Link>
      </div>
    </div>
  );
}
