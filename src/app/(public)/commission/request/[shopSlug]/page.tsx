"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  ArrowLeft, Palette, DollarSign, Calendar, Ruler,
  Image as ImageIcon, Send, CheckCircle, AlertCircle, Loader2,
} from "lucide-react";

const CATEGORIES = [
  "Painting", "Watercolor", "Oil on Canvas", "Acrylic", "Charcoal/Sketch",
  "Digital Art", "Portrait", "Landscape", "Abstract", "Calligraphy",
  "Sculpture", "Mixed Media", "Textile / Nakshi Kantha", "Other",
];

interface Props {
  params: Promise<{ shopSlug: string }>;
}

export default function CommissionRequestPage({ params }: Props) {
  const { shopSlug } = use(params);
  const router = useRouter();
  const { data: session, status } = useSession();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    budgetMin: "",
    budgetMax: "",
    deadline: "",
    widthCm: "",
    heightCm: "",
    referenceImages: [""],
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function set(key: string, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function setImage(idx: number, val: string) {
    setForm((f) => {
      const imgs = [...f.referenceImages];
      imgs[idx] = val;
      return { ...f, referenceImages: imgs };
    });
  }

  function addImageField() {
    if (form.referenceImages.length >= 4) return;
    setForm((f) => ({ ...f, referenceImages: [...f.referenceImages, ""] }));
  }

  function removeImage(idx: number) {
    setForm((f) => ({
      ...f,
      referenceImages: f.referenceImages.filter((_, i) => i !== idx),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.title.trim() || !form.description.trim()) {
      setError("Title and description are required.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/commission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shopSlug,
          title: form.title,
          description: form.description,
          category: form.category || null,
          budgetMin: form.budgetMin || null,
          budgetMax: form.budgetMax || null,
          deadline: form.deadline || null,
          widthCm: form.widthCm || null,
          heightCm: form.heightCm || null,
          referenceImages: form.referenceImages.filter((u) => u.trim()),
        }),
      });

      if (!res.ok) {
        const d = await res.json();
        setError(d.error ?? "Something went wrong.");
        return;
      }

      setSuccess(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-rose-500" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#f5f2ea] flex items-center justify-center px-4">
        <div className="bg-white p-8 max-w-md w-full text-center border border-[#1a1a2e]/10">
          <Palette className="w-12 h-12 text-rose-400 mx-auto mb-4" />
          <h2 className="font-heading text-2xl font-bold text-[#1a1a2e] mb-2">Sign In Required</h2>
          <p className="text-[#1a1a2e]/60 text-sm mb-6">Sign in to send a commission request to this artist.</p>
          <Link
            href={`/login?callbackUrl=/commission/request/${shopSlug}`}
            className="inline-block bg-[#1a1a2e] text-white px-8 py-3 text-sm font-semibold hover:bg-rose-700 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#f5f2ea] flex items-center justify-center px-4">
        <div className="bg-white p-10 max-w-md w-full text-center border border-[#1a1a2e]/10">
          <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-5" />
          <h2 className="font-heading text-2xl font-bold text-[#1a1a2e] mb-3">Request Sent!</h2>
          <p className="text-[#1a1a2e]/60 text-sm mb-8 leading-relaxed">
            Your commission request has been sent to the artist. They will review it and respond soon.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/buyer/commissions"
              className="block bg-[#1a1a2e] text-white px-8 py-3 text-sm font-semibold hover:bg-rose-700 transition-colors"
            >
              View My Commissions
            </Link>
            <Link
              href={`/shop/${shopSlug}`}
              className="block border border-[#1a1a2e]/20 text-[#1a1a2e] px-8 py-3 text-sm font-medium hover:bg-[#1a1a2e]/5 transition-colors"
            >
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f2ea]">
      {/* Header */}
      <div className="bg-[#1a1a2e] text-white">
        <div className="container mx-auto px-4 py-6">
          <Link
            href={`/shop/${shopSlug}`}
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-xs uppercase tracking-wider mb-4 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back to Shop
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-600 flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold">Request Custom Artwork</h1>
              <p className="text-white/40 text-sm">Commission a unique piece made just for you</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div className="bg-white border border-[#1a1a2e]/8 p-6">
            <label className="block text-xs uppercase tracking-wider text-[#1a1a2e]/40 mb-2 font-medium">
              Commission Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Portrait of my family, 60×80cm watercolor landscape..."
              className="w-full border border-[#1a1a2e]/15 px-4 py-3 text-sm text-[#1a1a2e] placeholder-[#1a1a2e]/30 focus:outline-none focus:border-rose-400 transition-colors"
              maxLength={120}
            />
            <p className="text-xs text-[#1a1a2e]/30 mt-1 text-right">{form.title.length}/120</p>
          </div>

          {/* Description */}
          <div className="bg-white border border-[#1a1a2e]/8 p-6">
            <label className="block text-xs uppercase tracking-wider text-[#1a1a2e]/40 mb-2 font-medium">
              Detailed Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Describe exactly what you want — subject matter, mood, colors, style, special requirements, who it's for, occasion..."
              rows={6}
              className="w-full border border-[#1a1a2e]/15 px-4 py-3 text-sm text-[#1a1a2e] placeholder-[#1a1a2e]/30 focus:outline-none focus:border-rose-400 transition-colors resize-none"
              maxLength={2000}
            />
            <p className="text-xs text-[#1a1a2e]/30 mt-1 text-right">{form.description.length}/2000</p>
          </div>

          {/* Category */}
          <div className="bg-white border border-[#1a1a2e]/8 p-6">
            <label className="block text-xs uppercase tracking-wider text-[#1a1a2e]/40 mb-3 font-medium">
              <Palette className="w-3.5 h-3.5 inline mr-1" /> Art Category
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => set("category", form.category === cat ? "" : cat)}
                  className={`px-3 py-1.5 text-xs font-medium border transition-all ${
                    form.category === cat
                      ? "bg-[#1a1a2e] text-white border-[#1a1a2e]"
                      : "bg-white text-[#1a1a2e]/60 border-[#1a1a2e]/15 hover:border-[#1a1a2e]/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div className="bg-white border border-[#1a1a2e]/8 p-6">
            <label className="block text-xs uppercase tracking-wider text-[#1a1a2e]/40 mb-3 font-medium">
              <DollarSign className="w-3.5 h-3.5 inline mr-1" /> Budget Range (BDT)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-[#1a1a2e]/40 mb-1">Minimum</p>
                <input
                  type="number"
                  value={form.budgetMin}
                  onChange={(e) => set("budgetMin", e.target.value)}
                  placeholder="৳ 0"
                  min={0}
                  className="w-full border border-[#1a1a2e]/15 px-4 py-3 text-sm text-[#1a1a2e] focus:outline-none focus:border-rose-400 transition-colors"
                />
              </div>
              <div>
                <p className="text-xs text-[#1a1a2e]/40 mb-1">Maximum</p>
                <input
                  type="number"
                  value={form.budgetMax}
                  onChange={(e) => set("budgetMax", e.target.value)}
                  placeholder="৳ 50,000"
                  min={0}
                  className="w-full border border-[#1a1a2e]/15 px-4 py-3 text-sm text-[#1a1a2e] focus:outline-none focus:border-rose-400 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Deadline & Size */}
          <div className="bg-white border border-[#1a1a2e]/8 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#1a1a2e]/40 mb-2 font-medium">
                  <Calendar className="w-3.5 h-3.5 inline mr-1" /> Deadline (Optional)
                </label>
                <input
                  type="date"
                  value={form.deadline}
                  onChange={(e) => set("deadline", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full border border-[#1a1a2e]/15 px-4 py-3 text-sm text-[#1a1a2e] focus:outline-none focus:border-rose-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#1a1a2e]/40 mb-2 font-medium">
                  <Ruler className="w-3.5 h-3.5 inline mr-1" /> Size (Optional)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={form.widthCm}
                    onChange={(e) => set("widthCm", e.target.value)}
                    placeholder="W cm"
                    min={0}
                    className="w-full border border-[#1a1a2e]/15 px-3 py-3 text-sm text-[#1a1a2e] focus:outline-none focus:border-rose-400 transition-colors"
                  />
                  <span className="flex items-center text-[#1a1a2e]/30 text-sm">×</span>
                  <input
                    type="number"
                    value={form.heightCm}
                    onChange={(e) => set("heightCm", e.target.value)}
                    placeholder="H cm"
                    min={0}
                    className="w-full border border-[#1a1a2e]/15 px-3 py-3 text-sm text-[#1a1a2e] focus:outline-none focus:border-rose-400 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Reference Images */}
          <div className="bg-white border border-[#1a1a2e]/8 p-6">
            <label className="block text-xs uppercase tracking-wider text-[#1a1a2e]/40 mb-1 font-medium">
              <ImageIcon className="w-3.5 h-3.5 inline mr-1" /> Reference Image URLs (Optional)
            </label>
            <p className="text-xs text-[#1a1a2e]/30 mb-3">Paste image URLs to show the artist what style/reference you have in mind. Max 4.</p>
            <div className="space-y-2">
              {form.referenceImages.map((url, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setImage(idx, e.target.value)}
                    placeholder="https://example.com/reference.jpg"
                    className="flex-1 border border-[#1a1a2e]/15 px-4 py-2.5 text-sm text-[#1a1a2e] placeholder-[#1a1a2e]/25 focus:outline-none focus:border-rose-400 transition-colors"
                  />
                  {form.referenceImages.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="text-[#1a1a2e]/30 hover:text-rose-500 transition-colors px-2"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            {form.referenceImages.length < 4 && (
              <button
                type="button"
                onClick={addImageField}
                className="mt-2 text-xs text-rose-500 hover:text-rose-700 font-medium"
              >
                + Add another reference
              </button>
            )}
          </div>

          {/* Tips */}
          <div className="bg-rose-50 border border-rose-100 p-4">
            <p className="text-xs font-semibold text-rose-700 mb-2">Tips for a great commission request:</p>
            <ul className="text-xs text-rose-600/80 space-y-1 list-disc list-inside">
              <li>Be specific about subject, mood, and colors you want</li>
              <li>Mention the occasion (gift, home decor, event)</li>
              <li>Include a realistic budget — artists will quote accordingly</li>
              <li>Reference images help the artist understand your vision</li>
            </ul>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#1a1a2e] hover:bg-rose-700 text-white py-4 text-sm font-semibold tracking-wide transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Sending Request…</>
            ) : (
              <><Send className="w-4 h-4" /> Send Commission Request</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
