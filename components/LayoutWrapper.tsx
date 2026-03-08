"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return <>{children}</>;
  }

  return (
    <div style={{ background: "#f5f3ee", minHeight: "100vh" }}>
      <Navbar />
      <main className="min-h-[calc(100vh-8rem)] px-4 sm:px-6">{children}</main>
      <Footer />
    </div>
  );
}
