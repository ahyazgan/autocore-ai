"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  Plus,
  TrendingUp,
  FileText,
  Shield,
  ClipboardList,
  Calendar,
  AlertCircle,
  CheckCircle,
  ChevronRight,
} from "lucide-react";

const MOCK_VEHICLE = {
  brand: "Volkswagen",
  model: "Golf 1.4 TSI",
  plate: "34 ABC 123",
  odometer: 67_500,
  value: "1.250.000",
  image: null,
};

const REMINDERS = [
  {
    id: "bakim",
    title: "Periyodik Bakım",
    detail: "2.500 km veya 3 ay içinde",
    status: "yellow" as const,
    due: "km",
  },
  {
    id: "tuvturk",
    title: "TÜVTÜRK Muayene",
    detail: "15.08.2026",
    status: "green" as const,
    due: "date",
  },
  {
    id: "kasko",
    title: "Kasko Yenileme",
    detail: "45 gün kaldı",
    status: "yellow" as const,
    due: "days",
  },
];

const DOC_SLOTS = [
  { id: "ruhsat", label: "Ruhsat Fotoğrafı", icon: FileText },
  { id: "police", label: "Poliçe", icon: Shield },
  { id: "servis", label: "Servis Formları", icon: ClipboardList },
];

const VALUE_HISTORY = [
  { month: "Eyl", value: 1180 },
  { month: "Eki", value: 1195 },
  { month: "Kas", value: 1210 },
  { month: "Ara", value: 1225 },
  { month: "Oca", value: 1235 },
  { month: "Şub", value: 1250 },
];

const statusStyles = {
  red: "border-red-500/50 bg-red-500/10 text-red-400",
  yellow: "border-amber-500/50 bg-amber-500/10 text-amber-400",
  green: "border-emerald-500/50 bg-emerald-500/10 text-emerald-400",
};

export default function GarajimPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "belge" | "grafik">("overview");

  const maxVal = Math.max(...VALUE_HISTORY.map((d) => d.value));
  const minVal = Math.min(...VALUE_HISTORY.map((d) => d.value));
  const range = maxVal - minVal || 1;

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 py-8">
        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
            Garajım
          </h1>
          <Link
            href="/garajim/ekle"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-white transition hover:bg-primary/90"
          >
            <Plus className="size-5" />
            Yeni Araç Ekle
          </Link>
        </motion.header>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 border-b border-zinc-800">
          {(["overview", "belge", "grafik"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`border-b-2 px-4 py-2 text-sm font-medium transition ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {tab === "overview" && "Özet"}
              {tab === "belge" && "Belge Kasası"}
              {tab === "grafik" && "Değer Grafiği"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              className="space-y-8"
            >
              {/* Vehicle Card */}
              <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
                <div className="grid gap-0 md:grid-cols-5">
                  <div className="relative aspect-video bg-zinc-800 md:aspect-auto md:min-h-[220px]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Car className="size-24 text-zinc-600" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-between p-6 md:col-span-4">
                    <div>
                      <p className="text-2xl font-bold text-zinc-50">
                        {MOCK_VEHICLE.brand} {MOCK_VEHICLE.model}
                      </p>
                      <p className="mt-1 text-zinc-400">
                        {MOCK_VEHICLE.plate} · {MOCK_VEHICLE.odometer.toLocaleString("tr-TR")} km
                      </p>
                    </div>
                    <Link
                      href="/araclar/arabam-ne-eder"
                      className="mt-4 inline-flex items-center gap-2 rounded-xl border border-primary/50 bg-primary/10 px-4 py-2.5 text-primary transition hover:bg-primary/20"
                    >
                      <TrendingUp className="size-4" />
                      Güncel piyasa değeri: {MOCK_VEHICLE.value} ₺
                      <ChevronRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Maintenance & Reminders */}
              <section>
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-zinc-50">
                  <Calendar className="size-5 text-primary" />
                  Bakım ve Hatırlatıcılar
                </h2>
                <ul className="space-y-3">
                  {REMINDERS.map((r) => (
                    <li key={r.id}>
                      <div
                        className={`flex items-center justify-between rounded-xl border px-4 py-3 ${statusStyles[r.status]}`}
                      >
                        <div className="flex items-center gap-3">
                          {r.status === "green" ? (
                            <CheckCircle className="size-5 shrink-0" />
                          ) : r.status === "red" ? (
                            <AlertCircle className="size-5 shrink-0" />
                          ) : (
                            <Calendar className="size-5 shrink-0" />
                          )}
                          <div>
                            <p className="font-medium">{r.title}</p>
                            <p className="text-sm opacity-90">{r.detail}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </motion.div>
          )}

          {activeTab === "belge" && (
            <motion.div
              key="belge"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-semibold text-zinc-50">Belge Kasası</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {DOC_SLOTS.map((slot) => (
                  <div
                    key={slot.id}
                    className="flex flex-col items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-800/50 p-8 text-center"
                  >
                    <div className="flex size-16 items-center justify-center rounded-full bg-zinc-700/50 text-zinc-400">
                      <slot.icon className="size-8" />
                    </div>
                    <p className="mt-4 font-medium text-zinc-200">{slot.label}</p>
                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        className="rounded-lg border border-zinc-600 bg-zinc-700/50 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-600"
                      >
                        Yükle
                      </button>
                      <button
                        type="button"
                        className="rounded-lg bg-primary/20 px-4 py-2 text-sm text-primary hover:bg-primary/30"
                      >
                        Dosya Görüntüle
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "grafik" && (
            <motion.div
              key="grafik"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-semibold text-zinc-50">Değer Grafiği (Son 6 Ay)</h2>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                <div className="h-64 w-full">
                  <svg viewBox="0 0 400 160" className="h-full w-full" preserveAspectRatio="none">
                    {VALUE_HISTORY.map((d, i) => {
                      const x = (i / (VALUE_HISTORY.length - 1)) * 360 + 20;
                      const y = 140 - ((d.value - minVal) / range) * 120;
                      const next = VALUE_HISTORY[i + 1];
                      const nextX = next ? ((i + 1) / (VALUE_HISTORY.length - 1)) * 360 + 20 : x;
                      const nextY = next ? 140 - ((next.value - minVal) / range) * 120 : y;
                      return (
                        <g key={d.month}>
                          {i < VALUE_HISTORY.length - 1 && (
                            <line
                              x1={x}
                              y1={y}
                              x2={nextX}
                              y2={nextY}
                              stroke="hsl(217 91% 60%)"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          )}
                          <circle cx={x} cy={y} r="4" fill="hsl(217 91% 60%)" />
                          <text x={x} y={152} textAnchor="middle" className="fill-zinc-500" style={{ fontSize: 10 }}>
                            {d.month}
                          </text>
                          <text x={x} y={y - 8} textAnchor="middle" className="fill-zinc-400" style={{ fontSize: 9 }}>
                            {d.value}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
                <p className="mt-2 text-center text-sm text-zinc-500">
                  Tahmini piyasa değeri (₺ 000)
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
