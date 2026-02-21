"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, AlertTriangle, ThumbsUp, MessageCircle } from "lucide-react";

const MIN_LENGTH = 80;
const TOAST_MESSAGE = "Lütfen daha uzun bir ilan metni girin.";

type AnalysisResult = {
  red_flags: string[];
  green_flags: string[];
  summary: string;
};

export default function IlanDedektifiPage() {
  const [adText, setAdText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4500);
    return () => clearTimeout(t);
  }, [toast]);

  const analyze = useCallback(async () => {
    const trimmed = adText.trim();
    if (trimmed.length < MIN_LENGTH) {
      setToast(TOAST_MESSAGE);
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/analyze-ad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adText: trimmed }),
      });
      const data = await res.json();

      if (!res.ok) {
        setToast(data.error ?? "Bir hata oluştu.");
        setLoading(false);
        return;
      }

      setResult({
        red_flags: Array.isArray(data.red_flags) ? data.red_flags : [],
        green_flags: Array.isArray(data.green_flags) ? data.green_flags : [],
        summary: typeof data.summary === "string" ? data.summary : "",
      });
    } catch {
      setToast("Bağlantı hatası. Tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }, [adText]);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
          İlan Dedektifi
        </h1>
        <p className="mt-2 text-zinc-400">
          İlan açıklamasını yapıştırın; yapay zeka gizli riskleri ve olumlu yanları özetlesin.
        </p>
      </header>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-6 left-1/2 z-50 flex max-w-md -translate-x-1/2 items-center gap-3 rounded-lg border border-amber-500/50 bg-zinc-800 px-4 py-3 shadow-xl"
          >
            <AlertTriangle className="size-5 shrink-0 text-amber-400" />
            <p className="text-sm font-medium text-zinc-100">{toast}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-xl backdrop-blur sm:p-8">
        <textarea
          placeholder="Sarı sitedeki ilan açıklamasını buraya yapıştırın..."
          value={adText}
          onChange={(e) => setAdText(e.target.value)}
          disabled={loading}
          rows={10}
          className="w-full resize-y rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3.5 text-zinc-100 placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-70"
        />
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={analyze}
            disabled={loading || adText.trim().length < MIN_LENGTH}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/80 px-6 py-3 font-semibold text-white shadow-lg shadow-primary/25 transition-opacity hover:opacity-95 disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="size-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Analiz ediliyor...
              </>
            ) : (
              <>
                <Sparkles className="size-5" />
                İlanı Analiz Et
              </>
            )}
          </button>
        </div>
      </div>

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 py-16"
        >
          <div className="relative">
            <div className="size-16 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
            <Sparkles className="absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 text-primary" />
          </div>
          <p className="text-lg font-medium text-zinc-300">İlan taranıyor...</p>
          <div className="flex gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary [animation-delay:0ms]" />
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary [animation-delay:200ms]" />
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary [animation-delay:400ms]" />
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {result.red_flags.length > 0 && (
              <section>
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-red-400">
                  <AlertTriangle className="size-5" />
                  Kırmızı Bayraklar
                </h2>
                <ul className="space-y-3">
                  {result.red_flags.map((text, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-zinc-200"
                    >
                      {text}
                    </motion.li>
                  ))}
                </ul>
              </section>
            )}

            {result.summary && (
              <section>
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-zinc-100">
                  <MessageCircle className="size-5 text-primary" />
                  Ustanın Yorumu
                </h2>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-4 text-zinc-200"
                >
                  {result.summary}
                </motion.div>
              </section>
            )}

            {result.green_flags.length > 0 && (
              <section>
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-emerald-400">
                  <ThumbsUp className="size-5" />
                  Olumlu Yanlar
                </h2>
                <ul className="space-y-3">
                  {result.green_flags.map((text, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.05 }}
                      className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-zinc-200"
                    >
                      {text}
                    </motion.li>
                  ))}
                </ul>
              </section>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
