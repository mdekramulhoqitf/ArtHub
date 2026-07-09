import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Returns & Refunds" };

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#1a1a2e] text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-rose-400 mb-2">Policies</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Returns & Refunds</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-12">

        {/* Originals */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 bg-rose-700 text-white text-xs font-bold flex items-center justify-center">01</div>
            <h2 className="font-heading text-xl font-bold text-[#1a1a2e]">Original Artworks</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-3">
            Original artworks are <strong>non-refundable</strong> unless they arrive damaged or are materially different from the listing description. Because each work is unique and handmade by an individual artist, we cannot accept returns for reasons of personal taste or change of mind.
          </p>
          <p className="text-gray-600 leading-relaxed">
            If your artwork arrives damaged, contact us at <a href="mailto:support@arthub.com" className="text-rose-700 underline underline-offset-2">support@arthub.com</a> within <strong>48 hours</strong> of delivery with photos of the damage. We will arrange a replacement or full refund.
          </p>
        </div>

        {/* Prints */}
        <div className="border-t border-gray-100 pt-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 bg-rose-700 text-white text-xs font-bold flex items-center justify-center">02</div>
            <h2 className="font-heading text-xl font-bold text-[#1a1a2e]">Prints & Reproductions</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-3">
            Limited edition prints can be returned within <strong>14 days</strong> of delivery if they are unopened and in original packaging. Return shipping is at the buyer&apos;s expense unless the item arrived damaged or incorrect.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Refunds for prints are processed within 5–10 business days after we confirm receipt of the returned item.
          </p>
        </div>

        {/* Digital */}
        <div className="border-t border-gray-100 pt-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 bg-rose-700 text-white text-xs font-bold flex items-center justify-center">03</div>
            <h2 className="font-heading text-xl font-bold text-[#1a1a2e]">Digital Downloads</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Digital works are <strong>non-refundable</strong> once the download link has been accessed, as the file is transferred immediately upon purchase. If the file is corrupted or incorrect, contact us and we will resolve it promptly.
          </p>
        </div>

        {/* How to return */}
        <div className="border-t border-gray-100 pt-12 bg-[#f5f2ea] -mx-4 px-4 py-8">
          <h2 className="font-heading text-xl font-bold text-[#1a1a2e] mb-4">How to Start a Return</h2>
          <ol className="space-y-3 text-sm text-gray-600">
            <li className="flex gap-3"><span className="font-bold text-rose-700 shrink-0">1.</span> Email <a href="mailto:support@arthub.com" className="text-rose-700 underline underline-offset-2">support@arthub.com</a> with your order number and reason for return.</li>
            <li className="flex gap-3"><span className="font-bold text-rose-700 shrink-0">2.</span> Our team will review your request within 2 business days and provide return instructions if approved.</li>
            <li className="flex gap-3"><span className="font-bold text-rose-700 shrink-0">3.</span> Pack the artwork securely in its original packaging. We are not responsible for damage during return shipping.</li>
            <li className="flex gap-3"><span className="font-bold text-rose-700 shrink-0">4.</span> Once received and inspected, your refund will be processed to your original payment method within 5–10 business days.</li>
          </ol>
        </div>

        <div className="border-t border-gray-100 pt-8">
          <p className="text-gray-600 mb-4">Still have questions about returns?</p>
          <Link href="/contact" className="inline-block bg-rose-700 text-white px-6 py-3 text-sm font-semibold hover:bg-rose-800 transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
