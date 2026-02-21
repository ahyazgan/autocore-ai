"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";

export type CommandItem = { name: string; href: string; hub?: string };

const FLAT_TOOLS: CommandItem[] = [
  { name: "Arabam Ne Kadar Eder?", href: "/araclar/arabam-ne-eder", hub: "Araçlar" },
  { name: "ÖTV Hesaplama", href: "/araclar/otv-hesaplama", hub: "Araçlar" },
  { name: "Kredi Hesaplama", href: "/araclar/kredi-hesaplama", hub: "Araçlar" },
  { name: "Lastik Uyum Hesaplayıcı", href: "/araclar/lastik-hesaplama", hub: "Araçlar" },
  { name: "Kronik Sorun Dedektifi", href: "/araclar/kronik-sorunlar", hub: "Araçlar" },
  { name: "İlan Dedektifi", href: "/yapay-zeka/ilan-dedektifi", hub: "Yapay Zeka" },
  { name: "Tramer SMS Dedektifi", href: "/yapay-zeka/tramer-okuyucu", hub: "Yapay Zeka" },
  { name: "Ekspertiz Çevirmeni", href: "/yapay-zeka/ekspertiz", hub: "Yapay Zeka" },
  { name: "Arka Plan Kaldır", href: "/studio/bg-remover", hub: "Stüdyo" },
  { name: "360° Dönüş", href: "/studio/360-spin", hub: "Stüdyo" },
  { name: "Hasar Tespit", href: "/studio/damage-detect", hub: "Stüdyo" },
  { name: "Sanal Tuner", href: "/studio/virtual-tuner", hub: "Stüdyo" },
  { name: "İlan Oluştur", href: "/studio/listing-gen", hub: "Stüdyo" },
  { name: "Reels Yapıcı", href: "/studio/reels-maker", hub: "Stüdyo" },
  { name: "Şase No Çözücü", href: "/data/vin-decoder", hub: "Veri" },
  { name: "Fiyat Kontrol", href: "/data/price-check", hub: "Veri" },
  { name: "Toplam Sahip Olma Maliyeti", href: "/data/tco-calculator", hub: "Veri" },
  { name: "Gelecek Değer", href: "/data/future-value", hub: "Veri" },
  { name: "Limon Kontrol", href: "/data/lemon-check", hub: "Veri" },
  { name: "İthalat Hesaplama", href: "/data/import-calc", hub: "Veri" },
  { name: "Dolandırıcılık Tespit", href: "/data/scam-detect", hub: "Veri" },
  { name: "Menzil Tahmini", href: "/ev/menzil-tahmini", hub: "Elektrikli Araçlar" },
  { name: "Şarj Maliyeti", href: "/ev/sarj-maliyet", hub: "Elektrikli Araçlar" },
  { name: "Batarya Sağlığı", href: "/ev/battery-health", hub: "Elektrikli Araçlar" },
  { name: "Tasarruf Hesaplama", href: "/ev/savings-calc", hub: "Elektrikli Araçlar" },
  { name: "Mekanik Asistan (AI)", href: "/garage/mechanic-ai", hub: "Garaj" },
  { name: "Muayene Takvimi", href: "/garaj/muayene-takvimi", hub: "Garaj" },
  { name: "Periyodik Bakım Rehberi", href: "/garaj/bakim-rehberi", hub: "Garaj" },
  { name: "Gösterge Işıkları", href: "/garaj/gosterge-isiklari", hub: "Garaj" },
  { name: "OBD Kodları", href: "/garaj/obd-kodlari", hub: "Garaj" },
  { name: "Radyo Kodu", href: "/garage/radio-code", hub: "Garaj" },
  { name: "Lastik Hesaplama", href: "/garage/tire-calc", hub: "Garaj" },
  { name: "Yağ Bulucu", href: "/garage/oil-finder", hub: "Garaj" },
  { name: "Parça Çapraz Referans", href: "/garage/part-cross-ref", hub: "Garaj" },
  { name: "Ana Sayfa", href: "/", hub: "" },
  { name: "Rehber", href: "/rehber", hub: "" },
  { name: "Fiyatlandırma", href: "/fiyatlandirma", hub: "" },
  { name: "Panel", href: "/dashboard", hub: "" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      setQuery("");
      setSelected(0);
    };
    window.addEventListener("open-command-palette", onOpen);
    return () => window.removeEventListener("open-command-palette", onOpen);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FLAT_TOOLS.slice(0, 12);
    return FLAT_TOOLS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        (t.hub && t.hub.toLowerCase().includes(q))
    );
  }, [query]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery("");
        setSelected(0);
      }
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      }
      if (e.key === "Enter" && filtered[selected]) {
        e.preventDefault();
        router.push(filtered[selected].href);
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, filtered, selected, router]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="fixed left-1/2 top-[20%] z-50 w-full max-w-xl -translate-x-1/2 rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-zinc-800 px-4 py-3">
              <Search className="size-5 text-zinc-500" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Araç veya araç ara... (örn. ÖTV, VIN, tramer)"
                className="flex-1 bg-transparent text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                autoFocus
              />
              <kbd className="rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-400">
                ESC
              </kbd>
            </div>
            <ul className="max-h-[60vh] overflow-auto py-2">
              {filtered.length === 0 ? (
                <li className="px-4 py-6 text-center text-sm text-zinc-500">
                  Sonuç bulunamadı
                </li>
              ) : (
                filtered.map((item, i) => (
                  <li key={item.href + item.name}>
                    <button
                      type="button"
                      onClick={() => {
                        router.push(item.href);
                        setOpen(false);
                      }}
                      onMouseEnter={() => setSelected(i)}
                      className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left ${
                        i === selected
                          ? "bg-primary/15 text-primary"
                          : "text-zinc-200 hover:bg-zinc-800"
                      }`}
                    >
                      <span className="truncate">{item.name}</span>
                      {item.hub && (
                        <span className="shrink-0 text-xs text-zinc-500">
                          {item.hub}
                        </span>
                      )}
                      <ArrowRight className="size-4 shrink-0 opacity-50" />
                    </button>
                  </li>
                ))
              )}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
