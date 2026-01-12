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
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setMessage("")

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage(data.message || "Successfully subscribed!")
        setEmail("")
      } else {
        setStatus("error")
        setMessage(data.error || "Failed to subscribe. Please try again.")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Something went wrong. Please try again later.")
    }
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
        <p className="text-sm text-green-600 font-medium">{message}</p>
      ) : (
        <>
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
          {status === "error" && (
            <p className="text-sm text-red-600 mt-2">{message}</p>
          )}
        </>
      )}
    </div>
  )
}
