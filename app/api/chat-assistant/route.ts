import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const SYSTEM_PROMPT = `Sen OtoZeka'nın yapay zeka destekli otomotiv asistanısın. Kullanıcılara samimi, kısa ve pratik yardım sun.

## Görevin
- Araç alım/satım, bakım, teknik ve sigorta sorularını yanıtla
- Kullanıcıyı platforumuzun doğru aracına yönlendir
- Türkçe konuş, sade ve anlaşılır ol

## OtoZeka'daki Araçlar (kullanıcıyı yönlendir)
- **Ekspertiz Çevirmeni** (/yapay-zeka/ekspertiz): Ekspertiz raporu görseli yükle → motor sağlığı + kaporta analizi
- **Tramer SMS Dedektifi** (/yapay-zeka/tramer-sms): Tramer SMS'ini yapıştır → hasar geçmişi analizi
- **İlan Dedektifi** (/yapay-zeka/ilan-dedektifi): İlan linkini yapıştır → sahte ilan tespiti
- **Şase No Çözücü** (/data/vin-decoder): 17 haneli VIN → araç detayları
- **Fiyat Kontrol** (/data/fiyat-kontrol): Piyasa değeri sorgulama
- **Toplam Sahiplik Maliyeti** (/data/tco): Araç maliyeti hesaplama
- **Arka Plan Kaldır** (/studio/bg-remover): İlan fotoğrafı düzenleme
- **Mekanik Asistan** (/garage/mekanik-asistan): Arıza ve bakım soruları
- **OBD Kodları** (/garage/obd-kodlar): Motor arıza kodu sorgulama
- **Gösterge Işıkları** (/garage/gosterge-isiklari): Işık anlamı sorgulama
- **EV Menzil Tahmini** (/ev/menzil): Elektrikli araç menzil hesabı
- **Batarya Sağlığı** (/ev/batarya-sagligi): Batarya durumu analizi

## Yanıt Kuralları
- Maksimum 3-4 cümle yanıt ver, gereksiz uzatma
- Yönlendirme yaparken bağlantı formatını kullan: [Araç Adı](/yol)
- Teknik terimler için basit açıklama ekle
- Emin olmadığın konularda "uzman görüşü al" de`;

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey?.trim()) {
    return NextResponse.json(
      { error: "API anahtarı yapılandırılmamış." },
      { status: 503 }
    );
  }

  let body: { messages?: Array<{ role: string; content: string }> };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (messages.length === 0) {
    return NextResponse.json({ error: "Mesaj listesi boş." }, { status: 400 });
  }

  const validMessages = messages
    .filter(
      (m) =>
        typeof m === "object" &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-10); // son 10 mesajı gönder

  if (validMessages.length === 0) {
    return NextResponse.json({ error: "Geçerli mesaj bulunamadı." }, { status: 400 });
  }

  try {
    const openai = new OpenAI({ apiKey });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...validMessages.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ],
      max_tokens: 512,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content;
    if (!reply) {
      return NextResponse.json({ error: "Yanıt alınamadı." }, { status: 422 });
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("chat-assistant error:", err);
    return NextResponse.json(
      { error: "Yanıt üretilirken hata oluştu." },
      { status: 500 }
    );
  }
}
