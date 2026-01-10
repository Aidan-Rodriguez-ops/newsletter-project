import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl lg:text-5xl text-foreground leading-tight mb-6">
                Independent thinking in a crowded market
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Main Line Briefing Room is an independent, contrarian financial media platform. We help readers stay
                informed about the economy and financial markets while preparing for careers in high finance.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  Our Mission
                </h2>
                <p className="text-foreground leading-relaxed mb-4">
                  In a market flooded with noise, hot takes, and algorithmic content, we believe there&apos;s value in
                  slowing down and thinking critically. Main Line Briefing Room exists to provide thoughtful,
                  well-researched analysis that challenges conventional wisdom.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We&apos;re not here to tell you what to think—we&apos;re here to give you the tools and frameworks to
                  think independently about markets, economics, and your career in finance.
                </p>
              </div>
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  Our Approach
                </h2>
                <ul className="space-y-4">
                  {[
                    {
                      title: "Research-Driven",
                      description:
                        "Every piece we publish is backed by data and rigorous analysis. No clickbait, no hype.",
                    },
                    {
                      title: "Contrarian Perspective",
                      description: "We're not afraid to challenge consensus views when the evidence supports it.",
                    },
                    {
                      title: "Educational Focus",
                      description:
                        "We explain the 'why' behind market movements, not just the 'what.' Learn as you read.",
                    },
                    {
                      title: "Career-Oriented",
                      description:
                        "Content designed to help you succeed in IB, PE, HF, AM, trading, and related fields.",
                    },
                  ].map((item) => (
                    <li key={item.title} className="flex gap-4">
                      <div className="w-2 h-2 mt-2 bg-accent rounded-full shrink-0" />
                      <div>
                        <h3 className="font-medium text-foreground mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* What We Cover */}
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-8">What We Cover</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { name: "Deal Flow & M&A", percent: "20%", description: "Activism, buybacks, take-privates" },
                { name: "Macro & Markets", percent: "20%", description: "Rates, credit, geopolitics, volatility" },
                { name: "Current Events", percent: "20%", description: "Market-moving news and analysis" },
                { name: "Equity Opinions", percent: "20%", description: "Stock pitches and portfolio ideas" },
                { name: "Education", percent: "20%", description: "Investing basics and career prep" },
              ].map((category) => (
                <div key={category.name} className="border border-border bg-card p-5">
                  <div className="font-serif text-2xl text-foreground mb-2">{category.percent}</div>
                  <h3 className="font-medium text-foreground mb-1">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">{category.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content Formats */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-8">
              Our Content Formats
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Weekly Market Brief",
                  frequency: "Every Monday",
                  description:
                    "Comprehensive weekly overview covering market performance, major deals, economic data, and the week ahead.",
                },
                {
                  title: "Daily Market Snapshot",
                  frequency: "Weekdays",
                  description:
                    "Quick daily summary of index movements, top movers, and key market sentiment indicators.",
                },
                {
                  title: "Weekly Stock Pitch",
                  frequency: "Every Wednesday",
                  description:
                    "Deep-dive equity analysis with clear thesis, valuation framework, risks, and conclusion.",
                },
                {
                  title: "Educational Articles",
                  frequency: "Every Friday",
                  description:
                    "Rotating topics covering personal finance, market mechanics, trading concepts, and career guidance.",
                },
                {
                  title: "The Contrarian",
                  frequency: "Every Thursday",
                  description:
                    "Our signature feature presenting non-consensus views on macro and market topics. Thought-provoking, not clickbait.",
                },
                {
                  title: "Breaking Analysis",
                  frequency: "As needed",
                  description:
                    "Timely coverage of major market events, M&A announcements, and significant economic developments.",
                },
              ].map((format) => (
                <div key={format.title} className="border border-border p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-foreground">{format.title}</h3>
                  </div>
                  <span className="inline-block text-xs text-accent mb-3">{format.frequency}</span>
                  <p className="text-sm text-muted-foreground">{format.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Target Audience */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-2xl lg:text-3xl text-foreground mb-6">Who We Write For</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Our primary audience is college undergraduates and early-career professionals pursuing careers in high
                finance. Whether you&apos;re preparing for investment banking, private equity, hedge funds, asset
                management, or trading roles, our content is designed to help you build market knowledge and analytical
                skills.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "Investment Banking",
                  "Private Equity",
                  "Hedge Funds",
                  "Asset Management",
                  "Trading",
                  "Consulting",
                ].map((career) => (
                  <span key={career} className="px-4 py-2 text-sm border border-border bg-card text-foreground">
                    {career}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="font-serif text-2xl lg:text-3xl text-foreground mb-4">Join the Briefing Room</h2>
              <p className="text-muted-foreground mb-8">
                Subscribe to receive our weekly market brief, daily snapshots, and exclusive analysis.
              </p>
              <div className="max-w-md mx-auto">
                <NewsletterSignup variant="inline" />
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                Or{" "}
                <Link href="/articles" className="text-accent hover:underline">
                  browse our articles
                </Link>{" "}
                to see what we&apos;re all about.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
