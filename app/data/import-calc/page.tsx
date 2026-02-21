"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Globe, Receipt } from "lucide-react";

const CUSTOMS_RATE = 0.10;
const SCT_RATES: [number, number][] = [
  [0, 0.45],
  [1600, 0.50],
  [2000, 0.80],
  [9999, 1.30],
];
const VAT_RATE = 0.18;

function getSctRate(engineCc: number): number {
  for (let i = SCT_RATES.length - 1; i >= 0; i--) {
    if (engineCc >= SCT_RATES[i][0]) return SCT_RATES[i][1];
  }
  return SCT_RATES[0][1];
}

function getAgeDiscount(years: number): number {
  if (years >= 3) return 0.50;
  if (years >= 2) return 0.60;
  if (years >= 1) return 0.80;
  return 1;
}

export default function ImportCalcPage() {
  const [foreignPrice, setForeignPrice] = useState(25000);
  const [currency, setCurrency] = useState<"EUR" | "USD">("EUR");
  const [engineCc, setEngineCc] = useState(1600);
  const [ageYears, setAgeYears] = useState(2);

  const tlPerEur = 35;
  const tlPerUsd = 32;
  const priceTl = foreignPrice * (currency === "EUR" ? tlPerEur : tlPerUsd);

  const breakdown = useMemo(() => {
    const customsBase = priceTl;
    const customs = customsBase * CUSTOMS_RATE;
    const sctRate = getSctRate(engineCc);
    const ageFactor = getAgeDiscount(ageYears);
    const sct = (customsBase + customs) * sctRate * ageFactor;
    const vatBase = customsBase + customs + sct;
    const vat = vatBase * VAT_RATE;
    const total = vatBase + vat;
    return {
      customs: Math.round(customs),
      sct: Math.round(sct),
      vat: Math.round(vat),
      total: Math.round(total),
    };
  }, [priceTl, engineCc, ageYears]);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">İthalat Hesaplama</h1>
        <p className="mt-2 text-zinc-400">
          Yurtdışı fiyat, motor hacmi ve araç yaşına göre Türkiye anahtar teslim tahmini (gümrük, ÖTV, KDV).
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-5">
        <motion.div layout className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 lg:col-span-2">
          <h3 className="flex items-center gap-2 text-sm font-medium text-zinc-400">
            <Globe className="size-4" />
            Girdiler
          </h3>
          <div>
            <label className="mb-1 block text-sm text-zinc-500">Yurtdışı fiyatı</label>
            <div className="flex gap-2">
              <input
                type="number"
                min={0}
                value={foreignPrice}
                onChange={(e) => setForeignPrice(Number(e.target.value) || 0)}
                className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-2.5 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as "EUR" | "USD")}
                className="rounded-xl border border-zinc-700 bg-zinc-800/80 px-3 py-2.5 text-zinc-100"
              >
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-500">Motor hacmi (cc)</label>
            <input
              type="number"
              min={0}
              value={engineCc}
              onChange={(e) => setEngineCc(Number(e.target.value) || 0)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-2.5 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-500">Araç yaşı (yıl)</label>
            <input
              type="number"
              min={0}
              max={10}
              value={ageYears}
              onChange={(e) => setAgeYears(Number(e.target.value) || 0)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-2.5 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </motion.div>

        <div className="space-y-6 lg:col-span-3">
          <motion.div layout className="rounded-2xl border-2 border-primary/40 bg-zinc-900 p-6">
            <p className="text-sm font-medium uppercase tracking-wider text-zinc-400">
              Anahtar teslim Türkiye fiyatı (tahmini)
            </p>
            <motion.p
              key={breakdown.total}
              initial={{ scale: 1.02 }}
              animate={{ scale: 1 }}
              className="mt-2 text-3xl font-bold tabular-nums text-primary sm:text-4xl"
            >
              {breakdown.total.toLocaleString("tr-TR")} ₺
            </motion.p>
          </motion.div>

          <motion.div layout className="rounded-2xl border border-zinc-700 bg-zinc-900/50 p-6">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-zinc-50">
              <Receipt className="size-4" />
              Vergi dağılımı
            </h3>
            <ul className="space-y-3">
              <li className="flex justify-between text-sm">
                <span className="text-zinc-400">Gümrük vergisi (%10)</span>
                <span className="font-medium text-zinc-200">{breakdown.customs.toLocaleString("tr-TR")} ₺</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-zinc-400">ÖTV (SCT)</span>
                <span className="font-medium text-zinc-200">{breakdown.sct.toLocaleString("tr-TR")} ₺</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-zinc-400">KDV (%18)</span>
                <span className="font-medium text-zinc-200">{breakdown.vat.toLocaleString("tr-TR")} ₺</span>
              </li>
              <li className="flex justify-between border-t border-zinc-700 pt-3 font-medium text-zinc-50">
                <span>Toplam</span>
                <span>{breakdown.total.toLocaleString("tr-TR")} ₺</span>
              </li>
            </ul>
            <p className="mt-4 text-xs text-zinc-500">
              Araç yaşına göre ÖTV indirimi uygulanır. Kur ve oranlar örnek amaçlıdır.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
