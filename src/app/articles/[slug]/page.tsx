import type React from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ArticleCard } from "@/components/article-card"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { sampleArticles } from "@/lib/sample-data"
import Link from "next/link"
import { notFound } from "next/navigation"

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return sampleArticles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = sampleArticles.find((a) => a.slug === slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = sampleArticles
    .filter((a) => a.categorySlug === article.categorySlug && a.slug !== article.slug)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* Article Header */}
        <article>
          <header className="border-b border-border">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
              <nav className="mb-6">
                <Link
                  href={`/category/${article.categorySlug}`}
                  className="text-sm text-accent hover:underline transition-colors"
                >
                  ← {article.category}
                </Link>
              </nav>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">{article.category}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <time className="text-xs text-muted-foreground">{article.date}</time>
              </div>

              <h1 className="font-serif text-3xl lg:text-4xl xl:text-5xl text-foreground leading-tight mb-6 text-balance">
                {article.title}
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">{article.excerpt}</p>

              <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-sm font-medium text-muted-foreground">RT</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{article.author}</p>
                    <p className="text-xs text-muted-foreground">Main Line Briefing Room</p>
                  </div>
                </div>

                {/* Share buttons placeholder */}
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Share on X"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </button>
                  <button
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                    </svg>
                  </button>
                  <button
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Copy link"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="border-b border-border">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Main Content */}
                <div className="lg:col-span-8">
                  <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-normal prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground prose-blockquote:border-l-accent prose-blockquote:text-muted-foreground prose-blockquote:italic prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
                    {article.content ? (
                      <ArticleContent content={article.content} />
                    ) : (
                      <div className="text-muted-foreground">
                        <p className="mb-6">{article.excerpt}</p>
                        <p className="text-sm italic">Full article content coming soon.</p>
                      </div>
                    )}
                  </div>

                  {/* Article Footer */}
                  <div className="mt-12 pt-8 border-t border-border">
                    <p className="text-xs text-muted-foreground italic">
                      This content is for informational purposes only and does not constitute investment advice. Always
                      conduct your own research before making investment decisions.
                    </p>
                  </div>
                </div>

                {/* Sidebar */}
                <aside className="lg:col-span-4">
                  <div className="sticky top-24 flex flex-col gap-8">
                    <NewsletterSignup />

                    {/* Table of Contents placeholder */}
                    <div className="border border-border p-6 hidden lg:block">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">
                        In This Article
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="hover:text-foreground transition-colors cursor-pointer">The Setup</li>
                        <li className="hover:text-foreground transition-colors cursor-pointer">Key Demands</li>
                        <li className="hover:text-foreground transition-colors cursor-pointer">Market Reaction</li>
                        <li className="hover:text-foreground transition-colors cursor-pointer">Our Take</li>
                        <li className="hover:text-foreground transition-colors cursor-pointer">Risks to Consider</li>
                      </ul>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="border-b border-border">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedArticles.map((related) => (
                  <ArticleCard
                    key={related.slug}
                    title={related.title}
                    excerpt={related.excerpt}
                    category={related.category}
                    categorySlug={related.categorySlug}
                    date={related.date}
                    slug={related.slug}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}

// Simple markdown-like content renderer
function ArticleContent({ content }: { content: string }) {
  const lines = content.trim().split("\n")
  const elements: React.ReactNode[] = []
  let currentList: string[] = []
  let inBlockquote = false
  let blockquoteContent: string[] = []

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc pl-6 mb-6 space-y-2">
          {currentList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>,
      )
      currentList = []
    }
  }

  const flushBlockquote = () => {
    if (blockquoteContent.length > 0) {
      elements.push(
        <blockquote key={`quote-${elements.length}`} className="border-l-4 border-accent pl-4 my-6 italic">
          {blockquoteContent.map((line, i) => (
            <p key={i}>{line.replace(/^>\s*"?|"?\s*$/g, "")}</p>
          ))}
        </blockquote>,
      )
      blockquoteContent = []
      inBlockquote = false
    }
  }

  lines.forEach((line, index) => {
    const trimmedLine = line.trim()

    if (!trimmedLine) {
      flushList()
      flushBlockquote()
      return
    }

    // Headings
    if (trimmedLine.startsWith("## ")) {
      flushList()
      flushBlockquote()
      elements.push(
        <h2 key={index} className="font-serif text-2xl text-foreground mt-10 mb-4">
          {trimmedLine.replace("## ", "")}
        </h2>,
      )
      return
    }

    if (trimmedLine.startsWith("### ")) {
      flushList()
      flushBlockquote()
      elements.push(
        <h3 key={index} className="font-serif text-xl text-foreground mt-8 mb-3">
          {trimmedLine.replace("### ", "")}
        </h3>,
      )
      return
    }

    // Blockquotes
    if (trimmedLine.startsWith(">")) {
      flushList()
      inBlockquote = true
      blockquoteContent.push(trimmedLine)
      return
    }

    // List items
    if (trimmedLine.startsWith("- ") || trimmedLine.match(/^\d+\.\s/)) {
      flushBlockquote()
      currentList.push(trimmedLine.replace(/^-\s+|\d+\.\s+/, ""))
      return
    }

    // Horizontal rule
    if (trimmedLine === "---") {
      flushList()
      flushBlockquote()
      elements.push(<hr key={index} className="my-8 border-border" />)
      return
    }

    // Regular paragraph
    flushList()
    flushBlockquote()

    // Handle bold and italic text
    const processedLine = trimmedLine
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")

    elements.push(
      <p key={index} className="mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: processedLine }} />,
    )
  })

  flushList()
  flushBlockquote()

  return <>{elements}</>
}
