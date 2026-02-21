import type { Metadata } from "next";
import Link from "next/link";
import {
  Coins,
  FileSearch,
  ImageIcon,
  Settings,
  LayoutDashboard,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Panel | OtoZeka",
  description: "Kredileriniz, geçmiş sorgular ve stüdyo galeriniz.",
};

const SIDEBAR_LINKS = [
  { href: "/dashboard", label: "Ana Sayfa", icon: LayoutDashboard },
  { href: "/dashboard/krediler", label: "Kalan Kredilerim", icon: Coins },
  { href: "/dashboard/tramer", label: "Geçmiş Tramer Sorgularım", icon: FileSearch },
  { href: "/dashboard/galeri", label: "Stüdyo Galerim", icon: ImageIcon },
  { href: "/dashboard/ayarlar", label: "Ayarlar", icon: Settings },
];

export default function DashboardLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row">
      <aside className="w-full border-b border-zinc-800 bg-zinc-900/50 lg:w-64 lg:border-b-0 lg:border-r lg:py-6">
        <nav className="flex flex-wrap gap-2 p-4 lg:flex-col lg:gap-1 lg:px-4">
          {SIDEBAR_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100 lg:rounded-lg"
            >
              <Icon className="size-5 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="min-w-0 flex-1 p-4 lg:p-8">{children}</main>
    </div>
  );
}
