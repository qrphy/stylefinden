import { client } from '@/sanity/lib/client'
import { OUTFITS_OCCASION_COUNTS_QUERY } from '@/lib/queries'
import StyleFinderWidget from './StyleFinderWidget'

// Server wrapper that injects live outfit counts per occasion into the client widget.
export default async function StyleFinderWidgetServer() {
  const occasionCounts: Record<string, number> = {}

  try {
    const outfits = await client.fetch(
      OUTFITS_OCCASION_COUNTS_QUERY,
      {},
      { next: { revalidate: 3600, tags: ['outfit'] } }
    )

    for (const outfit of outfits) {
      // Single occasion field (existing data)
      if (outfit.occasion) {
        const occ = outfit.occasion as string
        occasionCounts[occ] = (occasionCounts[occ] || 0) + 1
      }
      // Multi-occasion array (item 9 — new field)
      if (Array.isArray(outfit.occasions)) {
        for (const occ of outfit.occasions as string[]) {
          occasionCounts[occ] = (occasionCounts[occ] || 0) + 1
        }
      }
    }

    // Merge legacy evening + date-night into the unified date-evening bucket
    const de =
      (occasionCounts['evening']    || 0) +
      (occasionCounts['date-night'] || 0) +
      (occasionCounts['date-evening'] || 0)
    if (de > 0) {
      occasionCounts['date-evening'] = de
      delete occasionCounts['evening']
      delete occasionCounts['date-night']
    }
  } catch {
    // Silently fall back to widget without counts
  }

  return <StyleFinderWidget occasionCounts={occasionCounts} />
}
