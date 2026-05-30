"use client"

import { useState } from "react"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus("loading")
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()
      setStatus("success")
      setEmail("")
    } catch {
      setStatus("idle")
    }
  }

  return (
    <section className="w-full bg-black border-t border-gray-900 scroll-reveal">
      <div className="container-page py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

          <div>
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-gray-600 block mb-4">
              Stay in the Loop
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-light text-white tracking-tight leading-tight">
              Style delivered<br />
              to your inbox.
            </h2>
          </div>

          <div>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">
              New outfits, hairstyle trends and style guides — straight to your inbox. No spam, unsubscribe anytime.
            </p>

            {status === "success" ? (
              <p className="text-sm text-white tracking-wide">You&apos;re on the list — welcome.</p>
            ) : (
              <form onSubmit={handleSubscribe}>
                <div className="flex items-end gap-4 border-b border-gray-700 pb-3 mb-4">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    disabled={status === "loading"}
                    className="flex-1 bg-transparent text-sm text-white placeholder-gray-600 focus:outline-none disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="shrink-0 text-[10px] font-semibold tracking-widest uppercase text-white hover:text-gray-400 transition-colors duration-200 disabled:opacity-50"
                  >
                    {status === "loading" ? "..." : "Subscribe →"}
                  </button>
                </div>
                <p className="text-[11px] text-gray-700 leading-relaxed">
                  By subscribing you agree to our{" "}
                  <a href="/privacy" className="underline underline-offset-2 hover:text-gray-500 transition-colors duration-200">
                    Privacy Policy
                  </a>.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
