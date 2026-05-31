'use client'

import { useState } from 'react'

type Props = {
  url: string
  styleName: string
}

export default function ShareResultButton({ url, styleName }: Props) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    const fullUrl = `https://stylefinden.com${url}`

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: `My style is ${styleName} — STYLEFINDEN`, url: fullUrl })
        return
      } catch {
        // cancelled or unsupported
      }
    }

    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 text-[10px] font-semibold tracking-widest uppercase text-gray-400 hover:text-black transition-colors duration-200"
    >
      {copied ? (
        <>
          <svg viewBox="0 0 24 24" className="size-3.5 stroke-current shrink-0" fill="none" strokeWidth={2.5}>
            <path d="M5 13l4 4L19 7" />
          </svg>
          Link copied
        </>
      ) : (
        <>
          <svg viewBox="0 0 24 24" className="size-3.5 stroke-current shrink-0" fill="none" strokeWidth={2}>
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />
          </svg>
          Share your result
        </>
      )}
    </button>
  )
}
