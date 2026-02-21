import Link from "next/link";
import { Twitter, Instagram, Linkedin, Mail } from "lucide-react";

const ARACLAR_LINKS = [
  { name: "ÖTV Hesaplama", href: "/araclar/otv-hesaplama" },
  { name: "Kredi Hesaplama", href: "/araclar/kredi-hesaplama" },
  { name: "Lastik Uyum Hesaplayıcı", href: "/araclar/lastik-hesaplama" },
];

const VERI_LINKS = [
  { name: "Şase No Çözücü", href: "/data/vin-decoder" },
  { name: "Toplam Sahip Olma Maliyeti", href: "/data/tco-calculator" },
  { name: "Rehber", href: "/rehber" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 font-semibold text-slate-800 hover:opacity-90">
              <span className="text-blue-600">OtoZeka</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-slate-600">
              Türkiye&apos;nin ücretsiz araç hesaplama ve araç araçları platformu. ÖTV, kredi, lastik uyumu ve daha fazlası.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800">Araçlar (Ücretsiz)</h3>
            <ul className="mt-3 space-y-2">
              {ARACLAR_LINKS.map(({ name, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-600 hover:text-slate-900">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800">Destek & İletişim</h3>
            <ul className="mt-3 space-y-2">
              {VERI_LINKS.map(({ name, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-600 hover:text-slate-900">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-3">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700" aria-label="Twitter">
                <Twitter className="size-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700" aria-label="Instagram">
                <Instagram className="size-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700" aria-label="LinkedIn">
                <Linkedin className="size-5" />
              </a>
              <a href="mailto:destek@otozeka.com" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700" aria-label="E-posta">
                <Mail className="size-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            Tüm hakları saklıdır © 2026 OtoZeka
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-slate-500 hover:text-slate-700">
              Gizlilik
            </Link>
            <Link href="/terms" className="text-xs text-slate-500 hover:text-slate-700">
              Kullanım Koşulları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
