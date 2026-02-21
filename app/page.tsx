"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ImageIcon, Wrench } from "lucide-react";

const PILLARS = [
  {
    id: "yapay-zeka",
    title: "Yapay Zeka Güvencesi",
    description: "Ekspertiz, Tramer ve ilan analizi ile alım satımda güven.",
    href: "/yapay-zeka",
    icon: Sparkles,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: "stüdyo",
    title: "Sanal Stüdyo",
    description: "Profesyonel galeri çözümleri: arka plan kaldırma, 360°, ilan görselleri.",
    href: "/studio",
    icon: ImageIcon,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    id: "garaj",
    title: "Akıllı Garaj",
    description: "OBD, bakım rehberi, muayene takvimi ve elektrikli araç araçları.",
    href: "/garage",
    icon: Wrench,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HomePage() {
  return (
    <div className="font-friendly min-h-screen bg-slate-50 text-slate-800">
      {/* ——— Hero: warm photo + gradient mesh ——— */}
      <section className="relative min-h-[85vh] overflow-hidden md:min-h-[90vh]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1920"
            alt=""
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Subtle white gradient mesh for readability */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white/95"
            aria-hidden
          />
        </div>
        <div className="container relative mx-auto flex min-h-[85vh] flex-col items-center justify-center px-4 py-24 text-center md:min-h-[90vh] md:py-32">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl text-3xl font-bold leading-tight tracking-tight text-slate-800 sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Hayalinizdeki Arabaya Giden En Güvenli Yol.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 max-w-2xl text-lg text-slate-600 sm:text-xl"
          >
            Yapay zeka ile ekspertiz raporlarını anlıyoruz, sizin için en doğru
            aracı buluyoruz.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-5"
          >
            <Link
              href="/araclar"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-10 py-4 font-semibold text-white shadow-lg shadow-blue-500/30 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/40"
            >
              Sistemi Keşfet
            </Link>
            <Link
              href="/fiyatlandirma"
              className="inline-flex items-center justify-center rounded-full border-2 border-slate-300 bg-white/80 px-10 py-4 font-semibold text-slate-700 shadow-md transition duration-300 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white hover:shadow-lg"
            >
              Kurumsal Çözümler
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ——— 3 Pillar cards: white, soft shadow, friendly icons ——— */}
      <section className="px-4 py-20 md:py-28 lg:px-12">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-3"
          >
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.div key={pillar.id} variants={cardItem}>
                  <Link
                    href={pillar.href}
                    className="group flex h-full flex-col rounded-3xl border border-slate-200/80 bg-white p-10 shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl md:p-12"
                  >
                    <div
                      className={`flex size-16 items-center justify-center rounded-2xl ${pillar.iconBg} ${pillar.iconColor} md:size-20`}
                    >
                      <Icon className="size-8 md:size-10" />
                    </div>
                    <h2 className="mt-8 text-xl font-bold tracking-tight text-slate-800 md:text-2xl">
                      {pillar.title}
                    </h2>
                    <p className="mt-4 flex-1 text-slate-600 md:text-lg">
                      {pillar.description}
                    </p>
                    <span className="mt-8 inline-flex items-center text-sm font-semibold text-blue-600 transition group-hover:text-blue-700">
                      Keşfet →
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ——— Minimal footer line (main Footer component handles full footer) ——— */}
      <section className="border-t border-slate-200 bg-white/60 px-4 py-16">
        <p className="mx-auto max-w-xl text-center text-sm text-slate-500">
          Yapay zeka ile araç alım satımında güven ve şeffaflık.
        </p>
      </section>
    </div>
  );
}
