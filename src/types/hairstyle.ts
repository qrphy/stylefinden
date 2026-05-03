// Sanity'den çekilen hairstyle verilerinin TypeScript tipleri.
// Değerler sanity/schemaTypes/hairstyle.ts içindeki alan seçenekleriyle birebir eşleşmelidir.
import type { SanityImage } from './common'

export type HairType = 'straight' | 'wavy' | 'curly' | 'coily'
export type HairLength = 'short' | 'medium' | 'long'
export type HairstyleOccasion = 'everyday' | 'work' | 'evening' | 'special' | 'bridal'
export type HairstyleMood = 'casual' | 'formal' | 'editorial' | 'romantic'

export type Hairstyle = {
  _id: string
  _type: 'hairstyle'
  title: string
  slug: string
  description?: string
  image?: SanityImage
  type?: HairType
  length?: HairLength
  occasion?: HairstyleOccasion
  mood?: HairstyleMood
  tags?: string[]
}
