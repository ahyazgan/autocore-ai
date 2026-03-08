import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Poppins } from "next/font/google";
import { LayoutWrapper } from "@/components/LayoutWrapper";
import { CommandPalette } from "@/components/CommandPalette";
import { BackToTop } from "@/components/BackToTop";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const inter = Inter({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-inter",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://otozeka.com";

export const metadata: Metadata = {
  title: "OtoZeka | Türkiye'nin Yapay Zeka Destekli Oto Ekspertizi",
  description:
    "İkinci el araba alıp satarken sürprizlere son. Yapay zeka ile ekspertiz raporu çevirisi, Tramer SMS analizi, güncel piyasa değerleme ve kronik sorun sorgulama.",
  keywords: [
    "oto ekspertiz",
    "tramer sorgulama",
    "araç değerleme",
    "araba piyasası",
    "kronik sorunlar",
    "yapay zeka",
  ],
  openGraph: {
    title: "OtoZeka | Türkiye'nin Yapay Zeka Destekli Oto Ekspertizi",
    description:
      "İkinci el araba alıp satarken sürprizlere son. Yapay zeka ile ekspertiz raporu çevirisi, Tramer SMS analizi, güncel piyasa değerleme ve kronik sorun sorgulama.",
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: "OtoZeka",
    images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt: "OtoZeka" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OtoZeka | Türkiye'nin Yapay Zeka Destekli Oto Ekspertizi",
    description:
      "İkinci el araba alıp satarken sürprizlere son. Ekspertiz çevirisi, Tramer analizi, piyasa değerleme.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${inter.variable} min-h-screen bg-zinc-950 text-zinc-50 antialiased`}>
        <CommandPalette />
        <LayoutWrapper>{children}</LayoutWrapper>
        <BackToTop />
      </body>
    </html>
  );
}
