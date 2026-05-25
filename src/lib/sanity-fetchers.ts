// Sanity detay sayfaları için React.cache() ile sarılmış fetcher'lar.
// cache() sayesinde aynı request içinde generateMetadata ve page component
// aynı sorguyu çalıştırsa bile Sanity'ye tek istek gider.
// Her fetcher revalidate ve tag bilgisini de içerir — on-demand revalidation çalışır.
import { cache } from 'react'
import { client } from '@/sanity/lib/client'
import {
  OUTFIT_QUERY,
  OUTFITS_BY_PIECE_TAGS_QUERY,
  SIMILAR_PIECES_QUERY,
  HAIRSTYLE_QUERY,
  ACCESSORY_QUERY,
  OUTFITS_WITH_ACCESSORY_QUERY,
  TREND_QUERY,
  POST_QUERY,
} from '@/lib/queries'

const OPTS = (tag: string) => ({ next: { revalidate: 3600, tags: [tag] } })

export const getOutfit        = cache((slug: string) => client.fetch(OUTFIT_QUERY,    { slug }, OPTS('outfit')))

export const getOutfitsByPieceTags = cache((id: string, style: string, colors: string[], items: string[]) =>
  client.fetch(OUTFITS_BY_PIECE_TAGS_QUERY, { id, style, colors, items }, OPTS('outfit'))
)

type PieceForSimilarity = { type?: string; colorTag?: string; itemTag?: string }

export const getSimilarPieces = cache((id: string, pieces: PieceForSimilarity[]) => {
  const byTypes = (types: string[]) => pieces.filter(p => types.includes(p.type ?? ""))
  const colors  = (ps: PieceForSimilarity[]) => [...new Set(ps.map(p => p.colorTag).filter((c): c is string => Boolean(c)))]
  const items   = (ps: PieceForSimilarity[]) => [...new Set(ps.map(p => p.itemTag).filter((i): i is string => Boolean(i)))]

  const tops    = byTypes(["top", "outerwear"])
  const bottoms = byTypes(["bottom", "dress"])
  const shoes   = byTypes(["shoes"])
  const access  = byTypes(["bag", "accessory", "other"])

  return client.fetch(SIMILAR_PIECES_QUERY, {
    id,
    topColors:    colors(tops),    topItems:    items(tops),
    bottomColors: colors(bottoms), bottomItems: items(bottoms),
    shoeColors:   colors(shoes),   shoeItems:   items(shoes),
    accessColors: colors(access),  accessItems: items(access),
  }, OPTS('outfit'))
})
export const getHairstyle = cache((slug: string) => client.fetch(HAIRSTYLE_QUERY, { slug }, OPTS('hairstyle')))
export const getAccessory = cache((slug: string) => client.fetch(ACCESSORY_QUERY, { slug }, OPTS('accessory')))
export const getOutfitsWithAccessory = cache((accessoryId: string) =>
  client.fetch(OUTFITS_WITH_ACCESSORY_QUERY, { accessoryId }, OPTS('outfit'))
)
export const getTrend     = cache((slug: string) => client.fetch(TREND_QUERY,     { slug }, OPTS('trend')))
export const getPost      = cache((slug: string) => client.fetch(POST_QUERY,      { slug }, OPTS('post')))
