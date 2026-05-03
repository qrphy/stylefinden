// Sanity'den çekilen blog post verilerinin TypeScript tipleri.
// relatedOutfits/Accessories/Hairstyles, post detay sayfasının alt bölümündeki ilgili içerik grid'lerine beslenir.
import type { PortableTextBlock } from '@portabletext/react'
import type { SanityImage } from './common'
import type { Accessory } from './accessory'
import type { Hairstyle } from './hairstyle'
import type { Outfit } from './outfit'

// Sanity post şemasındaki category alan seçenekleriyle birebir eşleşmelidir.
export type BlogCategory =
  | 'accessories-guides'
  | 'hairstyle-guides'
  | 'occasion-guides'
  | 'seasonal-guides'
  | 'trend-reports'

export type BlogPost = {
  _id: string
  _type: 'post'
  title: string
  slug: string
  excerpt?: string
  heroImage?: SanityImage
  category: BlogCategory
  publishedAt?: string
  body?: PortableTextBlock[]
  tags?: string[]
  relatedOutfits?: Pick<Outfit, '_id' | 'title' | 'slug' | 'image' | 'style' | 'occasion'>[]
  relatedAccessories?: Pick<Accessory, '_id' | 'title' | 'slug' | 'image' | 'type'>[]
  relatedHairstyles?: Pick<Hairstyle, '_id' | 'title' | 'slug' | 'image' | 'type' | 'length'>[]
}
