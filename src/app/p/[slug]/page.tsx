import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyButton } from "@/components/copy-button";
import { DetailSidebar } from "@/components/detail-sidebar";
import { FavoritesButton } from "@/components/favorites-button";
import { RelatedGrid } from "@/components/related-grid";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { ViewTracker } from "@/components/view-tracker";
import { getAllCases, getCaseBySlug, getRelatedCases } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return getAllCases().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getCaseBySlug(slug);
  if (!item) {
    return { title: "案例不存在 | GPT Image Gallery" };
  }
  return {
    title: `${item.title} | GPT Image Gallery`,
    description: item.prompt
      ? item.prompt.slice(0, 120)
      : `${item.categoryLabel} 分类下的 GPT Image 案例详情页。`,
    openGraph: {
      title: item.title,
      description: item.prompt
        ? item.prompt.slice(0, 120)
        : `${item.categoryLabel} 分类下的 GPT Image 案例详情页。`,
      images: [item.coverImage],
      url: `${siteConfig.url}/p/${item.slug}`,
    },
  };
}

export default async function PromptDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getCaseBySlug(slug);

  if (!item) {
    notFound();
  }

  const related = getRelatedCases(item);

  return (
    <div className="min-h-screen bg-[#07090d] text-white">
      <SiteHeader />
      <ViewTracker caseId={item.id} />
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 md:px-8 md:py-12">
        <Link href="/" className="text-sm text-neutral-400 transition hover:text-white">
          ← 返回首页
        </Link>
        <section className="grid gap-8 xl:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            <section className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/20 shadow-[0_25px_70px_rgba(0,0,0,0.35)]">
                  <div className="relative aspect-[4/5]">
                    <Image src={item.coverImage} alt={item.title} fill className="object-cover" sizes="(max-width: 1200px) 100vw, 55vw" unoptimized />
                    <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  </div>
                </div>
                {item.images.length > 1 ? (
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {item.images.slice(1).map((image, index) => (
                      <div key={`${image}-${index}`} className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/5">
                        <Image src={image} alt={`${item.title} ${index + 2}`} fill className="object-cover" sizes="240px" unoptimized />
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="space-y-6 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] md:p-8">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-400">
                    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-cyan-100">{item.categoryLabel}</span>
                    <span>@{item.author}</span>
                  </div>
                  <h1 className="text-3xl font-semibold md:text-4xl md:leading-tight">{item.title}</h1>
                  <p className="text-sm leading-7 text-neutral-400">
                    这个案例页现在已经不只是“图片 + Prompt”展示，而是正式产品详情页骨架：有内容主叙事、指标区、可复制 Prompt、收藏入口、最近浏览承接和同类内容分发区。
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <FavoritesButton caseId={item.id} />
                  <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300 transition hover:bg-white/10">
                    原帖来源
                  </a>
                </div>

                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4"><p className="text-neutral-500">Views</p><p className="mt-2 text-lg font-semibold">{item.viewCount || 0}</p></div>
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4"><p className="text-neutral-500">Likes</p><p className="mt-2 text-lg font-semibold">{item.likeCount || 0}</p></div>
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4"><p className="text-neutral-500">Reposts</p><p className="mt-2 text-lg font-semibold">{item.retweetCount || 0}</p></div>
                </div>

                <section className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-lg font-semibold">Prompt</h2>
                    <CopyButton text={item.prompt} />
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5 text-sm leading-7 text-neutral-300">
                    {item.prompt || "当前未匹配到完整 Prompt。你仍然可以通过原帖查看上下文，并在后续版本中由标准化脚本继续补齐。"}
                  </div>
                </section>

                <div className="flex flex-wrap gap-4">
                  <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200">查看原帖</a>
                  <Link href={`/category/${item.category}`} className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">查看同类案例</Link>
                </div>
              </div>
            </section>

            <section className="space-y-4 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-7">
              <SectionHeading eyebrow="Related" title="同类案例推荐" description="这里已经是标准内容产品里的“继续浏览”分发区，后续可以接相似 Prompt、相似风格、相似作者等更丰富的推荐逻辑。" />
              <RelatedGrid items={related} />
            </section>
          </div>

          <div>
            <DetailSidebar item={item} />
          </div>
        </section>
      </main>
    </div>
  );
}
