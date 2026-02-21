"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Car } from "lucide-react";

const FUEL_TYPES = ["Benzin", "Dizel", "LPG", "Elektrik", "Hibrit"];

const STEPS = [
  { id: 1, title: "Plaka & Şase" },
  { id: 2, title: "Araç Bilgisi" },
  { id: 3, title: "Km & Bakım" },
];

export default function GarajimEklePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    plate: "",
    vin: "",
    brand: "",
    model: "",
    year: "",
    fuel: "",
    odometer: "",
    lastServiceDate: "",
  });

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const canNext1 = true;
  const canNext2 = !!(
    form.brand &&
    form.model &&
    form.year &&
    form.fuel
  );
  const canNext3 = !!form.odometer;

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      // Submit: could POST to API here
      router.push("/garajim");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else router.push("/garajim");
  };

  const canProceed =
    (step === 1 && canNext1) ||
    (step === 2 && canNext2) ||
    (step === 3 && canNext3);

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <Link
          href="/garajim"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Garajıma dön
        </Link>

        <div className="mb-8 flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
            <Car className="size-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-50">Yeni Araç Ekle</h1>
            <p className="text-sm text-zinc-400">Adım {step} / 3 · {STEPS[step - 1].title}</p>
          </div>
        </div>

        {/* Step indicators */}
        <div className="mb-10 flex gap-2">
          {STEPS.map((s) => (
            <div
              key={s.id}
              className={`h-1.5 flex-1 rounded-full transition ${
                s.id <= step ? "bg-primary" : "bg-zinc-700"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              className="space-y-6"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Plaka (opsiyonel)
                </label>
                <input
                  type="text"
                  value={form.plate}
                  onChange={(e) => update("plate", e.target.value)}
                  placeholder="34 ABC 123"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Şase No / VIN (opsiyonel)
                </label>
                <input
                  type="text"
                  value={form.vin}
                  onChange={(e) => update("vin", e.target.value)}
                  placeholder="WVWZZZ3CZWE123456"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              className="space-y-6"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Marka *
                  </label>
                  <input
                    type="text"
                    value={form.brand}
                    onChange={(e) => update("brand", e.target.value)}
                    placeholder="Volkswagen"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Model *
                  </label>
                  <input
                    type="text"
                    value={form.model}
                    onChange={(e) => update("model", e.target.value)}
                    placeholder="Golf 1.4 TSI"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Yıl *
                  </label>
                  <input
                    type="text"
                    value={form.year}
                    onChange={(e) => update("year", e.target.value)}
                    placeholder="2020"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Yakıt Tipi *
                  </label>
                  <select
                    value={form.fuel}
                    onChange={(e) => update("fuel", e.target.value)}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-zinc-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">Seçin</option>
                    {FUEL_TYPES.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              className="space-y-6"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Mevcut Kilometre *
                </label>
                <input
                  type="number"
                  value={form.odometer}
                  onChange={(e) => update("odometer", e.target.value)}
                  placeholder="67500"
                  min={0}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Son Bakım Tarihi (opsiyonel)
                </label>
                <input
                  type="date"
                  value={form.lastServiceDate}
                  onChange={(e) => update("lastServiceDate", e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-zinc-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-10 flex justify-between gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-600 bg-zinc-800/50 px-5 py-3 text-zinc-300 transition hover:bg-zinc-700"
          >
            <ArrowLeft className="size-4" />
            {step === 1 ? "İptal" : "Geri"}
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-white transition hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none"
          >
            {step === 3 ? "Aracı Ekle" : "Devam"}
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
