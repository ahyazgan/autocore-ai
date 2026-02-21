"use client";

import { useState, useMemo } from "react";
import { Receipt, Percent, Banknote } from "lucide-react";

const OTV_ORANLARI = [
  { label: "%45", value: 45 },
  { label: "%50", value: 50 },
  { label: "%80", value: 80 },
  { label: "%150", value: 150 },
  { label: "%220", value: 220 },
] as const;

const KDV_ORANI = 0.2;

function formatTL(n: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

export default function OtvHesaplamaPage() {
  const [vergisizFiyat, setVergisizFiyat] = useState("");
  const [otvOrani, setOtvOrani] = useState(45);

  const vergisiz = useMemo(() => parseFloat(vergisizFiyat.replace(/\s/g, "")) || 0, [vergisizFiyat]);

  const { otvTutari, kdvTutari, toplamFiyat } = useMemo(() => {
    const otv = vergisiz * (otvOrani / 100);
    const kdv = (vergisiz + otv) * KDV_ORANI;
    const toplam = vergisiz + otv + kdv;
    return { otvTutari: otv, kdvTutari: kdv, toplamFiyat: toplam };
  }, [vergisiz, otvOrani]);

  const hasResult = vergisiz > 0;

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
          ÖTV ve KDV Hesaplama
        </h1>
        <p className="mt-2 text-zinc-400">
          Vergisiz araç fiyatından toplam alış fiyatını TL cinsinden hesaplayın.
        </p>
      </header>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-xl backdrop-blur sm:p-8">
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-400">
              Vergisiz Araç Fiyatı (₺)
            </label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Örn: 500000"
              value={vergisizFiyat}
              onChange={(e) => setVergisizFiyat(e.target.value.replace(/[^\d\s]/g, ""))}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3.5 text-lg text-zinc-100 placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-400">
              ÖTV Dilimi
            </label>
            <div className="flex flex-wrap gap-2">
              {OTV_ORANLARI.map(({ label, value }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setOtvOrani(value)}
                  className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                    otvOrani === value
                      ? "border-primary bg-primary/20 text-primary"
                      : "border-zinc-700 bg-zinc-800/80 text-zinc-300 hover:border-zinc-600"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {hasResult && (
          <div className="mt-8 rounded-xl border border-primary/30 bg-primary/5 p-6">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-zinc-400">
              <Receipt className="size-4" />
              Özet
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between text-zinc-300">
                <span>Vergisiz Fiyat</span>
                <span className="font-mono">{formatTL(vergisiz)}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span className="flex items-center gap-1.5">
                  <Percent className="size-4" />
                  ÖTV Tutarı (%{otvOrani})
                </span>
                <span className="font-mono text-primary">{formatTL(otvTutari)}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span className="flex items-center gap-1.5">
                  <Percent className="size-4" />
                  KDV Tutarı (%20)
                </span>
                <span className="font-mono text-primary">{formatTL(kdvTutari)}</span>
              </div>
              <div className="border-t border-zinc-700 pt-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-medium text-zinc-100">
                    <Banknote className="size-5" />
                    Toplam Fiyat
                  </span>
                  <span className="text-2xl font-bold text-zinc-50">
                    {formatTL(toplamFiyat)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
