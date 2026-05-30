'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ImgPlaceholder from '@/components/shared/ImgPlaceholder'

const STORAGE_KEY = 'sf_recently_viewed'
const MAX_STORED = 10
const MAX_SHOWN = 4

type StoredOutfit = {
  slug: string
  title: string
  imageUrl?: string
  style?: string
  occasion?: string
  ts: number
}

type Props = {
  currentSlug: string
  currentTitle: string
  currentImageUrl?: string
  currentStyle?: string
  currentOccasion?: string
}

export default function RecentlyViewed({
  currentSlug,
  currentTitle,
  currentImageUrl,
  currentStyle,
  currentOccasion,
}: Props) {
  const [items, setItems] = useState<StoredOutfit[]>([])

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as StoredOutfit[]

      // Save current outfit (deduplicated)
      const entry: StoredOutfit = {
        slug: currentSlug,
        title: currentTitle,
        imageUrl: currentImageUrl,
        style: currentStyle,
        occasion: currentOccasion,
        ts: Date.now(),
      }
      const updated = [
        entry,
        ...stored.filter(e => e.slug !== currentSlug),
      ].slice(0, MAX_STORED)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))

      // Show previous outfits (exclude current)
      setItems(updated.filter(e => e.slug !== currentSlug).slice(0, MAX_SHOWN))
    } catch {}
  }, [currentSlug, currentTitle, currentImageUrl, currentStyle, currentOccasion])

  if (items.length === 0) return null

  return (
    <section className="section-divider">
      <div className="container-page py-10 md:py-14 flex flex-col gap-6">
        <span className="eyebrow">Recently Viewed</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/outfits/${item.slug}`}
              className="group flex flex-col gap-2"
            >
              <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                <ImgPlaceholder
                  src={item.imageUrl}
                  alt={item.title}
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="card-overlay" />
              </div>
              <span className="card-title px-0.5 line-clamp-2">{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
