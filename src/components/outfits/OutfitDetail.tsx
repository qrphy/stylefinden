import Link from "next/link"
import ImgPlaceholder from "@/components/shared/ImgPlaceholder"
import Button from "@/components/shared/Button"
import { urlFor } from "@/sanity/lib/image"
import { styleLabel, seasonLabel, occasionLabel } from "@/lib/outfit-labels"
import PieceThumbnailStrip from "@/components/outfits/PieceThumbnailStrip"

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
  pieces?: Array<{ _key?: string; name: string; image?: SanityImage; affiliateUrl?: string }>
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

const PIECE_GROUPS = [
  { key: "tops",        label: "Similar Tops",        tags: ["top", "outerwear"]           },
  { key: "bottoms",     label: "Similar Bottoms",      tags: ["bottom", "dress"]            },
  { key: "shoes",       label: "Similar Shoes",        tags: ["shoes"]                      },
  { key: "accessories", label: "Similar Accessories",  tags: ["bag", "accessory", "other"] },
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

  const pieceGroupedOutfits = PIECE_GROUPS
    .map((g) => ({
      ...g,
      outfits: outfitsByPieces.filter((o) =>
        o.matchedPieces?.some((p) => g.tags.includes(p.itemTag ?? ""))
      ),
    }))
    .filter((g) => g.outfits.length > 0)

  return (
    <main>
      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 pt-8 pb-2">
        <nav className="flex items-center gap-2 text-xs tracking-widest uppercase text-gray-400">
          <a href="/" className="hover:text-black transition-colors">Home</a>
          <span>/</span>
          <a href="/outfits" className="hover:text-black transition-colors">Outfits</a>
          {outfit.occasion && (
            <>
              <span>/</span>
              <a
                href={`/outfits/occasion/${outfit.occasion}`}
                className="hover:text-black transition-colors"
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
      <section className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-10 md:py-14">
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
                <span className="px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-black text-white">
                  {styleLabel[outfit.style] ?? outfit.style}
                </span>
              )}
              {outfit.season && (
                <span className="px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-gray-100 text-gray-700">
                  {seasonLabel[outfit.season] ?? outfit.season}
                </span>
              )}
              {outfit.occasion && (
                <span className="px-3 py-1 text-xs font-semibold tracking-widest uppercase border border-gray-200 text-gray-600">
                  {occasionLabel[outfit.occasion] ?? outfit.occasion}
                </span>
              )}
            </div>

            {/* Başlık */}
            <h1 className="text-3xl md:text-4xl xl:text-5xl font-black text-black tracking-tight leading-tight">
              {outfit.title}
            </h1>

            {/* Açıklama */}
            {outfit.description && (
              <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed font-[family-name:var(--font-poppins)]">
                {outfit.description}
              </p>
            )}

            {/* Shop the Look — yatay sıra */}
            {hasShopSection && (
              <div className="flex flex-col gap-3 py-4 border-t border-b border-gray-100">
                <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
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
                    className="px-3 py-1 text-xs font-medium tracking-widest uppercase bg-white text-gray-700 border border-gray-200"
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

      {/* ── Similar Pieces by Category ──────────────────────────────────────── */}
      {pieceGroupedOutfits.length > 0 && (
        <section className="border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-16">
            <div className="flex flex-col gap-2 mb-10">
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
                You might also like
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-black tracking-tight">
                Outfits With Similar Pieces
              </h2>
            </div>

            <div className="flex flex-col gap-10">
              {pieceGroupedOutfits.map((group) => (
                <div key={group.key} className="flex flex-col gap-4">
                  <span className="text-xs font-semibold tracking-widest uppercase text-gray-400 border-b border-gray-100 pb-3">
                    {group.label}
                  </span>
                  <div className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:h-[3px] [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                    {group.outfits.map((related) => {
                      const imgUrl = related.image
                        ? urlFor(related.image).width(400).height(533).url()
                        : undefined
                      const matched = related.matchedPieces?.[0]
                      return (
                        <Link
                          key={related._id}
                          href={`/outfits/${related.slug}`}
                          className="group flex flex-col gap-2 shrink-0 w-[160px] sm:w-[180px]"
                          aria-label={related.title}
                        >
                          <div className="relative aspect-[3/4] w-full bg-gray-100 overflow-hidden border border-gray-100 group-hover:border-gray-300 transition-colors duration-200">
                            <ImgPlaceholder
                              src={imgUrl}
                              alt={related.title}
                              sizes="180px"
                              blurDataURL={related.image?.lqip}
                            />
                            <div className="absolute top-2 left-2 flex flex-col gap-1">
                              {related.style && (
                                <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-widest uppercase bg-black text-white">
                                  {styleLabel[related.style] ?? related.style}
                                </span>
                              )}
                              {related.occasion && (
                                <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-widest uppercase bg-white text-gray-700 border border-gray-200">
                                  {occasionLabel[related.occasion] ?? related.occasion}
                                </span>
                              )}
                            </div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <span className="flex items-center gap-1 px-3 py-1 bg-black text-white text-[9px] font-semibold tracking-widest uppercase whitespace-nowrap">
                                View Look
                                <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 stroke-current" fill="none" strokeWidth={2.5}>
                                  <path d="M5 12h14M13 6l6 6-6 6" />
                                </svg>
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-black text-black tracking-tight leading-snug line-clamp-2 group-hover:text-gray-600 transition-colors duration-200">
                              {related.title}
                            </span>
                            {matched && (
                              <span className="text-[9px] font-semibold tracking-widest uppercase text-gray-400 line-clamp-1">
                                {matched.name}
                              </span>
                            )}
                            <PieceThumbnailStrip
                              pieces={related.pieces?.map((p, i) => ({
                                key: p._key ?? String(i),
                                name: p.name,
                                image: p.image ? urlFor(p.image).width(80).height(80).url() : undefined,
                                affiliateUrl: p.affiliateUrl,
                              }))}
                            />
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
              Discover more
            </span>
            <span className="text-lg font-black text-black tracking-tight">
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
