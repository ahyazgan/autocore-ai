import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const REMBG_MODEL =
  "cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

export async function POST(request: NextRequest) {

  let body: { image?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const imageInput = body.image;
  if (!imageInput || typeof imageInput !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid 'image' (base64 or URL)" },
      { status: 400 }
    );
  }

  let imagePayload: Buffer | string;

  if (/^https?:\/\//i.test(imageInput)) {
    imagePayload = imageInput;
  } else {
    const base64 = imageInput.replace(/^data:image\/\w+;base64,/, "");
    try {
      imagePayload = Buffer.from(base64, "base64");
    } catch {
      return NextResponse.json(
        { error: "Invalid base64 image" },
        { status: 400 }
      );
    }
  }

  try {
    const result = await replicate.run(REMBG_MODEL, {
      input: { image: imagePayload },
    });

    const first = Array.isArray(result) ? result[0] : result;
    let outputUrl: string | null = null;
    if (typeof first === "string") {
      outputUrl = first;
    } else if (
      first &&
      typeof first === "object" &&
      typeof (first as { url: () => URL | string }).url === "function"
    ) {
      const u = (first as { url: () => URL | string }).url();
      outputUrl = typeof u === "string" ? u : u?.href ?? null;
    }

    if (!outputUrl) {
      return NextResponse.json(
        { error: "Engine Start Failed. Please check API Key." },
        { status: 502 }
      );
    }

    return NextResponse.json({ url: outputUrl });
  } catch (_err) {
    return NextResponse.json(
      { error: "Engine Start Failed. Please check API Key." },
      { status: 503 }
    );
  }
}
