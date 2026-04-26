"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { PromptCase } from "@/types/case";

const STORAGE_KEY = "gpt-image-gallery:favorites";

function readFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function FavoritesPanel({ items }: { items: PromptCase[] }) {
  const [favoriteItems, setFavoriteItems] = useState<PromptCase[]>([]);

  useEffect(() => {
    const sync = () => {
      const ids = readFavorites();
      const mapped = ids
        .map((id) => items.find((item) => item.id === id))
        .filter(Boolean) as PromptCase[];
      setFavoriteItems(mapped.slice(0, 4));
    };
    sync();
    window.addEventListener("favorites-updated", sync);
    return () => window.removeEventListener("favorites-updated", sync);
  }, [items]);

  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">Favorites</p>
          <h2 className="mt-2 text-2xl font-semibold">收藏夹</h2>
        </div>
        <p className="text-sm text-neutral-500">本地持久化保存</p>
      </div>
      {favoriteItems.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {favoriteItems.map((item) => (
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
      ) : (
        <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-white/[0.03] px-6 py-8 text-sm leading-7 text-neutral-400">
          你还没有收藏内容。进入详情页或在卡片上点击“收藏”，这里会自动沉淀成你的本地灵感池。
        </div>
      )}
    </section>
  );
}
