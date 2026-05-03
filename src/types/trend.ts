// Sanity'den çekilen trend verilerinin TypeScript tipleri.
// Değerler sanity/schemaTypes/trend.ts içindeki alan seçenekleriyle birebir eşleşmelidir.
import type { SanityImage } from './common'

export type TrendSeason = 'spring-summer' | 'fall-winter' | 'year-round'
export type TrendCategory = 'fashion' | 'accessories' | 'hairstyle' | 'beauty'

export type Trend = {
  _id: string
  _type: 'trend'
  title: string
  slug: string
  description?: string
  image?: SanityImage
  season?: TrendSeason
  category?: TrendCategory
  keyItems?: string[]
  tags?: string[]
  featured?: boolean
}
