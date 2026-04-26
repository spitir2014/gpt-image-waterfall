import Image from "next/image";
import Link from "next/link";
import type { PromptCase } from "@/types/case";

export function FeaturedShowcase({ items }: { items: PromptCase[] }) {
  const [hero, ...rest] = items;
  if (!hero) return null;

  return (
    <section className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
      <Link
        href={`/p/${hero.slug}`}
        className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/20"
      >
        <div className="relative aspect-[16/10]">
          <Image
            src={hero.coverImage}
            alt={hero.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 1200px) 100vw, 66vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <div className="mb-4 inline-flex rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs text-white backdrop-blur-md">
              今日主推 · {hero.categoryLabel}
            </div>
            <h3 className="max-w-2xl text-2xl font-semibold md:text-4xl">{hero.title}</h3>
            <p className="mt-3 max-w-2xl line-clamp-3 text-sm leading-7 text-neutral-300 md:text-base">
              {hero.prompt || "打开详情页，查看完整案例上下文与 Prompt 灵感。"}
            </p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm text-neutral-300">
              <span>@{hero.author}</span>
              <span>{hero.viewCount} views</span>
              <span>{hero.likeCount} likes</span>
            </div>
          </div>
        </div>
      </Link>

      <div className="grid gap-4">
        {rest.slice(0, 3).map((item, index) => (
          <Link
            key={item.id}
            href={`/p/${item.slug}`}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 transition hover:bg-white/[0.08]"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Top Pick 0{index + 1}</p>
            <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-400">
              {item.prompt || item.categoryLabel}
            </p>
            <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
              <span>@{item.author}</span>
              <span>{item.categoryLabel}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
