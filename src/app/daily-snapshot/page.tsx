import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MarketSummaryCard } from "@/components/market-summary-card"
import { TopMovers } from "@/components/top-movers"
import { NewsletterSignup } from "@/components/newsletter-signup"
import Link from "next/link"

// Sample market data - would come from API in production
const marketData = {
  indices: [
    {
      name: "S&P 500",
      value: "5,827.04",
      change: 15.23,
      changePercent: 0.26,
      high: "5,842.18",
      low: "5,801.32",
      volume: "3.2B",
    },
    {
      name: "NASDAQ",
      value: "18,342.94",
      change: -23.12,
      changePercent: -0.13,
      high: "18,401.55",
      low: "18,298.21",
      volume: "4.1B",
    },
    {
      name: "DOW",
      value: "42,518.28",
      change: 45.67,
      changePercent: 0.11,
      high: "42,589.44",
      low: "42,421.08",
      volume: "298M",
    },
    {
      name: "Russell 2000",
      value: "2,284.65",
      change: -8.34,
      changePercent: -0.36,
      high: "2,298.12",
      low: "2,271.45",
      volume: "1.8B",
    },
  ],
  gainers: [
    { symbol: "NVDA", name: "NVIDIA Corp", price: "148.52", change: 12.34, changePercent: 9.07 },
    { symbol: "TSLA", name: "Tesla Inc", price: "412.30", change: 28.15, changePercent: 7.33 },
    { symbol: "AMD", name: "Advanced Micro", price: "142.88", change: 8.92, changePercent: 6.66 },
    { symbol: "PLTR", name: "Palantir Tech", price: "78.45", change: 4.21, changePercent: 5.67 },
    { symbol: "COIN", name: "Coinbase Global", price: "298.12", change: 14.56, changePercent: 5.13 },
  ],
  losers: [
    { symbol: "INTC", name: "Intel Corp", price: "21.34", change: -1.89, changePercent: -8.14 },
    { symbol: "BA", name: "Boeing Co", price: "156.78", change: -11.23, changePercent: -6.68 },
    { symbol: "DIS", name: "Walt Disney", price: "108.92", change: -6.45, changePercent: -5.59 },
    { symbol: "PYPL", name: "PayPal Holdings", price: "82.14", change: -4.12, changePercent: -4.78 },
    { symbol: "NKE", name: "Nike Inc", price: "71.23", change: -3.21, changePercent: -4.31 },
  ],
}

export default function DailySnapshotPage() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* Page Header */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent mb-4">
              Daily Feature
            </span>
            <h1 className="font-serif text-3xl lg:text-4xl text-foreground mb-4">Daily Market Snapshot</h1>
            <p className="text-muted-foreground max-w-2xl mb-2">
              A quick daily summary of market performance, key movers, and sentiment indicators.
            </p>
            <p className="text-sm text-muted-foreground">{today}</p>
          </div>
        </section>

        {/* Market Sentiment */}
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Market Sentiment
                </span>
                <p className="text-lg font-medium text-foreground mt-1">Cautiously Optimistic</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <span className="text-2xl font-serif text-accent">68%</span>
                  <span className="text-xs text-muted-foreground block">Bullish</span>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-serif text-destructive">32%</span>
                  <span className="text-xs text-muted-foreground block">Bearish</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Index Performance */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-8">
              Index Performance
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {marketData.indices.map((index) => (
                <MarketSummaryCard
                  key={index.name}
                  name={index.name}
                  value={index.value}
                  change={index.change}
                  changePercent={index.changePercent}
                  high={index.high}
                  low={index.low}
                  volume={index.volume}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Top Movers */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-8">Top Movers</h2>
            <TopMovers gainers={marketData.gainers} losers={marketData.losers} />
          </div>
        </section>

        {/* Quick Takes */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">
                  Today&apos;s Quick Takes
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      title: "Tech Leads Recovery",
                      content:
                        "Semiconductor stocks drove gains as NVIDIA announced expanded AI partnerships. The Philadelphia Semiconductor Index rose 2.3%.",
                    },
                    {
                      title: "Treasury Yields Steady",
                      content:
                        "The 10-year Treasury yield held at 4.12% as investors await this week's inflation data. The 2-10 spread remains inverted at -18bps.",
                    },
                    {
                      title: "Oil Edges Higher",
                      content:
                        "WTI crude rose 0.8% to $74.52/barrel amid Middle East supply concerns. Energy sector ETFs saw modest inflows.",
                    },
                  ].map((take, index) => (
                    <div key={index} className="border-l-2 border-border pl-4">
                      <h3 className="font-medium text-foreground mb-2">{take.title}</h3>
                      <p className="text-sm text-muted-foreground">{take.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              <aside>
                <NewsletterSignup />
              </aside>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-muted-foreground">Want deeper analysis? Check out our weekly market brief.</p>
              <Link
                href="/weekly-brief"
                className="px-6 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm transition-colors"
              >
                Read Weekly Brief
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
