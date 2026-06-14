"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, AlertTriangle, Info, X,
  Activity, Gauge, Droplets, ShieldAlert,
  Battery, Wind, Thermometer, Fuel,
  Settings, Car, CircleAlert, Wrench,
} from "lucide-react";

type Severity = "critical" | "warning" | "info";

interface Light {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  severity: Severity;
  meaning: string;
  cause: string;
  action: string;
}

const LIGHTS: Light[] = [
  {
    id: "engine",
    name: "Motor Arıza",
    icon: Settings,
    color: "text-amber-400",
    severity: "warning",
    meaning: "Motor kontrol sistemi bir sorun tespit etti.",
    cause: "Oksijen sensörü, kataliz konvertör, yakıt sistemi veya ateşleme sistemi arızası.",
    action: "Mümkün olan en kısa sürede yetkili servise gidin. OBD cihazıyla kodu okutun.",
  },
  {
    id: "abs",
    name: "ABS Arıza",
    icon: ShieldAlert,
    color: "text-amber-400",
    severity: "warning",
    meaning: "Antilock fren sistemi (ABS) devre dışı kalmış olabilir.",
    cause: "Tekerlek hız sensörü arızası, ABS modülü sorunu veya düşük fren hidroliği.",
    action: "Normal frenler çalışıyor olabilir ancak ABS devreye girmez. Servise gidin.",
  },
  {
    id: "tpms",
    name: "Lastik Basıncı (TPMS)",
    icon: Gauge,
    color: "text-amber-400",
    severity: "warning",
    meaning: "Bir veya daha fazla lastiğin basıncı normalin altında.",
    cause: "Sıcaklık değişimi, lastik çivisi veya yavaş kaçak.",
    action: "En yakın istasyonda lastik basıncını kontrol edin (genellikle 2.2-2.5 bar).",
  },
  {
    id: "oil",
    name: "Yağ Basıncı",
    icon: Droplets,
    color: "text-red-500",
    severity: "critical",
    meaning: "Motor yağ basıncı kritik seviyenin altına düştü.",
    cause: "Düşük yağ seviyesi, yağ pompası arızası veya yağ kaçağı.",
    action: "HEMEN DURUN! Motor çalışır halde devam etmek motor hasarına yol açar. Yağ seviyesini kontrol edin.",
  },
  {
    id: "brake",
    name: "Fren Sistemi",
    icon: CircleAlert,
    color: "text-red-500",
    severity: "critical",
    meaning: "Fren sisteminde kritik bir sorun var.",
    cause: "Düşük fren hidroliği, aşınmış fren balatası veya fren sistemi arızası.",
    action: "HEMEN DURUN! Güvenli bir yere çekin, çekici çağırın.",
  },
  {
    id: "battery",
    name: "Akü / Şarj Sistemi",
    icon: Battery,
    color: "text-red-500",
    severity: "critical",
    meaning: "Aküde veya alternatörde sorun var.",
    cause: "Akü şarjı bitmek üzere, alternatör arızalı veya şarj kablosu kopuk.",
    action: "Gereksiz elektrikli donanımları kapatın ve en yakın servise gidin.",
  },
  {
    id: "airbag",
    name: "Airbag / SRS",
    icon: AlertTriangle,
    color: "text-red-500",
    severity: "critical",
    meaning: "Airbag sistemi devre dışı kalabilir.",
    cause: "Sensör arızası, SRS modülü sorunu veya kablo problemi.",
    action: "Kaza durumunda airbag açılmayabilir. Yetkili servise gidin.",
  },
  {
    id: "temp",
    name: "Motor Sıcaklığı",
    icon: Thermometer,
    color: "text-red-500",
    severity: "critical",
    meaning: "Motor aşırı ısınıyor.",
    cause: "Soğutucu sıvı eksikliği, termostat arızası, radyatör tıkanıklığı.",
    action: "HEMEN DURUN! Motor hasar görmeden aracı güvenli bir yere çekin ve soğumasını bekleyin.",
  },
  {
    id: "fuel",
    name: "Yakıt Azaldı",
    icon: Fuel,
    color: "text-amber-400",
    severity: "warning",
    meaning: "Yakıt seviyesi kritik seviyeye ulaştı.",
    cause: "Yakıt deposu boşalmak üzere.",
    action: "En yakın yakıt istasyonuna gidin. Yakıtsız çalıştırmak yakıt pompasına zarar verebilir.",
  },
  {
    id: "esp",
    name: "ESP / Traksiyon Kontrolü",
    icon: Activity,
    color: "text-amber-400",
    severity: "warning",
    meaning: "Elektronik Denge Programı veya traksiyon kontrolü devre dışı.",
    cause: "Sistem manuel kapatılmış ya da sensör arızası.",
    action: "Kapalıysa yeniden açın. Sorun devam ediyorsa servise gidin.",
  },
  {
    id: "steering",
    name: "Güç Direksiyonu",
    icon: Car,
    color: "text-amber-400",
    severity: "warning",
    meaning: "Elektronik güç direksiyonu sistemi sorunlu.",
    cause: "Sensör arızası veya sistem aksaklığı.",
    action: "Direksiyon daha ağır hissedebilir. Güvenli sürüşe devam edin, servise gidin.",
  },
  {
    id: "transmission",
    name: "Şanzıman Arıza",
    icon: Settings,
    color: "text-amber-400",
    severity: "warning",
    meaning: "Otomatik şanzıman sisteminde sorun tespit edildi.",
    cause: "Düşük şanzıman yağı, şanzıman arızası veya sensör problemi.",
    action: "Yavaş ve dikkatli sürün, en yakın servise gidin.",
  },
  {
    id: "dpf",
    name: "DPF (Dizel Partikül Filtresi)",
    icon: Wind,
    color: "text-amber-400",
    severity: "warning",
    meaning: "Dizel partikül filtresi tıkandı veya yenilenmeye ihtiyaç duyuyor.",
    cause: "Kısa mesafe sürüşler filtre rejenerasyonunu engelliyor.",
    action: "Otoyolda 20-30 dk 80 km/s üzerinde sürün, filtre kendiliğinden temizlenebilir.",
  },
  {
    id: "adblue",
    name: "AdBlue Uyarısı",
    icon: Droplets,
    color: "text-blue-400",
    severity: "info",
    meaning: "AdBlue sıvısı azalmak üzere.",
    cause: "AdBlue deposu tükenmek üzere.",
    action: "En kısa sürede AdBlue doldurun. Bitmesi durumunda araç çalışmayabilir.",
  },
  {
    id: "service",
    name: "Servis Zamanı",
    icon: Wrench,
    color: "text-blue-400",
    severity: "info",
    meaning: "Periyodik bakım zamanı geldi.",
    cause: "Km veya zaman bazlı bakım aralığına ulaşıldı.",
    action: "En yakın zamanda yetkili serviste bakım yaptırın.",
  },
  {
    id: "seatbelt",
    name: "Emniyet Kemeri",
    icon: AlertTriangle,
    color: "text-red-500",
    severity: "critical",
    meaning: "Sürücü veya yolcu kemeri bağlı değil.",
    cause: "Kemer takılı değil veya kemer sensörü arızalı.",
    action: "Hareket etmeden emniyet kemerinizi bağlayın.",
  },
  {
    id: "door",
    name: "Kapı Açık",
    icon: Info,
    color: "text-blue-400",
    severity: "info",
    meaning: "Bir veya daha fazla kapı tam kapanmamış.",
    cause: "Kapı kilidi tam oturmamış.",
    action: "Tüm kapıları kontrol edin ve tam olarak kapatın.",
  },
  {
    id: "4wd",
    name: "4WD / AWD",
    icon: Car,
    color: "text-amber-400",
    severity: "warning",
    meaning: "Dört tekerlekten çekiş sistemi sorunlu.",
    cause: "Diferansiyel arızası veya 4WD aktarma kutusu sorunu.",
    action: "Servise gidin. Ön ve arka aks arasındaki güç dağılımı etkilenebilir.",
  },
  {
    id: "coolant",
    name: "Soğutucu Sıvı Seviyesi",
    icon: Thermometer,
    color: "text-amber-400",
    severity: "warning",
    meaning: "Motor soğutucu sıvısı azalmış.",
    cause: "Kaçak veya buharlaşma.",
    action: "Motor soğukken soğutucu seviyesini kontrol edin ve gerekirse ekleyin.",
  },
];

