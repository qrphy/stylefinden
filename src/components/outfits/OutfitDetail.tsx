import Link from "next/link"
import ImgPlaceholder from "@/components/shared/ImgPlaceholder"
import Button from "@/components/shared/Button"
import { urlFor } from "@/sanity/lib/image"
import { styleLabel, seasonLabel, occasionLabel } from "@/lib/outfit-labels"
import OutfitTracker from "@/components/outfits/OutfitTracker"
import OutfitSimilarSection from "@/components/outfits/OutfitSimilarSection"
import RecentlyViewed from "@/components/outfits/RecentlyViewed"
import ShareButton from "@/components/shared/ShareButton"
import FavoriteButton from "@/components/shared/FavoriteButton"

const EMPTY_OUTFITS: never[] = []
const EMPTY_PIECES: never[] = []

type SanityImage = {
  asset?: object
  hotspot?: object
  crop?: object
  lqip?: string
}

export type OutfitPiece = {
  _key?: string
  type?: string
  name: string
  colorTag?: string
  itemTag?: string
  description?: string
  image?: SanityImage
  affiliateUrl?: string
}

export type OutfitDetailData = {
  _id: string
  title: string
  slug: string
  description?: string
  image?: SanityImage
  style?: string
  season?: string
  occasion?: string
  pieces?: OutfitPiece[]
  tags?: string[]
}

export type RelatedByPieceOutfit = {
  _id: string
  title: string
  slug: string
  image?: SanityImage
  style?: string
  occasion?: string
}

export type SimilarPieceEntry = {
  _key?: string
  type?: string
  name: string
  image?: SanityImage
  affiliateUrl?: string
}

export type SimilarPiecesResult = {
  tops:        SimilarPieceEntry[]
  bottoms:     SimilarPieceEntry[]
  shoes:       SimilarPieceEntry[]
  accessories: SimilarPieceEntry[]
}

type Props = {
  outfit: OutfitDetailData
  outfitsByPieces?: RelatedByPieceOutfit[]
  similarPiecesRaw?: SimilarPiecesResult[]
  breadcrumbContext?: { href: string; label: string }
}

const SHOP_GROUPS = [
  { key: "tops",        label: "Tops & Outerwear", types: ["top", "outerwear"]            },
  { key: "bottoms",     label: "Bottoms",           types: ["bottom", "dress"]             },
  { key: "shoes",       label: "Shoes",             types: ["shoes"]                       },
  { key: "accessories", label: "Bags & Accessories", types: ["bag", "accessory", "other"] },
]


