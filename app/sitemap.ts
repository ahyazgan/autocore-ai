import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://otozeka.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/araclar/arabam-ne-eder", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/yapay-zeka/ekspertiz", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/araclar/kronik-sorunlar", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/fiyatlandirma", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/rehber", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/rehber/agir-hasar-kayitli-arac-alinir-mi-2026", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/rehber/ekspertiz-yanal-kayma-testi", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/rehber/dsg-sanziman-alirken-dikkat", priority: 0.7, changeFrequency: "monthly" as const },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
