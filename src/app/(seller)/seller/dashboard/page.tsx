import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  TrendingUp, ShoppingBag, Eye, Package,
  Plus, ArrowUpRight, Star, Store, AlertCircle,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

const ORDER_STATUS_COLORS: Record<string, string> = {
  PENDING:   "bg-yellow-50 text-yellow-700 border-yellow-200",
  PAID:      "bg-blue-50 text-blue-700 border-blue-200",
  SHIPPED:   "bg-purple-50 text-purple-700 border-purple-200",
  DELIVERED: "bg-green-50 text-green-700 border-green-200",
  CANCELLED: "bg-red-50 text-red-700 border-red-200",
  REFUNDED:  "bg-gray-100 text-gray-600 border-gray-200",
};

const ARTWORK_STATUS_COLORS: Record<string, string> = {
  ACTIVE:   "bg-green-50 text-green-700 border-green-200",
  DRAFT:    "bg-amber-50 text-amber-700 border-amber-200",
  SOLD:     "bg-gray-100 text-gray-500 border-gray-200",
  ARCHIVED: "bg-gray-100 text-gray-400 border-gray-200",
};

export default async function SellerDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const userId = (session.user as any).id as string;

  const shop = await prisma.shop.findUnique({
    where: { ownerId: userId },
    include: {
      artworks: {
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
          images: { where: { isPrimary: true }, take: 1 },
          _count: { select: { wishlist: true } },
        },
      },
      orders: {
        orderBy: { createdAt: "desc" },
        take: 6,
        include: {
          buyer: { select: { name: true, email: true } },
          items: { select: { snapshotTitle: true, quantity: true, unitPrice: true } },
        },
      },
      _count: { select: { artworks: true, orders: true, reviews: true } },
    },
  });

  if (!shop) redirect("/seller/shop/create");

  // Revenue: sum of sellerPayout for PAID/SHIPPED/DELIVERED orders
  const revenueResult = await prisma.order.aggregate({
    where: { shopId: shop.id, status: { in: ["PAID", "SHIPPED", "DELIVERED"] } },
    _sum: { sellerPayout: true },
  });
  const totalRevenue = Number(revenueResult._sum.sellerPayout ?? 0);

  // Artwork counts by status
  const artworkCounts = await prisma.artwork.groupBy({
    by: ["status"],
    where: { shopId: shop.id },
    _count: { status: true },
  });
  const countMap = Object.fromEntries(artworkCounts.map((r: (typeof artworkCounts)[number]) => [r.status, r._count.status]));

  // Total views
  const viewsResult = await prisma.artwork.aggregate({
    where: { shopId: shop.id },
    _sum: { viewCount: true },
  });
  const totalViews = viewsResult._sum.viewCount ?? 0;

  const stats = [
    { label: "Total Revenue", value: formatPrice(totalRevenue), icon: TrendingUp, color: "bg-rose-50 text-rose-600" },
    { label: "Total Orders", value: shop._count.orders.toString(), icon: ShoppingBag, color: "bg-blue-50 text-blue-600" },
    { label: "Artwork Views", value: totalViews.toLocaleString(), icon: Eye, color: "bg-amber-50 text-amber-600" },
    { label: "Total Artworks", value: shop._count.artworks.toString(), icon: Package, color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-gray-900">Your Dashboard</h1>
          <div className="flex items-center gap-2 mt-1">
            <Store className="w-4 h-4 text-rose-500" />
            <span className="text-gray-500 text-sm">{shop.displayName}</span>
            {!shop.isApproved && (
              <span className="flex items-center gap-1 text-xs bg-yellow-50 text-yellow-700 border border-yellow-200 px-2 py-0.5 rounded-full">
                <AlertCircle className="w-3 h-3" /> Pending Approval
              </span>
            )}
          </div>
        </div>
        <Link
          href="/seller/artworks/new"
          className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" /> Upload Artwork
        </Link>
      </div>

      {/* Pending banner */}
      {!shop.isApproved && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-yellow-800">Your shop is under review</p>
            <p className="text-xs text-yellow-600 mt-0.5">An admin will approve your shop shortly. You can prepare your artworks in the meantime, but they won&apos;t be visible to buyers until approved.</p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", color)}>
              <Icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Artwork status breakdown */}
      {shop._count.artworks > 0 && (
        <div className="grid grid-cols-4 gap-3">
          {(["ACTIVE", "DRAFT", "SOLD", "ARCHIVED"] as const).map(s => (
            <div key={s} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-xl font-bold text-gray-900">{countMap[s] ?? 0}</p>
              <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium", ARTWORK_STATUS_COLORS[s])}>{s}</span>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Artworks table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Your Artworks</h2>
            <Link href="/seller/artworks" className="text-sm text-rose-600 hover:underline flex items-center gap-1">
              View all <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          {shop.artworks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-6">
              <Package className="w-10 h-10 text-gray-200 mb-3" />
              <p className="text-sm text-gray-500">No artworks yet.</p>
              <Link href="/seller/artworks/new" className="mt-3 text-sm text-rose-600 hover:underline">Upload your first artwork</Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {shop.artworks.map((art) => {
                const thumb = art.images[0]?.url;
                return (
                  <div key={art.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 shrink-0 overflow-hidden">
                      {thumb && <img src={thumb} alt="" className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">{art.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {art.viewCount} views · {art._count.wishlist} wishlisted
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-semibold text-gray-900 text-sm">{formatPrice(Number(art.price))}</p>
                      <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium inline-block mt-1", ARTWORK_STATUS_COLORS[art.status])}>
                        {art.status}
                      </span>
                    </div>
                    <Link href={`/seller/artworks/${art.id}`} className="text-xs text-gray-400 hover:text-rose-600 px-2 py-1 rounded-lg hover:bg-rose-50 transition-colors shrink-0">
                      Edit
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent orders */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Recent Orders</h2>
            <Link href="/seller/orders" className="text-sm text-rose-600 hover:underline">All</Link>
          </div>

          {shop.orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-6">
              <ShoppingBag className="w-10 h-10 text-gray-200 mb-3" />
              <p className="text-sm text-gray-500">No orders yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {shop.orders.map((order) => {
                const title = order.items[0]?.snapshotTitle ?? "—";
                const buyerName = order.buyer.name ?? order.buyer.email;
                return (
                  <div key={order.id} className="px-6 py-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400 font-mono">{order.id.slice(-8).toUpperCase()}</span>
                      <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium", ORDER_STATUS_COLORS[order.status])}>
                        {order.status}
                      </span>
                    </div>
                    <p className="font-medium text-gray-900 text-sm truncate">{title}</p>
                    <p className="text-xs text-gray-400 truncate">{buyerName}</p>
                    <p className="font-semibold text-rose-600 text-sm mt-1">{formatPrice(Number(order.sellerPayout))}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Manage Artworks", icon: Package, href: "/seller/artworks" },
          { label: "View Orders", icon: ShoppingBag, href: "/seller/orders" },
          { label: "Shop Settings", icon: Store, href: "/seller/shop" },
          { label: "Reviews", icon: Star, href: "/seller/reviews" },
        ].map(({ label, icon: Icon, href }) => (
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
