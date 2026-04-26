import Link from "next/link";
import type { PromptCase } from "@/types/case";

export function RelatedGrid({ items }: { items: PromptCase[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((relatedItem) => (
        <Link
          key={relatedItem.id}
          href={`/p/${relatedItem.slug}`}
          className="group rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:bg-white/[0.08]"
        >
          <div className="flex items-center justify-between gap-3 text-xs text-neutral-500">
            <span>{relatedItem.categoryLabel}</span>
            <span>{relatedItem.viewCount} views</span>
          </div>
          <h3 className="mt-3 line-clamp-2 text-lg font-semibold text-white">{relatedItem.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-neutral-400">
            {relatedItem.prompt || "继续查看相似视觉方向与风格表达。"}
          </p>
          <div className="mt-4 text-sm font-medium text-cyan-200">查看详情 →</div>
        </Link>
      ))}
    </div>
  );
}
