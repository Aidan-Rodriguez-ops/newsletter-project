import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface IndexData {
  name: string
  value: string
  change: number
  changePercent: number
}

interface MarketTickerProps {
  data?: IndexData[]
}

const defaultData: IndexData[] = [
  { name: "S&P 500", value: "5,827.04", change: 15.23, changePercent: 0.26 },
  { name: "NASDAQ", value: "18,342.94", change: -23.12, changePercent: -0.13 },
  { name: "DOW", value: "42,518.28", change: 45.67, changePercent: 0.11 },
  { name: "Russell 2000", value: "2,284.65", change: 0, changePercent: 0 },
]

export function MarketTicker({ data = defaultData }: MarketTickerProps) {
  return (
    <div className="border-y border-border bg-muted/50 py-3 overflow-x-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 lg:gap-12 min-w-max lg:justify-center">
          {data.map((index) => (
            <div key={index.name} className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{index.name}</span>
              <span className="text-sm font-semibold text-foreground tabular-nums">{index.value}</span>
              <div
                className={`flex items-center gap-0.5 ${
                  index.change > 0 ? "text-accent" : index.change < 0 ? "text-destructive" : "text-muted-foreground"
                }`}
              >
                {index.change > 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : index.change < 0 ? (
                  <TrendingDown className="h-3 w-3" />
                ) : (
                  <Minus className="h-3 w-3" />
                )}
                <span className="text-xs font-medium tabular-nums">
                  {index.change >= 0 ? "+" : ""}
                  {index.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
