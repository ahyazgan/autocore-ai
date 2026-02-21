"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link2, AlertTriangle, ShieldCheck } from "lucide-react";

const SATICI_TIPLERI = [
  { id: "galeri", label: "Galeri / Bayi", riskBonus: 0 },
  { id: "bireysel", label: "Bireysel", riskBonus: 5 },
  { id: "bilinmeyen", label: "Bilinmeyen / Yeni hesap", riskBonus: 15 },
];

export default function ScamDetectPage() {
  const [ilanLink, setIlanLink] = useState("");
  const [fiyat, setFiyat] = useState("");
  const [piyasaOrt, setPiyasaOrt] = useState("");
  const [saticiTipi, setSaticiTipi] = useState("bireysel");
  const [submitted, setSubmitted] = useState(false);

  const fiyatNum = parseFloat(fiyat.replace(/\D/g, "")) || 0;
  const piyasaNum = parseFloat(piyasaOrt.replace(/\D/g, "")) || 1;
  const oran = piyasaNum > 0 ? (fiyatNum / piyasaNum) * 100 : 0;
  const saticiRisk = SATICI_TIPLERI.find((s) => s.id === saticiTipi)?.riskBonus ?? 0;
  const supheliDusukFiyat = piyasaNum > 0 && fiyatNum < piyasaNum * 0.2;
  const riskSkoru = Math.min(
    100,
    Math.round(100 - oran + saticiRisk + (supheliDusukFiyat ? 40 : 0))
  );

  const handleAnalyze = () => {
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
          Dolandırıcılık Tespit
        </h1>
        <p className="mt-2 text-zinc-400">
          İlan linki veya detayları ile fiyat ve satıcı bilgisini girin; şüpheli fiyat uyarısı alın.
        </p>
      </header>

      <div className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-400">
            <Link2 className="size-4" />
            İlan linki veya kısa detay
          </label>
          <input
            type="text"
            placeholder="https://... veya ilan başlığı"
            value={ilanLink}
            onChange={(e) => setIlanLink(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-400">
              İlan fiyatı (₺)
            </label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Örn. 850000"
              value={fiyat}
              onChange={(e) => setFiyat(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-400">
              Piyasa ortalaması (₺)
            </label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Örn. 950000"
              value={piyasaOrt}
              onChange={(e) => setPiyasaOrt(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-400">
            Satıcı tipi
          </label>
          <select
            value={saticiTipi}
            onChange={(e) => setSaticiTipi(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            {SATICI_TIPLERI.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={handleAnalyze}
          className="w-full rounded-xl bg-primary py-3 font-medium text-white transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          Analiz et
        </button>
      </div>

      <AnimatePresence mode="wait">
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {supheliDusukFiyat && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-start gap-4 rounded-2xl border-2 border-red-500/50 bg-red-500/10 p-5"
              >
                <AlertTriangle className="size-6 shrink-0 text-red-400" />
                <div>
                  <p className="font-semibold text-red-300">
                    Dikkat: Şüpheli düşük fiyat! Kapora göndermeyin.
                  </p>
                  <p className="mt-1 text-sm text-red-200/90">
                    İlan fiyatı piyasa ortalamasının %20 altında. Dolandırıcılık riski yüksek; yüz yüze görüşmeden ödeme yapmayın.
                  </p>
                </div>
              </motion.div>
            )}

            <motion.div
              layout
              className="flex items-center gap-4 rounded-2xl border border-zinc-700 bg-zinc-900 p-5"
            >
              {riskSkoru > 60 ? (
                <ShieldCheck className="size-8 text-emerald-500" />
              ) : (
                <AlertTriangle className="size-8 text-amber-500" />
              )}
              <div>
                <p className="text-sm text-zinc-400">Risk skoru</p>
                <p className="text-2xl font-bold text-zinc-50">{riskSkoru} / 100</p>
                <p className="text-sm text-zinc-400">
                  Fiyat / piyasa: %{oran.toFixed(0)} · Satıcı etkisi: +{saticiRisk}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
