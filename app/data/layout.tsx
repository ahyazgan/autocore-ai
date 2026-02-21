import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data — The Intelligence Vault | AutoCore.ai",
  description: "VIN decoder, price check, TCO, future value, lemon check, import calc, scam detect.",
};

export default function DataLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold text-foreground">Data — The Intelligence Vault</h1>
      {children}
    </div>
  );
}
