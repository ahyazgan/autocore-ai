import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elektrikli Araçlar | OtoZeka",
  description: "Menzil tahmini, şarj maliyeti, batarya sağlığı, tasarruf hesaplama.",
};

export default function EVLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold text-zinc-50">Elektrikli Araçlar</h1>
      {children}
    </div>
  );
}
