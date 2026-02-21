import { Search, Code } from "lucide-react";

export default function ObdCodesPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h2 className="text-xl font-semibold text-foreground">OBD Codes</h2>
      <div className="rounded-xl border border-border bg-carbon-900 p-8">
        <div className="flex gap-3">
          <div className="relative flex flex-1">
            <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="e.g. P0420"
              className="h-12 w-full rounded-lg border border-border bg-carbon-800 pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button className="h-12 rounded-lg bg-primary px-6 text-primary-foreground hover:bg-primary/90">
            Lookup
          </button>
        </div>
        <div className="mt-6 flex items-center gap-3 rounded-lg border border-border bg-carbon-800/50 p-4">
          <Code className="size-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Code meaning will appear here.</p>
        </div>
      </div>
    </div>
  );
}
