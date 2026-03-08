"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import "./landing-page.css";

type TabId = "ekspertiz" | "tramer" | "ilan" | "vin";

const TAB_CONFIG: Record<
  TabId,
  { placeholder: string; btnText: string; href: string }
> = {
  ekspertiz: {
    placeholder: "Ekspertiz raporunun fotoğrafını yükle…",
    btnText: "Analiz Et",
    href: "/yapay-zeka/ekspertiz",
  },
  tramer: {
    placeholder: "Tramer SMS metnini buraya yapıştır…",
    btnText: "Analiz Et",
    href: "/yapay-zeka/tramer-okuyucu",
  },
  ilan: {
    placeholder: "Araç ilan linkini veya metnini gir…",
    btnText: "Kontrol Et",
    href: "/yapay-zeka/ilan-dedektifi",
  },
  vin: {
    placeholder: "Şase numarasını gir (17 karakter)…",
    btnText: "Sorgula",
    href: "/data/vin-decoder",
  },
};

const CATEGORIES = [
  {
    bg: "#f3f0f9",
    border: "#e2d9f3",
    icon: "🤖",
    title: "Yapay Zeka",
    tagBg: "#e2d9f3",
    tagColor: "#6d28d9",
    tag: "3 araç",
  },
  {
    bg: "#fdf0f3",
    border: "#f8d0da",
    icon: "📸",
    title: "Görsel Stüdyo",
    tagBg: "#f8d0da",
    tagColor: "#be123c",
    tag: "6 araç",
  },
  {
    bg: "#eff6ff",
    border: "#bfdbfe",
    icon: "🛡️",
    title: "Alıcı Araçları",
    tagBg: "#bfdbfe",
    tagColor: "#1d4ed8",
    tag: "7 araç",
  },
  {
    bg: "#f0fdf4",
    border: "#bbf7d0",
    icon: "💰",
    title: "Araç Sat",
    tagBg: "#bbf7d0",
    tagColor: "#15803d",
    tag: "3 araç",
  },
  {
    bg: "#fff7ed",
    border: "#fed7aa",
    icon: "📊",
    title: "Finans & Veri",
    tagBg: "#fed7aa",
    tagColor: "#c2410c",
    tag: "5 araç",
  },
  {
    bg: "#f0fdf4",
    border: "#bbf7d0",
    icon: "🔧",
    title: "Garaj",
    tagBg: "#bbf7d0",
    tagColor: "#15803d",
    tag: "8 araç",
  },
  {
    bg: "#f0f9ff",
    border: "#bae6fd",
    icon: "⚡",
    title: "Elektrikli Araç",
    tagBg: "#bae6fd",
    tagColor: "#0369a1",
    tag: "5 araç",
  },
  {
    bg: "#fafaf9",
    border: "#e7e5e4",
    icon: "🏢",
    title: "Kurumsal",
    tagBg: "#e7e5e4",
    tagColor: "#44403c",
    tag: "4 araç",
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabId>("ekspertiz");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            entry.target
              .querySelectorAll(".bar-fill")
              .forEach((bar: Element) => {
                const el = bar as HTMLElement;
                const w = el.dataset.w;
                if (w) el.style.width = w;
              });
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".demo-card").forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const tab = TAB_CONFIG[activeTab];

  return (
    <div className="landing" style={{ margin: 0, padding: 0 }}>
      <nav>
        <Link className="nav-logo" href="/">
          <div className="nav-logo-icon">
            <span>A</span>
          </div>
          <span className="nav-logo-text">
            AutoCore <em>AI</em>
          </span>
        </Link>
        <div className="nav-links">
          <Link className="nav-link" href="/yapay-zeka">
            Yapay Zeka
          </Link>
          <Link className="nav-link" href="/studio">
            Stüdyo
          </Link>
          <Link className="nav-link" href="/garage">
            Garaj
          </Link>
          <Link className="nav-link" href="/ev">
            EV
          </Link>
          <Link className="nav-link" href="/fiyatlandirma">
            Fiyatlar
          </Link>
          <Link className="nav-cta" href="/araclar">
            Ücretsiz Başla
          </Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-inner">
          <div className="badge fade-up">
            <span className="badge-dot" />
            Türkiye&apos;nin İlk AI Araç Platformu · 12.400+ Analiz
          </div>

          <h1 className="fade-up delay-1">
            Her 3 alıcıdan 1&apos;i
            <br />
            <span className="rust">fazla ödüyor.</span>
          </h1>

          <p className="hero-sub fade-up delay-2">
            Her 5 araçtan 1&apos;inde gizli hasar var. İlan fiyatları piyasanın
            %18 üzerinde.
            <br />
            AutoCore AI seni <strong>8 saniyede</strong> korur — al, sat, yönet.
          </p>

          <div className="search-wrap fade-up delay-3">
            <div className="search-box">
              <div className="tab-row">
                {(["ekspertiz", "tramer", "ilan", "vin"] as const).map(
                  (id) => (
                    <button
                      key={id}
                      type="button"
                      className={`tab-btn ${activeTab === id ? "active" : ""}`}
                      onClick={() => setActiveTab(id)}
                    >
                      {id === "ekspertiz"
                        ? "Ekspertiz"
                        : id === "tramer"
                          ? "Tramer SMS"
                          : id === "ilan"
                            ? "İlan"
                            : "VIN / Şase"}
                    </button>
                  )
                )}
              </div>
              <div className="search-row">
                <div className="search-input-wrap">
                  <input
                    className="search-input"
                    type="text"
                    placeholder={tab.placeholder}
                  />
                </div>
                <Link className="search-btn" href={tab.href}>
                  {tab.btnText}
                </Link>
              </div>
            </div>
          </div>

          <div className="chips fade-up delay-3">
            <span className="chips-label">Hızlı:</span>
            <Link className="chip" href="/data/price-check">
              Fiyat Kontrol
            </Link>
            <Link className="chip" href="/data/lemon-check">
              Limon Skoru
            </Link>
            <Link className="chip" href="/garaj/obd-kodlari">
              OBD Kodu
            </Link>
            <Link className="chip" href="/araclar/arabam-ne-eder">
              Arabam Ne Eder?
            </Link>
          </div>

          <div className="user-cards fade-up delay-4">
            <Link
              className="user-card"
              href="/yapay-zeka"
              style={{
                background: "#eff6ff",
                borderColor: "#bfdbfe",
              }}
            >
              <span className="user-card-icon">🛡️</span>
              <span className="user-card-title">Alıcıyım</span>
              <span className="user-card-sub" style={{ color: "#1d4ed8" }}>
                Dolandırılmadan al
              </span>
            </Link>
            <Link
              className="user-card"
              href="/studio"
              style={{
                background: "#f0fdf4",
                borderColor: "#bbf7d0",
              }}
            >
              <span className="user-card-icon">💰</span>
              <span className="user-card-title">Satıcıyım</span>
              <span className="user-card-sub" style={{ color: "#15803d" }}>
                En iyi fiyata sat
              </span>
            </Link>
            <Link
              className="user-card"
              href="/garage"
              style={{
                background: "#fff7ed",
                borderColor: "#fed7aa",
              }}
            >
              <span className="user-card-icon">🔧</span>
              <span className="user-card-title">Araç Sahibiyim</span>
              <span className="user-card-sub" style={{ color: "#c2410c" }}>
                Aracını iyi yönet
              </span>
            </Link>
            <Link
              className="user-card"
              href="/fiyatlandirma"
              style={{
                background: "#faf5ff",
                borderColor: "#e9d5ff",
              }}
            >
              <span className="user-card-icon">🏢</span>
              <span className="user-card-title">Galeriyim</span>
              <span className="user-card-sub" style={{ color: "#7c3aed" }}>
                Filo &amp; Pro araçlar
              </span>
            </Link>
          </div>

          <div className="stats fade-up delay-5">
            <div className="stat">
              <div className="stat-val" style={{ color: "#0a0a0f" }}>
                12.4K+
              </div>
              <div className="stat-label">Analiz Yapıldı</div>
            </div>
            <div className="stat">
              <div className="stat-val" style={{ color: "#c8410a" }}>
                ₺48M
              </div>
              <div className="stat-label">Kurtarılan Para</div>
            </div>
            <div className="stat">
              <div className="stat-val" style={{ color: "#0a0a0f" }}>
                4.9 ★
              </div>
              <div className="stat-label">Kullanıcı Puanı</div>
            </div>
            <div className="stat">
              <div className="stat-val" style={{ color: "#0a0a0f" }}>
                &lt;8sn
              </div>
              <div className="stat-label">Analiz Süresi</div>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="section-head">
          <h2>Her ihtiyacın için bir araç</h2>
          <p>50+ özellik, 8 kategori — hepsi tek platformda</p>
        </div>
        <div className="cat-grid">
          {CATEGORIES.map((c) => (
            <button
              key={c.title}
              type="button"
              className="cat-card"
              style={{
                background: c.bg,
                borderColor: c.border,
              }}
            >
              <span className="cat-icon">{c.icon}</span>
              <span className="cat-title">{c.title}</span>
              <span
                className="cat-tag"
                style={{ background: c.tagBg, color: c.tagColor }}
              >
                {c.tag}
              </span>
            </button>
          ))}
        </div>
        <div className="features-more">
          <Link href="/araclar">Tüm 50+ özelliği gör →</Link>
        </div>
      </section>

      <section className="demos">
        <div className="section-head">
          <h2>Gerçek analiz örnekleri</h2>
          <p>AI&apos;ın gerçek araçlar üzerinde ürettiği raporlar</p>
        </div>
        <div className="demo-grid">
          <div className="demo-card">
            <div className="demo-body">
              <div className="demo-header">
                <div>
                  <div className="demo-label">Ekspertiz</div>
                  <div className="demo-title">2021 Toyota Corolla</div>
                  <div className="demo-sub">42.000 km · İstanbul</div>
                </div>
                <span
                  className="badge-status"
                  style={{
                    background: "#edfaf2",
                    color: "#15803d",
                    borderColor: "#bbf7d0",
                  }}
                >
                  <span
                    className="badge-dot-sm"
                    style={{ background: "#22c55e" }}
                  />
                  {" "}
                  GÜVENLİ
                </span>
              </div>
              <div className="bar-row">
                <div className="bar-label">
                  <span>Genel Skor</span>
                  <span style={{ color: "#15803d", fontWeight: 700 }}>
                    94/100
                  </span>
                </div>
                <div
                  className="bar-track"
                  style={{ background: "#f0fdf4" }}
                >
                  <div
                    className="bar-fill"
                    style={{ background: "#22c55e", width: 0 }}
                    data-w="94%"
                  />
                </div>
              </div>
              <div className="bar-row">
                <div className="bar-label">
                  <span>Tramer Riski</span>
                  <span style={{ color: "#15803d", fontWeight: 700 }}>
                    Temiz
                  </span>
                </div>
                <div
                  className="bar-track"
                  style={{ background: "#f0fdf4" }}
                >
                  <div
                    className="bar-fill"
                    style={{ background: "#22c55e", width: 0 }}
                    data-w="5%"
                  />
                </div>
              </div>
              <div className="check-list">
                <div className="check-item">
                  <span style={{ color: "#22c55e", fontWeight: 700 }}>✓</span>
                  <span>Orijinal boya %100, tramer kaydı yok</span>
                </div>
                <div className="check-item">
                  <span style={{ color: "#22c55e", fontWeight: 700 }}>✓</span>
                  <span>Km tutarlılığı doğrulandı</span>
                </div>
              </div>
            </div>
            <div
              className="demo-footer"
              style={{
                background: "#edfaf2",
                borderColor: "#c3edd4",
                color: "#15803d",
              }}
            >
              💡 Güvenle satın alabilirsin.
            </div>
          </div>

          <div className="demo-card demo-card-risk">
            <div className="demo-body">
              <div className="demo-header">
                <div>
                  <div className="demo-label">Tramer SMS</div>
                  <div className="demo-title">2019 BMW 3 Serisi</div>
                  <div className="demo-sub">89.000 km · Ankara</div>
                </div>
                <span
                  className="badge-status"
                  style={{
                    background: "#fef0eb",
                    color: "#c8410a",
                    borderColor: "#f8d5c4",
                  }}
                >
                  <span
                    className="badge-dot-sm"
                    style={{
                      background: "#c8410a",
                      animation: "landing-pulse 1.5s infinite",
                    }}
                  />
                  {" "}
                  RİSK
                </span>
              </div>
              <div className="mono-block">
                Sol ön kanat: <strong style={{ color: "#c8410a" }}>₺3.200</strong>
                <br />
                Ön tampon: <strong style={{ color: "#b45309" }}>₺1.800</strong>
                <br />
                Motor kaputu: <strong style={{ color: "#c8410a" }}>₺5.400</strong>
              </div>
              <div className="bar-row">
                <div className="bar-label">
                  <span>Risk Skoru</span>
                  <span style={{ color: "#c8410a", fontWeight: 700 }}>
                    Yüksek
                  </span>
                </div>
                <div
                  className="bar-track"
                  style={{ background: "#fef0eb" }}
                >
                  <div
                    className="bar-fill"
                    style={{ background: "#c8410a", width: 0 }}
                    data-w="82%"
                  />
                </div>
              </div>
              <div className="check-list">
                <div className="check-item">
                  <span style={{ color: "#c8410a", fontWeight: 700 }}>!</span>
                  <span>Motor kaputu trameri ciddi kaza işareti</span>
                </div>
                <div className="check-item">
                  <span style={{ color: "#b45309", fontWeight: 700 }}>!</span>
                  <span>Toplam ₺10.400 — değerin %14&apos;ü</span>
                </div>
              </div>
            </div>
            <div
              className="demo-footer"
              style={{
                background: "#fef0eb",
                borderColor: "#f8d5c4",
                color: "#c8410a",
              }}
            >
              💡 Max ₺485.000 teklif ver veya vazgeç.
            </div>
          </div>

          <div className="demo-card">
            <div className="demo-body">
              <div className="demo-header">
                <div>
                  <div className="demo-label">İlan Dedektifi</div>
                  <div className="demo-title">2020 VW Passat</div>
                  <div className="demo-sub">115.000 km · İzmir</div>
                </div>
                <span
                  className="badge-status"
                  style={{
                    background: "#fef8ec",
                    color: "#b45309",
                    borderColor: "#f5e3b3",
                  }}
                >
                  <span
                    className="badge-dot-sm"
                    style={{ background: "#f59e0b" }}
                  />
                  {" "}
                  UYARI
                </span>
              </div>
              <div className="bar-row">
                <div className="bar-label">
                  <span>Genel Skor</span>
                  <span style={{ color: "#b45309", fontWeight: 700 }}>
                    61/100
                  </span>
                </div>
                <div
                  className="bar-track"
                  style={{ background: "#fffbeb" }}
                >
                  <div
                    className="bar-fill"
                    style={{ background: "#f59e0b", width: 0 }}
                    data-w="61%"
                  />
                </div>
              </div>
              <div className="bar-row">
                <div className="bar-label">
                  <span>Fiyat Analizi</span>
                  <span style={{ color: "#b45309", fontWeight: 700 }}>
                    %18 Pahalı
                  </span>
                </div>
                <div
                  className="bar-track"
                  style={{ background: "#fffbeb" }}
                >
                  <div
                    className="bar-fill"
                    style={{ background: "#f59e0b", width: 0 }}
                    data-w="72%"
                  />
                </div>
              </div>
              <div className="check-list">
                <div className="check-item">
                  <span style={{ color: "#f59e0b", fontWeight: 700 }}>!</span>
                  <span>Fiyat piyasa ortalamasının %18 üzerinde</span>
                </div>
                <div className="check-item">
                  <span style={{ color: "#f59e0b", fontWeight: 700 }}>!</span>
                  <span>Km tutarsızlığı tespit edildi</span>
                </div>
              </div>
            </div>
            <div
              className="demo-footer"
              style={{
                background: "#fef8ec",
                borderColor: "#f5e3b3",
                color: "#b45309",
              }}
            >
              💡 Önce ekspertiz, max ₺1.050.000 teklif.
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>
          İlk analizin <em>ücretsiz.</em>
        </h2>
        <p>Kayıt ol, hemen kullan. Kredi kartı gerekmez.</p>
        <div className="cta-btns">
          <Link className="cta-primary" href="/araclar">
            Ücretsiz Başla →
          </Link>
          <Link className="cta-secondary" href="/araclar">
            Araçları Keşfet
          </Link>
        </div>
        <p className="cta-note">
          Her yeni üye için 3 ücretsiz analiz · İyzico güvenceli ödeme
        </p>
      </section>

      <footer>
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link
                className="nav-logo"
                href="/"
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "8px",
                    background: "rgba(245,243,238,.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 900,
                      fontSize: "13px",
                      color: "#c8410a",
                    }}
                  >
                    A
                  </span>
                </div>
                <span
                    style={{
                      fontWeight: 800,
                      fontSize: "14px",
                      color: "rgba(245,243,238,.9)",
                    }}
                >
                  AutoCore <span style={{ color: "#c8410a" }}>AI</span>
                </span>
              </Link>
              <p>
                Türkiye&apos;nin ilk yapay zeka destekli ikinci el araç koruma
                platformu.
              </p>
              <div className="socials">
                <a className="social-btn" href="https://x.com" target="_blank" rel="noopener noreferrer">
                  𝕏
                </a>
                <a className="social-btn" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  in
                </a>
                <a className="social-btn" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  📸
                </a>
                <a className="social-btn" href="mailto:info@autocore.ai">
                  ✉
                </a>
              </div>
            </div>
            <div className="footer-col">
              <h4>Yapay Zeka</h4>
              <ul>
                <li>
                  <Link href="/yapay-zeka/ekspertiz">Ekspertiz Çevirmen</Link>
                </li>
                <li>
                  <Link href="/yapay-zeka/tramer-okuyucu">Tramer Dedektifi</Link>
                </li>
                <li>
                  <Link href="/yapay-zeka/ilan-dedektifi">İlan Dedektifi</Link>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Araçlar</h4>
              <ul>
                <li>
                  <Link href="/araclar/arabam-ne-eder">Arabam Ne Eder?</Link>
                </li>
                <li>
                  <Link href="/araclar/otv-hesaplama">ÖTV Hesaplama</Link>
                </li>
                <li>
                  <Link href="/data/price-check">Fiyat Kontrol</Link>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Garaj &amp; EV</h4>
              <ul>
                <li>
                  <Link href="/garaj/obd-kodlari">OBD Kod Analizi</Link>
                </li>
                <li>
                  <Link href="/ev/menzil-tahmini">Menzil Tahmini</Link>
                </li>
                <li>
                  <Link href="/ev/sarj-maliyet">Şarj Maliyeti</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 AutoCore AI — Tüm hakları saklıdır</p>
            <div className="footer-bottom-links">
              <Link href="/gizlilik">Gizlilik</Link>
              <Link href="/kosullar">Kullanım Koşulları</Link>
              <Link href="/fiyatlandirma">Fiyatlandırma</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
