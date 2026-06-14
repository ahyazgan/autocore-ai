"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, AlertTriangle, CheckCircle, Info, Code } from "lucide-react";

interface OBDCode {
  code: string;
  description: string;
  system: string;
  severity: "critical" | "warning" | "info";
  causes: string[];
  action: string;
}

const OBD_DATABASE: OBDCode[] = [
  { code: "P0100", description: "Hava Akış Sensörü (MAF) Devre Arızası", system: "Yakıt / Hava", severity: "warning", causes: ["Kirli veya arızalı MAF sensörü", "Hava filtresi tıkalı", "Hava sızıntısı"], action: "MAF sensörünü temizleyin veya değiştirin. Hava filtresini kontrol edin." },
  { code: "P0128", description: "Soğutucu Sıcaklığı Termostat Eşiği Altında", system: "Soğutma", severity: "warning", causes: ["Termostat arızalı veya açık kalmış", "Soğutucu sıcaklık sensörü arızası"], action: "Termostatı değiştirin." },
  { code: "P0171", description: "Yakıt Karışımı Zayıf (Banka 1)", system: "Yakıt Sistemi", severity: "warning", causes: ["Hava sızıntısı", "Kirli yakıt enjektörleri", "MAF sensörü kirli", "Düşük yakıt basıncı"], action: "Hava sızıntısı kontrol edin, enjektörleri temizleyin." },
  { code: "P0172", description: "Yakıt Karışımı Zengin (Banka 1)", system: "Yakıt Sistemi", severity: "warning", causes: ["Kirli hava filtresi", "Aşırı yakıt enjeksiyonu", "Oksijen sensörü arızası"], action: "Hava filtresini değiştirin, yakıt sistemini kontrol edin." },
  { code: "P0174", description: "Yakıt Karışımı Zayıf (Banka 2)", system: "Yakıt Sistemi", severity: "warning", causes: ["Hava sızıntısı banka 2 tarafında", "Kirli enjektörler"], action: "Hava sızıntısı kontrol edin." },
  { code: "P0300", description: "Rastgele / Çoklu Silindir Ateşleme Kaçağı", system: "Ateşleme", severity: "critical", causes: ["Bujiler aşınmış", "Ateşleme bobini arızalı", "Yakıt enjektörü sorunlu", "Düşük sıkıştırma"], action: "Bujileri ve ateşleme bobinlerini kontrol edin. Hızla servise gidin." },
  { code: "P0301", description: "1. Silindir Ateşleme Kaçağı", system: "Ateşleme", severity: "critical", causes: ["Boji arızalı", "Ateşleme bobini", "Enjektör tıkalı"], action: "1. silindirin buji ve bobinini değiştirin." },
  { code: "P0302", description: "2. Silindir Ateşleme Kaçağı", system: "Ateşleme", severity: "critical", causes: ["2. silindir bujisi veya bobini arızalı"], action: "2. silindirin buji ve bobinini kontrol edin." },
  { code: "P0400", description: "EGR Akışı Yetersiz", system: "Emisyon", severity: "warning", causes: ["EGR vanası tıkalı veya arızalı", "EGR hortumları tıkalı"], action: "EGR vanasını temizleyin veya değiştirin." },
  { code: "P0420", description: "Katalitik Konvertör Verimliliği Düşük (Banka 1)", system: "Emisyon", severity: "warning", causes: ["Kataliz konvertör eskimiş", "Oksijen sensörü arızası", "Motor yağı veya soğutucu kaçağı"], action: "Oksijen sensörlerini kontrol edin. Kataliz konvertörü değiştirmeniz gerekebilir." },
  { code: "P0430", description: "Katalitik Konvertör Verimliliği Düşük (Banka 2)", system: "Emisyon", severity: "warning", causes: ["Kataliz konvertör yıpranmış (banka 2)"], action: "Kataliz konvertörü ve oksijen sensörlerini kontrol edin." },
  { code: "P0440", description: "Yakıt Buharlaşma Sistemi (EVAP) Arızası", system: "Emisyon", severity: "info", causes: ["Gevşek veya hasarlı yakıt deposu kapağı", "EVAP hortum sızıntısı", "Karbür kapı arızası"], action: "Yakıt deposu kapağını sıkın. Sorun devam ederse EVAP sistemini kontrol ettirin." },
  { code: "P0442", description: "EVAP Sistemi Küçük Kaçak Tespit Edildi", system: "Emisyon", severity: "info", causes: ["Yakıt deposu kapağı sızdırmıyor", "Küçük hortum çatlağı"], action: "Yakıt kapağını değiştirin. Sorun devam ederse EVAP test yaptırın." },
  { code: "P0455", description: "EVAP Sistemi Büyük Kaçak Tespit Edildi", system: "Emisyon", severity: "warning", causes: ["Yakıt deposu kapağı takılı değil veya hasarlı", "Büyük hortum kaçağı"], action: "Yakıt kapağını kontrol edin ve sıkın. Sorun devam ederse servise gidin." },
  { code: "P0500", description: "Araç Hız Sensörü (VSS) Arızası", system: "Hız", severity: "warning", causes: ["VSS sensörü arızalı", "Kablo hasarı", "ABS modülü sorunu"], action: "VSS sensörünü kontrol edin veya değiştirin." },
  { code: "P0505", description: "Rölanti Kontrol Sistemi Arızası", system: "Motor", severity: "warning", causes: ["Rölanti hava kontrol vanası kirli veya arızalı", "Hava sızıntısı", "Gaz kelebek sorunlu"], action: "Rölanti kontrol vanasını temizleyin veya değiştirin." },
  { code: "P0700", description: "Şanzıman Kontrol Sistemi Arızası", system: "Şanzıman", severity: "warning", causes: ["Şanzıman elektroniği sorunu", "Sensör arızası", "Düşük şanzıman yağı"], action: "Şanzıman yağını kontrol edin. Şanzıman OBD koduyla detaylı tarama yapın." },
  { code: "P0715", description: "Giriş / Türbin Hız Sensörü Devresi Arızası", system: "Şanzıman", severity: "warning", causes: ["Şanzıman giriş hız sensörü arızası"], action: "Sensörü kontrol edin ve değiştirin." },
  { code: "P0730", description: "Hatalı Vites Oranı", system: "Şanzıman", severity: "warning", causes: ["Şanzıman mekanik sorunu", "Düşük şanzıman yağı", "Valf gövdesi arızası"], action: "Şanzıman yağını kontrol edin. Servise gidin." },
  { code: "P1000", description: "OBD Sistem Hazır Taraması Tamamlanmadı", system: "Genel", severity: "info", causes: ["Araç son zamanlarda OBD sıfırlandı", "Yeterli sürüş döngüsü yapılmadı"], action: "50-100 km normal sürüş yapın, sistem kendiliğinden hazır olacaktır." },
  { code: "C0035", description: "Sol Ön Tekerlek Hız Sensörü Devresi Arızası", system: "ABS / Fren", severity: "warning", causes: ["Tekerlek hız sensörü arızalı", "Kablo hasarı", "Kirli sensör"], action: "ABS sensörünü temizleyin veya değiştirin." },
  { code: "C0040", description: "Sağ Ön Tekerlek Hız Sensörü Devresi Arızası", system: "ABS / Fren", severity: "warning", causes: ["Sağ ön ABS sensörü arızalı"], action: "Sağ ön ABS sensörünü kontrol edin." },
  { code: "B0001", description: "Sürücü Airbag Devre Direnci Düşük", system: "Airbag / SRS", severity: "critical", causes: ["Airbag spiral kablo sorunu", "Airbag modülü arızası"], action: "SRS sistemini yetkili serviste kontrol ettirin." },
  { code: "U0100", description: "Motor Kontrol Modülü (ECM/PCM) ile İletişim Yok", system: "Can-Bus", severity: "critical", causes: ["ECM arızası", "CAN bus kablo sorunu", "Sigorta arızası"], action: "Tüm sigortaları kontrol edin. Yetkili servise gidin." },
  { code: "U0155", description: "Gösterge Paneli (IC) ile İletişim Yok", system: "Can-Bus", severity: "warning", causes: ["Gösterge paneli arızası", "CAN bus sorunu"], action: "Servise gidin, CAN bus taraması yapılmalı." },
  { code: "P0606", description: "ECM / PCM İşlemci Arızası", system: "Elektronik", severity: "critical", causes: ["ECM/PCM arızası", "Güç veya toprak kablosu sorunu"], action: "Yetkili serviste ECM arıza testi yapılmalı." },
  { code: "P0016", description: "Krank - Kam Mili Konum Uyumsuzluğu (Banka 1)", system: "Motor", severity: "critical", causes: ["Zamanlama zinciri veya kayışı atlamış", "VVT solenoid arızası"], action: "HEMEN servise gidin. Zamanlama hatası motor hasarına yol açabilir." },
  { code: "P0011", description: "A Kam Mili Fazı Geri Kaldı (Banka 1)", system: "Motor / VVT", severity: "warning", causes: ["VVT solenoid tıkalı", "Motor yağı kirli veya azalmış", "Zamanlama zinciri gevşek"], action: "Motor yağını değiştirin. VVT solenoidini kontrol ettirin." },
];

