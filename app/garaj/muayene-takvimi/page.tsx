"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, Bell, Clock } from "lucide-react";

const INSPECTION_YEARS_HUSUSI = 2;
const INSPECTION_YEARS_TICARI = 1;

export default function MuayeneTakvimiPage() {
  const [trafikTarihi, setTrafikTarihi] = useState("");
  const [araçTipi, setAraçTipi] = useState<"hususi" | "ticari">("hususi");

  const { nextDate, daysLeft, isValid } = useMemo(() => {
    if (!trafikTarihi) return { nextDate: null, daysLeft: null, isValid: false };
    const d = new Date(trafikTarihi);
    if (Number.isNaN(d.getTime())) return { nextDate: null, daysLeft: null, isValid: false };
    const years = araçTipi === "hususi" ? INSPECTION_YEARS_HUSUSI : INSPECTION_YEARS_TICARI;
    const next = new Date(d);
    next.setFullYear(next.getFullYear() + years);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    next.setHours(0, 0, 0, 0);
    const diff = Math.ceil((next.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return { nextDate: next, daysLeft: diff, isValid: true };
  }, [trafikTarihi, araçTipi]);

  const handleReminder = () => {
    if (!nextDate) return;
    const title = "TÜVTÜRK Muayene";
    const text = `Sonraki muayene tarihi: ${nextDate.toLocaleDateString("tr-TR")}`;
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, { body: text });
    } else if ("Notification" in window) {
      Notification.requestPermission().then((p) => {
        if (p === "granted") new Notification(title, { body: text });
      });
    }
    alert(`Hatırlatıcı: ${text}\n\nTarayıcı bildirimi ayarlanabilir.`);
  };

  return (
    <div className="mx-auto max-w-lg space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
          Muayene Takvimi
        </h1>
        <p className="mt-2 text-zinc-400">
          Trafik çıkış tarihine göre bir sonraki TÜVTÜRK muayene tarihini hesaplayın.
        </p>
      </header>

      <div className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-400">
            <Calendar className="size-4" />
            Trafik çıkış tarihi
          </label>
          <input
            type="date"
            value={trafikTarihi}
            onChange={(e) => setTrafikTarihi(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-400">
            Araç tipi
          </label>
          <div className="flex gap-4">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="tip"
                checked={araçTipi === "hususi"}
                onChange={() => setAraçTipi("hususi")}
                className="accent-primary"
              />
              <span className="text-zinc-300">Hususi (2 yıl)</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="tip"
                checked={araçTipi === "ticari"}
                onChange={() => setAraçTipi("ticari")}
                className="accent-primary"
              />
              <span className="text-zinc-300">Ticari (1 yıl)</span>
            </label>
          </div>
        </div>
      </div>

      {isValid && nextDate && daysLeft !== null && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 rounded-2xl border border-zinc-700 bg-zinc-900 p-6"
        >
          <div className="flex items-center gap-3 text-zinc-400">
            <Clock className="size-5" />
            <span>Sonraki muayene tarihi</span>
          </div>
          <p className="text-3xl font-bold text-zinc-50">
            {nextDate.toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p className="text-zinc-400">
            {daysLeft > 0
              ? `${daysLeft} gün kaldı`
              : daysLeft === 0
                ? "Muayene bugün!"
                : "Muayene süresi geçmiş, en kısa sürede muayene yaptırın."}
          </p>
          <button
            type="button"
            onClick={handleReminder}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-medium text-white transition hover:bg-primary/90"
          >
            <Bell className="size-5" />
            Hatırlatıcı oluştur
          </button>
        </motion.div>
      )}
    </div>
  );
}
