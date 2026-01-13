export interface Article {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  categorySlug: string
  date: string
  author: string
  type: "article" | "weekly-brief" | "daily-snapshot" | "stock-pitch" | "contrarian"
}

// Sample articles removed - use admin dashboard to create real articles
export const sampleArticles: Article[] = []

export const categories = [
  {
    name: "Deal Flow & M&A",
    slug: "deal-flow",
    description: "Activism, buybacks, take-privates, and major transactions",
  },
  {
    name: "Macro & Market Structure",
    slug: "macro",
    description: "Rates, credit markets, geopolitics, liquidity, and volatility",
  },
  { name: "Current Events", slug: "current-events", description: "Macro-focused current events impacting markets" },
  {
    name: "Equity Opinions",
    slug: "equity-opinions",
    description: "Retail-focused investing views and portfolio construction",
  },
  { name: "Education", slug: "education", description: "Investing basics, market mechanics, and career preparation" },
]
