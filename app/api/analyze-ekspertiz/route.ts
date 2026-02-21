import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const SYSTEM_PROMPT = `Sen 30 yıllık tecrübeli bir Türk oto ekspertiz uzmanısın. Kullanıcı sana bir ekspertiz raporu görseli (veya ekran görüntüsü) gönderiyor.
Görevin:
1. Rapordaki motor/dyno testleri ve teknik verilere bakarak MOTOR SAĞLIĞI yüzdesini tahmin et (0-100). Eğer veri yoksa makul bir aralık ver.
2. Kaporta durumunu listele: Boya yapılan, değişen veya hasar gören parçaları (örn. "Sol ön kapı boyalı", "Arka tampon değişmiş").
3. Alıcı için net bir KARAR ver: Araç alınır mı, dikkat mi, uzak mı durulmalı? Örnek: "Güvenli: Sadece temizlik boyası mevcut", "Dikkat: Şasede işlem var, uzak durulmalı", "Orta risk: Kaput değişmiş, fiyata göre değerlendir."
Cevabını SADECE JSON formatında ver. Anahtarlar: 'motor_health' (number 0-100), 'body_parts' (array of strings - kaporta listesi), 'verdict' (string - nihai yorum).
Eğer görüntü okunamıyorsa veya ekspertiz raporu değilse: 'error' (string) anahtarı ile kısa açıklama ver.`;

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
            { type: "text", text: "Bu ekspertiz raporu görselini analiz et. JSON ile cevapla." },
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
        { error: "Rapor okunamadı veya ekspertiz görseli değil." },
        { status: 422 }
      );
    }

    const parsed = JSON.parse(raw) as {
      error?: string;
      motor_health?: number;
      body_parts?: string[];
      verdict?: string;
    };

    if (parsed.error) {
      return NextResponse.json(
        { error: parsed.error },
        { status: 422 }
      );
    }

    const motor_health = typeof parsed.motor_health === "number"
      ? Math.max(0, Math.min(100, parsed.motor_health))
      : 0;
    const body_parts = Array.isArray(parsed.body_parts) ? parsed.body_parts : [];
    const verdict = typeof parsed.verdict === "string" ? parsed.verdict : "";

    return NextResponse.json({
      motor_health,
      body_parts,
      verdict,
    });
  } catch (err) {
    console.error("analyze-ekspertiz error:", err);
    return NextResponse.json(
      { error: "Analiz sırasında bir hata oluştu." },
      { status: 500 }
    );
  }
}
