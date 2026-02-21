"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileUp,
  Sparkles,
  AlertTriangle,
  Gauge,
  Wrench,
  Scale,
} from "lucide-react";
import { cn } from "@/lib/utils";

type EkspertizResult = {
  motor_health: number;
  body_parts: string[];
  verdict: string;
};

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string) ?? "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

const ACCEPT = {
  "image/*": [".png", ".jpg", ".jpeg", ".webp"],
  "application/pdf": [".pdf"],
};

export default function EkspertizPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isPdf, setIsPdf] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EkspertizResult | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(t);
  }, [toast]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const f = acceptedFiles[0];
    if (!f) return;
    const pdf = f.type === "application/pdf";
    setIsPdf(pdf);
    if (pdf) {
      setToast("Şu an sadece görsel kabul ediliyor. Lütfen raporun ekran görüntüsünü (JPG/PNG) yükleyin.");
      setFile(null);
      setPreview(null);
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPT,
    maxFiles: 1,
    maxSize: 15 * 1024 * 1024,
    disabled: loading,
  });

  const analyze = useCallback(async () => {
    if (!file || isPdf) {
      setToast("Lütfen ekspertiz raporunun görselini (JPG/PNG) yükleyin.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const base64 = await fileToBase64(file);
      const res = await fetch("/api/analyze-ekspertiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });
      const data = await res.json();

      if (!res.ok) {
        setToast(data.error ?? "Rapor okunamadı.");
        setLoading(false);
        return;
      }

      setResult({
        motor_health: typeof data.motor_health === "number" ? data.motor_health : 0,
        body_parts: Array.isArray(data.body_parts) ? data.body_parts : [],
        verdict: typeof data.verdict === "string" ? data.verdict : "",
      });
    } catch {
      setToast("Bağlantı hatası. Tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }, [file, isPdf]);

  const reset = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFile(null);
    setIsPdf(false);
    setResult(null);
  }, [preview]);

  const verdictStyle = (v: string) => {
    if (/güvenli|temiz|sadece/i.test(v)) return "border-emerald-500/50 bg-emerald-500/10 text-emerald-300";
    if (/dikkat|orta|fiyata/i.test(v)) return "border-amber-500/50 bg-amber-500/10 text-amber-300";
    if (/uzak|kaçın|risk/i.test(v)) return "border-red-500/50 bg-red-500/10 text-red-300";
    return "border-zinc-600 bg-zinc-800/80 text-zinc-200";
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
          Ekspertiz Çevirmeni
        </h1>
        <p className="mt-2 text-lg text-zinc-400">
          Ekspertiz Raporunu Yükle, Ustanın Dilinden Dinle.
        </p>
        <p className="mt-1 text-sm text-zinc-500">
          Kafa karıştıran Dyno testleri ve yanal kayma verilerini saniyeler içinde
          anlaşılır Türkçeye çeviriyoruz.
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
        {!preview ? (
          <div
            {...getRootProps()}
            className={cn(
              "flex min-h-[260px] cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed transition-colors",
              isDragActive ? "border-primary/60 bg-primary/5" : "border-zinc-700 bg-zinc-800/40 hover:border-zinc-600"
            )}
          >
            <input {...getInputProps()} />
            <FileUp className="size-14 text-zinc-500" />
            <p className="text-center text-zinc-400">
              Ekspertiz raporu görseli veya PDF sürükleyin
            </p>
            <p className="text-sm text-zinc-500">JPG, PNG — en fazla 15MB (PDF ekran görüntüsü önerilir)</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-xl border border-zinc-700 bg-zinc-800">
              <img
                src={preview}
                alt="Ekspertiz önizleme"
                className="w-full object-contain max-h-[320px]"
              />
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/85"
                >
                  <div className="relative mb-3">
                    <div className="size-14 rounded-full border-2 border-primary/40 border-t-primary animate-spin" />
                    <Sparkles className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-zinc-300">
                    Rapor taranıyor, şase ve motor verileri analiz ediliyor...
                  </p>
                </motion.div>
              )}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={analyze}
                disabled={loading}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/80 py-3 font-semibold text-white shadow-lg shadow-primary/25 transition-opacity hover:opacity-95 disabled:opacity-50"
              >
                <Sparkles className="size-5" />
                Raporu Analiz Et
              </button>
              <button
                type="button"
                onClick={reset}
                disabled={loading}
                className="rounded-xl border border-zinc-600 bg-zinc-800 px-4 py-3 text-sm font-medium text-zinc-300 hover:bg-zinc-700 disabled:opacity-50"
              >
                Yeni Yükle
              </button>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-zinc-50">
                <Gauge className="size-5 text-primary" />
                Motor Sağlığı
              </h2>
              <div className="flex items-center gap-4">
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-zinc-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.motor_health}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={cn(
                      "h-full rounded-full",
                      result.motor_health >= 70 && "bg-emerald-500",
                      result.motor_health >= 40 && result.motor_health < 70 && "bg-amber-500",
                      result.motor_health < 40 && "bg-red-500"
                    )}
                  />
                </div>
                <span className="text-2xl font-bold text-zinc-50">%{result.motor_health}</span>
              </div>
            </div>

            {result.body_parts.length > 0 && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-zinc-50">
                  <Wrench className="size-5 text-primary" />
                  Kaporta Durumu
                </h2>
                <ul className="space-y-2">
                  {result.body_parts.map((part, i) => (
                    <li
                      key={i}
                      className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-sm text-zinc-200"
                    >
                      {part}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.verdict && (
              <div
                className={cn(
                  "rounded-2xl border p-6",
                  verdictStyle(result.verdict)
                )}
              >
                <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                  <Scale className="size-5" />
                  Alınır mı? (Yapay Zeka Kararı)
                </h2>
                <p className="leading-relaxed">{result.verdict}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
