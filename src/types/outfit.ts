// Sanity'den çekilen outfit verilerinin TypeScript tipleri.
// Değerler sanity/schemaTypes/outfit.ts içindeki alan seçenekleriyle birebir eşleşmelidir.
import type { SanityImage } from './common'

export type OutfitStyle = 'casual' | 'formal' | 'streetwear' | 'elegant' | 'boho' | 'sporty' | 'vintage'
export type OutfitSeason = 'spring' | 'summer' | 'fall' | 'winter' | 'all-season'
export type OutfitOccasion = 'everyday' | 'work' | 'evening' | 'casual' | 'special' | 'outdoor'

export type OutfitPieceColorTag =
  | 'black' | 'white' | 'grey' | 'beige' | 'navy' | 'blue' | 'red'
  | 'burgundy' | 'pink' | 'orange' | 'yellow' | 'green' | 'khaki'
  | 'brown' | 'purple' | 'multicolor'

export type OutfitPieceItemTag =
  | 'tshirt' | 'shirt' | 'blouse' | 'knitwear' | 'sweatshirt'
  | 'jeans' | 'trousers' | 'shorts' | 'skirt' | 'dress' | 'jumpsuit'
  | 'blazer' | 'coat' | 'leather-jacket' | 'jacket'
  | 'sneakers' | 'boots' | 'heels' | 'sandals' | 'loafers'
  | 'bag' | 'hat' | 'scarf' | 'belt' | 'sunglasses' | 'jewelry'

// Bir kombin içindeki her bir parçayı (üst, alt, ayakkabı vb.) temsil eder.
export type OutfitPiece = {
  _key: string
  type?: string
  name: string
  colorTag?: OutfitPieceColorTag
  itemTag?: OutfitPieceItemTag
  description?: string
  image?: object
  affiliateUrl?: string
}

export type Outfit = {
  _id: string
  _type: 'outfit'
  title: string
  slug: string
  description?: string
  image?: SanityImage
  style?: OutfitStyle
  season?: OutfitSeason
  occasion?: OutfitOccasion
  pieces?: OutfitPiece[]
  tags?: string[]
  featured?: boolean
}
