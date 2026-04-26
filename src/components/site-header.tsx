import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0a0a0a]/72 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 via-white to-fuchsia-300 text-sm font-black text-neutral-950 shadow-[0_10px_30px_rgba(34,211,238,0.25)]">
            GI
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{siteConfig.name}</p>
            <p className="text-xs text-neutral-500">AI Prompt Inspiration Waterfall</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-neutral-300 md:flex">
          <Link href="/">首页</Link>
          <a href="#featured">精选</a>
          <a href="#gallery">瀑布流</a>
          <a href={siteConfig.links.repo} target="_blank" rel="noreferrer">GitHub</a>
        </nav>
      </div>
    </header>
  );
}
