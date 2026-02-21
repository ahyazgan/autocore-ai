"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, Car, Gauge, Calendar, FlaskConical } from "lucide-react";

type OilRecord = {
  oilType: string;
  capacityL: number;
  intervalKm: number;
  intervalMonths: number;
};

const OIL_DATABASE: Record<string, Record<string, Record<string, OilRecord>>> = {
  Volkswagen: {
    Golf: {
      "1.0 TSI": { oilType: "5W-30", capacityL: 3.8, intervalKm: 15000, intervalMonths: 12 },
      "1.4 TSI": { oilType: "5W-30", capacityL: 4.0, intervalKm: 15000, intervalMonths: 12 },
      "1.5 TSI": { oilType: "0W-20", capacityL: 4.2, intervalKm: 15000, intervalMonths: 12 },
      "2.0 TDI": { oilType: "5W-30", capacityL: 4.5, intervalKm: 15000, intervalMonths: 12 },
    },
    Passat: {
      "1.4 TSI": { oilType: "5W-30", capacityL: 4.2, intervalKm: 15000, intervalMonths: 12 },
      "2.0 TDI": { oilType: "5W-30", capacityL: 5.0, intervalKm: 15000, intervalMonths: 12 },
    },
  },
  Ford: {
    Focus: {
      "1.0 EcoBoost": { oilType: "5W-20", capacityL: 4.2, intervalKm: 15000, intervalMonths: 12 },
      "1.5 TDCi": { oilType: "5W-30", capacityL: 4.5, intervalKm: 20000, intervalMonths: 12 },
    },
    Fiesta: {
      "1.0 EcoBoost": { oilType: "5W-20", capacityL: 3.8, intervalKm: 15000, intervalMonths: 12 },
    },
  },
  Toyota: {
    Corolla: {
      "1.6 VVT-i": { oilType: "5W-30", capacityL: 4.2, intervalKm: 15000, intervalMonths: 12 },
      "1.8 Hybrid": { oilType: "0W-20", capacityL: 4.0, intervalKm: 15000, intervalMonths: 12 },
    },
    Yaris: {
      "1.5 Hybrid": { oilType: "0W-16", capacityL: 3.2, intervalKm: 15000, intervalMonths: 12 },
    },
  },
  BMW: {
    "3 Serisi": {
      "320i": { oilType: "5W-30", capacityL: 5.0, intervalKm: 15000, intervalMonths: 12 },
      "320d": { oilType: "5W-30", capacityL: 5.2, intervalKm: 15000, intervalMonths: 12 },
    },
  },
  Renault: {
    Clio: {
      "1.0 TCe": { oilType: "5W-30", capacityL: 3.8, intervalKm: 15000, intervalMonths: 12 },
      "1.5 dCi": { oilType: "5W-30", capacityL: 4.2, intervalKm: 20000, intervalMonths: 12 },
    },
    Megane: {
      "1.5 dCi": { oilType: "5W-30", capacityL: 4.5, intervalKm: 20000, intervalMonths: 12 },
    },
  },
};

const BRANDS = Object.keys(OIL_DATABASE);

export default function OilFinderPage() {
  const [marka, setMarka] = useState("");
  const [model, setModel] = useState("");
  const [motor, setMotor] = useState("");

  const models = useMemo(() => {
    if (!marka) return [];
    return Object.keys(OIL_DATABASE[marka] ?? {});
  }, [marka]);

  const motors = useMemo(() => {
    if (!marka || !model) return [];
    return Object.keys(OIL_DATABASE[marka]?.[model] ?? {});
  }, [marka, model]);

  const result = useMemo((): OilRecord | null => {
    if (!marka || !model || !motor) return null;
    return OIL_DATABASE[marka]?.[model]?.[motor] ?? null;
  }, [marka, model, motor]);

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
          Yağ Bulucu
        </h1>
        <p className="mt-2 text-zinc-400">
          Marka, model ve motor tipine göre önerilen motor yağı, kapasite ve değişim aralığı.
        </p>
      </header>

      <div className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-400">
              <Car className="size-4" />
              Marka
            </label>
            <select
              value={marka}
              onChange={(e) => {
                setMarka(e.target.value);
                setModel("");
                setMotor("");
              }}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="">Seçin</option>
              {BRANDS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-400">
              Model
            </label>
            <select
              value={model}
              onChange={(e) => {
                setModel(e.target.value);
                setMotor("");
              }}
              disabled={!marka}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
            >
              <option value="">Seçin</option>
              {models.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-400">
              Motor tipi
            </label>
            <select
              value={motor}
              onChange={(e) => setMotor(e.target.value)}
              disabled={!model}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
            >
              <option value="">Seçin</option>
              {motors.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 rounded-2xl border border-zinc-700 bg-zinc-800/50 p-6"
            >
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-zinc-50">
                <FlaskConical className="size-5 text-primary" />
                Önerilen motor yağı
              </h3>
              <div className="mb-6 flex justify-center">
                <div className="flex flex-col items-center rounded-2xl border-2 border-primary/30 bg-gradient-to-b from-primary/10 to-transparent px-8 py-6">
                  <FlaskConical className="size-14 text-primary/80" />
                  <span className="mt-3 rounded-full border-2 border-primary bg-primary/20 px-5 py-2 font-mono text-xl font-bold text-primary">
                    {result.oilType}
                  </span>
                  <span className="mt-1 text-xs font-medium uppercase tracking-wider text-zinc-500">Viskozite</span>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-zinc-700 bg-zinc-900/50 p-4">
                  <p className="flex items-center gap-1 text-sm text-zinc-400">
                    <Droplets className="size-4" />
                    Yağ tipi
                  </p>
                  <p className="mt-1 text-xl font-bold text-primary">
                    {result.oilType}
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-700 bg-zinc-900/50 p-4">
                  <p className="flex items-center gap-1 text-sm text-zinc-400">
                    <Gauge className="size-4" />
                    Kapasite
                  </p>
                  <p className="mt-1 text-xl font-bold text-zinc-50">
                    {result.capacityL} L
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-700 bg-zinc-900/50 p-4">
                  <p className="flex items-center gap-1 text-sm text-zinc-400">
                    <Calendar className="size-4" />
                    Değişim aralığı
                  </p>
                  <p className="mt-1 text-lg font-bold text-zinc-50">
                    {result.intervalKm.toLocaleString("tr-TR")} km
                  </p>
                  <p className="text-sm text-zinc-400">
                    veya {result.intervalMonths} ay
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {marka && model && motor && !result && (
          <p className="mt-4 text-sm text-zinc-500">
            Bu kombinasyon için veritabanında kayıt bulunamadı. Benzer motorlar için servis kılavuzuna bakın.
          </p>
        )}
      </div>
    </div>
  );
}
