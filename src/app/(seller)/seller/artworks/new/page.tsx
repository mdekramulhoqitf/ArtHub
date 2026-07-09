"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, Plus, Image as ImageIcon, Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = ["Paintings", "Sculptures", "Digital Art", "Photography", "Drawings", "Prints", "Mixed Media", "Textile"];
const MEDIUMS = ["Oil on canvas", "Watercolor", "Acrylic", "Gouache", "Digital", "Pencil", "Charcoal", "Mixed media", "Ink", "Pastel"];
const EDITIONS = [
  { value: "ORIGINAL", label: "Original — one-of-a-kind work" },
  { value: "LIMITED", label: "Limited Edition — numbered series" },
  { value: "OPEN", label: "Open Edition — unlimited prints" },
];

export default function NewArtworkPage() {
  const router = useRouter();
  const [imageUrls, setImageUrls] = useState<string[]>([""]);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMediums, setSelectedMediums] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [platformFee, setPlatformFee] = useState(10);

  useEffect(() => {
    fetch("/api/settings")
      .then(r => r.json())
      .then(data => { if (data.platform_fee) setPlatformFee(Number(data.platform_fee)); })
      .catch(() => {});
  }, []);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    edition: "ORIGINAL",
    editionCount: "",
    stockQuantity: "1",
    widthCm: "",
    heightCm: "",
    depthCm: "",
    yearCreated: new Date().getFullYear().toString(),
  });

  function addTag(e: React.KeyboardEvent) {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) setTags(p => [...p, tagInput.trim()]);
      setTagInput("");
    }
  }

  function addImageUrl() {
    const url = imageUrlInput.trim();
    if (!url) return;
    if (imageUrls.filter(Boolean).length >= 8) return;
    setImageUrls(p => [...p.filter(Boolean), url]);
    setImageUrlInput("");
  }

  function removeImage(url: string) {
    setImageUrls(p => p.filter(u => u !== url));
  }

  // File upload → base64
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const remaining = 8 - imageUrls.filter(Boolean).length;
    files.slice(0, remaining).forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        const result = ev.target?.result as string;
        if (result) setImageUrls(p => [...p.filter(Boolean), result]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  }

  async function handleSubmit(publishStatus: "DRAFT" | "ACTIVE") {
    if (!form.title.trim()) { setError("Title is required."); return; }
    if (!form.price || Number(form.price) <= 0) { setError("Valid price is required."); return; }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/seller/artworks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          price: form.price,
          status: publishStatus,
          editionType: form.edition,
          editionCount: form.editionCount || null,
          stockQuantity: form.stockQuantity,
          widthCm: form.widthCm || null,
          heightCm: form.heightCm || null,
          depthCm: form.depthCm || null,
          yearCreated: form.yearCreated || null,
          tags,
          imageUrls: imageUrls.filter(Boolean),
          categoryNames: selectedCategories,
          mediumNames: selectedMediums,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save artwork.");
      }

      setSuccess(true);
      setTimeout(() => router.push("/seller/artworks"), 1200);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-full flex items-center justify-center py-24">
        <div className="text-center space-y-3">
          <CheckCircle className="w-14 h-14 text-emerald-500 mx-auto" />
          <p className="text-lg font-bold text-gray-900">Artwork saved!</p>
          <p className="text-sm text-gray-400">Redirecting to your artworks…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-gray-900">Upload Artwork</h1>
        <p className="text-gray-500 text-sm mt-1">Add a new piece to your shop</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Images column */}
        <div className="lg:col-span-1 space-y-4">
          <div>
            <p className="text-sm font-semibold text-gray-900">Photos</p>
            <p className="text-xs text-gray-400 mt-0.5">First image = cover. Max 8.</p>
          </div>

          {/* Upload zone */}
          <label className="block border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-rose-300 transition-colors cursor-pointer group bg-gray-50 hover:bg-rose-50">
            <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mx-auto mb-2 shadow-sm group-hover:bg-rose-100">
              <Upload className="w-5 h-5 text-gray-400 group-hover:text-rose-600" />
            </div>
            <p className="text-sm font-medium text-gray-700 group-hover:text-rose-700">Click to upload</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP</p>
          </label>

          {/* OR URL input */}
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="Or paste image URL…"
              value={imageUrlInput}
              onChange={e => setImageUrlInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addImageUrl(); } }}
              className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-rose-400"
            />
            <button type="button" onClick={addImageUrl} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-xs font-medium text-gray-600">
              Add
            </button>
          </div>

          {/* Image previews */}
          {imageUrls.filter(Boolean).length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {imageUrls.filter(Boolean).map((url, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  {i === 0 && (
                    <span className="absolute top-1 left-1 text-[10px] bg-rose-600 text-white px-1.5 py-0.5 rounded-md font-medium">Cover</span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(url)}
                    className="absolute top-1 right-1 w-5 h-5 bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="aspect-square rounded-xl bg-gray-100 border-2 border-dashed border-gray-200 flex items-center justify-center">
                  <ImageIcon className="w-4 h-4 text-gray-300" />
                </div>
              ))}
            </div>
          )}

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 space-y-1">
            <p className="font-semibold">Photo Tips</p>
            <p>· Natural light, neutral background</p>
            <p>· Show multiple angles</p>
            <p>· Include a detail close-up</p>
          </div>
        </div>

        {/* Form column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic info */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <h2 className="font-semibold text-gray-900">Artwork Information</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Title *</label>
              <input
                placeholder="e.g. Golden Sunset"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-rose-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea
                placeholder="Tell the story behind this piece…"
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-rose-400 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategories(p => p.includes(cat) ? p.filter(c => c !== cat) : [...p, cat])}
                    className={cn(
                      "px-3 py-1 rounded-full border text-sm transition-colors",
                      selectedCategories.includes(cat)
                        ? "border-rose-400 bg-rose-50 text-rose-700"
                        : "border-gray-200 text-gray-600 hover:border-rose-300"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Medium</label>
              <div className="flex flex-wrap gap-2">
                {MEDIUMS.map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setSelectedMediums(p => p.includes(m) ? p.filter(x => x !== m) : [...p, m])}
                    className={cn(
                      "px-3 py-1 rounded-full border text-sm transition-colors",
                      selectedMediums.includes(m)
                        ? "border-rose-400 bg-rose-50 text-rose-700"
                        : "border-gray-200 text-gray-600 hover:border-rose-300"
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    #{tag}
                    <button type="button" onClick={() => setTags(p => p.filter(t => t !== tag))} className="hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <input
                placeholder="Type tag and press Enter…"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={addTag}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-rose-400"
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <h2 className="font-semibold text-gray-900">Pricing & Edition</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Price (BDT) *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">৳</span>
                <input
                  type="number"
                  min="1"
                  placeholder="0"
                  value={form.price}
                  onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl pl-8 pr-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-rose-400"
                />
              </div>
              {form.price && Number(form.price) > 0 && (
                <p className="text-xs text-gray-400 mt-1">
                  You receive ৳{(Number(form.price) * (1 - platformFee / 100)).toLocaleString("en-BD")} after {platformFee}% platform fee
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Stock Quantity</label>
              <input
                type="number"
                min="1"
                value={form.stockQuantity}
                onChange={e => setForm(f => ({ ...f, stockQuantity: e.target.value }))}
                className="w-32 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-rose-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Edition Type</label>
              <div className="space-y-2">
                {EDITIONS.map(({ value, label }) => (
                  <label
                    key={value}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors",
                      form.edition === value ? "border-rose-400 bg-rose-50" : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <input
                      type="radio"
                      name="edition"
                      value={value}
                      checked={form.edition === value}
                      onChange={() => setForm(f => ({ ...f, edition: value }))}
                      className="accent-rose-600"
                    />
                    <span className="text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {form.edition === "LIMITED" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Edition Count</label>
                <input
                  type="number"
                  min="2"
                  placeholder="e.g. 50"
                  value={form.editionCount}
                  onChange={e => setForm(f => ({ ...f, editionCount: e.target.value }))}
                  className="w-32 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-rose-400"
                />
              </div>
            )}
          </div>

          {/* Dimensions */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <h2 className="font-semibold text-gray-900">Size & Details</h2>
            <div className="grid grid-cols-3 gap-4">
              {(["widthCm", "heightCm", "depthCm"] as const).map((key, i) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{["Width (cm)", "Height (cm)", "Depth (cm)"][i]}</label>
                  <input
                    type="number"
                    min="0"
                    placeholder={["60", "80", "2"][i]}
                    value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-rose-400"
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Year Created</label>
              <input
                type="number"
                placeholder="2025"
                value={form.yearCreated}
                onChange={e => setForm(f => ({ ...f, yearCreated: e.target.value }))}
                className="w-32 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-rose-400"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">{error}</div>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-end pb-8">
            <button
              type="button"
              disabled={submitting}
              onClick={() => handleSubmit("DRAFT")}
              className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:border-gray-300 hover:text-gray-900 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Save as Draft
            </button>
            <button
              type="button"
              disabled={submitting}
              onClick={() => handleSubmit("ACTIVE")}
              className="px-8 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Publish Artwork
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
