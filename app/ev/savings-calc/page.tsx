import { Fuel, Zap } from "lucide-react";

export default function SavingsCalcPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Savings Calc</h2>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-carbon-900 p-6">
          <h3 className="mb-4 flex items-center gap-2 font-medium text-foreground">
            <Fuel className="size-4" />
            ICE
          </h3>
          <div className="space-y-3">
            <div className="h-10 rounded-md border border-border bg-carbon-800" />
            <div className="h-10 rounded-md border border-border bg-carbon-800" />
          </div>
          <p className="mt-4 text-xl font-semibold text-foreground">— /year</p>
        </div>
        <div className="rounded-xl border border-border bg-carbon-900 p-6">
          <h3 className="mb-4 flex items-center gap-2 font-medium text-foreground">
            <Zap className="size-4" />
            EV
          </h3>
          <div className="space-y-3">
            <div className="h-10 rounded-md border border-border bg-carbon-800" />
            <div className="h-10 rounded-md border border-border bg-carbon-800" />
          </div>
          <p className="mt-4 text-xl font-semibold text-electric">— /year</p>
        </div>
      </div>
      <div className="rounded-lg border border-primary/30 bg-primary/5 p-6 text-center">
        <p className="text-sm text-muted-foreground">Estimated savings</p>
        <p className="mt-1 text-2xl font-semibold text-electric">— /year</p>
      </div>
    </div>
  );
}
