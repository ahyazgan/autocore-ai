"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  {
    id: "ai", icon: "🤖", title: "Yapay Zeka",
    desc: "Ekspertiz okuma, tramer dedektifi, ilan yalan dedektifi",
    bg: "#f3f0f9", border: "#e2d9f3", tagBg: "#e2d9f3", tagColor: "#6d28d9", count: 3,
    features: [
      { icon: "📄", name: "Ekspertiz Raporu Çevirmen", desc: "Fotoğraf yükle, GPT-4o okusun — motor sağlık skoru + hasar tespiti", tag: "Fotoğraf", href: "/yapay-zeka/ekspertiz" },
      { icon: "💬", name: "Tramer SMS Dedektifi", desc: "SMS ekranını yapıştır, toplam hasar + tarih analizi saniyeler içinde", tag: "SMS", href: "/yapay-zeka/tramer-okuyucu" },
      { icon: "🚩", name: "İlan Yalan Dedektifi", desc: "İlan metnini gir, kırmızı bayrak + yeşil puan raporu al", tag: "Metin", href: "/yapay-zeka/ilan-dedektifi" },
    ],
  },
  {
    id: "studio", icon: "📸", title: "Görsel Stüdyo",
    desc: "BG kaldırma, 360° görünüm, hasar tespit, Reels yapıcı",
    bg: "#fdf0f3", border: "#f8d0da", tagBg: "#f8d0da", tagColor: "#be123c", count: 6,
    features: [
      { icon: "🖼️", name: "BG Kaldırıcı", desc: "Araç fotoğrafından arka planı sil", tag: "Foto", href: "/studio/bg-remover" },
      { icon: "🔄", name: "360° Dönüş", desc: "Çoklu fotoğraftan interaktif 360° araç görünümü", tag: "Çoklu", href: "/studio/360-spin" },
      { icon: "🔍", name: "Hasar Tespit AI", desc: "Fotoğraftan hasar bölgelerini otomatik tespit et", tag: "AI", href: "/studio/damage-detect" },
      { icon: "🎨", name: "Sanal Tuner", desc: "Araç rengini sanal olarak değiştir", tag: "Eğlence", href: "/studio/virtual-tuner" },
      { icon: "🖼️", name: "İlan Görseli", desc: "Profesyonel ilan görseli hazırla", tag: "Satış", href: "/studio/listing-gen" },
      { icon: "🎬", name: "Reels Yapıcı", desc: "Sosyal medya satış videosu oluştur", tag: "Video", href: "/studio/reels-maker" },
    ],
  },
  {
    id: "buyer", icon: "🛡️", title: "Alıcı Araçları",
    desc: "Scam tespit, limon skoru, fiyat kontrol, kredi hesaplama",
    bg: "#eff6ff", border: "#bfdbfe", tagBg: "#bfdbfe", tagColor: "#1d4ed8", count: 7,
    features: [
      { icon: "⚠️", name: "Kronik Sorun Dedektifi", desc: "Marka & model bazlı bilinen arızalar", tag: "Veri", href: "/araclar/kronik-sorunlar" },
      { icon: "🔢", name: "VIN / Şase Çözücü", desc: "Şase numarasından araç geçmişi", tag: "Sorgu", href: "/data/vin-decoder" },
      { icon: "💲", name: "Fiyat Kontrol", desc: "Piyasayla karşılaştır, pahalı mı?", tag: "Anlık", href: "/data/price-check" },
      { icon: "🚨", name: "Scam Tespit", desc: "Dolandırıcılık belirtilerini yakala", tag: "AI", href: "/data/scam-detect" },
      { icon: "🍋", name: "Limon Kontrol", desc: "Kapsamlı risk skoru", tag: "Risk", href: "/data/lemon-check" },
      { icon: "🏦", name: "Kredi Hesaplama", desc: "Faiz, vade, aylık taksit", tag: "Finans", href: "/araclar/kredi-hesaplama" },
      { icon: "🧾", name: "ÖTV Hesaplama", desc: "2025 güncel ÖTV oranlarıyla net fiyat", tag: "2025", href: "/araclar/otv-hesaplama" },
    ],
  },
  {
    id: "seller", icon: "💰", title: "Araç Sat",
    desc: "Arabam ne eder, TCO hesaplama, gelecek değer tahmini",
    bg: "#f0fdf4", border: "#bbf7d0", tagBg: "#bbf7d0", tagColor: "#15803d", count: 3,
    features: [
      { icon: "📊", name: "Arabam Ne Eder?", desc: "Güncel piyasaya göre gerçek değerin", tag: "Anlık", href: "/araclar/arabam-ne-eder" },
      { icon: "🧮", name: "TCO Hesaplama", desc: "Toplam sahip olma maliyeti", tag: "Detaylı", href: "/data/tco-calculator" },
      { icon: "📈", name: "Gelecek Değer", desc: "3–5 yıl sonraki tahmini değer", tag: "Tahmin", href: "/data/future-value" },
    ],
  },
  {
    id: "finance", icon: "📊", title: "Finans & Veri",
    desc: "İthalat hesaplama, değer kaybı, sahip olma maliyeti",
    bg: "#fff7ed", border: "#fed7aa", tagBg: "#fed7aa", tagColor: "#c2410c", count: 5,
    features: [
      { icon: "✈️", name: "İthalat Hesaplama", desc: "Yurt dışından araç getirme maliyeti", tag: "Gümrük", href: "/data/import-calc" },
      { icon: "📉", name: "Değer Kaybı", desc: "Yıllık değer kaybı ve projeksiyon", tag: "Grafik", href: "/data/future-value" },
      { icon: "💳", name: "Toplam Sahip Olma", desc: "Sigorta, yakıt, bakım dahil maliyet", tag: "Kapsamlı", href: "/data/tco-calculator" },
      { icon: "🍋", name: "Limon Kontrol", desc: "Araç sorunlu mu? Risk skoru al", tag: "Risk", href: "/data/lemon-check" },
      { icon: "🚨", name: "Dolandırıcı Tespit", desc: "İlanda sahte işaretleri yakala", tag: "AI", href: "/data/scam-detect" },
    ],
  },
  {
    id: "garage", icon: "🔧", title: "Garaj",
    desc: "OBD kodları, bakım rehberi, mechanic AI",
    bg: "#f0fdf4", border: "#bbf7d0", tagBg: "#bbf7d0", tagColor: "#15803d", count: 8,
    features: [
      { icon: "🔌", name: "OBD Kod Analizi", desc: "Arıza kodunu gir, AI açıklasın", tag: "AI", href: "/garaj/obd-kodlari" },
      { icon: "🚗", name: "Gösterge Işıkları", desc: "Kontrol lambası ne anlama geliyor?", tag: "Rehber", href: "/garaj/gosterge-isiklari" },
      { icon: "📅", name: "Bakım Rehberi", desc: "Km bazlı bakım takvimi", tag: "Planlama", href: "/garaj/bakim-rehberi" },
      { icon: "🔩", name: "Mechanic AI", desc: "Araç sorununu AI'a anlat", tag: "Chat", href: "/garage/mechanic-ai" },
      { icon: "🛢️", name: "Yağ Bulucu", desc: "Motorun için doğru yağı bul", tag: "Veri", href: "/garage/oil-finder" },
      { icon: "📻", name: "Radyo Kodu", desc: "Pil sonrası radyo kodunu bul", tag: "Sorgu", href: "/garage/radio-code" },
      { icon: "🔄", name: "Parça Karşılaştırma", desc: "Muadil / OEM parça sorgula", tag: "Veri", href: "/garage/part-cross-ref" },
      { icon: "🚨", name: "Muayene Takvimi", desc: "TÜVTÜRK randevu ve takvim", tag: "Takvim", href: "/garaj/muayene-takvimi" },
    ],
  },
  {
    id: "ev", icon: "⚡", title: "Elektrikli Araç",
    desc: "Menzil tahmini, şarj maliyeti, batarya sağlığı",
    bg: "#f0f9ff", border: "#bae6fd", tagBg: "#bae6fd", tagColor: "#0369a1", count: 5,
    features: [
      { icon: "🗺️", name: "Menzil Tahmini", desc: "Güzergah + hava + yük bazlı menzil", tag: "Hesap", href: "/ev/menzil-tahmini" },
      { icon: "⚡", name: "Şarj Maliyeti", desc: "AC / DC şarj maliyet karşılaştırması", tag: "₺", href: "/ev/sarj-maliyet" },
      { icon: "🔋", name: "Batarya Sağlığı", desc: "Batarya kapasitesi ve yıpranma analizi", tag: "Sağlık", href: "/ev/battery-health" },
      { icon: "💰", name: "EV Tasarruf Hesabı", desc: "Benzinli vs elektrikli 5 yıllık maliyet", tag: "Karşılaştır", href: "/ev/savings-calc" },
      { icon: "🔌", name: "Şarj İstasyonları", desc: "Türkiye şarj noktaları haritası", tag: "Harita", href: "/ev/charging-cost" },
    ],
  },
  {
    id: "corporate", icon: "🏢", title: "Kurumsal",
    desc: "Galeri Pro paneli, filo yönetimi, white-label API",
    bg: "#fafaf9", border: "#e7e5e4", tagBg: "#e7e5e4", tagColor: "#44403c", count: 4,
    features: [
      { icon: "🏪", name: "Galeri Pro Paneli", desc: "Toplu ilan analizi ve filo takibi", tag: "Pro", href: "/dashboard" },
      { icon: "🚌", name: "Filo Yönetimi", desc: "Araç filosunu tek panelden yönet", tag: "Fleet", href: "/dashboard" },
      { icon: "🔗", name: "White-label API", desc: "Kendi platformuna entegre et", tag: "API", href: "/fiyatlandirma" },
      { icon: "📊", name: "CRM & Raporlama", desc: "Müşteri ve satış takibi", tag: "CRM", href: "/dashboard" },
    ],
  },
];

