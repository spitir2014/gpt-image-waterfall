import Link from "next/link";
import { CtaBanner } from "@/components/cta-banner";
import { FavoritesPanel } from "@/components/favorites-panel";
import { FeaturedShowcase } from "@/components/featured-showcase";
import { FilterBar } from "@/components/filter-bar";
import { MasonryGrid } from "@/components/masonry-grid";
import { RecommendationExplainer } from "@/components/recommendation-explainer";
import { RecentlyViewed } from "@/components/recently-viewed";
import { SearchBar } from "@/components/search-bar";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { SortBar } from "@/components/sort-bar";
import { StatCard } from "@/components/stat-card";
import { TagCloud } from "@/components/tag-cloud";
import { TopicClusters } from "@/components/topic-clusters";
import { TrendStrip } from "@/components/trend-strip";
import { filterCases, getAllCases, getFeaturedCases, sortCases } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const query = params.q ?? "";
  const sort = params.sort ?? "popular";
  const featured = getFeaturedCases();
  const allItems = getAllCases();
  const items = filterCases({ query, sort });
  const trending = sortCases(allItems, "popular").slice(0, 4);
  const topTags = Array.from(
    new Set(allItems.flatMap((item) => item.tags).filter(Boolean))
  ).slice(0, 12);

  return (
    <div className="min-h-screen bg-[#07090d] text-white">
      <SiteHeader />
      <main className="mx-auto flex max-w-7xl flex-col gap-14 px-5 py-8 md:px-8 md:py-12">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.24),_transparent_24%),radial-gradient(circle_at_80%_0%,_rgba(232,121,249,0.22),_transparent_24%),linear-gradient(180deg,#111827_0%,#09090b_100%)] px-6 py-8 shadow-[0_30px_120px_rgba(0,0,0,0.35)] md:px-10 md:py-10">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.03)_100%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-7">
              <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
                开源仓库 → 可运营内容产品原型
              </div>
              <div className="space-y-4">
                <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl md:leading-[1.05]">
                  把优秀的 GPT Image 案例，变成一个真正能刷、能搜、能收藏、能持续运营的灵感产品。
                </h1>
                <p className="max-w-2xl text-base leading-8 text-neutral-300 md:text-lg">
                  这个版本继续往可运营产品推进：增加收藏夹、最近浏览、标签分发入口，让用户不只是看完就走，而是能逐步沉淀自己的灵感资产。
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a href="#gallery" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200">
                  开始浏览
                </a>
                <Link href={featured[0] ? `/p/${featured[0].slug}` : "/"} className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  查看精选案例
                </Link>
                <a href={siteConfig.links.repo} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-neutral-300 transition hover:bg-white/5">
                  查看源仓库
                </a>
              </div>
              <SearchBar />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              {featured.slice(0, 3).map((item, index) => (
                <Link key={item.id} href={`/p/${item.slug}`} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition hover:bg-white/10">
                  <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Featured 0{index + 1}</p>
                  <h2 className="mt-3 text-xl font-semibold">{item.title}</h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-400">{item.prompt || item.categoryLabel}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
                    <span>@{item.author}</span>
                    <span>{item.categoryLabel}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <StatCard label="Cases" value={String(allItems.length)} hint="当前可展示案例总量，已整理为统一数据结构。" />
          <StatCard label="Categories" value="5" hint="首版先提供五大主题分类，方便快速浏览与过滤。" />
          <StatCard label="Retention" value="Favorites + History" hint="开始具备内容沉淀与回访承接能力。" />
        </section>

        <section className="space-y-5">
          <SectionHeading eyebrow="Showcase" title="更像正式内容产品的精选展示" description="首页不再只有单一瀑布流，而是增加主推内容位和精选分发位，让用户一进来就能快速感知价值。" />
          <FeaturedShowcase items={featured.slice(0, 4)} />
        </section>

        <section className="space-y-5">
          <SectionHeading eyebrow="Trending" title="趋势内容入口" description="这一层更像真实产品首页中的“热门趋势”，既增强首页信息密度，也适合后续演进成榜单或自动推荐模块。" />
          <TrendStrip items={trending} />
        </section>

        <FavoritesPanel items={allItems} />
        <RecentlyViewed items={allItems} />

        <section className="space-y-5 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-7">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <SectionHeading eyebrow="Explore" title="按分类、关键词与热度浏览" description="现在已经支持搜索词、分类切换和排序切换，URL 会同步当前状态，后续扩展分享与 SEO 会更自然。" />
            <SortBar activeSort={sort} query={query} />
          </div>
          <FilterBar activeCategory="all" query={query} sort={sort} />
        </section>

        <section className="space-y-5">
          <SectionHeading eyebrow="Tags" title="标签分发入口" description="标签是最轻量、但非常实用的运营入口。它既能帮助用户继续探索，也能为后续做标签页、专题页和 SEO 聚合埋好基础。" />
          <TagCloud tags={topTags} />
        </section>

        <section className="space-y-5">
          <SectionHeading eyebrow="Topics" title="可继续扩展成专题页的内容入口" description="我先帮你把专题入口结构搭出来，后面可以继续延伸成“商业海报 Prompt 专题”“人像摄影专题”等 SEO / 运营页面。" />
          <TopicClusters />
        </section>

        <section className="space-y-5">
          <SectionHeading eyebrow="Operate" title="更像可运营产品的基础能力" description="这几块不是视觉装饰，而是后续走留存、沉淀、复访、分发时很重要的底层能力。" />
          <RecommendationExplainer />
        </section>

        <section id="gallery" className="space-y-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Gallery" title="灵感瀑布流" description="主内容区继续承担高频浏览任务，后面可以再补无限加载、收藏、瀑布流骨架屏和个性化推荐。" />
            <p className="text-sm text-neutral-500">当前结果：{items.length} 条{query ? ` · 搜索词：${query}` : ""}</p>
          </div>
          <MasonryGrid items={items} query={query} />
        </section>

        <CtaBanner />
      </main>
    </div>
  );
}
