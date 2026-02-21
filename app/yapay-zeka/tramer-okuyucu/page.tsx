"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { ImageUp, Sparkles, AlertTriangle, MessageCircle, Banknote } from "lucide-react";
import { cn } from "@/lib/utils";

type TramerResult = {
  total_damage: number;
  severity: string;
  mechanic_comment: string;
};

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string) ?? "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function formatTL(n: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

export default function TramerOkuyucuPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TramerResult | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(t);
  }, [toast]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const f = acceptedFiles[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
      setResult(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
    disabled: loading,
  });

  const analyze = useCallback(async () => {
    if (!file) {
      setToast("Lütfen önce bir görüntü yükleyin.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const base64 = await fileToBase64(file);
      const res = await fetch("/api/analyze-tramer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });
      const data = await res.json();

      if (!res.ok) {
        setToast(data.error ?? "Görüntü okunamadı veya Tramer SMS değil.");
        setLoading(false);
        return;
      }

      setResult({
        total_damage: typeof data.total_damage === "number" ? data.total_damage : 0,
        severity: typeof data.severity === "string" ? data.severity : "Belirsiz",
        mechanic_comment: typeof data.mechanic_comment === "string" ? data.mechanic_comment : "",
      });
    } catch {
      setToast("Bağlantı hatası. Tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }, [file]);

  const reset = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFile(null);
    setResult(null);
  }, [preview]);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8">
      <header className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl md:text-4xl">
          Tramer SMS Dedektifi
        </h1>
        <p className="mt-2 text-zinc-400">
          5664 Tramer hasar kaydı SMS ekran görüntüsünü yükleyin; toplam hasar ve usta yorumu çıksın.
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

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 shadow-xl backdrop-blur sm:p-6 md:p-8">
        {!preview ? (
          <div
            {...getRootProps()}
            className={cn(
              "flex min-h-[240px] cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed transition-colors touch-manipulation",
              isDragActive ? "border-primary/60 bg-primary/5" : "border-zinc-700 bg-zinc-800/40 hover:border-zinc-600"
            )}
          >
            <input {...getInputProps()} />
            <ImageUp className="size-14 text-zinc-500" />
            <p className="text-center text-zinc-400">
              SMS ekran görüntüsünü buraya sürükleyin veya tıklayın
            </p>
            <p className="text-sm text-zinc-500">PNG, JPG — en fazla 10MB</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-xl border border-zinc-700 bg-zinc-800">
              <img
                src={preview}
                alt="Tramer önizleme"
                className="w-full object-contain max-h-[400px]"
              />
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/80"
                >
                  <div className="relative mb-4">
                    <div className="size-16 rounded-full border-2 border-primary/40 border-t-primary animate-spin" />
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
                    <Sparkles className="absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-zinc-300">Tramer taranıyor...</p>
                  <div className="mt-2 h-1 w-32 overflow-hidden rounded-full bg-zinc-700">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    />
                  </div>
                </motion.div>
              )}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={analyze}
                disabled={loading}
                className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/80 py-3 font-semibold text-white shadow-lg shadow-primary/25 transition-opacity hover:opacity-95 disabled:opacity-50"
              >
                <Sparkles className="size-5" />
                Tramer&apos;i Analiz Et
              </button>
              <button
                type="button"
                onClick={reset}
                disabled={loading}
                className="min-h-[44px] rounded-xl border border-zinc-600 bg-zinc-800 px-4 py-3 text-sm font-medium text-zinc-300 hover:bg-zinc-700 disabled:opacity-50"
              >
                Yeni Görüntü
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
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
              <p className="mb-1 text-sm font-medium uppercase tracking-wider text-zinc-400">
                Toplam Hasar Tutarı
              </p>
              <p className="flex items-center gap-2 text-4xl font-bold text-zinc-50 sm:text-5xl">
                <Banknote className="size-8 text-primary" />
                {formatTL(result.total_damage)}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-zinc-400">Hasar Derecesi</p>
              <span
                className={cn(
                  "inline-flex rounded-full px-4 py-2 text-sm font-semibold border",
                  /Pert/i.test(result.severity) && "bg-red-500/20 text-red-400 border-red-500/40",
                  /Ağır/i.test(result.severity) && "bg-amber-500/20 text-amber-400 border-amber-500/40",
                  /Orta/i.test(result.severity) && "bg-yellow-500/20 text-yellow-400 border-yellow-500/40",
                  /Hafif/i.test(result.severity) && "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
                  !/Pert|Ağır|Orta|Hafif/i.test(result.severity) && "bg-zinc-600/50 text-zinc-300 border-zinc-500"
                )}
              >
                {result.severity}
              </span>
            </div>

            {result.mechanic_comment && (
              <div>
                <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-zinc-100">
                  <MessageCircle className="size-5 text-primary" />
                  Ustanın Yorumu
                </h2>
                <p className="rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-4 text-zinc-200 leading-relaxed">
                  {result.mechanic_comment}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