type Tab = "ekspertiz" | "tramer" | "ilan" | "vin";
const TABS: Tab[] = ["ekspertiz", "tramer", "ilan", "vin"];
const TAB_CONFIG: Record<Tab, { label: string; placeholder: string; btn: string; href: string }> = {
  ekspertiz: { label: "Ekspertiz", placeholder: "Ekspertiz raporunun fotoğrafını yükle…", btn: "Analiz Et", href: "/yapay-zeka/ekspertiz" },
  tramer:    { label: "Tramer SMS", placeholder: "Tramer SMS metnini buraya yapıştır…",  btn: "Analiz Et", href: "/yapay-zeka/tramer-okuyucu" },
  ilan:      { label: "İlan",       placeholder: "Araç ilan linkini veya metnini gir…",   btn: "Kontrol Et", href: "/yapay-zeka/ilan-dedektifi" },
  vin:       { label: "VIN / Şase", placeholder: "Şase numarasını gir (17 karakter)…",    btn: "Sorgula",   href: "/data/vin-decoder" },
};

const TRUST_LOGOS = [
  { name: "sahibinden.com", abbr: "SHB" },
  { name: "arabam.com",     abbr: "ARB" },
  { name: "tramer",         abbr: "TRM" },
  { name: "TÜVTÜRK",        abbr: "TÜV" },
  { name: "Garanti BBVA",   abbr: "GBB" },
];

