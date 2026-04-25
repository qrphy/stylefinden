"use client"
import { useState, useEffect } from "react"
import Link from "next/link"

const CONSENT_KEY = "sf_cookie_consent"

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(CONSENT_KEY) === null) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem(CONSENT_KEY, "true")
    window.dispatchEvent(new Event("sf_consent_granted"))
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "false")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-6 py-5 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-xs text-gray-500 leading-relaxed max-w-2xl">
          Wir verwenden Cookies, um die Nutzung unserer Website zu analysieren und das Erlebnis zu verbessern.{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-2 hover:text-black transition-colors duration-200"
          >
            Datenschutzerklärung
          </Link>
        </p>
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={decline}
            className="text-xs tracking-widest uppercase text-gray-400 hover:text-black transition-colors duration-200"
          >
            Ablehnen
          </button>
          <button
            onClick={accept}
            className="text-xs tracking-widest uppercase bg-black text-white px-6 py-2.5 hover:bg-gray-800 transition-colors duration-200"
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  )
}
