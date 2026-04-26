import rawCases from "@/data/cases.json";
import { categories } from "@/lib/categories";
import type { PromptCase } from "@/types/case";

const cases = rawCases as PromptCase[];

export function getAllCases() {
  return cases;
}

export function getFeaturedCases() {
  return sortCases(cases, "popular").slice(0, 12);
}

export function getCaseBySlug(slug: string) {
  return cases.find((item) => item.slug === slug);
}

export function getCasesByCategory(category: string) {
  if (category === "all") return cases;
  return cases.filter((item) => item.category === category);
}

export function searchCases(query: string, category: string = "all") {
  const keyword = query.trim().toLowerCase();
  return getCasesByCategory(category).filter((item) => {
    if (!keyword) return true;
    const haystack = [
      item.title,
      item.author,
      item.prompt,
      item.categoryLabel,
      item.tags.join(" "),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(keyword);
  });
}

export function sortCases(items: PromptCase[], sort: string) {
  const cloned = [...items];
  switch (sort) {
    case "latest":
      return cloned.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
    case "likes":
      return cloned.sort((a, b) => b.likeCount - a.likeCount);
    case "title":
      return cloned.sort((a, b) => a.title.localeCompare(b.title));
    case "popular":
    default:
      return cloned.sort(
        (a, b) =>
          b.viewCount - a.viewCount ||
          b.likeCount - a.likeCount ||
          b.retweetCount - a.retweetCount
      );
  }
}

export function filterCases({
  query = "",
  category = "all",
  sort = "popular",
}: {
  query?: string;
  category?: string;
  sort?: string;
}) {
  const searched = searchCases(query, category);
  return sortCases(searched, sort);
}

export function getRelatedCases(current: PromptCase, limit: number = 6) {
  return sortCases(
    cases.filter(
      (item) => item.slug !== current.slug && item.category === current.category
    ),
    "popular"
  ).slice(0, limit);
}

export function getCategoryStats() {
  return categories.map((category) => ({
    ...category,
    count:
      category.slug === "all"
        ? cases.length
        : cases.filter((item) => item.category === category.slug).length,
  }));
}
