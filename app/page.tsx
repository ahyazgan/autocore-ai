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
    bg: "#f3f0f9", border: "#e2d9f3", icon: "🤖", title: "Yapay Zeka", tagBg: "#e2d9f3", tagColor: "#6d28d9", tag: "3 araç",
    tools: [
      { name: "Ekspertiz Çevirmen", href: "/yapay-zeka/ekspertiz", desc: "Raporu 8 sn'de analiz et" },
      { name: "Tramer SMS Dedektifi", href: "/yapay-zeka/tramer-okuyucu", desc: "Hasar geçmişini öğren" },
      { name: "İlan Dedektifi", href: "/yapay-zeka/ilan-dedektifi", desc: "Sahte ilanları tespit et" },
    ],
  },
  {
    bg: "#fdf0f3", border: "#f8d0da", icon: "📸", title: "Görsel Stüdyo", tagBg: "#f8d0da", tagColor: "#be123c", tag: "6 araç",
    tools: [
      { name: "Arka Plan Sil", href: "/studio/bg-remover", desc: "Profesyonel stüdyo arka planı" },
      { name: "360° Görüntü", href: "/studio/360-spin", desc: "İnteraktif araç turu" },
      { name: "Hasar Tespiti", href: "/studio/damage-detect", desc: "Fotoğraftan hasar bul" },
      { name: "Sanal Tuner", href: "/studio/virtual-tuner", desc: "Renk ve jant dene" },
      { name: "İlan Oluşturucu", href: "/studio/listing-gen", desc: "AI ile ilan yaz" },
      { name: "Reels Yapıcı", href: "/studio/reels-maker", desc: "Sosyal medya videosu" },
    ],
  },
  {
    bg: "#eff6ff", border: "#bfdbfe", icon: "🛡️", title: "Alıcı Araçları", tagBg: "#bfdbfe", tagColor: "#1d4ed8", tag: "7 araç",
    tools: [
      { name: "Ekspertiz Analizi", href: "/yapay-zeka/ekspertiz", desc: "AI rapor okuma" },
      { name: "Tramer Sorgulama", href: "/yapay-zeka/tramer-okuyucu", desc: "Hasar geçmişi" },
      { name: "İlan Kontrolü", href: "/yapay-zeka/ilan-dedektifi", desc: "Dolandırıcılık tespiti" },
      { name: "Şase No Çözücü", href: "/data/vin-decoder", desc: "VIN sorgulama" },
      { name: "Fiyat Kontrol", href: "/data/price-check", desc: "Piyasa karşılaştırma" },
      { name: "Limon Kontrol", href: "/data/lemon-check", desc: "Risk değerlendirmesi" },
      { name: "Dolandırıcılık Tespit", href: "/data/scam-detect", desc: "Sahte ilan analizi" },
    ],
  },
  {
    bg: "#f0fdf4", border: "#bbf7d0", icon: "💰", title: "Araç Sat", tagBg: "#bbf7d0", tagColor: "#15803d", tag: "3 araç",
    tools: [
      { name: "İlan Oluşturucu", href: "/studio/listing-gen", desc: "AI ile profesyonel ilan" },
      { name: "Arka Plan Sil", href: "/studio/bg-remover", desc: "Çekici fotoğraf" },
      { name: "Fiyat Kontrol", href: "/data/price-check", desc: "Doğru fiyat belirle" },
    ],
  },
  {
    bg: "#fff7ed", border: "#fed7aa", icon: "📊", title: "Finans & Veri", tagBg: "#fed7aa", tagColor: "#c2410c", tag: "5 araç",
    tools: [
      { name: "Toplam Sahip Olma Maliyeti", href: "/data/tco-calculator", desc: "5 yıllık maliyet" },
      { name: "Gelecek Değer", href: "/data/future-value", desc: "Değer kaybı tahmini" },
      { name: "İthalat Hesaplama", href: "/data/import-calc", desc: "Gümrük ve ÖTV" },
      { name: "Kredi Hesaplama", href: "/araclar/kredi-hesaplama", desc: "Aylık taksit" },
      { name: "ÖTV Hesaplama", href: "/araclar/otv-hesaplama", desc: "Vergi hesabı" },
    ],
  },
  {
    bg: "#f0fdf4", border: "#bbf7d0", icon: "🔧", title: "Garaj", tagBg: "#bbf7d0", tagColor: "#15803d", tag: "8 araç",
    tools: [
      { name: "Mekanik Asistan", href: "/garage/mechanic-ai", desc: "AI ile arıza tespiti" },
      { name: "OBD Kodları", href: "/garage/obd-codes", desc: "Arıza kodu sorgula" },
      { name: "Gösterge Işıkları", href: "/garage/dashboard-lights", desc: "Uyarı ışığı rehberi" },
      { name: "Yağ Bulucu", href: "/garage/oil-finder", desc: "Doğru motor yağı" },
      { name: "Lastik Hesaplama", href: "/garage/tire-calc", desc: "Boyut uyumluluk" },
      { name: "Radyo Kodu", href: "/garage/radio-code", desc: "Radyo kilidini aç" },
      { name: "Parça Çapraz Ref.", href: "/garage/part-cross-ref", desc: "Uyumlu parça bul" },
      { name: "Muayene Takvimi", href: "/garaj/muayene-takvimi", desc: "Muayene hatırlatıcı" },
    ],
  },
  {
    bg: "#f0f9ff", border: "#bae6fd", icon: "⚡", title: "Elektrikli Araç", tagBg: "#bae6fd", tagColor: "#0369a1", tag: "5 araç",
    tools: [
      { name: "Menzil Tahmini", href: "/ev/range-estimator", desc: "Gerçekçi menzil hesabı" },
      { name: "Şarj Maliyeti", href: "/ev/charging-cost", desc: "Ev vs halka açık" },
      { name: "Batarya Sağlığı", href: "/ev/battery-health", desc: "Batarya durumu analizi" },
      { name: "Tasarruf Hesaplama", href: "/ev/savings-calc", desc: "EV vs benzinli" },
    ],
  },
  {
    bg: "#fafaf9", border: "#e7e5e4", icon: "🏢", title: "Kurumsal", tagBg: "#e7e5e4", tagColor: "#44403c", tag: "4 araç",
    tools: [
      { name: "Fiyatlandırma", href: "/fiyatlandirma", desc: "Plan ve paketler" },
      { name: "Galeri Pro", href: "/fiyatlandirma", desc: "Sınırsız analiz" },
      { name: "API Erişimi", href: "/fiyatlandirma", desc: "Kendi sisteminize entegre" },
      { name: "Toplu Analiz", href: "/fiyatlandirma", desc: "Filo yönetimi" },
    ],
  },
];

