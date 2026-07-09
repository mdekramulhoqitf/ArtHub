"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function TopLoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const prevPathRef = useRef(pathname + searchParams.toString());

  useEffect(() => {
    const current = pathname + searchParams.toString();
    if (current === prevPathRef.current) return;
    prevPathRef.current = current;

    // Start
    if (timerRef.current) clearTimeout(timerRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setProgress(0);
    setVisible(true);

    let p = 0;
    const tick = () => {
      // Ease toward 90% — never reaches 100 until done
      p += (90 - p) * 0.08;
      setProgress(p);
      if (p < 89.5) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // Complete
    timerRef.current = setTimeout(() => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setProgress(100);
      setTimeout(() => setVisible(false), 300);
    }, 200);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [pathname, searchParams]);

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] h-[2px] pointer-events-none"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className="h-full transition-all ease-out"
        style={{
          width: `${progress}%`,
          transitionDuration: progress === 100 ? "300ms" : "120ms",
          background:
            "linear-gradient(90deg, #be123c 0%, #f43f5e 40%, #fb7185 70%, #fda4af 100%)",
          boxShadow: "0 0 8px 1px rgba(244,63,94,0.5)",
        }}
      />
    </div>
  );
}
