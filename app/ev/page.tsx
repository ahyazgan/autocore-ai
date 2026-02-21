import Link from "next/link";
import { Gauge, Zap, Battery, Calculator } from "lucide-react";

const TOOLS = [
  { name: "Range Estimator", href: "/ev/range-estimator", icon: Gauge },
  { name: "Charging Cost", href: "/ev/charging-cost", icon: Zap },
  { name: "Battery Health", href: "/ev/battery-health", icon: Battery },
  { name: "Savings Calc", href: "/ev/savings-calc", icon: Calculator },
];

export default function EVHubPage() {
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
