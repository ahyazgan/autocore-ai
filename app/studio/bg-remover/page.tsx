"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { CloudUpload, ChevronDown, Download, Sparkles, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const ENVIRONMENTS = ["Studio", "Nature", "Garage"] as const;

const LUXURY_GARAGE_BG =
  "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80";

const TOAST_MESSAGE = "Engine Start Failed. Please check API Key.";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.includes(",") ? result.split(",")[1] : result;
      resolve(base64 ?? "");
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export default function BgRemoverPage() {
  const [state, setState] = useState<"upload" | "loading" | "result">("upload");
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [transparentImageUrl, setTransparentImageUrl] = useState<string | null>(null);
  const [environment, setEnvironment] = useState<(typeof ENVIRONMENTS)[number]>("Studio");
  const [shadowsEnabled, setShadowsEnabled] = useState(true);
  const [plateMaskingEnabled, setPlateMaskingEnabled] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4500);
    return () => clearTimeout(t);
  }, [toast]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setOriginalImageUrl(objectUrl);
    setState("loading");

    let base64: string;
    try {
      base64 = await fileToBase64(file);
    } catch {
      setToast(TOAST_MESSAGE);
      setState("upload");
      setOriginalImageUrl(null);
      URL.revokeObjectURL(objectUrl);
      return;
    }

    try {
      const res = await fetch("/api/remove-bg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setToast(data.error ?? TOAST_MESSAGE);
        setState("upload");
        setOriginalImageUrl(null);
        URL.revokeObjectURL(objectUrl);
        return;
      }

      if (data?.url) {
        setTransparentImageUrl(data.url);
        setState("result");
      } else {
        setToast(TOAST_MESSAGE);
        setState("upload");
        setOriginalImageUrl(null);
        URL.revokeObjectURL(objectUrl);
      }
    } catch {
      setToast(TOAST_MESSAGE);
      setState("upload");
      setOriginalImageUrl(null);
      URL.revokeObjectURL(objectUrl);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] },
    maxSize: 10 * 1024 * 1024,
    maxFiles: 1,
    disabled: state === "loading" || state === "result",
  });

  const handleSliderMove = useCallback(
    (clientX: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = clientX - rect.left;
      const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(pct);
    },
    []
  );

  const onPointerDown = useCallback(() => setIsDragging(true), []);
  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: PointerEvent) => handleSliderMove(e.clientX);
    const onUp = () => setIsDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [isDragging, handleSliderMove]);

  const resetToUpload = useCallback(() => {
    if (originalImageUrl) URL.revokeObjectURL(originalImageUrl);
    setOriginalImageUrl(null);
    setTransparentImageUrl(null);
    setState("upload");
  }, [originalImageUrl]);

  const beforeSrc = originalImageUrl;
  const hasResult = state === "result" && originalImageUrl && transparentImageUrl;

  return (
    <div className="mx-auto max-w-7xl space-y-8 rounded-xl bg-zinc-950 px-4 py-6">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-6 left-1/2 z-50 flex max-w-md -translate-x-1/2 items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 shadow-xl"
          >
            <AlertCircle className="size-5 shrink-0 text-amber-400" />
            <p className="text-sm font-medium text-zinc-100">{toast}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
            AI Virtual Studio
          </h1>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800/80 px-3 py-1 text-xs font-medium text-zinc-300">
            <Sparkles className="size-3.5" />
            Powered by AutoCore AI
          </span>
        </div>
        <p className="max-w-xl text-zinc-400">
          Transform messy backgrounds into professional showrooms in seconds.
        </p>
      </header>

      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        <div className="min-w-0 flex-1">
          <AnimatePresence mode="wait">
            {state === "upload" && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
              >
                <motion.div
                  {...getRootProps()}
                  className={cn(
                    "flex min-h-[420px] cursor-pointer flex-col items-center justify-center gap-5 rounded-xl border-2 border-dashed transition-colors duration-200",
                    isDragActive
                      ? "border-primary/60 bg-primary/5"
                      : "border-zinc-700 bg-zinc-800/40 hover:border-zinc-600 hover:bg-zinc-800/60"
                  )}
                  whileHover="hover"
                  initial="rest"
                  variants={{ rest: {}, hover: {} }}
                >
                  <input {...getInputProps()} />
                  <motion.div
                    variants={{ rest: { scale: 1, y: 0 }, hover: { scale: 1.1, y: -6 } }}
                    animate={isDragActive ? { scale: 1.12, y: -8 } : undefined}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="rounded-full bg-zinc-700/50 p-5"
                  >
                    <CloudUpload className="size-14 text-zinc-400" />
                  </motion.div>
                  <p className="text-center text-lg font-medium text-zinc-300">
                    Drag & drop your car photo here, or click to browse.
                  </p>
                  <p className="text-sm text-zinc-500">Supports JPG, PNG up to 10MB.</p>
                </motion.div>
              </motion.div>
            )}

            {state === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
              >
                <div className="flex min-h-[420px] flex-col items-center justify-center gap-6 rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-800/40">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="rounded-full bg-zinc-700/50 p-5"
                  >
                    <Loader2 className="size-14 text-primary" />
                  </motion.div>
                  <p className="text-lg font-medium text-zinc-300">Scanning Vehicle...</p>
                  <div className="flex w-full max-w-xs gap-2">
                    <div className="h-2 flex-1 animate-pulse rounded-full bg-zinc-700" />
                    <div className="h-2 w-16 animate-pulse rounded-full bg-zinc-700 [animation-delay:0.2s]" />
                    <div className="h-2 flex-1 animate-pulse rounded-full bg-zinc-700 [animation-delay:0.4s]" />
                  </div>
                </div>
              </motion.div>
            )}

            {hasResult && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-400">Before / After</span>
                  <button
                    type="button"
                    onClick={resetToUpload}
                    className="text-sm text-primary hover:underline"
                  >
                    New photo
                  </button>
                </div>
                <div
                  ref={containerRef}
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-zinc-800"
                  onPointerDown={(e) => e.button === 0 && handleSliderMove(e.clientX)}
                >
                  {/* Before: original photo */}
                  <div className="absolute inset-0">
                    <img
                      src={beforeSrc!}
                      alt="Before"
                      className="size-full object-cover"
                      draggable={false}
                    />
                  </div>
                  {/* After: luxury garage + transparent car */}
                  <div
                    className="absolute inset-0"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                  >
                    <div className="absolute inset-0">
                      <img
                        src={LUXURY_GARAGE_BG}
                        alt=""
                        className="absolute inset-0 size-full object-cover"
                        draggable={false}
                      />
                      <img
                        src={transparentImageUrl!}
                        alt="Car"
                        className="absolute inset-0 size-full object-contain"
                        draggable={false}
                      />
                    </div>
                  </div>
                  <div
                    className="absolute top-0 bottom-0 z-10 w-4 cursor-ew-resize select-none -translate-x-1/2"
                    style={{ left: `${sliderPosition}%` }}
                    onPointerDown={onPointerDown}
                  >
                    <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white shadow-lg" />
                    <div className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-zinc-900 shadow-md">
                      <div className="flex gap-0.5">
                        <span className="h-3 w-0.5 bg-white" />
                        <span className="h-3 w-0.5 bg-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <aside className="w-full shrink-0 lg:w-72">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Controls
            </h2>
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">
                  Select Environment
                </label>
                <div className="relative">
                  <select
                    value={environment}
                    onChange={(e) =>
                      setEnvironment(e.target.value as (typeof ENVIRONMENTS)[number])
                    }
                    className="w-full appearance-none rounded-lg border border-zinc-700 bg-zinc-800 py-2.5 pl-3 pr-9 text-zinc-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  >
                    {ENVIRONMENTS.map((env) => (
                      <option key={env} value={env}>
                        {env}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-400">
                  Shadows & Reflections
                </label>
                <button
                  type="button"
                  role="switch"
                  aria-checked={shadowsEnabled}
                  onClick={() => setShadowsEnabled((v) => !v)}
                  className={cn(
                    "relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors",
                    shadowsEnabled ? "bg-primary" : "bg-zinc-700"
                  )}
                >
                  <span
                    className={cn(
                      "inline-block size-5 translate-y-0.5 rounded-full bg-white shadow transition-transform",
                      shadowsEnabled ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-400">Plate Masking</label>
                <button
                  type="button"
                  role="switch"
                  aria-checked={plateMaskingEnabled}
                  onClick={() => setPlateMaskingEnabled((v) => !v)}
                  className={cn(
                    "relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors",
                    plateMaskingEnabled ? "bg-primary" : "bg-zinc-700"
                  )}
                >
                  <span
                    className={cn(
                      "inline-block size-5 translate-y-0.5 rounded-full bg-white shadow transition-transform",
                      plateMaskingEnabled ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </button>
              </div>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary/80 py-3 font-medium text-white shadow-lg shadow-primary/25 transition-opacity hover:opacity-95 disabled:opacity-50"
                disabled={!hasResult}
              >
                <Download className="size-5" />
                Download HD
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
