import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FilterBar } from "@/components/filter-bar";
import { MasonryGrid } from "@/components/masonry-grid";
import { SearchBar } from "@/components/search-bar";
import { SiteHeader } from "@/components/site-header";
import { SortBar } from "@/components/sort-bar";
import { categoryLabelMap } from "@/lib/categories";
import { filterCases, getAllCases } from "@/lib/data";

export function generateStaticParams() {
  const slugs = Array.from(new Set(getAllCases().map((item) => item.category)));
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const label = categoryLabelMap[slug as keyof typeof categoryLabelMap] || slug;
  return {
    title: `${label} | GPT Image Gallery`,
    description: `浏览 ${label} 分类下的 GPT Image Prompt 案例、视觉灵感与可复用内容。`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const query = "";
  const sort = "popular";
  const items = filterCases({ category: slug, query, sort });

  if (!items.length && !query) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#07090d] text-white">
      <SiteHeader />
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 md:px-8 md:py-12">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <div className="space-y-4">
            <Link href="/" className="text-sm text-neutral-400 transition hover:text-white">
              ← 返回首页
            </Link>
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">Category</p>
              <h1 className="text-3xl font-semibold md:text-4xl">
                {categoryLabelMap[slug as keyof typeof categoryLabelMap] || slug}
              </h1>
              <p className="max-w-3xl text-sm leading-7 text-neutral-400">
                当前分类页已支持搜索、排序与 URL 参数同步。适合继续往 SEO 聚合页和分类专题页演进。
              </p>
            </div>
            <SearchBar placeholder="在当前分类下继续搜索（静态演示版仅保留输入体验）…" />
          </div>
        </div>

        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <FilterBar activeCategory={slug} query={query} sort={sort} />
          <SortBar activeSort={sort} basePath={`/category/${slug}`} query={query} />
        </div>

        <div className="text-sm text-neutral-500">
          当前结果：{items.length} 条{query ? ` · 搜索词：${query}` : ""}
        </div>

        <MasonryGrid items={items} query={query} />
      </main>
    </div>
  );
}
