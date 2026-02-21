"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Check, Circle, Wrench } from "lucide-react";

const MARKALAR = [
  { id: "vw", name: "Volkswagen", modeller: ["Golf", "Passat", "Polo"] },
  { id: "toyota", name: "Toyota", modeller: ["Corolla", "Yaris", "Auris"] },
  { id: "ford", name: "Ford", modeller: ["Focus", "Fiesta", "Mondeo"] },
];

type BakimItem = { label: string; km: number };

const BAKIM_VERITABANI: Record<string, Record<string, BakimItem[]>> = {
  vw: {
    Golf: [
      { label: "Motor yağı ve filtre", km: 15000 },
      { label: "Hava filtresi", km: 30000 },
      { label: "Polen filtresi", km: 30000 },
      { label: "Triger kayışı", km: 60000 },
      { label: "Şanzıman yağı (DSG)", km: 60000 },
      { label: "Fren diski / balata kontrolü", km: 60000 },
      { label: "Buji", km: 60000 },
    ],
    Passat: [
      { label: "Motor yağı ve filtre", km: 15000 },
      { label: "Hava filtresi", km: 30000 },
      { label: "Triger kayışı", km: 90000 },
      { label: "Şanzıman yağı", km: 60000 },
    ],
    Polo: [
      { label: "Motor yağı ve filtre", km: 15000 },
      { label: "Hava filtresi", km: 30000 },
      { label: "Triger kayışı", km: 120000 },
    ],
  },
  toyota: {
    Corolla: [
      { label: "Motor yağı ve filtre", km: 15000 },
      { label: "Hava filtresi", km: 30000 },
      { label: "Triger kayışı", km: 150000 },
      { label: "Fren hidroliği", km: 60000 },
    ],
    Yaris: [
      { label: "Motor yağı ve filtre", km: 15000 },
      { label: "Hava filtresi", km: 30000 },
    ],
    Auris: [
      { label: "Motor yağı ve filtre", km: 15000 },
      { label: "Hava filtresi", km: 30000 },
      { label: "Hibrit batarya filtresi", km: 60000 },
    ],
  },
  ford: {
    Focus: [
      { label: "Motor yağı ve filtre", km: 15000 },
      { label: "Hava filtresi", km: 30000 },
      { label: "Triger kayışı (EcoBoost)", km: 60000 },
      { label: "Şanzıman yağı", km: 60000 },
    ],
    Fiesta: [
      { label: "Motor yağı ve filtre", km: 15000 },
      { label: "Hava filtresi", km: 30000 },
    ],
    Mondeo: [
      { label: "Motor yağı ve filtre", km: 15000 },
      { label: "Hava filtresi", km: 30000 },
      { label: "Triger kayışı", km: 60000 },
    ],
  },
};

export default function BakimRehberiPage() {
  const [marka, setMarka] = useState("");
  const [model, setModel] = useState("");
  const [km, setKm] = useState(60_000);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const markaData = useMemo(() => MARKALAR.find((m) => m.id === marka), [marka]);
  const items = useMemo(() => {
    if (!marka || !model) return [];
    const list = BAKIM_VERITABANI[marka]?.[model] ?? [];
    return list.filter((item) => item.km <= km).sort((a, b) => a.km - b.km);
  }, [marka, model, km]);

  const toggle = (key: string) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
          Periyodik Bakım Rehberi
        </h1>
        <p className="mt-2 text-zinc-400">
          Marka, model ve mevcut kilometreye göre yapılması gereken bakımları listeleyin; işaretleyerek takip edin.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-400">Marka</label>
          <select
            value={marka}
            onChange={(e) => { setMarka(e.target.value); setModel(""); }}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="">Seçin</option>
            {MARKALAR.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-400">Model</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            disabled={!markaData}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
          >
            <option value="">Seçin</option>
            {markaData?.modeller.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-400">Mevcut kilometre</label>
          <input
            type="number"
            min={0}
            value={km}
            onChange={(e) => setKm(Number(e.target.value) || 0)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      {items.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6"
        >
          <h2 className="mb-4 flex items-center gap-2 font-semibold text-zinc-50">
            <Wrench className="size-5 text-primary" />
            Bu kilometreye kadar yapılması gerekenler
          </h2>
          <ul className="space-y-2">
            {items.map((item) => {
              const key = `${item.label}-${item.km}`;
              const isChecked = checked[key];
              return (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => toggle(key)}
                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${
                      isChecked
                        ? "border-primary/50 bg-primary/10 text-zinc-400 line-through"
                        : "border-zinc-700 bg-zinc-800/50 text-zinc-200 hover:border-zinc-600"
                    }`}
                  >
                    {isChecked ? (
                      <Check className="size-5 shrink-0 text-primary" />
                    ) : (
                      <Circle className="size-5 shrink-0 text-zinc-500" />
                    )}
                    <span className="flex-1">{item.label}</span>
                    <span className="text-sm text-zinc-500">{item.km.toLocaleString("tr-TR")} km</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
