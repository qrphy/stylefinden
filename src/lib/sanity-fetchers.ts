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

export const getOutfit = cache((slug: string) => client.fetch(OUTFIT_QUERY, { slug }, OPTS('outfit')))

type PieceForSimilarity = { type?: string; colorTag?: string; itemTag?: string }

const byTypes = (pieces: PieceForSimilarity[], types: string[]) =>
  pieces.filter(p => types.includes(p.type ?? ""))
const uniqueColors = (ps: PieceForSimilarity[]) =>
  [...new Set(ps.map(p => p.colorTag).filter((c): c is string => Boolean(c)))]

export const getOutfitsByPieceTags = cache((id: string, pieces: PieceForSimilarity[]) =>
  client.fetch(OUTFITS_BY_PIECE_TAGS_QUERY, {
    id,
    topColors:    uniqueColors(byTypes(pieces, ["top", "outerwear"])),
    bottomColors: uniqueColors(byTypes(pieces, ["bottom", "dress"])),
    shoeColors:   uniqueColors(byTypes(pieces, ["shoes"])),
    accessColors: uniqueColors(byTypes(pieces, ["bag", "accessory", "other"])),
  }, OPTS('outfit'))
)

const uniqueItems = (ps: PieceForSimilarity[]) =>
  [...new Set(ps.map(p => p.itemTag).filter((i): i is string => Boolean(i)))]

export const getSimilarPieces = cache((id: string, pieces: PieceForSimilarity[]) => {
  const tops    = byTypes(pieces, ["top", "outerwear"])
  const bottoms = byTypes(pieces, ["bottom", "dress"])
  const shoes   = byTypes(pieces, ["shoes"])
  const access  = byTypes(pieces, ["bag", "accessory", "other"])

  return client.fetch(SIMILAR_PIECES_QUERY, {
    id,
    topColors:    uniqueColors(tops),    topItems:    uniqueItems(tops),
    bottomColors: uniqueColors(bottoms), bottomItems: uniqueItems(bottoms),
    shoeColors:   uniqueColors(shoes),   shoeItems:   uniqueItems(shoes),
    accessColors: uniqueColors(access),  accessItems: uniqueItems(access),
  }, OPTS('outfit'))
})
export const getHairstyle = cache((slug: string) => client.fetch(HAIRSTYLE_QUERY, { slug }, OPTS('hairstyle')))
export const getAccessory = cache((slug: string) => client.fetch(ACCESSORY_QUERY, { slug }, OPTS('accessory')))
export const getOutfitsWithAccessory = cache((accessoryId: string) =>
  client.fetch(OUTFITS_WITH_ACCESSORY_QUERY, { accessoryId }, OPTS('outfit'))
)
export const getTrend     = cache((slug: string) => client.fetch(TREND_QUERY,     { slug }, OPTS('trend')))
export const getPost      = cache((slug: string) => client.fetch(POST_QUERY,      { slug }, OPTS('post')))
