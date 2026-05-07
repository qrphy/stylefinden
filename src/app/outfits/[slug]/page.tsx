import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { getOutfit } from "@/lib/sanity-fetchers"
import ImgPlaceholder from "@/components/shared/ImgPlaceholder"

type Props = { params: Promise<{ slug: string }> }

type Piece = {
  _key?: string
  type?: string
  name: string
  description?: string
  image?: object
  affiliateUrl?: string
}

const styleLabel: Record<string, string> = {
  casual:      "Casual",
  streetstyle: "Street Style",
  elegant:     "Elegant",
  boho:        "Boho",
  sporty:      "Sporty",
  minimalist:  "Minimalist",
  classic:     "Classic",
  vintage:     "Vintage",
  formal:      "Formal",
}
const seasonLabel: Record<string, string> = {
  spring:       "Spring",
  summer:       "Summer",
  autumn:       "Autumn",
  winter:       "Winter",
  "all-season": "All Season",
}
const occasionLabel: Record<string, string> = {
  casual:       "Casual",
  office:       "Office",
  evening:      "Evening",
  wedding:      "Wedding",
  sport:        "Sport & Outdoor",
  beach:        "Beach",
  festival:     "Festival",
  "date-night": "Date Night",
}

const SHOP_GROUPS = [
  { key: "tops",        label: "Tops & Outerwear", types: ["top", "outerwear"]           },
  { key: "bottoms",     label: "Bottoms",           types: ["bottom", "dress"]            },
  { key: "shoes",       label: "Shoes",             types: ["shoes"]                      },
  { key: "accessories", label: "Bags & Accessories", types: ["bag", "accessory", "other"] },
]

export async function generateStaticParams() {
  const slugs = await client.withConfig({ useCdn: false }).fetch<{ slug: string }[]>(
    `*[_type == "outfit" && defined(slug.current)]{"slug": slug.current}`
  )
  return slugs
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const outfit = await getOutfit(slug)
  if (!outfit) return {}
  return {
    title: outfit.title,
    description: outfit.description ?? `Discover the ${outfit.title} outfit on STYLEFINDEN.`,
    alternates: { canonical: `https://stylefinden.com/outfits/${slug}` },
  }
}

export default async function OutfitPage({ params }: Props) {
  const { slug } = await params
  const outfit = await getOutfit(slug)
  if (!outfit) notFound()

  const imageUrl = outfit.image
    ? urlFor(outfit.image).width(800).height(1067).url()
    : undefined

  const pieces: Piece[] = outfit.pieces ?? []

  const shopGroups = SHOP_GROUPS
    .map((g) => ({ ...g, items: pieces.filter((p) => g.types.includes(p.type ?? "")) }))
    .filter((g) => g.items.length > 0)

  const hasShopSection = shopGroups.some((g) => g.items.some((p) => p.affiliateUrl))

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
            />
          </div>

          {/* Sağ — Detaylar */}
          <div className="flex flex-col justify-center gap-6">
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
              <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                {outfit.description}
              </p>
            )}

            {/* Parça sayısı özeti */}
            {pieces.length > 0 && (
              <div className="flex items-center gap-3 py-4 border-t border-b border-gray-100">
                <span className="text-2xl font-black text-black">{pieces.length}</span>
                <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
                  pieces in this look
                </span>
              </div>
            )}

            {/* Tags */}
            {outfit.tags && outfit.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {outfit.tags.map((tag: string) => (
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
            <a
              href="/outfits"
              className="self-start mt-2 flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-500 hover:text-black transition-colors duration-200 group"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current rotate-180 group-hover:-translate-x-1 transition-transform duration-200" fill="none" strokeWidth={2}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
              Back to Outfits
            </a>
          </div>
        </div>
      </section>

      {/* ── Outfit Pieces listesi ────────────────────────────────────────────── */}
      {pieces.length > 0 && (
        <section className="border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-16">
            <div className="flex flex-col gap-2 mb-8">
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
                What to wear
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-black tracking-tight">
                Outfit Pieces
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pieces.map((piece, i) => (
                <div
                  key={piece._key ?? i}
                  className="flex items-start gap-4 p-5 bg-gray-50 border border-gray-100"
                >
                  <span className="text-xs font-black text-gray-300 tracking-widest mt-0.5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    {piece.type && (
                      <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
                        {piece.type}
                      </span>
                    )}
                    <span className="text-sm font-black text-black tracking-tight">
                      {piece.name}
                    </span>
                    {piece.description && (
                      <span className="text-xs text-gray-500 leading-relaxed">
                        {piece.description}
                      </span>
                    )}
                  </div>
                  {piece.affiliateUrl && (
                    <a
                      href={piece.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="shrink-0 self-center text-xs font-semibold tracking-widest uppercase text-gray-400 hover:text-black transition-colors duration-200"
                      aria-label={`Shop ${piece.name}`}
                    >
                      Shop →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Shop the Look ───────────────────────────────────────────────────── */}
      {hasShopSection && (
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-20">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
                  Affiliate Links
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-black tracking-tight">
                  Shop the Look
                </h2>
              </div>
              <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                Links may be affiliate links. Clicking and purchasing supports STYLEFINDEN at no extra cost to you.
              </p>
            </div>

            <div className="flex flex-col gap-12">
              {shopGroups.map((group) => {
                const shoppable = group.items.filter((p) => p.affiliateUrl)
                if (shoppable.length === 0) return null
                return (
                  <div key={group.key}>
                    <div className="flex items-center gap-4 mb-6">
                      <h3 className="text-xs font-bold tracking-widest uppercase text-black">
                        {group.label}
                      </h3>
                      <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {shoppable.map((piece, i) => {
                        const pieceImg = piece.image
                          ? urlFor(piece.image).width(400).height(500).url()
                          : undefined
                        return (
                          <a
                            key={piece._key ?? i}
                            href={piece.affiliateUrl}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="group flex flex-col gap-3"
                            aria-label={`Shop ${piece.name}`}
                          >
                            <div className="relative aspect-[4/5] w-full bg-white border border-gray-200 overflow-hidden group-hover:border-gray-400 transition-colors duration-200">
                              <ImgPlaceholder
                                src={pieceImg}
                                alt={piece.name}
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <span className="flex items-center gap-1.5 px-4 py-1.5 bg-black text-white text-xs font-semibold tracking-widest uppercase whitespace-nowrap">
                                  Shop
                                  <svg viewBox="0 0 24 24" className="h-3 w-3 stroke-current" fill="none" strokeWidth={2.5}>
                                    <path d="M5 12h14M13 6l6 6-6 6" />
                                  </svg>
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-col gap-1">
                              <span className="text-xs font-black text-black tracking-tight leading-snug line-clamp-2 group-hover:text-gray-600 transition-colors duration-200">
                                {piece.name}
                              </span>
                              {piece.description && (
                                <span className="text-xs text-gray-400 leading-snug line-clamp-1">
                                  {piece.description}
                                </span>
                              )}
                            </div>
                          </a>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
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
            <a
              href="/outfits"
              className="px-8 py-3 bg-black text-white text-xs font-semibold tracking-widest uppercase hover:bg-gray-800 transition-colors duration-200"
            >
              All Outfits
            </a>
            <a
              href="/accessories"
              className="px-8 py-3 border border-black text-black text-xs font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-200"
            >
              Accessories
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
