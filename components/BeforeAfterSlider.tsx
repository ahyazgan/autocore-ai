"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";

interface BeforeAfterSliderProps {
  beforeLabel?: string;
  afterLabel?: string;
  beforeImage?: string;
  afterImage?: string;
  /** Optional: use placeholder visuals if no URLs */
  className?: string;
}

export function BeforeAfterSlider({
  beforeLabel = "Önce",
  afterLabel = "Sonra",
  beforeImage,
  afterImage,
  className = "",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const percent = Math.max(0, Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  return (
    <div
      className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900 ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={() => setSliderPosition(50)}
      onTouchMove={handleTouchMove}
    >
      {/* After (full background) */}
      <div className="absolute inset-0">
        {afterImage ? (
          <img
            src={afterImage}
            alt={afterLabel}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
            <div className="text-center">
              <div className="mx-auto mb-2 size-24 rounded-xl bg-emerald-500/20" />
              <p className="text-sm font-medium text-emerald-400">{afterLabel}</p>
              <p className="text-xs text-zinc-500">Arka plan kaldırılmış</p>
            </div>
          </div>
        )}
      </div>

      {/* Before (clipped by slider) */}
      <motion.div
        className="absolute inset-0 z-10 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        {beforeImage ? (
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-700 to-zinc-800">
            <div className="text-center">
              <div className="mx-auto mb-2 size-24 rounded-xl bg-zinc-600" />
              <p className="text-sm font-medium text-zinc-400">{beforeLabel}</p>
              <p className="text-xs text-zinc-500">Orijinal fotoğraf</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Slider line & handle */}
      <motion.div
        className="absolute top-0 bottom-0 z-20 w-1 bg-primary"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      />
      <motion.div
        className="absolute top-1/2 z-20 size-10 -translate-y-1/2 rounded-full border-2 border-primary bg-zinc-900 shadow-lg"
        style={{ left: `${sliderPosition}%`, transform: "translate(-50%, -50%)" }}
      >
        <div className="flex h-full w-full items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-primary">
            <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 2L12 6L8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </motion.div>

      {/* Labels */}
      <div className="absolute left-3 top-3 rounded-lg bg-black/50 px-2 py-1 text-xs font-medium text-zinc-300 backdrop-blur-sm">
        {beforeLabel}
      </div>
      <div className="absolute right-3 top-3 rounded-lg bg-black/50 px-2 py-1 text-xs font-medium text-zinc-300 backdrop-blur-sm">
        {afterLabel}
      </div>
    </div>
  );
}
