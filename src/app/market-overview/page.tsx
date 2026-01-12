"use client"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MarketTicker } from "@/components/market-ticker"
import { MarketSummaryCard } from "@/components/market-summary-card"
import { TopMovers } from "@/components/top-movers"

export default function MarketOverview() {
  const [data, setData] = useState({
    majorIndices: [] as any[],
    commodities: [] as any[],
    currencies: [] as any[],
    topMovers: { gainers: [] as any[], losers: [] as any[] }
  })

  const [loading, setLoading] = useState(true)

  // Fixed Income - These don't change often, keeping as static
  const fixedIncome = [
    {
      name: "10-Year Treasury",
      value: "4.18%",
      change: 0.03,
      changePercent: 0.72,
    },
    {
      name: "2-Year Treasury",
      value: "4.52%",
      change: 0.05,
      changePercent: 1.12,
    },
    {
      name: "30-Year Treasury",
      value: "4.35%",
      change: -0.02,
      changePercent: -0.46,
    },
    {
      name: "10-Year TIPS",
      value: "1.85%",
      change: 0.01,
      changePercent: 0.54,
    }
  ]

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/market-overview')
        const result = await response.json()

        if (result.majorIndices) {
          setData({
            majorIndices: result.majorIndices,
            commodities: result.commodities || [],
            currencies: result.currencies || [],
            topMovers: result.topMovers || { gainers: [], losers: [] }
          })
        }

        setLoading(false)
      } catch (error) {
        console.error('Error fetching market overview:', error)
        setLoading(false)
      }
    }

    fetchData()

    // Refresh every 60 minutes
    const interval = setInterval(fetchData, 60 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <MarketTicker />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Market Overview</h1>
          <p className="text-lg text-muted-foreground">
            Real-time market data, indices, commodities, and key financial indicators.
          </p>
        </div>

        {/* Major Indices */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-6">Major Indices</h2>
          {loading && data.majorIndices.length === 0 ? (
            <div className="text-muted-foreground">Loading market data...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.majorIndices.map((index) => (
                <MarketSummaryCard key={index.name} {...index} />
              ))}
            </div>
          )}
        </section>

        {/* Top Movers */}
        {data.topMovers && (data.topMovers.gainers.length > 0 || data.topMovers.losers.length > 0) && (
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold mb-6">Top Movers</h2>
            <TopMovers {...data.topMovers} />
          </section>
        )}

        {/* Commodities */}
        {data.commodities && data.commodities.length > 0 && (
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold mb-6">Commodities</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.commodities.map((commodity) => (
                <MarketSummaryCard key={commodity.name} {...commodity} />
              ))}
            </div>
          </section>
        )}

        {/* Fixed Income */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-6">Fixed Income</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fixedIncome.map((bond) => (
              <MarketSummaryCard key={bond.name} {...bond} />
            ))}
          </div>
        </section>

        {/* Currencies */}
        {data.currencies && data.currencies.length > 0 && (
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold mb-6">Currencies</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.currencies.map((currency) => (
                <MarketSummaryCard key={currency.name} {...currency} />
              ))}
            </div>
          </section>
        )}

        {/* Market Summary Stats */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-6">Market Statistics</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-border bg-card p-6">
              <div className="text-sm text-muted-foreground mb-2">VIX (Volatility Index)</div>
              <div className="font-serif text-3xl font-bold">14.82</div>
              <div className="text-sm text-accent mt-1">+0.45 (+3.13%)</div>
            </div>
            <div className="border border-border bg-card p-6">
              <div className="text-sm text-muted-foreground mb-2">NYSE Advancing</div>
              <div className="font-serif text-3xl font-bold">1,842</div>
              <div className="text-sm text-muted-foreground mt-1">Declining: 1,203</div>
            </div>
            <div className="border border-border bg-card p-6">
              <div className="text-sm text-muted-foreground mb-2">52-Week Highs/Lows</div>
              <div className="font-serif text-3xl font-bold">285 / 42</div>
              <div className="text-sm text-muted-foreground mt-1">NYSE & NASDAQ</div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
