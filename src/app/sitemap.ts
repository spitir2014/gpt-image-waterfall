import type { MetadataRoute } from "next";
import { getAllCases } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const cases = getAllCases();
  const categories = Array.from(new Set(cases.map((item) => item.category)));

  return [
    {
      url: siteConfig.url,
      changeFrequency: "daily",
      priority: 1,
    },
    ...categories.map((category) => ({
      url: `${siteConfig.url}/category/${category}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...cases.map((item) => ({
      url: `${siteConfig.url}/p/${item.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
