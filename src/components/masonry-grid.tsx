import { EmptyState } from "@/components/empty-state";
import { PromptCard } from "@/components/prompt-card";
import type { PromptCase } from "@/types/case";

export function MasonryGrid({
  items,
  query,
}: {
  items: PromptCase[];
  query?: string;
}) {
  if (!items.length) {
    return <EmptyState query={query} />;
  }

  return (
    <div className="columns-1 gap-5 md:columns-2 xl:columns-4">
      {items.map((item) => (
        <PromptCard key={item.id} item={item} />
      ))}
    </div>
  );
}