const TRUST_ITEMS = [
  { label: "SSL ile güvenli", icon: "🔒" },
  { label: "İyzico ödeme", icon: "💳" },
  { label: "GPT-4 tabanlı", icon: "🤖" },
  { label: "KVKK uyumlu", icon: "📋" },
  { label: "4.9★ kullanıcı puanı", icon: "★" },
];

const HOW_STEPS = [
  { step: 1, title: "Yükle", desc: "Ekspertiz fotoğrafı, tramer SMS veya ilan linkini gir.", icon: "📤" },
  { step: 2, title: "Analiz", desc: "AI 8 saniyede raporu çevirir, riski hesaplar.", icon: "⚡" },
  { step: 3, title: "Karar ver", desc: "Anlaşılır özet ve tavsiyeyle güvenle al/sat.", icon: "✅" },
];

const TESTIMONIALS = [
  { name: "Mehmet K.", role: "İkinci el alıcı", text: "Ekspertiz raporunu anlamıyordum. 8 saniyede hem çeviri hem risk skoru geldi. Galericiden 15 bin TL indirdim.", rating: 5 },
  { name: "Ayşe Y.", role: "Galeri sahibi", text: "Müşterilere tramer raporunu anında gösteriyoruz. Güven arttı, satış süresi kısaldı.", rating: 5 },
  { name: "Can T.", role: "Araç sahibi", text: "Arabam ne eder ve OBD kodları tek yerden. Garaj uygulaması gibi her şey burada.", rating: 5 },
];

const COMPARISON_ROWS = [
  { feature: "Sonuç süresi", autocore: "8 saniye", physical: "1–3 gün" },
  { feature: "Maliyet", autocore: "İlk analiz ücretsiz", physical: "₺500–2000" },
  { feature: "Erişim", autocore: "7/24 online", physical: "Randevu gerekli" },
  { feature: "Tramer + fiyat", autocore: "Tek raporda", physical: "Ayrı hizmetler" },
  { feature: "İlan kontrolü", autocore: "Link ile anında", physical: "Yok" },
];

