"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Battery } from "lucide-react";

const KM_PER_1_PERCENT = 15_000;
const FAST_CHARGE_PENALTY_PER_10 = 2;

export default function BatteryHealthPage() {
  const [km, setKm] = useState(50_000);
  const [fastChargePercent, setFastChargePercent] = useState(30);

  const { soh, breakdown } = useMemo(() => {
    const kmLoss = Math.min(30, Math.floor(km / KM_PER_1_PERCENT));
    const fastChargeLoss = Math.min(15, Math.floor((fastChargePercent / 10) * (FAST_CHARGE_PENALTY_PER_10 / 2)));
    const totalLoss = kmLoss + fastChargeLoss;
    const soh = Math.max(55, 100 - totalLoss);
    return {
      soh,
      breakdown: [
        { label: "Km kaybı", value: kmLoss, desc: `${km.toLocaleString("tr-TR")} km → -%${kmLoss}` },
        { label: "Hızlı şarj etkisi", value: fastChargeLoss, desc: `%${fastChargePercent} DC şarj → -%${fastChargeLoss}` },
      ],
    };
  }, [km, fastChargePercent]);

  const circumference = 2 * Math.PI * 54;

  return (
    <div className="mx-auto max-w-lg space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
          Batarya Sağlığı
        </h1>
        <p className="mt-2 text-zinc-400">
          Mevcut kilometre ve hızlı şarj kullanım oranına göre tahmini SoH (State of Health).
        </p>
      </header>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">
        <div className="space-y-6">
          <div className="touch-friendly">
            <label className="mb-2 block text-sm font-medium text-zinc-400">
              Mevcut kilometre
            </label>
            <input
              type="range"
              min={0}
              max={300_000}
              step={5000}
              value={km}
              onChange={(e) => setKm(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <p className="mt-1 text-zinc-300">{km.toLocaleString("tr-TR")} km</p>
          </div>
          <div className="touch-friendly">
            <label className="mb-2 block text-sm font-medium text-zinc-400">
              Hızlı şarj kullanım oranı (%)
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={fastChargePercent}
              onChange={(e) => setFastChargePercent(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <p className="mt-1 text-zinc-300">%{fastChargePercent}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center">
          <div className="relative size-36">
            <svg className="size-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-zinc-800"
              />
              <motion.circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (soh / 100) * circumference}
                className={
                  soh >= 85
                    ? "text-emerald-500"
                    : soh >= 70
                      ? "text-primary"
                      : "text-amber-500"
                }
                initial={false}
                animate={{ strokeDashoffset: circumference - (soh / 100) * circumference }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Battery className="size-8 text-zinc-500" />
              <motion.span
                key={soh}
                initial={{ scale: 1.2, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mt-1 text-2xl font-bold tabular-nums text-zinc-50"
              >
                %{soh}
              </motion.span>
            </div>
          </div>
          <p className="mt-4 text-sm font-medium text-zinc-400">
            Tahmini Batarya Sağlığı (SoH)
          </p>
        </div>

        <ul className="mt-8 space-y-2 rounded-xl border border-zinc-700 bg-zinc-800/50 p-4 text-sm text-zinc-400">
          {breakdown.map((b) => (
            <li key={b.label}>
              <span className="font-medium text-zinc-300">{b.label}:</span> {b.desc}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
