"use client";

import { useMemo, useState } from "react";

export function SearchBar({
  placeholder = "搜索标题、作者、Prompt 关键词…",
}: {
  placeholder?: string;
}) {
  const [value, setValue] = useState("");
  const hint = useMemo(() => (value.trim() ? `当前输入：${value.trim()}` : "静态部署版暂不支持 URL 搜索"), [value]);

  return (
    <div className="relative w-full max-w-xl">
      <input
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-white/8 px-5 py-4 text-sm text-white outline-none ring-0 placeholder:text-neutral-500 transition focus:border-cyan-400/40 focus:bg-white/10"
      />
      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-xs text-neutral-500">
        搜索输入
      </div>
      <p className="mt-2 text-xs text-neutral-500">{hint}</p>
    </div>
  );
}
