import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { ALL_OUTFITS_RANKED_QUERY } from "@/lib/queries"
import ImgPlaceholder from "@/components/shared/ImgPlaceholder"
import Link from "next/link"
import Button from "@/components/shared/Button"
import PieceThumbnailStrip from "@/components/outfits/PieceThumbnailStrip"

type Props = {
  occasion?: string
  season?: string
  style?: string
  color?: string
  trend?: string
}

type SanityImg = { asset?: object; hotspot?: object; crop?: object; lqip?: string }
type OutfitDoc = {
  _id: string
  title: string
  slug: string
  image?: SanityImg
  style?: string
  season?: string
  occasion?: string
  occasions?: string[]
  featured?: boolean
  pieces?: { _key: string; name: string; image?: SanityImg; colorTag?: string }[]
}

function getOccasionSet(outfit: OutfitDoc): string[] {
  return [outfit.occasion, ...(outfit.occasions ?? [])].filter((o): o is string => Boolean(o))
}

function filterToCandidates(filterOccasion: string): string[] {
  if (filterOccasion === 'date-evening') return ['date-night', 'evening', 'date-evening']
  return [filterOccasion]
}

const OCCASION_LABELS: Record<string, string> = {
  casual: 'Everyday', office: 'Office', evening: 'Evening',
  'date-night': 'Date Night', 'date-evening': 'Date / Evening',
  'party-night-out': 'Party', school: 'School', travel: 'Travel',
  sport: 'Sport', beach: 'Beach', festival: 'Festival', wedding: 'Wedding',
}

const SEASON_LABELS: Record<string, string> = {
  spring: 'Spring', summer: 'Summer', autumn: 'Autumn', winter: 'Winter',
  'all-season': 'All Seasons',
}

const STYLE_LABELS: Record<string, string> = {
  minimalist: 'Minimalist', boho: 'Boho', streetstyle: 'Street Style',
  'old-money': 'Old Money', elegant: 'Elegant', y2k: 'Y2K',
  'retro-vintage': 'Retro Vintage', casual: 'Casual', 'clean-girl': 'Clean Girl',
  'sienna-vibe': 'Sienna Vibe', 'korean-fashion': 'Korean Fashion', 'black-dark': 'Dark',
  'cute-coquette': 'Coquette', formal: 'Formal', classic: 'Classic',
  sporty: 'Sporty', western: 'Western', vintage: 'Vintage',
}

const COLOR_LABELS: Record<string, string> = {
  black: 'Black', white: 'White', grey: 'Grey', beige: 'Beige',
  navy: 'Navy', blue: 'Blue', red: 'Red', burgundy: 'Burgundy',
  pink: 'Pink', orange: 'Orange', yellow: 'Yellow', green: 'Green',
  khaki: 'Khaki', brown: 'Brown', purple: 'Purple', multicolor: 'Multicolor',
}

export default async function RankedOutfitsView({ occasion, season, style, color, trend }: Props) {
  const allOutfits: OutfitDoc[] = await client.fetch(
    ALL_OUTFITS_RANKED_QUERY,
    {},
    { next: { revalidate: 3600, tags: ['outfit'] } }
  )

  let filtered = allOutfits
  if (season)   filtered = filtered.filter((o) => o.season === season)
  if (style)    filtered = filtered.filter((o) => o.style === style)
  if (trend)    filtered = filtered.filter((o) => o.style === trend)
  if (occasion) {
    filtered = filtered.filter((o) => {
      const candidates = filterToCandidates(occasion)
      return getOccasionSet(o).some((occ) => candidates.includes(occ))
    })
  }
  if (color) {
    filtered = filtered.filter((o) => o.pieces?.some((p) => p.colorTag === color))
  }

  const sorted = filtered.toSorted((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return 0
  })

  const activeFilters = [
    season   && (SEASON_LABELS[season]     ?? season),
    occasion && (OCCASION_LABELS[occasion] ?? occasion),
    style    && (STYLE_LABELS[style]       ?? style),
    trend    && (STYLE_LABELS[trend]       ?? trend),
    color    && (COLOR_LABELS[color]       ?? color),
  ].filter(Boolean) as string[]

  const hasFilters = activeFilters.length > 0

  return (
    <div>
      {hasFilters && (
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {activeFilters.map((label) => (
            <span
              key={label}
              className="px-3 py-1 text-[10px] font-semibold tracking-widest uppercase bg-black text-white"
            >
              {label}
            </span>
          ))}
          <Link
            href="/outfits"
            className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 hover:text-black transition-colors duration-200"
          >
            Clear ×
          </Link>
        </div>
      )}

      {hasFilters && (
        <p className="text-xs text-gray-400 tracking-widest uppercase mb-8">
          {sorted.length} look{sorted.length !== 1 ? 's' : ''} found
        </p>
      )}

      {sorted.length === 0 ? (
        <div className="py-20 text-center border border-gray-100">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-6">
            No outfits found for this filter.
          </p>
          <Button href="/outfits" variant="ghost" arrow>
            Browse all collections
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {sorted.map((outfit) => {
            const imageUrl = outfit.image ? urlFor(outfit.image).width(1400).height(1867).url() : undefined
            const imageLqip = outfit.image?.lqip
            const subtitle = [
              outfit.style    ? (STYLE_LABELS[outfit.style]       ?? outfit.style)    : null,
              outfit.occasion ? (OCCASION_LABELS[outfit.occasion] ?? outfit.occasion) : null,
            ].filter(Boolean).join(' · ')

            const pieceThumbnails = outfit.pieces
              ?.filter((p) => p.image)
              .map((p) => ({
                key: p._key,
                name: p.name,
                image: urlFor(p.image!).width(64).height(64).url(),
              }))

            return (
              <Link
                key={outfit._id}
                href={`/outfits/${outfit.slug}`}
                className="group flex flex-col gap-3"
              >
                <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                  <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.02]">
                    <ImgPlaceholder
                      src={imageUrl}
                      alt={outfit.title}
                      sizes="(max-width: 768px) 100vw, 25vw"
                      blurDataURL={imageLqip}
                    />
                  </div>
                  <div className="card-overlay" />
                </div>
                <div className="flex flex-col gap-1.5 px-0.5">
                  <h3 className="card-title line-clamp-2">{outfit.title}</h3>
                  {subtitle && (
                    <p className="text-xs tracking-widest uppercase text-gray-400 line-clamp-1">
                      {subtitle}
                    </p>
                  )}
                  <PieceThumbnailStrip pieces={pieceThumbnails} />
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
