"use client";

import { useEffect, useState } from "react";
import { Loader2, User, Mail, Camera, Save, ShoppingBag, Heart, Star, Users, CheckCircle } from "lucide-react";

interface Profile {
  id: string;
  name: string | null;
  email: string;
  avatar: string | null;
  createdAt: string;
  _count: { orders: number; wishlist: number; reviews: number; following: number };
}

export default function BuyerProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    fetch("/api/buyer/profile")
      .then((r) => r.json())
      .then((p) => {
        setProfile(p);
        setName(p.name ?? "");
        setAvatar(p.avatar ?? "");
      })
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    setSaving(true);
    const res = await fetch("/api/buyer/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, avatar }),
    });
    const updated = await res.json();
    setProfile((prev) => prev ? { ...prev, ...updated } : prev);
    setSaved(true);
    setSaving(false);
    setTimeout(() => setSaved(false), 2500);
  }

  if (loading) return (
    <div className="flex items-center justify-center py-24 gap-2 text-gray-400">
      <Loader2 className="w-5 h-5 animate-spin" /> Loading profile…
    </div>
  );

  if (!profile) return null;

  const initials = (name || profile.email)[0]?.toUpperCase() ?? "U";
  const joinDate = new Date(profile.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" });

  const stats = [
    { label: "Orders", value: profile._count.orders, icon: ShoppingBag },
    { label: "Wishlist", value: profile._count.wishlist, icon: Heart },
    { label: "Reviews", value: profile._count.reviews, icon: Star },
    { label: "Following", value: profile._count.following, icon: Users },
  ];

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Member since {joinDate}</p>
      </div>

      {/* Avatar + stats */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center gap-6 mb-6">
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-full bg-[#1a1a2e] flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatar} alt="" className="w-full h-full object-cover" />
              ) : (
                initials
              )}
            </div>
          </div>
          <div>
            <p className="font-bold text-gray-900 text-lg">{name || "—"}</p>
            <p className="text-gray-400 text-sm">{profile.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="text-center bg-gray-50 rounded-xl py-3">
              <Icon className="w-4 h-4 text-rose-500 mx-auto mb-1" />
              <p className="font-bold text-gray-900 text-lg">{value}</p>
              <p className="text-gray-400 text-[11px]">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Edit form */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <h2 className="font-semibold text-gray-900">Edit Information</h2>

        <div>
          <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Display Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-rose-400"
              placeholder="Your name…"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={profile.email}
              disabled
              className="w-full border border-gray-100 rounded-xl pl-10 pr-4 py-2.5 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
            />
          </div>
          <p className="text-[11px] text-gray-400 mt-1">Email cannot be changed here.</p>
        </div>

        <div>
          <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Avatar URL</label>
          <div className="relative">
            <Camera className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-rose-400"
              placeholder="https://… (image URL)"
            />
          </div>
        </div>

        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
