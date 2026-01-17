import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Mail } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl lg:text-5xl text-foreground leading-tight mb-6">
                Get in Touch
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Have questions, feedback, or suggestions? We&apos;d love to hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Details */}
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">
                  Contact Information
                </h2>

                <div className="space-y-8">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Email Us</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        For general inquiries, feedback, or partnership opportunities
                      </p>
                      <a
                        href="mailto:mainlinebriefingroom@gmail.com"
                        className="text-accent hover:underline transition-colors"
                      >
                        mainlinebriefingroom@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="border-l-2 border-accent pl-4">
                    <p className="text-sm text-muted-foreground">
                      We typically respond within 24-48 hours during business days.
                    </p>
                  </div>
                </div>
              </div>

              {/* What to Contact Us About */}
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">
                  What Can We Help With?
                </h2>

                <ul className="space-y-4">
                  {[
                    {
                      title: "Content Feedback",
                      description: "Suggestions for topics or feedback on our analysis",
                    },
                    {
                      title: "Partnership Inquiries",
                      description: "Collaboration opportunities or sponsorship requests",
                    },
                    {
                      title: "Technical Issues",
                      description: "Report bugs or issues with the website",
                    },
                    {
                      title: "General Questions",
                      description: "Any other questions about Main Line Briefing Room",
                    },
                  ].map((item) => (
                    <li key={item.title} className="flex gap-3">
                      <div className="w-1.5 h-1.5 mt-2 bg-accent rounded-full shrink-0" />
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

        {/* Additional Info */}
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="max-w-3xl">
              <h2 className="font-serif text-2xl lg:text-3xl text-foreground mb-6">
                Looking for Something Else?
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  If you&apos;re interested in subscribing to our newsletter, visit our{" "}
                  <a href="/subscribe" className="text-accent hover:underline">
                    subscribe page
                  </a>
                  .
                </p>
                <p>
                  To learn more about our mission and approach, check out our{" "}
                  <a href="/about" className="text-accent hover:underline">
                    about page
                  </a>
                  .
                </p>
                <p>
                  For career-focused content and recruiting insights, see{" "}
                  <a href="/why-read-us" className="text-accent hover:underline">
                    why read us
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
