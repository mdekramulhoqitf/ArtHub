"use client";

import { useEffect, useState } from "react";
import { Search, UserCheck, UserX, Shield, ShoppingBag, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserRow {
  id: string;
  name: string | null;
  email: string;
  role: "BUYER" | "SELLER" | "ADMIN";
  isBanned: boolean;
  createdAt: string;
  avatar: string | null;
  shop: { displayName: string; slug: string; totalSales: number; isApproved: boolean } | null;
  _count: { orders: number };
}

const ROLES = ["All", "SELLER", "BUYER", "ADMIN"];

export default function SuperAdminUsers() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  async function fetchUsers() {
    try {
      const res = await fetch("/api/superadmin/users");
      if (!res.ok) throw new Error("Failed to load");
      setUsers(await res.json());
    } catch {
      setError("Could not load users.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchUsers(); }, []);

  async function doAction(id: string, action: string, roleVal?: string) {
    setActionLoading(id + action);
    try {
      const res = await fetch("/api/superadmin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action, role: roleVal }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updated } : u));
    } catch {
      alert("Action failed.");
    } finally {
      setActionLoading(null);
    }
  }

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    const matchSearch = !search
      || (u.name ?? "").toLowerCase().includes(q)
      || u.email.toLowerCase().includes(q)
      || (u.shop?.displayName ?? "").toLowerCase().includes(q);
    const matchRole = role === "All" || u.role === role;
    return matchSearch && matchRole;
  });

  const ROLE_COLOR: Record<string, string> = {
    SELLER: "bg-amber-900/30 text-amber-400",
    ADMIN: "bg-purple-900/30 text-purple-400",
    BUYER: "bg-blue-900/30 text-blue-400",
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {loading ? "Loading…" : `${users.length} registered users`}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, email, shop…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-rose-500"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="flex gap-2 flex-wrap">
          {ROLES.map(r => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={cn(
                "px-3 py-2 text-xs font-semibold rounded-lg border transition-colors",
                role === r
                  ? "bg-rose-600 text-white border-rose-600"
                  : "border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* States */}
      {loading && (
        <div className="flex items-center justify-center py-24 gap-3 text-gray-500">
          <Loader2 className="w-5 h-5 animate-spin" /> Loading users…
        </div>
      )}
      {error && (
        <div className="text-center py-16 text-red-400 text-sm">{error}</div>
      )}

      {/* Table */}
      {!loading && !error && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                {["User", "Role", "Shop", "Orders", "Joined", "Status", "Actions"].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filtered.map(u => {
                const busy = actionLoading?.startsWith(u.id);
                return (
                  <tr key={u.id} className="hover:bg-gray-800/40 transition-colors">
                    {/* User */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs font-bold shrink-0 overflow-hidden">
                          {u.avatar
                            ? <img src={u.avatar} alt="" className="w-8 h-8 object-cover rounded-full" />
                            : (u.name ?? u.email).slice(0, 2).toUpperCase()
                          }
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">{u.name ?? "—"}</p>
                          <p className="text-gray-500 text-xs">{u.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-5 py-3">
                      <select
                        disabled={busy}
                        value={u.role}
                        onChange={e => doAction(u.id, "setRole", e.target.value)}
                        className={cn(
                          "text-xs font-semibold px-2.5 py-1 rounded-full border-0 focus:outline-none focus:ring-1 focus:ring-rose-500 cursor-pointer",
                          ROLE_COLOR[u.role]
                        )}
                      >
                        <option value="BUYER">BUYER</option>
                        <option value="SELLER">SELLER</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                    </td>

                    {/* Shop */}
                    <td className="px-5 py-3 text-xs">
                      {u.shop ? (
                        <div>
                          <p className="text-white font-medium">{u.shop.displayName}</p>
                          <p className="text-gray-500">{u.shop.totalSales} sales · {u.shop.isApproved ? "Approved" : "Pending"}</p>
                        </div>
                      ) : (
                        <span className="text-gray-700">—</span>
                      )}
                    </td>

                    {/* Orders */}
                    <td className="px-5 py-3 text-white font-semibold">{u._count.orders}</td>

                    {/* Joined */}
                    <td className="px-5 py-3 text-gray-500 text-xs">
                      {new Date(u.createdAt).toLocaleDateString("en-BD", { day: "numeric", month: "short", year: "numeric" })}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-3">
                      <span className={cn(
                        "text-xs px-2.5 py-1 rounded-full font-medium",
                        u.isBanned ? "bg-red-900/30 text-red-400" : "bg-emerald-900/30 text-emerald-400"
                      )}>
                        {u.isBanned ? "Banned" : "Active"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5">
                        {u.shop && (
                          <a
                            href={`/shop/${u.shop.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-gray-500 hover:text-blue-400 hover:bg-blue-900/20 rounded-lg transition-colors"
                            title="View shop"
                          >
                            <ShoppingBag className="w-4 h-4" />
                          </a>
                        )}
                        {u.isBanned ? (
                          <button
                            disabled={busy}
                            onClick={() => doAction(u.id, "unban")}
                            className="p-1.5 text-gray-500 hover:text-emerald-400 hover:bg-emerald-900/20 rounded-lg transition-colors disabled:opacity-40"
                            title="Unban"
                          >
                            {busy && actionLoading === u.id + "unban"
                              ? <Loader2 className="w-4 h-4 animate-spin" />
                              : <UserCheck className="w-4 h-4" />
                            }
                          </button>
                        ) : (
                          <button
                            disabled={busy}
                            onClick={() => { if (confirm(`Ban ${u.email}?`)) doAction(u.id, "ban"); }}
                            className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-40"
                            title="Ban"
                          >
                            {busy && actionLoading === u.id + "ban"
                              ? <Loader2 className="w-4 h-4 animate-spin" />
                              : <UserX className="w-4 h-4" />
                            }
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && !loading && (
            <div className="text-center py-16 text-gray-600 text-sm">
              {users.length === 0 ? "No users have registered yet." : "No users match this filter."}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
