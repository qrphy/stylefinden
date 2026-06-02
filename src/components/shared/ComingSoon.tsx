"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/shared/Button";

type Props = {
  title: string;
  subtitle?: string;
  description?: string;
  backLabel?: string;
  backHref?: string;
};

export default function ComingSoon({
  title,
  subtitle,
  description,
  backLabel = "Browse Outfits",
  backHref = "/outfits",
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="w-full border border-gray-100 bg-white">
      <div className="flex flex-col xl:flex-row xl:items-stretch">

        {/* Left — info */}
        <div className="flex flex-col gap-5 p-10 md:p-14 xl:p-16 xl:w-1/2 border-b xl:border-b-0 xl:border-r border-gray-100">
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-300">
            Being Curated
          </span>
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight leading-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm font-semibold tracking-widest uppercase text-gray-400">
                {subtitle}
              </p>
            )}
          </div>
          {description && (
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              {description}
            </p>
          )}
          <Link
            href={backHref}
            className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-black hover:text-gray-500 transition-colors duration-200 group mt-auto"
          >
            {backLabel}
            <svg
              viewBox="0 0 24 24"
              className="size-3.5 stroke-current group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              strokeWidth={2}
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        {/* Right — newsletter */}
        <div className="flex flex-col justify-center gap-6 p-10 md:p-14 xl:p-16 xl:w-1/2 bg-black">
          {status === "success" ? (
            <div className="flex flex-col gap-3">
              <span className="text-2xl font-black text-white">✦</span>
              <p className="text-sm font-semibold tracking-widest uppercase text-white">
                You&apos;re on the list.
              </p>
              <p className="text-xs text-white/50 leading-relaxed">
                We&apos;ll notify you when this collection goes live.
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold tracking-widest uppercase text-white/40">
                  Notify Me
                </span>
                <p className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight">
                  Be the first to know <br />
                  <span className="italic font-light">when this launches.</span>
                </p>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    aria-label="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    disabled={status === "loading"}
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/30
                               text-sm tracking-wide focus:outline-none focus:border-white/60
                               disabled:opacity-50 transition-colors duration-200"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    invert
                    disabled={status === "loading"}
                    aria-label="Subscribe to newsletter"
                    className="shrink-0"
                  >
                    {status === "loading" ? "..." : "Subscribe"}
                  </Button>
                </div>
                {status === "error" && (
                  <p className="text-xs text-red-400 tracking-wide">{message}</p>
                )}
                <p className="text-xs text-white/30 leading-relaxed">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
