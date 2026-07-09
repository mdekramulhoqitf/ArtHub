import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f5f2ea] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <p className="font-heading text-[120px] font-bold text-[#1a1a2e] leading-none mb-2 opacity-10 select-none">
          404
        </p>
        <div className="-mt-8 mb-6">
          <h1 className="font-heading text-3xl font-bold text-[#1a1a2e] mb-3">
            Page Not Found
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist, or has been moved. Browse our collection instead.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 bg-[#1a1a2e] text-white px-6 py-3 text-sm font-semibold hover:bg-rose-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <Link
            href="/browse"
            className="flex items-center gap-2 border border-[#1a1a2e] text-[#1a1a2e] px-6 py-3 text-sm font-semibold hover:bg-[#1a1a2e] hover:text-white transition-colors"
          >
            <Search className="w-4 h-4" /> Browse Art
          </Link>
        </div>
      </div>
    </div>
  );
}
