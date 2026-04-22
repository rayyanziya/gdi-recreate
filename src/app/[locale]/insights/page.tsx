import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Link } from "@/i18n/navigation";
import { articles, Article } from "@/lib/articles";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

function InsightCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group block border border-border p-8 hover:border-accent/30 transition-colors duration-200"
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
      <p className="text-sm text-muted leading-relaxed mb-6 line-clamp-4">
        {article.excerpt}
      </p>
      <span className="text-xs tracking-widest text-muted group-hover:text-accent transition-colors duration-200 font-medium uppercase flex items-center gap-2">
        Read more <span>→</span>
      </span>
    </Link>
  );
}

export default function InsightsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-24 lg:pb-28 border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <p className="text-xs tracking-widest text-accent uppercase mb-8 font-medium">
              INSIGHTS
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-primary leading-[1.05] tracking-tight max-w-4xl mb-8">
              Research, perspective, and applied thinking.
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Articles */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        {articles.length === 0 ? (
          <ScrollReveal>
            <div className="border border-border py-24 text-center">
              <p className="text-lg font-semibold text-primary mb-2">No articles yet</p>
              <p className="text-sm text-muted">
                Articles from our team will appear here once published
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <InsightCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
