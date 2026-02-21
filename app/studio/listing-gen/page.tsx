import { FileText } from "lucide-react";

export default function ListingGenPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Listing Gen</h2>
      <div className="rounded-xl border border-border bg-carbon-900 p-8">
        <h3 className="mb-4 text-sm font-medium text-foreground">Vehicle details</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {["Make", "Model", "Year", "Mileage", "Price", "Location"].map((label) => (
            <div key={label}>
              <label className="mb-1 block text-sm text-muted-foreground">{label}</label>
              <div className="h-10 rounded-md border border-border bg-carbon-800" />
            </div>
          ))}
        </div>
        <div className="mt-6">
          <label className="mb-1 block text-sm text-muted-foreground">Description</label>
          <div className="min-h-[120px] rounded-md border border-border bg-carbon-800" />
        </div>
        <div className="mt-6 flex justify-end">
          <div className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground">
            <FileText className="size-4" />
            Generate listing
          </div>
        </div>
      </div>
    </div>
  );
}
