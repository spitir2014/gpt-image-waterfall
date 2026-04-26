import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function CtaBanner() {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(232,121,249,0.18),_transparent_25%),linear-gradient(180deg,#10131a_0%,#0b0d12_100%)] p-7 md:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">Next Phase</p>
          <h2 className="text-2xl font-semibold md:text-3xl">这个首版已经具备产品骨架，下一步可以直接进入运营与上线阶段。</h2>
          <p className="text-sm leading-7 text-neutral-400 md:text-base">
            你接下来可以继续把它做成一个正式站点：接入部署、域名、专题页、收藏体系、Prompt 改写器，逐步把它从作品集升级为可运营产品。
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/"
            className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200"
          >
            继续打磨首页
          </Link>
          <a
            href={siteConfig.links.repo}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            查看源仓库
          </a>
        </div>
      </div>
    </section>
  );
}
