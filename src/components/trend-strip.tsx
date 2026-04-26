import Link from "next/link";
import type { PromptCase } from "@/types/case";

export function TrendStrip({ items }: { items: PromptCase[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item, index) => (
        <Link
          key={item.id}
          href={`/p/${item.slug}`}
          className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 transition hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-white/[0.06]"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="text-3xl font-semibold text-white/20">0{index + 1}</span>
            <span className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-2.5 py-1 text-xs text-cyan-100">
              Trending
            </span>
          </div>
          <h3 className="mt-4 line-clamp-2 text-lg font-semibold text-white">{item.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-400">{item.categoryLabel}</p>
          <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
            <span>@{item.author}</span>
            <span>{item.viewCount} views</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
