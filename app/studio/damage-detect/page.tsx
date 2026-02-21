"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ScanSearch, AlertTriangle, CheckCircle } from "lucide-react";

type Imperfection = {
  id: string;
  label: string;
  severity: number;
  x: number;
  y: number;
  radius: number;
};

export default function DamageDetectPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<Imperfection[] | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f?.type.startsWith("image/")) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
      setResult(null);
    }
  }, []);

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
      setResult(null);
    }
  }, []);

  const runScan = () => {
    if (!preview) return;
    setScanning(true);
    setResult(null);
    const count = 3 + Math.floor(Math.random() * 4);
    const imperfections: Imperfection[] = [];
    for (let i = 0; i < count; i++) {
      imperfections.push({
        id: `imp-${i}`,
        label: ["Çizik", "Çöküntü", "Boya hasarı", "Taş sıçraması", "Hafif çizik"][
          i % 5
        ],
        severity: 20 + Math.floor(Math.random() * 70),
        x: 15 + Math.random() * 70,
        y: 15 + Math.random() * 70,
        radius: 4 + Math.random() * 6,
      });
    }
    setTimeout(() => {
      setScanning(false);
      setResult(imperfections);
    }, 2500);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
          Hasar Tespit
        </h1>
        <p className="mt-2 text-zinc-400">
          Araç fotoğrafı yükleyin; yapay zeka çizik ve çöküntü bölgelerini işaretler.
        </p>
      </header>

      {!preview ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="flex min-h-[320px] flex-col items-center justify-center gap-6 rounded-2xl border-2 border-dashed border-zinc-700 bg-zinc-900/50 p-8 transition-colors hover:border-zinc-600"
        >
          <Upload className="size-14 text-zinc-500" />
          <p className="text-zinc-400">Fotoğrafı buraya sürükleyin veya seçin</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
            id="damage-upload"
          />
          <label
            htmlFor="damage-upload"
            className="cursor-pointer rounded-xl bg-primary px-6 py-3 font-medium text-white transition hover:bg-primary/90"
          >
            Dosya seç
          </label>
        </motion.div>
      ) : (
        <div className="space-y-6">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
            <img
              src={preview}
              alt="Yüklenen araç"
              className="h-full w-full object-contain"
            />
            <AnimatePresence>
              {scanning && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/80"
                >
                  <ScanSearch className="size-12 text-primary" />
                  <p className="mt-3 font-medium text-zinc-200">Tarama yapılıyor...</p>
                  <div className="mt-4 h-1 w-48 overflow-hidden rounded-full bg-zinc-800">
                    <motion.div
                      className="h-full w-1/2 rounded-full bg-primary"
                      animate={{ x: ["0%", "100%"] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                    />
                  </div>
                  <motion.div
                    className="absolute left-0 right-0 h-0.5 bg-primary/80"
                    animate={{ top: ["0%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                    style={{ boxShadow: "0 0 20px 4px rgba(59,130,246,0.6)" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            {result && !scanning && (
              <>
                {result.map((imp) => (
                  <motion.div
                    key={imp.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.85 }}
                    className="absolute rounded-full border-2 border-red-500 bg-red-500/30"
                    style={{
                      left: `${imp.x}%`,
                      top: `${imp.y}%`,
                      width: `${imp.radius * 2}%`,
                      height: `${imp.radius * 2}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                ))}
              </>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={runScan}
              disabled={scanning}
              className="rounded-xl bg-primary px-6 py-3 font-medium text-white transition hover:bg-primary/90 disabled:opacity-50"
            >
              {scanning ? "Taranıyor..." : "Hasar tara"}
            </button>
            <button
              type="button"
              onClick={() => {
                setFile(null);
                setPreview(null);
                setResult(null);
              }}
              className="rounded-xl border border-zinc-600 px-6 py-3 font-medium text-zinc-300 hover:bg-zinc-800"
            >
              Yeni fotoğraf
            </button>
          </div>

          <AnimatePresence>
            {result && !scanning && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6"
              >
                <h3 className="mb-4 flex items-center gap-2 font-semibold text-zinc-50">
                  Tespit Edilen Kusurlar
                </h3>
                <ul className="space-y-3">
                  {result.map((imp) => (
                    <li
                      key={imp.id}
                      className="flex items-center justify-between rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 py-3"
                    >
                      <span className="font-medium text-zinc-200">{imp.label}</span>
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium ${
                          imp.severity >= 70
                            ? "bg-red-500/20 text-red-400"
                            : imp.severity >= 40
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-zinc-600 text-zinc-300"
                        }`}
                      >
                        Şiddet: %{imp.severity}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
