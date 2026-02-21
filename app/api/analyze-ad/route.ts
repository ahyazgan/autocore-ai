import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const SYSTEM_PROMPT = `Sen 30 yıllık tecrübeli, dürüst ve çok zeki bir Türk oto sanayi ustasısın. Görevin, ikinci el araba satıcılarının ilan açıklamalarındaki gizli yalanları, abartıları ve riskleri bulmak.
'Çıtır hasarlı', 'Keyfe keder boyalı', 'Sigorta şişirmesi', 'Bel altı boyalı', 'Doktordan', 'Bayan arabası' gibi Türk oto pazarındaki kurnaz kelimeleri yakala ve müşteriyi uyar.
Cevabını JSON formatında şu anahtarlarla ver: 'red_flags' (array of strings - kırmızı bayraklar, riskler), 'green_flags' (array of strings - olumlu yanlar), 'summary' (string - ustanın kısa, samimi ve gerçekçi yorumu, "Ustanın Yorumu" başlığı altında gösterilecek).`;

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey?.trim()) {
    return NextResponse.json(
      { error: "API anahtarı yapılandırılmamış." },
      { status: 503 }
    );
  }

  let body: { adText?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Geçersiz istek gövdesi." },
      { status: 400 }
    );
  }

  const adText = typeof body.adText === "string" ? body.adText.trim() : "";
  if (adText.length < 80) {
    return NextResponse.json(
      { error: "Lütfen daha uzun bir ilan metni girin." },
      { status: 400 }
    );
  }

  try {
    const openai = new OpenAI({ apiKey });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Aşağıdaki ilan açıklamasını analiz et ve JSON ile cevapla:\n\n${adText.slice(0, 8000)}` },
      ],
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) {
      return NextResponse.json(
        { error: "Model yanıt üretemedi." },
        { status: 502 }
      );
    }

    const parsed = JSON.parse(raw) as {
      red_flags?: string[];
      green_flags?: string[];
      summary?: string;
    };

    const red_flags = Array.isArray(parsed.red_flags) ? parsed.red_flags : [];
    const green_flags = Array.isArray(parsed.green_flags) ? parsed.green_flags : [];
    const summary = typeof parsed.summary === "string" ? parsed.summary : "";

    return NextResponse.json({
      red_flags,
      green_flags,
      summary,
    });
  } catch (err) {
    console.error("analyze-ad error:", err);
    return NextResponse.json(
      { error: "Analiz sırasında bir hata oluştu." },
      { status: 500 }
    );
  }
}
