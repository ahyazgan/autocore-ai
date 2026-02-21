"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Calendar, Gauge, Wrench, Zap } from "lucide-react";

const MARKALAR = [
  { id: "volkswagen", name: "Volkswagen", modeller: ["Golf", "Passat", "Polo", "Tiguan"] },
  { id: "renault", name: "Renault", modeller: ["Clio", "Megane", "Fluence", "Captur"] },
  { id: "fiat", name: "Fiat", modeller: ["Egea", "Tipo", "Doblo", "500"] },
  { id: "ford", name: "Ford", modeller: ["Focus", "Fiesta", "Mondeo", "Puma"] },
  { id: "toyota", name: "Toyota", modeller: ["Corolla", "Yaris", "Auris", "C-HR"] },
  { id: "honda", name: "Honda", modeller: ["Civic", "Jazz", "HR-V", "CR-V"] },
];

const YILLAR = Array.from({ length: 17 }, (_, i) => 2010 + i);

const HASAR_OPTIONS = [
  { id: "hatasiz", label: "Hatasız Boyasız", value: 1 },
  { id: "boyali", label: "1-2 Parça Boyalı", value: 0.95 },
  { id: "agir", label: "Ağır Hasarlı", value: 0.85 },
] as const;

const BASE_PRICE_BY_YEAR = 250_000;
const PRICE_PER_YEAR = 35_000;

function formatTL(n: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

function mockValuation(
  year: number,
  km: number,
  hasarMultiplier: number
): { hizli: number; piyasa: number; tok: number } {
  const base = BASE_PRICE_BY_YEAR + (year - 2010) * PRICE_PER_YEAR;
  const kmPenalty = Math.min(0.35, (km / 10000) * 0.01);
  const afterKm = base * (1 - kmPenalty);
  const piyasa = Math.round(afterKm * hasarMultiplier);
  const hizli = Math.round(piyasa * 0.88);
  const tok = Math.round(piyasa * 1.12);
  return { hizli, piyasa, tok };
}

export default function ArabamNeEderPage() {
  const [marka, setMarka] = useState("");
  const [model, setModel] = useState("");
  const [yil, setYil] = useState(2020);
  const [km, setKm] = useState("");
  const [hasar, setHasar] = useState<(typeof HASAR_OPTIONS)[number]["id"]>("hatasiz");
  const [calculated, setCalculated] = useState(false);
  const [result, setResult] = useState<{ hizli: number; piyasa: number; tok: number } | null>(null);

  const modeller = useMemo(
    () => MARKALAR.find((m) => m.id === marka)?.modeller ?? [],
    [marka]
  );

  const handleCalculate = () => {
    const kmNum = parseInt(km.replace(/\s/g, ""), 10) || 0;
    const hasarOpt = HASAR_OPTIONS.find((h) => h.id === hasar);
    const mult = hasarOpt?.value ?? 1;
    const res = mockValuation(yil, kmNum, mult);
    setResult(res);
    setCalculated(true);
  };

  const canSubmit = marka && model && yil && km.trim().length > 0;

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8 px-0">
      <header className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl md:text-4xl">
          Arabanın Gerçek Piyasa Değerini Öğren.
        </h1>
        <p className="mt-2 text-zinc-400">
          Şişirilmiş ilan fiyatlarına değil, yapay zeka destekli gerçek piyasa verilerine güvenin.
        </p>
      </header>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 shadow-2xl backdrop-blur-xl sm:p-6 md:p-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
              }}
              className="min-h-[44px] w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="">Seçin</option>
              {MARKALAR.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-400">
              <Car className="size-4" />
              Model
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              disabled={!marka}
              className="min-h-[44px] w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
            >
              <option value="">Seçin</option>
              {modeller.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-400">
              <Calendar className="size-4" />
              Yıl
            </label>
            <select
              value={yil}
              onChange={(e) => setYil(Number(e.target.value))}
              className="min-h-[44px] w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {YILLAR.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-400">
              <Gauge className="size-4" />
              Kilometre
            </label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Örn: 120000"
              value={km}
              onChange={(e) => setKm(e.target.value.replace(/[^\d\s]/g, ""))}
              className="min-h-[44px] w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-400">
              <Wrench className="size-4" />
              Hasar Durumu
            </label>
            <div className="flex flex-wrap gap-3">
              {HASAR_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex min-h-[44px] cursor-pointer items-center gap-2 rounded-xl border px-4 py-3 transition-colors ${
                    hasar === opt.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-zinc-700 bg-zinc-800/80 text-zinc-300 hover:border-zinc-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="hasar"
                    value={opt.id}
                    checked={hasar === opt.id}
                    onChange={() => setHasar(opt.id)}
                    className="sr-only"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8">
          <button
            type="button"
            onClick={handleCalculate}
            disabled={!canSubmit}
            className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/80 py-4 text-lg font-semibold text-white shadow-lg shadow-primary/25 transition-opacity hover:opacity-95 disabled:opacity-50"
          >
            <Zap className="size-5" />
            Hemen Hesapla
          </button>
        </div>
      </div>

      <AnimatePresence>
        {calculated && result && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-6"
              >
                <p className="text-sm font-medium text-amber-400/90">Hızlı Satış</p>
                <p className="mt-2 text-2xl font-bold text-amber-200">{formatTL(result.hizli)}</p>
                <p className="mt-1 text-xs text-zinc-500">Hızlı elden çıkarmak için</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl border-2 border-emerald-500/50 bg-emerald-500/15 p-6 shadow-lg shadow-emerald-500/10"
              >
                <p className="text-sm font-semibold text-emerald-400">Gerçek Piyasa</p>
                <p className="mt-2 text-3xl font-bold text-emerald-100">{formatTL(result.piyasa)}</p>
                <p className="mt-1 text-xs text-zinc-400">Ortalama pazar değeri</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl border border-zinc-500/50 bg-zinc-700/30 p-6"
              >
                <p className="text-sm font-medium text-zinc-400">Tok Satıcı</p>
                <p className="mt-2 text-2xl font-bold text-zinc-200">{formatTL(result.tok)}</p>
                <p className="mt-1 text-xs text-zinc-500">Sabırlı satış için</p>
              </motion.div>
            </div>
            <p className="text-center text-xs text-zinc-500">
              *Bu fiyatlar piyasa ortalamalarına göre yapay zeka simülasyonudur.
            </p>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
