"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingDown, Calendar } from "lucide-react";

const DEPRECIATION_RATES: Record<string, Record<string, number>> = {
  sedan: { excellent: 0.13, good: 0.16, fair: 0.21 },
  suv: { excellent: 0.11, good: 0.14, fair: 0.19 },
  hatchback: { excellent: 0.14, good: 0.17, fair: 0.22 },
  commercial: { excellent: 0.12, good: 0.15, fair: 0.20 },
  luxury: { excellent: 0.16, good: 0.20, fair: 0.26 },
  electric: { excellent: 0.10, good: 0.13, fair: 0.17 },
};

const VEHICLE_TYPES = [
  { value: "sedan", label: "Sedan / Binek" },
  { value: "suv", label: "SUV / Crossover" },
  { value: "hatchback", label: "Hatchback" },
  { value: "commercial", label: "Ticari / Van" },
  { value: "luxury", label: "Lüks / Premium" },
  { value: "electric", label: "Elektrikli (EV)" },
];

const CONDITIONS = [
  { value: "excellent", label: "Mükemmel (Az kullanılmış)" },
  { value: "good", label: "İyi (Normal kullanım)" },
  { value: "fair", label: "Orta (Yoğun kullanım)" },
];

function fmtTL(n: number) {
  return Math.round(n).toLocaleString("tr-TR");
}

export default function FutureValuePage() {
  const [purchasePrice, setPurchasePrice] = useState(1000000);
  const [vehicleType, setVehicleType] = useState("sedan");
  const [condition, setCondition] = useState("good");
  const [yearsAhead, setYearsAhead] = useState(5);

  const rate = DEPRECIATION_RATES[vehicleType]?.[condition] ?? 0.16;

  const table = useMemo(() => {
    const rows = [];
    for (let y = 0; y <= yearsAhead; y++) {
      const value = purchasePrice * Math.pow(1 - rate, y);
      const totalLoss = purchasePrice - value;
      const yearlyLoss = y === 0 ? 0 : purchasePrice * Math.pow(1 - rate, y - 1) - value;
      rows.push({ year: y, value, totalLoss, yearlyLoss });
    }
    return rows;
  }, [purchasePrice, rate, yearsAhead]);

  const currentValue = table[table.length - 1]?.value ?? purchasePrice;
  const totalLoss = purchasePrice - currentValue;
  const retentionPct = (currentValue / purchasePrice) * 100;

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-50">Gelecek Değer Hesaplayıcı</h1>
        <p className="mt-1 text-sm text-zinc-400">Aracınızın yıllara göre değer kaybını hesaplayın</p>
      </div>

      {/* Girdiler */}
      <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 p-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-300">Satın Alma Fiyatı (₺)</label>
            <input
              type="number"
              step="10000"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(Math.max(10000, Number(e.target.value)))}
              className="w-full rounded-xl border border-zinc-600 bg-zinc-900 px-4 py-2.5 text-zinc-50 outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="mb-1.5 flex items-center justify-between text-sm font-medium text-zinc-300">
              <span className="flex items-center gap-1.5"><Calendar className="size-4" />Kaç Yıl Sonrası?</span>
              <span className="text-zinc-400">{yearsAhead} yıl</span>
            </label>
            <input
              type="range"
              value={yearsAhead}
              onChange={(e) => setYearsAhead(Number(e.target.value))}
              min={1} max={10}
              className="w-full accent-blue-500 mt-2"
            />
            <div className="flex justify-between text-xs text-zinc-600 mt-1">
              <span>1</span><span>10 yıl</span>
            </div>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-300">Araç Tipi</label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-full rounded-xl border border-zinc-600 bg-zinc-900 px-4 py-2.5 text-zinc-50 outline-none focus:border-blue-500"
            >
              {VEHICLE_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-300">Kullanım Durumu</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full rounded-xl border border-zinc-600 bg-zinc-900 px-4 py-2.5 text-zinc-50 outline-none focus:border-blue-500"
            >
              {CONDITIONS.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>
        <p className="text-xs text-zinc-500">
          Yıllık değer kaybı oranı: <span className="text-zinc-400 font-medium">%{(rate * 100).toFixed(0)}</span> (Türkiye ortalama piyasa verilerine göre)
        </p>
      </div>

      {/* Özet Kartlar */}
      <div className="grid gap-4 sm:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-5 text-center"
        >
          <p className="text-xs text-zinc-400 mb-1">{yearsAhead} Yıl Sonraki Değer</p>
          <p className="text-2xl font-bold text-blue-300">₺{fmtTL(currentValue)}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-red-500/30 bg-red-500/5 p-5 text-center"
        >
          <p className="text-xs text-zinc-400 mb-1">Toplam Değer Kaybı</p>
          <p className="text-2xl font-bold text-red-300">₺{fmtTL(totalLoss)}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className={`rounded-2xl border p-5 text-center ${
            retentionPct >= 60 ? "border-emerald-500/30 bg-emerald-500/5" :
            retentionPct >= 40 ? "border-amber-500/30 bg-amber-500/5" :
            "border-red-500/30 bg-red-500/5"
          }`}
        >
          <p className="text-xs text-zinc-400 mb-1">Değer Koruma Oranı</p>
          <p className={`text-2xl font-bold ${
            retentionPct >= 60 ? "text-emerald-300" :
            retentionPct >= 40 ? "text-amber-300" : "text-red-300"
          }`}>%{retentionPct.toFixed(1)}</p>
        </motion.div>
      </div>

      {/* Yıllık Tablo */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border border-zinc-700 bg-zinc-800/50 overflow-hidden"
      >
        <div className="flex items-center gap-2 p-5 border-b border-zinc-700">
          <TrendingDown className="size-5 text-zinc-400" />
          <h3 className="font-semibold text-zinc-200">Yıllık Değer Tablosu</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-700 text-xs text-zinc-500">
                <th className="py-3 pl-5 text-left">Yıl</th>
                <th className="py-3 text-right">Tahmini Değer</th>
                <th className="py-3 text-right">Bu Yıl Kayıp</th>
                <th className="py-3 pr-5 text-right">Toplam Kayıp</th>
              </tr>
            </thead>
            <tbody>
              {table.map((row) => {
                const pct = (row.value / purchasePrice) * 100;
                return (
                  <tr key={row.year} className="border-b border-zinc-700/50 hover:bg-zinc-700/30 transition">
                    <td className="py-3 pl-5">
                      <span className="font-medium text-zinc-200">
                        {row.year === 0 ? "Bugün" : `${row.year}. Yıl`}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <div>
                        <span className="text-zinc-100">₺{fmtTL(row.value)}</span>
                        <div className="mt-1 flex justify-end">
                          <div className="w-24 h-1.5 rounded-full bg-zinc-700 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${pct >= 60 ? "bg-emerald-500" : pct >= 40 ? "bg-amber-500" : "bg-red-500"}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-right text-red-400">
                      {row.year === 0 ? "—" : `-₺${fmtTL(row.yearlyLoss)}`}
                    </td>
                    <td className="py-3 pr-5 text-right text-zinc-400">
                      {row.year === 0 ? "—" : `-₺${fmtTL(row.totalLoss)}`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