const SEVERITY_COLORS = {
  critical: { badge: "bg-red-500/20 text-red-400 border-red-500/30", icon: "text-red-400", bg: "bg-red-500/5 border-red-500/20" },
  warning: { badge: "bg-amber-500/20 text-amber-400 border-amber-500/30", icon: "text-amber-400", bg: "bg-amber-500/5 border-amber-500/20" },
  info: { badge: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: "text-blue-400", bg: "bg-blue-500/5 border-blue-500/20" },
};

const SEVERITY_LABELS = { critical: "Kritik", warning: "Uyarı", info: "Bilgi" };

export default function ObdCodesPage() {
  const [query, setQuery] = useState("");

  const results = query.length >= 2
    ? OBD_DATABASE.filter(
        (c) =>
          c.code.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const SeverityIcon = ({ severity }: { severity: OBDCode["severity"] }) =>
    severity === "critical" ? <AlertTriangle className="size-5 text-red-400" /> :
    severity === "warning" ? <AlertTriangle className="size-5 text-amber-400" /> :
    <Info className="size-5 text-blue-400" />;

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-50">OBD Kod Sorgulama</h1>
        <p className="mt-1 text-sm text-zinc-400">Araç arıza kodunun anlamını ve çözümünü öğrenin</p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-zinc-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Kod veya açıklama girin (örn: P0420, kataliz...)"
          className="h-13 w-full rounded-2xl border border-zinc-600 bg-zinc-800 py-3 pl-12 pr-4 text-zinc-50 outline-none placeholder:text-zinc-500 focus:border-blue-500"
        />
      </div>

      <AnimatePresence mode="popLayout">
        {query.length >= 2 && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-zinc-700 bg-zinc-800/50 p-8 text-center"
          >
            <Code className="mx-auto size-8 text-zinc-600 mb-3" />
            <p className="text-zinc-400">"{query}" için kod bulunamadı.</p>
            <p className="mt-1 text-xs text-zinc-500">Kod formatını kontrol edin (örn: P0420, C0035)</p>
          </motion.div>
        )}

        {results.map((code) => {
          const colors = SEVERITY_COLORS[code.severity];
          return (
            <motion.div
              key={code.code}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="rounded-2xl border border-zinc-700 bg-zinc-800/50 overflow-hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-zinc-700">
                <div className="flex items-center gap-3">
                  <SeverityIcon severity={code.severity} />
                  <div>
                    <span className="font-mono text-lg font-bold text-zinc-50">{code.code}</span>
                    <p className="text-sm text-zinc-300">{code.description}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`rounded-full border px-2 py-0.5 text-xs ${colors.badge}`}>
                    {SEVERITY_LABELS[code.severity]}
                  </span>
                  <span className="text-xs text-zinc-500">{code.system}</span>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <p className="text-xs font-medium text-zinc-400 mb-2">Olası Nedenler</p>
                  <ul className="space-y-1">
                    {code.causes.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-zinc-500" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`rounded-xl border p-4 ${colors.bg}`}>
                  <p className="text-xs font-medium text-zinc-400 mb-1">Önerilen Aksiyon</p>
                  <p className="text-sm text-zinc-200">{code.action}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {!query && (
        <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 p-6">
          <div className="flex items-center gap-2 text-zinc-400 mb-3">
            <Info className="size-4" />
            <span className="text-sm font-medium">OBD Kod Tipleri</span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 text-sm">
            {[
              { prefix: "P", label: "Powertrain", desc: "Motor & şanzıman" },
              { prefix: "C", label: "Chassis", desc: "Fren & süspansiyon" },
              { prefix: "B", label: "Body", desc: "Airbag & konfor" },
              { prefix: "U", label: "Network", desc: "CAN bus iletişim" },
            ].map((t) => (
              <div key={t.prefix} className="rounded-xl bg-zinc-900 p-3 text-center">
                <span className="text-lg font-bold text-blue-400">{t.prefix}xxxx</span>
                <p className="text-zinc-300 text-xs mt-1">{t.label}</p>
                <p className="text-zinc-500 text-xs">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <CheckCircle className="size-3.5" />
          {results.length} sonuç bulundu
        </div>
      )}
    </div>
  );
}