const FAQ_ITEMS = [
  { q: "İlk analiz gerçekten ücretsiz mi?", a: "Evet. Kayıt olduktan sonra 3 ücretsiz analiz hakkınız var. Kredi kartı gerekmez." },
  { q: "Ekspertiz raporu fotoğrafı yeterli mi?", a: "Evet. Raporun okunaklı fotoğrafını yüklemeniz yeterli. AI el yazısı ve farklı formatları da okuyabilir." },
  { q: "Tramer bilgisi nereden geliyor?", a: "Tramer SMS metnini yapıştırıyorsunuz; sistem hasar tutarlarını ve risk skorunu hesaplıyor. Veri sadece sizin girdiğiniz metinle sınırlıdır." },
  { q: "Ödeme güvenli mi?", a: "İyzico altyapısı kullanıyoruz. Ödeme bilgileriniz şifrelenir ve PCI DSS uyumludur." },
  { q: "KVKK uyumlu mu?", a: "Evet. Kişisel verileriniz KVKK kapsamında işlenir; detaylar için Gizlilik sayfamıza bakabilirsiniz." },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabId>("ekspertiz");
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [openCat, setOpenCat] = useState<string | null>(null);
  const [closingCat, setClosingCat] = useState(false);

  const closeSheet = () => {
    setClosingCat(true);
    setTimeout(() => { setOpenCat(null); setClosingCat(false); }, 220);
  };

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible"));
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".how-step, .testimonial-card").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

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
        <button
          type="button"
          className="nav-hamburger"
          aria-label="Menüyü aç"
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className="trust-bar">
        {TRUST_ITEMS.map((item) => (
          <span key={item.label} className="trust-item">
            <span className="trust-icon">{item.icon}</span>
            <span className="trust-label">{item.label}</span>
          </span>
        ))}
      </div>

      {/* Mobil menü drawer (sağdan açılır) */}
      <div
        className={`nav-drawer-overlay ${menuOpen ? "open" : ""}`}
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      />
      <div className={`nav-drawer ${menuOpen ? "open" : ""}`}>
        <div className="nav-drawer-header">
          <span className="nav-logo-text">AutoCore <em>AI</em></span>
          <button
            type="button"
            className="nav-drawer-close"
            aria-label="Menüyü kapat"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="nav-drawer-links">
          <Link className="nav-drawer-link" href="/yapay-zeka" onClick={() => setMenuOpen(false)}>Yapay Zeka</Link>
          <Link className="nav-drawer-link" href="/studio" onClick={() => setMenuOpen(false)}>Stüdyo</Link>
          <Link className="nav-drawer-link" href="/garage" onClick={() => setMenuOpen(false)}>Garaj</Link>
          <Link className="nav-drawer-link" href="/ev" onClick={() => setMenuOpen(false)}>EV</Link>
          <Link className="nav-drawer-link" href="/fiyatlandirma" onClick={() => setMenuOpen(false)}>Fiyatlar</Link>
          <Link className="nav-drawer-cta" href="/araclar" onClick={() => setMenuOpen(false)}>Ücretsiz Başla</Link>
        </div>
      </div>

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
              style={{ background: c.bg, borderColor: c.border, width: "100%", cursor: "pointer" }}
              onClick={() => setOpenCat(c.title)}
            >
              <span className="cat-icon">{c.icon}</span>
              <span className="cat-title">{c.title}</span>
              <span className="cat-tag" style={{ background: c.tagBg, color: c.tagColor }}>
                {c.tag}
              </span>
            </button>
          ))}
        </div>

        {/* Bottom Sheet */}
        {openCat && (() => {
          const cat = CATEGORIES.find((c) => c.title === openCat)!;
          return (
            <>
              <div
                className={`cat-sheet-backdrop${closingCat ? " closing" : ""}`}
                onClick={closeSheet}
              />
              <div className={`cat-sheet${closingCat ? " closing" : ""}`}>
                <div className="cat-sheet-handle" />
                <div className="cat-sheet-header">
                  <div className="cat-sheet-title">
                    <span className="cat-sheet-title-icon">{cat.icon}</span>
                    <span className="cat-sheet-title-text">{cat.title}</span>
                  </div>
                  <button type="button" className="cat-sheet-close" onClick={closeSheet}>✕</button>
                </div>
                <div className="cat-sheet-tools">
                  {cat.tools.map((t) => (
                    <Link key={t.href + t.name} href={t.href} className="cat-sheet-tool" onClick={closeSheet}>
                      <span className="cat-sheet-tool-name">{t.name}</span>
                      <span className="cat-sheet-tool-desc">{t.desc}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          );
        })()}
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

      {/* Nasıl Çalışır? — 3 adım */}
      <section className="how-section">
        <div className="section-head">
          <h2>Nasıl Çalışır?</h2>
          <p>3 adımda güvenli alım satım</p>
        </div>
        <div className="how-grid">
          {HOW_STEPS.map((s) => (
            <div key={s.step} className="how-step">
              <div className="how-step-num">{s.step}</div>
              <span className="how-step-icon">{s.icon}</span>
              <h3 className="how-step-title">{s.title}</h3>
              <p className="how-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Kullanıcı Yorumları */}
      <section className="testimonials-section">
        <div className="section-head">
          <h2>Kullanıcı Yorumları</h2>
          <p>Binlerce kullanıcı güvenle kullanıyor</p>
        </div>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-stars">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j}>★</span>
                ))}
              </div>
              <p className="testimonial-text">&ldquo;{t.text}&rdquo;</p>
              <div className="testimonial-meta">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Karşılaştırma tablosu */}
      <section className="compare-section">
        <div className="section-head">
          <h2>AutoCore AI vs Fiziksel Ekspertiz</h2>
          <p>Neden dijital analiz?</p>
        </div>
        <div className="compare-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Özellik</th>
                <th>AutoCore AI</th>
                <th>Fiziksel Ekspertiz</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={i}>
                  <td>{row.feature}</td>
                  <td className="compare-autocore">{row.autocore}</td>
                  <td className="compare-physical">{row.physical}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SSS / FAQ */}
      <section className="faq-section">
        <div className="section-head">
          <h2>Sıkça Sorulan Sorular</h2>
          <p>Merak ettikleriniz</p>
        </div>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`faq-item ${faqOpen === i ? "open" : ""}`}
            >
              <button
                type="button"
                className="faq-question"
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                aria-expanded={faqOpen === i}
              >
                {item.q}
                <span className="faq-icon" aria-hidden>+</span>
              </button>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
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
