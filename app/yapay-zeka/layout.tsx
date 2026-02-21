import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yapay Zeka Araçları | OtoZeka",
  description: "İlan analizi ve yapay zeka destekli araç araçları.",
};

export default function YapayZekaLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-8">
      {children}
    </div>
  );
}
