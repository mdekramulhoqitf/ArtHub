"use client";

import { useState, useEffect } from "react";
import { Save, Globe, Percent, Bell, Lock, Loader2 } from "lucide-react";

interface Settings {
  site_name: string;
  site_tagline: string;
  promo_bar: string;
  platform_fee: string;
  maintenance_mode: string;
  new_registrations: string;
  auto_approve_shops: string;
  min_price: string;
  max_price: string;
}

const DEFAULTS: Settings = {
  site_name: "ArtHub",
  site_tagline: "Buy & Sell Original Art",
  promo_bar: "Free worldwide shipping on orders over BDT 15,000 · 2% platform fee only",
  platform_fee: "2",
  maintenance_mode: "false",
  new_registrations: "true",
  auto_approve_shops: "false",
  min_price: "500",
  max_price: "500000",
};

export default function SuperAdminSiteSettings() {
  const [s, setS] = useState<Settings>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/superadmin/settings")
      .then(r => r.json())
      .then(data => setS(prev => ({ ...prev, ...data })))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function set(key: keyof Settings, val: string) {
    setS(prev => ({ ...prev, [key]: val }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/superadmin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(s),
      });
      if (!res.ok) throw new Error();
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      alert("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  }

  const Section = ({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) => (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
      <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
        <div className="w-8 h-8 bg-rose-600/20 rounded-lg flex items-center justify-center">
          <Icon className="w-4 h-4 text-rose-400" />
        </div>
        <h2 className="font-semibold text-white">{title}</h2>
      </div>
      {children}
    </div>
  );

  const Field = ({ label, sub, children }: { label: string; sub?: string; children: React.ReactNode }) => (
    <div className="flex items-center justify-between gap-6">
      <div className="flex-1">
        <p className="text-sm font-medium text-white">{label}</p>
        {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-colors ${value ? "bg-rose-600" : "bg-gray-700"}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${value ? "translate-x-5" : ""}`} />
    </button>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 gap-3 text-gray-500">
        <Loader2 className="w-5 h-5 animate-spin" /> Loading settings…
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Site Settings</h1>
          <p className="text-gray-500 text-sm mt-0.5">Full platform configuration</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-60 ${saved ? "bg-emerald-600 text-white" : "bg-rose-600 hover:bg-rose-700 text-white"}`}
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <Section icon={Globe} title="General">
        <Field label="Site Name">
          <input value={s.site_name} onChange={e => set("site_name", e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-rose-500 w-48" />
        </Field>
        <Field label="Tagline">
          <input value={s.site_tagline} onChange={e => set("site_tagline", e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-rose-500 w-64" />
        </Field>
        <Field label="Promo Bar Text" sub="Shown above the navbar">
          <input value={s.promo_bar} onChange={e => set("promo_bar", e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-rose-500 w-72" />
        </Field>
      </Section>

      <Section icon={Percent} title="Pricing & Fees">
        <Field label="Platform Fee %" sub="Percentage taken from each sale">
          <div className="flex items-center gap-2">
            <input
              type="number" min="1" max="50"
              value={s.platform_fee}
              onChange={e => set("platform_fee", e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-rose-500 w-20 text-center"
            />
            <span className="text-gray-400 text-sm">%</span>
          </div>
        </Field>
        <Field label="Min Artwork Price (BDT)">
          <input type="number" value={s.min_price} onChange={e => set("min_price", e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-rose-500 w-32" />
        </Field>
        <Field label="Max Artwork Price (BDT)">
          <input type="number" value={s.max_price} onChange={e => set("max_price", e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-rose-500 w-32" />
        </Field>
      </Section>

      <Section icon={Bell} title="Registration & Moderation">
        <Field label="Allow New Registrations" sub="Disable to freeze new signups">
          <Toggle value={s.new_registrations === "true"} onChange={v => set("new_registrations", String(v))} />
        </Field>
        <Field label="Auto-Approve Shops" sub="Skip manual review for new shops">
          <Toggle value={s.auto_approve_shops === "true"} onChange={v => set("auto_approve_shops", String(v))} />
        </Field>
      </Section>

      <Section icon={Lock} title="Maintenance">
        <Field label="Maintenance Mode" sub="Take the site offline for visitors. Admins still have access.">
          <Toggle value={s.maintenance_mode === "true"} onChange={v => set("maintenance_mode", String(v))} />
        </Field>
        {s.maintenance_mode === "true" && (
          <div className="bg-amber-900/20 border border-amber-700/40 rounded-xl p-4 text-amber-300 text-sm">
            ⚠ Maintenance mode is ON. Public visitors will see a maintenance page.
          </div>
        )}
      </Section>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-3">
        <h2 className="font-semibold text-white text-sm">Super Admin Access</h2>
        <p className="text-gray-500 text-xs leading-relaxed">
          To change superadmin credentials, update <code className="text-rose-400">SUPERADMIN_USERNAME</code> and <code className="text-rose-400">SUPERADMIN_PASSWORD</code> in your <code className="text-rose-400">.env</code> file and restart the server.
        </p>
      </div>
    </div>
  );
}
