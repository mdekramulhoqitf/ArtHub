import Link from "next/link";
import { Users, Store, Package, DollarSign, TrendingUp, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

const PLATFORM_STATS = [
  { label: "Total GMV", value: "BDT 1,28,400", change: "+22%", icon: DollarSign, color: "bg-rose-50 text-rose-600" },
  { label: "Total Users", value: "3,840", change: "+120 this month", icon: Users, color: "bg-blue-50 text-blue-600" },
  { label: "Active Shops", value: "214", change: "+8 this month", icon: Store, color: "bg-amber-50 text-amber-600" },
  { label: "Artworks Listed", value: "2,410", change: "+180 this month", icon: Package, color: "bg-purple-50 text-purple-600" },
];

const PENDING_SHOPS = [
  { id: "s1", name: "Bohemian Brushes", owner: "Maya Patel", date: "2 hours ago", artworks: 5 },
  { id: "s2", name: "Nordic Lines", owner: "Erik Larsson", date: "5 hours ago", artworks: 3 },
  { id: "s3", name: "Desert Canvas", owner: "Fatima Al-Rashid", date: "1 day ago", artworks: 8 },
];

const RECENT_ORDERS = [
  { id: "ORD-301", artwork: "Golden Sunset", buyer: "Sarah M.", seller: "Studio Lumi", amount: 450, fee: 45 },
  { id: "ORD-302", artwork: "Urban Echoes", buyer: "James K.", seller: "Urban Canvas", amount: 780, fee: 78 },
  { id: "ORD-303", artwork: "Blue Serenity", buyer: "Lena F.", seller: "Art by Nadia", amount: 320, fee: 32 },
];

const FLAGGED = [
  { id: "f1", type: "Artwork", name: "Abstract Violence", reporter: "User #234", reason: "Inappropriate content" },
  { id: "f2", type: "Shop", name: "FakeArtCo", reporter: "User #567", reason: "Selling reproductions" },
];

export default function AdminDashboardPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-gray-900">Platform Overview</h1>
        <p className="text-gray-500 text-sm mt-1">ArtHub Admin · All time statistics</p>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PLATFORM_STATS.map(({ label, value, change, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> {change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending shop approvals */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-gray-900">Pending Shop Approvals</h2>
              <Badge className="bg-amber-50 text-amber-700 border-amber-200">{PENDING_SHOPS.length} pending</Badge>
            </div>
            <Link href="/admin/sellers" className="text-sm text-rose-600 hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {PENDING_SHOPS.map((shop) => (
              <div key={shop.id} className="flex items-center gap-4 px-6 py-4">
                <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 font-bold text-sm shrink-0">
                  {shop.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm">{shop.name}</p>
                  <p className="text-xs text-gray-400">{shop.owner} · {shop.artworks} artworks · {shop.date}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" className="h-8 bg-green-600 hover:bg-green-700 text-white text-xs gap-1">
                    <CheckCircle className="w-3 h-3" /> Approve
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 border-red-200 text-red-600 hover:bg-red-50 text-xs">
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flagged content */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-gray-900">Flagged Content</h2>
              <Badge className="bg-red-50 text-red-700 border-red-200">{FLAGGED.length}</Badge>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {FLAGGED.map((item) => (
              <div key={item.id} className="px-6 py-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400">{item.type}</p>
                    <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.reason}</p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline" className="h-6 text-xs border-gray-200">Review</Button>
                      <Button size="sm" className="h-6 text-xs bg-red-600 hover:bg-red-700 text-white">Remove</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent orders with fee tracking */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Recent Orders & Platform Fees</h2>
          <Link href="/admin/orders" className="text-sm text-rose-600 hover:underline">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 border-b border-gray-50">
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-6 py-3 font-medium">Artwork</th>
                <th className="px-6 py-3 font-medium">Buyer</th>
                <th className="px-6 py-3 font-medium">Seller Shop</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium text-rose-600">Platform Fee (2%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {RECENT_ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-gray-400">{order.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{order.artwork}</td>
                  <td className="px-6 py-4 text-gray-600">{order.buyer}</td>
                  <td className="px-6 py-4 text-gray-600">{order.seller}</td>
                  <td className="px-6 py-4 font-semibold">{formatPrice(order.amount)}</td>
                  <td className="px-6 py-4 font-semibold text-rose-600">{formatPrice(order.fee)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Manage Sellers", href: "/admin/sellers", icon: Store },
          { label: "All Artworks", href: "/admin/artworks", icon: Package },
          { label: "Feature Shops", href: "/admin/featured", icon: TrendingUp },
          { label: "Platform Settings", href: "/admin/settings", icon: Clock },
        ].map(({ label, href, icon: Icon }) => (
          <Link key={href} href={href}>
            <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center hover:border-rose-200 hover:shadow-md transition-all group cursor-pointer">
              <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-rose-100">
                <Icon className="w-5 h-5 text-rose-600" />
              </div>
              <p className="text-sm font-medium text-gray-700 group-hover:text-rose-600">{label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
