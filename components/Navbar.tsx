"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Search, Calculator, Sparkles, ShieldCheck, Image, Database, Zap, Wrench, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const MEGA_MENU_LINKS = [
  {
    hub: "Araçlar (Ücretsiz)",
    href: "/araclar",
    icon: Calculator,
    tools: [
      { name: "Arabam Ne Kadar Eder?", href: "/araclar/arabam-ne-eder" },
      { name: "ÖTV Hesaplama", href: "/araclar/otv-hesaplama" },
      { name: "Kredi Hesaplama", href: "/araclar/kredi-hesaplama" },
      { name: "Lastik Uyum Hesaplayıcı", href: "/araclar/lastik-hesaplama" },
    ],
  },
  {
    hub: "Alıcı Araçları",
    href: "/araclar/kronik-sorunlar",
    icon: ShieldCheck,
    tools: [
      { name: "Kronik Sorun Dedektifi", href: "/araclar/kronik-sorunlar" },
    ],
  },
  {
    hub: "Yapay Zeka",
    href: "/yapay-zeka",
    icon: Sparkles,
    tools: [
      { name: "İlan Dedektifi", href: "/yapay-zeka/ilan-dedektifi" },
      { name: "Tramer SMS Dedektifi", href: "/yapay-zeka/tramer-okuyucu" },
      { name: "Ekspertiz Çevirmeni", href: "/yapay-zeka/ekspertiz" },
    ],
  },
  {
    hub: "Stüdyo",
    href: "/studio",
    icon: Image,
    tools: [
      { name: "Arka Plan Kaldır", href: "/studio/bg-remover" },
      { name: "360° Dönüş", href: "/studio/360-spin" },
      { name: "Hasar Tespit", href: "/studio/damage-detect" },
      { name: "Sanal Tuner", href: "/studio/virtual-tuner" },
      { name: "İlan Oluştur", href: "/studio/listing-gen" },
      { name: "Reels Yapıcı", href: "/studio/reels-maker" },
    ],
  },
  {
    hub: "Veri",
    href: "/data",
    icon: Database,
    tools: [
      { name: "Şase No Çözücü", href: "/data/vin-decoder" },
      { name: "Fiyat Kontrol", href: "/data/price-check" },
      { name: "Toplam Sahip Olma Maliyeti", href: "/data/tco-calculator" },
      { name: "Gelecek Değer", href: "/data/future-value" },
      { name: "Limon Kontrol", href: "/data/lemon-check" },
      { name: "İthalat Hesaplama", href: "/data/import-calc" },
      { name: "Dolandırıcılık Tespit", href: "/data/scam-detect" },
    ],
  },
  {
    hub: "Elektrikli Araçlar",
    href: "/ev",
    icon: Zap,
    tools: [
      { name: "Menzil Tahmini", href: "/ev/menzil-tahmini" },
      { name: "Şarj Maliyeti", href: "/ev/sarj-maliyet" },
      { name: "Batarya Sağlığı", href: "/ev/battery-health" },
      { name: "Tasarruf Hesaplama", href: "/ev/savings-calc" },
    ],
  },
  {
    hub: "Garaj",
    href: "/garage",
    icon: Wrench,
    tools: [
      { name: "Mekanik Asistan (AI)", href: "/garage/mechanic-ai" },
      { name: "Muayene Takvimi", href: "/garaj/muayene-takvimi" },
      { name: "Periyodik Bakım Rehberi", href: "/garaj/bakim-rehberi" },
      { name: "Gösterge Işıkları", href: "/garaj/gosterge-isiklari" },
      { name: "OBD Kodları", href: "/garaj/obd-kodlari" },
      { name: "Radyo Kodu", href: "/garage/radio-code" },
      { name: "Lastik Hesaplama", href: "/garage/tire-calc" },
      { name: "Yağ Bulucu", href: "/garage/oil-finder" },
      { name: "Parça Çapraz Referans", href: "/garage/part-cross-ref" },
    ],
  },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (hub: string) => {
    setOpenAccordion((prev) => (prev === hub ? null : hub));
  };

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:backdrop-blur ${
        isHome
          ? "border-slate-200 bg-white/95 text-slate-800"
          : "border-zinc-800 bg-zinc-950/95 text-zinc-50"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className={`flex items-center gap-2 font-semibold hover:opacity-90 ${isHome ? "text-slate-800" : "text-zinc-50"}`}>
          <span className={isHome ? "text-blue-600" : "text-primary logo-glow"}>OtoZeka</span>
        </Link>

        {/* Desktop nav: visible from lg up */}
        <nav className="hidden items-center gap-4 lg:flex">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
              isHome
                ? "border-slate-300 bg-slate-100 text-slate-600 hover:border-slate-400 hover:text-slate-800"
                : "border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
            }`}
            aria-label="Ara (Ctrl+K)"
          >
            <Search className="size-4" />
            <span className="hidden sm:inline">Ara...</span>
            <kbd className={`hidden rounded px-1.5 py-0.5 text-xs xl:inline ${isHome ? "bg-slate-200" : "bg-zinc-700"}`}>⌘K</kbd>
          </button>
          <div className="relative">
            <Button
              variant="ghost"
              className={`gap-2 ${isHome ? "text-slate-700 hover:bg-slate-100 hover:text-slate-900" : "text-zinc-100"}`}
              onClick={() => setToolsOpen((o) => !o)}
              onMouseEnter={() => setToolsOpen(true)}
            >
              <Menu className="size-4" />
              Araçlar
            </Button>
            {toolsOpen && (
              <div
                className="absolute left-0 top-full pt-2"
                onMouseLeave={() => setToolsOpen(false)}
              >
                <div className="w-[min(90vw,960px)] rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
                  <div className="grid grid-cols-2 gap-8 sm:grid-cols-5 lg:grid-cols-7">
                    {MEGA_MENU_LINKS.map(({ hub, href, icon: Icon, tools }) => (
                      <div key={hub}>
                        <Link
                          href={href}
                          className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/90"
                          onClick={() => setToolsOpen(false)}
                        >
                          <Icon className="size-4" />
                          {hub}
                        </Link>
                        <ul className="space-y-1.5">
                          {tools.map(({ name, href: toolHref }) => (
                            <li key={toolHref}>
                              <Link
                                href={toolHref}
                                className="block text-sm text-zinc-400 transition-colors hover:text-primary"
                                onClick={() => setToolsOpen(false)}
                              >
                                {name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <Link href="/araclar" className={`text-sm transition-colors hover:text-blue-600 ${isHome ? "text-slate-600" : "text-zinc-400 hover:text-primary"}`}>
            Ücretsiz Hesaplamalar
          </Link>
          <Link href="/studio" className={`text-sm transition-colors hover:text-blue-600 ${isHome ? "text-slate-600" : "text-zinc-400 hover:text-primary"}`}>
            Stüdyo
          </Link>
          <Link href="/data" className={`text-sm transition-colors hover:text-blue-600 ${isHome ? "text-slate-600" : "text-zinc-400 hover:text-primary"}`}>
            Veri
          </Link>
          <Link href="/garage" className={`text-sm transition-colors hover:text-blue-600 ${isHome ? "text-slate-600" : "text-zinc-400 hover:text-primary"}`}>
            Garaj
          </Link>
          <Link href="/rehber" className={`text-sm transition-colors hover:text-blue-600 ${isHome ? "text-slate-600" : "text-zinc-400 hover:text-primary"}`}>
            Rehber
          </Link>
          <Link href="/fiyatlandirma" className={`text-sm transition-colors hover:text-blue-600 ${isHome ? "text-slate-600" : "text-zinc-400 hover:text-primary"}`}>
            Fiyatlandırma
          </Link>
          <Link href="/garajim" className={`text-sm transition-colors hover:text-blue-600 ${isHome ? "text-slate-600" : "text-zinc-400 hover:text-primary"}`}>
            Garajım
          </Link>
          <Link href="/dashboard" className={`text-sm font-medium transition-colors ${isHome ? "text-blue-600 hover:text-blue-700" : "text-primary hover:text-primary/90"}`}>
            Panel
          </Link>
        </nav>

        {/* Mobile/tablet: search icon + hamburger (no horizontal nav) */}
        <div className="flex items-center gap-1 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            className={`min-h-[44px] min-w-[44px] ${isHome ? "text-slate-700 hover:bg-slate-100 hover:text-slate-900" : ""}`}
            onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
            aria-label="Ara"
          >
            <Search className="size-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`min-h-[44px] min-w-[44px] ${isHome ? "text-slate-700 hover:bg-slate-100 hover:text-slate-900" : ""}`}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile drawer: full-height overlay with accordion */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-zinc-950/80 backdrop-blur-sm lg:hidden"
            aria-hidden
            onClick={() => setMobileOpen(false)}
          />
          <div
            className="fixed inset-y-0 right-0 z-50 w-full max-w-[min(100vw,400px)] overflow-y-auto border-l border-zinc-800 bg-zinc-900 shadow-2xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menü"
          >
            <div className="flex flex-col px-4 py-6 pb-10">
              <div className="mb-6 flex gap-3">
                <Link
                  href="/garajim"
                  className="flex min-h-[48px] flex-1 items-center justify-center rounded-xl bg-zinc-800 py-3 text-base font-medium text-primary active:bg-zinc-700"
                  onClick={() => setMobileOpen(false)}
                >
                  Garajım
                </Link>
                <Link
                  href="/dashboard"
                  className="flex min-h-[48px] flex-1 items-center justify-center rounded-xl bg-zinc-800 py-3 text-base font-medium text-primary active:bg-zinc-700"
                  onClick={() => setMobileOpen(false)}
                >
                  Panel
                </Link>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  window.dispatchEvent(new CustomEvent("open-command-palette"));
                }}
                className="mb-6 flex min-h-[48px] items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 text-base text-zinc-300 active:bg-zinc-700"
              >
                <Search className="size-6 shrink-0" />
                Ara (Ctrl+K)
              </button>
              <nav className="flex flex-col">
                {MEGA_MENU_LINKS.map(({ hub, href, icon: Icon, tools }) => {
                  const isOpen = openAccordion === hub;
                  return (
                    <div key={hub} className="border-b border-zinc-800 last:border-b-0">
                      <div className="flex min-h-[56px] items-center justify-between">
                        <Link
                          href={href}
                          className="flex min-h-[56px] flex-1 items-center gap-3 py-3 pr-2 text-base font-semibold text-zinc-100 active:bg-zinc-800/50"
                          onClick={() => setMobileOpen(false)}
                        >
                          <Icon className="size-6 shrink-0 text-primary" />
                          {hub}
                        </Link>
                        <button
                          type="button"
                          onClick={() => toggleAccordion(hub)}
                          className="flex min-h-[56px] min-w-[48px] shrink-0 items-center justify-center text-zinc-500 transition hover:text-zinc-300"
                          aria-expanded={isOpen}
                          aria-controls={`accordion-${hub}`}
                        >
                          <ChevronDown className={`size-6 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                      </div>
                      <div
                        id={`accordion-${hub}`}
                        className="overflow-hidden transition-[max-height] duration-200 ease-out"
                        style={{ maxHeight: isOpen ? `${tools.length * 52 + 16}px` : 0 }}
                      >
                        <ul className="space-y-0.5 pb-4 pl-9">
                          {tools.map(({ name, href: toolHref }) => (
                            <li key={toolHref}>
                              <Link
                                href={toolHref}
                                className="flex min-h-[48px] items-center rounded-lg px-3 py-2.5 text-[15px] text-zinc-400 active:bg-zinc-800/50 active:text-zinc-200"
                                onClick={() => setMobileOpen(false)}
                              >
                                {name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </nav>
              <div className="mt-6 flex flex-col gap-2">
                <Link
                  href="/rehber"
                  className="flex min-h-[48px] items-center rounded-xl px-4 text-base text-zinc-400 active:bg-zinc-800"
                  onClick={() => setMobileOpen(false)}
                >
                  Rehber
                </Link>
                <Link
                  href="/fiyatlandirma"
                  className="flex min-h-[48px] items-center rounded-xl px-4 text-base text-zinc-400 active:bg-zinc-800"
                  onClick={() => setMobileOpen(false)}
                >
                  Fiyatlandırma
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
