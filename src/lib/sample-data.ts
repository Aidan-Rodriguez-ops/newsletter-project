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

export const sampleArticles: Article[] = [
  {
    slug: "activist-investor-targets-tech-giant",
    title: "Activist Investor Takes $3B Stake in Tech Giant, Pushes for Strategic Review",
    excerpt:
      "A prominent activist hedge fund has disclosed a significant position in one of the largest technology companies, calling for a comprehensive review of its capital allocation strategy and potential spin-off of non-core assets.",
    content: `
## The Setup

Earlier this week, activist hedge fund ValueAct Capital disclosed a $3 billion stake in MegaTech Corp (NASDAQ: MGTC), representing approximately 2.8% of the company's outstanding shares. In an accompanying letter to the board, ValueAct outlined a comprehensive case for strategic change.

## Key Demands

The activist's demands center on three main areas:

### 1. Capital Allocation Review

ValueAct argues that MegaTech has accumulated $45 billion in cash on its balance sheet—far exceeding operational requirements. They propose:

- A $20 billion accelerated share repurchase program
- Dividend initiation at $2.00 per share annually
- Sale of non-core business units valued at $8-12 billion

### 2. Strategic Spin-Off

The fund is pushing for MegaTech to spin off its enterprise software division, which they believe is being undervalued within the conglomerate structure. Their analysis suggests:

> "The enterprise division alone could command a standalone valuation of $80-100 billion, compared to its implied value of roughly $50 billion within MegaTech today. This represents a 60-100% upside for shareholders."

### 3. Board Refreshment

ValueAct has nominated three independent directors with deep technology and capital markets experience, arguing that the current board lacks sufficient expertise in capital allocation.

## Market Reaction

Shares of MegaTech rose 8.4% on the news, adding approximately $12 billion in market capitalization. Options activity spiked, with call volume running at 3x the 20-day average.

## Our Take

This campaign has several characteristics that increase its probability of success:

1. **Credible Activist**: ValueAct has a strong track record of constructive engagement
2. **Clear Value Unlock**: The sum-of-parts analysis is compelling
3. **Management Vulnerability**: Recent operational missteps have weakened leadership's position
4. **Shareholder Support**: Early indications suggest institutional support for change

We believe this situation warrants close monitoring. The strategic review process could take 6-12 months, with significant catalysts along the way.

## Risks to Consider

- Management entrenchment and poison pill adoption
- Regulatory scrutiny of any spin-off transaction
- Market multiple compression in a risk-off environment
- Execution risk in separation of intertwined business units

---

*This analysis is for informational purposes only and does not constitute investment advice.*
    `,
    category: "Deal Flow & M&A",
    categorySlug: "deal-flow",
    date: "Jan 9, 2025",
    author: "Research Team",
    type: "article",
  },
  {
    slug: "fed-rate-path-2025",
    title: "The Fed's Rate Path: Why Markets May Be Too Optimistic About 2025 Cuts",
    excerpt:
      "With inflation proving stickier than expected and labor markets remaining resilient, the current market pricing for rate cuts appears aggressive. We examine the factors that could keep rates higher for longer.",
    content: "",
    category: "Macro & Market Structure",
    categorySlug: "macro",
    date: "Jan 8, 2025",
    author: "Research Team",
    type: "article",
  },
  {
    slug: "treasury-market-liquidity-concerns",
    title: "Treasury Market Liquidity: A Growing Concern for 2025",
    excerpt:
      "As the Treasury continues to issue debt at historic levels, market liquidity has become increasingly fragmented. Understanding these dynamics is crucial for both institutional and retail investors.",
    content: "",
    category: "Macro & Market Structure",
    categorySlug: "macro",
    date: "Jan 7, 2025",
    author: "Research Team",
    type: "article",
  },
  {
    slug: "weekly-brief-jan-6-2025",
    title: "Weekly Market Brief: January 6-10, 2025",
    excerpt:
      "This week's market overview covers the strong start to 2025, key economic data releases, notable M&A activity, and what to watch in the week ahead.",
    content: "",
    category: "Weekly Brief",
    categorySlug: "macro",
    date: "Jan 6, 2025",
    author: "Research Team",
    type: "weekly-brief",
  },
  {
    slug: "understanding-private-equity",
    title: "Understanding Private Equity: A Complete Guide for Aspiring Finance Professionals",
    excerpt:
      "Private equity remains one of the most sought-after career paths in finance. This comprehensive guide covers the industry structure, deal process, and what it takes to break in.",
    content: "",
    category: "Education",
    categorySlug: "education",
    date: "Jan 5, 2025",
    author: "Research Team",
    type: "article",
  },
  {
    slug: "contrarian-view-ai-stocks",
    title: "The Contrarian: Why AI Stock Valuations May Actually Be Justified",
    excerpt:
      "While many bears point to extended valuations in AI names, we present a counterargument: current prices may be rational when viewed through the lens of historical technology adoption curves.",
    content: "",
    category: "The Contrarian",
    categorySlug: "equity-opinions",
    date: "Jan 4, 2025",
    author: "Research Team",
    type: "contrarian",
  },
  {
    slug: "stock-pitch-industrials-q1-2025",
    title: "Stock Pitch: An Undervalued Industrial Play With 40% Upside",
    excerpt:
      "Our latest deep-dive equity analysis focuses on a mid-cap industrial company trading at a significant discount to intrinsic value, with multiple catalysts on the horizon.",
    content: "",
    category: "Equity Opinions",
    categorySlug: "equity-opinions",
    date: "Jan 3, 2025",
    author: "Research Team",
    type: "stock-pitch",
  },
  {
    slug: "geopolitical-risk-markets-2025",
    title: "Geopolitical Risk Premium: How Global Tensions Are Shaping Market Dynamics",
    excerpt:
      "From the Middle East to the South China Sea, geopolitical risks are increasingly being priced into global markets. We analyze the key flashpoints and their potential market implications.",
    content: "",
    category: "Current Events",
    categorySlug: "current-events",
    date: "Jan 2, 2025",
    author: "Research Team",
    type: "article",
  },
]

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
