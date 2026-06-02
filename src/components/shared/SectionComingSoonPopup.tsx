"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  section: string;
  storageKey: string;
  outfitsHref?: string;
  outfitsLabel?: string;
  description?: string;
};

const DISMISS_DAYS = 3;
const SHOW_DELAY_MS = 1500;

function shouldShow(key: string): boolean {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return true;
    const { status, until } = JSON.parse(raw) as { status: string; until?: number };
    if (status === "subscribed") return false;
    if (status === "dismissed" && until && Date.now() < until) return false;
    return true;
  } catch {
    return true;
  }
}

function persist(key: string, status: "subscribed" | "dismissed") {
  const until =
    status === "dismissed"
      ? Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000
      : undefined;
  localStorage.setItem(key, JSON.stringify({ status, until }));
}

export default function SectionComingSoonPopup({
  section,
  storageKey,
  outfitsHref = "/outfits",
  outfitsLabel = "Browse Outfits",
  description,
}: Props) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (shouldShow(storageKey)) setOpen(true);
    }, SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [storageKey]);

  function close() {
    persist(storageKey, "dismissed");
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
      persist(storageKey, "subscribed");
    } catch (err) {
      setSubmitStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center px-4 bg-black/60"
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      onKeyDown={(e) => { if (e.key === "Escape") close(); }}
    >
      <dialog
        open
        aria-modal="true"
        aria-labelledby="coming-soon-title"
        className="relative flex flex-col sm:flex-row w-full max-w-sm sm:max-w-2xl overflow-hidden m-0 p-0 border-0"
      >
        {/* Close */}
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 text-white sm:text-white hover:opacity-60 transition-opacity duration-200 leading-none text-lg"
        >
          ✕
        </button>

        {/* Left — black panel */}
        <div className="flex flex-col justify-between gap-8 bg-black p-8 sm:p-10 sm:w-[45%] sm:shrink-0">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold tracking-widest uppercase text-white/40">
              Coming Soon
            </span>
            <h2
              id="coming-soon-title"
              className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight"
            >
              {section}
            </h2>
            <p className="text-sm text-white/60 leading-relaxed">
              {description ??
                `We're curating the best ${section.toLowerCase()} content — this section launches soon.`}
            </p>
          </div>

          <Link
            href={outfitsHref}
            onClick={close}
            className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-white/50 hover:text-white transition-colors duration-200 group"
          >
            {outfitsLabel}
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

        {/* Right — white panel */}
        <div className="flex flex-col justify-center gap-5 bg-white p-8 sm:p-10 sm:w-[55%]">
          {submitStatus === "success" ? (
            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold tracking-widest uppercase text-black">
                You&apos;re on the list.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                We&apos;ll notify you as soon as this section goes live.
              </p>
              <button
                onClick={close}
                className="mt-2 w-full py-3 border border-black text-xs font-semibold tracking-widest uppercase text-black hover:bg-black hover:text-white transition-colors duration-200"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-1">
                <p className="text-base font-black text-black tracking-tight">
                  Be the first to know
                </p>
                <p className="text-sm text-gray-500">
                  Subscribe and we&apos;ll notify you when this launches.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  aria-label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  disabled={submitStatus === "loading"}
                  className="w-full px-4 py-3 border border-gray-300 text-black placeholder-gray-400
                             text-sm focus:outline-none focus:border-black disabled:opacity-50
                             transition-colors duration-200"
                />
                {submitStatus === "error" && (
                  <p className="text-xs text-red-500 tracking-wide">{errorMsg}</p>
                )}
                <button
                  type="submit"
                  aria-label="Subscribe to be notified"
                  disabled={submitStatus === "loading"}
                  className="w-full py-3.5 bg-black text-white text-xs font-semibold tracking-widest
                             uppercase hover:bg-gray-900 transition-colors duration-200 disabled:opacity-50"
                >
                  {submitStatus === "loading" ? "..." : "Notify Me"}
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="w-full py-3 border border-gray-200 text-xs font-semibold text-gray-400
                             tracking-widest uppercase hover:border-gray-400 hover:text-gray-700
                             transition-colors duration-200"
                >
                  No thanks
                </button>
              </form>

              <p className="text-xs text-gray-400 leading-relaxed">
                No spam. Unsubscribe anytime.
              </p>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
}
