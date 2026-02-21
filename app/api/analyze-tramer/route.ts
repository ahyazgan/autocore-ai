import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const SYSTEM_PROMPT = `Sen 30 yıllık tecrübeli bir Türk oto ekspertiz uzmanısın. Kullanıcı sana 5664 Tramer (Hasar Kaydı) SMS'inin ekran görüntüsünü gönderiyor.
Görevin:
1. Görüntüdeki tüm hasar tutarlarını (TL) bul ve topla. (Eğer 'Bedelsiz' veya 'Çarpma' yazıyorsa tutarı 0 say).
2. Toplam hasar tutarına ve kaza tarihlerine bakarak hasar derecesini belirle (Hafif Hasar, Orta Hasar, Ağır Hasarlı, Pert Kayıtlı). Güncel enflasyonu hesaba kat (Örneğin 2024'te 50.000 TL hasar sadece bir far değişimi olabilir, ama 2015'te 50.000 TL ise araba pert demektir).
3. Alıcıya samimi ve anlaşılır bir Türkçe ile ustanın yorumunu yap.
Cevabını SADECE JSON formatında ver, başka metin yazma. Anahtarlar: 'total_damage' (number - toplam TL), 'severity' (string - hasar derecesi), 'mechanic_comment' (string - ustanın yorumu).
Eğer görüntü okunamıyorsa veya Tramer SMS değilse: 'error' (string) anahtarı ile kısa açıklama ver.`;

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey?.trim()) {
    return NextResponse.json(
      { error: "API anahtarı yapılandırılmamış." },
      { status: 503 }
    );
  }

  let body: { image?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Geçersiz istek gövdesi." },
      { status: 400 }
    );
  }

  const imageB64 = typeof body.image === "string" ? body.image.trim() : "";
  const dataUrl = imageB64.startsWith("data:") ? imageB64 : `data:image/jpeg;base64,${imageB64}`;

  if (!imageB64 || imageB64.length < 100) {
    return NextResponse.json(
      { error: "Görüntü verisi eksik veya geçersiz." },
      { status: 400 }
    );
  }

  try {
    const openai = new OpenAI({ apiKey });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: [
            { type: "text", text: "Bu 5664 Tramer SMS ekran görüntüsünü analiz et. JSON ile cevapla." },
            { type: "image_url", image_url: { url: dataUrl } },
          ],
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 1024,
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) {
      return NextResponse.json(
        { error: "Görüntü okunamadı veya Tramer SMS değil." },
        { status: 422 }
      );
    }

    const parsed = JSON.parse(raw) as {
      error?: string;
      total_damage?: number;
      severity?: string;
      mechanic_comment?: string;
    };

    if (parsed.error) {
      return NextResponse.json(
        { error: parsed.error },
        { status: 422 }
      );
    }

    const total_damage = typeof parsed.total_damage === "number" ? parsed.total_damage : 0;
    const severity = typeof parsed.severity === "string" ? parsed.severity : "Belirsiz";
    const mechanic_comment = typeof parsed.mechanic_comment === "string" ? parsed.mechanic_comment : "";

    return NextResponse.json({
      total_damage,
      severity,
      mechanic_comment,
    });
  } catch (err) {
    console.error("analyze-tramer error:", err);
    return NextResponse.json(
      { error: "Analiz sırasında bir hata oluştu." },
      { status: 500 }
    );
  }
}
