import Link from "next/link";
import { getCategoryStats } from "@/lib/data";

export function FilterBar({
  activeCategory,
  query,
  sort,
}: {
  activeCategory: string;
  query?: string;
  sort?: string;
}) {
  const stats = getCategoryStats();

  return (
    <div className="flex flex-wrap gap-3">
      {stats.map((category) => {
        const active = category.slug === activeCategory;
        const params = new URLSearchParams();
        if (query) params.set("q", query);
        if (sort && sort !== "popular") params.set("sort", sort);
        const base = category.slug === "all" ? "/" : `/category/${category.slug}`;
        const href = `${base}${params.toString() ? `?${params.toString()}` : ""}`;

        return (
          <Link
            key={category.slug}
            href={href}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              active
                ? "border-white bg-white text-neutral-950"
                : "border-white/15 bg-white/5 text-neutral-200 hover:bg-white/10"
            }`}
          >
            {category.label} · {category.count}
          </Link>
        );
      })}
    </div>
  );
}
