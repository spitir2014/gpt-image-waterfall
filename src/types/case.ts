export interface PromptCase {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryLabel: string;
  author: string;
  sourceUrl: string;
  prompt: string;
  lang: string;
  images: string[];
  coverImage: string;
  likeCount: number;
  retweetCount: number;
  viewCount: number;
  addedAt: string;
  tags: string[];
}
