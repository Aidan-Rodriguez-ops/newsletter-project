import Link from "next/link"

const footerNavigation = {
  content: [
    { name: "Deal Flow & M&A", href: "/category/deal-flow" },
    { name: "Macro & Market Structure", href: "/category/macro" },
    { name: "Current Events", href: "/category/current-events" },
    { name: "Equity Opinions", href: "/category/equity-opinions" },
    { name: "Education", href: "/category/education" },
  ],
  features: [
    { name: "Weekly Market Brief", href: "/weekly-brief" },
    { name: "Daily Snapshot", href: "/daily-snapshot" },
    { name: "The Contrarian", href: "/the-contrarian" },
    { name: "Stock Pitches", href: "/category/equity-opinions" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Why Read Us", href: "/why-read-us" },
    { name: "Subscribe", href: "/subscribe" },
    { name: "Contact", href: "/contact" },
  ],
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex flex-col gap-1">
              <span className="font-serif text-xl text-foreground">Main Line</span>
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Briefing Room</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Independent thinking in a crowded market.
            </p>
            <p className="mt-6 text-xs text-muted-foreground/70 leading-relaxed">
              Main Line Briefing Room provides financial commentary and educational content. This is not investment
              advice. Always conduct your own research before making investment decisions.
            </p>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">Content</h3>
            <ul className="mt-4 space-y-3">
              {footerNavigation.content.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">Features</h3>
            <ul className="mt-4 space-y-3">
              {footerNavigation.features.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-xs text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Main Line Briefing Room. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
