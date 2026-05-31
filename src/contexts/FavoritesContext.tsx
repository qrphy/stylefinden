'use client'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const KEY = 'sf_favorites'

type FavoritesCtx = {
  ids: string[]
  toggle: (id: string) => void
  isFavorite: (id: string) => boolean
  clearAll: () => void
  count: number
  hydrated: boolean
}

const Ctx = createContext<FavoritesCtx | null>(null)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
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

  const clearAll = useCallback(() => {
    setIds([])
    try { localStorage.removeItem(KEY) } catch {}
  }, [])

  return (
    <Ctx.Provider value={{ ids, toggle, isFavorite, clearAll, count: ids.length, hydrated }}>
      {children}
    </Ctx.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
