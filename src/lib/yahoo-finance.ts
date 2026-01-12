// Yahoo Finance API (unofficial but free, no API key needed!)

export interface StockQuote {
  symbol: string
  name: string
  price: string
  change: number
  changePercent: number
  high?: string
  low?: string
  volume?: string
}

// Fetch stock quote from Yahoo Finance
export async function getYahooQuote(symbol: string): Promise<StockQuote | null> {
  try {
    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0'
        }
      }
    )

    const data = await response.json()

    if (!data.chart || !data.chart.result || data.chart.result.length === 0) {
      console.error(`No data for ${symbol}`)
      return null
    }

    const result = data.chart.result[0]
    const meta = result.meta
    const quote = result.indicators.quote[0]

    const currentPrice = meta.regularMarketPrice
    const previousClose = meta.chartPreviousClose
    const change = currentPrice - previousClose
    const changePercent = (change / previousClose) * 100

    return {
      symbol: symbol,
      name: meta.longName || meta.shortName || symbol,
      price: currentPrice.toFixed(2),
      change: parseFloat(change.toFixed(2)),
      changePercent: parseFloat(changePercent.toFixed(2)),
      high: quote.high?.[0]?.toFixed(2),
      low: quote.low?.[0]?.toFixed(2),
      volume: formatVolume(quote.volume?.[0] || 0)
    }
  } catch (error) {
    console.error(`Error fetching ${symbol}:`, error)
    return null
  }
}

// Fetch multiple quotes
export async function getMultipleYahooQuotes(symbols: string[]): Promise<StockQuote[]> {
  const quotes = await Promise.all(
    symbols.map(symbol => getYahooQuote(symbol))
  )
  return quotes.filter((q): q is StockQuote => q !== null)
}

// Helper function to format volume
function formatVolume(volume: number): string {
  if (volume >= 1_000_000_000) {
    return `${(volume / 1_000_000_000).toFixed(1)}B`
  } else if (volume >= 1_000_000) {
    return `${(volume / 1_000_000).toFixed(1)}M`
  } else if (volume >= 1_000) {
    return `${(volume / 1_000).toFixed(1)}K`
  }
  return volume.toString()
}
