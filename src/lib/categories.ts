export const categories = [
  { slug: "all", label: "全部" },
  { slug: "portrait-photography", label: "人像摄影" },
  { slug: "poster-illustration", label: "海报插画" },
  { slug: "character-design", label: "角色设计" },
  { slug: "ui-social-mockup", label: "UI / 社媒 Mockup" },
  { slug: "comparison-community", label: "对比 / 社区案例" },
] as const;

export const categoryLabelMap = Object.fromEntries(
  categories.map((category) => [category.slug, category.label])
);
