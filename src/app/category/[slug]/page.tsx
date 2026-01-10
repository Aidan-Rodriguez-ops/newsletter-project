import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ArticleCard } from "@/components/article-card"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { sampleArticles, categories } from "@/lib/sample-data"
import Link from "next/link"
import { notFound } from "next/navigation"

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = categories.find((c) => c.slug === slug)

  if (!category) {
    notFound()
  }

  const categoryArticles = sampleArticles.filter((a) => a.categorySlug === slug)

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* Page Header */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <nav className="mb-4">
              <Link href="/articles" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                ← All Articles
              </Link>
            </nav>
            <h1 className="font-serif text-3xl lg:text-4xl text-foreground mb-4">{category.name}</h1>
            <p className="text-muted-foreground max-w-2xl">{category.description}</p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/articles"
                className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground border border-border hover:border-foreground/20 rounded-sm transition-colors"
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors ${
                    cat.slug === slug
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground border border-border hover:border-foreground/20"
                  }`}
                >
                  {cat.name}
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
                {categoryArticles.length > 0 ? (
                  <div className="grid grid-cols-1 gap-0">
                    {categoryArticles.map((article) => (
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
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No articles in this category yet.</p>
                    <Link href="/articles" className="mt-4 inline-block text-sm text-accent hover:underline">
                      Browse all articles
                    </Link>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24 flex flex-col gap-8">
                  <NewsletterSignup />

                  {/* Related Categories */}
                  <div className="border border-border p-6">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">
                      Other Categories
                    </h3>
                    <ul className="space-y-3">
                      {categories
                        .filter((c) => c.slug !== slug)
                        .map((cat) => (
                          <li key={cat.slug}>
                            <Link href={`/category/${cat.slug}`} className="flex items-center justify-between group">
                              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                {cat.name}
                              </span>
                              <span className="text-xs text-muted-foreground/60">
                                {sampleArticles.filter((a) => a.categorySlug === cat.slug).length}
                              </span>
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
