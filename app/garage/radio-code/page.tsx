"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, AlertTriangle, CheckCircle, Info, ChevronDown } from "lucide-react";

const BRANDS = [
  { value: "renault", label: "Renault" },
  { value: "vw", label: "Volkswagen / Seat / Skoda / Audi" },
  { value: "ford", label: "Ford" },
  { value: "opel", label: "Opel" },
  { value: "other", label: "Diğer Markalar" },
];

function calcRenaultCode(serial: string): string | null {
  // Renault radyo kodu hesaplama (TechniSat / Bosch tabanlı modeller)
  // Seri numarası son 4 hanesi kullanılarak hesaplanır
  const digits = serial.replace(/\D/g, "");
  if (digits.length < 4) return null;
  const last4 = digits.slice(-4);
  const d = last4.split("").map(Number);
  const a = (d[0] + d[2]) % 10;
  const b = (d[1] + d[3]) % 10;
  const c = (d[0] * d[1] + d[2]) % 10;
  const e = (d[1] + d[2] + d[3]) % 10;
  return `${a}${b}${c}${e}`;
}

const BRAND_INFO: Record<string, { title: string; desc: string; docs: string[] }> = {
  vw: {
    title: "Volkswagen / Seat / Skoda / Audi",
    desc: "VW grubu araçlarında radyo kodu için aracın VIN numarası ve radyo seri numarası ile yetkili Volkswagen / Audi / Seat / Skoda servisine başvurmanız gerekmektedir.",
    docs: ["Araç ruhsatı", "Kimlik kartı (araç sahibi)", "Radyo seri numarası (konsoldan veya radyo çıkarılarak arkadan)"],
  },
  ford: {
    title: "Ford",
    desc: "Ford araçlarda radyo kodu için Ford yetkili servisine veya Ford Türkiye müşteri hizmetlerine başvurabilirsiniz.",
    docs: ["Araç ruhsatı", "Kimlik", "Radyo model ve seri numarası", "VIN numarası"],
  },
  opel: {
    title: "Opel",
    desc: "Opel araçlarda radyo kodu yetkili Opel servisinden alınabilir. Bazı modellerde sigortayı çıkarıp takmak radyoyu sıfırlar.",
    docs: ["Araç ruhsatı", "Kimlik kartı", "Radyo seri numarası"],
  },
  other: {
    title: "Diğer Markalar",
    desc: "Diğer marka araçlarda radyo kodu için aracınızın yetkili servisine veya üretici müşteri hizmetlerine başvurmanız gerekir. Bazı Online platformlar da ücretli kod sorgulaması yapabilir.",
    docs: ["Araç ruhsatı ve tescil belgesi", "Kimlik kartı", "Radyo seri numarası", "VIN (şase) numarası"],
  },
};

export default function RadioCodePage() {
  const [brand, setBrand] = useState("renault");
  const [serial, setSerial] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalc = () => {
    setError(null);
    setResult(null);
    if (brand !== "renault") return;
    const code = calcRenaultCode(serial);
    if (!code) {
      setError("Geçersiz seri numarası. En az 4 rakam içermelidir.");
      return;
    }
    setResult(code);
  };

  const brandInfo = BRAND_INFO[brand];

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-50">Radyo Kodu Bulucu</h1>
        <p className="mt-1 text-sm text-zinc-400">Araç radyo kilidini çözmek için marka seçin</p>
      </div>

      {/* Uyarı */}
      <div className="flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4">
        <AlertTriangle className="size-5 shrink-0 text-amber-400 mt-0.5" />
        <p className="text-sm text-amber-200">
          Bu araç yalnızca kendi aracınız için kullanılmak üzere tasarlanmıştır. Başkasına ait araçlarda kullanmak yasaldışıdır.
        </p>
      </div>

      {/* Marka Seçimi */}
      <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 p-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">Araç Markası</label>
          <div className="relative">
            <select
              value={brand}
              onChange={(e) => { setBrand(e.target.value); setResult(null); setError(null); }}
              className="w-full appearance-none rounded-xl border border-zinc-600 bg-zinc-900 px-4 py-3 text-zinc-50 outline-none focus:border-blue-500"
            >
              {BRANDS.map((b) => (
                <option key={b.value} value={b.value}>{b.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500 pointer-events-none" />
          </div>
        </div>

        {/* Renault hesaplama */}
        {brand === "renault" && (
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Radyo Seri Numarası
              </label>
              <input
                type="text"
                value={serial}
                onChange={(e) => { setSerial(e.target.value.toUpperCase()); setResult(null); setError(null); }}
                placeholder="Örn: BM8T18C815AA veya 12345678"
                className="w-full rounded-xl border border-zinc-600 bg-zinc-900 px-4 py-3 text-zinc-50 outline-none focus:border-blue-500 placeholder:text-zinc-600 font-mono"
              />
              <p className="mt-1.5 text-xs text-zinc-500">
                Seri numarası radyonun arkasında veya konsolun üzerinde yer alır. Radyoyu çıkarmak için ince bir çubuk veya tel kullanabilirsiniz.
              </p>
            </div>
            <button
              onClick={handleCalc}
              disabled={serial.length < 4}
              className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Kodu Hesapla
            </button>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 text-center"
                >
                  <CheckCircle className="mx-auto size-6 text-emerald-400 mb-2" />
                  <p className="text-sm text-zinc-400 mb-2">Hesaplanan Radyo Kodu</p>
                  <p className="text-4xl font-bold tracking-widest text-emerald-300">{result}</p>
                  <p className="mt-3 text-xs text-zinc-500">
                    Radyonuzu açın, kilit ekranında bu 4 haneli kodu girin.
                  </p>
                </motion.div>
              )}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-red-500/30 bg-red-500/5 p-4 text-center"
                >
                  <p className="text-sm text-red-400">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Diğer markalar için bilgi */}
        {brand !== "renault" && brandInfo && (
          <motion.div
            key={brand}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-5">
              <div className="flex items-start gap-3">
                <Info className="size-5 shrink-0 text-blue-400 mt-0.5" />
                <div>
                  <p className="font-medium text-zinc-200 mb-1">{brandInfo.title}</p>
                  <p className="text-sm text-zinc-400">{brandInfo.desc}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-5">
              <p className="text-sm font-medium text-zinc-300 mb-3">Gerekli Belgeler</p>
              <ul className="space-y-2">
                {brandInfo.docs.map((doc, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-zinc-400">
                    <CheckCircle className="size-4 shrink-0 text-emerald-500" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </div>

      {/* Genel Bilgi */}
      <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 p-5">
        <p className="text-sm font-medium text-zinc-300 mb-3 flex items-center gap-2">
          <Radio className="size-4" />
          Radyo Kodu Nedir?
        </p>
        <p className="text-sm text-zinc-400">
          Araç radyoları çalınmaya karşı koruma için koda sahiptir. Akü bağlantısı kesildiğinde radyo kilitlenir ve
          yeniden açmak için 4 haneli güvenlik kodu girilmesi gerekir. Bu kod genellikle aracın servis belgeleri
          veya ruhsat dosyasında bulunur.
        </p>
      </div>
    </div>
  );
}
