"use client";

import { useEffect, useState } from "react";
import Button from "@/components/shared/Button";

const STORAGE_KEY = "newsletter_popup";
const DISMISS_DAYS = 7;
const SHOW_DELAY_MS = 8000;

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
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-black/70"
        onClick={close}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
        className="fixed z-[70] inset-0 flex items-center justify-center px-4"
      >
        <div className="relative w-full max-w-md bg-black border border-white/10">

          {/* Close button */}
          <button
            onClick={close}
            aria-label="Close newsletter popup"
            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors duration-200 text-lg leading-none"
          >
            ✕
          </button>

          <div className="p-8 md:p-10 flex flex-col gap-6">

            {/* Header */}
            <div className="flex flex-col gap-3 pr-6">
              <span className="text-xs font-semibold tracking-widest uppercase text-white/40">
                Newsletter
              </span>
              <h2
                id="popup-title"
                className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight"
              >
                Never miss a trend,{" "}
                <span className="italic font-light">never miss a look.</span>
              </h2>
              <p className="text-sm text-white/60 leading-relaxed">
                Weekly curated outfits, hairstyle inspiration and exclusive style
                tips — straight to your inbox.
              </p>
            </div>

            {/* Body */}
            {submitStatus === "success" ? (
              <div className="flex flex-col items-center gap-3 py-8 border border-white/10 text-center px-6">
                <span className="text-2xl font-black text-white">✦</span>
                <p className="text-sm font-semibold tracking-widest uppercase text-white">
                  Successfully subscribed!
                </p>
                <p className="text-xs text-white/50 leading-relaxed">
                  Thank you! Check your inbox (and spam folder too).
                </p>
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
                    disabled={submitStatus === "loading"}
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/20 text-white
                               placeholder-white/30 text-sm tracking-wide focus:outline-none
                               focus:border-white/60 disabled:opacity-50 transition-colors duration-200"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    invert
                    disabled={submitStatus === "loading"}
                    className="shrink-0"
                  >
                    {submitStatus === "loading" ? "..." : "Subscribe"}
                  </Button>
                </div>

                {submitStatus === "error" && (
                  <p className="text-xs text-red-400 tracking-wide">{errorMsg}</p>
                )}

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

            {/* Dismiss link */}
            {submitStatus !== "success" && (
              <button
                onClick={close}
                className="text-xs tracking-widest uppercase text-white/30 hover:text-white/60
                           transition-colors duration-200 text-center"
              >
                No thanks
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
