"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, AudioLines, CheckCircle, AlertTriangle } from "lucide-react";

const DUMMY_DIAGNOSES = [
  "Subap sesi normal görünüyor. Ek bir arıza belirtisi yok.",
  "Enjektör vuruntusu şüphesi. Yakıt sistemi kontrolü önerilir.",
  "Motor sesi düzenli. Küçük titreşim olabilir; balans kontrolü yapılabilir.",
  "Egzoz sızıntısı veya susturucu sesi olabilir. Muayene önerilir.",
];

export default function MechanicAIPage() {
  const [recording, setRecording] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{ text: string; isWarning: boolean } | null>(null);

  const startAnalysis = () => {
    if (analyzing) return;
    setRecording(true);
    setAnalyzing(true);
    setResult(null);
    const idx = Math.floor(Math.random() * DUMMY_DIAGNOSES.length);
    const isWarning = idx === 1 || idx === 3;
    setTimeout(() => {
      setRecording(false);
      setResult({
        text: DUMMY_DIAGNOSES[idx],
        isWarning,
      });
      setAnalyzing(false);
    }, 5000);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
          Mekanik Asistan (AI)
        </h1>
        <p className="mt-2 text-zinc-400">
          Motor sesini dinletin; yapay zeka ile basit bir ön değerlendirme alın (demo).
        </p>
      </header>

      <div className="flex flex-col items-center rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 sm:p-12">
        <p className="mb-8 text-center text-zinc-400">
          Motor Sesini Dinlet
        </p>

        <motion.button
          type="button"
          onClick={startAnalysis}
          disabled={analyzing}
          whileHover={{ scale: analyzing ? 1 : 1.05 }}
          whileTap={{ scale: analyzing ? 1 : 0.95 }}
          animate={
            recording
              ? {
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0px 0px 0px 0px rgba(59, 130, 246, 0.5)",
                    "0px 0px 0px 20px rgba(59, 130, 246, 0)",
                    "0px 0px 0px 0px rgba(59, 130, 246, 0.5)",
                  ],
                }
              : {}
          }
          transition={
            recording
              ? {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : {}
          }
          className="relative flex size-32 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/50 focus:outline-none focus:ring-4 focus:ring-primary/30 disabled:pointer-events-none disabled:opacity-60"
        >
          <span className="text-center text-sm font-bold leading-tight">
            {recording ? "Dinleniyor..." : "Motoru Dinlet"}
          </span>
        </motion.button>

        {analyzing && (
          <p className="mt-6 text-sm text-zinc-500">
            {recording ? "Ses kaydediliyor..." : "Analiz ediliyor..."}
          </p>
        )}

        {analyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 flex w-full max-w-sm items-center justify-center gap-1"
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <motion.div
                key={i}
                className="h-8 w-1 rounded-full bg-primary/60"
                animate={{
                  height: [12, 28, 12],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.6,
                  delay: i * 0.08,
                }}
              />
            ))}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {result && !analyzing && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-10 w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-800/80 p-6"
            >
              <div className="flex items-start gap-4">
                {result.isWarning ? (
                  <AlertTriangle className="size-6 shrink-0 text-amber-500" />
                ) : (
                  <CheckCircle className="size-6 shrink-0 text-emerald-500" />
                )}
                <div>
                  <p className="text-sm font-medium text-zinc-400">
                    Ön tanı (demo)
                  </p>
                  <p
                    className={`mt-1 text-zinc-100 ${result.isWarning ? "text-amber-100" : ""}`}
                  >
                    {result.text}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
