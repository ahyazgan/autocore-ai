import Link from "next/link";
import { Barcode, TrendingUp, Calculator, LineChart, ShieldAlert, Globe, Link2 } from "lucide-react";

const TOOLS = [
  { name: "VIN Decoder", href: "/data/vin-decoder", icon: Barcode },
  { name: "Price Check", href: "/data/price-check", icon: TrendingUp },
  { name: "TCO Calculator", href: "/data/tco-calculator", icon: Calculator },
  { name: "Future Value", href: "/data/future-value", icon: LineChart },
  { name: "Lemon Check", href: "/data/lemon-check", icon: ShieldAlert },
  { name: "Import Calc", href: "/data/import-calc", icon: Globe },
  { name: "Scam Detect", href: "/data/scam-detect", icon: Link2 },
];

export default function DataHubPage() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {TOOLS.map(({ name, href, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className="flex items-center gap-4 rounded-xl border border-border bg-carbon-900 p-6 transition-colors hover:border-primary/50"
        >
          <div className="flex size-12 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Icon className="size-6" />
          </div>
          <span className="font-medium text-foreground">{name}</span>
        </Link>
      ))}
    </div>
  );
}
