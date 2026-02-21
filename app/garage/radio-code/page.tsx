import { Radio } from "lucide-react";

export default function RadioCodePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Radio Code</h2>
      <div className="rounded-xl border border-border bg-carbon-900 p-8">
        <label className="mb-2 block text-sm text-muted-foreground">Serial number</label>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter radio serial number"
            className="flex h-12 flex-1 rounded-lg border border-border bg-carbon-800 px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button className="h-12 rounded-lg bg-primary px-6 text-primary-foreground hover:bg-primary/90">
            Get code
          </button>
        </div>
        <div className="mt-6 rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Code result will appear here.</p>
        </div>
      </div>
    </div>
  );
}
