"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Droplet,
  Zap,
  AlertTriangle,
  CircleAlert,
  Gauge,
  ShieldAlert,
  Thermometer,
  Wind,
  Car,
  Fuel,
  Lightbulb,
  Lock,
  Info,
  X,
} from "lucide-react";

type Severity = "red" | "yellow" | "green";

type LightItem = {
  id: string;
  name: string;
  nameEn: string;
  severity: Severity;
  meaning: string;
  action: string;
  icon: typeof AlertTriangle;
};

const LIGHTS: LightItem[] = [
  {
    id: "motor",
    name: "Motor Arıza",
    nameEn: "check engine",
    severity: "yellow",
    meaning: "Motor veya egzoz sistemi ile ilgili bir arıza tespit edildi. ECU arıza kodu üretmiş olabilir.",
    action: "Aracı en kısa sürede yetkili servise götürün. Aşırı yük ve yüksek devirden kaçının.",
    icon: AlertTriangle,
  },
  {
    id: "yag",
    name: "Yağ Basıncı",
    nameEn: "oil",
    severity: "red",
    meaning: "Motor yağı basıncı düşük. Yağ seviyesi az olabilir veya yağ pompası arızalı olabilir.",
    action: "Hemen durun. Motoru çalıştırmaya devam etmeyin. Yağ seviyesini kontrol edin, gerekirse tamamlayın.",
    icon: Droplet,
  },
  {
    id: "fren",
    name: "Fren Sistemi",
    nameEn: "brake",
    severity: "red",
    meaning: "Fren hidroliği düşük veya fren balataları aşınmış olabilir. El freni çekili de olabilir.",
    action: "Güvenli bir yerde durun. El frenini kontrol edin; kapalıysa fren hidroliği ve balataları serviste kontrol ettirin.",
    icon: CircleAlert,
  },
  {
    id: "batarya",
    name: "Batarya / Şarj",
    nameEn: "battery",
    severity: "red",
    meaning: "Alternatör şarj etmiyor veya batarya arızalı. Elektrik tüketimi şarjı aşıyor olabilir.",
    action: "Kısa mesafe gidebilirsiniz ama klimayı ve gereksiz elektriği kapatın. En kısa sürede batarya/alternatör kontrolü yaptırın.",
    icon: Zap,
  },
  {
    id: "lastik",
    name: "Lastik Basıncı (TPMS)",
    nameEn: "tire pressure",
    severity: "yellow",
    meaning: "Bir veya daha fazla lastiğin basıncı düşük. TPMS sensörü uyarı veriyor.",
    action: "Lastik basınçlarını kontrol edip üretici değerine getirin. Basınç normalse sensör arızası olabilir.",
    icon: Gauge,
  },
  {
    id: "abs",
    name: "ABS",
    nameEn: "abs",
    severity: "yellow",
    meaning: "ABS sistemi arızalı. Acil frenlemede tekerlek kilidi önleme devre dışı kalabilir.",
    action: "Daha dikkatli sürün. Kaygan yollarda fren mesafesi uzayabilir. Serviste ABS kontrolü yaptırın.",
    icon: ShieldAlert,
  },
  {
    id: "hava-yastigi",
    name: "Hava Yastığı",
    nameEn: "airbag",
    severity: "red",
    meaning: "Hava yastığı veya emniyet kemeri ön gerilme sistemi ile ilgili bir arıza var.",
    action: "Aracı servise götürün. Çarpışma anında hava yastığı açılmayabilir.",
    icon: ShieldAlert,
  },
  {
    id: "motor-sogutma",
    name: "Motor Soğutma",
    nameEn: "coolant",
    severity: "red",
    meaning: "Soğutma suyu sıcaklığı çok yüksek veya seviye düşük. Motor aşırı ısınma riski.",
    action: "Motoru durdurun ve soğumasını bekleyin. Soğutma suyu ekleyin; sürekli düşüyorsa kaçak var, servise gidin.",
    icon: Thermometer,
  },
  {
    id: "esp",
    name: "ESP / Kayma Kontrol",
    nameEn: "esp",
    severity: "yellow",
    meaning: "Elektronik stabilite programı devre dışı veya arızalı.",
    action: "ESP’yi tekrar açmayı deneyin. Işık sönmezse serviste kontrol ettirin.",
    icon: Car,
  },
  {
    id: "klima",
    name: "Klima / Soğutma",
    nameEn: "ac",
    severity: "green",
    meaning: "Klima açık. Bazı araçlarda soğutma sıvısı azaldığında da bu ışık yanar.",
    action: "Klima kapalıyken ışık yanıyorsa soğutma gazı seviyesi kontrol ettirilmeli.",
    icon: Wind,
  },
  {
    id: "yakit",
    name: "Yakıt Seviyesi",
    nameEn: "fuel",
    severity: "yellow",
    meaning: "Yakıt deposu kritik seviyede. Reserve geçilmiş olabilir.",
    action: "En kısa sürede yakıt alın. Yolda kalmamak için reserve’e güvenmeyin.",
    icon: Fuel,
  },
  {
    id: "far",
    name: "Far Sistemi",
    nameEn: "headlight",
    severity: "yellow",
    meaning: "Far ampulü yanmıyor veya far ayarı bozuk olabilir.",
    action: "Ampulü kontrol edin veya serviste far ayarı yaptırın.",
    icon: Lightbulb,
  },
  {
    id: "kilit",
    name: "Araç Kilidi",
    nameEn: "lock",
    severity: "green",
    meaning: "Araç kilitli veya immobilizer aktif.",
    action: "Normal bilgi ışığı. Kilidi açmak için anahtarı kullanın.",
    icon: Lock,
  },
  {
    id: "genel-uyari",
    name: "Genel Uyarı",
    nameEn: "warning",
    severity: "yellow",
    meaning: "Genel uyarı: kaput, bagaj veya bir kapı açık olabilir; veya başka bir sistem uyarı veriyor.",
    action: "Tüm kapıları ve kaputları kontrol edin. Kullanım kılavuzuna bakın.",
    icon: Info,
  },
];

