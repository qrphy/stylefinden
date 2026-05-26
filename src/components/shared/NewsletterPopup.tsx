"use client";

import ImgPlaceholder from "@/components/shared/ImgPlaceholder";
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
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div className="relative flex flex-col sm:flex-row w-full max-w-sm sm:max-w-3xl bg-white overflow-hidden sm:h-[min(520px,90vh)]">

        {/* Close — card seviyesinde, mobilde görsel üzerinde (beyaz), desktopda form üzerinde (siyah) */}
        <button
          onClick={close}
          aria-label="Close newsletter popup"
          className="absolute top-4 right-4 z-10 text-white sm:text-black hover:opacity-60 transition-opacity duration-200 leading-none text-lg"
        >
          ✕
        </button>

        {/* Görsel — mobilde üst (h-48), desktopda sol (%55) */}
        <div className="relative h-64 sm:h-auto sm:w-[55%] sm:shrink-0">
          <ImgPlaceholder
            src="/categories/outfits/evening-event.jpeg"
            alt="Evening event style"
            sizes="(max-width: 640px) 384px, 480px"
          />
        </div>

        {/* Form paneli — mobilde alt, desktopda sağ (%45) */}
        <div className="flex flex-col justify-center w-full sm:w-[45%] px-6 py-8 sm:px-8 sm:py-10 md:px-12 bg-white">

          {submitStatus === "success" ? (
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="text-xs font-semibold tracking-widest uppercase text-black">
                Successfully subscribed!
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Thank you! Check your inbox (and spam folder too).
              </p>
              <button
                onClick={close}
                className="mt-2 px-6 py-2.5 border border-black text-xs font-semibold tracking-widest uppercase text-black hover:bg-black hover:text-white transition-colors duration-200"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <h2
                id="popup-title"
                className="text-xl font-black tracking-wide uppercase text-black mb-7 text-center"
              >
                Join the Community
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  disabled={submitStatus === "loading"}
                  className="w-full px-4 py-3 border border-gray-300 text-black
                             placeholder-gray-400 text-sm focus:outline-none
                             focus:border-black disabled:opacity-50 transition-colors duration-200"
                />

                {submitStatus === "error" && (
                  <p className="text-xs text-red-500 tracking-wide">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={submitStatus === "loading"}
                  className="w-full py-3.5 bg-black text-white text-xs font-semibold
                             tracking-widest uppercase hover:bg-gray-900 transition-colors
                             duration-200 disabled:opacity-50"
                >
                  {submitStatus === "loading" ? "..." : "Subscribe"}
                </button>

                <button
                  type="button"
                  onClick={close}
                  className="w-full py-3.5 border border-gray-300 text-xs font-semibold text-gray-500 tracking-widest uppercase hover:border-black hover:text-black transition-colors duration-200"
                >
                  No thanks
                </button>
              </form>

              <p className="mt-3 text-xs text-gray-400 leading-relaxed text-center">
                By clicking &quot;SUBSCRIBE&quot; you confirm that you have read and accepted our{" "}
                <a href="/privacy" className="underline underline-offset-2 hover:text-gray-600 transition-colors duration-200">
                  Privacy Policy
                </a>{" "}
                and Terms of Use.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
