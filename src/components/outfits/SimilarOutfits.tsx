import Link from "next/link"
import ImgPlaceholder from "@/components/shared/ImgPlaceholder"
import { urlFor } from "@/sanity/lib/image"

type SimilarOutfit = {
  _id: string
  title: string
  slug: string
  image?: object
  style?: string
  occasion?: string
}

type Props = {
  outfits: SimilarOutfit[]
}

export default function SimilarOutfits({ outfits }: Props) {
  if (outfits.length === 0) return null

  return (
    <section className="border-t border-gray-100 px-3 md:px-5 py-8">
      <span className="text-xs font-semibold tracking-widest uppercase text-gray-400 block mb-4">
        Benzer Ürünler
      </span>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
        {outfits.map((outfit) => {
          const imgUrl = outfit.image
            ? urlFor(outfit.image).width(300).height(375).url()
            : undefined
          return (
            <Link
              key={outfit._id}
              href={`/outfits/${outfit.slug}`}
              aria-label={outfit.title}
              className="group flex flex-col gap-2 shrink-0 w-[100px] sm:w-[120px]"
            >
              <div className="relative aspect-[3/4] w-full bg-gray-100 border border-gray-200 overflow-hidden group-hover:border-gray-400 transition-colors duration-200">
                <ImgPlaceholder
                  src={imgUrl}
                  alt={outfit.title}
                  sizes="120px"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="px-2 py-1 bg-black text-white text-[10px] font-semibold tracking-widest uppercase">
                    View
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-black text-black tracking-tight leading-snug line-clamp-2 group-hover:text-gray-600 transition-colors duration-200">
                {outfit.title}
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
