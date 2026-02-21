import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Rehber | OtoZeka — İkinci El Dünyasında Hayatta Kalma Kılavuzu",
  description:
    "İkinci el araç alım satım, ekspertiz, tramer, hasar kayıtları ve kronik sorunlar hakkında güncel rehber yazıları. OtoZeka uzman içerikleri.",
  openGraph: {
    title: "OtoZeka Rehber: İkinci El Dünyasında Hayatta Kalma Kılavuzu",
    description:
      "İkinci el araç alım satım, ekspertiz ve teknik rehberler. Ağır hasar, yanal kayma, DSG şanzıman ve daha fazlası.",
    type: "website",
  },
};

const ARTICLES = [
  {
    slug: "agir-hasar-kayitli-arac-alinir-mi-2026",
    title: "Ağır Hasar Kayıtlı Araç Alınır mı? (2026 Güncel Rehber)",
    excerpt:
      "Ağır hasar kaydı ne anlama gelir, sigorta ve tramer kayıtları nasıl yorumlanır, alırken nelere dikkat etmeli.",
    tags: ["Alım Satım", "Tramer"],
  },
  {
    slug: "ekspertiz-yanal-kayma-testi",
    title: "Ekspertizde Yanal Kayma Testi Ne Anlama Gelir?",
    excerpt:
      "Yanal kayma testi nedir, hangi hasarlara işaret eder ve alıcı olarak nasıl değerlendirmelisiniz.",
    tags: ["Teknik", "Ekspertiz"],
  },
  {
    slug: "dsg-sanziman-alirken-dikkat",
    title: "DSG Şanzıman Alırken Nelere Dikkat Edilmeli?",
    excerpt:
      "DSG kutularında yaygın arızalar, bakım geçmişi ve test sürüşünde kontrol edilecekler.",
    tags: ["Teknik", "Alım Satım"],
  },
];

export default function RehberPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-700/50 bg-zinc-900/80 px-4 py-1.5 text-sm text-zinc-400">
            <BookOpen className="size-4" />
            <span>İçerik Rehberi</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl md:text-6xl">
            OtoZeka Rehber: İkinci El Dünyasında Hayatta Kalma Kılavuzu
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            İkinci el araç alırken veya satarken ihtiyacınız olan güncel rehberler,
            teknik açıklamalar ve uzman tavsiyeleri.
          </p>
        </header>

        <section
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Rehber yazıları"
        >
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/rehber/${article.slug}`}
              className="group relative flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg transition duration-300 hover:scale-[1.02] hover:border-zinc-700 hover:shadow-xl hover:shadow-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <div className="mb-3 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-md bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-300"
                  >
                    <Tag className="size-3" />
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="mb-2 text-xl font-semibold leading-snug text-zinc-50 group-hover:text-primary">
                {article.title}
              </h2>
              <p className="mt-auto text-sm leading-relaxed text-zinc-400">
                {article.excerpt}
              </p>
              <span className="mt-4 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Oku →
              </span>
            </Link>
          ))}
        </section>

        <p className="mt-12 text-center text-sm text-zinc-500">
          Daha fazla rehber yazısı yakında eklenecek.{" "}
          <Link href="/" className="text-primary hover:underline">
            Ana sayfaya dön
          </Link>
        </p>
      </div>
    </div>
  );
}
