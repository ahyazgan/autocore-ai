"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Car, Palette, Circle } from "lucide-react";

const RIM_OPTIONS = [
  { id: "standard", name: "Standart", spokes: 5, style: "rounded-full border-4 border-zinc-500 bg-zinc-700/50" },
  { id: "sport", name: "Spor", spokes: 7, style: "rounded-full border-2 border-zinc-400 bg-zinc-600/80" },
  { id: "multi", name: "Çok Kollu", spokes: 10, style: "rounded-full border border-zinc-400 bg-zinc-500/60" },
  { id: "premium", name: "Premium", spokes: 6, style: "rounded-full border-2 border-amber-500/60 bg-zinc-600/70" },
];

export default function VirtualTunerPage() {
  const [color, setColor] = useState("#3b82f6");
  const [rim, setRim] = useState(RIM_OPTIONS[0].id);

  const rimStyle = RIM_OPTIONS.find((r) => r.id === rim) ?? RIM_OPTIONS[0];

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
          Sanal Tuner
        </h1>
        <p className="mt-2 text-zinc-400">
          Araç rengini ve jant tipini seçerek görselleştirin.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-2">
          <motion.div
            layout
            className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
          >
            <h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-zinc-400">
              <Palette className="size-4" />
              Renk
            </h3>
            <div className="flex flex-wrap items-center gap-4">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-12 w-20 cursor-pointer rounded-xl border border-zinc-700 bg-transparent"
              />
              <span className="text-sm text-zinc-400" style={{ color }}>
                {color}
              </span>
            </div>
          </motion.div>

          <motion.div
            layout
            className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
          >
            <h3 className="mb-4 text-sm font-medium text-zinc-400">
              Jant seçimi
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {RIM_OPTIONS.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRim(r.id)}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    rim === r.id
                      ? "border-primary bg-primary/10"
                      : "border-zinc-700 bg-zinc-800/80 hover:border-zinc-600"
                  }`}
                >
                  <div
                    className={`size-14 ${r.style} flex items-center justify-center`}
                    style={{
                      background: `repeating-conic-gradient(from 0deg, transparent 0deg calc(360deg / ${r.spokes}), rgba(255,255,255,0.15) calc(360deg / ${r.spokes}) calc(360deg / ${r.spokes} * 2))`,
                    }}
                  >
                    <Circle className="size-5 rounded-full bg-zinc-800" />
                  </div>
                  <span className="text-sm font-medium text-zinc-200">
                    {r.name}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="relative flex min-h-[320px] items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50 lg:col-span-3">
          <div
            className="relative flex h-64 w-full max-w-md items-end justify-center"
            style={{ filter: `drop-shadow(0 8px 24px ${color}40)` }}
          >
            {/* Car body silhouette with color overlay */}
            <div className="relative h-48 w-72">
              <div
                className="absolute inset-0 rounded-lg opacity-90"
                style={{
                  background: `linear-gradient(180deg, ${color} 0%, ${color}dd 50%, ${color}99 100%)`,
                  clipPath:
                    "polygon(8% 75% 12% 70% 18% 65% 25% 62% 35% 58% 50% 55% 65% 58% 78% 62% 88% 68% 92% 72% 95% 78% 92% 85% 85% 90% 75% 92% 65% 90% 55% 88% 45% 90% 35% 92% 25% 90% 15% 85% 8% 78% 5% 70% 8% 75%)",
                }}
              />
              <div
                className="absolute left-[18%] top-[32%] h-12 w-24 rounded-md opacity-90"
                style={{
                  background: color,
                  clipPath: "polygon(5% 20% 95% 15% 98% 85% 2% 90%)",
                }}
              />
              <div
                className="absolute right-[22%] top-[28%] h-14 w-20 rounded-md opacity-90"
                style={{
                  background: color,
                  clipPath: "polygon(2% 15% 98% 10% 95% 90% 5% 85%)",
                }}
              />
            </div>

            {/* Front wheel */}
            <div
              className="absolute left-[22%] top-[58%] flex size-20 items-center justify-center"
              style={{ transform: "translateY(8px)" }}
            >
              <div
                className={`absolute size-16 rounded-full ${rimStyle.style} flex items-center justify-center`}
                style={{
                  background: rimStyle.id === "premium"
                    ? `repeating-conic-gradient(from 0deg, transparent 0deg 60deg, rgba(212,175,55,0.3) 60deg 120deg)`
                    : undefined,
                }}
              >
                <div className="size-8 rounded-full bg-zinc-800" />
              </div>
            </div>

            {/* Rear wheel */}
            <div
              className="absolute right-[24%] top-[58%] flex size-20 items-center justify-center"
              style={{ transform: "translateY(8px)" }}
            >
              <div
                className={`absolute size-16 rounded-full ${rimStyle.style} flex items-center justify-center`}
                style={{
                  background: rimStyle.id === "premium"
                    ? `repeating-conic-gradient(from 0deg, transparent 0deg 60deg, rgba(212,175,55,0.3) 60deg 120deg)`
                    : undefined,
                }}
              >
                <div className="size-8 rounded-full bg-zinc-800" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
