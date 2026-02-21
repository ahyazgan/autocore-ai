import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Garaj | OtoZeka — Bakım ve Yardımcı Araçlar",
  description: "Gösterge ışıkları, OBD kodları, radyo kodu, lastik hesaplama, yağ bulucu ve daha fazlası.",
};

export default function GarajLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-8">
      {children}
    </div>
  );
}
