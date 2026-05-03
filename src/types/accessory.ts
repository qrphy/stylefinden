// Sanity'den çekilen accessory verilerinin TypeScript tipleri.
// Değerler sanity/schemaTypes/accessory.ts içindeki alan seçenekleriyle birebir eşleşmelidir.
import type { SanityImage } from './common'

export type AccessoryType = 'bags' | 'jewelry' | 'shoes' | 'belts' | 'scarves' | 'hats' | 'sunglasses' | 'watches'
export type AccessoryOccasion = 'everyday' | 'work' | 'evening' | 'casual' | 'special'

export type Accessory = {
  _id: string
  _type: 'accessory'
  title: string
  slug: string
  description?: string
  image?: SanityImage
  type?: AccessoryType
  occasion?: AccessoryOccasion
  pairingTip?: string
  tags?: string[]
}
