"use client";

import { use, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Shield, Award, Loader2 } from "lucide-react";

interface CertData {
  orderId: string;
  artworkTitle: string;
  artistName: string;
  shopName: string;
  medium: string | null;
  dimensions: string | null;
  yearCreated: number | null;
  price: number;
  currency: string;
  editionType: string;
  purchaseDate: string;
  buyerName: string;
}

export default function CertificatePage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params);
  const [cert, setCert] = useState<CertData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/api/buyer/certificate/${orderId}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then(setCert)
      .catch(() => setError("Certificate not found or order not delivered yet."))
      .finally(() => setLoading(false));
  }, [orderId]);

  function printCert() {
    window.print();
  }

  if (loading) return (
    <div className="flex items-center justify-center py-24 gap-2 text-gray-400">
      <Loader2 className="w-5 h-5 animate-spin" /> Loading certificate…
    </div>
  );

  if (error || !cert) return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link href="/buyer/orders" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-rose-600 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Orders
      </Link>
      <div className="bg-white rounded-2xl border border-gray-100 py-20 text-center">
        <Shield className="w-12 h-12 text-gray-200 mx-auto mb-4" />
        <p className="text-gray-500">{error || "Certificate unavailable."}</p>
      </div>
    </div>
  );

  const certNumber = `AH-${cert.orderId.slice(-8).toUpperCase()}`;
  const issueDate = new Date(cert.purchaseDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between print:hidden">
        <Link href="/buyer/orders" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-rose-600 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Orders
        </Link>
        <button
          onClick={printCert}
          className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          <Download className="w-4 h-4" /> Download / Print
        </button>
      </div>

      {/* Certificate */}
      <div ref={printRef} className="bg-white rounded-2xl border-2 border-[#1a1a2e] overflow-hidden shadow-xl print:shadow-none print:border">
        {/* Top band */}
        <div className="bg-[#1a1a2e] py-6 px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Award className="w-8 h-8 text-rose-400" />
            <span className="font-heading text-2xl font-bold text-white tracking-wide">Art<span className="text-rose-400">Hub</span></span>
          </div>
          <p className="text-gray-400 text-xs uppercase tracking-widest">Certificate of Authenticity</p>
        </div>

        {/* Body */}
        <div className="p-10 space-y-8">
          {/* Center title */}
          <div className="text-center border-b border-dashed border-gray-200 pb-8">
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">This certifies that</p>
            <p className="font-heading text-3xl font-bold text-gray-900 mb-1">{cert.artworkTitle}</p>
            <p className="text-gray-500 text-sm">by <span className="font-semibold text-gray-700">{cert.artistName}</span></p>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "Certificate No.", value: certNumber },
              { label: "Issue Date", value: issueDate },
              { label: "Studio / Shop", value: cert.shopName },
              { label: "Edition Type", value: cert.editionType.charAt(0) + cert.editionType.slice(1).toLowerCase() },
              { label: "Medium", value: cert.medium || "Not specified" },
              { label: "Dimensions", value: cert.dimensions || "Not specified" },
              { label: "Year Created", value: cert.yearCreated ? String(cert.yearCreated) : "Not specified" },
              { label: "Owner", value: cert.buyerName },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">{label}</p>
                <p className="font-semibold text-gray-900 text-sm">{value}</p>
              </div>
            ))}
          </div>

          {/* Statement */}
          <div className="bg-gray-50 rounded-xl p-5 text-center border border-gray-100">
            <p className="text-gray-600 text-sm leading-relaxed italic">
              "This certificate confirms that the artwork described above is an authentic, original work created by {cert.artistName}
              and sold through ArtHub. This document serves as proof of ownership and authenticity for the registered owner."
            </p>
          </div>

          {/* Signature row */}
          <div className="flex items-end justify-between pt-4 border-t border-gray-100">
            <div>
              <div className="font-heading text-xl italic text-gray-700 mb-1">{cert.artistName}</div>
              <p className="text-xs text-gray-400">Artist Signature</p>
            </div>
            <div className="text-right">
              <div className="font-heading text-xl italic text-gray-700 mb-1">ArtHub Platform</div>
              <p className="text-xs text-gray-400">Verified & Issued</p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-dashed border-gray-200">
            <p className="text-[10px] text-gray-300 uppercase tracking-widest">
              Certificate No. {certNumber} · arthub.com · {issueDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
