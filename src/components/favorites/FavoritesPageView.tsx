'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { OUTFITS_BY_IDS_QUERY } from '@/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import ImgPlaceholder from '@/components/shared/ImgPlaceholder'
import FavoriteButton from '@/components/shared/FavoriteButton'
import Button from '@/components/shared/Button'
import { useLocalFavorites } from '@/hooks/useLocalFavorites'
import { styleLabel, occasionLabel } from '@/lib/outfit-labels'

type FavPiece = {
  _key: string
  name: string
  image?: { asset?: object; hotspot?: object; crop?: object; lqip?: string }
  affiliateUrl?: string
}

type FavOutfit = {
  _id: string
  title: string
  slug: string
  image?: { asset?: object; hotspot?: object; crop?: object; lqip?: string }
  style?: string
  season?: string
  occasion?: string
  pieces?: FavPiece[]
}

export default function FavoritesPageView() {
  const { ids, hydrated } = useLocalFavorites()
  const [fetchedOutfits, setFetchedOutfits] = useState<FavOutfit[]>([])
  const [loading, setLoading] = useState(true)
  const fetchedIds = useRef<string>('')

  useEffect(() => {
    if (!hydrated) return

    const key = ids.join(',')

    // fetch only when the set of IDs changes (new favorite added)
    if (ids.length === 0) {
      setFetchedOutfits([])
      setLoading(false)
      return
    }

    const newIds = ids.filter(id => !fetchedOutfits.some(o => o._id === id))
    if (newIds.length === 0 && fetchedIds.current === key) return

    fetchedIds.current = key

    client
      .fetch<FavOutfit[]>(OUTFITS_BY_IDS_QUERY, { ids })
      .then(data => setFetchedOutfits(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [ids, hydrated]) // eslint-disable-line react-hooks/exhaustive-deps

  // Keep order matching localStorage (most recently saved first)
  const orderMap = new Map(ids.map((id, i) => [id, i]))
  const visibleOutfits = fetchedOutfits
    .filter(o => ids.includes(o._id))
    .sort((a, b) => (orderMap.get(a._id) ?? 0) - (orderMap.get(b._id) ?? 0))

  const isEmpty = hydrated && !loading && visibleOutfits.length === 0

  return (
    <main>
      {/* Header */}
      <section className="container-page pt-10 pb-6 border-b border-gray-100">
        <nav className="breadcrumb-nav mb-4">
          <Link href="/" className="breadcrumb-link">Home</Link>
          <span>/</span>
          <span className="text-black">Saved Looks</span>
        </nav>
        <h1 className="page-heading">Saved Looks</h1>
        {!isEmpty && (
          <p className="body-text text-gray-500 mt-2">
            {hydrated && !loading
              ? `${visibleOutfits.length} outfit${visibleOutfits.length !== 1 ? 's' : ''} saved`
              : 'Your personal outfit collection'}
          </p>
        )}
      </section>

      {/* Grid */}
      {!isEmpty ? (
        <section className="container-page py-10 md:py-14">
          {loading || !hydrated ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="aspect-[3/4] bg-gray-100 animate-pulse" />
                  <div className="h-3 bg-gray-100 animate-pulse w-3/4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {visibleOutfits.map(outfit => {
                const imageUrl = outfit.image ? urlFor(outfit.image).width(600).height(800).url() : undefined
                return (
                  <article key={outfit._id} className="group flex flex-col gap-3">
                    <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                      <Link href={`/outfits/${outfit.slug}`} className="absolute inset-0">
                        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.02]">
                          <ImgPlaceholder
                            src={imageUrl}
                            alt={outfit.title}
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            blurDataURL={outfit.image?.lqip as string | undefined}
                          />
                        </div>
                        <div className="card-overlay" />
                      </Link>

                      {/* Remove from favorites */}
                      <FavoriteButton
                        id={outfit._id}
                        title={outfit.title}
                        className="absolute top-3 right-3 z-10 size-8 px-2"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Link
                        href={`/outfits/${outfit.slug}`}
                        className="card-title line-clamp-2 hover:text-gray-500 transition-colors"
                      >
                        {outfit.title}
                      </Link>
                      {(outfit.style || outfit.occasion) && (
                        <p className="text-[11px] text-gray-400 uppercase tracking-wide font-semibold">
                          {[
                            outfit.style ? styleLabel[outfit.style] ?? outfit.style : null,
                            outfit.occasion ? occasionLabel[outfit.occasion] ?? outfit.occasion : null,
                          ].filter(Boolean).join(' · ')}
                        </p>
                      )}
                      {outfit.pieces && outfit.pieces.length > 0 && (
                        <div className="flex items-center gap-1 pt-1.5 border-t border-gray-100">
                          {outfit.pieces.slice(0, 4).map((piece) => {
                            const pieceUrl = piece.image
                              ? urlFor(piece.image).width(120).height(120).url()
                              : undefined
                            const inner = (
                              <div
                                key={piece._key}
                                className="shrink-0 size-9 relative bg-gray-100 border border-gray-200 overflow-hidden"
                                title={piece.name}
                              >
                                <ImgPlaceholder src={pieceUrl} alt={piece.name} sizes="36px" />
                              </div>
                            )
                            return piece.affiliateUrl ? (
                              <a
                                key={piece._key}
                                href={piece.affiliateUrl}
                                target="_blank"
                                rel="noopener noreferrer sponsored"
                                aria-label={`Shop ${piece.name}`}
                                className="hover:opacity-75 transition-opacity"
                              >
                                {inner}
                              </a>
                            ) : inner
                          })}
                          {outfit.pieces.length > 4 && (
                            <div className="shrink-0 size-9 bg-gray-100 border border-gray-200 flex items-center justify-center">
                              <span className="text-[9px] font-semibold text-gray-400 leading-none">+{outfit.pieces.length - 4}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </section>
      ) : (
        /* Empty state */
        <section className="container-page py-20 flex flex-col items-center gap-6 text-center">
          <svg
            viewBox="0 0 24 24"
            className="size-12 fill-none stroke-gray-300"
            strokeWidth={1}
            aria-hidden="true"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-black tracking-tight text-lg">No saved looks yet</p>
            <p className="text-sm text-gray-400 max-w-xs">
              Tap the heart on any outfit to save it here for later.
            </p>
          </div>
          <Button variant="primary" href="/outfits" arrow>Browse Outfits</Button>
        </section>
      )}

      {/* CTA */}
      {!isEmpty && (
        <section className="section-divider">
          <div className="container-page py-12 cta-row">
            <div className="flex flex-col gap-1 text-center sm:text-left">
              <span className="eyebrow">Keep exploring</span>
              <span className="text-lg font-semibold text-black tracking-tight">
                Discover more looks
              </span>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button variant="primary" href="/outfits">All Outfits</Button>
              <Button variant="outline" href="/accessories">Accessories</Button>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
