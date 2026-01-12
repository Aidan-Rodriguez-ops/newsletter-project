"use client"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MarketTicker } from "@/components/market-ticker"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { MarketSummaryCard } from "@/components/market-summary-card"
import { TopMovers } from "@/components/top-movers"
import { ArticleCard } from "@/components/article-card"
import { DisclosureModal } from "@/components/disclosure-modal"

export default function Home() {
  const [featuredArticles, setFeaturedArticles] = useState<any[]>([])

  // State for market data
  const [marketData, setMarketData] = useState({
    name: "S&P 500",
    value: "Loading...",
    change: 0,
    changePercent: 0,
    high: undefined,
    low: undefined,
    volume: undefined
  })

  const [topMovers, setTopMovers] = useState({
    gainers: [] as any[],
    losers: [] as any[]
  })

  const [loading, setLoading] = useState(true)

  // Fetch market data
  useEffect(() => {
    async function fetchMarketData() {
      try {
        const response = await fetch('/api/market')
        const data = await response.json()

        if (data.marketData) {
          setMarketData({
            ...data.marketData,
            change: parseFloat(data.marketData.change),
            changePercent: parseFloat(data.marketData.changePercent)
          })
        }

        if (data.topMovers) {
          setTopMovers(data.topMovers)
        }

        setLoading(false)
      } catch (error) {
        console.error('Error fetching market data:', error)
        setLoading(false)
      }
    }

    fetchMarketData()

    // Refresh every 30 minutes
    const interval = setInterval(fetchMarketData, 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // Fetch featured articles from Supabase
  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch('/api/articles?limit=3')
        const data = await response.json()

        if (data.articles) {
          setFeaturedArticles(data.articles)
        }
      } catch (error) {
        console.error('Error fetching articles:', error)
      }
    }

    fetchArticles()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <DisclosureModal />
      <SiteHeader />
      <MarketTicker />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Main Line Briefing Room
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your source for intelligent financial analysis, market insights, and contrarian perspectives.
            </p>
          </div>
          <NewsletterSignup />
        </section>

        {/* Market Summary */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl font-bold mb-6">Market Overview</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <MarketSummaryCard {...marketData} />
            <div>
              <TopMovers {...topMovers} />
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-bold">Featured Articles</h2>
            <a href="/articles" className="text-sm font-medium text-primary hover:underline">
              View all →
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredArticles.length === 0 ? (
              <div className="col-span-3 text-center text-muted-foreground py-8">
                No articles available yet. Check back soon!
              </div>
            ) : (
              featuredArticles.map((article) => (
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
              ))
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
