"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p className="text-sm font-semibold text-rose-700 py-4">
        ✓ You&apos;re subscribed! Welcome to the ArtHub community.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
      className="flex flex-col sm:flex-row gap-2"
    >
      <input
        type="email"
        placeholder="Your email address"
        required
        className="flex-1 border border-[#c5bfb0] bg-white px-4 py-3 text-sm outline-none focus:border-[#1a1a2e] transition-colors placeholder:text-gray-400"
      />
      <button
        type="submit"
        className="bg-rose-700 text-white px-6 py-3 text-sm font-semibold tracking-wide hover:bg-rose-800 transition-colors whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  );
}
