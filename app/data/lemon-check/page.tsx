"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ShieldAlert } from "lucide-react";

const QUESTIONS = [
  { id: "el_degisim", label: "Araç 3'ten fazla el değiştirdi mi?", weight: 25 },
  { id: "hizli_km", label: "Kısa sürede çok km yapıldı mı?", weight: 30 },
  { id: "dusuk_fiyat", label: "Fiyat piyasanın çok altında mı?", weight: 35 },
  { id: "ekspertiz_red", label: "Satıcı ekspertiz veya tramer göstermekten kaçınıyor mu?", weight: 20 },
  { id: "acil_satis", label: "Acil satış veya kapora isteği var mı?", weight: 25 },
];

export default function LemonCheckPage() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const setAnswer = (id: string, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setSubmitted(false);
  };

  const { riskScore, verdict, isClean } = useMemo(() => {
    let score = 0;
    QUESTIONS.forEach((q) => {
      if (answers[q.id] === true) score += q.weight;
    });
    const riskScore = Math.min(100, score);
    const isClean = riskScore < 40;
    const verdict = isClean
      ? "Bu araç temiz görünüyor."
      : "Uzak durun, sorunlu olabilir.";
    return { riskScore, verdict, isClean };
  }, [answers]);

  const allAnswered = QUESTIONS.every((q) => answers[q.id] !== undefined);

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
          Limon Kontrol
        </h1>
        <p className="mt-2 text-zinc-400">
          Gizli kusurlu araç (limon) riskini değerlendirin. Soruları yanıtlayın.
        </p>
      </header>

      <motion.div
        layout
        className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
      >
        {QUESTIONS.map((q) => (
          <div
            key={q.id}
            className="rounded-xl border border-zinc-700/50 bg-zinc-800/30 p-4"
          >
            <p className="font-medium text-zinc-200">{q.label}</p>
            <div className="mt-2 flex gap-4">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name={q.id}
                  checked={answers[q.id] === false}
                  onChange={() => setAnswer(q.id, false)}
                  className="accent-primary"
                />
                <span className="text-zinc-400">Hayır</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name={q.id}
                  checked={answers[q.id] === true}
                  onChange={() => setAnswer(q.id, true)}
                  className="accent-primary"
                />
                <span className="text-zinc-400">Evet</span>
              </label>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          disabled={!allAnswered}
          className="mt-6 w-full rounded-xl bg-primary py-3 font-medium text-white transition hover:bg-primary/90 disabled:opacity-50"
        >
          Limon riskini hesapla
        </button>
      </motion.div>

      <AnimatePresence>
        {submitted && allAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={
              isClean
                ? "rounded-2xl border-2 border-emerald-500/50 bg-emerald-500/10 p-6"
                : "rounded-2xl border-2 border-amber-500/50 bg-amber-500/10 p-6"
            }
          >
            <div className="flex items-start gap-4">
              {isClean ? (
                <ShieldCheck className="size-10 shrink-0 text-emerald-500" />
              ) : (
                <ShieldAlert className="size-10 shrink-0 text-amber-500" />
              )}
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-zinc-400">
                  Risk skoru
                </p>
                <p
                  className={
                    isClean
                      ? "text-4xl font-bold tabular-nums text-emerald-400"
                      : "text-4xl font-bold tabular-nums text-amber-400"
                  }
                >
                  {riskScore} / 100
                </p>
                <p className="mt-3 text-lg font-semibold text-zinc-50">
                  {verdict}
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  {isClean
                    ? "Tüm cevaplar düşük risk işaret ediyor. Yine de ekspertiz ve tramer kontrolü önerilir."
                    : "Yüksek limon riski. Kapora göndermeyin, yüz yüze görüşüp ekspertiz şartı koşun."}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
