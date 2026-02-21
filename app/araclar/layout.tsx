import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ücretsiz Araç Hesaplama Araçları | OtoZeka",
  description: "ÖTV, KDV, taşıt kredisi ve lastik uyum hesaplayıcı. TL ile anında hesapla.",
};

export default function AraclarLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-8">
      {children}
    </div>
  );
}
