"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail]     = useState("");
  const [status, setStatus]   = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      await new Promise((r) => setTimeout(r, 800));
      setStatus("success");
      setMessage("Thank you! You're now subscribed. Check your spam folder too.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="w-full bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-16 md:py-24">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10 xl:gap-20">

          <div className="flex flex-col gap-4 xl:max-w-lg">
            <span className="text-xs font-semibold tracking-widest uppercase text-white/40">Newsletter</span>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Never miss a trend, <span className="italic font-light">never miss a look.</span>
            </h2>
            <p className="text-sm text-white/60 leading-relaxed">
              Weekly curated outfits, hairstyle inspiration and exclusive style tips — delivered straight to your inbox. No spam, unsubscribe anytime.
            </p>
            <div className="flex flex-wrap gap-5 mt-2">
              {[{ icon: "✦", text: "No spam" }, { icon: "✦", text: "Cancel anytime" }, { icon: "✦", text: "GDPR compliant" }].map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <span className="text-white/30 text-xs">{item.icon}</span>
                  <span className="text-xs tracking-widest uppercase text-white/50">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full xl:max-w-md">
            {status === "success" ? (
              <div className="flex flex-col items-center gap-3 py-10 border border-white/10 text-center px-8">
                <span className="text-2xl font-black text-white">✦</span>
                <p className="text-sm font-semibold tracking-widest uppercase text-white">Successfully subscribed!</p>
                <p className="text-xs text-white/50 leading-relaxed">{message}</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors duration-200 underline underline-offset-4"
                >
                  Subscribe another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    disabled={status === "loading"}
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/30
                               text-sm tracking-wide focus:outline-none focus:border-white/60
                               disabled:opacity-50 transition-colors duration-200"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="px-8 py-3 bg-white text-black text-xs font-semibold tracking-widest uppercase
                               hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed
                               transition-colors duration-200 shrink-0"
                  >
                    {status === "loading" ? "..." : "Subscribe"}
                  </button>
                </div>
                {status === "error" && (
                  <p className="text-xs text-red-400 tracking-wide">{message}</p>
                )}
                <p className="text-xs text-white/30 leading-relaxed">
                  By subscribing you agree to our{" "}
                  <a href="/privacy" className="underline underline-offset-2 hover:text-white/60 transition-colors duration-200">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
