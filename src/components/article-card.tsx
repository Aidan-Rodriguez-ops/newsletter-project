"use client"

import Link from "next/link"

interface ArticleCardProps {
  title: string
  excerpt: string
  category: string
  categorySlug: string
  date: string
  slug: string
  featured?: boolean
}

export function ArticleCard({
  title,
  excerpt,
  category,
  categorySlug,
  date,
  slug,
  featured = false,
}: ArticleCardProps) {
  if (featured) {
    return (
      <article className="group relative bg-card border border-border overflow-hidden">
        <div className="block p-6 lg:p-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Link
                href={`/category/${categorySlug}`}
                className="text-xs font-semibold uppercase tracking-wider text-accent hover:underline"
              >
                {category}
              </Link>
              <span className="text-xs text-muted-foreground">{date}</span>
            </div>
            <Link href={`/articles/${slug}`}>
              <h2 className="font-serif text-2xl lg:text-3xl text-foreground group-hover:text-accent transition-colors leading-tight text-balance">
                {title}
              </h2>
            </Link>
            <p className="text-muted-foreground leading-relaxed text-pretty">{excerpt}</p>
            <Link
              href={`/articles/${slug}`}
              className="inline-flex items-center text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              Read more
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="group border-b border-border last:border-0 py-6 first:pt-0">
      <div className="block">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Link
              href={`/category/${categorySlug}`}
              className="text-xs font-semibold uppercase tracking-wider text-accent hover:underline"
            >
              {category}
            </Link>
            <span className="text-xs text-muted-foreground">{date}</span>
          </div>
          <Link href={`/articles/${slug}`}>
            <h3 className="font-serif text-lg text-foreground group-hover:text-accent transition-colors leading-snug">
              {title}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2">{excerpt}</p>
        </div>
      </div>
    </article>
  )
}