const SEVERITY_LABELS: Record<Severity, string> = {
  critical: "Kritik",
  warning: "Uyarı",
  info: "Bilgi",
};

const SEVERITY_COLORS: Record<Severity, string> = {
  critical: "bg-red-500/20 text-red-400 border-red-500/30",
  warning: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  info: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

export default function DashboardLightsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Light | null>(null);
  const [filter, setFilter] = useState<Severity | "all">("all");

  const filtered = LIGHTS.filter((l) => {
    const matchesSearch = l.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || l.severity === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-50">Gösterge Işıkları Rehberi</h1>
        <p className="mt-1 text-sm text-zinc-400">Araç uyarı ışığınızın anlamını öğrenin</p>
      </div>

      {/* Arama ve Filtre */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Işık adı ara..."
            className="h-11 w-full rounded-xl border border-zinc-600 bg-zinc-800 pl-10 pr-4 text-zinc-50 outline-none placeholder:text-zinc-500 focus:border-blue-500"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "critical", "warning", "info"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-xl border px-3 py-2 text-xs font-medium transition ${
                filter === f
                  ? "border-blue-500 bg-blue-500/20 text-blue-300"
                  : "border-zinc-600 bg-zinc-800 text-zinc-400 hover:border-zinc-500"
              }`}
            >
              {f === "all" ? "Tümü" : SEVERITY_LABELS[f]}
            </button>
          ))}
        </div>
      </div>

      {/* Izgara */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((light) => {
          const Icon = light.icon;
          return (
            <motion.button
              key={light.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setSelected(light)}
              className="flex flex-col items-center gap-3 rounded-2xl border border-zinc-700 bg-zinc-800/50 p-5 text-center transition hover:border-zinc-500 hover:bg-zinc-800"
            >
              <Icon className={`size-8 ${light.color}`} />
              <span className="text-xs font-medium text-zinc-200">{light.name}</span>
              <span className={`rounded-full border px-2 py-0.5 text-xs ${SEVERITY_COLORS[light.severity]}`}>
                {SEVERITY_LABELS[light.severity]}
              </span>
            </motion.button>
          );
        })}
        {filtered.length === 0 && (
          <p className="col-span-full py-8 text-center text-sm text-zinc-500">Sonuç bulunamadı</p>
        )}
      </div>

      {/* Detay Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-900 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {(() => { const Icon = selected.icon; return <Icon className={`size-8 ${selected.color}`} />; })()}
                  <div>
                    <h2 className="font-bold text-zinc-50">{selected.name}</h2>
                    <span className={`rounded-full border px-2 py-0.5 text-xs ${SEVERITY_COLORS[selected.severity]}`}>
                      {SEVERITY_LABELS[selected.severity]}
                    </span>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="text-zinc-500 hover:text-zinc-300">
                  <X className="size-5" />
                </button>
              </div>
              <div className="space-y-4 text-sm">
                <div className="rounded-xl bg-zinc-800 p-4">
                  <p className="font-medium text-zinc-300 mb-1">Anlam</p>
                  <p className="text-zinc-400">{selected.meaning}</p>
                </div>
                <div className="rounded-xl bg-zinc-800 p-4">
                  <p className="font-medium text-zinc-300 mb-1">Olası Nedenler</p>
                  <p className="text-zinc-400">{selected.cause}</p>
                </div>
                <div className={`rounded-xl p-4 ${
                  selected.severity === "critical" ? "bg-red-500/10 border border-red-500/20" :
                  selected.severity === "warning" ? "bg-amber-500/10 border border-amber-500/20" :
                  "bg-blue-500/10 border border-blue-500/20"
                }`}>
                  <p className={`font-medium mb-1 ${
                    selected.severity === "critical" ? "text-red-300" :
                    selected.severity === "warning" ? "text-amber-300" : "text-blue-300"
                  }`}>Ne Yapmalısınız?</p>
                  <p className="text-zinc-300">{selected.action}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
