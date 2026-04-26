"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useTransition } from "react";

export function SearchBar({
  placeholder = "搜索标题、作者、Prompt 关键词…",
  basePath,
}: {
  placeholder?: string;
  basePath?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const value = useMemo(() => searchParams.get("q") ?? "", [searchParams]);
  const [isPending, startTransition] = useTransition();
  const targetPath = basePath ?? pathname ?? "/";

  function updateQuery(nextValue: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (nextValue.trim()) {
      params.set("q", nextValue.trim());
    } else {
      params.delete("q");
    }
    params.delete("page");
    const query = params.toString();
    startTransition(() => {
      router.push(query ? `${targetPath}?${query}` : targetPath);
    });
  }

  return (
    <div className="relative w-full max-w-xl">
      <input
        value={value}
        onChange={(event) => {
          updateQuery(event.target.value);
        }}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-white/8 px-5 py-4 text-sm text-white outline-none ring-0 placeholder:text-neutral-500 transition focus:border-cyan-400/40 focus:bg-white/10"
      />
      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-xs text-neutral-500">
        {isPending ? "更新中" : "搜索"}
      </div>
    </div>
  );
}
