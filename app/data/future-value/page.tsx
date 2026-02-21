import { LineChart } from "lucide-react";

export default function FutureValuePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Future Value</h2>
      <div className="rounded-xl border border-border bg-carbon-900 p-8">
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div>
            <label className="text-sm text-muted-foreground">Current value</label>
            <div className="mt-1 h-10 rounded-md border border-border bg-carbon-800" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Years</label>
            <div className="mt-1 h-10 rounded-md border border-border bg-carbon-800" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Depreciation %</label>
            <div className="mt-1 h-10 rounded-md border border-border bg-carbon-800" />
          </div>
        </div>
        <div className="flex min-h-[260px] items-center justify-center rounded-lg border border-border bg-carbon-800/50">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <LineChart className="size-16" />
            <span>Depreciation curve chart</span>
          </div>
        </div>
      </div>
    </div>
  );
}
