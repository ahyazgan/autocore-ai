"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, Fuel, Shield, FileText, Wrench } from "lucide-react";

export default function TcoCalculatorPage() {
  const [purchase, setPurchase] = useState(1_000_000);
  const [yearlyKm, setYearlyKm] = useState(15_000);
  const [consumption, setConsumption] = useState(7);
  const [fuelPricePerL, setFuelPricePerL] = useState(45);
  const [yearlyInsurance, setYearlyInsurance] = useState(15_000);
  const [yearlyTax, setYearlyTax] = useState(8_000);
  const [yearlyMaintenance, setYearlyMaintenance] = useState(12_000);

  const breakdown = useMemo(() => {
    const fuelYearly = (yearlyKm / 100) * consumption * fuelPricePerL;
    const fuel5 = fuelYearly * 5;
    const insurance5 = yearlyInsurance * 5;
    const tax5 = yearlyTax * 5;
    const maintenance5 = yearlyMaintenance * 5;
    const total =
      purchase + fuel5 + insurance5 + tax5 + maintenance5;
    return {
      purchase,
      fuel5: Math.round(fuel5),
      insurance5: Math.round(insurance5),
      tax5: Math.round(tax5),
      maintenance5: Math.round(maintenance5),
      total: Math.round(total),
      fuelYearly: Math.round(fuelYearly),
    };
  }, [
    purchase,
    yearlyKm,
    consumption,
    fuelPricePerL,
    yearlyInsurance,
    yearlyTax,
    yearlyMaintenance,
  ]);

  const items = [
    { key: "purchase", label: "Alış fiyatı", value: breakdown.purchase, icon: Calculator },
    { key: "fuel5", label: "Yakıt (5 yıl)", value: breakdown.fuel5, icon: Fuel },
    { key: "insurance5", label: "Sigorta (5 yıl)", value: breakdown.insurance5, icon: Shield },
    { key: "tax5", label: "Vergi (5 yıl)", value: breakdown.tax5, icon: FileText },
    { key: "maintenance5", label: "Bakım (5 yıl)", value: breakdown.maintenance5, icon: Wrench },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
          Toplam Sahip Olma Maliyeti
        </h1>
        <p className="mt-2 text-zinc-400">
          5 yıllık toplam sahip olma maliyetini hesaplayın: alış, yakıt, sigorta, vergi ve bakım.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-5">
        <motion.div
          layout
          className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 lg:col-span-2"
        >
          <h3 className="text-sm font-medium text-zinc-400">Girdiler</h3>
          <div>
            <label className="mb-1 block text-sm text-zinc-500">
              Araç alış fiyatı (₺)
            </label>
            <input
              type="number"
              min={0}
              value={purchase}
              onChange={(e) => setPurchase(Number(e.target.value) || 0)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-2.5 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-500">
              Yıllık tahmini km
            </label>
            <input
              type="number"
              min={0}
              value={yearlyKm}
              onChange={(e) => setYearlyKm(Number(e.target.value) || 0)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-2.5 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-500">
              Yakıt tüketimi (L/100 km)
            </label>
            <input
              type="number"
              min={0}
              step={0.5}
              value={consumption}
              onChange={(e) => setConsumption(Number(e.target.value) || 0)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-2.5 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-500">
              Yakıt fiyatı (₺/L)
            </label>
            <input
              type="number"
              min={0}
              value={fuelPricePerL}
              onChange={(e) => setFuelPricePerL(Number(e.target.value) || 0)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-2.5 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-500">
              Yıllık sigorta (₺)
            </label>
            <input
              type="number"
              min={0}
              value={yearlyInsurance}
              onChange={(e) => setYearlyInsurance(Number(e.target.value) || 0)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-2.5 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-500">
              Yıllık vergi (₺)
            </label>
            <input
              type="number"
              min={0}
              value={yearlyTax}
              onChange={(e) => setYearlyTax(Number(e.target.value) || 0)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-2.5 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-500">
              Yıllık bakım (₺)
            </label>
            <input
              type="number"
              min={0}
              value={yearlyMaintenance}
              onChange={(e) => setYearlyMaintenance(Number(e.target.value) || 0)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-2.5 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </motion.div>

        <div className="space-y-6 lg:col-span-3">
          <motion.div
            layout
            className="rounded-2xl border-2 border-primary/40 bg-zinc-900 p-8 text-center"
          >
            <p className="text-sm font-medium uppercase tracking-wider text-zinc-400">
              5 yıllık toplam maliyet
            </p>
            <motion.p
              key={breakdown.total}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              className="mt-2 text-4xl font-bold tabular-nums text-primary sm:text-5xl"
            >
              {breakdown.total.toLocaleString("tr-TR")} ₺
            </motion.p>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2">
            {items.map(({ key, label, value, icon: Icon }) => (
              <motion.div
                key={key}
                layout
                className="flex items-center gap-4 rounded-xl border border-zinc-700 bg-zinc-800/50 p-4"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-zinc-700/50">
                  <Icon className="size-5 text-zinc-400" />
                </div>
                <div>
                  <p className="text-sm text-zinc-400">{label}</p>
                  <p className="text-lg font-semibold text-zinc-50">
                    {value.toLocaleString("tr-TR")} ₺
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
