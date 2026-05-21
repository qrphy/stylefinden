// Tüm GROQ sorguları burada merkezi olarak tanımlanır.
// defineQuery ile tip güvenli sorgu nesneleri oluşturulur; her sorgu sadece
// ilgili bileşende ihtiyaç duyulan alanları seçer (over-fetch yok).
import { defineQuery } from 'next-sanity'

// ── Outfit sorguları ──────────────────────────────────────────────────────────
// ALL_OUTFITS_RANKED_QUERY: Ranking sistemi için tüm outfitler — sadece skor alanları
export const ALL_OUTFITS_RANKED_QUERY = defineQuery(`
  *[_type == "outfit" && defined(slug.current)] | order(featured desc, _createdAt desc) {
    _id, title, "slug": slug.current, image, style, season, occasion, featured
  }
`)

// OUTFITS_QUERY: Tüm outfit listesi (kart grid'leri için)
export const OUTFITS_QUERY = defineQuery(`
  *[_type == "outfit" && defined(slug.current)] | order(_createdAt desc) {
    _id, title, "slug": slug.current, image, style, season, occasion, tags, featured
  }
`)

// OUTFIT_QUERY: Tek bir outfit detay sayfası için — pieces dahil tam veri
export const OUTFIT_QUERY = defineQuery(`
  *[_type == "outfit" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, description,
    image { asset, hotspot, crop, "lqip": asset->metadata.lqip },
    style, season, occasion,
    pieces[]{ _key, type, name, colorTag, itemTag, description,
      image { asset, hotspot, crop, "lqip": asset->metadata.lqip },
      affiliateUrl },
    tags, publishedAt
  }
`)

// SIMILAR_OUTFITS_QUERY: Aynı stil veya durum ile eşleşen benzer outfitler (mevcut outfit hariç)
export const SIMILAR_OUTFITS_QUERY = defineQuery(`
  *[_type == "outfit" && defined(slug.current) && _id != $id && (style == $style || occasion == $occasion)] | order(_createdAt desc) [0...4] {
    _id, title, "slug": slug.current, image, style, occasion
  }
`)

// OUTFITS_BY_PIECE_TAGS_QUERY: Aynı renk veya öğe kategorisine sahip parçası olan outfitler
// $colors: string[] — mevcut outfit parçalarının colorTag'leri
// $items: string[]  — mevcut outfit parçalarının itemTag'leri
export const OUTFITS_BY_PIECE_TAGS_QUERY = defineQuery(`
  *[
    _type == "outfit" &&
    defined(slug.current) &&
    _id != $id &&
    count(pieces[defined(colorTag) && colorTag in $colors]) + count(pieces[defined(itemTag) && itemTag in $items]) > 0
  ] | order(_createdAt desc) [0...8] {
    _id, title, "slug": slug.current,
    image { asset, hotspot, crop, "lqip": asset->metadata.lqip },
    style, occasion,
    "matchedPieces": pieces[colorTag in $colors || itemTag in $items]{ name, colorTag, itemTag },
    pieces[]{ _key, name, image { asset, hotspot, crop, "lqip": asset->metadata.lqip }, affiliateUrl }
  }
`)

// Kategori slug sayfalarının Sanity fetch'leri — stil/mevsim/durum filtrelemesi için
export const OUTFITS_BY_STYLE_QUERY = defineQuery(`
  *[_type == "outfit" && style == $style && defined(slug.current)] | order(_createdAt desc) {
    _id, title, "slug": slug.current, image, style, season, occasion, tags, featured,
    pieces[]{ _key, name, image, affiliateUrl }
  }
`)

export const OUTFITS_BY_SEASON_QUERY = defineQuery(`
  *[_type == "outfit" && season == $season && defined(slug.current)] | order(_createdAt desc) {
    _id, title, "slug": slug.current, image, style, season, occasion, tags, featured,
    pieces[]{ _key, name, image, affiliateUrl }
  }
`)

export const OUTFITS_BY_OCCASION_QUERY = defineQuery(`
  *[_type == "outfit" && occasion == $occasion && defined(slug.current)] | order(_createdAt desc) {
    _id, title, "slug": slug.current, image, style, season, occasion, tags, featured,
    pieces[]{ _key, name, image, affiliateUrl }
  }
`)

// Ana sayfadaki "Trending Outfits" bölümü için — sadece featured=true olanlar, max 6 adet
export const FEATURED_OUTFITS_QUERY = defineQuery(`
  *[_type == "outfit" && featured == true && defined(slug.current)] | order(_createdAt desc) [0...6] {
    _id, title, "slug": slug.current, image, style, season, occasion, tags
  }
`)

// OUTFITS_WITH_ACCESSORY_QUERY: Belirli bir aksesuar dökümanına referans veren outfitler
export const OUTFITS_WITH_ACCESSORY_QUERY = defineQuery(`
  *[_type == "outfit" && defined(slug.current) && $accessoryId in relatedAccessories[]._ref] | order(_createdAt desc) {
    _id, title, "slug": slug.current, image, style, occasion
  }
`)

// ── Accessory sorguları ───────────────────────────────────────────────────────
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

// ── Hairstyle sorguları ───────────────────────────────────────────────────────
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

// ── Trend sorguları ───────────────────────────────────────────────────────────
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

// ── Blog post sorguları ───────────────────────────────────────────────────────
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

export const FEATURED_POSTS_QUERY = defineQuery(`
  *[_type == "post" && featured == true && defined(slug.current)] | order(publishedAt desc) [0...6] {
    _id, title, "slug": slug.current, excerpt, heroImage, category, publishedAt, tags
  }
`)

export const LATEST_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...12] {
    _id, title, "slug": slug.current, excerpt, heroImage, category, publishedAt, tags
  }
`)

// ── Ana sayfa highlight sorguları — her bölüm için sınırlı sayıda en yeni içerik ──
export const HOME_OUTFITS_QUERY = defineQuery(`
  *[_type == "outfit" && defined(slug.current)] | order(_createdAt desc) [0...8] {
    _id, title, "slug": slug.current, image, style, season, occasion, tags, featured,
    pieces[]{ _key, name, image, affiliateUrl }
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

export const HOME_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...4] {
    _id, title, "slug": slug.current, excerpt, heroImage, category, publishedAt
  }
`)
