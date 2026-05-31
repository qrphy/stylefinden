'use client'
import { useCallback, useEffect, useState } from 'react'

const KEY = 'sf_favorites'

export function useLocalFavorites() {
  const [ids, setIds] = useState<string[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(KEY) ?? '[]') as string[]
      setIds(stored)
    } catch {}
    setHydrated(true)
  }, [])

  const toggle = useCallback((id: string) => {
    setIds(prev => {
      const next = prev.includes(id)
        ? prev.filter(x => x !== id)
        : [id, ...prev]
      try { localStorage.setItem(KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const isFavorite = useCallback((id: string) => ids.includes(id), [ids])

  return { ids, toggle, isFavorite, count: ids.length, hydrated }
}
