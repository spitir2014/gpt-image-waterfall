import Link from "next/link";

const sortOptions = [
  { value: "popular", label: "最热" },
  { value: "latest", label: "最新" },
  { value: "likes", label: "最多喜欢" },
  { value: "title", label: "标题" },
] as const;

export function SortBar({
  activeSort,
  basePath = "/",
  query,
}: {
  activeSort: string;
  basePath?: string;
  query?: string;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {sortOptions.map((option) => {
        const params = new URLSearchParams();
        if (query) params.set("q", query);
        if (option.value !== "popular") params.set("sort", option.value);
        const href = `${basePath}${params.toString() ? `?${params.toString()}` : ""}`;
        const active = activeSort === option.value;
        return (
          <Link
            key={option.value}
            href={href}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              active
                ? "border-cyan-300/60 bg-cyan-300/15 text-cyan-100"
                : "border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10"
            }`}
          >
            {option.label}
          </Link>
        );
      })}
    </div>
  );
}
