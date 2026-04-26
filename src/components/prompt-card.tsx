import Image from "next/image";
import Link from "next/link";
import { FavoritesButton } from "@/components/favorites-button";
import type { PromptCase } from "@/types/case";

export function PromptCard({ item }: { item: PromptCase }) {
  return (
    <div className="group mb-5 break-inside-avoid overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] shadow-[0_10px_35px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-[0_20px_55px_rgba(0,0,0,0.35)]">
      <Link href={`/p/${item.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={item.coverImage}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-[1.05]"
            unoptimized
          />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs text-white backdrop-blur-md">
            {item.categoryLabel}
          </div>
        </div>
      </Link>
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-neutral-500">@{item.author}</span>
          <span className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-2.5 py-1 text-xs text-cyan-100">
            {item.viewCount ? `${item.viewCount} views` : 'Prompt Case'}
          </span>
        </div>
        <Link href={`/p/${item.slug}`} className="block">
          <div>
            <h3 className="line-clamp-2 text-base font-semibold text-white">{item.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-neutral-400">
              {item.prompt || "查看案例详情，获取原帖上下文与可复用 Prompt 灵感。"}
            </p>
          </div>
        </Link>
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2 text-xs text-neutral-500">
            {item.tags.slice(0, 2).map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
          <FavoritesButton caseId={item.id} compact />
        </div>
      </div>
    </div>
  );
}
