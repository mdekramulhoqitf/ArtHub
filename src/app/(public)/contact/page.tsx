"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

const faqs = [
  { q: "How do I sell my artwork?", a: "Register as a seller, open your shop, and upload your artworks. We handle payments and shipping labels." },
  { q: "What is the platform fee?", a: "ArtHub charges just 2% per sale — one of the lowest in the industry. You keep 98%." },
  { q: "How long does shipping take?", a: "Shipping times vary by artist location and destination. Most orders arrive within 7–14 business days." },
  { q: "Can I become a partner?", a: "Yes! Email us at partners@arthub.com or fill out the form and select 'Partnership Inquiry'." },
];

export default function ContactPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", subject: "General Inquiry", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Required";
    return e;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-gray-50 border-b border-gray-100 py-20 text-center px-4">
        <p className="text-xs font-semibold tracking-[0.2em] text-rose-600 uppercase mb-4">We&apos;re Here to Help</p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-gray-500 max-w-lg mx-auto text-base leading-relaxed">
          Have a question, partnership idea, or just want to say hello? We&apos;d love to hear from you.
        </p>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <CheckCircle className="w-14 h-14 text-green-500" />
                <h3 className="font-heading text-xl font-bold text-gray-900">Message Sent!</h3>
                <p className="text-gray-500 text-sm max-w-xs">
                  Thanks for reaching out. We&apos;ll get back to you within 24 hours on business days.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ firstName: "", lastName: "", email: "", subject: "General Inquiry", message: "" }); }}
                  className="mt-2 text-sm text-rose-600 underline underline-offset-2 hover:text-rose-700"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">First Name</label>
                    <input
                      name="firstName"
                      type="text"
                      placeholder="John"
                      value={form.firstName}
                      onChange={handleChange}
                      className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 transition ${errors.firstName ? "border-red-400 focus:border-red-400 focus:ring-red-200" : "border-gray-200 focus:border-rose-400 focus:ring-rose-200"}`}
                    />
                    {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Last Name</label>
                    <input
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                      value={form.lastName}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-200 transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Email</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 transition ${errors.email ? "border-red-400 focus:border-red-400 focus:ring-red-200" : "border-gray-200 focus:border-rose-400 focus:ring-rose-200"}`}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Subject</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-200 transition bg-white"
                  >
                    <option>General Inquiry</option>
                    <option>Buyer Support</option>
                    <option>Seller Support</option>
                    <option>Partnership Inquiry</option>
                    <option>Press &amp; Media</option>
                    <option>Report an Issue</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Message</label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell us how we can help..."
                    value={form.message}
                    onChange={handleChange}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 transition resize-none ${errors.message ? "border-red-400 focus:border-red-400 focus:ring-red-200" : "border-gray-200 focus:border-rose-400 focus:ring-rose-200"}`}
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-rose-700 hover:bg-rose-800 disabled:opacity-60 text-white font-semibold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : "Send Message"}
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <div className="space-y-4">
                {[
                  { label: "General Support", value: "support@arthub.com" },
                  { label: "Partnerships", value: "partners@arthub.com" },
                  { label: "Press & Media", value: "press@arthub.com" },
                  { label: "Response Time", value: "Within 24 hours on business days" },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{item.label}</p>
                      <p className="text-sm text-gray-800 mt-0.5">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h3 className="font-heading text-lg font-bold text-gray-900 mb-4">Common Questions</h3>
              <div className="space-y-4">
                {faqs.map((f) => (
                  <div key={f.q} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-sm font-semibold text-gray-800 mb-1">{f.q}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
