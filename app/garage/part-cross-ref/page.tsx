"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Hash, Package } from "lucide-react";

type PartEntry = {
  partNo: string;
  partName: string;
  primaryBrand: string;
  primaryModel: string;
  compatible: { brand: string; model: string; match: number }[];
};

const PARTS_DATABASE: PartEntry[] = [
  {
    partNo: "06A115561B",
    partName: "Yağ filtresi",
    primaryBrand: "Volkswagen",
    primaryModel: "Golf 1.4 TSI",
    compatible: [
      { brand: "Audi", model: "A3", match: 100 },
      { brand: "Seat", model: "Leon", match: 100 },
      { brand: "Skoda", model: "Octavia", match: 100 },
    ],
  },
  {
    partNo: "1K0129620E",
    partName: "Hava filtresi",
    primaryBrand: "VW",
    primaryModel: "Golf / Jetta",
    compatible: [
      { brand: "Audi", model: "A3", match: 100 },
      { brand: "Seat", model: "Leon", match: 100 },
    ],
  },
  {
    partNo: "YAĞ FİLTRESİ",
    partName: "Yağ filtresi",
    primaryBrand: "Volkswagen",
    primaryModel: "Golf",
    compatible: [
      { brand: "Audi", model: "A3", match: 100 },
      { brand: "Seat", model: "Leon", match: 100 },
      { brand: "Skoda", model: "Octavia", match: 100 },
    ],
  },
  {
    partNo: "FORD-1234567",
    partName: "Fren diski",
    primaryBrand: "Ford",
    primaryModel: "Focus",
    compatible: [
      { brand: "Mazda", model: "3", match: 100 },
      { brand: "Volvo", model: "V40", match: 95 },
    ],
  },
  {
    partNo: "TOY-FF-7890",
    partName: "Polen filtresi",
    primaryBrand: "Toyota",
    primaryModel: "Corolla",
    compatible: [
      { brand: "Lexus", model: "IS (aynı platform)", match: 100 },
    ],
  },
  {
    partNo: "REN-987654",
    partName: "Buji",
    primaryBrand: "Renault",
    primaryModel: "Clio 1.0 TCe",
    compatible: [
      { brand: "Dacia", model: "Sandero", match: 100 },
      { brand: "Nissan", model: "Micra", match: 100 },
    ],
  },
  {
    partNo: "Fiat-51723456",
    partName: "Yağ filtresi",
    primaryBrand: "Fiat",
    primaryModel: "Egea",
    compatible: [
      { brand: "Alfa Romeo", model: "Giulietta", match: 100 },
      { brand: "Jeep", model: "Renegade", match: 100 },
    ],
  },
  {
    partNo: "Fiat-55219876",
    partName: "Hava filtresi",
    primaryBrand: "Fiat",
    primaryModel: "Egea / Tipo",
    compatible: [
      { brand: "Alfa Romeo", model: "Giulietta", match: 100 },
    ],
  },
];

const BRAND_PAIRS = [
  { a: "Fiat", b: "Alfa Romeo", parts: ["Yağ filtresi", "Hava filtresi", "Polen filtresi"] },
  { a: "Volkswagen", b: "Audi / Seat / Skoda", parts: ["Yağ filtresi", "Hava filtresi", "Buji"] },
  { a: "Renault", b: "Dacia / Nissan", parts: ["Buji", "Yağ filtresi", "Triger seti"] },
];

export default function PartCrossRefPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PARTS_DATABASE.filter(
      (p) =>
        p.partNo.toLowerCase().includes(q) ||
        p.partName.toLowerCase().includes(q) ||
        p.primaryBrand.toLowerCase().includes(q) ||
        p.primaryModel.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
          Parça Çapraz Referans
        </h1>
        <p className="mt-2 text-zinc-400">
          Parça numarası veya adı ile arayın; kardeş markalardaki uyumlu alternatifleri görün, daha uygun fiyat bulun.
        </p>
      </header>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Parça no veya adı (örn. Yağ Filtresi, 06A115561B)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 py-3 pl-10 pr-4 text-zinc-100 placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {query.trim() && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6 space-y-4"
            >
              {results.length === 0 ? (
                <p className="rounded-xl border border-zinc-700 bg-zinc-800/50 p-6 text-center text-zinc-500">
                  Bu arama için kayıt bulunamadı. Farklı parça no veya adı deneyin.
                </p>
              ) : (
                results.map((entry) => (
                  <motion.div
                    key={entry.partNo + entry.primaryModel}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-zinc-700 bg-zinc-800/50 p-6"
                  >
                    <div className="mb-4 flex items-start gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/20">
                        <Package className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-mono text-sm text-zinc-400">
                          {entry.partNo}
                        </p>
                        <p className="font-semibold text-zinc-50">
                          {entry.partName}
                        </p>
                        <p className="text-sm text-zinc-400">
                          {entry.primaryBrand} {entry.primaryModel}
                        </p>
                      </div>
                    </div>
                    <p className="mb-2 text-sm font-medium text-zinc-400">
                      Uyumlu modeller
                    </p>
                    <ul className="space-y-2">
                      {entry.compatible.map((c) => (
                        <li
                          key={c.brand + c.model}
                          className="flex items-center justify-between rounded-lg border border-zinc-700/50 bg-zinc-900/50 px-4 py-2 text-sm"
                        >
                          <span className="text-zinc-200">
                            {c.brand} {c.model}
                          </span>
                          <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                            %{c.match} uyumlu
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full min-w-[320px] text-left text-sm">
                        <thead>
                          <tr className="border-b border-zinc-700 text-zinc-400">
                            <th className="py-2 font-medium">Marka / Model</th>
                            <th className="py-2 font-medium text-right">Uyumluluk</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-zinc-700/50">
                            <td className="py-2 text-zinc-300">{entry.primaryBrand} {entry.primaryModel}</td>
                            <td className="py-2 text-right text-emerald-400">Orijinal</td>
                          </tr>
                          {entry.compatible.map((c) => (
                            <tr key={c.brand + c.model} className="border-b border-zinc-700/50">
                              <td className="py-2 text-zinc-300">{c.brand} {c.model}</td>
                              <td className="py-2 text-right">
                                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-medium text-emerald-400">%{c.match}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {!query.trim() && (
          <div className="mt-6 space-y-6">
            <div className="flex flex-col items-center gap-2 rounded-xl border border-zinc-700/50 bg-zinc-800/30 p-8 text-center">
              <Hash className="size-10 text-zinc-600" />
              <p className="text-sm text-zinc-500">
                Parça numarası veya adı yazın (örn. Yağ Filtresi, 06A115561B)
              </p>
            </div>
            <div className="rounded-xl border border-zinc-700 bg-zinc-800/50 p-4">
              <p className="mb-3 text-sm font-semibold text-zinc-300">Marka karşılaştırma (ortak parçalar)</p>
              <div className="space-y-3">
                {BRAND_PAIRS.map((pair) => (
                  <div key={pair.a + pair.b} className="rounded-lg border border-zinc-700/50 bg-zinc-900/50 p-3">
                    <p className="text-xs font-medium text-primary">{pair.a} ↔ {pair.b}</p>
                    <p className="mt-1 text-xs text-zinc-500">{pair.parts.join(", ")}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
