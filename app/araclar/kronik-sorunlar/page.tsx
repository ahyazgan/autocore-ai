"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Wrench, Info, ShieldCheck, Search } from "lucide-react";

const MARKALAR = [
  { id: "volkswagen", name: "Volkswagen", modeller: ["Golf", "Passat", "Polo"], motorler: ["1.4 TSI DSG", "1.0 TSI", "2.0 TDI"] },
  { id: "peugeot", name: "Peugeot", modeller: ["208", "308", "3008"], motorler: ["1.2 PureTech", "1.6 THP", "1.5 BlueHDi"] },
  { id: "honda", name: "Honda", modeller: ["Civic", "Jazz", "HR-V"], motorler: ["1.5 VTEC", "1.0 Turbo", "1.6 i-DTEC"] },
];

type MockRecord = {
  reliability: number;
  critical: string[];
  minor: string[];
  advice: string;
};

const MOCK_DATABASE: Record<string, MockRecord> = {
  "volkswagen-1.4 tsi dsg": {
    reliability: 6,
    critical: ["Kuru Kavrama Mekatronik Arızası (Isınma kaynaklı vites geçiş kayıpları)."],
    minor: ["Su Pompası (Devirdaim) Kaçağı."],
    advice: "DSG yağının 60.000 km'de değişimi şart. Mekatronik ünitesi aşırı ısınıyorsa revizyon veya yenisi düşünülmeli.",
  },
  "peugeot-1.2 puretech": {
    reliability: 5,
    critical: ["Yağ İçinde Çalışan Triger Kayışı Erimesi (Motor yeme riski)."],
    minor: ["Buji porseleni çatlaması."],
    advice: "Eğer bu aracı alacaksanız, triger kayışını 60.000 km'de bir mutlaka orijinaliyle değiştirin.",
  },
  "honda-1.5 vtec": {
    reliability: 8,
    critical: [],
    minor: ["Klima kompresörü gürültüsü (uzun vadede)."],
    advice: "Genel olarak dayanıklı bir motor. Düzenli yağ ve filtre bakımı yeterli.",
  },
};

function getMockData(marka: string, motor: string): MockRecord | null {
  const key = `${marka}-${motor.toLowerCase().trim()}`;
  if (MOCK_DATABASE[key]) return MOCK_DATABASE[key];
  const fallback = Object.keys(MOCK_DATABASE).find((k) => k.startsWith(marka + "-"));
  return fallback ? MOCK_DATABASE[fallback] : null;
}

export default function KronikSorunlarPage() {
  const [marka, setMarka] = useState("");
  const [model, setModel] = useState("");
  const [motor, setMotor] = useState("");
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<MockRecord | null>(null);

  const handleSearch = () => {
    const data = getMockData(marka, motor);
    setResult(data);
    setSearched(true);
  };

  const markaData = useMemo(() => MARKALAR.find((m) => m.id === marka), [marka]);
  const canSearch = marka && model && motor;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
          Kronik Sorun Dedektifi
        </h1>
        <p className="mt-2 text-zinc-400">
          Alacağınız arabanın sanayideki gizli sabıka kaydını öğrenin. DSG, PureTech, EDC dertlerine son.
        </p>
      </header>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-xl backdrop-blur sm:p-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-400">Marka Seçin</label>
            <select
              value={marka}
              onChange={(e) => {
                setMarka(e.target.value);
                setModel("");
                setMotor("");
              }}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="">Seçin</option>
              {MARKALAR.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-400">Model</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              disabled={!marka}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
            >
              <option value="">Seçin</option>
              {(markaData?.modeller ?? []).map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-400">Motor / Şanzıman</label>
            <select
              value={motor}
              onChange={(e) => setMotor(e.target.value)}
              disabled={!marka}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
            >
              <option value="">Seçin</option>
              {(markaData?.motorler ?? []).map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-6">
          <button
            type="button"
            onClick={handleSearch}
            disabled={!canSearch}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/80 py-3.5 font-semibold text-white shadow-lg shadow-primary/25 transition-opacity hover:opacity-95 disabled:opacity-50 sm:w-auto sm:px-8"
          >
            <Search className="size-5" />
            Sabıka Kaydını Sorgula
          </button>
        </div>
      </div>

      <AnimatePresence>
        {searched && result && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-xl sm:p-8"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-red-950/20 to-transparent pointer-events-none" />
            <div className="relative space-y-6">
              <div className="flex flex-col items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/50 py-6">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-100">
                  <ShieldCheck className="size-5 text-primary" />
                  Güvenilirlik Skoru
                </h2>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-zinc-50">{result.reliability}</span>
                  <span className="text-xl text-zinc-400">/10</span>
                </div>
                <div className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-zinc-700">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.reliability * 10}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      result.reliability >= 7 ? "bg-emerald-500" : result.reliability >= 5 ? "bg-amber-500" : "bg-red-500"
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-3">
                {result.critical.map((text, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="flex gap-3 rounded-xl border-2 border-red-500/50 bg-red-500/10 px-4 py-3"
                  >
                    <AlertTriangle className="size-5 shrink-0 text-red-400" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-red-400/90">Kritik Sorun</p>
                      <p className="mt-0.5 text-zinc-200">{text}</p>
                    </div>
                  </motion.div>
                ))}
                {result.minor.map((text, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="flex gap-3 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3"
                  >
                    <Wrench className="size-5 shrink-0 text-amber-400" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-amber-400/90">Hafif Sorun</p>
                      <p className="mt-0.5 text-zinc-200">{text}</p>
                    </div>
                  </motion.div>
                ))}
                {result.critical.length === 0 && result.minor.length === 0 && (
                  <p className="rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-zinc-400">
                    Bu kombinasyon için kayıtlı kronik sorun bulunmuyor.
                  </p>
                )}
              </div>

              {result.advice && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex gap-3 rounded-xl border border-primary/40 bg-primary/10 px-4 py-4"
                >
                  <Info className="size-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold text-zinc-100">Ustanın Tavsiyesi</p>
                    <p className="mt-1 text-sm text-zinc-300 leading-relaxed">{result.advice}</p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {searched && !result && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-zinc-500"
        >
          Bu marka/motor için henüz veri yok. Yakında eklenecek.
        </motion.p>
      )}
    </div>
  );
}
