'use client'
import { useLocalFavorites } from '@/hooks/useLocalFavorites'

type Props = {
  id: string
  title: string
  className?: string
}

export default function FavoriteButton({ id, title, className = '' }: Props) {
  const { isFavorite, toggle, hydrated } = useLocalFavorites()

  if (!hydrated) return null

  const saved = isFavorite(id)

  return (
    <button
      type="button"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(id) }}
      aria-label={saved ? `Remove ${title} from saved looks` : `Save ${title}`}
      aria-pressed={saved}
      className={`flex items-center justify-center bg-white hover:bg-black text-black hover:text-white transition-colors duration-200 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className={`size-3.5 stroke-current transition-colors duration-200 ${saved ? 'fill-current' : 'fill-none'}`}
        strokeWidth={2}
        aria-hidden="true"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  )
}
