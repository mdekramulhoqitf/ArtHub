import { Ruler, Home, Monitor, CheckCircle } from "lucide-react";
import Link from "next/link";

const SIZES = [
  {
    label: "Small",
    range: "Up to 30 × 40 cm",
    icon: "📱",
    best: ["Bedroom side table", "Bathroom wall", "Small nook", "Desk / shelf"],
    rooms: "Ideal for intimate spaces or as part of a gallery wall.",
    priceRange: "৳1,500 – ৳8,000",
    tip: "Small works shine in clusters. Mix 3–5 pieces at different heights for a gallery wall effect.",
  },
  {
    label: "Medium",
    range: "40 × 50 cm – 60 × 80 cm",
    icon: "🖼️",
    best: ["Living room accent wall", "Bedroom above headboard", "Home office", "Dining room"],
    rooms: "The most versatile size — works in almost any room without overpowering.",
    priceRange: "৳5,000 – ৳25,000",
    tip: "Hang the center of the artwork at eye level — approximately 145–155 cm from the floor.",
  },
  {
    label: "Large",
    range: "70 × 90 cm – 100 × 120 cm",
    icon: "🏛️",
    best: ["Living room focal point", "Open plan space", "Hotel lobby", "Corporate reception"],
    rooms: "Makes a strong statement. Anchors a room and commands attention.",
    priceRange: "৳15,000 – ৳60,000",
    tip: "Leave at least 20 cm of wall space on each side of the artwork. Avoid cluttering around it.",
  },
  {
    label: "Extra Large",
    range: "120 cm+ on any side",
    icon: "🎭",
    best: ["Large living rooms", "Staircase walls", "Corporate spaces", "Exhibition halls"],
    rooms: "Transforms a space. Best for high-ceiling rooms with generous wall space.",
    priceRange: "৳40,000+",
    tip: "Consider the viewing distance — you need at least 2–3× the artwork's height to appreciate it properly.",
  },
];

const ROOM_GUIDE = [
  { room: "Living Room", recommended: "Medium to Large (60–120 cm wide)", notes: "Choose one statement piece or create a gallery wall with 3–7 smaller works." },
  { room: "Bedroom", recommended: "Medium (50–80 cm wide)", notes: "Above the bed: width should be 50–75% of the headboard width." },
  { room: "Dining Room", recommended: "Medium to Large (60–100 cm wide)", notes: "At seated eye level. Avoid overly busy compositions that distract from meals." },
  { room: "Home Office", recommended: "Small to Medium (30–60 cm)", notes: "Something inspiring but not distracting. Placed behind your monitor works well for video calls." },
  { room: "Bathroom", recommended: "Small (20–40 cm)", notes: "Consider moisture — choose works under glass, or digital prints." },
  { room: "Hallway / Entry", recommended: "Tall format, Medium (40–60 cm wide)", notes: "Vertical works suit narrow walls. Keep it welcoming and inviting." },
];

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-[#f5f2ea]">
      {/* Hero */}
      <div className="bg-[#1a1a2e] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Ruler className="w-6 h-6 text-rose-400" />
            <span className="text-rose-400 font-semibold text-sm uppercase tracking-widest">Size Guide</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">How to Choose the Right Size Artwork</h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            The right size transforms a room. The wrong size leaves it feeling off. Use this guide to choose confidently.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* Golden rule */}
        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 flex gap-4">
          <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center shrink-0">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-rose-900 mb-1">The Golden Rule</p>
            <p className="text-rose-800 text-sm leading-relaxed">
              Artwork width should be <strong>50–75% of the furniture width beneath it</strong>. For a 180 cm sofa, choose an artwork 90–135 cm wide. For walls without furniture, artwork should fill 60–75% of the wall space.
            </p>
          </div>
        </div>

        {/* Size cards */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">Artwork Sizes at a Glance</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {SIZES.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{s.icon}</span>
                  <div>
                    <p className="font-heading text-lg font-bold text-gray-900">{s.label}</p>
                    <p className="text-gray-400 text-xs">{s.range}</p>
                  </div>
                  <span className="ml-auto text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">{s.priceRange}</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{s.rooms}</p>
                <div className="mb-3">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Best for</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.best.map((b) => (
                      <span key={b} className="text-xs bg-gray-50 text-gray-600 border border-gray-100 px-2 py-0.5 rounded-full">{b}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                  <p className="text-xs text-amber-800"><span className="font-semibold">Pro tip:</span> {s.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Room guide */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Home className="w-6 h-6 text-rose-500" /> By Room
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Room</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Recommended Size</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {ROOM_GUIDE.map((r) => (
                  <tr key={r.room} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 font-medium text-gray-900">{r.room}</td>
                    <td className="px-5 py-4 text-rose-600 font-semibold text-xs">{r.recommended}</td>
                    <td className="px-5 py-4 text-gray-500 text-xs hidden sm:table-cell">{r.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Virtual measure tip */}
        <div className="bg-[#1a1a2e] rounded-2xl p-8 text-white text-center">
          <Monitor className="w-10 h-10 text-rose-400 mx-auto mb-3" />
          <h3 className="font-heading text-xl font-bold mb-2">Still Unsure?</h3>
          <p className="text-gray-400 text-sm mb-5 max-w-md mx-auto">
            Cut a piece of newspaper to the exact size you're considering and tape it to the wall. Live with it for a day before ordering — it's the oldest trick and still the best.
          </p>
          <Link href="/art-advisory" className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors">
            Get Personal Art Advice
          </Link>
        </div>
      </div>
    </div>
  );
}
