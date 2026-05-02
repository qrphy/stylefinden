import { defineQuery } from 'next-sanity'

// Outfits
export const OUTFITS_QUERY = defineQuery(`
  *[_type == "outfit" && defined(slug.current)] | order(_createdAt desc) {
    _id, title, "slug": slug.current, image, style, season, occasion, tags, featured
  }
`)

export const OUTFIT_QUERY = defineQuery(`
  *[_type == "outfit" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, description, image, style, season, occasion,
    pieces[]{ _key, type, name, description },
    tags, publishedAt
  }
`)

export const OUTFITS_BY_STYLE_QUERY = defineQuery(`
  *[_type == "outfit" && style == $style && defined(slug.current)] | order(_createdAt desc) {
    _id, title, "slug": slug.current, image, style, season, occasion, tags, featured
  }
`)

export const OUTFITS_BY_SEASON_QUERY = defineQuery(`
  *[_type == "outfit" && season == $season && defined(slug.current)] | order(_createdAt desc) {
    _id, title, "slug": slug.current, image, style, season, occasion, tags, featured
  }
`)

export const OUTFITS_BY_OCCASION_QUERY = defineQuery(`
  *[_type == "outfit" && occasion == $occasion && defined(slug.current)] | order(_createdAt desc) {
    _id, title, "slug": slug.current, image, style, season, occasion, tags, featured
  }
`)

export const FEATURED_OUTFITS_QUERY = defineQuery(`
  *[_type == "outfit" && featured == true && defined(slug.current)] | order(_createdAt desc) [0...6] {
    _id, title, "slug": slug.current, image, style, season, occasion, tags
  }
`)

// Accessories
export const ACCESSORIES_QUERY = defineQuery(`
  *[_type == "accessory" && defined(slug.current)] | order(_createdAt desc) {
    _id, title, "slug": slug.current, image, type, occasion, pairingTip, tags, featured
  }
`)

export const ACCESSORY_QUERY = defineQuery(`
  *[_type == "accessory" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, description, image, type, occasion, pairingTip, tags
  }
`)

export const ACCESSORIES_BY_TYPE_QUERY = defineQuery(`
  *[_type == "accessory" && type == $type && defined(slug.current)] | order(_createdAt desc) {
    _id, title, "slug": slug.current, image, type, occasion, pairingTip, tags, featured
  }
`)

// Hairstyles
export const HAIRSTYLES_QUERY = defineQuery(`
  *[_type == "hairstyle" && defined(slug.current)] | order(_createdAt desc) {
    _id, title, "slug": slug.current, image, type, length, occasion, mood, tags, featured
  }
`)

export const HAIRSTYLE_QUERY = defineQuery(`
  *[_type == "hairstyle" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, description, image, type, length, occasion, mood, tags
  }
`)

export const HAIRSTYLES_BY_TYPE_QUERY = defineQuery(`
  *[_type == "hairstyle" && type == $type && defined(slug.current)] | order(_createdAt desc) {
    _id, title, "slug": slug.current, image, type, length, occasion, mood, tags, featured
  }
`)

export const HAIRSTYLES_BY_OCCASION_QUERY = defineQuery(`
  *[_type == "hairstyle" && occasion == $occasion && defined(slug.current)] | order(_createdAt desc) {
    _id, title, "slug": slug.current, image, type, length, occasion, mood, tags, featured
  }
`)

// Trends
export const TRENDS_QUERY = defineQuery(`
  *[_type == "trend" && defined(slug.current)] | order(_createdAt desc) {
    _id, title, "slug": slug.current, image, season, category, keyItems, tags, featured
  }
`)

export const TREND_QUERY = defineQuery(`
  *[_type == "trend" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, description, image, season, category, keyItems, tags
  }
`)

export const FEATURED_TRENDS_QUERY = defineQuery(`
  *[_type == "trend" && featured == true && defined(slug.current)] | order(_createdAt desc) [0...4] {
    _id, title, "slug": slug.current, image, season, category, keyItems
  }
`)

// Blog posts
export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id, title, "slug": slug.current, excerpt, heroImage, category, publishedAt, tags
  }
`)

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, excerpt, heroImage, category, publishedAt, body, tags,
    relatedOutfits[]->{ _id, title, "slug": slug.current, image, style, occasion },
    relatedAccessories[]->{ _id, title, "slug": slug.current, image, type },
    relatedHairstyles[]->{ _id, title, "slug": slug.current, image, type, length }
  }
`)

export const POSTS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "post" && category == $category && defined(slug.current)] | order(publishedAt desc) {
    _id, title, "slug": slug.current, excerpt, heroImage, category, publishedAt, tags
  }
`)

export const HOME_OUTFITS_QUERY = defineQuery(`
  *[_type == "outfit" && defined(slug.current)] | order(_createdAt desc) [0...8] {
    _id, title, "slug": slug.current, image, style, season, occasion, tags, featured
  }
`)

export const HOME_ACCESSORIES_QUERY = defineQuery(`
  *[_type == "accessory" && defined(slug.current)] | order(_createdAt desc) [0...12] {
    _id, title, "slug": slug.current, image, type, occasion, pairingTip, tags, featured
  }
`)

export const HOME_HAIRSTYLES_QUERY = defineQuery(`
  *[_type == "hairstyle" && defined(slug.current)] | order(_createdAt desc) [0...7] {
    _id, title, "slug": slug.current, image, type, length, mood, occasion, tags, featured
  }
`)
