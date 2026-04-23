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
      setMessage("Danke! Du bist jetzt dabei. Schau auch in deinen Spam-Ordner.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Etwas ist schiefgelaufen. Bitte versuche es erneut.");
    }
  }

  return (
    <section className="w-full bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-16 md:py-24">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10 xl:gap-20">

          <div className="flex flex-col gap-4 xl:max-w-lg">
            <span className="text-xs font-semibold tracking-widest uppercase text-white/40">Newsletter</span>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Kein Trend, <span className="italic font-light">kein Look</span> mehr verpassen.
            </h2>
            <p className="text-sm text-white/60 leading-relaxed">
              Wöchentlich kuratierte Outfits, Frisuren-Inspirationen und exklusive Style-Tipps – direkt in dein Postfach. Kein Spam, jederzeit abbestellbar.
            </p>
            <div className="flex flex-wrap gap-5 mt-2">
              {[{ icon: "✦", text: "Kein Spam" }, { icon: "✦", text: "Jederzeit kündbar" }, { icon: "✦", text: "DSGVO-konform" }].map((item) => (
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
                <p className="text-sm font-semibold tracking-widest uppercase text-white">Erfolgreich angemeldet!</p>
                <p className="text-xs text-white/50 leading-relaxed">{message}</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors duration-200 underline underline-offset-4"
                >
                  Weitere E-Mail anmelden
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
                    placeholder="deine@email.de"
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
                    {status === "loading" ? "..." : "Anmelden"}
                  </button>
                </div>
                {status === "error" && (
                  <p className="text-xs text-red-400 tracking-wide">{message}</p>
                )}
                <p className="text-xs text-white/30 leading-relaxed">
                  Mit der Anmeldung stimmst du unserer{" "}
                  <a href="/datenschutz" className="underline underline-offset-2 hover:text-white/60 transition-colors duration-200">
                    Datenschutzerklärung
                  </a>{" "}
                  zu.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
