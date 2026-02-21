"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Thermometer, Gauge, Wind } from "lucide-react";

const BASE_RANGE_KM = 400;

export default function MenzilTahminiPage() {
  const [temp, setTemp] = useState(20);
  const [speed, setSpeed] = useState(80);
  const [acOn, setAcOn] = useState(false);

  const { range, penalties } = useMemo(() => {
    let totalPenalty = 0;
    const items: { label: string; value: number }[] = [];

    if (temp < 5) {
      totalPenalty += 0.2;
      items.push({ label: "Düşük sıcaklık (< 5°C)", value: 20 });
    }
    if (speed > 110) {
      totalPenalty += 0.15;
      items.push({ label: "Yüksek hız (> 110 km/s)", value: 15 });
    }
    if (acOn) {
      totalPenalty += 0.05;
      items.push({ label: "Klima açık", value: 5 });
    }

    const factor = Math.max(0, 1 - totalPenalty);
    const range = Math.round(BASE_RANGE_KM * factor);

    return { range, penalties: items };
  }, [temp, speed, acOn]);

  return (
    <div className="mx-auto max-w-2xl space-y-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
          EV Menzil Tahmini
        </h1>
        <p className="mt-2 text-zinc-400">
          Hava sıcaklığı, hız ve klima kullanımına göre gerçekçi menzil tahmini. Taban menzil {BASE_RANGE_KM} km kabul edilir; cezalar toplanarak uygulanır.
        </p>
      </header>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">
        <div className="space-y-8">
          <div className="touch-friendly">
            <label className="mb-3 flex items-center gap-2 text-sm font-medium text-zinc-400">
              <Thermometer className="size-4" />
              Hava sıcaklığı (°C)
            </label>
            <input
              type="range"
              min={-20}
              max={45}
              value={temp}
              onChange={(e) => setTemp(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <p className="mt-1 text-zinc-300">{temp} °C</p>
          </div>

          <div className="touch-friendly">
            <label className="mb-3 flex items-center gap-2 text-sm font-medium text-zinc-400">
              <Gauge className="size-4" />
              Ortalama hız (km/s)
            </label>
            <input
              type="range"
              min={0}
              max={150}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <p className="mt-1 text-zinc-300">{speed} km/s</p>
          </div>

          <div>
            <label className="mb-3 flex items-center gap-2 text-sm font-medium text-zinc-400">
              <Wind className="size-4" />
              Klima durumu
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setAcOn(false)}
                className={`min-h-[44px] flex-1 rounded-xl border px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                  !acOn
                    ? "border-primary bg-primary/20 text-primary"
                    : "border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-600"
                }`}
              >
                Kapalı
              </button>
              <button
                type="button"
                onClick={() => setAcOn(true)}
                className={`min-h-[44px] flex-1 rounded-xl border px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                  acOn
                    ? "border-primary bg-primary/20 text-primary"
                    : "border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-600"
                }`}
              >
                Açık
              </button>
            </div>
          </div>
        </div>

        {penalties.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 rounded-xl border border-zinc-700 bg-zinc-800/50 p-4"
          >
            <p className="text-sm font-medium text-zinc-400">Uygulanan cezalar</p>
            <ul className="mt-2 space-y-1 text-sm text-zinc-300">
              {penalties.map((p) => (
                <li key={p.label}>
                  {p.label}: -%{p.value}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        <div className="mt-10 rounded-2xl border-2 border-primary/30 bg-zinc-800/50 p-8 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-zinc-400">
            Gerçekçi menzil
          </p>
          <motion.p
            key={range}
            initial={{ scale: 1.1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-2 text-5xl font-bold tabular-nums text-primary sm:text-6xl"
          >
            {range} km
          </motion.p>
          <p className="mt-1 text-xs text-zinc-500">
            R<sub>yeni</sub> = R<sub>taban</sub> × (1 − Σ Cezalar); taban = {BASE_RANGE_KM} km
          </p>
        </div>
      </div>
    </div>
  );
}
