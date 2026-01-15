import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ArticleCard } from "@/components/article-card"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import Link from "next/link"

export default async function ContrarianPage() {
  const supabase = await createServerSupabaseClient()

  // Fetch contrarian articles from Supabase
  const { data: contrarianArticles } = await supabase
    .from('articles')
    .select('*')
    .eq('category', 'The Contrarian')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* Hero Section */}
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="max-w-3xl">
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent mb-4">
                Weekly Feature
              </span>
              <h1 className="font-serif text-4xl lg:text-5xl text-foreground mb-6 leading-tight">The Contrarian</h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                A dedicated weekly section presenting non-consensus views on macro trends and market dynamics.
                Thought-provoking analysis that challenges conventional wisdom.
              </p>
              <p className="text-sm text-muted-foreground/80 border-l-2 border-accent pl-4">
                Note: The Contrarian presents opinionated analysis meant to stimulate critical thinking. These views may
                differ from consensus and should not be considered investment advice.
              </p>
            </div>
          </div>
        </section>

        {/* Articles */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">
                  Latest Contrarian Pieces
                </h2>
                {contrarianArticles && contrarianArticles.length > 0 ? (
                  <div className="space-y-8">
                    {contrarianArticles.map((article) => (
                      <ArticleCard
                        key={article.slug}
                        title={article.title}
                        excerpt={article.excerpt || ''}
                        category={article.category}
                        categorySlug={article.category_slug}
                        date={article.published_at || article.created_at}
                        slug={article.slug}
                        featured
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border border-border">
                    <p className="text-muted-foreground">New Contrarian piece coming soon.</p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24 flex flex-col gap-8">
                  {/* About The Contrarian */}
                  <div className="bg-card border border-border p-6">
                    <h3 className="text-sm font-semibold text-foreground mb-3">What is The Contrarian?</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      Every week, we publish a piece that takes a non-consensus view on an important market or macro
                      topic. Our goal is to challenge groupthink and encourage independent analysis.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        Non-consensus perspectives
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        Data-driven arguments
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        Clearly labeled as opinion
                      </li>
                    </ul>
                  </div>

                  <NewsletterSignup />

                  {/* Related Content */}
                  <div className="border border-border p-6">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">
                      Related Reading
                    </h3>
                    <ul className="space-y-3">
                      <li>
                        <Link
                          href="/category/equity-opinions"
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Equity Opinions →
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/category/macro"
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Macro & Market Structure →
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
