import Link from "next/link";
import { Calculator, Image, Shield, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center px-4 py-20">
      <div className="absolute inset-0 bg-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(217_91%_60%_/_0.12),transparent)]" />
      <div className="container relative z-10 mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl md:text-6xl">
          Araç İhtiyaçlarınız İçin Tek Adres
        </h1>
        <p className="mt-4 text-lg text-zinc-400 sm:text-xl">
          Ücretsiz hesaplamalar. ÖTV, kredi taksiti, lastik uyumu — hepsi TL ile.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <Link href="/araclar/otv-hesaplama">
            <div className="group flex flex-col items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/80 p-8 transition-colors hover:border-primary/50 hover:bg-zinc-800/80">
              <div className="flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary transition-colors group-hover:bg-primary/25">
                <Calculator className="size-7" />
              </div>
              <div>
                <h2 className="font-semibold text-zinc-50">ÖTV & KDV Hesaplama</h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Vergisiz fiyattan toplam aracı TL cinsinden hesaplayın.
                </p>
              </div>
              <Button variant="outline" size="sm" className="mt-auto border-zinc-700 text-zinc-200">
                Hesapla
              </Button>
            </div>
          </Link>
          <Link href="/araclar/kredi-hesaplama">
            <div className="group flex flex-col items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/80 p-8 transition-colors hover:border-primary/50 hover:bg-zinc-800/80">
              <div className="flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary transition-colors group-hover:bg-primary/25">
                <Shield className="size-7" />
              </div>
              <div>
                <h2 className="font-semibold text-zinc-50">Taşıt Kredisi</h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Aylık taksit ve toplam geri ödeme hesaplayın.
                </p>
              </div>
              <Button variant="outline" size="sm" className="mt-auto border-zinc-700 text-zinc-200">
                Hesapla
              </Button>
            </div>
          </Link>
          <Link href="/araclar/lastik-hesaplama">
            <div className="group flex flex-col items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/80 p-8 transition-colors hover:border-primary/50 hover:bg-zinc-800/80">
              <div className="flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary transition-colors group-hover:bg-primary/25">
                <Wrench className="size-7" />
              </div>
              <div>
                <h2 className="font-semibold text-zinc-50">Lastik Uyum</h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Mevcut ve yeni lastik çapını karşılaştırın.
                </p>
              </div>
              <Button variant="outline" size="sm" className="mt-auto border-zinc-700 text-zinc-200">
                Hesapla
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
