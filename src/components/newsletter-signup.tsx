"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface NewsletterSignupProps {
  variant?: "inline" | "card"
}

export function NewsletterSignup({ variant = "card" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setStatus("success")
    setEmail("")
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 rounded-sm bg-background"
          disabled={status === "loading" || status === "success"}
        />
        <Button
          type="submit"
          className="rounded-sm bg-primary text-primary-foreground"
          disabled={status === "loading" || status === "success"}
        >
          {status === "loading" ? "..." : status === "success" ? "Subscribed" : "Subscribe"}
        </Button>
      </form>
    )
  }

  return (
    <div className="bg-muted/50 border border-border p-6 lg:p-8">
      <h3 className="font-serif text-xl text-foreground mb-2">Stay Informed</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Get our weekly market brief and daily snapshots delivered to your inbox.
      </p>
      {status === "success" ? (
        <p className="text-sm text-accent font-medium">Thank you for subscribing!</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 rounded-sm bg-background"
            disabled={status === "loading"}
          />
          <Button
            type="submit"
            className="rounded-sm bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      )}
    </div>
  )
}
