"use client";

import { useState, useMemo } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

function lastikCapiHesapla(taban: number, yanak: number, jant: number): number {
  if (!taban || !yanak || !jant) return 0;
  const yanakYukseklikMm = taban * (yanak / 100);
  const capMm = yanakYukseklikMm * 2 + jant * 25.4;
  return capMm;
}

const UYUM_UST_SINIR = 3;

export default function LastikHesaplamaPage() {
  const [mevcut, setMevcut] = useState({ taban: "205", yanak: "55", jant: "16" });
  const [yeni, setYeni] = useState({ taban: "215", yanak: "55", jant: "16" });

  const mevcutCapi = useMemo(
    () =>
      lastikCapiHesapla(
        parseFloat(mevcut.taban) || 0,
        parseFloat(mevcut.yanak) || 0,
        parseFloat(mevcut.jant) || 0
      ),
    [mevcut]
  );
  const yeniCapi = useMemo(
    () =>
      lastikCapiHesapla(
        parseFloat(yeni.taban) || 0,
        parseFloat(yeni.yanak) || 0,
        parseFloat(yeni.jant) || 0
      ),
    [yeni]
  );

  const farkYuzde = useMemo(() => {
    if (mevcutCapi <= 0) return 0;
    return Math.abs(yeniCapi - mevcutCapi) / mevcutCapi * 100;
  }, [mevcutCapi, yeniCapi]);

  const uyumlu = mevcutCapi > 0 && yeniCapi > 0 && farkYuzde <= UYUM_UST_SINIR;
  const tehlikeli = mevcutCapi > 0 && yeniCapi > 0 && farkYuzde > UYUM_UST_SINIR;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
          Lastik Uyum Hesaplayıcı
        </h1>
        <p className="mt-2 text-zinc-400">
          Mevcut ve yeni lastik ölçülerini karşılaştırın. Çap farkı %3&apos;ten fazlaysa hız göstergesi hatalı olabilir.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-xl backdrop-blur">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">
            Mevcut Lastik
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs text-zinc-500">Taban Genişliği (mm)</label>
              <input
                type="number"
                min={125}
                max={355}
                value={mevcut.taban}
                onChange={(e) => setMevcut((p) => ({ ...p, taban: e.target.value }))}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-zinc-500">Yanak Oranı (%)</label>
              <input
                type="number"
                min={25}
                max={90}
                value={mevcut.yanak}
                onChange={(e) => setMevcut((p) => ({ ...p, yanak: e.target.value }))}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-zinc-500">Jant Çapı (inç)</label>
              <input
                type="number"
                min={12}
                max={24}
                value={mevcut.jant}
                onChange={(e) => setMevcut((p) => ({ ...p, jant: e.target.value }))}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            {mevcutCapi > 0 && (
              <p className="text-sm text-zinc-400">
                Tahmini çap: <span className="font-mono text-zinc-100">{mevcutCapi.toFixed(1)} mm</span>
              </p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-xl backdrop-blur">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">
            Yeni Lastik
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs text-zinc-500">Taban Genişliği (mm)</label>
              <input
                type="number"
                min={125}
                max={355}
                value={yeni.taban}
                onChange={(e) => setYeni((p) => ({ ...p, taban: e.target.value }))}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-zinc-500">Yanak Oranı (%)</label>
              <input
                type="number"
                min={25}
                max={90}
                value={yeni.yanak}
                onChange={(e) => setYeni((p) => ({ ...p, yanak: e.target.value }))}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-zinc-500">Jant Çapı (inç)</label>
              <input
                type="number"
                min={12}
                max={24}
                value={yeni.jant}
                onChange={(e) => setYeni((p) => ({ ...p, jant: e.target.value }))}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            {yeniCapi > 0 && (
              <p className="text-sm text-zinc-400">
                Tahmini çap: <span className="font-mono text-zinc-100">{yeniCapi.toFixed(1)} mm</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {mevcutCapi > 0 && yeniCapi > 0 && (
        <div
          className={`rounded-2xl border p-6 ${
            tehlikeli
              ? "border-red-500/50 bg-red-500/10"
              : "border-emerald-500/50 bg-emerald-500/10"
          }`}
        >
          <div className="flex items-start gap-4">
            {tehlikeli ? (
              <AlertTriangle className="size-8 shrink-0 text-red-400" />
            ) : (
              <CheckCircle2 className="size-8 shrink-0 text-emerald-400" />
            )}
            <div>
              <p className="font-semibold text-zinc-100">
                Çap farkı: %{farkYuzde.toFixed(2)}
              </p>
              {tehlikeli ? (
                <p className="mt-1 text-red-300">
                  Tehlikeli uyumsuzluk! Hız göstergeniz hatalı gösterecek.
                </p>
              ) : (
                <p className="mt-1 text-emerald-300">Uyumlu.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
