import Link from "next/link";

export function TagCloud({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/?q=${encodeURIComponent(tag)}`}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-neutral-300 transition hover:bg-white/10"
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
}
