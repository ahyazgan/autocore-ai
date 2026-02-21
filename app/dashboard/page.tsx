"use client";

import { motion } from "framer-motion";
import { Coins, ImageIcon, Clock, ChevronRight } from "lucide-react";

const USER_NAME = "Kullanıcı";

const STATS = [
  { label: "Kalan Kredi", value: "12", icon: Coins },
  { label: "Bu Ay Düzenlenen Fotoğraf", value: "45", icon: ImageIcon },
];

const RECENT_ACTIVITY = [
  { title: "BMW 320i İlan Analizi Yapıldı", time: "2 saat önce", type: "ilan" },
  { title: "Ekspertiz Raporu Yüklendi", time: "Dün, 14:32", type: "tramer" },
  { title: "Araç fotoğrafı arka plan kaldırıldı", time: "Dün, 11:20", type: "stüdyo" },
  { title: "VIN Decoder sorgulandı", time: "3 gün önce", type: "veri" },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-xl backdrop-blur"
      >
        <h1 className="text-2xl font-bold text-zinc-50">
          Hoş Geldin, {USER_NAME}
        </h1>
        <p className="mt-1 text-zinc-400">
          Panelinden kredilerini ve son işlemlerini görebilirsin.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-6" />
              </div>
              <div>
                <p className="text-sm text-zinc-500">{stat.label}</p>
                <p className="text-2xl font-bold text-zinc-50">{stat.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-zinc-50">
          <Clock className="size-5 text-primary" />
          Son Aktiviteler
        </h2>
        <ul className="space-y-2">
          {RECENT_ACTIVITY.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="flex items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 transition-colors hover:border-zinc-700"
            >
              <div>
                <p className="font-medium text-zinc-200">{item.title}</p>
                <p className="text-sm text-zinc-500">{item.time}</p>
              </div>
              <ChevronRight className="size-5 shrink-0 text-zinc-500" />
            </motion.li>
          ))}
        </ul>
      </section>
    </div>
  );
}