function FeatureModal({ cat, onClose }: { cat: typeof CATEGORIES[0]; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0" style={{ background: "rgba(10,10,15,.55)", backdropFilter: "blur(4px)" }} />
      <motion.div
        className="relative w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl overflow-hidden"
        style={{ background: "white", maxHeight: "85vh" }}
        initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
        transition={{ type: "spring", stiffness: 340, damping: 30 }}
        onClick={e => e.stopPropagation()}
      >
        {/* drag handle */}
        <div className="flex justify-center pt-3 sm:hidden">
          <div className="w-10 h-1 rounded-full" style={{ background: "rgba(10,10,15,.15)" }} />
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "rgba(10,10,15,.08)" }}>
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{cat.icon}</span>
            <div>
              <h3 className="font-bold text-sm" style={{ color: "#0a0a0f" }}>{cat.title}</h3>
              <p className="text-xs" style={{ color: "#7a736c" }}>{cat.count} araç mevcut</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-lg leading-none"
            style={{ background: "#f5f3ee", color: "#7a736c" }}
          >×</button>
        </div>
        <div className="p-3 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-2" style={{ maxHeight: "calc(85vh - 80px)" }}>
          {cat.features.map(f => (
            <Link key={f.href} href={f.href} onClick={onClose}
              className="flex items-start gap-3 rounded-xl p-3 transition-all hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: cat.bg, border: `1px solid ${cat.border}` }}>
              <span className="text-xl shrink-0 mt-0.5">{f.icon}</span>
              <div className="min-w-0">
                <p className="font-semibold text-xs leading-tight" style={{ color: "#0a0a0f" }}>{f.name}</p>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "#7a736c" }}>{f.desc}</p>
                <span className="inline-block mt-1.5 text-xs font-bold px-1.5 py-0.5 rounded"
                  style={{ background: cat.tagBg, color: cat.tagColor }}>{f.tag}</span>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>("ekspertiz");
  const [openModal, setOpenModal] = useState<string | null>(null);
  const activeCat = CATEGORIES.find(c => c.id === openModal) ?? null;

  return (
    <div style={{ background: "#f5f3ee", color: "#0a0a0f" }}>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div style={{
            position: "absolute", top: "-10%", left: "60%",
            width: "600px", height: "600px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200,65,10,.07) 0%, transparent 70%)",
            transform: "translateX(-50%)",
          }} />
          <div style={{
            position: "absolute", bottom: "5%", left: "10%",
            width: "400px", height: "400px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(109,40,217,.05) 0%, transparent 70%)",
          }} />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">

          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
            style={{ border: "1px solid rgba(200,65,10,.28)", background: "rgba(200,65,10,.07)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#c8410a" }} />
            <span className="text-xs font-semibold tracking-wide" style={{ color: "#c8410a" }}>
              Türkiye&apos;nin İlk AI Araç Platformu · 12.400+ Analiz
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="font-black tracking-tight mb-5"
            style={{ fontSize: "clamp(34px,5.8vw,76px)", lineHeight: 1.04, fontFamily: "var(--font-inter)" }}
          >
            Her 3 alıcıdan 1&apos;i<br />
            <span style={{ color: "#c8410a" }}>fazla ödüyor.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.17 }}
            className="max-w-2xl mx-auto mb-3 font-medium"
            style={{ fontSize: "clamp(14px,1.7vw,19px)", color: "#7a736c", lineHeight: 1.7 }}
          >
            Her 5 araçtan 1&apos;inde gizli hasar var. İlan fiyatları piyasanın %18 üzerinde.<br className="hidden sm:block" />
            AutoCore AI seni <strong style={{ color: "#0a0a0f" }}>8 saniyede</strong> korur — al, sat, yönet.
          </motion.p>

          {/* ── Smart Search Box ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="max-w-2xl mx-auto mb-5"
          >
            <div className="bg-white rounded-2xl p-2"
              style={{ boxShadow: "0 12px 48px rgba(10,10,15,.11)", border: "1px solid rgba(10,10,15,.07)" }}>
              {/* Tab pills */}
              <div className="flex gap-0.5 mb-2 p-1 rounded-xl" style={{ background: "#f5f3ee" }}>
                {TABS.map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className="flex-1 text-xs font-semibold py-1.5 px-2 rounded-lg transition-all"
                    style={activeTab === tab
                      ? { background: "#0a0a0f", color: "#f5f3ee" }
                      : { background: "transparent", color: "#7a736c" }}>
                    {TAB_CONFIG[tab].label}
                  </button>
                ))}
              </div>
              {/* Input row */}
              <div className="flex items-center gap-2 px-1 pb-1">
                <div className="flex-1 flex items-center rounded-xl px-3 py-2.5" style={{ background: "#f5f3ee" }}>
                  <input
                    type="text"
                    placeholder={TAB_CONFIG[activeTab].placeholder}
                    className="flex-1 bg-transparent text-xs outline-none font-medium"
                    style={{ color: "#0a0a0f" }}
                  />
                </div>
                <Link href={TAB_CONFIG[activeTab].href}
                  className="font-bold text-xs px-4 py-2.5 rounded-xl transition-all whitespace-nowrap text-white hover:-translate-y-0.5 hover:opacity-90"
                  style={{ background: "#c8410a" }}>
                  {TAB_CONFIG[activeTab].btn}
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Quick chips */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.33 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-12"
          >
            <span className="text-xs" style={{ color: "#7a736c" }}>Hızlı erişim:</span>
            {[
              { label: "Fiyat Kontrol", href: "/data/price-check" },
              { label: "Limon Skoru",   href: "/data/lemon-check" },
              { label: "OBD Kodu",      href: "/garaj/obd-kodlari" },
              { label: "Arabam Ne Eder?", href: "/araclar/arabam-ne-eder" },
            ].map(chip => (
              <Link key={chip.label} href={chip.href}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all bg-white hover:-translate-y-0.5 hover:shadow-sm"
                style={{ borderColor: "rgba(10,10,15,.12)", color: "#0a0a0f" }}>
                {chip.label}
              </Link>
            ))}
          </motion.div>

          {/* User-type cards */}
          <motion.div
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-10"
          >
            {[
              { icon: "🛡️", title: "Alıcıyım",       sub: "Dolandırılmadan al",    href: "/yapay-zeka",    bg: "#eff6ff", border: "#bfdbfe", accent: "#1d4ed8" },
              { icon: "💰", title: "Satıcıyım",      sub: "En iyi fiyata sat",      href: "/studio",        bg: "#f0fdf4", border: "#bbf7d0", accent: "#15803d" },
              { icon: "🔧", title: "Araç Sahibiyim", sub: "Aracını iyi yönet",      href: "/garaj",         bg: "#fff7ed", border: "#fed7aa", accent: "#c2410c" },
              { icon: "🏢", title: "Galeriyim",      sub: "Filo & Pro araçlar",     href: "/fiyatlandirma", bg: "#faf5ff", border: "#e9d5ff", accent: "#7c3aed" },
            ].map((card, i) => (
              <motion.div key={card.title}
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 + i * 0.07, type: "spring", stiffness: 300, damping: 24 }}
                whileHover={{ y: -5, boxShadow: "0 14px 32px rgba(10,10,15,.11)" }}
                whileTap={{ scale: 0.97 }}
              >
                <Link href={card.href}
                  className="flex flex-col items-center text-center rounded-2xl p-4 transition-all block h-full"
                  style={{ background: card.bg, border: `1px solid ${card.border}` }}>
                  <span className="text-2xl mb-2">{card.icon}</span>
                  <span className="font-bold text-sm leading-tight" style={{ color: "#0a0a0f" }}>{card.title}</span>
                  <span className="text-xs mt-1 font-medium" style={{ color: card.accent }}>{card.sub}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.54 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-xl mx-auto"
          >
            {[
              { val: "12.4K+", label: "Analiz Yapıldı",  color: "#0a0a0f" },
              { val: "₺48M",   label: "Kurtarılan Para", color: "#c8410a" },
              { val: "4.9 ★",  label: "Kullanıcı Puanı", color: "#0a0a0f" },
              { val: "<8sn",   label: "Analiz Süresi",   color: "#0a0a0f" },
            ].map(s => (
              <motion.div key={s.label}
                whileHover={{ y: -2 }}
                className="bg-white rounded-xl p-3 text-center"
                style={{ border: "1px solid rgba(10,10,15,.07)", boxShadow: "0 2px 8px rgba(10,10,15,.04)" }}>
                <div className="font-black tracking-tight"
                  style={{ fontSize: "clamp(17px,2.2vw,23px)", color: s.color, fontFamily: "var(--font-inter)" }}>
                  {s.val}
                </div>
                <div className="text-xs mt-0.5 font-medium" style={{ color: "#7a736c" }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TRUST LOGOS ── */}
      <section className="py-5 px-4 border-t border-b" style={{ borderColor: "rgba(10,10,15,.07)", background: "white" }}>
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-6">
          <span className="text-xs font-medium" style={{ color: "#7a736c" }}>Entegrasyon & Veri kaynakları:</span>
          {TRUST_LOGOS.map(l => (
            <div key={l.name} className="flex items-center gap-1.5 opacity-50 hover:opacity-80 transition-opacity">
              <div className="w-6 h-6 rounded flex items-center justify-center text-xs font-black"
                style={{ background: "#f5f3ee", color: "#0a0a0f" }}>{l.abbr.slice(0,2)}</div>
              <span className="text-xs font-semibold" style={{ color: "#0a0a0f" }}>{l.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <motion.span
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="inline-block text-xs font-bold uppercase tracking-widest mb-2 px-3 py-1 rounded-full"
              style={{ background: "#f5f3ee", color: "#c8410a" }}
            >Platformu Keşfet</motion.span>
            <h2 className="text-xl sm:text-2xl font-extrabold mb-1.5" style={{ color: "#0a0a0f" }}>
              Her ihtiyacın için bir araç
            </h2>
            <p className="text-sm" style={{ color: "#7a736c" }}>50+ özellik, 8 kategori — hepsi tek platformda. Kategoriye tıkla, araçları gör.</p>
          </div>

          <div className="grid grid-cols-4 lg:grid-cols-8 gap-2">
            {CATEGORIES.map((cat, i) => (
              <motion.button key={cat.id}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.055, type: "spring", stiffness: 340, damping: 22 }}
                whileHover={{ y: -5, boxShadow: "0 12px 28px rgba(10,10,15,.13)" }}
                whileTap={{ scale: 0.93 }}
                onClick={() => setOpenModal(cat.id)}
                className="flex flex-col items-center text-center rounded-xl p-3 cursor-pointer transition-all"
                style={{ background: cat.bg, border: `1px solid ${cat.border}` }}>
                <span className="text-2xl mb-1.5">{cat.icon}</span>
                <span className="font-bold leading-tight" style={{ fontSize: "10px", color: "#0a0a0f" }}>{cat.title}</span>
                <span className="mt-1.5 font-semibold rounded px-1.5 py-0.5" style={{ fontSize: "9px", background: cat.tagBg, color: cat.tagColor }}>{cat.count} araç</span>
              </motion.button>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link href="/araclar"
              className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-xl border bg-white transition-all hover:-translate-y-0.5 hover:shadow-md"
              style={{ borderColor: "rgba(10,10,15,.15)", color: "#0a0a0f" }}>
              Tüm 50+ özelliği gör →
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-12 px-4 sm:px-6 lg:px-8" style={{ background: "#f5f3ee" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-1" style={{ color: "#0a0a0f" }}>Nasıl çalışır?</h2>
            <p className="text-sm" style={{ color: "#7a736c" }}>3 adımda koruma altına al</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { step: "1", icon: "📋", title: "Bilgiyi gir", desc: "SMS, fotoğraf, ilan linki veya şase numarasını yapıştır", color: "#c8410a", bg: "#fef0eb" },
              { step: "2", icon: "🤖", title: "AI analiz eder", desc: "GPT-4o ve özel modellerimiz milisaniyeler içinde tarar", color: "#6d28d9", bg: "#f3f0f9" },
              { step: "3", icon: "✅", title: "Raporu al", desc: "Açık dilli, aksiyon odaklı rapor — hemen karar ver", color: "#15803d", bg: "#f0fdf4" },
            ].map((s, i) => (
              <motion.div key={s.step}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 280, damping: 24 }}
                className="bg-white rounded-2xl p-5 text-center relative overflow-hidden"
                style={{ border: "1px solid rgba(10,10,15,.07)", boxShadow: "0 2px 12px rgba(10,10,15,.05)" }}>
                <div className="absolute top-3 right-3 text-4xl font-black opacity-5" style={{ color: s.color, fontFamily: "var(--font-inter)" }}>{s.step}</div>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3" style={{ background: s.bg }}>
                  {s.icon}
                </div>
                <h3 className="font-bold text-sm mb-1" style={{ color: "#0a0a0f" }}>{s.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#7a736c" }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEMO CARDS ── */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <motion.span
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="inline-block text-xs font-bold uppercase tracking-widest mb-2 px-3 py-1 rounded-full"
              style={{ background: "#f5f3ee", color: "#c8410a" }}
            >Gerçek Örnekler</motion.span>
            <h2 className="text-xl sm:text-2xl font-extrabold mb-1" style={{ color: "#0a0a0f" }}>
              AI&apos;ın ürettiği raporlar
            </h2>
            <p className="text-sm" style={{ color: "#7a736c" }}>Gerçek araçlar üzerinde yapılan analizlerden örnekler</p>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-3 sm:grid sm:grid-cols-3 sm:overflow-visible"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>

            {/* GÜVENLI */}
            <motion.div
              initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(10,10,15,.1)" }}
              className="bg-white rounded-2xl overflow-hidden flex-shrink-0 sm:flex-shrink"
              style={{ minWidth: "72vw", scrollSnapAlign: "start", border: "1px solid rgba(10,10,15,.08)", boxShadow: "0 2px 12px rgba(10,10,15,.06)" }}>
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#7a736c" }}>Ekspertiz</span>
                    <h3 className="font-bold text-sm mt-0.5" style={{ color: "#0a0a0f" }}>2021 Toyota Corolla</h3>
                    <p className="text-xs" style={{ color: "#7a736c" }}>42.000 km · İstanbul</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg"
                    style={{ background: "#edfaf2", color: "#15803d", border: "1px solid #bbf7d0" }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e" }} /> GÜVENLİ
                  </span>
                </div>
                {[
                  { label: "Genel Skor", val: "94/100", w: "94%", c: "#22c55e", tc: "#15803d", bg: "#f0fdf4" },
                  { label: "Tramer Riski", val: "Temiz", w: "5%", c: "#22c55e", tc: "#15803d", bg: "#f0fdf4" },
                ].map(b => (
                  <div key={b.label} className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: "#7a736c" }}>{b.label}</span>
                      <span className="font-bold" style={{ color: b.tc }}>{b.val}</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: b.bg }}>
                      <motion.div className="h-full rounded-full"
                        initial={{ width: "0%" }} whileInView={{ width: b.w }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true }}
                        style={{ background: b.c }} />
                    </div>
                  </div>
                ))}
                <div className="space-y-1.5 mt-3">
                  {["Orijinal boya %100, tramer kaydı yok", "Km tutarlılığı doğrulandı"].map(t => (
                    <div key={t} className="flex items-start gap-1.5 text-xs" style={{ color: "#7a736c" }}>
                      <span className="font-bold shrink-0" style={{ color: "#22c55e" }}>✓</span><span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-4 py-3" style={{ background: "#edfaf2", borderTop: "1px solid #c3edd4" }}>
                <p className="text-xs font-semibold" style={{ color: "#15803d" }}>💡 Güvenle satın alabilirsin.</p>
              </div>
            </motion.div>

            {/* RİSK */}
            <motion.div
              initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.1 }}
              whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(200,65,10,.1)" }}
              className="bg-white rounded-2xl overflow-hidden flex-shrink-0 sm:flex-shrink"
              style={{ minWidth: "72vw", scrollSnapAlign: "start", border: "1px solid rgba(200,65,10,.22)", boxShadow: "0 2px 12px rgba(200,65,10,.08)" }}>
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#7a736c" }}>Tramer SMS</span>
                    <h3 className="font-bold text-sm mt-0.5" style={{ color: "#0a0a0f" }}>2019 BMW 3 Serisi</h3>
                    <p className="text-xs" style={{ color: "#7a736c" }}>89.000 km · Ankara</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg"
                    style={{ background: "#fef0eb", color: "#c8410a", border: "1px solid #f8d5c4" }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#c8410a" }} /> RİSK
                  </span>
                </div>
                <div className="rounded-xl p-3 mb-3 font-mono text-xs leading-relaxed"
                  style={{ background: "#f5f3ee", border: "1px solid rgba(10,10,15,.07)", color: "#7a736c" }}>
                  Sol ön kanat: <span className="font-bold" style={{ color: "#c8410a" }}>₺3.200</span><br />
                  Ön tampon: <span className="font-bold" style={{ color: "#b45309" }}>₺1.800</span><br />
                  Motor kaputu: <span className="font-bold" style={{ color: "#c8410a" }}>₺5.400</span>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: "#7a736c" }}>Risk Skoru</span>
                    <span className="font-bold" style={{ color: "#c8410a" }}>Yüksek</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#fef0eb" }}>
                    <motion.div className="h-full rounded-full"
                      initial={{ width: "0%" }} whileInView={{ width: "82%" }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                      viewport={{ once: true }}
                      style={{ background: "#c8410a" }} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-start gap-1.5 text-xs" style={{ color: "#7a736c" }}>
                    <span className="font-bold shrink-0" style={{ color: "#c8410a" }}>!</span>
                    <span>Motor kaputu trameri ciddi kaza işareti</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-xs" style={{ color: "#7a736c" }}>
                    <span className="font-bold shrink-0" style={{ color: "#b45309" }}>!</span>
                    <span>Toplam ₺10.400 — değerin %14&apos;ü</span>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3" style={{ background: "#fef0eb", borderTop: "1px solid #f8d5c4" }}>
                <p className="text-xs font-semibold" style={{ color: "#c8410a" }}>💡 Max ₺485.000 teklif ver veya vazgeç.</p>
              </div>
            </motion.div>

            {/* UYARI */}
            <motion.div
              initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.2 }}
              whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(10,10,15,.08)" }}
              className="bg-white rounded-2xl overflow-hidden flex-shrink-0 sm:flex-shrink"
              style={{ minWidth: "72vw", scrollSnapAlign: "start", border: "1px solid rgba(10,10,15,.08)", boxShadow: "0 2px 12px rgba(10,10,15,.05)" }}>
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#7a736c" }}>İlan Dedektifi</span>
                    <h3 className="font-bold text-sm mt-0.5" style={{ color: "#0a0a0f" }}>2020 VW Passat</h3>
                    <p className="text-xs" style={{ color: "#7a736c" }}>115.000 km · İzmir</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg"
                    style={{ background: "#fef8ec", color: "#b45309", border: "1px solid #f5e3b3" }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#f59e0b" }} /> UYARI
                  </span>
                </div>
                {[
                  { label: "Genel Skor", val: "61/100", w: "61%", c: "#f59e0b", tc: "#b45309", bg: "#fffbeb" },
                  { label: "Fiyat Analizi", val: "%18 Pahalı", w: "72%", c: "#f59e0b", tc: "#b45309", bg: "#fffbeb" },
                ].map(b => (
                  <div key={b.label} className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: "#7a736c" }}>{b.label}</span>
                      <span className="font-bold" style={{ color: b.tc }}>{b.val}</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: b.bg }}>
                      <motion.div className="h-full rounded-full"
                        initial={{ width: "0%" }} whileInView={{ width: b.w }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true }}
                        style={{ background: b.c }} />
                    </div>
                  </div>
                ))}
                <div className="space-y-1.5 mt-3">
                  <div className="flex items-start gap-1.5 text-xs" style={{ color: "#7a736c" }}>
                    <span className="font-bold shrink-0" style={{ color: "#f59e0b" }}>!</span>
                    <span>Fiyat piyasa ortalamasının %18 üzerinde</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-xs" style={{ color: "#7a736c" }}>
                    <span className="font-bold shrink-0" style={{ color: "#f59e0b" }}>!</span>
                    <span>Km tutarsızlığı tespit edildi</span>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3" style={{ background: "#fef8ec", borderTop: "1px solid #f5e3b3" }}>
                <p className="text-xs font-semibold" style={{ color: "#b45309" }}>💡 Önce ekspertiz, max ₺1.050.000 teklif.</p>
              </div>
            </motion.div>
          </div>

          {/* Mobil dot indicator */}
          <div className="flex justify-center gap-1.5 mt-4 sm:hidden">
            {[0, 1, 2].map(i => (
              <div key={i} className="rounded-full transition-all"
                style={{ width: i === 0 ? "20px" : "6px", height: "6px", background: i === 0 ? "#c8410a" : "rgba(10,10,15,.15)" }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="py-12 px-4 sm:px-6 lg:px-8" style={{ background: "#f5f3ee" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl font-extrabold mb-1" style={{ color: "#0a0a0f" }}>Kullanıcılar ne diyor?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: "Mehmet A.", role: "İkinci el alıcısı", text: "Tramer SMS analizini kullandım, ₺18.000 değerinde gizli hasar tespit edildi. Tam zamanında!", rating: 5, city: "İstanbul" },
              { name: "Ayşe K.", role: "Galeri sahibi", text: "Toplu ilan analizi aracı sayesinde portföyümü çok daha hızlı yönetiyorum. Pro panel harika.", rating: 5, city: "Ankara" },
              { name: "Emre T.", role: "Araç sahibi", text: "OBD kod analizörüyle servis fiyatını müzakere ettim. Gerçekten işe yarıyor.", rating: 5, city: "İzmir" },
            ].map((r, i) => (
              <motion.div key={r.name}
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 280, damping: 24 }}
                className="bg-white rounded-2xl p-5"
                style={{ border: "1px solid rgba(10,10,15,.07)", boxShadow: "0 2px 12px rgba(10,10,15,.05)" }}>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <span key={j} style={{ color: "#f59e0b", fontSize: "13px" }}>★</span>
                  ))}
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: "#0a0a0f" }}>&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: "#f5f3ee", color: "#c8410a" }}>{r.name[0]}</div>
                  <div>
                    <p className="text-xs font-bold" style={{ color: "#0a0a0f" }}>{r.name}</p>
                    <p className="text-xs" style={{ color: "#7a736c" }}>{r.role} · {r.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="rounded-3xl p-8 sm:p-10"
            style={{ background: "#0a0a0f", border: "1px solid rgba(255,255,255,.06)" }}>
            <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-5 text-xs font-semibold"
              style={{ background: "rgba(200,65,10,.2)", color: "#f87171" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#f87171" }} />
              Ücretsiz · Kart gerekmez
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3" style={{ color: "#f5f3ee" }}>
              İlk analizin <span style={{ color: "#c8410a" }}>ücretsiz.</span>
            </h2>
            <p className="mb-7 text-sm" style={{ color: "rgba(245,243,238,.55)" }}>
              Kayıt ol, hemen kullan. Her yeni üye için 3 ücretsiz analiz.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/araclar"
                className="font-bold text-sm px-8 py-3.5 rounded-xl transition-all text-center hover:-translate-y-0.5 hover:opacity-90"
                style={{ background: "#c8410a", color: "white" }}>
                Ücretsiz Başla →
              </Link>
              <Link href="/fiyatlandirma"
                className="font-semibold text-sm px-8 py-3.5 rounded-xl border transition-all text-center hover:-translate-y-0.5"
                style={{ borderColor: "rgba(245,243,238,.2)", color: "#f5f3ee" }}>
                Araçları Keşfet
              </Link>
            </div>
            <p className="text-xs mt-5" style={{ color: "rgba(245,243,238,.3)" }}>
              İyzico güvenceli ödeme · SSL şifreleme
            </p>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {activeCat && <FeatureModal cat={activeCat} onClose={() => setOpenModal(null)} />}
      </AnimatePresence>
    </div>
  );
}
