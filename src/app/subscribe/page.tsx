"use client"

import type React from "react"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check } from "lucide-react"
import Link from "next/link"

export default function SubscribePage() {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setStatus("success")
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />

        <main className="flex-1 flex items-center justify-center py-16 lg:py-24">
          <div className="mx-auto max-w-md px-4 text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-accent" />
            </div>
            <h1 className="font-serif text-3xl text-foreground mb-4">Welcome to the Briefing Room</h1>
            <p className="text-muted-foreground mb-6">
              Thanks for subscribing! Check your inbox and confirm your email to start receiving our market analysis.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              While you wait, explore our latest content or follow us on social media.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="rounded-sm bg-primary text-primary-foreground">
                <Link href="/articles">Browse Articles</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-sm bg-transparent">
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          </div>
        </main>

        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h1 className="font-serif text-4xl lg:text-5xl text-foreground leading-tight mb-6">
                  Subscribe to Main Line Briefing Room
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Get our weekly market brief, daily snapshots, and exclusive analysis delivered to your inbox. Join
                  thousands of finance professionals and students who trust us for independent market insights.
                </p>

                {/* Benefits */}
                <div className="space-y-4">
                  {[
                    "Weekly Market Brief every Monday",
                    "Daily Market Snapshots (weekdays)",
                    "The Contrarian weekly feature",
                    "Exclusive stock pitches and analysis",
                    "Career prep and educational content",
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-accent" />
                      </div>
                      <span className="text-sm text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Signup Form */}
              <div className="bg-card border border-border p-8 lg:p-10">
                <h2 className="font-serif text-2xl text-foreground mb-2">Start your subscription</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Free. No credit card required. Unsubscribe anytime.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-1.5">
                      First name
                    </label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="rounded-sm"
                      disabled={status === "loading"}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                      Email address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="rounded-sm"
                      disabled={status === "loading"}
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full rounded-sm bg-primary text-primary-foreground hover:bg-primary/90"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? "Subscribing..." : "Subscribe Now"}
                    </Button>
                  </div>
                </form>

                <p className="mt-6 text-xs text-muted-foreground text-center">
                  By subscribing, you agree to receive emails from Main Line Briefing Room. You can unsubscribe at any
                  time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { value: "5,000+", label: "Active subscribers" },
                { value: "50+", label: "Weekly briefs published" },
                { value: "98%", label: "Open rate" },
                { value: "4.9/5", label: "Reader satisfaction" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif text-3xl text-foreground mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-8 text-center">
              What Readers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote:
                    "The weekly brief has become essential reading for me. It cuts through the noise and gives me exactly what I need to stay informed.",
                  author: "Investment Banking Analyst",
                  company: "Bulge Bracket Bank",
                },
                {
                  quote:
                    "As someone preparing for PE interviews, the educational content and stock pitches have been invaluable for building my market knowledge.",
                  author: "MBA Student",
                  company: "Top 10 Business School",
                },
                {
                  quote:
                    "The Contrarian feature consistently challenges my thinking. Even when I disagree, it makes me a better investor.",
                  author: "Portfolio Manager",
                  company: "Asset Management Firm",
                },
              ].map((testimonial, index) => (
                <div key={index} className="border border-border p-6">
                  <p className="text-sm text-foreground leading-relaxed mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div>
                    <p className="text-sm font-medium text-foreground">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <h2 className="font-serif text-2xl text-foreground mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  question: "Is the subscription really free?",
                  answer:
                    "Yes, completely free. We may introduce premium features in the future, but our core content will always be free.",
                },
                {
                  question: "How often will I receive emails?",
                  answer:
                    "You'll receive our Weekly Market Brief every Monday, Daily Snapshots on weekdays (optional), and special editions for major market events.",
                },
                {
                  question: "Can I unsubscribe anytime?",
                  answer:
                    "Absolutely. Every email includes an unsubscribe link. One click and you're out—no questions asked.",
                },
                {
                  question: "Is this investment advice?",
                  answer:
                    "No. Main Line Briefing Room provides financial commentary and educational content. We are not licensed investment advisors. Always conduct your own research.",
                },
              ].map((faq, index) => (
                <div key={index} className="border-b border-border pb-6 last:border-0">
                  <h3 className="font-medium text-foreground mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
