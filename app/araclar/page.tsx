import Link from "next/link";
import { Car, Calculator, Banknote, Circle, ShieldCheck } from "lucide-react";

const TOOLS = [
  { name: "Arabam Ne Kadar Eder?", href: "/araclar/arabam-ne-eder", icon: Car, desc: "Arabanızın gerçek piyasa değerini yapay zeka ile tahmin edin." },
  { name: "Kronik Sorun Dedektifi", href: "/araclar/kronik-sorunlar", icon: ShieldCheck, desc: "Marka/model/motor sabıka kaydı: bilinen arızalar ve güvenilirlik." },
  { name: "ÖTV Hesaplama", href: "/araclar/otv-hesaplama", icon: Calculator, desc: "Vergisiz fiyattan ÖTV ve KDV ile toplam aracı hesaplayın." },
  { name: "Kredi Hesaplama", href: "/araclar/kredi-hesaplama", icon: Banknote, desc: "Taşıt kredisi aylık taksit ve toplam geri ödeme." },
  { name: "Lastik Uyum Hesaplayıcı", href: "/araclar/lastik-hesaplama", icon: Circle, desc: "Mevcut ve yeni lastik çapını karşılaştırın." },
];

export default function AraclarHubPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
          Araçlar (Ücretsiz)
        </h1>
        <p className="mt-2 text-zinc-400">
          TL ile anında hesaplama. ÖTV, kredi taksiti ve lastik uyumu.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map(({ name, href, icon: Icon, desc }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-primary/50 hover:bg-zinc-800/50"
          >
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Icon className="size-6" />
            </div>
            <div>
              <h2 className="font-semibold text-zinc-50">{name}</h2>
              <p className="mt-1 text-sm text-zinc-400">{desc}</p>
            </div>
            <span className="mt-auto text-sm font-medium text-primary">Hesapla →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
