import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MarketTicker } from "@/components/market-ticker"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { MarketSummaryCard } from "@/components/market-summary-card"
import { TopMovers } from "@/components/top-movers"
import { ArticleCard } from "@/components/article-card"
import { sampleArticles } from "@/lib/sample-data"

export default function Home() {
  const featuredArticles = sampleArticles.slice(0, 3)

  // Sample market data
  const marketData = {
    name: "S&P 500",
    value: "4,783.45",
    change: 45.23,
    changePercent: 0.95,
    high: "4,796.12",
    low: "4,765.33",
    volume: "3.2B"
  }

  const topMovers = {
    gainers: [
      { symbol: "NVDA", name: "NVIDIA Corp", price: "495.22", change: 18.45, changePercent: 3.87 },
      { symbol: "AAPL", name: "Apple Inc", price: "185.64", change: 5.32, changePercent: 2.95 },
      { symbol: "MSFT", name: "Microsoft Corp", price: "378.91", change: 8.12, changePercent: 2.19 }
    ],
    losers: [
      { symbol: "TSLA", name: "Tesla Inc", price: "238.45", change: -12.34, changePercent: -4.92 },
      { symbol: "META", name: "Meta Platforms", price: "352.18", change: -9.76, changePercent: -2.70 },
      { symbol: "AMZN", name: "Amazon.com", price: "151.94", change: -3.28, changePercent: -2.11 }
    ]
  }

  return (
    <div className="min-h-screen bg-background">
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
            {featuredArticles.map((article) => (
              <ArticleCard
                key={article.slug}
                title={article.title}
                excerpt={article.excerpt}
                category={article.category}
                categorySlug={article.categorySlug}
                date={article.date}
                slug={article.slug}
                featured
              />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
