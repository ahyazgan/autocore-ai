import Link from "next/link";
import { ImagePlus, Video, ScanSearch, Car, FileText, Images } from "lucide-react";

const TOOLS = [
  { name: "BG Remover", href: "/studio/bg-remover", icon: ImagePlus },
  { name: "360° Spin", href: "/studio/360-spin", icon: Video },
  { name: "Damage Detect", href: "/studio/damage-detect", icon: ScanSearch },
  { name: "Virtual Tuner", href: "/studio/virtual-tuner", icon: Car },
  { name: "Listing Gen", href: "/studio/listing-gen", icon: FileText },
  { name: "Reels Maker", href: "/studio/reels-maker", icon: Images },
];

export default function StudioHubPage() {
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
