// Kompakt e-posta abonelik input'u — Footer gibi dar alanlarda kullanılmak üzere tasarlanmış mini versiyon.
// NewsletterForm'un aksine büyük siyah bölüm yerine sadece bir input + buton satırı gösterir.
"use client";

import { useState } from "react";

export default function NewsletterInput() {
  const [email, setEmail]   = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-xs tracking-widest uppercase text-gray-400">
        ✦ Subscribed — thank you!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
      <div className="flex items-stretch border-b border-gray-300 focus-within:border-black transition-colors duration-200">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail address"
          disabled={status === "loading"}
          className="flex-1 py-2 text-xs tracking-widest uppercase bg-transparent placeholder-gray-400 text-black focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="py-2 pl-4 text-xs font-semibold tracking-widest uppercase text-black hover:text-gray-500 transition-colors duration-200 disabled:opacity-50 shrink-0"
        >
          {status === "loading" ? "..." : "Join"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-xs text-red-500 tracking-wide">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
