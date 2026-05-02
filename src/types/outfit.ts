import type { SanityImage } from './common'

export type OutfitStyle = 'casual' | 'formal' | 'streetwear' | 'elegant' | 'boho' | 'sporty' | 'vintage'
export type OutfitSeason = 'spring' | 'summer' | 'fall' | 'winter' | 'all-season'
export type OutfitOccasion = 'everyday' | 'work' | 'evening' | 'casual' | 'special' | 'outdoor'

export type OutfitPiece = {
  _key: string
  name: string
  description?: string
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
