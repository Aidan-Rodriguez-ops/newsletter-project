import { TrendingUp, TrendingDown } from "lucide-react"

interface Mover {
  symbol: string
  name: string
  price: string
  change: number
  changePercent: number
}

interface TopMoversProps {
  gainers: Mover[]
  losers: Mover[]
}

export function TopMovers({ gainers, losers }: TopMoversProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Top Gainers */}
      <div className="border border-border bg-card">
        <div className="p-4 border-b border-border flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-accent" />
          <h3 className="text-sm font-semibold text-foreground">Top Gainers</h3>
        </div>
        <div className="divide-y divide-border">
          {gainers.map((stock) => (
            <div key={stock.symbol} className="p-4 flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-foreground">{stock.symbol}</span>
                <span className="text-xs text-muted-foreground ml-2 hidden sm:inline">{stock.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-foreground tabular-nums">${stock.price}</span>
                <span className="text-sm font-medium text-accent tabular-nums">+{stock.changePercent.toFixed(2)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Losers */}
      <div className="border border-border bg-card">
        <div className="p-4 border-b border-border flex items-center gap-2">
          <TrendingDown className="h-4 w-4 text-destructive" />
          <h3 className="text-sm font-semibold text-foreground">Top Losers</h3>
        </div>
        <div className="divide-y divide-border">
          {losers.map((stock) => (
            <div key={stock.symbol} className="p-4 flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-foreground">{stock.symbol}</span>
                <span className="text-xs text-muted-foreground ml-2 hidden sm:inline">{stock.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-foreground tabular-nums">${stock.price}</span>
                <span className="text-sm font-medium text-destructive tabular-nums">
                  {stock.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
