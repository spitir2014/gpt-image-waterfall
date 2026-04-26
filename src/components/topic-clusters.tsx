import Link from "next/link";

const clusters = [
  {
    title: "商业海报与品牌视觉",
    description: "适合整理成专题页，承接高意图搜索与商业风格浏览。",
    href: "/category/poster-illustration",
  },
  {
    title: "人像摄影与叙事感镜头",
    description: "强调真实感、光影和人物表达，适合高频浏览。",
    href: "/category/portrait-photography",
  },
  {
    title: "产品展示与社媒 UI 模拟",
    description: "适合吸引做营销、品牌、界面提案的人群。",
    href: "/category/ui-social-mockup",
  },
];

export function TopicClusters() {
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      {clusters.map((cluster) => (
        <Link
          key={cluster.title}
          href={cluster.href}
          className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 transition hover:bg-white/[0.07]"
        >
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-300">
            专题入口
          </div>
          <h3 className="mt-4 text-xl font-semibold text-white">{cluster.title}</h3>
          <p className="mt-3 text-sm leading-7 text-neutral-400">{cluster.description}</p>
          <div className="mt-5 text-sm font-medium text-cyan-200">进入专题 →</div>
        </Link>
      ))}
    </div>
  );
}
