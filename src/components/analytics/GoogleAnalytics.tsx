"use client"
import Script from "next/script"
import { useState, useEffect } from "react"

const GA_ID = "G-RQREQ7L05B"
const CONSENT_KEY = "sf_cookie_consent"

export default function GoogleAnalytics() {
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(CONSENT_KEY) === "true") setConsented(true)

    const handler = () => setConsented(true)
    window.addEventListener("sf_consent_granted", handler)
    return () => window.removeEventListener("sf_consent_granted", handler)
  }, [])

  if (!consented) return null

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}
