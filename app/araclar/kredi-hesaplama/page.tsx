"use client";

import { useState, useMemo } from "react";
import { Banknote, TrendingUp } from "lucide-react";

const VADE_MIN = 12;
const VADE_MAX = 48;

function formatTL(n: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

export default function KrediHesaplamaPage() {
  const [krediTutari, setKrediTutari] = useState("");
  const [vade, setVade] = useState(36);
  const [faizOrani, setFaizOrani] = useState("");

  const tutar = useMemo(() => parseFloat(krediTutari.replace(/\s/g, "")) || 0, [krediTutari]);
  const aylikFaiz = useMemo(() => parseFloat(faizOrani.replace(",", ".")) || 0, [faizOrani]);

  const { aylikTaksit, toplamGeriOdeme, toplamFaiz } = useMemo(() => {
    if (tutar <= 0 || vade < 1) return { aylikTaksit: 0, toplamGeriOdeme: 0, toplamFaiz: 0 };
    const r = aylikFaiz / 100;
    let aylik = 0;
    if (Math.abs(r) < 1e-10) {
      aylik = tutar / vade;
    } else {
      aylik = tutar * (r * Math.pow(1 + r, vade)) / (Math.pow(1 + r, vade) - 1);
    }
    const toplam = aylik * vade;
    const faiz = toplam - tutar;
    return { aylikTaksit: aylik, toplamGeriOdeme: toplam, toplamFaiz: faiz };
  }, [tutar, vade, aylikFaiz]);

  const hasResult = tutar > 0 && vade >= 1;

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
          Taşıt Kredisi Hesaplama
        </h1>
        <p className="mt-2 text-zinc-400">
          Kredi tutarı, vade ve faiz oranına göre aylık taksit ve toplam geri ödemeyi hesaplayın.
        </p>
      </header>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-xl backdrop-blur sm:p-8">
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-400">
              Kredi Tutarı (₺)
            </label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Örn: 500000"
              value={krediTutari}
              onChange={(e) => setKrediTutari(e.target.value.replace(/[^\d\s]/g, ""))}
              className="min-h-[44px] w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3.5 text-lg text-zinc-100 placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="touch-friendly">
            <label className="mb-2 block text-sm font-medium text-zinc-400">
              Vade (Ay) — {vade} ay
            </label>
            <input
              type="range"
              min={VADE_MIN}
              max={VADE_MAX}
              value={vade}
              onChange={(e) => setVade(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="mt-1 flex justify-between text-xs text-zinc-500">
              <span>{VADE_MIN} ay</span>
              <span>{VADE_MAX} ay</span>
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-400">
              Aylık Faiz Oranı (%)
            </label>
            <input
              type="text"
              inputMode="decimal"
              placeholder="Örn: 2,5"
              value={faizOrani}
              onChange={(e) => setFaizOrani(e.target.value.replace(/[^\d,.]/g, ""))}
              className="min-h-[44px] w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3.5 text-lg text-zinc-100 placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        {hasResult && (
          <div className="mt-8 space-y-6 rounded-xl border border-primary/30 bg-primary/5 p-6">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-zinc-400">
                Aylık Taksit
              </p>
              <p className="mt-1 text-4xl font-bold text-zinc-50 sm:text-5xl">
                {formatTL(aylikTaksit)}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-4">
                <Banknote className="size-8 shrink-0 text-primary" />
                <div>
                  <p className="text-xs text-zinc-500">Toplam Geri Ödeme</p>
                  <p className="text-xl font-semibold text-zinc-100">
                    {formatTL(toplamGeriOdeme)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-4">
                <TrendingUp className="size-8 shrink-0 text-amber-400" />
                <div>
                  <p className="text-xs text-zinc-500">Toplam Faiz</p>
                  <p className="text-xl font-semibold text-zinc-100">
                    {formatTL(toplamFaiz)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
