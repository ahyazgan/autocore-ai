import Link from "next/link";
import { Mic, Lightbulb, Code, Radio, Circle, Droplets, Hash } from "lucide-react";

const TOOLS = [
  { name: "Mechanic AI", href: "/garage/mechanic-ai", icon: Mic },
  { name: "Dashboard Lights", href: "/garage/dashboard-lights", icon: Lightbulb },
  { name: "OBD Codes", href: "/garage/obd-codes", icon: Code },
  { name: "Radio Code", href: "/garage/radio-code", icon: Radio },
  { name: "Tire Calc", href: "/garage/tire-calc", icon: Circle },
  { name: "Oil Finder", href: "/garage/oil-finder", icon: Droplets },
  { name: "Part Cross-Ref", href: "/garage/part-cross-ref", icon: Hash },
];

export default function GarageHubPage() {
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
