"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Wrench, AlertTriangle, ShieldCheck } from "lucide-react";

type ObdRecord = {
  code: string;
  part: string;
  description: string;
  costMin: number;
  costMax: number;
  safeToDrive: boolean;
};

const OBD_MAP: Record<string, ObdRecord> = {
  P0420: {
    code: "P0420",
    part: "Katalitik konvertör",
    description: "Katalizör verimliliği eşiğin altında (Bank 1).",
    costMin: 8000,
    costMax: 25000,
    safeToDrive: true,
  },
  P0430: {
    code: "P0430",
    part: "Katalitik konvertör",
    description: "Katalizör verimliliği eşiğin altında (Bank 2).",
    costMin: 8000,
    costMax: 25000,
    safeToDrive: true,
  },
  P0300: {
    code: "P0300",
    part: "Ateşleme / Enjeksiyon",
    description: "Rastgele / çoklu silindir ateşleme atlaması.",
    costMin: 500,
    costMax: 8000,
    safeToDrive: false,
  },
  P0301: { code: "P0301", part: "Buji / Bobin", description: "1. silindir ateşleme atlaması.", costMin: 200, costMax: 1500, safeToDrive: false },
  P0302: { code: "P0302", part: "Buji / Bobin", description: "2. silindir ateşleme atlaması.", costMin: 200, costMax: 1500, safeToDrive: false },
  P0303: { code: "P0303", part: "Buji / Bobin", description: "3. silindir ateşleme atlaması.", costMin: 200, costMax: 1500, safeToDrive: false },
  P0304: { code: "P0304", part: "Buji / Bobin", description: "4. silindir ateşleme atlaması.", costMin: 200, costMax: 1500, safeToDrive: false },
  P0171: {
    code: "P0171",
    part: "Lambda / Hava debi metre",
    description: "Sistem çok fakir (Bank 1) — hava/yakıt oranı.",
    costMin: 800,
    costMax: 5000,
    safeToDrive: true,
  },
  P0174: {
    code: "P0174",
    part: "Lambda / Hava debi metre",
    description: "Sistem çok fakir (Bank 2).",
    costMin: 800,
    costMax: 5000,
    safeToDrive: true,
  },
  P0172: { code: "P0172", part: "Lambda sensörü", description: "Sistem çok zengin (Bank 1).", costMin: 600, costMax: 4000, safeToDrive: true },
  P0128: {
    code: "P0128",
    part: "Termostat / Soğutma",
    description: "Motor soğutma sıvısı sıcaklığı hedefe ulaşmıyor.",
    costMin: 400,
    costMax: 2000,
    safeToDrive: true,
  },
  P0455: {
    code: "P0455",
    part: "Yakıt deposu buhar sistemi",
    description: "Büyük sızıntı tespit edildi (genelde benzin kapağı).",
    costMin: 50,
    costMax: 500,
    safeToDrive: true,
  },
  P0442: {
    code: "P0442",
    part: "Yakıt deposu buhar sistemi",
    description: "Küçük sızıntı tespit edildi.",
    costMin: 200,
    costMax: 1500,
    safeToDrive: true,
  },
  P0507: {
    code: "P0507",
    part: "Rölanti valfi / Hava by-pass",
    description: "Rölanti devri yüksek.",
    costMin: 300,
    costMax: 2500,
    safeToDrive: true,
  },
  P0340: {
    code: "P0340",
    part: "Eksantrik mili konum sensörü",
    description: "Eksantrik mili konum sensörü arızası.",
    costMin: 500,
    costMax: 3500,
    safeToDrive: false,
  },
  P0335: {
    code: "P0335",
    part: "Krank mili konum sensörü",
    description: "Krank mili konum sensörü devre arızası.",
    costMin: 400,
    costMax: 3000,
    safeToDrive: false,
  },
  P0118: {
    code: "P0118",
    part: "Soğutma sıvısı sıcaklık sensörü",
    description: "Motor soğutma sıvısı sıcaklık devresi yüksek voltaj.",
    costMin: 300,
    costMax: 2000,
    safeToDrive: true,
  },
  P0700: {
    code: "P0700",
    part: "Şanzıman kontrol ünitesi",
    description: "TCM arıza kodu (şanzıman ile ilgili).",
    costMin: 1000,
    costMax: 15000,
    safeToDrive: true,
  },
  P0753: {
    code: "P0753",
    part: "Vites kilit solenoiti",
    description: "1-2 vites kilit solenoiti elektrik arızası.",
    costMin: 800,
    costMax: 6000,
    safeToDrive: true,
  },
  P0715: {
    code: "P0715",
    part: "Türbin devri sensörü",
    description: "Giriş türbin devri sensörü devresi.",
    costMin: 600,
    costMax: 5000,
    safeToDrive: true,
  },
  P0401: {
    code: "P0401",
    part: "EGR valfi",
    description: "EGR sistemi yetersiz akış.",
    costMin: 500,
    costMax: 4000,
    safeToDrive: true,
  },
  P0402: { code: "P0402", part: "EGR valfi", description: "EGR aşırı akış.", costMin: 500, costMax: 4000, safeToDrive: true },
  P0101: {
    code: "P0101",
    part: "Hava debi metre (MAF)",
    description: "MAF devre aralığı / performans.",
    costMin: 600,
    costMax: 4500,
    safeToDrive: true,
  },
  P0102: { code: "P0102", part: "Hava debi metre", description: "MAF devre düşük giriş.", costMin: 600, costMax: 4500, safeToDrive: true },
  P0113: { code: "P0113", part: "Hava giriş sıcaklık sensörü", description: "IAT devre yüksek giriş.", costMin: 200, costMax: 1200, safeToDrive: true },
  P0120: {
    code: "P0120",
    part: "Gaz kelebeği konum sensörü",
    description: "Gaz kelebeği konum sensörü devresi.",
    costMin: 400,
    costMax: 3000,
    safeToDrive: true,
  },
  P0130: { code: "P0130", part: "Lambda (O2) sensörü", description: "Bank 1 Sensör 1 lambda devre arızası.", costMin: 500, costMax: 3500, safeToDrive: true },
  P0131: { code: "P0131", part: "Lambda sensörü", description: "Bank 1 Sensör 1 düşük voltaj.", costMin: 500, costMax: 3500, safeToDrive: true },
  P0132: { code: "P0132", part: "Lambda sensörü", description: "Bank 1 Sensör 1 yüksek voltaj.", costMin: 500, costMax: 3500, safeToDrive: true },
  P0133: { code: "P0133", part: "Lambda sensörü", description: "Bank 1 Sensör 1 yavaş tepki.", costMin: 500, costMax: 3500, safeToDrive: true },
  P0140: { code: "P0140", part: "Lambda sensörü", description: "Bank 1 Sensör 2 devre arızası.", costMin: 500, costMax: 3500, safeToDrive: true },
  P0150: { code: "P0150", part: "Lambda sensörü", description: "Bank 2 Sensör 1 devre arızası.", costMin: 500, costMax: 3500, safeToDrive: true },
  P0201: { code: "P0201", part: "Enjektör devresi", description: "Silindir 1 enjektör devresi.", costMin: 300, costMax: 2500, safeToDrive: false },
  P0202: { code: "P0202", part: "Enjektör devresi", description: "Silindir 2 enjektör devresi.", costMin: 300, costMax: 2500, safeToDrive: false },
  P0203: { code: "P0203", part: "Enjektör devresi", description: "Silindir 3 enjektör devresi.", costMin: 300, costMax: 2500, safeToDrive: false },
  P0204: { code: "P0204", part: "Enjektör devresi", description: "Silindir 4 enjektör devresi.", costMin: 300, costMax: 2500, safeToDrive: false },
  P0218: { code: "P0218", part: "Şanzıman", description: "Şanzıman aşırı ısınma.", costMin: 0, costMax: 5000, safeToDrive: false },
  P0325: { code: "P0325", part: "Detonasyon sensörü", description: "Detonasyon sensörü devresi (Bank 1).", costMin: 400, costMax: 3000, safeToDrive: true },
  P0330: { code: "P0330", part: "Detonasyon sensörü", description: "Detonasyon sensörü devresi (Bank 2).", costMin: 400, costMax: 3000, safeToDrive: true },
  P0351: { code: "P0351", part: "Bobin", description: "Ateşleme bobini A birincil/devre arızası.", costMin: 250, costMax: 2000, safeToDrive: false },
  P0352: { code: "P0352", part: "Bobin", description: "Ateşleme bobini B birincil/devre arızası.", costMin: 250, costMax: 2000, safeToDrive: false },
  P0440: { code: "P0440", part: "EVAP sistemi", description: "Buhar kurtarma sistemi arızası.", costMin: 300, costMax: 2500, safeToDrive: true },
  P0456: { code: "P0456", part: "EVAP sistemi", description: "Çok küçük sızıntı tespit edildi.", costMin: 200, costMax: 2000, safeToDrive: true },
  P0500: { code: "P0500", part: "Tekerlek hız sensörü", description: "Araç hız sensörü arızası.", costMin: 400, costMax: 3500, safeToDrive: true },
  P0562: { code: "P0562", part: "Elektrik sistemi", description: "Sistem voltajı düşük.", costMin: 0, costMax: 3000, safeToDrive: true },
  P0563: { code: "P0563", part: "Elektrik sistemi", description: "Sistem voltajı yüksek.", costMin: 0, costMax: 3000, safeToDrive: true },
  P0571: { code: "P0571", part: "Fren anahtarı", description: "Fren anahtarı devre arızası.", costMin: 200, costMax: 1500, safeToDrive: true },
  P0606: { code: "P0606", part: "ECU", description: "ECU işlemci arızası.", costMin: 3000, costMax: 15000, safeToDrive: false },
  P0610: { code: "P0610", part: "Araç seçenekleri", description: "Araç seçenekleri modülü arızası.", costMin: 500, costMax: 5000, safeToDrive: true },
  P0620: { code: "P0620", part: "Alternatör", description: "Alternatör kontrol devresi arızası.", costMin: 800, costMax: 6000, safeToDrive: false },
  P0700: { code: "P0700", part: "Şanzıman", description: "TCM arıza kodu bildirildi.", costMin: 1000, costMax: 15000, safeToDrive: true },
  P0720: { code: "P0720", part: "Çıkış mili hız sensörü", description: "Çıkış mili hız sensörü devresi.", costMin: 400, costMax: 4000, safeToDrive: true },
  P0740: { code: "P0740", part: "Tork dönüştürücü kavrama", description: "Tork dönüştürücü kavrama solenoid arızası.", costMin: 1500, costMax: 12000, safeToDrive: true },
  P0841: { code: "P0841", part: "Hidrolik basınç sensörü", description: "Şanzıman sıvı basıncı sensörü A devre arızası.", costMin: 500, costMax: 5000, safeToDrive: true },
  P2100: { code: "P2100", part: "Gaz kelebeği aktüatörü", description: "Gaz kelebeği motor devre arızası.", costMin: 800, costMax: 6000, safeToDrive: false },
  P2122: { code: "P2122", part: "Gaz pedalı konum sensörü", description: "Gaz pedalı konum sensörü düşük giriş.", costMin: 400, costMax: 3500, safeToDrive: true },
  P2181: { code: "P2181", part: "Soğutma sistemi", description: "Motor soğutma sıvısı sıcaklığı çok yüksek.", costMin: 300, costMax: 2500, safeToDrive: false },
};

