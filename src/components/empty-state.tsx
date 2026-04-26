import Link from "next/link";

export function EmptyState({ query }: { query?: string }) {
  return (
    <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/[0.03] px-6 py-14 text-center">
      <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">No Results</p>
      <h3 className="mt-3 text-2xl font-semibold text-white">没有匹配到内容</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-neutral-400">
        {query
          ? `当前搜索词“${query}”没有命中标题、作者或 Prompt 关键词。你可以尝试更短的词，或者切换回全部浏览。`
          : "当前筛选条件下没有内容，可以返回首页重新浏览。"}
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
