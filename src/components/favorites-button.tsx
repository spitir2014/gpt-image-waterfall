"use client";

import { useEffect, useMemo, useState } from "react";

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

function writeFavorites(ids: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new CustomEvent("favorites-updated"));
}

export function FavoritesButton({
  caseId,
  compact = false,
}: {
  caseId: string;
  compact?: boolean;
}) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const active = useMemo(() => favorites.includes(caseId), [favorites, caseId]);

  useEffect(() => {
    const sync = () => setFavorites(readFavorites());
    sync();
    window.addEventListener("favorites-updated", sync);
    return () => window.removeEventListener("favorites-updated", sync);
  }, []);

  function toggleFavorite() {
    const next = active
      ? favorites.filter((id) => id !== caseId)
      : [caseId, ...favorites];
    setFavorites(next);
    writeFavorites(next);
  }

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      className={`rounded-full border transition ${
        compact
          ? "px-3 py-1.5 text-xs"
          : "px-4 py-2 text-sm"
      } ${
        active
          ? "border-amber-300/30 bg-amber-300/15 text-amber-100"
          : "border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10"
      }`}
    >
      {active ? "已收藏" : compact ? "收藏" : "加入收藏"}
    </button>
  );
}
