import { Home, Zap } from "lucide-react";

export default function ChargingCostPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Charging Cost</h2>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-carbon-900 p-6">
          <h3 className="mb-4 flex items-center gap-2 font-medium text-foreground">
            <Home className="size-4" />
            Home
          </h3>
          <div className="space-y-3">
            <div className="h-10 rounded-md border border-border bg-carbon-800" />
            <div className="h-10 rounded-md border border-border bg-carbon-800" />
          </div>
          <p className="mt-4 text-2xl font-semibold text-foreground">— /month</p>
        </div>
        <div className="rounded-xl border border-border bg-carbon-900 p-6">
          <h3 className="mb-4 flex items-center gap-2 font-medium text-foreground">
            <Zap className="size-4" />
            Public
          </h3>
          <div className="space-y-3">
            <div className="h-10 rounded-md border border-border bg-carbon-800" />
            <div className="h-10 rounded-md border border-border bg-carbon-800" />
          </div>
          <p className="mt-4 text-2xl font-semibold text-foreground">— /month</p>
        </div>
      </div>
      <div className="rounded-lg border border-border p-4 text-center text-muted-foreground">
        Home vs Public comparison summary
      </div>
    </div>
  );
}
