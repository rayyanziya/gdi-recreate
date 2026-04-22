export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO format: "2024-01-15"
  author: string;
  category: string;
  coverImage?: string;
}

// Add articles here — sorted newest first
export const articles: Article[] = [];
