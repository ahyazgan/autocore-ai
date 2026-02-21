import { Gauge, Thermometer } from "lucide-react";

export default function RangeEstimatorPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Range Estimator</h2>
      <div className="rounded-xl border border-border bg-carbon-900 p-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Gauge className="size-4" />
              Speed (mph)
            </label>
            <input type="range" className="w-full accent-primary" defaultValue={55} />
            <p className="mt-1 text-sm text-foreground">55 mph</p>
          </div>
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Thermometer className="size-4" />
              Temperature (°F)
            </label>
            <input type="range" className="w-full accent-primary" defaultValue={70} min={-20} max={100} />
            <p className="mt-1 text-sm text-foreground">70 °F</p>
          </div>
        </div>
        <div className="mt-8 rounded-lg border border-border p-6 text-center">
          <p className="text-sm text-muted-foreground">Estimated range</p>
          <p className="mt-1 text-3xl font-semibold text-electric">— mi</p>
        </div>
      </div>
    </div>
  );
}
