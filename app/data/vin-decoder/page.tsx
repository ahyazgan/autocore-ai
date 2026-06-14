"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Car,
  Calendar,
  MapPin,
  Fuel,
  LayoutGrid,
  Settings2,
  Building2,
  AlertCircle,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

const VIN_TOOLTIP =
  "Şase numarasını ön camın altından veya kapı direğinden bulabilirsiniz.";

const VIN_LENGTH = 17;
const VIN_REGEX = /^[A-HJ-NPR-Z0-9]{17}$/i;

const WMI_COUNTRY: Record<string, string> = {
  "1HG": "ABD", "1HV": "ABD", "2HG": "Kanada", "3VW": "Meksika", "9BW": "Brezilya",
  "WVW": "Almanya", "WBA": "Almanya", "WDB": "Almanya", "WDD": "Almanya",
  "VF1": "Fransa", "VF3": "Fransa", "ZFA": "İtalya", "JTD": "Japonya",
  "JHM": "Japonya", "JM1": "Japonya", "KM8": "Güney Kore", "LHG": "Çin",
  "LSV": "Çin", "TMB": "Çekya", "YS3": "İsveç", "SAL": "İngiltere",
};
const YEAR_CODES: Record<string, string> = {
  A: "2010", B: "2011", C: "2012", D: "2013", E: "2014", F: "2015", G: "2016",
  H: "2017", J: "2018", K: "2019", L: "2020", M: "2021", N: "2022", P: "2023", R: "2024", S: "2025",
};

function decodeVinLocal(raw: string): DecodedData {
  const wmi = raw.slice(0, 3);
  const yearChar = raw.charAt(9);
  const country = WMI_COUNTRY[wmi] ?? "Diğer";
  const year = YEAR_CODES[yearChar] ?? YEAR_CODES[yearChar.toUpperCase()] ?? "—";
  return {
    "Plant Country": country,
    "Model Year": year,
    "Make": wmi === "WVW" ? "Volkswagen" : wmi === "1HG" ? "Honda" : wmi === "JTD" ? "Toyota" : "—",
    "Model": "—",
    "Vehicle Type": "—",
    "Engine Code": raw.slice(7, 8) || "—",
    "Engine Number of Cylinders": "—",
    "Fuel Type - Primary": "—",
  } as DecodedData;
}

const FIELDS = [
  { key: "Make", label: "Marka", icon: Building2 },
  { key: "Model", label: "Model", icon: Car },
  { key: "Model Year", label: "Yıl", icon: Calendar },
  { key: "Vehicle Type", label: "Araç Tipi", icon: LayoutGrid },
  { key: "Plant Country", label: "Üretim Yeri", icon: MapPin },
  { key: "Engine Code", label: "Motor Tipi / Kod", icon: Settings2 },
  { key: "Engine Number of Cylinders", label: "Silindir Sayısı", icon: Settings2 },
  { key: "Fuel Type - Primary", label: "Yakıt Tipi", icon: Fuel },
] as const;

type DecodedData = Partial<Record<(typeof FIELDS)[number]["key"], string>>;

function parseNhtsaResults(results: Array<{ Variable: string; Value: string | null }>): DecodedData {
  const data: DecodedData = {};
  for (const item of results) {
    if (item.Variable && (item.Value ?? "").toString().trim()) {
      data[item.Variable as keyof DecodedData] = String(item.Value).trim();
    }
  }
  return data;
}

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
      <div className="flex items-center gap-3">
        <div className="size-10 animate-pulse rounded-lg bg-zinc-700" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-24 animate-pulse rounded bg-zinc-700" />
          <div className="h-5 w-32 animate-pulse rounded bg-zinc-700 [animation-delay:0.15s]" />
        </div>
      </div>
    </div>
  );
}

