// Tüm GROQ sorguları burada merkezi olarak tanımlanır.
// defineQuery ile tip güvenli sorgu nesneleri oluşturulur; her sorgu sadece
// ilgili bileşende ihtiyaç duyulan alanları seçer (over-fetch yok).
import { defineQuery } from 'next-sanity'

// Reusable LQIP projection — tüm image/heroImage alanlarında kullanılır
const IMG = `{ asset, hotspot, crop, "lqip": asset->metadata.lqip }`

// ── Outfit sorguları ──────────────────────────────────────────────────────────
// ALL_OUTFITS_RANKED_QUERY: Ranking sistemi için tüm outfitler — sadece skor alanları
export const ALL_OUTFITS_RANKED_QUERY = defineQuery(`
  *[_type == "outfit" && defined(slug.current)] | order(featured desc, _createdAt desc) {
    _id, title, "slug": slug.current, image ${IMG}, style, season, occasion, occasions, featured,
    pieces[]{ _key, name, image ${IMG}, colorTag }
  }
`)

// OUTFITS_QUERY: Tüm outfit listesi (kart grid'leri için)
export const OUTFITS_QUERY = defineQuery(`
  *[_type == "outfit" && defined(slug.current)] | order(_createdAt desc) {
    _id, title, "slug": slug.current, image ${IMG}, style, season, occasion, tags, featured
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


// OUTFITS_BY_PIECE_TAGS_QUERY: En az bir parça aynı tür + aynı renk eşleşmesi olan outfitler
// Kategoriler arasında OR mantığı — herhangi bir kategoride eşleşme yeterlid
// Boş array → o kategoride eşleşme olmaz (GROQ: value in [] = false)
export const OUTFITS_BY_PIECE_TAGS_QUERY = defineQuery(`
  *[_type == "outfit" && _id != $id && defined(slug.current) && (
    count(pieces[type in ["top","outerwear"] && colorTag in $topColors]) > 0 ||
    count(pieces[type in ["bottom","dress"] && colorTag in $bottomColors]) > 0 ||
    count(pieces[type == "shoes" && colorTag in $shoeColors]) > 0 ||
    count(pieces[type in ["bag","accessory","other"] && colorTag in $accessColors]) > 0
  )] | order(_createdAt desc) [0...8] {
    _id, title, "slug": slug.current,
    image { asset, hotspot, crop, "lqip": asset->metadata.lqip },
    style, occasion
  }
`)

// SIMILAR_PIECES_QUERY: Piece-level eşleşme — aynı renk + tür + itemTag'e sahip parçaları doğrudan getirir
// $topColors/$topItems: mevcut outfit'in top/outerwear parçalarından; diğer kategoriler benzer şekilde
// Boş array parametresi → o kategoride hiç eşleşme olmaz (GROQ: value in [] = false)
export const SIMILAR_PIECES_QUERY = defineQuery(`
  *[_type == "outfit" && _id != $id && defined(slug.current)]{
    "tops": pieces[type in ["top","outerwear"] && colorTag in $topColors && itemTag in $topItems]{
      _key, type, name, affiliateUrl, image{ asset, hotspot, crop, "lqip": asset->metadata.lqip }
    },
    "bottoms": pieces[type in ["bottom","dress"] && colorTag in $bottomColors && itemTag in $bottomItems]{
      _key, type, name, affiliateUrl, image{ asset, hotspot, crop, "lqip": asset->metadata.lqip }
    },
    "shoes": pieces[type == "shoes" && colorTag in $shoeColors && itemTag in $shoeItems]{
      _key, type, name, affiliateUrl, image{ asset, hotspot, crop, "lqip": asset->metadata.lqip }
    },
    "accessories": pieces[type in ["bag","accessory","other"] && colorTag in $accessColors && itemTag in $accessItems]{
      _key, type, name, affiliateUrl, image{ asset, hotspot, crop, "lqip": asset->metadata.lqip }
    }
  }[count(tops) + count(bottoms) + count(shoes) + count(accessories) > 0]
`)

// Kategori slug sayfalarının Sanity fetch'leri — stil/mevsim/durum filtrelemesi için
export const OUTFITS_BY_STYLE_QUERY = defineQuery(`
  *[_type == "outfit" && style == $style && defined(slug.current)] | order(_createdAt desc) {
    _id, title, "slug": slug.current, image ${IMG}, style, season, occasion, tags, featured,
    pieces[]{ _key, name, image ${IMG}, affiliateUrl }
  }
`)

export const OUTFITS_BY_SEASON_QUERY = defineQuery(`
  *[_type == "outfit" && season == $season && defined(slug.current)] | order(_createdAt desc) {
    _id, title, "slug": slug.current, image ${IMG}, style, season, occasion, tags, featured,
    pieces[]{ _key, name, image ${IMG}, affiliateUrl }
  }
`)

export const OUTFITS_BY_OCCASION_QUERY = defineQuery(`
  *[_type == "outfit" && occasion == $occasion && defined(slug.current)] | order(_createdAt desc) {
    _id, title, "slug": slug.current, image ${IMG}, style, season, occasion, tags, featured,
    pieces[]{ _key, name, image ${IMG}, affiliateUrl }
  }
`)

// OUTFITS_OCCASION_COUNTS_QUERY: StyleFinderWidget occasion sayımı için minimal veri
export const OUTFITS_OCCASION_COUNTS_QUERY = defineQuery(`
  *[_type == "outfit" && defined(slug.current)] {
    occasion, occasions
  }
`)

// Ana sayfadaki "Trending Outfits" bölümü için — sadece featured=true olanlar, max 6 adet
export const FEATURED_OUTFITS_QUERY = defineQuery(`
  *[_type == "outfit" && featured == true && defined(slug.current)] | order(_createdAt desc) [0...6] {
    _id, title, "slug": slug.current, image ${IMG}, style, season, occasion, tags
  }
`)

// OUTFITS_WITH_ACCESSORY_QUERY: Belirli bir aksesuar dökümanına referans veren outfitler
export const OUTFITS_WITH_ACCESSORY_QUERY = defineQuery(`
  *[_type == "outfit" && defined(slug.current) && $accessoryId in relatedAccessories[]._ref] | order(_createdAt desc) {
    _id, title, "slug": slug.current, image ${IMG}, style, occasion
  }
`)

// ── Accessory sorguları ───────────────────────────────────────────────────────
export const ACCESSORIES_QUERY = defineQuery(`
  *[_type == "accessory" && defined(slug.current)] | order(_createdAt desc) {
    _id, title, "slug": slug.current, image ${IMG}, type, occasion, pairingTip, tags, featured
  }
`)

export const ACCESSORY_QUERY = defineQuery(`
  *[_type == "accessory" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, description, image ${IMG}, type, occasion, pairingTip, tags, affiliateUrl
  }
`)

export const ACCESSORIES_BY_TYPE_QUERY = defineQuery(`
  *[_type == "accessory" && type == $type && defined(slug.current)] | order(_createdAt desc) {
    _id, title, "slug": slug.current, image ${IMG}, type, occasion, pairingTip, tags, featured
  }
`)

// ── Hairstyle sorguları ───────────────────────────────────────────────────────
export const HAIRSTYLES_QUERY = defineQuery(`
  *[_type == "hairstyle" && defined(slug.current)] | order(_createdAt desc) {
    _id, title, "slug": slug.current, image ${IMG}, type, length, occasion, mood, tags, featured
  }
`)

export const HAIRSTYLE_QUERY = defineQuery(`
  *[_type == "hairstyle" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, description, image ${IMG}, type, length, occasion, mood, tags
  }
`)

export const HAIRSTYLES_BY_TYPE_QUERY = defineQuery(`
  *[_type == "hairstyle" && type == $type && defined(slug.current)] | order(_createdAt desc) {
    _id, title, "slug": slug.current, image ${IMG}, type, length, occasion, mood, tags, featured
  }
`)

export const HAIRSTYLES_BY_OCCASION_QUERY = defineQuery(`
  *[_type == "hairstyle" && occasion == $occasion && defined(slug.current)] | order(_createdAt desc) {
    _id, title, "slug": slug.current, image ${IMG}, type, length, occasion, mood, tags, featured
  }
`)

// ── Trend sorguları ───────────────────────────────────────────────────────────
export const TRENDS_QUERY = defineQuery(`
  *[_type == "trend" && defined(slug.current)] | order(_createdAt desc) {
    _id, title, "slug": slug.current, image ${IMG}, season, category, keyItems, tags, featured
  }
`)

export const TREND_QUERY = defineQuery(`
  *[_type == "trend" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, description, image ${IMG}, season, category, keyItems, tags
  }
`)

export const FEATURED_TRENDS_QUERY = defineQuery(`
  *[_type == "trend" && featured == true && defined(slug.current)] | order(_createdAt desc) [0...4] {
    _id, title, "slug": slug.current, image ${IMG}, season, category, keyItems
  }
`)

// ── Blog post sorguları ───────────────────────────────────────────────────────
export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id, title, "slug": slug.current, excerpt, heroImage ${IMG}, category, publishedAt, tags
  }
`)

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, excerpt, heroImage ${IMG}, category, publishedAt, body, tags,
    relatedOutfits[]->{ _id, title, "slug": slug.current, image ${IMG}, style, occasion },
    relatedAccessories[]->{ _id, title, "slug": slug.current, image ${IMG}, type },
    relatedHairstyles[]->{ _id, title, "slug": slug.current, image ${IMG}, type, length }
  }
