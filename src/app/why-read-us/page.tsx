import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function WhyReadUsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="max-w-3xl">
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent mb-4">
                For Finance Professionals
              </span>
              <h1 className="font-serif text-4xl lg:text-5xl text-foreground leading-tight mb-6">
                Prepare for your career in high finance
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you&apos;re a student preparing for recruiting or a young professional looking to deepen your
                market knowledge, Main Line Briefing Room provides the insights and frameworks you need to succeed.
              </p>
            </div>
          </div>
        </section>

        {/* Career Paths */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-8">
              Career Paths We Support
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Investment Banking",
                  description:
                    "Stay current on M&A activity, deal structures, and market conditions that drive IB workflows.",
                  skills: ["Deal flow analysis", "Valuation frameworks", "Market timing"],
                },
                {
                  title: "Private Equity",
                  description: "Understand LBO dynamics, sector trends, and operational value creation strategies.",
                  skills: ["Take-private analysis", "Industry deep-dives", "Exit scenarios"],
                },
                {
                  title: "Hedge Funds",
                  description: "Develop contrarian thinking and analytical frameworks for generating alpha.",
                  skills: ["Non-consensus views", "Risk management", "Catalyst analysis"],
                },
                {
                  title: "Asset Management",
                  description: "Build fundamental analysis skills and portfolio construction knowledge.",
                  skills: ["Fundamental analysis", "Sector allocation", "Long-term trends"],
                },
                {
                  title: "Trading",
                  description: "Understand market structure, flow dynamics, and macro drivers of price action.",
                  skills: ["Market microstructure", "Volatility analysis", "Macro trading"],
                },
                {
                  title: "Equity Research",
                  description: "Learn to produce institutional-quality analysis and investment recommendations.",
                  skills: ["Company analysis", "Financial modeling", "Thesis development"],
                },
              ].map((career) => (
                <div key={career.title} className="border border-border p-6">
                  <h3 className="font-medium text-foreground mb-2">{career.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{career.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {career.skills.map((skill) => (
                      <span key={skill} className="text-xs px-2 py-1 bg-muted text-muted-foreground">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How We Help */}
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div>
                <h2 className="font-serif text-2xl lg:text-3xl text-foreground mb-6">How We Help You Succeed</h2>
                <div className="space-y-6">
                  {[
                    {
                      title: "Build Market Intuition",
                      description:
                        "Our daily and weekly coverage helps you develop a feel for how markets work, what drives price action, and how different asset classes interact.",
                    },
                    {
                      title: "Prepare for Interviews",
                      description:
                        "Stay current on deals, macro trends, and market developments so you can speak confidently about recent events in interviews.",
                    },
                    {
                      title: "Develop Analytical Frameworks",
                      description:
                        "Learn how to structure your thinking about investments, valuations, and market opportunities through our educational content.",
                    },
                    {
                      title: "Think Independently",
                      description:
                        "Our Contrarian feature challenges consensus views, helping you develop the independent thinking valued by top firms.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="border-l-2 border-accent pl-4">
                      <h3 className="font-medium text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border p-8">
                <h3 className="font-serif text-xl text-foreground mb-4">What Sets Us Apart</h3>
                <div className="space-y-4">
                  {[
                    {
                      label: "Research Quality",
                      description: "Institutional-grade analysis, not social media hot takes",
                    },
                    {
                      label: "Career Focus",
                      description: "Content designed specifically for aspiring finance professionals",
                    },
                    {
                      label: "Balanced Coverage",
                      description: "Equal attention to macro, deals, equities, and education",
                    },
                    {
                      label: "Contrarian Edge",
                      description: "Willing to challenge consensus when evidence supports it",
                    },
                    {
                      label: "No Paywalls",
                      description: "Core content is and will always be free",
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 mt-2 bg-accent rounded-full shrink-0" />
                      <div>
                        <span className="text-sm font-medium text-foreground">{item.label}:</span>{" "}
                        <span className="text-sm text-muted-foreground">{item.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline for Recruiting */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Recruiting Timeline
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              We track recruiting cycles and deadlines to help you stay ahead. Our weekly brief includes updates on
              application windows and networking opportunities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { period: "Summer", focus: "Networking, applications for SA roles begin" },
                { period: "Fall", focus: "IB/PE superdays, HF recruiting ramps" },
                { period: "Winter", focus: "FT recruiting, spring SA applications" },
                { period: "Spring", focus: "Boutique recruiting, networking events" },
              ].map((phase) => (
                <div key={phase.period} className="border border-border p-4">
                  <h3 className="font-medium text-foreground mb-2">{phase.period}</h3>
                  <p className="text-xs text-muted-foreground">{phase.focus}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="font-serif text-2xl lg:text-3xl text-foreground mb-4">Ready to get started?</h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of finance professionals and students who trust Main Line Briefing Room for market
                insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="rounded-sm bg-primary text-primary-foreground">
                  <Link href="/subscribe">Subscribe Now</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-sm bg-transparent">
                  <Link href="/articles">Browse Articles</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
