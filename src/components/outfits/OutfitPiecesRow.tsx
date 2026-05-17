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
}

export default function OutfitPiecesRow({ pieces }: Props) {
  if (pieces.length === 0) return null

  return (
    <div className="mt-2 pt-4 border-t border-gray-100">
      <span className="eyebrow block mb-4">
        Shop the Look
      </span>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
        {pieces.map((piece, i) => {
          const pieceImg = piece.image
            ? urlFor(piece.image).width(300).height(375).url()
            : undefined

          const content = (
            <div className="group flex flex-col gap-2 shrink-0 w-[100px] sm:w-[120px]">
              <div className="relative aspect-[4/5] w-full bg-gray-100 border border-gray-200 overflow-hidden group-hover:border-gray-400 transition-colors duration-200">
                <ImgPlaceholder
                  src={pieceImg}
                  alt={piece.name}
                  sizes="120px"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="px-2 py-1 bg-black text-white text-[10px] font-semibold tracking-widest uppercase">
                    Shop
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
