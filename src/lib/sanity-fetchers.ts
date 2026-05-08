// Sanity detay sayfaları için React.cache() ile sarılmış fetcher'lar.
// cache() sayesinde aynı request içinde generateMetadata ve page component
// aynı sorguyu çalıştırsa bile Sanity'ye tek istek gider.
// Her fetcher revalidate ve tag bilgisini de içerir — on-demand revalidation çalışır.
import { cache } from 'react'
import { client } from '@/sanity/lib/client'
import {
  OUTFIT_QUERY,
  SIMILAR_OUTFITS_QUERY,
  OUTFITS_BY_PIECE_TAGS_QUERY,
  HAIRSTYLE_QUERY,
  ACCESSORY_QUERY,
  TREND_QUERY,
  POST_QUERY,
} from '@/lib/queries'

const OPTS = (tag: string) => ({ next: { revalidate: 3600, tags: [tag] } })

export const getOutfit        = cache((slug: string) => client.fetch(OUTFIT_QUERY,    { slug }, OPTS('outfit')))
export const getSimilarOutfits = cache((id: string, style: string, occasion: string) =>
  client.fetch(SIMILAR_OUTFITS_QUERY, { id, style: style ?? '', occasion: occasion ?? '' }, OPTS('outfit'))
)

export const getOutfitsByPieceTags = cache((id: string, colors: string[], items: string[]) =>
  client.fetch(OUTFITS_BY_PIECE_TAGS_QUERY, { id, colors, items }, OPTS('outfit'))
)
export const getHairstyle = cache((slug: string) => client.fetch(HAIRSTYLE_QUERY, { slug }, OPTS('hairstyle')))
export const getAccessory = cache((slug: string) => client.fetch(ACCESSORY_QUERY, { slug }, OPTS('accessory')))
export const getTrend     = cache((slug: string) => client.fetch(TREND_QUERY,     { slug }, OPTS('trend')))
export const getPost      = cache((slug: string) => client.fetch(POST_QUERY,      { slug }, OPTS('post')))
