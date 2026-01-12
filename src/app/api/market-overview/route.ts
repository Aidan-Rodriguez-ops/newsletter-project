import { NextResponse } from 'next/server'
import { getYahooQuote, getMultipleYahooQuotes } from '@/lib/yahoo-finance'

// Cache configuration
let cachedData: any = null
let lastFetchTime = 0
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes for overview page

export async function GET() {
  try {
    const now = Date.now()

    // Return cached data if still valid
    if (cachedData && (now - lastFetchTime) < CACHE_DURATION) {
      return NextResponse.json({ ...cachedData, cached: true })
    }

    // Fetch indices (using ETFs as proxies)
    const [spyQuote, diaQuote, qqqQuote, iwmQuote] = await Promise.all([
      getYahooQuote('SPY'),  // S&P 500
      getYahooQuote('DIA'),  // Dow Jones
      getYahooQuote('QQQ'),  // NASDAQ
      getYahooQuote('IWM')   // Russell 2000
    ])

    const majorIndices = [
      spyQuote && {
        name: 'S&P 500',
        value: (parseFloat(spyQuote.price) * 10).toFixed(2),
        change: parseFloat((spyQuote.change * 10).toFixed(2)),
        changePercent: parseFloat(spyQuote.changePercent.toFixed(2)),
        high: spyQuote.high ? (parseFloat(spyQuote.high) * 10).toFixed(2) : undefined,
        low: spyQuote.low ? (parseFloat(spyQuote.low) * 10).toFixed(2) : undefined,
        volume: spyQuote.volume
      },
      diaQuote && {
        name: 'Dow Jones',
        value: (parseFloat(diaQuote.price) * 100).toFixed(2),
        change: parseFloat((diaQuote.change * 100).toFixed(2)),
        changePercent: parseFloat(diaQuote.changePercent.toFixed(2)),
        high: diaQuote.high ? (parseFloat(diaQuote.high) * 100).toFixed(2) : undefined,
        low: diaQuote.low ? (parseFloat(diaQuote.low) * 100).toFixed(2) : undefined,
        volume: diaQuote.volume
      },
      qqqQuote && {
        name: 'NASDAQ',
        value: (parseFloat(qqqQuote.price) * 30).toFixed(2),
        change: parseFloat((qqqQuote.change * 30).toFixed(2)),
        changePercent: parseFloat(qqqQuote.changePercent.toFixed(2)),
        high: qqqQuote.high ? (parseFloat(qqqQuote.high) * 30).toFixed(2) : undefined,
        low: qqqQuote.low ? (parseFloat(qqqQuote.low) * 30).toFixed(2) : undefined,
        volume: qqqQuote.volume
      },
      iwmQuote && {
        name: 'Russell 2000',
        value: (parseFloat(iwmQuote.price) * 10).toFixed(2),
        change: parseFloat((iwmQuote.change * 10).toFixed(2)),
        changePercent: parseFloat(iwmQuote.changePercent.toFixed(2)),
        high: iwmQuote.high ? (parseFloat(iwmQuote.high) * 10).toFixed(2) : undefined,
        low: iwmQuote.low ? (parseFloat(iwmQuote.low) * 10).toFixed(2) : undefined,
        volume: iwmQuote.volume
      }
    ].filter(Boolean)

    // Commodities (using ETFs)
    const [uso, gld, slv, ung] = await Promise.all([
      getYahooQuote('USO'),  // Oil
      getYahooQuote('GLD'),  // Gold
      getYahooQuote('SLV'),  // Silver
      getYahooQuote('UNG')   // Natural Gas
    ])

    const commodities = [
      uso && { ...uso, name: 'Crude Oil (USO ETF)' },
      gld && { ...gld, name: 'Gold (GLD ETF)' },
      slv && { ...slv, name: 'Silver (SLV ETF)' },
      ung && { ...ung, name: 'Natural Gas (UNG ETF)' }
    ].filter(Boolean)

    // Top movers
    const gainerSymbols = ['NVDA', 'AAPL', 'MSFT', 'GOOGL', 'AMD']
    const loserSymbols = ['TSLA', 'META', 'AMZN', 'NFLX', 'BA']

    const gainers = await getMultipleYahooQuotes(gainerSymbols)
    const losers = await getMultipleYahooQuotes(loserSymbols)

    const topMovers = {
      gainers,
      losers
    }

    // Forex (Yahoo Finance format)
    const [eurusd, gbpusd, usdjpy] = await Promise.all([
      getYahooQuote('EURUSD=X'),
      getYahooQuote('GBPUSD=X'),
      getYahooQuote('JPY=X')
    ])

    const currencies = [
      eurusd && { ...eurusd, name: 'EUR/USD' },
      gbpusd && { ...gbpusd, name: 'GBP/USD' },
      usdjpy && { ...usdjpy, name: 'USD/JPY' }
    ].filter(Boolean)

    const responseData = {
      majorIndices: majorIndices.filter(Boolean),
      commodities: commodities.filter(Boolean),
      topMovers,
      currencies: currencies.filter(Boolean),
      timestamp: new Date().toISOString(),
      cached: false
    }

    // Update cache
    cachedData = responseData
    lastFetchTime = now

    return NextResponse.json(responseData)
  } catch (error) {
    console.error('Error fetching market overview:', error)

    // Return cached data if available
    if (cachedData) {
      return NextResponse.json({ ...cachedData, cached: true, error: 'Using stale cache' })
    }

    return NextResponse.json(
      { error: 'Failed to fetch market overview' },
      { status: 500 }
    )
  }
}
