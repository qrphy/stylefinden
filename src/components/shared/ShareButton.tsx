"use client"

import { useState } from "react"

type Props = {
  url: string
  title: string
}

export default function ShareButton({ url, title }: Props) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    const fullUrl = `https://stylefinden.com${url.startsWith("/") ? url : `/${url}`}`

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url: fullUrl })
        return
      } catch {
        // user cancelled or not supported — fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard also unavailable
    }
  }

  return (
    <button
      onClick={handleShare}
      aria-label="Share this outfit"
      className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 bg-white px-2.5 py-1.5 text-[10px] font-semibold tracking-widest uppercase text-black hover:bg-black hover:text-white transition-colors duration-200"
    >
      {copied ? (
        <>
          <svg viewBox="0 0 24 24" className="size-3.5 stroke-current shrink-0" fill="none" strokeWidth={2.5} aria-hidden="true">
            <path d="M5 13l4 4L19 7" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg viewBox="0 0 24 24" className="size-3.5 stroke-current shrink-0" fill="none" strokeWidth={2} aria-hidden="true">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />
          </svg>
          Share
        </>
      )}
    </button>
  )
}
