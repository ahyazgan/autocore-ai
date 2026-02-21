import { Circle } from "lucide-react";

export default function TireCalcPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Tire Calc</h2>
      <div className="rounded-xl border border-border bg-carbon-900 p-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="mb-3 text-sm font-medium text-foreground">Current size</h3>
            <div className="flex gap-2">
              <div className="h-10 flex-1 rounded-md border border-border bg-carbon-800" />
              <span className="flex items-center text-muted-foreground">/</span>
              <div className="h-10 flex-1 rounded-md border border-border bg-carbon-800" />
              <span className="flex items-center text-muted-foreground">R</span>
              <div className="h-10 w-20 rounded-md border border-border bg-carbon-800" />
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-medium text-foreground">New size</h3>
            <div className="flex gap-2">
              <div className="h-10 flex-1 rounded-md border border-border bg-carbon-800" />
              <span className="flex items-center text-muted-foreground">/</span>
              <div className="h-10 flex-1 rounded-md border border-border bg-carbon-800" />
              <span className="flex items-center text-muted-foreground">R</span>
              <div className="h-10 w-20 rounded-md border border-border bg-carbon-800" />
            </div>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-center gap-8 rounded-lg border border-border py-12">
          <div className="flex flex-col items-center gap-2">
            <Circle className="size-16 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Current</span>
          </div>
          <span className="text-muted-foreground">vs</span>
          <div className="flex flex-col items-center gap-2">
            <Circle className="size-16 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">New</span>
          </div>
        </div>
      </div>
    </div>
  );
}
