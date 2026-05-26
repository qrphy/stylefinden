import Link from "next/link"
import ImgPlaceholder from "@/components/shared/ImgPlaceholder"
import { urlFor } from "@/sanity/lib/image"
import { styleLabel, occasionLabel } from "@/lib/outfit-labels"
import type { RelatedByPieceOutfit, SimilarPiecesResult, SimilarPieceEntry } from "@/components/outfits/OutfitDetail"

const PIECE_GROUPS: { key: keyof SimilarPiecesResult; label: string }[] = [
  { key: "tops",        label: "Tops & Outerwear"  },
  { key: "bottoms",     label: "Bottoms"            },
  { key: "shoes",       label: "Shoes"              },
  { key: "accessories", label: "Bags & Accessories" },
]

function flatUnique(entries: SimilarPieceEntry[]): SimilarPieceEntry[] {
  return entries.filter((p, i, arr) => p.image && arr.findIndex(x => x.name === p.name) === i)
}

type Props = {
  outfitsByPieces: RelatedByPieceOutfit[]
  similarPiecesRaw?: SimilarPiecesResult[]
}

export default function OutfitSimilarSection({ outfitsByPieces, similarPiecesRaw = [] }: Props) {
  const grouped = PIECE_GROUPS.map(g => ({
    ...g,
    pieces: flatUnique(similarPiecesRaw.flatMap(r => r[g.key] ?? [])),
  })).filter(g => g.pieces.length > 0)

  return (
    <>
      {/* ── Similar Pieces ──────────────────────────────────────────────────── */}
      {grouped.length > 0 && (
        <section className="section-divider">
          <div className="container-page py-12 md:py-16">
            <div className="flex flex-col gap-2 mb-10">
              <span className="eyebrow">Shop the Category</span>
              <h2 className="section-title">Similar Pieces</h2>
            </div>

            <div className="flex flex-col gap-10">
              {grouped.map((group) => (
                <div key={group.key} className="flex flex-col gap-4">
                  <span className="eyebrow border-b border-gray-100 pb-3">
                    {group.label}
                  </span>
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                    {group.pieces.map((piece, i) => {
                      const imgUrl = piece.image
                        ? urlFor(piece.image).width(200).height(250).url()
                        : undefined
                      const Tag = piece.affiliateUrl ? "a" : "div"
                      const linkProps = piece.affiliateUrl
                        ? { href: `/api/affiliate/${piece._key}?url=${encodeURIComponent(piece.affiliateUrl)}`, target: "_blank", rel: "noopener noreferrer sponsored" }
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
                              />
                            </div>
                            <div className="piece-shop-overlay">
                              <span className="piece-shop-label">
                                Shop
                                <svg viewBox="0 0 24 24" className="h-2 w-2 stroke-current" fill="none" strokeWidth={2.5}>
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
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Similar Outfits ─────────────────────────────────────────────────── */}
      {outfitsByPieces.length > 0 && (
        <section className="section-divider">
          <div className="container-page py-12 md:py-16">
            <div className="flex flex-col gap-2 mb-10">
              <span className="eyebrow">You might also like</span>
              <h2 className="section-title">Similar Outfits</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {outfitsByPieces.map((related) => {
                const imgUrl = related.image
                  ? urlFor(related.image).width(800).height(1067).url()
                  : undefined
                return (
                  <Link
                    key={related._id}
                    href={`/outfits/${related.slug}`}
                    className="group flex flex-col gap-2"
                    aria-label={related.title}
                  >
                    <div className="relative aspect-[3/4] w-full bg-gray-100 overflow-hidden">
                      <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.05]">
                        <ImgPlaceholder
                          src={imgUrl}
                          alt={related.title}
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          blurDataURL={related.image?.lqip}
                        />
                      </div>
                      <div className="card-overlay" />
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span className="flex items-center gap-1 px-3 py-1 bg-black text-white text-[9px] font-semibold tracking-widest uppercase whitespace-nowrap">
                          View Look
                          <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 stroke-current" fill="none" strokeWidth={2.5}>
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-black tracking-tight leading-snug line-clamp-2 group-hover:text-gray-600 transition-colors duration-200">
                      {related.title}
                    </span>
                    {(related.style || related.occasion) && (
                      <div className="flex flex-wrap gap-1">
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
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
