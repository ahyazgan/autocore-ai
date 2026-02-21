import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio — The Media Factory | AutoCore.ai",
  description: "BG remover, 360 spin, damage detect, virtual tuner, listing gen, reels maker.",
};

export default function StudioLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold text-foreground">Studio — The Media Factory</h1>
      {children}
    </div>
  );
}
