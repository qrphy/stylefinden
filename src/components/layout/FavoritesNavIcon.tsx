'use client'
import Link from 'next/link'
import { useLocalFavorites } from '@/hooks/useLocalFavorites'

export default function FavoritesNavIcon() {
  const { count, hydrated } = useLocalFavorites()

  return (
    <Link
      href="/favorites"
      aria-label="Saved looks"
      className="relative flex items-center justify-center size-8 hover:opacity-60 transition-opacity duration-200"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-5 fill-none stroke-black"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      {hydrated && count > 0 && (
        <span
          aria-hidden="true"
          className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-black text-white text-[9px] font-bold flex items-center justify-center px-1 leading-none"
        >
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  )
}
