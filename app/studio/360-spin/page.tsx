"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

const FRAME_COUNT = 36;
const DEG_PER_FRAME = 360 / FRAME_COUNT;

export default function Spin360Page() {
  const [angle, setAngle] = useState(0);
  const frameIndex = Math.round((angle / 360) * FRAME_COUNT) % FRAME_COUNT;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
          Aracınızı Her Açıdan Sergileyin
        </h1>
        <p className="mt-2 text-zinc-400">
          360° dönüş ile ilan görsellerinizi zenginleştirin. Kaydırıcı ile açıyı değiştirin.
        </p>
      </header>

      <motion.div
        layout
        className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50"
      >
        <div className="relative aspect-[4/3] min-h-[320px] bg-zinc-900">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              key={frameIndex}
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col items-center justify-center gap-4"
            >
              <div
                className="flex size-64 items-center justify-center rounded-2xl border-2 border-zinc-700 bg-gradient-to-br from-zinc-700 to-zinc-800"
                style={{
                  transform: `perspective(800px) rotateY(${angle}deg)`,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                }}
              >
                <div className="text-center">
                  <span className="text-6xl font-bold tabular-nums text-zinc-500">
                    {frameIndex + 1}
                  </span>
                  <p className="mt-1 text-sm text-zinc-500">/ {FRAME_COUNT} kare</p>
                  <p className="mt-2 text-xs text-zinc-600">
                    {angle.toFixed(0)}°
                  </p>
                </div>
              </div>
              <p className="text-sm text-zinc-500">
                Gerçek kullanımda araç fotoğraflarınız yüklenecek
              </p>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-zinc-800 bg-zinc-900/80 px-6 py-5">
          <div className="flex items-center gap-4">
            <RotateCcw className="size-5 shrink-0 text-zinc-500" />
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium text-zinc-400">
                Döndür
              </label>
              <input
                type="range"
                min={0}
                max={360}
                step={DEG_PER_FRAME}
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="mt-1 flex justify-between text-xs text-zinc-500">
                <span>0°</span>
                <span className="font-medium text-primary">{angle.toFixed(0)}°</span>
                <span>360°</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
