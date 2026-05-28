import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Lazy singleton — module import sırasında değil, ilk çağrıda oluşur
// Build sırasında env var eksikse throw atmasını önler
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _supabase: SupabaseClient<any> | null = null

export function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
  }
  return _supabase
}

// Server-only admin client (RLS bypass — sadece API route'larda kullan)
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )
}

// ─── Types ───────────────────────────────────────────────────

export type Piece = {
  id: string
  title: string
  brand: string | null
  merchant_name: string | null
  awin_product_id: string | null
  awin_merchant_id: string | null
  category: string
  subcategory: string | null
  color: string | null
  color_family: string
  tags: string[]
  price: number | null
  price_range: 'budget' | 'mid' | 'luxury' | null
  currency: string
  affiliate_url: string
  image_url: string | null
  active: boolean
  feed_updated_at: string | null
  created_at: string
  updated_at: string
}

export type Outfit = {
  id: string
  sanity_id: string
  slug: string
  style: string[]
  season: string[]
  occasion: string[]
  color_palette: string[]
  created_at: string
  updated_at: string
}

export type OutfitPiece = {
  id: string
  outfit_id: string
  piece_id: string
  position: number
  is_hero: boolean
}

export type PriceHistory = {
  id: string
  piece_id: string
  price: number
  currency: string
  available: boolean
  scraped_at: string
}
