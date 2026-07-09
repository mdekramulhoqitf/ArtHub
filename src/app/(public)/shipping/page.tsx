import { Metadata } from "next";
import Link from "next/link";
import { Package, Globe, Clock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = { title: "Shipping Info" };

const ZONES = [
  { zone: "Bangladesh (Domestic)", time: "3–7 business days",      free: "$0 (all orders)" },
  { zone: "South Asia",            time: "7–14 business days",     free: "Free over $200"   },
  { zone: "Southeast Asia",        time: "10–18 business days",    free: "Free over $300"   },
  { zone: "Europe & UK",           time: "14–21 business days",    free: "Free over $500"   },
  { zone: "North America",         time: "14–21 business days",    free: "Free over $500"   },
  { zone: "Rest of World",         time: "18–28 business days",    free: "Free over $600"   },
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-[#1a1a2e] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-rose-400 mb-2">Delivery</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Shipping Info</h1>
          <p className="text-white/60 max-w-xl">
            Every artwork ships directly from the artist. Here&apos;s everything you need to know about how we get art from studio to door.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 space-y-16">

        {/* Key facts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Package,    title: "Professional Packaging", desc: "Every artwork is wrapped by the artist using acid-free materials, corner protectors, and rigid board backing." },
            { icon: Globe,      title: "Ships Worldwide",        desc: "Artists can ship to over 100 countries. Destination availability is shown on each listing." },
            { icon: Clock,      title: "Processing Time",        desc: "Artists have 3 business days to ship after an order is placed. Handmade-to-order works may take longer." },
            { icon: ShieldCheck,title: "Fully Insured",          desc: "All shipments are insured for the full purchase value. If artwork is lost or damaged in transit, we make it right." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="border border-gray-100 p-6">
              <div className="w-10 h-10 bg-rose-50 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-rose-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Delivery zones */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-[#1a1a2e] mb-6">Delivery Zones & Times</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-[#1a1a2e]">
                  <th className="text-left py-3 pr-6 font-semibold text-gray-900">Zone</th>
                  <th className="text-left py-3 pr-6 font-semibold text-gray-900">Estimated Time</th>
                  <th className="text-left py-3 font-semibold text-gray-900">Free Shipping From</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ZONES.map((z) => (
                  <tr key={z.zone} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 pr-6 text-gray-900 font-medium">{z.zone}</td>
                    <td className="py-3.5 pr-6 text-gray-500">{z.time}</td>
                    <td className="py-3.5 text-rose-700 font-medium">{z.free}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">Times are estimates from dispatch date. Customs delays may extend international delivery.</p>
        </div>

        {/* Customs */}
        <div className="bg-[#f5f2ea] border border-[#d8d3c5] p-8">
          <h2 className="font-heading text-xl font-bold text-[#1a1a2e] mb-4">Import Duties & Customs</h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            International orders may be subject to import duties and taxes in the destination country. These charges are the buyer&apos;s responsibility and are not included in the artwork price or shipping cost.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Most countries classify original artworks under a reduced or zero duty rate. We declare all items at full value as required by law.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-bold text-[#1a1a2e] mb-4">Questions?</h2>
          <p className="text-gray-600 mb-4">If your order hasn&apos;t arrived within the estimated window, or you have a shipping concern, our team is here to help.</p>
          <Link href="/contact" className="inline-block bg-rose-700 text-white px-6 py-3 text-sm font-semibold hover:bg-rose-800 transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
