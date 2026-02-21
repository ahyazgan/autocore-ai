"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Images, Music, Download, Plus, X } from "lucide-react";

const MUSIC_OPTIONS = [
  { id: "luxury", label: "Lüks", desc: "Yavaş, şık" },
  { id: "fast", label: "Hızlı", desc: "Dinamik, enerjik" },
  { id: "aggressive", label: "Agresif", desc: "Sportif, güçlü" },
];

export default function ReelsMakerPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [music, setMusic] = useState("luxury");
  const [previewing, setPreviewing] = useState(false);
  const [rendering, setRendering] = useState(false);
  const [renderDone, setRenderDone] = useState(false);

  const handleFiles = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(e.target.files ?? []);
    if (!list.length) return;
    setFiles((prev) => [...prev, ...list].slice(0, 10));
    setPreviews((prev) => {
      const newUrls = list.map((f) => URL.createObjectURL(f));
      return [...prev, ...newUrls].slice(0, 10);
    });
    setRenderDone(false);
  }, []);

  const removeAt = (i: number) => {
    setFiles((prev) => prev.filter((_, j) => j !== i));
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[i]);
      return prev.filter((_, j) => j !== i);
    });
    setRenderDone(false);
  };

  const startPreview = () => {
    if (previews.length === 0) return;
    setPreviewing(true);
    setRendering(false);
    setRenderDone(false);
  };

  const startRender = () => {
    setPreviewing(false);
    setRendering(true);
    setRenderDone(false);
    setTimeout(() => {
      setRendering(false);
      setRenderDone(true);
    }, 3500);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
          Reels Yapıcı
        </h1>
        <p className="mt-2 text-zinc-400">
          Birden fazla fotoğraf yükleyin, müzik seçin ve videonuzu oluşturun.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <motion.div
            layout
            className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
          >
            <h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-zinc-400">
              <Images className="size-4" />
              Fotoğraflar (en fazla 10)
            </h3>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFiles}
              className="hidden"
              id="reels-upload"
            />
            <label
              htmlFor="reels-upload"
              className="mb-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-800/50 py-8 transition hover:border-zinc-600"
            >
              <Plus className="size-10 text-zinc-500" />
              <span className="text-zinc-400">Fotoğraf ekle</span>
            </label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              <AnimatePresence>
                {previews.map((url, i) => (
                  <motion.div
                    key={url}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group relative aspect-square overflow-hidden rounded-xl border border-zinc-700"
                  >
                    <img
                      src={url}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeAt(i)}
                      className="absolute right-2 top-2 rounded-full bg-zinc-900/80 p-1.5 text-zinc-400 hover:bg-red-500/80 hover:text-white"
                    >
                      <X className="size-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-zinc-400">
              <Music className="size-4" />
              Müzik seç
            </h3>
            <select
              value={music}
              onChange={(e) => setMusic(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {MUSIC_OPTIONS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label} — {m.desc}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-6">
          <motion.div
            layout
            className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
          >
            <h3 className="mb-4 text-sm font-medium text-zinc-400">
              Video önizleme
            </h3>
            <div className="aspect-[9/16] max-h-[400px] overflow-hidden rounded-xl bg-zinc-800">
              <AnimatePresence mode="wait">
                {!previewing && !rendering && !renderDone && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-full flex-col items-center justify-center gap-3 p-4 text-zinc-500"
                  >
                    <Images className="size-12" />
                    <p className="text-center text-sm">
                      {previews.length
                        ? `${previews.length} fotoğraf hazır`
                        : "Fotoğraf ekleyin"}
                    </p>
                    {previews.length > 0 && (
                      <button
                        type="button"
                        onClick={startPreview}
                        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                      >
                        Önizle
                      </button>
                    )}
                  </motion.div>
                )}
                {previewing && !rendering && (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative flex h-full flex-col"
                  >
                    {previews[0] && (
                      <img
                        src={previews[0]}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-700">
                      <motion.div
                        className="h-full bg-primary"
                        initial={{ width: "0%" }}
                        animate={{ width: "60%" }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                      />
                    </div>
                    <div className="absolute left-0 right-0 top-4 flex justify-center gap-1">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <motion.span
                          key={i}
                          className="text-primary"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.8,
                            delay: i * 0.1,
                          }}
                        >
                          ♪
                        </motion.span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={startRender}
                      className="absolute bottom-4 left-4 right-4 rounded-lg bg-primary py-2 text-sm font-medium text-white hover:bg-primary/90"
                    >
                      Videoyu oluştur
                    </button>
                  </motion.div>
                )}
                {rendering && (
                  <motion.div
                    key="render"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-full flex-col items-center justify-center gap-4 p-4"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      className="size-12 rounded-full border-2 border-primary border-t-transparent"
                    />
                    <p className="text-sm font-medium text-zinc-300">
                      Video oluşturuluyor...
                    </p>
                    <div className="h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-zinc-700">
                      <motion.div
                        className="h-full bg-primary"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3.2, ease: "linear" }}
                      />
                    </div>
                  </motion.div>
                )}
                {renderDone && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-full flex-col items-center justify-center gap-4 p-4"
                  >
                    <div className="rounded-full bg-emerald-500/20 p-4">
                      <Download className="size-10 text-emerald-400" />
                    </div>
                    <p className="text-center font-medium text-zinc-50">
                      Video hazır
                    </p>
                    <button
                      type="button"
                      className="rounded-xl bg-primary px-6 py-3 font-medium text-white hover:bg-primary/90"
                    >
                      MP4 indir
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
