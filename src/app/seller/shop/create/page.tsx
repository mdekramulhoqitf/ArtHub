"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Palette, Loader2, CheckCircle, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

const EMPTY = {
  displayName: "",
  location: "",
  bio: "",
  websiteUrl: "",
  instagramUrl: "",
};

export default function CreateShopPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [checkingShop, setCheckingShop] = useState(true);
  const [existingShop, setExistingShop] = useState<{ isApproved: boolean; displayName: string } | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") { router.push("/login"); return; }
    if (status === "loading") return;

    const role = (session?.user as any)?.role;
    if (role === "SELLER" || role === "ADMIN") {
      router.push("/seller/dashboard");
      return;
    }

    fetch("/api/seller/shop")
      .then(r => r.json())
      .then(data => { setExistingShop(data); })
      .catch(() => {})
      .finally(() => setCheckingShop(false));
  }, [status, session, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.displayName.trim()) { setError("Shop name required."); return; }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/seller/shop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create shop.");
      }
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  function field(key: keyof typeof form, label: string, opts?: { placeholder?: string; type?: string; textarea?: boolean }) {
    return (
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        {opts?.textarea ? (
          <textarea
            value={form[key]}
            onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
            placeholder={opts.placeholder}
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 resize-none"
          />
        ) : (
          <input
            type={opts?.type ?? "text"}
            value={form[key]}
            onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
            placeholder={opts?.placeholder}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
          />
        )}
      </div>
    );
  }

  if (status === "loading" || checkingShop) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-rose-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="w-9 h-9 bg-rose-600 rounded-xl flex items-center justify-center shadow-md">
          <Palette className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-xl text-gray-900">Art<span className="text-rose-600">Hub</span></span>
      </Link>

      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

        {/* Already submitted / existing pending shop */}
        {(submitted || (existingShop && !existingShop.isApproved)) && (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center mx-auto">
              <Clock className="w-7 h-7 text-amber-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Pending Approval</h2>
              <p className="text-sm text-gray-500 mt-1">
                Your shop <span className="font-semibold text-gray-700">&ldquo;{existingShop?.displayName ?? form.displayName}&rdquo;</span> has been submitted.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                An admin will review and approve it shortly. You&apos;ll be able to start selling once approved.
              </p>
            </div>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-rose-600 hover:underline mt-2">
              <ArrowLeft className="w-4 h-4" /> Back to home
            </Link>
          </div>
        )}

        {/* Already approved */}
        {existingShop && existingShop.isApproved && (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto">
              <CheckCircle className="w-7 h-7 text-emerald-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Shop Active</h2>
              <p className="text-sm text-gray-500 mt-1">
                <span className="font-semibold text-gray-700">&ldquo;{existingShop.displayName}&rdquo;</span> is live.
              </p>
            </div>
            <Link href="/seller/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 px-5 py-2.5 rounded-xl transition-colors">
              Go to Dashboard
            </Link>
          </div>
        )}

        {/* Create form */}
        {!submitted && !existingShop && (
          <>
            <div className="px-7 pt-7 pb-4 border-b border-gray-100">
              <h1 className="text-xl font-bold text-gray-900">Open Your Shop</h1>
              <p className="text-sm text-gray-500 mt-1">Fill in your shop details. An admin will review and approve it before you can start selling.</p>
            </div>

            <form onSubmit={handleSubmit} className="px-7 py-6 space-y-5">
              {field("displayName", "Shop Name *", { placeholder: "e.g. Rahim Art Studio" })}

              {form.displayName && (
                <p className="text-xs text-gray-400 -mt-3">
                  URL: <span className="text-gray-600">/shop/{form.displayName.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "")}</span>
                </p>
              )}

              {field("location", "Location", { placeholder: "e.g. Dhanmondi, Dhaka" })}
              {field("bio", "About Your Shop", { placeholder: "Tell buyers about your art and style…", textarea: true })}
              {field("websiteUrl", "Website (optional)", { type: "url", placeholder: "https://yourwebsite.com" })}
              {field("instagramUrl", "Instagram (optional)", { type: "url", placeholder: "https://instagram.com/yourhandle" })}

              {error && (
                <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting || !form.displayName.trim()}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
              >
                {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</> : "Submit for Approval"}
              </button>

              <p className="text-xs text-center text-gray-400">
                Your shop won&apos;t be visible to buyers until an admin approves it.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
