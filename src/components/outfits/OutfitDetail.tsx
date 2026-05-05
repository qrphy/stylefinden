import ImgPlaceholder from "@/components/shared/ImgPlaceholder"
import OutfitPiecesRow from "@/components/outfits/OutfitPiecesRow"
import SimilarOutfits from "@/components/outfits/SimilarOutfits"
import { urlFor } from "@/sanity/lib/image"
import { styleLabel, seasonLabel, occasionLabel } from "@/lib/outfit-labels"

export type OutfitPiece = {
  _key?: string
  type?: string
  name: string
  description?: string
  image?: object
  affiliateUrl?: string
}

export type OutfitDetailData = {
  _id: string
  title: string
  slug: string
  description?: string
  image?: object
  style?: string
  season?: string
  occasion?: string
  pieces?: OutfitPiece[]
  tags?: string[]
}

export type SimilarOutfitItem = {
  _id: string
  title: string
  slug: string
  image?: object
  style?: string
  occasion?: string
}

type Props = {
  outfit: OutfitDetailData
  similarOutfits: SimilarOutfitItem[]
}

export default function OutfitDetail({ outfit, similarOutfits }: Props) {
  const imageUrl = outfit.image
    ? urlFor(outfit.image).width(800).height(1067).url()
    : undefined

  const pieces = outfit.pieces ?? []

  return (
    <main>
      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
      <div className="px-3 md:px-5 pt-6 pb-2">
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
      <section className="py-5 md:py-7">
        <div className="grid grid-cols-1 md:grid-cols-2 items-start">

          {/* Sol — Ana görsel */}
          <div className="pl-2 pr-3 md:pl-3 md:pr-5">
            <div className="relative aspect-[3/4] w-full bg-gray-100 overflow-hidden md:sticky md:top-6">
              <ImgPlaceholder
                src={imageUrl}
                alt={outfit.title}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Sağ — Detaylar + Shop the Look + Benzer Ürünler */}
          <div className="px-4 md:px-6 pr-4 md:pr-5 flex flex-col gap-3">
            {/* Badges */}
            <div className="flex flex-wrap gap-1.5">
              {outfit.style && (
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-widest uppercase bg-black text-white">
                  {styleLabel[outfit.style] ?? outfit.style}
                </span>
              )}
              {outfit.season && (
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-widest uppercase bg-gray-100 text-gray-700">
                  {seasonLabel[outfit.season] ?? outfit.season}
                </span>
              )}
              {outfit.occasion && (
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-widest uppercase border border-gray-200 text-gray-600">
                  {occasionLabel[outfit.occasion] ?? outfit.occasion}
                </span>
              )}
            </div>

            {/* Başlık */}
            <h1 className="text-xl md:text-2xl font-black text-black tracking-tight leading-tight">
              {outfit.title}
            </h1>

            {/* Açıklama */}
            {outfit.description && (
              <p className="text-xs text-gray-500 leading-relaxed">
                {outfit.description}
              </p>
            )}

            {/* Parça sayısı */}
            {pieces.length > 0 && (
              <div className="flex items-center gap-2 py-2 border-t border-b border-gray-100">
                <span className="text-lg font-black text-black">{pieces.length}</span>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">
                  pieces in this look
                </span>
              </div>
            )}

            {/* Shop the Look */}
            <OutfitPiecesRow pieces={pieces} />

            {/* Benzer Ürünler */}
            <SimilarOutfits outfits={similarOutfits} />

            {/* Back link */}
            <a
              href="/outfits"
              className="self-start mt-1 flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-500 hover:text-black transition-colors duration-200 group"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current rotate-180 group-hover:-translate-x-1 transition-transform duration-200" fill="none" strokeWidth={2}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
              Back to Outfits
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="border-t border-gray-100">
        <div className="px-3 md:px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
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
