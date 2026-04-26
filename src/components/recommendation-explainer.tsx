export function RecommendationExplainer() {
  return (
    <section className="grid gap-4 xl:grid-cols-3">
      <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
        <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">Operate</p>
        <h3 className="mt-3 text-xl font-semibold">收藏沉淀</h3>
        <p className="mt-3 text-sm leading-7 text-neutral-400">
          用户浏览中产生的高意图内容，会被收藏机制沉淀下来，后面可以继续扩展为账号体系与云端同步。
        </p>
      </div>
      <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
        <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">Retain</p>
        <h3 className="mt-3 text-xl font-semibold">最近浏览</h3>
        <p className="mt-3 text-sm leading-7 text-neutral-400">
          用户返回首页时能快速接着看，降低中断损耗，这是一种很基础但很有效的留存能力。
        </p>
      </div>
      <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
        <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">Distribute</p>
        <h3 className="mt-3 text-xl font-semibold">标签与专题分发</h3>
        <p className="mt-3 text-sm leading-7 text-neutral-400">
          标签搜索和专题入口会让内容不只是“被看见”，而是能继续组织、沉淀和放大分发价值。
        </p>
      </div>
    </section>
  );
}
