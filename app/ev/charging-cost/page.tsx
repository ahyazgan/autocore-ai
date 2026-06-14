"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Home, Zap, BatteryCharging, TrendingDown } from "lucide-react";

function fmt(n: number) {
  return n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function ChargingCostPage() {
  const [batteryKwh, setBatteryKwh] = useState(77);
  const [fromPercent, setFromPercent] = useState(20);
  const [toPercent, setToPercent] = useState(80);
  const [homeRate, setHomeRate] = useState(3.5);
  const [publicRate, setPublicRate] = useState(8.5);

  const result = useMemo(() => {
    const energyNeeded = batteryKwh * Math.max(0, toPercent - fromPercent) / 100;
    const homeCost = energyNeeded * homeRate;
    const publicCost = energyNeeded * publicRate;
    const saved = publicCost - homeCost;
    const homeHours = energyNeeded / 7.4; // 7.4 kW AC şarj
    const publicHours = energyNeeded / 50; // 50 kW DC hızlı şarj
    return { energyNeeded, homeCost, publicCost, saved, homeHours, publicHours };
  }, [batteryKwh, fromPercent, toPercent, homeRate, publicRate]);

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-50">Şarj Maliyeti Hesaplayıcı</h1>
        <p className="mt-1 text-sm text-zinc-400">Ev vs halka açık şarj maliyetini karşılaştırın</p>
      </div>

      {/* Giriş Parametreleri */}
      <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 p-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-300">
              Batarya Kapasitesi (kWh)
            </label>
            <input
              type="number"
              value={batteryKwh}
              onChange={(e) => setBatteryKwh(Math.max(10, Number(e.target.value)))}
              className="w-full rounded-xl border border-zinc-600 bg-zinc-900 px-4 py-2.5 text-zinc-50 outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="mb-1.5 flex items-center justify-between text-sm font-medium text-zinc-300">
              <span className="flex items-center gap-1.5"><BatteryCharging className="size-4" />Şarj Aralığı</span>
              <span className="text-zinc-400">%{fromPercent} → %{toPercent}</span>
            </label>
            <div className="flex gap-3">
              <input
                type="number"
                value={fromPercent}
                onChange={(e) => setFromPercent(Math.min(toPercent - 5, Math.max(0, Number(e.target.value))))}
                className="w-full rounded-xl border border-zinc-600 bg-zinc-900 px-3 py-2.5 text-zinc-50 outline-none focus:border-blue-500"
                placeholder="Başlangıç %"
              />
              <input
                type="number"
                value={toPercent}
                onChange={(e) => setToPercent(Math.min(100, Math.max(fromPercent + 5, Number(e.target.value))))}
                className="w-full rounded-xl border border-zinc-600 bg-zinc-900 px-3 py-2.5 text-zinc-50 outline-none focus:border-blue-500"
                placeholder="Hedef %"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-zinc-300">
              <Home className="size-4 text-emerald-400" />
              Ev Elektrik Tarifesi (₺/kWh)
            </label>
            <input
              type="number"
              step="0.1"
              value={homeRate}
              onChange={(e) => setHomeRate(Math.max(0.1, Number(e.target.value)))}
              className="w-full rounded-xl border border-zinc-600 bg-zinc-900 px-4 py-2.5 text-zinc-50 outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-zinc-300">
              <Zap className="size-4 text-amber-400" />
              Halka Açık Şarj Tarifesi (₺/kWh)
            </label>
            <input
              type="number"
              step="0.1"
              value={publicRate}
              onChange={(e) => setPublicRate(Math.max(0.1, Number(e.target.value)))}
              className="w-full rounded-xl border border-zinc-600 bg-zinc-900 px-4 py-2.5 text-zinc-50 outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Sonuçlar */}
      <div className="grid gap-4 sm:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6"
        >
          <div className="flex items-center gap-2 text-emerald-400 mb-4">
            <Home className="size-5" />
            <h3 className="font-semibold">Ev Şarjı</h3>
          </div>
          <p className="text-3xl font-bold text-emerald-300">₺{fmt(result.homeCost)}</p>
          <div className="mt-4 space-y-2 text-sm text-zinc-400">
            <div className="flex justify-between">
              <span>Enerji miktarı</span>
              <span className="text-zinc-200">{result.energyNeeded.toFixed(1)} kWh</span>
            </div>
            <div className="flex justify-between">
              <span>Tahmini süre</span>
              <span className="text-zinc-200">{result.homeHours.toFixed(1)} saat</span>
            </div>
            <div className="flex justify-between">
              <span>Şarj tipi</span>
              <span className="text-zinc-200">AC (7.4 kW)</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6"
        >
          <div className="flex items-center gap-2 text-amber-400 mb-4">
            <Zap className="size-5" />
            <h3 className="font-semibold">Halka Açık Şarj</h3>
          </div>
          <p className="text-3xl font-bold text-amber-300">₺{fmt(result.publicCost)}</p>
          <div className="mt-4 space-y-2 text-sm text-zinc-400">
            <div className="flex justify-between">
              <span>Enerji miktarı</span>
              <span className="text-zinc-200">{result.energyNeeded.toFixed(1)} kWh</span>
            </div>
            <div className="flex justify-between">
              <span>Tahmini süre</span>
              <span className="text-zinc-200">{(result.publicHours * 60).toFixed(0)} dk</span>
            </div>
            <div className="flex justify-between">
              <span>Şarj tipi</span>
              <span className="text-zinc-200">DC Hızlı (50 kW)</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tasarruf özeti */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-6 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <TrendingDown className="size-6 text-blue-400" />
          <div>
            <p className="text-sm text-zinc-400">Evde şarj ile tasarruf</p>
            <p className="text-xs text-zinc-500">Bu şarj başına</p>
          </div>
        </div>
        <p className="text-2xl font-bold text-blue-300">₺{fmt(result.saved)}</p>
      </motion.div>
    </div>
  );
}