function normalizeCode(input: string): string {
  const upper = input.trim().toUpperCase().replace(/\s/g, "");
  if (/^P\d{4}$/.test(upper)) return upper;
  if (/^\d{4}$/.test(upper)) return "P" + upper;
  return upper;
}

export default function ObdKodlariPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<ObdRecord | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    const code = normalizeCode(query);
    const record = OBD_MAP[code] ?? null;
    setResult(record);
    setSearched(true);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
          OBD Arıza Kodları
        </h1>
        <p className="mt-2 text-zinc-400">
          OBD-II arıza kodunu girin (örn. P0420, P0300); hangi parça arızalı, tahmini maliyet ve sürüş güvenliği bilgisini görün.
        </p>
      </header>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Örn. P0420, P0300"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 py-3 pl-10 pr-4 text-zinc-100 placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <button
            type="button"
            onClick={handleSearch}
            className="rounded-xl bg-primary px-6 py-3 font-medium text-white transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            Sorgula
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {searched && (
          <motion.div
            key={result ? result.code : "empty"}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6 shadow-xl"
          >
            {result ? (
              <>
                <div className="flex items-center gap-3">
                  <span className="rounded-lg bg-zinc-800 px-3 py-1.5 font-mono text-lg font-semibold text-primary">
                    {result.code}
                  </span>
                  <h2 className="text-xl font-semibold text-zinc-50">
                    Hangi parça arızalı?
                  </h2>
                </div>
                <p className="mt-2 text-zinc-300">{result.part}</p>
                <p className="mt-2 text-sm text-zinc-400">{result.description}</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-800/50 p-4">
                    <Wrench className="size-5 text-zinc-400" />
                    <div>
                      <p className="text-sm text-zinc-400">
                        Olası tamir maliyeti (tahmini)
                      </p>
                      <p className="text-lg font-semibold text-zinc-100">
                        {result.costMin.toLocaleString("tr-TR")} –{" "}
                        {result.costMax.toLocaleString("tr-TR")} ₺
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-800/50 p-4">
                    {result.safeToDrive ? (
                      <ShieldCheck className="size-5 text-emerald-500" />
                    ) : (
                      <AlertTriangle className="size-5 text-amber-500" />
                    )}
                    <div>
                      <p className="text-sm text-zinc-400">Sürüş güvenli mi?</p>
                      <p
                        className={`text-lg font-semibold ${result.safeToDrive ? "text-emerald-400" : "text-amber-400"}`}
                      >
                        {result.safeToDrive
                          ? "Kısa mesafe gidebilirsiniz; servise gidin."
                          : "Mümkünse sürmeden servise çekin."}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 py-4 text-center">
                <p className="text-zinc-400">
                  &ldquo;{query.trim() || "(boş)"}&rdquo; için kayıt bulunamadı.
                </p>
                <p className="text-sm text-zinc-500">
                  Kodu tam yazın (örn. P0420). Listede en sık görülen 50+ kod yer alıyor.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
