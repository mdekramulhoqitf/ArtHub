"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Sparkles, RotateCcw } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const STEPS = [
  {
    id: "mood",
    question: "What feeling do you want art to create in your space?",
    options: [
      { id: "calm", label: "Calm & Serene", emoji: "🌊", desc: "Peaceful, meditative, soft" },
      { id: "energy", label: "Energetic & Bold", emoji: "🔥", desc: "Vibrant, powerful, dynamic" },
      { id: "inspiring", label: "Inspiring & Uplifting", emoji: "✨", desc: "Motivating, positive, light" },
      { id: "mysterious", label: "Mysterious & Deep", emoji: "🌙", desc: "Dark, contemplative, layered" },
    ],
  },
  {
    id: "style",
    question: "Which style resonates with you most?",
    options: [
      { id: "abstract", label: "Abstract", emoji: "🎨", desc: "Non-representational, expressive" },
      { id: "realistic", label: "Realistic / Traditional", emoji: "🖼️", desc: "Detailed, skilled, classical" },
      { id: "contemporary", label: "Contemporary", emoji: "⬜", desc: "Modern, minimal, conceptual" },
      { id: "folk", label: "Folk / Heritage", emoji: "🪡", desc: "Traditional Bangladeshi patterns" },
    ],
  },
  {
    id: "subject",
    question: "What subject matter speaks to you?",
    options: [
      { id: "nature", label: "Nature & Landscape", emoji: "🌿", desc: "Rivers, fields, skies" },
      { id: "people", label: "Figures & Portraits", emoji: "👤", desc: "Human form and expression" },
      { id: "urban", label: "City & Architecture", emoji: "🏙️", desc: "Streets, buildings, life" },
      { id: "abstract_sub", label: "Pure Abstraction", emoji: "◉", desc: "Color, form, texture only" },
    ],
  },
  {
    id: "budget",
    question: "What's your budget?",
    options: [
      { id: "budget_low", label: "Under ৳5,000", emoji: "💚", desc: "Great art, accessible price" },
      { id: "budget_mid", label: "৳5,000 – ৳20,000", emoji: "💛", desc: "Mid-range, quality pieces" },
      { id: "budget_high", label: "৳20,000 – ৳60,000", emoji: "🧡", desc: "Investment-grade works" },
      { id: "budget_premium", label: "Above ৳60,000", emoji: "❤️", desc: "Museum-quality originals" },
    ],
  },
  {
    id: "space",
    question: "Where will this artwork live?",
    options: [
      { id: "living_room", label: "Living Room", emoji: "🛋️", desc: "Statement piece, central view" },
      { id: "bedroom", label: "Bedroom", emoji: "🛏️", desc: "Intimate, calming, personal" },
      { id: "office", label: "Office / Study", emoji: "💻", desc: "Focused, inspiring, professional" },
      { id: "dining", label: "Dining / Kitchen", emoji: "🍽️", desc: "Warm, social, convivial" },
    ],
  },
];

const RESULTS: Record<string, { title: string; desc: string; collection: string; collectionSlug: string; image: string; price: number; artSlug: string }[]> = {
  "calm-abstract": [
    { title: "Blue Serenity", desc: "Soft watercolor abstraction", collection: "Abstract Expressions", collectionSlug: "abstract", image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600", price: 3200, artSlug: "blue-serenity" },
    { title: "Quiet Harbor", desc: "Meditative seascape", collection: "Landscapes", collectionSlug: "landscapes", image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600", price: 4800, artSlug: "quiet-harbor" },
  ],
  default: [
    { title: "Golden Sunset", desc: "Warm oil painting", collection: "New Arrivals", collectionSlug: "new-arrivals", image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600", price: 4500, artSlug: "golden-sunset" },
    { title: "Abstract Thoughts", desc: "Mixed media contemporary", collection: "Abstract Expressions", collectionSlug: "abstract", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600", price: 5600, artSlug: "abstract-thoughts" },
    { title: "Urban Echoes", desc: "Bold city abstraction", collection: "Statement Pieces", collectionSlug: "large-format", image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600", price: 7800, artSlug: "urban-echoes" },
  ],
};

type Answers = Record<string, string>;

export default function FindYourArtPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);

  const current = STEPS[step];

  function pick(optionId: string) {
    const newAnswers = { ...answers, [current.id]: optionId };
    setAnswers(newAnswers);
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  }

  function reset() {
    setAnswers({});
    setStep(0);
    setDone(false);
  }

  const key = `${answers.mood}-${answers.style}`;
  const results = RESULTS[key] ?? RESULTS.default;

  const progress = ((step) / STEPS.length) * 100;

  if (done) {
    return (
      <div className="min-h-screen bg-[#f5f2ea]">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-rose-600" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">Your Perfect Art Matches</h1>
            <p className="text-gray-500">Based on your style preferences, here are our recommendations.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {results.map((art) => (
              <Link key={art.artSlug} href={`/artwork/${art.artSlug}`} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all block">
                <div className="relative aspect-square overflow-hidden">
                  <Image src={art.image} alt={art.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                </div>
                <div className="p-4">
                  <p className="text-xs text-rose-500 font-semibold mb-1">{art.collection}</p>
                  <p className="font-semibold text-gray-900 group-hover:text-rose-700 transition-colors">{art.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5 mb-2">{art.desc}</p>
                  <p className="font-bold text-rose-600">{formatPrice(art.price)}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center space-y-4">
            <p className="text-gray-600 text-sm">Want to explore more works that match your taste?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/browse" className="flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors">
                Browse All Art <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/collections" className="flex items-center justify-center gap-2 bg-[#1a1a2e] hover:bg-gray-800 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors">
                View Collections
              </Link>
              <button onClick={reset} className="flex items-center justify-center gap-2 border border-gray-200 text-gray-600 hover:border-gray-400 px-6 py-3 rounded-xl text-sm font-medium transition-colors">
                <RotateCcw className="w-4 h-4" /> Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f2ea] flex flex-col">
      {/* Progress bar */}
      <div className="h-1 bg-gray-200">
        <div className="h-1 bg-rose-500 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-rose-500" />
              <span className="text-rose-500 text-sm font-semibold uppercase tracking-widest">Art Finder</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Step {step + 1} of {STEPS.length}</p>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-gray-900">{current.question}</h1>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4">
            {current.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => pick(opt.id)}
                className="group bg-white border-2 border-gray-100 hover:border-rose-400 hover:shadow-lg rounded-2xl p-5 text-left transition-all"
              >
                <div className="text-3xl mb-3">{opt.emoji}</div>
                <p className="font-semibold text-gray-900 group-hover:text-rose-700 transition-colors mb-1">{opt.label}</p>
                <p className="text-xs text-gray-400">{opt.desc}</p>
              </button>
            ))}
          </div>

          {/* Back */}
          {step > 0 && (
            <div className="text-center mt-6">
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mx-auto transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Go back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
