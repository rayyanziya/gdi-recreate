import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { supabase } from "@/lib/supabase";

type ArticlePreview = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  published_at: string | null;
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  }).format(new Date(iso));
}

function ArticleCard({ article }: { article: ArticlePreview }) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group block border-r border-border last:border-r-0 p-8 hover:bg-surface transition-colors duration-200"
    >
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs tracking-widest text-accent uppercase font-medium">
          {article.category}
        </p>
        {article.published_at && (
          <p className="text-xs text-muted">{formatDate(article.published_at)}</p>
        )}
      </div>
      <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-200 leading-snug">
        {article.title}
      </h3>
      <p className="text-sm text-muted leading-relaxed mb-6 line-clamp-3">
        {article.excerpt}
      </p>
      <span className="text-xs tracking-widest text-muted group-hover:text-accent transition-colors duration-200 font-medium uppercase flex items-center gap-2">
        Read more <span>→</span>
      </span>
    </Link>
  );
}

export async function InsightsSection() {
  let latest: ArticlePreview[] = [];
  try {
    const { data } = await supabase
      .from("articles")
      .select("slug, title, excerpt, category, author, published_at")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .limit(3);
    latest = data || [];
  } catch {
    // Supabase not configured — show empty state
  }

  return (
    <section className="py-20 lg:py-28 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-12">
          <ScrollReveal>
            <p className="text-xs tracking-widest text-accent uppercase font-medium mb-3">
              INSIGHTS
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-primary">Insights</h2>
            <p className="text-muted mt-3 max-w-md">
              Perspectives and notes from our work
            </p>
          </ScrollReveal>
          <Link
            href="/insights"
            className="hidden sm:flex items-center gap-2 text-xs tracking-widest text-muted hover:text-accent transition-colors duration-200 font-medium uppercase shrink-0 pb-1"
          >
            View All Insights <span className="text-sm">→</span>
          </Link>
        </div>

        {latest.length === 0 ? (
          <ScrollReveal>
            <div className="border border-border py-20 text-center">
              <p className="text-lg font-semibold text-primary mb-2">No articles yet</p>
              <p className="text-sm text-muted">
                Articles from our team will appear here once published
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 border border-border">
            {latest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}

        <div className="sm:hidden mt-6 text-center">
          <Link
            href="/insights"
            className="text-xs tracking-widest text-muted hover:text-accent transition-colors duration-200 font-medium uppercase"
          >
            View All Insights →
          </Link>
        </div>
      </div>
    </section>
  );
}
