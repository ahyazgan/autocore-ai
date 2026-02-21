"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, TrendingUp, AlertCircle } from "lucide-react";

const MOCK_MARKET: Record<string, number> = {
  "Volkswagen Golf": 850_000,
  "Volkswagen Passat": 1_100_000,
  "Toyota Corolla": 720_000,
  "Toyota Yaris": 520_000,
  "Ford Focus": 480_000,
  "Renault Clio": 450_000,
  "Renault Megane": 680_000,
  "Honda Civic": 780_000,
  "Fiat Egea": 420_000,
  "Hyundai i20": 480_000,
  "BMW 3 Serisi": 1_400_000,
  "Mercedes C Serisi": 1_800_000,
};

const MODEL_OPTIONS = Object.keys(MOCK_MARKET).sort();

type Status = "kelepir" | "makul" | "pahali";

function getStatus(ilanFiyat: number, piyasaOrt: number): Status {
  if (ilanFiyat <= 0 || piyasaOrt <= 0) return "makul";
  const oran = ilanFiyat / piyasaOrt;
  if (oran <= 0.9) return "kelepir";
  if (oran >= 1.1) return "pahali";
  return "makul";
}

function getAdvice(status: Status, ilanFiyat: number, piyasaOrt: number): string {
  if (piyasaOrt <= 0) return "Model seçin ve ilan fiyatını girin.";
  const oran = ((ilanFiyat / piyasaOrt - 1) * 100).toFixed(0);
  if (status === "kelepir")
    return "Bu fiyat piyasa ortalamasının altında; araç geçmişini ve ekspertizi mutlaka kontrol edin.";
  if (status === "pahali") {
    const pct = Number(oran);
    return pct >= 10
      ? `Bu fiyat piyasa ortalamasının %${oran} üzerinde, pazarlık payı bırakın.`
      : "Bu fiyat piyasa ortalamasının biraz üzerinde; pazarlık deneyebilirsiniz.";
  }
  return "Fiyat piyasa ortalamasına yakın; makul bir aralıkta.";
}

export default function PriceCheckPage() {
  const [modelQuery, setModelQuery] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [ilanFiyat, setIlanFiyat] = useState("");

  const matchedModels = useMemo(() => {
    const q = modelQuery.trim().toLowerCase();
    if (!q) return MODEL_OPTIONS.slice(0, 8);
    return MODEL_OPTIONS.filter((m) => m.toLowerCase().includes(q)).slice(0, 8);
  }, [modelQuery]);

  const piyasaOrt = selectedModel ? MOCK_MARKET[selectedModel] ?? 0 : 0;
  const ilanNum = parseFloat(ilanFiyat.replace(/\D/g, "")) || 0;
  const status = getStatus(ilanNum, piyasaOrt);
  const advice = getAdvice(status, ilanNum, piyasaOrt);
  const showResult = selectedModel && ilanNum > 0;

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
          Fiyat Kontrol (Piyasa Analizi)
        </h1>
        <p className="mt-2 text-zinc-400">
          İlan fiyatını piyasa ortalaması ile karşılaştırın; Kelepir, Makul veya Pahalı değerlendirmesi alın.
        </p>
      </header>

      <div className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-400">
            Araç modeli
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={modelQuery}
              onChange={(e) => setModelQuery(e.target.value)}
              onFocus={() => setModelQuery((q) => q || selectedModel)}
              placeholder="Marka ve model yazın (örn. Volkswagen Golf)"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 py-3 pl-10 pr-4 text-zinc-100 placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            {matchedModels.length > 0 && (
              <ul className="absolute left-0 right-0 top-full z-10 mt-1 max-h-48 overflow-auto rounded-xl border border-zinc-700 bg-zinc-800 py-1 shadow-xl">
                {matchedModels.map((m) => (
                  <li key={m}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedModel(m);
                        setModelQuery(m);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-zinc-200 hover:bg-zinc-700"
                    >
                      {m}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-400">
            İlan fiyatı (₺)
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={ilanFiyat}
            onChange={(e) => setIlanFiyat(e.target.value.replace(/\D/g, ""))}
            placeholder="Örn. 820000"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <motion.div
              layout
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-700 bg-zinc-900 p-6"
            >
              <div>
                <p className="text-sm text-zinc-400">Piyasa ortalaması (tahmini)</p>
                <p className="text-2xl font-bold text-zinc-50">
                  {piyasaOrt.toLocaleString("tr-TR")} ₺
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-zinc-400">Durum</span>
                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    status === "kelepir"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                      : status === "pahali"
                        ? "bg-red-500/20 text-red-400 border border-red-500/40"
                        : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                  }`}
                >
                  {status === "kelepir" ? "Kelepir" : status === "pahali" ? "Pahalı" : "Makul"}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-start gap-4 rounded-2xl border border-zinc-700 bg-zinc-800/50 p-5"
            >
              <TrendingUp className="size-6 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-zinc-400">Tavsiye</p>
                <p className="mt-1 text-zinc-200">{advice}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