`)

export const POSTS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "post" && category == $category && defined(slug.current)] | order(publishedAt desc) {
    _id, title, "slug": slug.current, excerpt, heroImage ${IMG}, category, publishedAt, tags
  }
`)

export const FEATURED_POSTS_QUERY = defineQuery(`
  *[_type == "post" && featured == true && defined(slug.current)] | order(publishedAt desc) [0...6] {
    _id, title, "slug": slug.current, excerpt, heroImage ${IMG}, category, publishedAt, tags
  }
`)

export const LATEST_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...12] {
    _id, title, "slug": slug.current, excerpt, heroImage ${IMG}, category, publishedAt, tags
  }
`)

// ── Ana sayfa highlight sorguları — her bölüm için sınırlı sayıda en yeni içerik ──
export const HOME_OUTFITS_QUERY = defineQuery(`
  *[_type == "outfit" && defined(slug.current)] | order(_createdAt desc) [0...8] {
    _id, title, "slug": slug.current, image ${IMG}, style, season, occasion, tags, featured,
    pieces[]{ _key, name, image ${IMG}, affiliateUrl }
  }
`)

export const HOME_ACCESSORIES_QUERY = defineQuery(`
  *[_type == "accessory" && defined(slug.current)] | order(_createdAt desc) [0...12] {
    _id, title, "slug": slug.current, image ${IMG}, type, occasion, pairingTip, tags, featured
  }
`)

export const HOME_HAIRSTYLES_QUERY = defineQuery(`
  *[_type == "hairstyle" && defined(slug.current)] | order(_createdAt desc) [0...7] {
    _id, title, "slug": slug.current, image ${IMG}, type, length, mood, occasion, tags, featured
  }
`)

export const HOME_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...4] {
    _id, title, "slug": slug.current, excerpt, heroImage ${IMG}, category, publishedAt
  }
`)
