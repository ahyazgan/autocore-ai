"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

function calcTire(width: number, aspect: number, rim: number) {
  const sidewall = (width * aspect) / 100;
  const diameter = sidewall * 2 + rim * 25.4; // mm
  const circumference = Math.PI * diameter; // mm
  return { sidewall, diameter, circumference };
}

const WIDTH_OPTIONS = [155, 165, 175, 185, 195, 205, 215, 225, 235, 245, 255, 265, 275, 285, 295, 305];
const ASPECT_OPTIONS = [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80];
const RIM_OPTIONS = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

function Select({
  value, onChange, options, label,
}: {
  value: number;
  onChange: (v: number) => void;
  options: number[];
  label: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      aria-label={label}
      className="w-full rounded-xl border border-zinc-600 bg-zinc-900 px-3 py-2.5 text-zinc-50 outline-none focus:border-blue-500 text-sm"
    >
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}

export default function TireCalcPage() {
  const [cWidth, setCWidth] = useState(205);
  const [cAspect, setCAspect] = useState(55);
  const [cRim, setCRim] = useState(16);
  const [nWidth, setNWidth] = useState(215);
  const [nAspect, setNAspect] = useState(55);
  const [nRim, setNRim] = useState(16);

  const current = useMemo(() => calcTire(cWidth, cAspect, cRim), [cWidth, cAspect, cRim]);
  const newTire = useMemo(() => calcTire(nWidth, nAspect, nRim), [nWidth, nAspect, nRim]);

  const diameterDiff = newTire.diameter - current.diameter;
  const diameterDiffPct = (diameterDiff / current.diameter) * 100;
  const speedError = diameterDiffPct; // % – pozitif = gerçek hız daha yüksek

  const status =
    Math.abs(diameterDiffPct) <= 2 ? "safe" :
    Math.abs(diameterDiffPct) <= 4 ? "warning" : "danger";

  const statusConfig = {
    safe: { label: "Uyumlu", color: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/5", Icon: CheckCircle },
    warning: { label: "Dikkat Gerekli", color: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-500/5", Icon: AlertTriangle },
    danger: { label: "Uyumsuz", color: "text-red-400", border: "border-red-500/30", bg: "bg-red-500/5", Icon: AlertTriangle },
  }[status];

  const currentSize = `${cWidth}/${cAspect} R${cRim}`;
  const newSize = `${nWidth}/${nAspect} R${nRim}`;

  const currentScale = 1;
  const newScale = Math.min(1.3, Math.max(0.7, newTire.diameter / current.diameter));

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-50">Lastik Boyutu Hesaplayıcı</h1>
        <p className="mt-1 text-sm text-zinc-400">Farklı lastik boyutlarının uyumunu ve hız göstergesi hatasını hesaplayın</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Mevcut Lastik */}
        <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 p-5 space-y-4">
          <h3 className="font-semibold text-zinc-200">Mevcut Lastik</h3>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <p className="text-xs text-zinc-500 mb-1">Genişlik</p>
              <Select value={cWidth} onChange={setCWidth} options={WIDTH_OPTIONS} label="Mevcut genişlik" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-1">En-Boy</p>
              <Select value={cAspect} onChange={setCAspect} options={ASPECT_OPTIONS} label="Mevcut en-boy" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-1">Jant (R)</p>
              <Select value={cRim} onChange={setCRim} options={RIM_OPTIONS} label="Mevcut jant" />
            </div>
          </div>
          <div className="rounded-xl bg-zinc-900 px-4 py-3 text-center">
            <p className="text-xs text-zinc-500">Boyut</p>
            <p className="font-mono text-lg font-bold text-zinc-100">{currentSize}</p>
            <p className="text-xs text-zinc-500 mt-1">Çap: {current.diameter.toFixed(1)} mm</p>
          </div>
        </div>

        {/* Yeni Lastik */}
        <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 p-5 space-y-4">
          <h3 className="font-semibold text-zinc-200">Yeni Lastik</h3>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <p className="text-xs text-zinc-500 mb-1">Genişlik</p>
              <Select value={nWidth} onChange={setNWidth} options={WIDTH_OPTIONS} label="Yeni genişlik" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-1">En-Boy</p>
              <Select value={nAspect} onChange={setNAspect} options={ASPECT_OPTIONS} label="Yeni en-boy" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-1">Jant (R)</p>
              <Select value={nRim} onChange={setNRim} options={RIM_OPTIONS} label="Yeni jant" />
            </div>
          </div>
          <div className="rounded-xl bg-zinc-900 px-4 py-3 text-center">
            <p className="text-xs text-zinc-500">Boyut</p>
            <p className="font-mono text-lg font-bold text-zinc-100">{newSize}</p>
            <p className="text-xs text-zinc-500 mt-1">Çap: {newTire.diameter.toFixed(1)} mm</p>
          </div>
        </div>
      </div>

      {/* Görsel Karşılaştırma */}
      <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 p-6 flex items-center justify-center gap-12">
        <div className="flex flex-col items-center gap-2">
          <div
            style={{ width: 80 * currentScale, height: 80 * currentScale }}
            className="rounded-full border-8 border-zinc-400 flex items-center justify-center bg-zinc-700"
          >
            <div className="rounded-full bg-zinc-500" style={{ width: 24 * currentScale, height: 24 * currentScale }} />
          </div>
          <p className="text-xs text-zinc-400">{currentSize}</p>
        </div>
        <span className="text-zinc-600 text-lg font-bold">vs</span>
        <div className="flex flex-col items-center gap-2">
          <div
            style={{ width: 80 * newScale, height: 80 * newScale }}
            className={`rounded-full border-8 flex items-center justify-center ${
              status === "safe" ? "border-emerald-400" : status === "warning" ? "border-amber-400" : "border-red-400"
            } bg-zinc-700`}
          >
            <div className="rounded-full bg-zinc-500" style={{ width: 24 * newScale, height: 24 * newScale }} />
          </div>
          <p className="text-xs text-zinc-400">{newSize}</p>
        </div>
      </div>

      {/* Sonuçlar */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentSize}-${newSize}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl border p-6 ${statusConfig.border} ${statusConfig.bg}`}
        >
          <div className="flex items-center gap-3 mb-5">
            <statusConfig.Icon className={`size-6 ${statusConfig.color}`} />
            <span className={`font-semibold text-lg ${statusConfig.color}`}>{statusConfig.label}</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-zinc-900/50 p-4 text-center">
              <p className="text-xs text-zinc-500 mb-1">Çap Farkı</p>
              <p className={`text-xl font-bold ${statusConfig.color}`}>
                {diameterDiff > 0 ? "+" : ""}{diameterDiff.toFixed(1)} mm
              </p>
            </div>
            <div className="rounded-xl bg-zinc-900/50 p-4 text-center">
              <p className="text-xs text-zinc-500 mb-1">Boy Farkı %</p>
              <p className={`text-xl font-bold ${statusConfig.color}`}>
                {diameterDiffPct > 0 ? "+" : ""}{diameterDiffPct.toFixed(2)}%
              </p>
            </div>
            <div className="rounded-xl bg-zinc-900/50 p-4 text-center">
              <p className="text-xs text-zinc-500 mb-1">Hız Göst. Hatası</p>
              <p className={`text-xl font-bold ${statusConfig.color}`}>
                {speedError > 0 ? "+" : ""}{speedError.toFixed(2)}%
              </p>
            </div>
          </div>
          {status !== "safe" && (
            <div className="mt-4 flex items-start gap-2 text-sm">
              <Info className={`size-4 shrink-0 mt-0.5 ${statusConfig.color}`} />
              <p className="text-zinc-300">
                {status === "warning"
                  ? "Bu fark kabul edilebilir sınırlarda ancak dikkatli olunmalı. Odometreniz yaklaşık olarak hatalı gösterebilir."
                  : "Bu fark çok büyük. Lastikler çamurluk veya fren sistemine sürtebilir. Farklı bir boyut seçin."}
              </p>
            </div>
          )}
          {status === "safe" && (
            <p className="mt-4 text-sm text-zinc-400 flex items-center gap-2">
              <CheckCircle className="size-4 text-emerald-400" />
              Bu lastik boyutu değişikliği güvenli aralıkta. Takıp kullanabilirsiniz.
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Açıklama */}
      <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 p-5 text-sm text-zinc-400 space-y-2">
        <p className="font-medium text-zinc-300">Lastik Boyutu Okuma Kılavuzu</p>
        <p><span className="text-zinc-200">205</span> = Lastik genişliği (mm)</p>
        <p><span className="text-zinc-200">/55</span> = En-boy oranı (yan duvar yüksekliği, genişliğin %55&apos;i)</p>
        <p><span className="text-zinc-200">R16</span> = Jant çapı (inç)</p>
      </div>
    </div>
  );
}
