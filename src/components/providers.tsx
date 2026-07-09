"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import { TopLoadingBar } from "@/components/layout/top-loading-bar";
import { BackToTop } from "@/components/layout/back-to-top";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Suspense>
        <TopLoadingBar />
      </Suspense>
      {children}
      <BackToTop />
      <Toaster />
    </SessionProvider>
  );
}
