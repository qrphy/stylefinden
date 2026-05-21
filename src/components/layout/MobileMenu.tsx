"use client";

import { useState } from "react";
import { navLinks } from "@/constants/navigation";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("idle");
    }
  }

  return (
    <div className="md:hidden">
      {/* Header bar */}
      <div className="relative flex items-center h-14 px-4 bg-white border-b border-gray-200">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="relative z-10 self-center"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-black" fill="none" strokeWidth={2}>
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        <a
          href="/"
          className="absolute inset-x-0 flex justify-center items-center h-14 brand-logo text-2xl"
        >
          STYLEFINDEN
        </a>
      </div>

      {/* Full-screen overlay */}
      <div className={`fixed inset-0 z-50 bg-white flex flex-col transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          {/* Close */}
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="absolute top-5 right-5 text-black text-lg leading-none hover:opacity-50 transition-opacity duration-200"
          >
            ✕
          </button>

          {/* Nav links */}
          <nav className="flex-1 flex flex-col justify-center px-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="mobile-nav-link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Bottom — email subscribe + copyright */}
          <div className="px-8 pb-10">
            {status === "success" ? (
              <p className="text-xs text-gray-500 pb-2">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe}>
                <div className="flex items-center border-b border-black pb-2 mb-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    disabled={status === "loading"}
                    className="flex-1 text-sm text-black placeholder-gray-400 focus:outline-none bg-transparent disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="text-xs font-semibold tracking-widest uppercase text-black ml-4 disabled:opacity-50"
                  >
                    {status === "loading" ? "..." : "Subscribe"}
                  </button>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  By providing your email address, you agree to our{" "}
                  <a href="/privacy" className="underline underline-offset-2">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            )}
            <p className="text-[11px] text-gray-400 mt-6">© 2026 STYLEFINDEN</p>
          </div>
      </div>
    </div>
  );
}
