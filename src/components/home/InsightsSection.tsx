import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { articles, Article } from "@/lib/articles";

const latest = articles.slice(0, 3);

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group block border-r border-border last:border-r-0 p-8 hover:bg-surface transition-colors duration-200"
    >
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs tracking-widest text-accent uppercase font-medium">
          {article.category}
        </p>
        <p className="text-xs text-muted">{formatDate(article.date)}</p>
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

export function InsightsSection() {
  return (
    <section className="py-20 lg:py-28 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
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

        {/* Content */}
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

        {/* Mobile view all */}
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
