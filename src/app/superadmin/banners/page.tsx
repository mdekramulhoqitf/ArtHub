"use client";

import { Plus, Trash2, Eye, EyeOff, Loader2, ImageIcon, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  link: string;
  active: boolean;
}

export default function SuperAdminBanners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toggling, setToggling] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [link, setLink] = useState("/browse");

  useEffect(() => {
    fetch("/api/superadmin/banners")
      .then(r => r.json())
      .then(setBanners)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function addBanner() {
    if (!title.trim() || !imageUrl.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/superadmin/banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, subtitle, imageUrl, link }),
      });
      if (!res.ok) throw new Error();
      const newBanner = await res.json();
      setBanners(prev => [...prev, newBanner]);
      setTitle(""); setSubtitle(""); setImageUrl(""); setLink("/browse");
      setShowForm(false);
    } catch {
      alert("Failed to add banner.");
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(id: string) {
    setToggling(id);
    try {
      const res = await fetch("/api/superadmin/banners", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error();
      setBanners(prev => prev.map(b => b.id === id ? { ...b, active: !b.active } : b));
    } catch {
      alert("Failed to toggle banner.");
    } finally {
      setToggling(null);
    }
  }

  async function removeBanner(id: string) {
    if (!confirm("Delete this banner?")) return;
    setDeleting(id);
    try {
      const res = await fetch("/api/superadmin/banners", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error();
      setBanners(prev => prev.filter(b => b.id !== id));
    } catch {
      alert("Failed to delete banner.");
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Hero Banners</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {loading ? "Loading…" : `${banners.length} banner${banners.length !== 1 ? "s" : ""} · ${banners.filter(b => b.active).length} active`}
          </p>
        </div>
        <button
          onClick={() => setShowForm(v => !v)}
          className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancel" : "Add Banner"}
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-4">
          <h2 className="font-semibold text-white text-sm">New Banner</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Title *</label>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Eid Collection 2025"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-rose-500" />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Subtitle</label>
              <input value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder="Short description"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-rose-500" />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Image URL *</label>
              <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://…"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-rose-500" />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Link</label>
              <input value={link} onChange={e => setLink(e.target.value)} placeholder="/browse"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-rose-500" />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={addBanner}
              disabled={saving || !title.trim() || !imageUrl.trim()}
              className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Add Banner
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-24 gap-3 text-gray-500">
          <Loader2 className="w-5 h-5 animate-spin" /> Loading banners…
        </div>
      )}

      {!loading && (
        <div className="space-y-4">
          {banners.map((b, i) => (
            <div key={b.id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden flex gap-0">
              <div className="relative w-48 shrink-0 bg-gray-800 flex items-center justify-center">
                {b.imageUrl ? (
                  <img src={b.imageUrl} alt={b.title} className="w-full h-full object-cover absolute inset-0" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-gray-600" />
                )}
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute top-2 left-2 bg-gray-900/80 text-gray-400 text-[10px] px-2 py-0.5 rounded font-bold">
                  #{i + 1}
                </div>
              </div>
              <div className="flex-1 p-5 flex items-center gap-5">
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold">{b.title}</p>
                  <p className="text-gray-500 text-sm mt-0.5">{b.subtitle}</p>
                  <p className="text-gray-600 text-xs mt-1.5 font-mono">→ {b.link}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${b.active ? "bg-emerald-900/30 text-emerald-400" : "bg-gray-700 text-gray-500"}`}>
                    {b.active ? "Active" : "Hidden"}
                  </span>
                  <button
                    onClick={() => toggleActive(b.id)}
                    disabled={toggling === b.id}
                    className="p-2 text-gray-500 hover:text-blue-400 hover:bg-blue-900/20 rounded-lg transition-colors disabled:opacity-40"
                  >
                    {toggling === b.id
                      ? <Loader2 className="w-4 h-4 animate-spin" />
                      : b.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />
                    }
                  </button>
                  <button
                    onClick={() => removeBanner(b.id)}
                    disabled={deleting === b.id}
                    className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-40"
                  >
                    {deleting === b.id
                      ? <Loader2 className="w-4 h-4 animate-spin" />
                      : <Trash2 className="w-4 h-4" />
                    }
                  </button>
                </div>
              </div>
            </div>
          ))}

          {banners.length === 0 && (
            <div className="text-center py-20 text-gray-600 text-sm">No banners yet. Add one above.</div>
          )}
        </div>
      )}
    </div>
  );
}
