import { CircleAlert, AlertTriangle, Info } from "lucide-react";

export default function DashboardLightsPage() {
  const icons = [
    { icon: CircleAlert, label: "Engine" },
    { icon: AlertTriangle, label: "ABS" },
    { icon: Info, label: "TPMS" },
    { icon: CircleAlert, label: "Oil" },
    { icon: AlertTriangle, label: "Brake" },
    { icon: Info, label: "Battery" },
  ];
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Dashboard Lights</h2>
      <div className="rounded-xl border border-border bg-carbon-900 p-8">
        <p className="mb-6 text-sm text-muted-foreground">Common warning icons</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {icons.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 rounded-lg border border-border bg-carbon-800 p-6"
            >
              <Icon className="size-10 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
