"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Fuel, Zap, TrendingUp, Clock } from "lucide-react";

function fmtTL(n: number) {
  return Math.round(n).toLocaleString("tr-TR");
}

export default function SavingsCalcPage() {
  const [yearlyKm, setYearlyKm] = useState(15000);
  const [fuelPrice, setFuelPrice] = useState(45);
  const [fuelConsumption, setFuelConsumption] = useState(7);
  const [electricityPrice, setElectricityPrice] = useState(3.5);
  const [evConsumption, setEvConsumption] = useState(18);
  const [priceDiff, setPriceDiff] = useState(200000);

  const result = useMemo(() => {
    const yearlyIceFuel = (yearlyKm / 100) * fuelConsumption * fuelPrice;
    const yearlyEvCost = (yearlyKm / 100) * evConsumption * electricityPrice;
    const yearlySaving = yearlyIceFuel - yearlyEvCost;
    const saving5yr = yearlySaving * 5;
    const breakEven = yearlySaving > 0 ? priceDiff / yearlySaving : Infinity;
    return { yearlyIceFuel, yearlyEvCost, yearlySaving, saving5yr, breakEven };
  }, [yearlyKm, fuelPrice, fuelConsumption, electricityPrice, evConsumption, priceDiff]);

  const breakEvenText =
    result.breakEven === Infinity
      ? "—"
      : result.breakEven > 30
      ? ">30 yıl"
      : `${result.breakEven.toFixed(1)} yıl`;

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-50">EV Tasarruf Hesaplayıcı</h1>
        <p className="mt-1 text-sm text-zinc-400">Elektrikli araç vs benzinli araç maliyet karşılaştırması</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Benzinli Araç Girdileri */}
        <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 p-6 space-y-4">
          <h3 className="flex items-center gap-2 font-semibold text-zinc-100">
            <Fuel className="size-5 text-orange-400" />
            Benzinli Araç
          </h3>
          <div>
            <label className="mb-1 block text-sm text-zinc-400">Yakıt Fiyatı (₺/L)</label>
            <input
              type="number"
              step="0.5"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(Math.max(1, Number(e.target.value)))}
              className="w-full rounded-xl border border-zinc-600 bg-zinc-900 px-4 py-2.5 text-zinc-50 outline-none focus:border-orange-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-400">Tüketim (L/100 km)</label>
            <input
              type="number"
              step="0.5"
              value={fuelConsumption}
              onChange={(e) => setFuelConsumption(Math.max(1, Number(e.target.value)))}
              className="w-full rounded-xl border border-zinc-600 bg-zinc-900 px-4 py-2.5 text-zinc-50 outline-none focus:border-orange-500"
            />
          </div>
          <div className="rounded-xl bg-orange-500/10 border border-orange-500/20 px-4 py-3">
            <p className="text-xs text-zinc-400">Yıllık yakıt maliyeti</p>
            <p className="text-xl font-bold text-orange-300">₺{fmtTL(result.yearlyIceFuel)}</p>
          </div>
        </div>

        {/* Elektrikli Araç Girdileri */}
        <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 p-6 space-y-4">
          <h3 className="flex items-center gap-2 font-semibold text-zinc-100">
            <Zap className="size-5 text-emerald-400" />
            Elektrikli Araç
          </h3>
          <div>
            <label className="mb-1 block text-sm text-zinc-400">Elektrik Tarifesi (₺/kWh)</label>
            <input
              type="number"
              step="0.1"
              value={electricityPrice}
              onChange={(e) => setElectricityPrice(Math.max(0.1, Number(e.target.value)))}
              className="w-full rounded-xl border border-zinc-600 bg-zinc-900 px-4 py-2.5 text-zinc-50 outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-400">Tüketim (kWh/100 km)</label>
            <input
              type="number"
              step="0.5"
              value={evConsumption}
              onChange={(e) => setEvConsumption(Math.max(1, Number(e.target.value)))}
              className="w-full rounded-xl border border-zinc-600 bg-zinc-900 px-4 py-2.5 text-zinc-50 outline-none focus:border-emerald-500"
            />
          </div>
          <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3">
            <p className="text-xs text-zinc-400">Yıllık şarj maliyeti</p>
            <p className="text-xl font-bold text-emerald-300">₺{fmtTL(result.yearlyEvCost)}</p>
          </div>
        </div>
      </div>

      {/* Ortak Girdiler */}
      <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-zinc-400">Yıllık Kilometre</label>
            <input
              type="number"
              step="1000"
              value={yearlyKm}
              onChange={(e) => setYearlyKm(Math.max(1000, Number(e.target.value)))}
              className="w-full rounded-xl border border-zinc-600 bg-zinc-900 px-4 py-2.5 text-zinc-50 outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-400">EV Fiyat Farkı (₺)</label>
            <input
              type="number"
              step="10000"
              value={priceDiff}
              onChange={(e) => setPriceDiff(Math.max(0, Number(e.target.value)))}
              className="w-full rounded-xl border border-zinc-600 bg-zinc-900 px-4 py-2.5 text-zinc-50 outline-none focus:border-blue-500"
            />
            <p className="mt-1 text-xs text-zinc-500">EV&apos;nin benzinliye göre ek maliyeti</p>
          </div>
        </div>
      </div>

      {/* Sonuç Kartları */}
      <div className="grid gap-4 sm:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 text-center"
        >
          <TrendingUp className="mx-auto size-6 text-emerald-400 mb-2" />
          <p className="text-xs text-zinc-400 mb-1">Yıllık Tasarruf</p>
          <p className="text-2xl font-bold text-emerald-300">₺{fmtTL(result.yearlySaving)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-5 text-center"
        >
          <TrendingUp className="mx-auto size-6 text-blue-400 mb-2" />
          <p className="text-xs text-zinc-400 mb-1">5 Yıl Tasarrufu</p>
          <p className="text-2xl font-bold text-blue-300">₺{fmtTL(result.saving5yr)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className={`rounded-2xl border p-5 text-center ${
            result.breakEven <= 5
              ? "border-emerald-500/30 bg-emerald-500/5"
              : result.breakEven <= 10
              ? "border-amber-500/30 bg-amber-500/5"
              : "border-red-500/30 bg-red-500/5"
          }`}
        >
          <Clock className={`mx-auto size-6 mb-2 ${
            result.breakEven <= 5 ? "text-emerald-400" : result.breakEven <= 10 ? "text-amber-400" : "text-red-400"
          }`} />
          <p className="text-xs text-zinc-400 mb-1">Geri Ödeme Süresi</p>
          <p className={`text-2xl font-bold ${
            result.breakEven <= 5 ? "text-emerald-300" : result.breakEven <= 10 ? "text-amber-300" : "text-red-300"
          }`}>{breakEvenText}</p>
        </motion.div>
      </div>
    </div>
  );
}
