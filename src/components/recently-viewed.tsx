"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { PromptCase } from "@/types/case";

const STORAGE_KEY = "gpt-image-gallery:recently-viewed";

function readRecentlyViewed(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function RecentlyViewed({ items }: { items: PromptCase[] }) {
  const [recentItems, setRecentItems] = useState<PromptCase[]>([]);

  useEffect(() => {
    const sync = () => {
      const ids = readRecentlyViewed();
      const mapped = ids
        .map((id) => items.find((item) => item.id === id))
        .filter(Boolean) as PromptCase[];
      setRecentItems(mapped.slice(0, 4));
    };
    sync();
    window.addEventListener("recently-viewed-updated", sync);
    return () => window.removeEventListener("recently-viewed-updated", sync);
  }, [items]);

  if (!recentItems.length) return null;

  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">History</p>
        <h2 className="mt-2 text-2xl font-semibold">最近浏览</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {recentItems.map((item) => (
          <Link
            key={item.id}
            href={`/p/${item.slug}`}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 transition hover:bg-white/[0.08]"
          >
            <p className="text-xs text-neutral-500">@{item.author}</p>
            <h3 className="mt-3 line-clamp-2 text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-400">{item.categoryLabel}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
