"use client";

import { Flag } from "lucide-react";

export default function SuperAdminReports() {
  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white">Reports & Flags</h1>
        <p className="text-gray-500 text-sm mt-0.5">User-submitted reports on artworks, shops, and accounts</p>
      </div>

      <div className="flex flex-col items-center justify-center py-32 gap-4 text-gray-600">
        <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center">
          <Flag className="w-7 h-7 text-gray-600" />
        </div>
        <p className="text-sm font-medium text-gray-500">No reports yet</p>
        <p className="text-xs text-gray-600 text-center max-w-xs">
          When users report artworks, shops, or accounts, they will appear here for review.
        </p>
      </div>
    </div>
  );
}
