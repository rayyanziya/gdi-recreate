import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface DbArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  author: string;
  author_role: string;
  cover_image: string;
  published: boolean;
  published_at: string | null;
  created_by: number | null;
  created_at: string;
  updated_at: string;
}
