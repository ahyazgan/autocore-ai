"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, Calculator, Sparkles, ShieldCheck, Image, Database, Zap, Wrench, ChevronDown, X, Menu } from "lucide-react";

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
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (hub: string) => {
    setOpenAccordion((prev) => (prev === hub ? null : hub));
  };

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // close mega menu when navigating
  useEffect(() => {
    setToolsOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="app-nav">
      <div className="app-nav-inner">
        {/* Logo */}
        <Link href="/" className="app-nav-logo">
          <div className="app-nav-logo-icon"><span>A</span></div>
          <span className="app-nav-logo-text">AutoCore <em>AI</em></span>
        </Link>

        {/* Desktop links */}
        <nav className="app-nav-links">
          <div
            className="app-nav-dropdown-wrap"
            onMouseLeave={() => setToolsOpen(false)}
          >
            <button
              type="button"
              className="app-nav-link app-nav-link-btn"
              onClick={() => setToolsOpen((o) => !o)}
              onMouseEnter={() => setToolsOpen(true)}
            >
              <Menu size={14} />
              Araçlar
              <ChevronDown size={12} className={toolsOpen ? "rotate-180" : ""} style={{ transition: "transform 0.15s" }} />
            </button>

            {toolsOpen && (
              <div className="app-mega-menu">
                <div className="app-mega-grid">
                  {MEGA_MENU_LINKS.map(({ hub, href, icon: Icon, tools }) => (
                    <div key={hub}>
                      <Link
                        href={href}
                        className="app-mega-hub"
                        onClick={() => setToolsOpen(false)}
                      >
                        <Icon size={13} />
                        {hub}
                      </Link>
                      <ul className="app-mega-list">
                        {tools.map(({ name, href: toolHref }) => (
                          <li key={toolHref}>
                            <Link
                              href={toolHref}
                              className="app-mega-link"
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
            )}
          </div>

          <Link className="app-nav-link" href="/araclar">Ücretsiz Araçlar</Link>
          <Link className="app-nav-link" href="/studio">Stüdyo</Link>
          <Link className="app-nav-link" href="/data">Veri</Link>
          <Link className="app-nav-link" href="/garage">Garaj</Link>
          <Link className="app-nav-link" href="/fiyatlandirma">Fiyatlar</Link>

          <button
            type="button"
            className="app-nav-search"
            onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
            aria-label="Ara (Ctrl+K)"
          >
            <Search size={14} />
            <span>Ara...</span>
            <kbd>⌘K</kbd>
          </button>

          <Link className="app-nav-cta" href="/araclar">Ücretsiz Başla</Link>
        </nav>

        {/* Mobile buttons */}
        <div className="app-nav-mobile-actions">
          <button
            type="button"
            className="app-nav-icon-btn"
            onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
            aria-label="Ara"
          >
            <Search size={20} />
          </button>
          <button
            type="button"
            className="app-nav-icon-btn"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            className="app-mobile-overlay"
            aria-hidden
            onClick={() => setMobileOpen(false)}
          />
          <div
            className="app-mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menü"
          >
            <div className="app-mobile-head">
              <Link href="/" className="app-nav-logo" onClick={() => setMobileOpen(false)}>
                <div className="app-nav-logo-icon"><span>A</span></div>
                <span className="app-nav-logo-text">AutoCore <em>AI</em></span>
              </Link>
              <button
                type="button"
                className="app-mobile-close"
                aria-label="Kapat"
                onClick={() => setMobileOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="app-mobile-body">
              <button
                type="button"
                className="app-mobile-search"
                onClick={() => {
                  setMobileOpen(false);
                  window.dispatchEvent(new CustomEvent("open-command-palette"));
                }}
              >
                <Search size={16} />
                Ara (Ctrl+K)
              </button>

              <nav className="app-mobile-nav">
                {MEGA_MENU_LINKS.map(({ hub, href, icon: Icon, tools }) => {
                  const isOpen = openAccordion === hub;
                  return (
                    <div key={hub} className="app-mobile-section">
                      <div className="app-mobile-section-head">
                        <Link
                          href={href}
                          className="app-mobile-hub"
                          onClick={() => setMobileOpen(false)}
                        >
                          <Icon size={18} />
                          {hub}
                        </Link>
                        <button
                          type="button"
                          className="app-mobile-chevron"
                          onClick={() => toggleAccordion(hub)}
                          aria-expanded={isOpen}
                        >
                          <ChevronDown size={18} className={isOpen ? "rotate-180" : ""} style={{ transition: "transform 0.15s" }} />
                        </button>
                      </div>
                      <div
                        className="app-mobile-tools"
                        style={{ maxHeight: isOpen ? `${tools.length * 52 + 16}px` : 0 }}
                      >
                        <ul>
                          {tools.map(({ name, href: toolHref }) => (
                            <li key={toolHref}>
                              <Link
                                href={toolHref}
                                className="app-mobile-tool-link"
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

              <div className="app-mobile-footer-links">
                <Link href="/rehber" className="app-mobile-extra-link" onClick={() => setMobileOpen(false)}>Rehber</Link>
                <Link href="/fiyatlandirma" className="app-mobile-extra-link" onClick={() => setMobileOpen(false)}>Fiyatlandırma</Link>
              </div>

              <Link href="/araclar" className="app-mobile-cta" onClick={() => setMobileOpen(false)}>
                Ücretsiz Başla →
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