export default function VinDecoderPage() {
  const [vin, setVin] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DecodedData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const isValidVin = vin.length === VIN_LENGTH && VIN_REGEX.test(vin);

  const decode = useCallback(async () => {
    const raw = vin.trim().toUpperCase();
    if (raw.length !== VIN_LENGTH || !VIN_REGEX.test(raw)) {
      setError("Geçerli 17 karakterlik VIN girin (I, O, Q harfleri kullanılmaz).");
      setData(null);
      return;
    }

    setError(null);
    setData(null);
    setLoading(true);

    try {
      const res = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${raw}?format=json`
      );
      const json = await res.json();

      if (!res.ok || !json?.Results?.length) {
        setData(decodeVinLocal(raw));
        setError(null);
        return;
      }

      const decoded = parseNhtsaResults(json.Results);
      const hasMake = decoded["Make"];
      if (!hasMake) {
        setData(decodeVinLocal(raw));
        setError(null);
        return;
      }

      setData(decoded);
    } catch {
      setData(decodeVinLocal(raw));
      setError(null);
    } finally {
      setLoading(false);
    }
  }, [vin]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") decode();
    },
    [decode]
  );

  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 py-6">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
          Şase Sorgulama (VIN Decoder)
        </h1>
        <p className="mt-2 text-zinc-400">
          17 karakterlik VIN ile ülke (WMI), üretici, model yılı ve motor tipini öğrenin.
        </p>
      </header>

      {/* Search */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <label htmlFor="vin-input" className="text-sm font-medium text-zinc-400">
            17 haneli şase numarası
          </label>
          <div
            className="group relative inline-flex"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <Info className="size-4 text-zinc-500 hover:text-zinc-400 cursor-help" aria-hidden />
            {showTooltip && (
              <div className="absolute left-full top-1/2 z-10 ml-2 -translate-y-1/2 w-64 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-zinc-300 shadow-xl">
                {VIN_TOOLTIP}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          id="vin-input"
          type="text"
          value={vin}
          onChange={(e) => setVin(e.target.value.toUpperCase().slice(0, VIN_LENGTH))}
          onKeyDown={handleKeyDown}
          placeholder="17 haneli VIN (örn. 1HGCM82633A123456)"
          maxLength={VIN_LENGTH}
          className={cn(
            "h-14 flex-1 rounded-xl border bg-zinc-900 px-5 text-lg font-mono tracking-wider text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary",
            isValidVin ? "border-primary/50" : "border-zinc-700"
          )}
        />
        <button
          type="button"
          onClick={decode}
          disabled={loading || !vin.trim()}
          className="flex h-14 shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/80 px-8 font-semibold text-white shadow-lg shadow-primary/25 transition-opacity hover:opacity-95 disabled:opacity-50"
        >
          {loading ? (
            <span className="size-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <Search className="size-5" />
          )}
          Araç Çözümle
        </button>
      </div>
      </div>
      <p className="text-center text-sm text-zinc-500">
        {vin.length}/17 karakter · Sadece harf ve rakam (I, O, Q kullanılmaz)
      </p>

      {/* Results / Loading / Error */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {FIELDS.map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </motion.div>
        )}

        {error && !loading && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 py-16"
          >
            <div className="flex size-14 items-center justify-center rounded-full bg-amber-500/10">
              <AlertCircle className="size-7 text-amber-400" />
            </div>
            <p className="text-lg font-medium text-zinc-200">{error}</p>
            <p className="text-sm text-zinc-500">VIN'i kontrol edip tekrar deneyin.</p>
          </motion.div>
        )}

        {data && !loading && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border-2 border-zinc-700 bg-zinc-900/80 p-8 shadow-xl">
              <div className="mb-6 border-b border-zinc-700 pb-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Araç Tanımlama Sertifikası (Vehicle Identification Certificate)
                </p>
                <p className="mt-2 font-mono text-lg tracking-wider text-zinc-300">
                  {vin.trim().toUpperCase()}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {FIELDS.filter((f) => data[f.key] !== undefined && data[f.key] !== "").map(({ key, label, icon: Icon }) => (
                  <div
                    key={key}
                    className="flex items-start gap-4 rounded-xl border border-zinc-700/50 bg-zinc-800/30 p-4"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                        {label}
                      </p>
                      <p className="mt-1 font-medium text-zinc-100">
                        {data[key] ?? "—"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
