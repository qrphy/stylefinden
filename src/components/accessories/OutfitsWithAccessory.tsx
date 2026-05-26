import Link from "next/link"
import ImgPlaceholder from "@/components/shared/ImgPlaceholder"
import { urlFor } from "@/sanity/lib/image"

type OutfitCard = {
  _id: string
  title: string
  slug: string
  image?: object
  style?: string
  occasion?: string
}

type Props = {
  outfits: OutfitCard[]
}

const STYLE_LABELS: Record<string, string> = {
  casual: "Casual",
  streetstyle: "Street Style",
  elegant: "Elegant",
  boho: "Boho",
  sporty: "Sporty",
  minimalist: "Minimalist",
  classic: "Classic",
  vintage: "Vintage",
  formal: "Formal",
  "old-money": "Old Money",
  "retro-vintage": "Retro",
  y2k: "Y2K",
  western: "Western",
}

export default function OutfitsWithAccessory({ outfits }: Props) {
  if (outfits.length === 0) return null

  return (
    <section className="section-divider">
      <div className="px-3 md:px-5 py-10">
        {/* Başlık */}
        <div className="flex items-baseline justify-between mb-6">
          <div className="flex flex-col gap-1">
            <span className="eyebrow">
              Styled With This
            </span>
            <h2 className="text-lg font-black text-black tracking-tight">
              Outfits Featuring This Accessory
            </h2>
          </div>
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
            {outfits.length} {outfits.length === 1 ? "outfit" : "outfits"}
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {outfits.map((outfit) => {
            const imgUrl = outfit.image
              ? urlFor(outfit.image).width(1400).height(1867).url()
              : undefined
            const styleLabel = outfit.style ? (STYLE_LABELS[outfit.style] ?? outfit.style) : null

            return (
              <Link
                key={outfit._id}
                href={`/outfits/${outfit.slug}`}
                aria-label={outfit.title}
                className="group flex flex-col gap-2"
              >
                {/* Görsel */}
                <div className="relative aspect-[3/4] w-full bg-gray-100 border border-gray-200 overflow-hidden group-hover:border-gray-400 transition-colors duration-200">
                  <ImgPlaceholder
                    src={imgUrl}
                    alt={outfit.title}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {/* Hover overlay */}
                  <div className="card-overlay" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="px-3 py-1.5 bg-black text-white text-[10px] font-semibold tracking-widest uppercase">
                      View Outfit
                    </span>
                  </div>
                  {/* Style badge */}
                  {styleLabel && (
                    <div className="absolute top-2 left-2">
                      <span className="px-1.5 py-0.5 bg-black/80 text-white text-[9px] font-semibold tracking-widest uppercase">
                        {styleLabel}
                      </span>
                    </div>
                  )}
                </div>

                {/* Başlık */}
                <span className="text-xs font-black text-black tracking-tight leading-snug line-clamp-2 group-hover:text-gray-600 transition-colors duration-200">
                  {outfit.title}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
