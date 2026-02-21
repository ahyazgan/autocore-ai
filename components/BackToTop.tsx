"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const SCROLL_THRESHOLD = 400;

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed bottom-6 right-4 z-30 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-zinc-600 bg-zinc-800 shadow-lg transition hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 md:bottom-8 md:right-6"
      aria-label="Yukarı çık"
    >
      <ArrowUp className="size-5 text-zinc-300" />
    </button>
  );
}
