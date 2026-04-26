"use client";

import { useEffect } from "react";

const STORAGE_KEY = "gpt-image-gallery:recently-viewed";

function readIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function ViewTracker({ caseId }: { caseId: string }) {
  useEffect(() => {
    const current = readIds().filter((id) => id !== caseId);
    const next = [caseId, ...current].slice(0, 8);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("recently-viewed-updated"));
  }, [caseId]);

  return null;
}
