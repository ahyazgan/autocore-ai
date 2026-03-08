"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Copy, CheckCircle, Loader2 } from "lucide-react";

const FIELDS = [
  { key: "make", label: "Marka", placeholder: "örn: Toyota" },
  { key: "model", label: "Model", placeholder: "örn: Corolla" },
  { key: "year", label: "Yıl", placeholder: "örn: 2021" },
  { key: "mileage", label: "Kilometre", placeholder: "örn: 45000" },
  { key: "price", label: "Fiyat (₺)", placeholder: "örn: 950000" },
  { key: "location", label: "Konum", placeholder: "örn: İstanbul, Kadıköy" },
] as const;

type FieldKey = typeof FIELDS[number]["key"];
type FormData = Record<FieldKey, string> & { description: string };

const INITIAL: FormData = {
  make: "", model: "", year: "", mileage: "", price: "", location: "", description: "",
};

export default function ListingGenPage() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ title: string; listing: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const isValid = form.make.trim() && form.model.trim() && form.year.trim();

  const handleChange = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setResult(null);
    setError(null);
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/generate-listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "İlan oluşturulamadı.");
      } else {
        setResult(data);
      }
    } catch {
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    const text = `${result.title}\n\n${result.listing}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-50">İlan Oluşturucu</h1>
        <p className="mt-1 text-sm text-zinc-400">Araç bilgilerini girin, yapay zeka profesyonel bir satış ilanı oluştursun</p>
      </div>

      {/* Form */}
      <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 p-6 space-y-5">
        <h3 className="text-sm font-medium text-zinc-300">Araç Bilgileri</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {FIELDS.map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="mb-1.5 block text-sm text-zinc-400">
                {label}
                {(key === "make" || key === "model" || key === "year") && (
                  <span className="ml-1 text-red-400">*</span>
                )}
              </label>
              <input
                type={key === "year" || key === "mileage" || key === "price" ? "number" : "text"}
                value={form[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-xl border border-zinc-600 bg-zinc-900 px-4 py-2.5 text-zinc-50 outline-none placeholder:text-zinc-600 focus:border-blue-500"
              />
            </div>
          ))}
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-zinc-400">Ek Bilgiler / Donanımlar</label>
          <textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Örn: Full dolu, sunroof, deri koltuk, geri görüş kamerası, ilk sahibinden, hasarsız..."
            rows={3}
            className="w-full resize-none rounded-xl border border-zinc-600 bg-zinc-900 px-4 py-3 text-zinc-50 outline-none placeholder:text-zinc-600 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-zinc-500">* Zorunlu alanlar</p>
          <button
            onClick={handleGenerate}
            disabled={!isValid || loading}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                İlan Oluşturuluyor...
              </>
            ) : (
              <>
                <FileText className="size-4" />
                İlan Oluştur
              </>
            )}
          </button>
        </div>
      </div>

      {/* Hata */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-400"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sonuç */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-emerald-500/30 bg-zinc-800/50 overflow-hidden"
          >
            <div className="flex items-center justify-between p-5 border-b border-zinc-700">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle className="size-5" />
                <span className="font-semibold">İlan Oluşturuldu</span>
              </div>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
                  copied
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                }`}
              >
                {copied ? (
                  <><CheckCircle className="size-4" />Kopyalandı!</>
                ) : (
                  <><Copy className="size-4" />Kopyala</>
                )}
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <p className="text-xs text-zinc-500 mb-1">İlan Başlığı</p>
                <p className="font-bold text-lg text-zinc-50">{result.title}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-2">İlan Metni</p>
                <div className="rounded-xl bg-zinc-900 p-4 text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">
                  {result.listing}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
