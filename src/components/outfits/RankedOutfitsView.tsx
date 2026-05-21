import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { ALL_OUTFITS_RANKED_QUERY } from "@/lib/queries"
import ImgPlaceholder from "@/components/shared/ImgPlaceholder"
import Button from "@/components/shared/Button"
import PieceThumbnailStrip from "@/components/outfits/PieceThumbnailStrip"

type Props = {
  occasion?: string
  season?: string
  style?: string
}

type OutfitDoc = {
  _id: string
  title: string
  slug: string
  image?: object
  style?: string
  season?: string
  occasion?: string
  featured?: boolean
  pieces?: { _key: string; name: string; image?: object }[]
}

function occasionMatches(outfitOccasion: string | undefined, filterOccasion: string): boolean {
  if (filterOccasion === 'date-evening') {
    return outfitOccasion === 'date-night' || outfitOccasion === 'evening' || outfitOccasion === 'date-evening'
  }
  return outfitOccasion === filterOccasion
}

function calcScore(outfit: OutfitDoc, filters: Props): number {
  return (
    (filters.occasion && occasionMatches(outfit.occasion, filters.occasion) ? 3 : 0) +
    (filters.season   && outfit.season === filters.season   ? 2 : 0) +
    (filters.style    && outfit.style  === filters.style    ? 2 : 0) +
    (outfit.featured ? 1 : 0)
  )
}

function matchBadge(score: number, maxPossible: number): string | null {
  if (maxPossible === 0) return null
  if (score >= 5) return 'Perfect Match'
  if (score >= 3) return 'Close Match'
  if (score >= 1) return 'You Might Like'
  return null
}

const OCCASION_LABELS: Record<string, string> = {
  casual: 'Everyday', office: 'Office', evening: 'Evening',
  'date-night': 'Date Night', 'date-evening': 'Date / Evening',
  'party-night-out': 'Party', school: 'School', travel: 'Travel',
  sport: 'Sport', beach: 'Beach', festival: 'Festival', wedding: 'Wedding',
}

const SEASON_LABELS: Record<string, string> = {
  spring: 'Spring', summer: 'Summer', autumn: 'Autumn', winter: 'Winter',
}

const STYLE_LABELS: Record<string, string> = {
  minimalist: 'Minimal', boho: 'Boho', streetstyle: 'Street',
  'old-money': 'Old Money', elegant: 'Elegant', y2k: 'Y2K',
  'retro-vintage': 'Vintage', casual: 'Casual', 'clean-girl': 'Clean Girl',
  'sienna-vibe': 'Sienna Vibe', 'korean-fashion': 'Korean', 'black-dark': 'Dark',
  'cute-coquette': 'Coquette', formal: 'Formal', classic: 'Classic',
  sporty: 'Sporty', western: 'Western', vintage: 'Vintage',
}

export default async function RankedOutfitsView({ occasion, season, style }: Props) {
  const allOutfits: OutfitDoc[] = await client.fetch(
    ALL_OUTFITS_RANKED_QUERY,
    {},
    { next: { revalidate: 3600, tags: ['outfit'] } }
  )

  const filters = { occasion, season, style }
  const maxPossible =
    (occasion ? 3 : 0) +
    (season   ? 2 : 0) +
    (style    ? 2 : 0) + 1

  const ranked = [...allOutfits]
    .map((o) => ({ ...o, score: calcScore(o, filters) }))
    .sort((a, b) => b.score - a.score)

  const activeFilters = [
    occasion && (OCCASION_LABELS[occasion] ?? occasion),
    season   && (SEASON_LABELS[season]     ?? season),
    style    && (STYLE_LABELS[style]       ?? style),
  ].filter(Boolean) as string[]

  const topMatchCount = ranked.filter((o) => o.score >= 3).length

  return (
    <div>
      {/* Active filter pills + clear */}
      <div className="flex items-center gap-3 mb-2 flex-wrap">
        {activeFilters.map((label) => (
          <span
            key={label}
            className="px-3 py-1 text-[10px] font-semibold tracking-widest uppercase bg-black text-white"
          >
            {label}
          </span>
        ))}
        <a
          href="/outfits"
          className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 hover:text-black transition-colors duration-200"
        >
          Clear ×
        </a>
      </div>

      {topMatchCount > 0 && (
        <p className="text-xs text-gray-400 tracking-widest uppercase mb-8">
          {topMatchCount} match{topMatchCount !== 1 ? 'es' : ''} found
        </p>
      )}

      {ranked.length === 0 ? (
        <div className="py-20 text-center border border-gray-100">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-6">
            No outfits found for these filters.
          </p>
          <Button href="/outfits" variant="ghost" arrow>
            Browse all collections
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {ranked.map((outfit) => {
            const badge = matchBadge(outfit.score, maxPossible)
            const imageUrl = outfit.image
              ? urlFor(outfit.image).width(600).height(800).url()
              : undefined
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
              <a
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
                    />
                  </div>
                  {badge && (
                    <div className="absolute top-3 left-3">
                      <span className="text-[9px] font-semibold tracking-widest uppercase bg-black text-white px-2 py-1">
                        {badge}
                      </span>
                    </div>
                  )}
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
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}
