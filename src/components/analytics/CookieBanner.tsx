// Çerez onay banneri — localStorage'da daha önce bir tercih kaydedilmemişse gösterilir.
// "Kabul" butonuna basıldığında sf_consent_granted eventi yayınlanır; GoogleAnalytics bileşeni bu eventi dinler.
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
    <div className="fixed bottom-6 left-6 z-50 w-80 bg-black text-white p-6 flex flex-col gap-4">
      <div>
        <p className="text-sm font-black tracking-wide uppercase mb-2">We use cookies</p>
        <p className="text-xs text-gray-300 leading-relaxed">
          Cookies enhance your experience, tailor your ads and improve our website.{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-2 text-white hover:text-gray-300 transition-colors duration-200"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={decline}
          className="flex-1 text-xs tracking-widest uppercase border border-gray-600 text-gray-300 hover:border-white hover:text-white transition-colors duration-200 py-2.5 px-3"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={accept}
          className="flex-1 text-xs tracking-widest uppercase bg-white text-black hover:bg-gray-100 transition-colors duration-200 py-2.5 px-3"
        >
          Accept All
        </button>
      </div>
    </div>
  )
}
