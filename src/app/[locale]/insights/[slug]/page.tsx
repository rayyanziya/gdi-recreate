import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Link } from "@/i18n/navigation";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  }).format(new Date(iso));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;

  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!article) notFound();

  return (
    <>
      <section className="pt-32 pb-16 border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <Link
              href="/insights"
              className="text-xs tracking-widest text-muted hover:text-accent transition-colors font-medium uppercase inline-block mb-8"
            >
              ← Insights
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <p className="text-xs tracking-widest text-accent uppercase mb-5 font-medium">
              {article.category}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black text-primary leading-[1.05] tracking-tight max-w-4xl mb-8">
              {article.title}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-muted text-lg leading-relaxed max-w-2xl mb-8">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-3 text-sm text-muted">
              <span className="font-medium text-primary">{article.author}</span>
              {article.author_role && (
                <>
                  <span>·</span>
                  <span>{article.author_role}</span>
                </>
              )}
              {article.published_at && (
                <>
                  <span>·</span>
                  <span>{formatDate(article.published_at)}</span>
                </>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="max-w-[760px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="article-content">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </section>
    </>
  );
}
