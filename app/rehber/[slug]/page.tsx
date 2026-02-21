import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const ARTICLES: Record<
  string,
  { title: string; description: string; content: string }
> = {
  "agir-hasar-kayitli-arac-alinir-mi-2026": {
    title: "Ağır Hasar Kayıtlı Araç Alınır mı? (2026 Güncel Rehber)",
    description:
      "Ağır hasar kaydı ne anlama gelir, sigorta ve tramer kayıtları nasıl yorumlanır, alırken nelere dikkat etmeli.",
    content:
      "Bu rehberde ağır hasar kayıtlı araçların ne anlama geldiği, tramer ve sigorta kayıtlarının nasıl okunacağı ve alım kararı verirken dikkat edilmesi gerekenleri bulacaksınız. İçerik yakında güncellenecektir.",
  },
  "ekspertiz-yanal-kayma-testi": {
    title: "Ekspertizde Yanal Kayma Testi Ne Anlama Gelir?",
    description:
      "Yanal kayma testi nedir, hangi hasarlara işaret eder ve alıcı olarak nasıl değerlendirmelisiniz.",
    content:
      "Yanal kayma testi, ekspertiz raporlarında sık karşılaşılan bir maddede yer alır. Bu yazıda testin anlamı, olası nedenleri ve alıcı için önemi anlatılmaktadır. İçerik yakında genişletilecektir.",
  },
  "dsg-sanziman-alirken-dikkat": {
    title: "DSG Şanzıman Alırken Nelere Dikkat Edilmeli?",
    description:
      "DSG kutularında yaygın arızalar, bakım geçmişi ve test sürüşünde kontrol edilecekler.",
    content:
      "DSG şanzımanlı ikinci el araç alırken bakım geçmişi, yağ değişimleri ve test sürüşünde vites geçişlerinin nasıl değerlendirileceği bu rehberde ele alınacaktır. İçerik yakında eklenecektir.",
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return { title: "Rehber | OtoZeka" };
  return {
    title: `${article.title} | OtoZeka Rehber`,
    description: article.description,
    openGraph: { title: article.title, description: article.description },
  };
}

export default async function RehberArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES[slug];

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold text-zinc-50">Yazı bulunamadı</h1>
        <Link
          href="/rehber"
          className="mt-4 inline-flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="size-4" />
          Rehbere dön
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-zinc-950">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Link
          href="/rehber"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Rehbere dön
        </Link>
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-lg text-zinc-400">{article.description}</p>
        </header>
        <div className="prose prose-invert prose-zinc max-w-none">
          <p className="leading-relaxed text-zinc-300">{article.content}</p>
        </div>
      </div>
    </article>
  );
}
