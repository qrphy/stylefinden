import ImgPlaceholder from "@/components/shared/ImgPlaceholder"
import { urlFor } from "@/sanity/lib/image"

type Piece = {
  _key?: string
  type?: string
  name: string
  description?: string
  image?: object
  affiliateUrl?: string
}

type Props = {
  pieces: Piece[]
  title?: string
}

export default function OutfitPiecesRow({ pieces, title = "Shop the Look" }: Props) {
  if (pieces.length === 0) return null

  return (
    <div className="mt-2 pt-4 border-t border-gray-100">
      <span className="eyebrow block mb-4">
        {title}
      </span>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
        {pieces.map((piece, i) => {
          const pieceImg = piece.image
            ? urlFor(piece.image).width(300).height(375).url()
            : undefined

          const content = (
            <div className="group flex flex-col gap-2 shrink-0 w-[100px] sm:w-[120px]">
              <div className="relative aspect-[4/5] w-full bg-gray-50 overflow-hidden">
                <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.06]">
                  <ImgPlaceholder
                    src={pieceImg}
                    alt={piece.name}
                    sizes="120px"
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
              <span className="text-[11px] font-black text-black tracking-tight leading-snug line-clamp-2 group-hover:text-gray-600 transition-colors duration-200">
                {piece.name}
              </span>
            </div>
          )

          return piece.affiliateUrl ? (
            <a
              key={piece._key ?? i}
              href={piece.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              aria-label={`Shop ${piece.name}`}
            >
              {content}
            </a>
          ) : (
            <div key={piece._key ?? i}>{content}</div>
          )
        })}
      </div>
      <p className="mt-3 text-[10px] text-gray-400 leading-relaxed">
        Links may be affiliate links. Clicking supports STYLEFINDEN at no extra cost.
      </p>
    </div>
  )
}
