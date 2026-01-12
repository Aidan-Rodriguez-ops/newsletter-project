import { NextResponse } from 'next/server'
import { getYahooQuote, getMultipleYahooQuotes } from '@/lib/yahoo-finance'

// Cache configuration
let cachedData: any = null
let lastFetchTime = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes (Yahoo Finance is fast, can refresh more often)

export async function GET() {
  try {
    const now = Date.now()

    // Return cached data if still valid
    if (cachedData && (now - lastFetchTime) < CACHE_DURATION) {
      return NextResponse.json({ ...cachedData, cached: true })
    }

    // Fetch fresh data from Yahoo Finance
    const spyQuote = await getYahooQuote('SPY') // S&P 500 ETF

    // Get top movers
    const gainerSymbols = ['NVDA', 'AAPL', 'MSFT']
    const loserSymbols = ['TSLA', 'META', 'AMZN']

    const gainers = await getMultipleYahooQuotes(gainerSymbols)
    const losers = await getMultipleYahooQuotes(loserSymbols)

    // Format S&P 500 data
    const marketData = spyQuote ? {
      name: 'S&P 500',
      value: (parseFloat(spyQuote.price) * 10).toFixed(2), // Approximate S&P value from SPY
      change: (spyQuote.change * 10).toFixed(2),
      changePercent: spyQuote.changePercent.toFixed(2),
      high: spyQuote.high ? (parseFloat(spyQuote.high) * 10).toFixed(2) : undefined,
      low: spyQuote.low ? (parseFloat(spyQuote.low) * 10).toFixed(2) : undefined,
      volume: spyQuote.volume
    } : null

    const topMovers = {
      gainers,
      losers
    }

    const responseData = {
      marketData,
      topMovers,
      timestamp: new Date().toISOString(),
      cached: false
    }

    // Update cache
    cachedData = responseData
    lastFetchTime = now

    return NextResponse.json(responseData)
  } catch (error) {
    console.error('Error fetching market data:', error)

    // Return cached data if available, even if expired
    if (cachedData) {
      return NextResponse.json({ ...cachedData, cached: true, error: 'Using stale cache' })
    }

    return NextResponse.json(
      { error: 'Failed to fetch market data' },
      { status: 500 }
    )
  }
}
