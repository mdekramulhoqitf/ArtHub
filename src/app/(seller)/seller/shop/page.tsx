"use client";

import { useEffect, useState } from "react";
import { Loader2, Store, CheckCircle, AlertCircle, Globe, ExternalLink, MapPin, FileText, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShopData {
  id: string;
  slug: string;
  displayName: string;
  bio: string | null;
  location: string | null;
  websiteUrl: string | null;
  instagramUrl: string | null;
  logoUrl: string | null;
  bannerUrl: string | null;
  isApproved: boolean;
  isFeatured: boolean;
  totalSales: number;
  ratingAvg: number;
  createdAt: string;
  owner: { name: string | null; email: string; avatar: string | null };
}

export default function ShopSettingsPage() {
  const [shop, setShop] = useState<ShopData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    displayName: "",
    bio: "",
    location: "",
    websiteUrl: "",
    instagramUrl: "",
    logoUrl: "",
    bannerUrl: "",
  });

  useEffect(() => {
    fetch("/api/seller/shop/settings")
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data: ShopData) => {
        setShop(data);
        setForm({
          displayName: data.displayName,
          bio: data.bio ?? "",
          location: data.location ?? "",
          websiteUrl: data.websiteUrl ?? "",
          instagramUrl: data.instagramUrl ?? "",
          logoUrl: data.logoUrl ?? "",
          bannerUrl: data.bannerUrl ?? "",
        });
      })
      .catch(() => setError("Could not load shop settings."))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.displayName.trim()) { setError("Shop name required."); return; }
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const res = await fetch("/api/seller/shop/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Save failed.");
      }
      const updated = await res.json();
      setShop(prev => prev ? { ...prev, ...updated } : prev);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  function field(
    key: keyof typeof form,
    label: string,
    opts?: { icon?: React.ReactNode; placeholder?: string; type?: string; textarea?: boolean }
  ) {
    return (
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="relative">
          {opts?.icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{opts.icon}</div>
          )}
          {opts?.textarea ? (
            <textarea
              value={form[key]}
              onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
              placeholder={opts.placeholder}
              rows={4}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-rose-400 resize-none"
            />
          ) : (
            <input
              type={opts?.type ?? "text"}
              value={form[key]}
              onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
              placeholder={opts?.placeholder}
              className={cn(
                "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-rose-400",
                opts?.icon && "pl-9"
              )}
            />
          )}
        </div>
      </div>
    );
  }

  if (loading) return (
    <div className="flex items-center justify-center py-24 gap-3 text-gray-400">
      <Loader2 className="w-5 h-5 animate-spin" /> Loading shop settings…
    </div>
  );
  if (error && !shop) return <div className="text-center py-16 text-red-500 text-sm">{error}</div>;
  if (!shop) return null;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-gray-900">Shop Settings</h1>
        <p className="text-gray-500 text-sm mt-0.5">Manage your shop profile</p>
      </div>

      {/* Status bar */}
      <div className={cn(
        "flex items-center gap-3 rounded-2xl p-4 border",
        shop.isApproved
          ? "bg-green-50 border-green-200"
          : "bg-yellow-50 border-yellow-200"
      )}>
        {shop.isApproved
          ? <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
          : <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0" />
        }
        <div>
          <p className={cn("text-sm font-semibold", shop.isApproved ? "text-green-800" : "text-yellow-800")}>
            {shop.isApproved ? "Shop is Active" : "Pending Admin Approval"}
          </p>
          <p className={cn("text-xs", shop.isApproved ? "text-green-600" : "text-yellow-600")}>
            {shop.isApproved
              ? `Shop URL: /shop/${shop.slug} · ${shop.totalSales} sales · ★ ${shop.ratingAvg.toFixed(1)}`
              : "Your shop is under review. Settings can be edited while waiting."
            }
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Basic info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <Store className="w-4 h-4 text-rose-500" /> Basic Information
          </h2>
          {field("displayName", "Shop Name *", { icon: <Store className="w-4 h-4" />, placeholder: "Your shop name" })}
          {field("location", "Location", { icon: <MapPin className="w-4 h-4" />, placeholder: "e.g. Dhanmondi, Dhaka" })}
          {field("bio", "About Your Shop", { placeholder: "Tell buyers about your art and style…", textarea: true })}
        </div>

        {/* Links */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <Globe className="w-4 h-4 text-rose-500" /> Links
          </h2>
          {field("websiteUrl", "Website URL", { icon: <Globe className="w-4 h-4" />, type: "url", placeholder: "https://yourwebsite.com" })}
          {field("instagramUrl", "Instagram URL", { icon: <ExternalLink className="w-4 h-4" />, type: "url", placeholder: "https://instagram.com/yourhandle" })}
        </div>

        {/* Media */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-rose-500" /> Shop Images
          </h2>
          {field("logoUrl", "Logo URL", { icon: <ImageIcon className="w-4 h-4" />, type: "url", placeholder: "https://example.com/logo.jpg" })}
          {form.logoUrl && (
            <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200">
              <img src={form.logoUrl} alt="Logo preview" className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = "none")} />
            </div>
          )}
          {field("bannerUrl", "Banner URL", { icon: <FileText className="w-4 h-4" />, type: "url", placeholder: "https://example.com/banner.jpg" })}
          {form.bannerUrl && (
            <div className="w-full h-24 rounded-xl overflow-hidden border border-gray-200">
              <img src={form.bannerUrl} alt="Banner preview" className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = "none")} />
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">{error}</div>
        )}

        <div className="flex items-center justify-between">
          {saved && (
            <span className="flex items-center gap-2 text-sm text-green-600 font-medium">
              <CheckCircle className="w-4 h-4" /> Settings saved!
            </span>
          )}
          <div className="ml-auto">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
