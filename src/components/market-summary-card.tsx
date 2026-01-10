import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface MarketSummaryCardProps {
  name: string
  value: string
  change: number
  changePercent: number
  high?: string
  low?: string
  volume?: string
}

export function MarketSummaryCard({ name, value, change, changePercent, high, low, volume }: MarketSummaryCardProps) {
  const isPositive = change > 0
  const isNegative = change < 0

  return (
    <div className="border border-border bg-card p-4 lg:p-6">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{name}</span>
        <div
          className={`flex items-center gap-1 ${
            isPositive ? "text-accent" : isNegative ? "text-destructive" : "text-muted-foreground"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="h-3 w-3" />
          ) : isNegative ? (
            <TrendingDown className="h-3 w-3" />
          ) : (
            <Minus className="h-3 w-3" />
          )}
        </div>
      </div>

      <div className="mb-3">
        <span className="font-serif text-2xl lg:text-3xl text-foreground tabular-nums">{value}</span>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span
          className={`text-sm font-medium tabular-nums ${
            isPositive ? "text-accent" : isNegative ? "text-destructive" : "text-muted-foreground"
          }`}
        >
          {isPositive ? "+" : ""}
          {change.toFixed(2)}
        </span>
        <span
          className={`text-sm tabular-nums ${
            isPositive ? "text-accent" : isNegative ? "text-destructive" : "text-muted-foreground"
          }`}
        >
          ({isPositive ? "+" : ""}
          {changePercent.toFixed(2)}%)
        </span>
      </div>

      {(high || low || volume) && (
        <div className="pt-3 border-t border-border grid grid-cols-3 gap-2">
          {high && (
            <div>
              <span className="text-xs text-muted-foreground block">High</span>
              <span className="text-xs text-foreground tabular-nums">{high}</span>
            </div>
          )}
          {low && (
            <div>
              <span className="text-xs text-muted-foreground block">Low</span>
              <span className="text-xs text-foreground tabular-nums">{low}</span>
            </div>
          )}
          {volume && (
            <div>
              <span className="text-xs text-muted-foreground block">Volume</span>
              <span className="text-xs text-foreground tabular-nums">{volume}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
