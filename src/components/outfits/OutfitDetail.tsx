import ImgPlaceholder from "@/components/shared/ImgPlaceholder"
import Button from "@/components/shared/Button"
import { urlFor } from "@/sanity/lib/image"
import { styleLabel, seasonLabel, occasionLabel } from "@/lib/outfit-labels"
import OutfitTracker from "@/components/outfits/OutfitTracker"
import OutfitSimilarSection from "@/components/outfits/OutfitSimilarSection"

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
  matchedPieces?: { name: string; colorTag?: string; itemTag?: string }[]
  pieces?: Array<{ _key?: string; type?: string; name: string; image?: SanityImage; affiliateUrl?: string }>
}

type Props = {
  outfit: OutfitDetailData
  outfitsByPieces?: RelatedByPieceOutfit[]
}

const SHOP_GROUPS = [
  { key: "tops",        label: "Tops & Outerwear", types: ["top", "outerwear"]            },
  { key: "bottoms",     label: "Bottoms",           types: ["bottom", "dress"]             },
  { key: "shoes",       label: "Shoes",             types: ["shoes"]                       },
  { key: "accessories", label: "Bags & Accessories", types: ["bag", "accessory", "other"] },
]


export default function OutfitDetail({ outfit, outfitsByPieces = [] }: Props) {
  const imageUrl = outfit.image
    ? urlFor(outfit.image).width(800).height(1067).url()
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
          <a href="/" className="breadcrumb-link">Home</a>
          <span>/</span>
          <a href="/outfits" className="breadcrumb-link">Outfits</a>
          {outfit.occasion && (
            <>
              <span>/</span>
              <a
                href={`/outfits/occasion/${outfit.occasion}`}
                className="breadcrumb-link"
              >
                {occasionLabel[outfit.occasion] ?? outfit.occasion}
              </a>
            </>
          )}
          <span>/</span>
          <span className="text-black truncate max-w-[200px]">{outfit.title}</span>
        </nav>
      </div>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="container-page py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 xl:gap-16">

          {/* Sol — Ana görsel */}
          <div className="relative aspect-[3/4] w-full bg-gray-100 overflow-hidden">
            <ImgPlaceholder
              src={imageUrl}
              alt={outfit.title}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              blurDataURL={imageLqip}
            />
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
                      ? urlFor(piece.image).width(200).height(250).url()
                      : undefined
                    return (
                      <a
                        key={piece._key ?? i}
                        href={piece.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="group flex flex-col gap-1.5 shrink-0 w-[96px]"
                        aria-label={`Shop ${piece.name}`}
                      >
                        <div className="relative w-[96px] h-[120px] bg-white border border-gray-200 overflow-hidden group-hover:border-gray-400 transition-colors duration-200">
                          <ImgPlaceholder
                            src={pieceImg}
                            alt={piece.name}
                            sizes="96px"
                            blurDataURL={piece.image?.lqip}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <span className="flex items-center gap-1 px-2.5 py-1 bg-white text-black text-[10px] font-bold tracking-widest uppercase">
                              Shop
                              <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 stroke-current" fill="none" strokeWidth={2.5}>
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
      <OutfitSimilarSection outfitsByPieces={outfitsByPieces} />

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
