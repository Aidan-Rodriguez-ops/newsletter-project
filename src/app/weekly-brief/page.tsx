import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MarketSummaryCard } from "@/components/market-summary-card"
import { TopMovers } from "@/components/top-movers"
import { ArticleCard } from "@/components/article-card"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { sampleArticles } from "@/lib/sample-data"
import Link from "next/link"

const weeklyData = {
  indices: [
    { name: "S&P 500", value: "5,827.04", change: 87.45, changePercent: 1.52 },
    { name: "NASDAQ", value: "18,342.94", change: 234.56, changePercent: 1.3 },
    { name: "DOW", value: "42,518.28", change: 312.89, changePercent: 0.74 },
    { name: "Russell 2000", value: "2,284.65", change: -12.34, changePercent: -0.54 },
  ],
  gainers: [
    { symbol: "SMCI", name: "Super Micro", price: "892.34", change: 156.78, changePercent: 21.32 },
    { symbol: "NVDA", name: "NVIDIA Corp", price: "148.52", change: 18.92, changePercent: 14.61 },
    { symbol: "META", name: "Meta Platforms", price: "598.45", change: 62.31, changePercent: 11.62 },
    { symbol: "AVGO", name: "Broadcom Inc", price: "178.92", change: 16.45, changePercent: 10.13 },
    { symbol: "ORCL", name: "Oracle Corp", price: "142.67", change: 12.89, changePercent: 9.94 },
  ],
  losers: [
    { symbol: "INTC", name: "Intel Corp", price: "21.34", change: -4.56, changePercent: -17.61 },
    { symbol: "BA", name: "Boeing Co", price: "156.78", change: -23.45, changePercent: -13.01 },
    { symbol: "WBA", name: "Walgreens Boots", price: "12.45", change: -1.67, changePercent: -11.83 },
    { symbol: "CVS", name: "CVS Health", price: "52.34", change: -5.89, changePercent: -10.12 },
    { symbol: "PFE", name: "Pfizer Inc", price: "26.78", change: -2.45, changePercent: -8.39 },
  ],
  mAndA: [
    { acquirer: "Vista Equity", target: "Instructure Holdings", value: "$4.8B", premium: "28%", status: "Announced" },
    { acquirer: "Brookfield", target: "Triton International", value: "$13.3B", premium: "35%", status: "Pending" },
    { acquirer: "Private Equity Consortium", target: "GoDaddy Inc", value: "$8.2B", premium: "22%", status: "Rumored" },
  ],
}

export default function WeeklyBriefPage() {
  const weekOfDate = "January 6-10, 2025"
  const relatedArticles = sampleArticles
    .filter((a) => a.type === "weekly-brief" || a.categorySlug === "macro")
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* Page Header */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent mb-4">
              Weekly Feature
            </span>
            <h1 className="font-serif text-3xl lg:text-4xl text-foreground mb-4">Weekly Market Brief</h1>
            <p className="text-muted-foreground max-w-2xl mb-2">
              A comprehensive overview of the week&apos;s market activity, major developments, and what to watch ahead.
            </p>
            <p className="text-sm text-muted-foreground">Week of {weekOfDate}</p>
          </div>
        </section>

        {/* Week in Review Summary */}
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Week in Review
            </h2>
            <p className="text-foreground leading-relaxed max-w-4xl">
              U.S. equities posted solid gains this week as investors digested better-than-expected employment data and
              continued optimism around AI-related spending. The S&P 500 gained 1.52%, led by technology and
              communication services sectors. Small caps underperformed amid concerns about higher-for-longer interest
              rates.
            </p>
          </div>
        </section>

        {/* Weekly Index Performance */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-8">
              Weekly Index Performance
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {weeklyData.indices.map((index) => (
                <MarketSummaryCard
                  key={index.name}
                  name={index.name}
                  value={index.value}
                  change={index.change}
                  changePercent={index.changePercent}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Top Weekly Movers */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-8">
              Top Weekly Movers
            </h2>
            <TopMovers gainers={weeklyData.gainers} losers={weeklyData.losers} />
          </div>
        </section>

        {/* M&A Activity */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-8">M&A Activity</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Acquirer
                    </th>
                    <th className="text-left py-3 pr-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Target
                    </th>
                    <th className="text-right py-3 pr-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Value
                    </th>
                    <th className="text-right py-3 pr-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Premium
                    </th>
                    <th className="text-right py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {weeklyData.mAndA.map((deal, index) => (
                    <tr key={index}>
                      <td className="py-4 pr-4 text-sm text-foreground">{deal.acquirer}</td>
                      <td className="py-4 pr-4 text-sm text-foreground">{deal.target}</td>
                      <td className="py-4 pr-4 text-sm text-foreground text-right tabular-nums">{deal.value}</td>
                      <td className="py-4 pr-4 text-sm text-foreground text-right tabular-nums">{deal.premium}</td>
                      <td className="py-4 text-sm text-right">
                        <span
                          className={`inline-block px-2 py-0.5 text-xs rounded-sm ${
                            deal.status === "Announced"
                              ? "bg-accent/10 text-accent"
                              : deal.status === "Pending"
                                ? "bg-muted text-muted-foreground"
                                : "bg-muted text-muted-foreground/70"
                          }`}
                        >
                          {deal.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              <Link href="/category/deal-flow" className="text-accent hover:underline">
                View all Deal Flow & M&A coverage →
              </Link>
            </p>
          </div>
        </section>

        {/* Week Ahead */}
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-8">Week Ahead</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { day: "Monday", event: "No major data releases", importance: "Low" },
                { day: "Tuesday", event: "CPI Inflation Report (Dec)", importance: "High" },
                { day: "Wednesday", event: "PPI Report, Fed Beige Book", importance: "Medium" },
                { day: "Thursday", event: "Retail Sales, Jobless Claims", importance: "High" },
                { day: "Friday", event: "Industrial Production, Options Expiry", importance: "Medium" },
              ].map((item) => (
                <div key={item.day} className="border border-border bg-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{item.day}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-sm ${
                        item.importance === "High"
                          ? "bg-destructive/10 text-destructive"
                          : item.importance === "Medium"
                            ? "bg-accent/10 text-accent"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {item.importance}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Analysis */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">
                  Related Analysis
                </h2>
                <div className="flex flex-col">
                  {relatedArticles.map((article) => (
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
              </div>

              <aside>
                <NewsletterSignup />
              </aside>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
