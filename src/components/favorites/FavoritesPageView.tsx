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

function aggregatePieces(outfits: FavOutfit[]): FavPiece[] {
  const seen = new Set<string>()
  const result: FavPiece[] = []
  for (const outfit of outfits) {
    for (const piece of outfit.pieces ?? []) {
      if (!piece.image) continue
      if (seen.has(piece.name)) continue
      seen.add(piece.name)
      result.push(piece)
    }
  }
  return result
}

export default function FavoritesPageView() {
  const { ids, hydrated, clearAll } = useLocalFavorites()
  const [fetchedOutfits, setFetchedOutfits] = useState<FavOutfit[]>([])
  const [loading, setLoading] = useState(true)
  const fetchedIds = useRef<string>('')

  useEffect(() => {
    if (!hydrated) return

    const key = ids.join(',')

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

  const orderMap = new Map(ids.map((id, i) => [id, i]))
  const visibleOutfits = fetchedOutfits
    .filter(o => ids.includes(o._id))
    .sort((a, b) => (orderMap.get(a._id) ?? 0) - (orderMap.get(b._id) ?? 0))

  const isEmpty = hydrated && !loading && visibleOutfits.length === 0
  const allPieces = aggregatePieces(visibleOutfits)

  return (
    <main>
      {/* Header */}
      <section className="container-page pt-10 pb-6 border-b border-gray-100">
        <nav className="breadcrumb-nav mb-4">
          <Link href="/" className="breadcrumb-link">Home</Link>
          <span>/</span>
          <span className="text-black">Saved Looks</span>
        </nav>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="page-heading">Saved Looks</h1>
            {!isEmpty && (
              <p className="body-text text-gray-500 mt-2">
                {hydrated && !loading
                  ? `${visibleOutfits.length} outfit${visibleOutfits.length !== 1 ? 's' : ''} saved`
                  : 'Your personal outfit collection'}
              </p>
            )}
          </div>
          {!isEmpty && hydrated && !loading && (
            <button
              type="button"
              onClick={clearAll}
              className="shrink-0 mt-1 text-[11px] font-semibold tracking-widest uppercase text-gray-400 hover:text-black transition-colors duration-200"
            >
              Clear all
            </button>
          )}
        </div>
      </section>

      {/* Outfit Grid */}
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

                      <FavoriteButton
                        id={outfit._id}
                        title={outfit.title}
                        className="absolute top-3 right-3 z-10 size-8 px-2"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
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

      {/* Shop the Look — all pieces from saved outfits */}
      {!isEmpty && allPieces.length > 0 && (
        <section className="section-divider">
          <div className="container-page py-12 md:py-16">
            <div className="flex flex-col gap-2 mb-8">
              <span className="eyebrow">From your saved looks</span>
              <h2 className="section-title">Shop the Look</h2>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
              {allPieces.map((piece, i) => {
                const imgUrl = piece.image
                  ? urlFor(piece.image).width(400).height(500).url()
                  : undefined
                const Tag = piece.affiliateUrl ? 'a' : 'div'
                const linkProps = piece.affiliateUrl
                  ? {
                      href: `/api/affiliate/${piece._key}?url=${encodeURIComponent(piece.affiliateUrl)}`,
                      target: '_blank',
                      rel: 'noopener noreferrer sponsored',
                    }
                  : {}
                return (
                  <Tag
                    key={piece._key ?? i}
                    {...linkProps}
                    className="group flex flex-col gap-1.5"
                    aria-label={piece.affiliateUrl ? `Shop ${piece.name}` : undefined}
                  >
                    <div className="relative aspect-[4/5] w-full bg-gray-50 overflow-hidden">
                      <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.06]">
                        <ImgPlaceholder
                          src={imgUrl}
                          alt={piece.name}
                          sizes="(max-width: 640px) 25vw, (max-width: 1024px) 16vw, 10vw"
                          blurDataURL={piece.image?.lqip as string | undefined}
                        />
                      </div>
                      <div className="piece-shop-overlay">
                        <span className="piece-shop-label">
                          Shop
                          <svg viewBox="0 0 24 24" className="size-2 stroke-current" fill="none" strokeWidth={2.5}>
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-black tracking-tight leading-snug line-clamp-2 group-hover:text-gray-500 transition-colors duration-200">
                      {piece.name}
                    </span>
                  </Tag>
                )
              })}
            </div>

            <p className="text-[10px] text-gray-400 leading-relaxed mt-6">
              Affiliate links — supports STYLEFINDEN at no extra cost.
            </p>
          </div>
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
