"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Home, Zap } from "lucide-react";

const KWH_PER_100_KM = 18;

export default function SarjMaliyetPage() {
  const [batteryKwh, setBatteryKwh] = useState(60);
  const [homePricePerKwh, setHomePricePerKwh] = useState(2.5);
  const [stationPricePerKwh, setStationPricePerKwh] = useState(8);

  const { homeFull, homePer100, stationFull, stationPer100 } = useMemo(() => {
    const homeFull = batteryKwh * homePricePerKwh;
    const homePer100 = (KWH_PER_100_KM * homePricePerKwh);
    const stationFull = batteryKwh * stationPricePerKwh;
    const stationPer100 = (KWH_PER_100_KM * stationPricePerKwh);
    return {
      homeFull: Math.round(homeFull * 100) / 100,
      homePer100: Math.round(homePer100 * 100) / 100,
      stationFull: Math.round(stationFull * 100) / 100,
      stationPer100: Math.round(stationPer100 * 100) / 100,
    };
  }, [batteryKwh, homePricePerKwh, stationPricePerKwh]);

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
          Şarj Maliyeti
        </h1>
        <p className="mt-2 text-zinc-400">
          Evde şarj ile istasyonda şarj maliyetini karşılaştırın. Tam şarj ve 100 km başı maliyet hesaplanır.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-400">
            Girdiler
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm text-zinc-400">
                Batarya kapasitesi (kWh)
              </label>
              <input
                type="number"
                min={20}
                max={150}
                value={batteryKwh}
                onChange={(e) => setBatteryKwh(Number(e.target.value) || 20)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-zinc-400">
                Ev elektrik fiyatı (₺/kWh)
              </label>
              <input
                type="number"
                min={0}
                step={0.1}
                value={homePricePerKwh}
                onChange={(e) => setHomePricePerKwh(Number(e.target.value) || 0)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-zinc-400">
                İstasyon fiyatı (₺/kWh)
              </label>
              <input
                type="number"
                min={0}
                step={0.1}
                value={stationPricePerKwh}
                onChange={(e) => setStationPricePerKwh(Number(e.target.value) || 0)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        </div>

        <motion.div
          layout
          className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6"
        >
          <h3 className="mb-4 flex items-center gap-2 font-semibold text-zinc-50">
            <Home className="size-5 text-primary" />
            Evde şarj
          </h3>
          <p className="text-sm text-zinc-400">Tam şarj maliyeti</p>
          <p className="mt-1 text-2xl font-bold text-zinc-50">
            {homeFull.toLocaleString("tr-TR")} ₺
          </p>
          <p className="mt-4 text-sm text-zinc-400">100 km başı maliyet</p>
          <p className="mt-1 text-xl font-semibold text-primary">
            {homePer100.toLocaleString("tr-TR")} ₺
          </p>
        </motion.div>

        <motion.div
          layout
          className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6"
        >
          <h3 className="mb-4 flex items-center gap-2 font-semibold text-zinc-50">
            <Zap className="size-5 text-amber-400" />
            İstasyonda şarj
          </h3>
          <p className="text-sm text-zinc-400">Tam şarj maliyeti</p>
          <p className="mt-1 text-2xl font-bold text-zinc-50">
            {stationFull.toLocaleString("tr-TR")} ₺
          </p>
          <p className="mt-4 text-sm text-zinc-400">100 km başı maliyet</p>
          <p className="mt-1 text-xl font-semibold text-amber-400">
            {stationPer100.toLocaleString("tr-TR")} ₺
          </p>
        </motion.div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 text-center text-sm text-zinc-500">
        100 km başı maliyet, ortalama {KWH_PER_100_KM} kWh/100 km tüketim kabul edilerek hesaplanır.
      </div>
    </div>
  );
}
