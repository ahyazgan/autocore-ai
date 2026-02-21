import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Garage — Maintenance & Utility | AutoCore.ai",
  description: "Mechanic AI, dashboard lights, OBD codes, radio code, tire calc, oil finder, part cross-ref.",
};

export default function GarageLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold text-foreground">Garage — Maintenance & Utility</h1>
      {children}
    </div>
  );
}
