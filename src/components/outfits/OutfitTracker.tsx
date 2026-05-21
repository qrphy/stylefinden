'use client'

import { useEffect } from 'react'

type Props = {
  occasion?: string
  style?: string
}

// Tracks which outfits the user views and saves to localStorage for StyleFinderWidget's history hints.
export default function OutfitTracker({ occasion, style }: Props) {
  useEffect(() => {
    if (!occasion) return
    try {
      const key = 'sf_history'
      const existing = JSON.parse(localStorage.getItem(key) ?? '[]') as Array<{
        occasion?: string
        style?: string
        ts: number
      }>
      const entry = { occasion, style, ts: Date.now() }
      // Deduplicate by occasion+style, keep newest, cap at 30 entries
      const updated = [
        entry,
        ...existing.filter(e => !(e.occasion === occasion && e.style === style)),
      ].slice(0, 30)
      localStorage.setItem(key, JSON.stringify(updated))
    } catch {}
  }, [occasion, style])

  return null
}
