"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gauge, Thermometer, BatteryCharging, Wind, Car } from "lucide-react";

const EV_MODELS = [
  { name: "Tesla Model 3 Long Range", kwh: 82 },
  { name: "Tesla Model Y Long Range", kwh: 75 },
  { name: "Togg T10X", kwh: 88 },
  { name: "Renault Megane E-Tech", kwh: 60 },
  { name: "BMW iX1 xDrive30", kwh: 64.7 },
  { name: "Hyundai IONIQ 5 Long Range", kwh: 77.4 },
  { name: "Kia EV6 Long Range", kwh: 77.4 },
  { name: "Volkswagen ID.4 Pro", kwh: 77 },
  { name: "Peugeot e-2008", kwh: 54 },
  { name: "Fiat 500e", kwh: 42 },
  { name: "Özel / Manuel Giriş", kwh: 0 },
];

function fmt(n: number) {
  return Math.round(n).toLocaleString("tr-TR");
}

export default function RangeEstimatorPage() {
  const [modelIdx, setModelIdx] = useState(0);
  const [customKwh, setCustomKwh] = useState(60);
  const [chargePercent, setChargePercent] = useState(80);
  const [speed, setSpeed] = useState(90);
  const [tempC, setTempC] = useState(20);
  const [acOn, setAcOn] = useState(false);

  const selectedModel = EV_MODELS[modelIdx];
  const batteryKwh = selectedModel.kwh === 0 ? customKwh : selectedModel.kwh;

  const result = useMemo(() => {
    const baseRange = (batteryKwh * chargePercent / 100) / 0.17;
    const speedFactor = speed <= 90 ? 1.0 : speed <= 120 ? 0.85 : 0.70;
    const tempFactor = tempC >= 15 ? 1.0 : tempC >= 0 ? 0.88 : 0.75;
    const acFactor = acOn ? 0.92 : 1.0;
    return Math.max(0, baseRange * speedFactor * tempFactor * acFactor);
  }, [batteryKwh, chargePercent, speed, tempC, acOn]);

  const color = result > 200 ? "text-emerald-400" : result > 100 ? "text-amber-400" : "text-red-400";
  const borderColor = result > 200 ? "border-emerald-500/30" : result > 100 ? "border-amber-500/30" : "border-red-500/30";
  const bgColor = result > 200 ? "bg-emerald-500/5" : result > 100 ? "bg-amber-500/5" : "bg-red-500/5";

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-50">Menzil Tahmini</h1>
        <p className="mt-1 text-sm text-zinc-400">Elektrikli aracınızın gerçekçi menzilini hesaplayın</p>
      </div>

      <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 p-6 space-y-6">
        {/* Model Seçimi */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-300">
            <Car className="size-4" />
            Araç Modeli
          </label>
          <select
            value={modelIdx}
            onChange={(e) => setModelIdx(Number(e.target.value))}
            className="w-full rounded-xl border border-zinc-600 bg-zinc-900 px-4 py-3 text-zinc-50 outline-none focus:border-blue-500"
          >
            {EV_MODELS.map((m, i) => (
              <option key={i} value={i}>{m.name}</option>
            ))}
          </select>
        </div>

        {/* Manuel kWh girişi */}
        {selectedModel.kwh === 0 && (
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-300">
              <BatteryCharging className="size-4" />
              Batarya Kapasitesi (kWh)
            </label>
            <input
              type="number"
              value={customKwh}
              onChange={(e) => setCustomKwh(Math.max(10, Math.min(150, Number(e.target.value))))}
              className="w-full rounded-xl border border-zinc-600 bg-zinc-900 px-4 py-3 text-zinc-50 outline-none focus:border-blue-500"
              min={10} max={150}
            />
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Şarj Yüzdesi */}
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-zinc-300">
              <span className="flex items-center gap-2"><BatteryCharging className="size-4" />Şarj Yüzdesi</span>
              <span className="text-zinc-400">%{chargePercent}</span>
            </label>
            <input
              type="range"
              value={chargePercent}
              onChange={(e) => setChargePercent(Number(e.target.value))}
              min={5} max={100}
              className="w-full accent-blue-500"
            />
            <div className="mt-1 flex justify-between text-xs text-zinc-500">
              <span>%5</span><span>%100</span>
            </div>
          </div>

          {/* Hız */}
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-zinc-300">
              <span className="flex items-center gap-2"><Gauge className="size-4" />Ortalama Hız</span>
              <span className="text-zinc-400">{speed} km/s</span>
            </label>
            <input
              type="range"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              min={30} max={150}
              className="w-full accent-blue-500"
            />
            <div className="mt-1 flex justify-between text-xs text-zinc-500">
              <span>30</span><span>150 km/s</span>
            </div>
          </div>

          {/* Sıcaklık */}
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-zinc-300">
              <span className="flex items-center gap-2"><Thermometer className="size-4" />Hava Sıcaklığı</span>
              <span className="text-zinc-400">{tempC}°C</span>
            </label>
            <input
              type="range"
              value={tempC}
              onChange={(e) => setTempC(Number(e.target.value))}
              min={-20} max={40}
              className="w-full accent-blue-500"
            />
            <div className="mt-1 flex justify-between text-xs text-zinc-500">
              <span>-20°C</span><span>40°C</span>
            </div>
          </div>

          {/* Klima */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-300">
              <Wind className="size-4" />
              İklimlendirme
            </label>
            <button
              onClick={() => setAcOn(!acOn)}
              className={`w-full rounded-xl border px-4 py-3 font-medium transition ${
                acOn
                  ? "border-blue-500 bg-blue-500/20 text-blue-300"
                  : "border-zinc-600 bg-zinc-900 text-zinc-400"
              }`}
            >
              {acOn ? "Klima / Isıtma AÇIK" : "Klima / Isıtma KAPALI"}
            </button>
          </div>
        </div>
      </div>

      {/* Sonuç */}
      <AnimatePresence mode="wait">
        <motion.div
          key={Math.round(result)}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl border p-8 text-center ${borderColor} ${bgColor}`}
        >
          <p className="text-sm text-zinc-400">Tahmini Menzil</p>
          <p className={`mt-2 text-6xl font-bold ${color}`}>{fmt(result)}</p>
          <p className="mt-1 text-lg text-zinc-400">km</p>
          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-zinc-700 pt-6 text-sm">
            <div>
              <p className="text-zinc-500">Batarya</p>
              <p className="font-semibold text-zinc-200">{batteryKwh} kWh</p>
            </div>
            <div>
              <p className="text-zinc-500">Şarj</p>
              <p className="font-semibold text-zinc-200">%{chargePercent}</p>
            </div>
            <div>
              <p className="text-zinc-500">Hız</p>
              <p className="font-semibold text-zinc-200">{speed} km/s</p>
            </div>
          </div>
          {tempC < 0 && (
            <p className="mt-4 rounded-lg bg-amber-500/10 px-3 py-2 text-xs text-amber-400">
              ⚠️ Soğuk hava batarya verimini önemli ölçüde düşürür
            </p>
          )}
          {acOn && (
            <p className="mt-2 rounded-lg bg-blue-500/10 px-3 py-2 text-xs text-blue-400">
              ❄️ Klima/ısıtma menzili yaklaşık %8 azaltır
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
