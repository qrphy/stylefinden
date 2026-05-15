"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "newsletter_popup";
const DISMISS_DAYS = 7;
const SHOW_DELAY_MS = 5000;

function shouldShow(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return true;
    const { status, until } = JSON.parse(raw) as { status: string; until?: number };
    if (status === "subscribed") return false;
    if (status === "dismissed" && until && Date.now() < until) return false;
    return true;
  } catch {
    return true;
  }
}

function persist(status: "subscribed" | "dismissed") {
  const until =
    status === "dismissed"
      ? Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000
      : undefined;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ status, until }));
}

export default function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (shouldShow()) setOpen(true);
    }, SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  function close() {
    persist("dismissed");
    setOpen(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSubmitStatus("success");
      persist("subscribed");
    } catch (err) {
      setSubmitStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
      className="fixed inset-0 z-[70] flex items-center justify-center px-4 bg-black/60"
    >
      <div className="relative w-full max-w-sm bg-black text-white p-6 flex flex-col gap-4">

        {/* Close button */}
        <button
          onClick={close}
          aria-label="Close newsletter popup"
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors duration-200 text-sm leading-none"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex flex-col gap-2 pr-6">
          <span className="text-xs font-semibold tracking-widest uppercase text-white/40">
            Newsletter
          </span>
          <h2
            id="popup-title"
            className="text-sm font-black tracking-wide uppercase"
          >
            Never miss a trend, never miss a look.
          </h2>
          <p className="text-xs text-gray-300 leading-relaxed">
            Weekly curated outfits, hairstyle inspiration and exclusive style
            tips — straight to your inbox.
          </p>
        </div>

        {/* Body */}
        {submitStatus === "success" ? (
          <div className="flex flex-col items-center gap-3 py-6 border border-white/10 text-center px-4">
            <span className="text-xl font-black text-white">✦</span>
            <p className="text-xs font-semibold tracking-widest uppercase text-white">
              Successfully subscribed!
            </p>
            <p className="text-xs text-gray-300 leading-relaxed">
              Thank you! Check your inbox (and spam folder too).
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={submitStatus === "loading"}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/20 text-white
                         placeholder-white/30 text-xs tracking-wide focus:outline-none
                         focus:border-white/60 disabled:opacity-50 transition-colors duration-200"
            />

            {submitStatus === "error" && (
              <p className="text-xs text-red-400 tracking-wide">{errorMsg}</p>
            )}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={close}
                className="flex-1 text-xs tracking-widest uppercase border border-gray-600 text-gray-300 hover:border-white hover:text-white transition-colors duration-200 py-2.5 px-3"
              >
                No thanks
              </button>
              <button
                type="submit"
                disabled={submitStatus === "loading"}
                className="flex-1 text-xs tracking-widest uppercase bg-white text-black hover:bg-gray-100 transition-colors duration-200 py-2.5 px-3 disabled:opacity-50"
              >
                {submitStatus === "loading" ? "..." : "Subscribe"}
              </button>
            </div>

            <p className="text-xs text-white/30 leading-relaxed">
              No spam. Cancel anytime.{" "}
              <a
                href="/privacy"
                className="underline underline-offset-2 hover:text-white/60 transition-colors duration-200"
              >
                Privacy Policy
              </a>
              .
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
