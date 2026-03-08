import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const SYSTEM_PROMPT = `Sen deneyimli bir Türk oto galerisi ilan uzmanısın. Verilen araç bilgileriyle profesyonel, çekici ve SEO dostu bir Türkçe satış ilanı yaz.

İlan şu bölümleri içermeli:
1. Dikkat çekici bir başlık (marka, model, yıl, öne çıkan özellik)
2. Araç özellikleri (madde madde)
3. Satışa çıkarma açıklaması (neden satılıyor tonu opsiyonel ama güven verici)
4. İletişim çağrısı (nazik, profesyonel)

Ton: Güven verici, samimi, abartısız. Türkçe karakterleri doğru kullan.
Cevabını SADECE JSON formatında ver. Anahtarlar: 'title' (string - ilan başlığı), 'listing' (string - tam ilan metni, paragraflar \\n\\n ile ayrılmış).`;

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey?.trim()) {
    return NextResponse.json({ error: "API anahtarı yapılandırılmamış." }, { status: 503 });
  }

  let body: {
    make?: string; model?: string; year?: string; mileage?: string;
    price?: string; location?: string; description?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek gövdesi." }, { status: 400 });
  }

  const { make, model, year, mileage, price, location, description } = body;
  if (!make || !model || !year) {
    return NextResponse.json({ error: "Marka, model ve yıl zorunludur." }, { status: 400 });
  }

  const vehicleInfo = `
Araç: ${make} ${model} (${year})
Kilometre: ${mileage || "Belirtilmedi"}
Fiyat: ${price ? `₺${price}` : "Belirtilmedi"}
Konum: ${location || "Belirtilmedi"}
Ek Bilgiler: ${description || "Yok"}
  `.trim();

  try {
    const openai = new OpenAI({ apiKey });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Bu araç için profesyonel bir satış ilanı oluştur:\n\n${vehicleInfo}` },
      ],
      response_format: { type: "json_object" },
      max_tokens: 800,
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) {
      return NextResponse.json({ error: "İlan oluşturulamadı." }, { status: 422 });
    }

    const parsed = JSON.parse(raw) as { title?: string; listing?: string; error?: string };
    if (parsed.error) {
      return NextResponse.json({ error: parsed.error }, { status: 422 });
    }

    return NextResponse.json({
      title: parsed.title ?? "",
      listing: parsed.listing ?? "",
    });
  } catch (err) {
    console.error("generate-listing error:", err);
    return NextResponse.json({ error: "İlan oluşturma sırasında bir hata oluştu." }, { status: 500 });
  }
}
