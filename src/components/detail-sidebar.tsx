import Link from "next/link";
import type { PromptCase } from "@/types/case";

export function DetailSidebar({ item }: { item: PromptCase }) {
  return (
    <aside className="space-y-4 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">Case Snapshot</p>
        <h3 className="mt-2 text-xl font-semibold text-white">案例快照</h3>
      </div>
      <div className="grid gap-3">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs text-neutral-500">作者</p>
          <p className="mt-2 text-sm font-medium text-white">@{item.author}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs text-neutral-500">分类</p>
          <p className="mt-2 text-sm font-medium text-white">{item.categoryLabel}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs text-neutral-500">标签</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {item.tags.slice(0, 5).map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-neutral-300">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <Link
        href={`/category/${item.category}`}
        className="block rounded-full border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-white/10"
      >
        去看同类专题
      </Link>
    </aside>
  );
}
