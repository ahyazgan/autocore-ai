"use client";

import { motion } from "framer-motion";
import { Check, X, Zap, User, Building2, HelpCircle } from "lucide-react";

const TIERS = [
  {
    id: "misafir",
    name: "Misafir",
    price: "Ücretsiz",
    period: null,
    icon: User,
    features: [
      { text: "Bedava hesaplama araçları", included: true },
      { text: "1 adet ücretsiz ilan analizi", included: true },
      { text: "Tramer / Ekspertiz okuma", included: false },
      { text: "Sanal Stüdyo", included: false },
      { text: "Filo yönetimi", included: false },
    ],
    cta: "Şu an kullanıyorsunuz",
    ctaStyle: "secondary",
    glow: false,
  },
  {
    id: "bireysel",
    name: "Bireysel Alıcı",
    price: "99",
    period: "Kredi Paketi",
    icon: Zap,
    features: [
      { text: "Bedava hesaplama araçları", included: true },
      { text: "1 adet ücretsiz ilan analizi", included: true },
      { text: "5 Tramer / Ekspertiz Okuma Kredisi", included: true },
      { text: "10 Sanal Stüdyo hakkı", included: true },
      { text: "Filo yönetimi", included: false },
    ],
    cta: "Kredi Satın Al",
    ctaStyle: "primary",
    glow: true,
  },
  {
    id: "pro",
    name: "Galeri Pro",
    price: "990",
    period: "Ay",
    icon: Building2,
    features: [
      { text: "Bedava hesaplama araçları", included: true },
      { text: "Sınırsız ilan analizi", included: true },
      { text: "Sınırsız Tramer / Ekspertiz okuma", included: true },
      { text: "Sınırsız Sanal Stüdyo", included: true },
      { text: "Sınırsız İlan Yazarı + Filo Yönetimi", included: true },
    ],
    cta: "Pro'ya Geç",
    ctaStyle: "electric",
    glow: false,
  },
];

const FAQ_ITEMS = [
  {
    q: "Kredi paketi ne kadar süre geçerli?",
    a: "Satın aldığınız krediler hesabınızda kalır, süre sınırı yoktur. Kredileri dilediğiniz zaman kullanabilirsiniz.",
  },
  {
    q: "Galeri Pro aboneliğimi iptal edebilir miyim?",
    a: "Evet. Ayarlar üzerinden aboneliğinizi iptal edebilirsiniz. İptal sonrası dönem sonuna kadar Pro özelliklerini kullanmaya devam edersiniz.",
  },
  {
    q: "Ödeme yöntemleri nelerdir?",
    a: "Kredi kartı (Visa, Mastercard) ve havale/EFT ile ödeme alıyoruz. Kurumsal faturalandırma için bizimle iletişime geçebilirsiniz.",
  },
];

export default function FiyatlandirmaPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-16 px-4 py-12">
      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
          İhtiyacınıza Uygun Zeka Paketini Seçin.
        </h1>
        <p className="mt-3 text-zinc-400">
          Ücretsiz başlayın, ihtiyaç arttıkça kredi veya Pro ile devam edin.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {TIERS.map((tier) => {
          const Icon = tier.icon;
          return (
            <motion.article
              key={tier.id}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`relative flex flex-col rounded-2xl border bg-zinc-900/50 p-6 shadow-xl backdrop-blur sm:p-8 ${
                tier.glow
                  ? "border-primary/50 shadow-primary/10 ring-1 ring-primary/20"
                  : "border-zinc-800"
              }`}
            >
              {tier.glow && (
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-primary/20 to-transparent opacity-60" />
              )}
              <div className="relative">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-zinc-800 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <h2 className="text-xl font-semibold text-zinc-50">{tier.name}</h2>
                </div>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-zinc-50">
                    {tier.price}
                    {tier.period && (
                      <span className="text-lg font-normal text-zinc-400">
                        {" "}
                        ₺ / {tier.period}
                      </span>
                    )}
                  </span>
                </div>
                <ul className="space-y-3">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      {f.included ? (
                        <Check className="mt-0.5 size-5 shrink-0 text-emerald-400" />
                      ) : (
                        <X className="mt-0.5 size-5 shrink-0 text-zinc-500" />
                      )}
                      <span className={f.included ? "text-zinc-200" : "text-zinc-500"}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <button
                    type="button"
                    disabled={tier.id === "misafir"}
                    className={`w-full rounded-xl py-3 text-sm font-semibold transition-opacity disabled:cursor-default disabled:opacity-70 ${
                      tier.ctaStyle === "electric"
                        ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/25 hover:opacity-95"
                        : tier.ctaStyle === "primary"
                          ? "border border-primary bg-primary/10 text-primary hover:bg-primary/20"
                          : "border border-zinc-600 bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {tier.cta}
                  </button>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <section className="mx-auto max-w-2xl">
        <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-zinc-50">
          <HelpCircle className="size-5 text-primary" />
          Sıkça Sorulan Sorular
        </h2>
        <ul className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <li
              key={i}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-4"
            >
              <p className="font-medium text-zinc-200">{item.q}</p>
              <p className="mt-2 text-sm text-zinc-400">{item.a}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