const SEVERITY_LABELS: Record<Severity, string> = {
  red: "Acil",
  yellow: "Dikkat",
  green: "Bilgi",
};

const SEVERITY_STYLES: Record<Severity, string> = {
  red: "bg-red-500/20 text-red-400 border-red-500/40",
  yellow: "bg-amber-500/20 text-amber-400 border-amber-500/40",
  green: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
};

const COLOR_FILTER_OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "Tümü" },
  { value: "red", label: "Kırmızı" },
  { value: "yellow", label: "Sarı" },
  { value: "green", label: "Yeşil" },
];

export default function GostergeIsiklariPage() {
  const [search, setSearch] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [selected, setSelected] = useState<LightItem | null>(null);

  const filtered = useMemo(() => {
    let list = LIGHTS;
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.nameEn.toLowerCase().includes(q) ||
          (q.includes("kırmızı") && l.severity === "red") ||
          (q.includes("sarı") && l.severity === "yellow") ||
          (q.includes("yeşil") && l.severity === "green") ||
          (q.includes("acil") && l.severity === "red") ||
          (q.includes("dikkat") && l.severity === "yellow") ||
          (q.includes("bilgi") && l.severity === "green")
      );
    }
    if (colorFilter) list = list.filter((l) => l.severity === colorFilter);
    return list;
  }, [search, colorFilter]);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
          Gösterge Işıkları
        </h1>
        <p className="mt-2 text-zinc-400">
          Gösterge panelindeki uyarı simgelerine tıklayın; ne anlama geldiğini ve ne yapmanız gerektiğini görün.
        </p>
      </header>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Işık adı veya renk ile ara (örn. motor, kırmızı, yağ)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 py-3 pl-10 pr-4 text-zinc-100 placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <select
          value={colorFilter}
          onChange={(e) => setColorFilter(e.target.value)}
          className="rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          {COLOR_FILTER_OPTIONS.map((opt) => (
            <option key={opt.value || "all"} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {filtered.map((item) => {
          const Icon = item.icon;
          const isSelected = selected?.id === item.id;
          return (
            <motion.button
              key={item.id}
              type="button"
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setSelected(item)}
              className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                isSelected
                  ? "border-primary bg-zinc-800 ring-2 ring-primary/30"
                  : "border-zinc-700 bg-zinc-900/80 hover:border-zinc-600"
              }`}
            >
              <span
                className={`flex size-14 items-center justify-center rounded-full border-2 ${
                  item.severity === "red"
                    ? "border-red-500/60 bg-red-500/10 text-red-400"
                    : item.severity === "yellow"
                      ? "border-amber-500/60 bg-amber-500/10 text-amber-400"
                      : "border-emerald-500/60 bg-emerald-500/10 text-emerald-400"
                }`}
              >
                <Icon className="size-7" />
              </span>
              <span className="text-center text-sm font-medium text-zinc-200">
                {item.name}
              </span>
            </motion.button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-zinc-500">Bu filtreye uyan ışık bulunamadı.</p>
      )}

      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className={`flex size-16 items-center justify-center rounded-xl border-2 ${
                    selected.severity === "red"
                      ? "border-red-500/60 bg-red-500/10 text-red-400"
                      : selected.severity === "yellow"
                        ? "border-amber-500/60 bg-amber-500/10 text-amber-400"
                        : "border-emerald-500/60 bg-emerald-500/10 text-emerald-400"
                  }`}
                >
                  <selected.icon className="size-8" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-zinc-50">
                    Bu ışık ne anlama geliyor?
                  </h2>
                  <p className="mt-1 font-medium text-zinc-300">{selected.name}</p>
                  <span
                    className={`mt-2 inline-block rounded-full border px-3 py-1 text-sm font-medium ${SEVERITY_STYLES[selected.severity]}`}
                  >
                    {SEVERITY_LABELS[selected.severity]}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                aria-label="Kapat"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-zinc-400">Anlamı</h3>
                <p className="mt-1 text-zinc-200">{selected.meaning}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-zinc-400">
                  Hemen yapmanız gerekenler
                </h3>
                <p className="mt-1 text-zinc-200">{selected.action}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