export default function OutfitDetail({ outfit, outfitsByPieces = EMPTY_OUTFITS, similarPiecesRaw = EMPTY_PIECES, breadcrumbContext }: Props) {
  const imageUrl = outfit.image
    ? urlFor(outfit.image).url()
    : undefined
  const imageLqip = outfit.image?.lqip

  const pieces = outfit.pieces ?? []

  const shopGroups = SHOP_GROUPS
    .map((g) => ({ ...g, items: pieces.filter((p) => g.types.includes(p.type ?? "")) }))
    .filter((g) => g.items.length > 0)

  const hasShopSection = shopGroups.some((g) => g.items.some((p) => p.affiliateUrl))

  return (
    <main>
      {/* Item 7: Track this outfit view for Style Finder history hints */}
      <OutfitTracker occasion={outfit.occasion} style={outfit.style} />
      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
      <div className="container-page pt-8 pb-2">
        <nav className="breadcrumb-nav">
          <Link href="/" className="breadcrumb-link">Home</Link>
          <span>/</span>
          <Link href="/outfits" className="breadcrumb-link">Outfits</Link>
          {breadcrumbContext ? (
            <>
              <span>/</span>
              <a href={breadcrumbContext.href} className="breadcrumb-link">
                {breadcrumbContext.label}
              </a>
            </>
          ) : outfit.style ? (
            <>
              <span>/</span>
              <a href={`/outfits/style/${outfit.style}`} className="breadcrumb-link">
                {styleLabel[outfit.style] ?? outfit.style}
              </a>
            </>
          ) : null}
          <span>/</span>
          <span className="text-black truncate max-w-[200px]">{outfit.title}</span>
        </nav>
      </div>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="container-page py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 xl:gap-16">

          {/* Sol — Ana görsel */}
          <div className="flex flex-col gap-2">
            <div className="relative">
              <div className="relative aspect-[3/4] w-full bg-gray-100 overflow-hidden">
                <ImgPlaceholder
                  src={imageUrl}
                  alt={outfit.title}
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  blurDataURL={imageLqip}
                />
              </div>
              <ShareButton url={`/outfits/${outfit.slug}`} title={outfit.title} />
              <FavoriteButton
                id={outfit._id}
                title={outfit.title}
                className="absolute top-3 right-3 z-10 size-9 px-2.5"
              />
              {imageUrl && (
                <a
                  href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(`https://stylefinden.com/outfits/${outfit.slug}`)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(outfit.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Save to Pinterest"
                  className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 bg-white px-2.5 py-1.5 text-[10px] font-semibold tracking-widest uppercase text-black hover:bg-black hover:text-white transition-colors duration-200"
                >
                  <svg viewBox="0 0 24 24" className="size-3.5 fill-current shrink-0" aria-hidden="true">
                    <path d="M9.04 21.54c.96.29 1.93.46 2.96.46a10 10 0 0 0 10-10A10 10 0 0 0 12 2 10 10 0 0 0 2 12c0 4.25 2.67 7.9 6.44 9.34-.09-.78-.18-2.07.04-2.96l1.15-4.94s-.29-.58-.29-1.45c0-1.36.8-2.38 1.78-2.38.86 0 1.26.63 1.26 1.38 0 .86-.57 2.09-.86 3.27-.24 1.32.51 2.4 1.68 2.4 2.02 0 3.37-2.16 3.37-5.27 0-2.76-1.99-4.7-4.84-4.7-3.28 0-5.21 2.46-5.21 5.01 0 .99.37 2.04.84 2.62.09.11.1.2.08.31l-.31 1.26c-.05.19-.16.23-.37.14-1.39-.65-2.26-2.71-2.26-4.38 0-3.57 2.6-6.85 7.48-6.85 3.93 0 6.99 2.8 6.99 6.54 0 3.9-2.46 7.04-5.86 7.04-1.15 0-2.22-.59-2.58-1.29l-.7 2.61c-.25.97-.94 2.19-1.4 2.93z"/>
                  </svg>
                  Save
                </a>
              )}
            </div>
            <p className="text-[10px] text-gray-400 leading-relaxed">
              AI-generated styling image for inspiration. Actual fit may vary.
            </p>
          </div>

          {/* Sağ — Detaylar */}
          <div className="flex flex-col justify-start gap-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {outfit.style && (
                <span className="badge-md bg-black text-white">
                  {styleLabel[outfit.style] ?? outfit.style}
                </span>
              )}
              {outfit.season && (
                <span className="badge-md bg-gray-100 text-gray-700">
                  {seasonLabel[outfit.season] ?? outfit.season}
                </span>
              )}
              {outfit.occasion && (
                <span className="badge-md border border-gray-200 text-gray-600">
                  {occasionLabel[outfit.occasion] ?? outfit.occasion}
                </span>
              )}
            </div>

            {/* Başlık */}
            <h1 className="page-heading">
              {outfit.title}
            </h1>

            {/* Açıklama */}
            {outfit.description && (
              <p className="body-text font-light">
                {outfit.description}
              </p>
            )}

            {/* Shop the Look — yatay sıra */}
            {hasShopSection && (
              <div className="flex flex-col gap-3 py-4 border-t border-b border-gray-100">
                <span className="eyebrow">
                  Shop the Look
                </span>
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-0.5 px-0.5 [&::-webkit-scrollbar]:h-[3px] [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                  {shopGroups.flatMap((g) => g.items.filter((p) => p.affiliateUrl)).map((piece, i) => {
                    const pieceImg = piece.image
                      ? urlFor(piece.image).width(400).height(500).url()
                      : undefined
                    return (
                      <a
                        key={piece._key ?? i}
                        href={`/api/affiliate/${piece._key}?url=${encodeURIComponent(piece.affiliateUrl!)}&outfit=${outfit._id}`}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="group flex flex-col gap-1.5 shrink-0 w-[96px]"
                        aria-label={`Shop ${piece.name}`}
                      >
                        <div className="relative w-[96px] h-[120px] bg-gray-50 overflow-hidden">
                          <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.06]">
                            <ImgPlaceholder
                              src={pieceImg}
                              alt={piece.name}
                              sizes="96px"
                              blurDataURL={piece.image?.lqip}
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
                        <span className="text-[10px] font-semibold text-black tracking-tight leading-snug line-clamp-3 group-hover:text-gray-500 transition-colors">
                          {piece.name}
                        </span>
                      </a>
                    )
                  })}
                </div>
                <p className="text-[10px] text-gray-400 leading-relaxed">
                  Affiliate links — supports STYLEFINDEN at no extra cost.
                </p>
              </div>
            )}

            {/* Tags */}
            {outfit.tags && outfit.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {outfit.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Back link */}
            <Button variant="ghost" href="/outfits" arrow arrowDir="left" className="self-start mt-2">
              Back to Outfits
            </Button>
          </div>
        </div>
      </section>

      {/* ── Similar Pieces + Similar Outfits ────────────────────────────────── */}
      <OutfitSimilarSection outfitsByPieces={outfitsByPieces} similarPiecesRaw={similarPiecesRaw} />

      {/* ── Recently Viewed ─────────────────────────────────────────────────── */}
      <RecentlyViewed
        currentSlug={outfit.slug}
        currentTitle={outfit.title}
        currentImageUrl={imageUrl}
        currentStyle={outfit.style}
        currentOccasion={outfit.occasion}
      />

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="section-divider">
        <div className="container-page py-12 cta-row">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="eyebrow">
              Discover more
            </span>
            <span className="text-lg font-semibold text-black tracking-tight">
              Find your next look
            </span>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button variant="primary" href="/outfits">All Outfits</Button>
            <Button variant="outline" href="/accessories">Accessories</Button>
          </div>
        </div>
      </section>
    </main>
  )
}
