import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ArticleCard } from "@/components/article-card"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { sampleArticles, categories } from "@/lib/sample-data"
import Link from "next/link"

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* Page Header */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <h1 className="font-serif text-3xl lg:text-4xl text-foreground mb-4">All Articles</h1>
            <p className="text-muted-foreground max-w-2xl">
              Explore our complete archive of market analysis, educational content, and investment insights.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/articles"
                className="px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-sm"
              >
                All
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground border border-border hover:border-foreground/20 rounded-sm transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 gap-0">
                  {sampleArticles.map((article) => (
                    <ArticleCard
                      key={article.slug}
                      title={article.title}
                      excerpt={article.excerpt}
                      category={article.category}
                      categorySlug={article.categorySlug}
                      date={article.date}
                      slug={article.slug}
                    />
                  ))}
                </div>

                {/* Load More */}
                <div className="mt-8 text-center">
                  <button className="px-6 py-2 text-sm font-medium text-muted-foreground border border-border hover:border-foreground/20 rounded-sm transition-colors">
                    Load more articles
                  </button>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24 flex flex-col gap-8">
                  <NewsletterSignup />

                  {/* Categories List */}
                  <div className="border border-border p-6">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">Categories</h3>
                    <ul className="space-y-3">
                      {categories.map((category) => (
                        <li key={category.slug}>
                          <Link href={`/category/${category.slug}`} className="flex items-center justify-between group">
                            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                              {category.name}
                            </span>
                            <span className="text-xs text-muted-foreground/60">
                              {sampleArticles.filter((a) => a.categorySlug === category.slug).length}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Popular Articles */}
                  <div className="border border-border p-6">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">
                      Most Popular
                    </h3>
                    <ul className="space-y-4">
                      {sampleArticles.slice(0, 3).map((article, index) => (
                        <li key={article.slug} className="flex gap-3">
                          <span className="font-serif text-2xl text-muted-foreground/30">{index + 1}</span>
                          <Link href={`/articles/${article.slug}`} className="group flex-1">
                            <h4 className="text-sm text-foreground group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                              {article.title}
                            </h4>
                          </Link>
                        </li>
                      ))}
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
