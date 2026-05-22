import { createAdminClient } from './supabase'

// ── Category mapping ────────────────────────────────────────────────
const CATEGORY_PATTERNS: [RegExp, string][] = [
  [/dress/i, 'dress'],
  [/shirt|blouse|top|tee|t-shirt|sweater|jumper|knitwear|cardigan|hoodie|vest/i, 'top'],
  [/trouser|jean|denim|skirt|short|pant|legging|chino/i, 'bottom'],
  [/shoe|boot|heel|sneaker|flat|sandal|loafer|pump|trainer|mule|stiletto/i, 'shoes'],
  [/bag|handbag|purse|clutch|tote|backpack|satchel|crossbody|wallet/i, 'bag'],
  [/coat|jacket|blazer|outerwear|parka|trench|anorak|bomber/i, 'outerwear'],
  [/jewel|necklace|bracelet|ring|earring|pendant|chain|bangle/i, 'jewelry'],
]

export function deriveCategory(categoryName: string, productName: string): string {
  const text = `${categoryName} ${productName}`.toLowerCase()
  for (const [pattern, cat] of CATEGORY_PATTERNS) {
    if (pattern.test(text)) return cat
  }
  return 'accessory'
}

// ── Color family mapping ────────────────────────────────────────────
const COLOR_PATTERNS: [RegExp, string][] = [
  [/black/i, 'black'],
  [/white|cream|ivory|off.white|ecru/i, 'white'],
  [/blue|navy|denim|cobalt|teal|turquoise|indigo/i, 'blue'],
  [/red|burgundy|wine|cherry|crimson|scarlet/i, 'red'],
  [/green|olive|emerald|sage|forest|hunter|mint/i, 'green'],
  [/pink|rose|blush|lilac|purple|mauve|lavender|violet|fuchsia|magenta/i, 'pink'],
  [/brown|chocolate|mocha|cognac|rust|orange|camel|tan|copper|bronze/i, 'brown'],
]

export function deriveColorFamily(color: string): string {
  for (const [pattern, family] of COLOR_PATTERNS) {
    if (pattern.test(color)) return family
  }
  return 'neutral'
}

// ── CSV parser ──────────────────────────────────────────────────────
function parseCsvLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false
  for (const char of line) {
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }
  result.push(current)
  return result
}

function parseCsv(text: string): Record<string, string>[] {
  const lines = text.split('\n').filter(l => l.trim())
  if (lines.length < 2) return []
  const headers = parseCsvLine(lines[0]).map(h =>
    h.toLowerCase().trim().replace(/^"|"$/g, '').replace(/\s+/g, '_')
  )
  return lines.slice(1).map(line => {
    const values = parseCsvLine(line)
    return Object.fromEntries(
      headers.map((h, i) => [h, (values[i] ?? '').replace(/^"|"$/g, '').trim()])
    )
  })
}

// ── Types ───────────────────────────────────────────────────────────
export type SyncResult = {
  feedId: string
  upserted: number
  priceChanges: number
  errors: string[]
}

// ── Feed sync ───────────────────────────────────────────────────────
const AWIN_COLUMNS = [
  'aw_product_id', 'product_name', 'merchant_id', 'merchant_name',
  'category_name', 'search_price', 'currency', 'aw_deep_link',
  'product_image_url', 'brand_name', 'colour',
].join(',')

const BATCH_SIZE = 100

export async function syncFeed(feedId: string, apiKey: string): Promise<SyncResult> {
  const result: SyncResult = { feedId, upserted: 0, priceChanges: 0, errors: [] }

  // 1. Download Awin product feed
  const url = [
    `https://productdata.awin.com/datafeed/download/apikey/${apiKey}`,
    `language/en/fid/${feedId}`,
    `columns/${AWIN_COLUMNS}`,
    'format/csv/delimiter/%2C/',
  ].join('/')

  let text: string
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(240_000) })
    if (!res.ok) {
      const body = await res.text().then(t => t.slice(0, 300))
      result.errors.push(`HTTP ${res.status}: ${body}`)
      return result
    }
    text = await res.text()
  } catch (err) {
    result.errors.push(String(err))
    return result
  }

  // 2. Parse + validate
  const rows = parseCsv(text).filter(
    r => r.aw_product_id && r.aw_deep_link && r.product_name
  )
  if (!rows.length) {
    result.errors.push('Feed is empty or could not be parsed')
    return result
  }

  const supabase = createAdminClient()

  // 3. Process in batches
  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE)
    const productIds = batch.map(r => r.aw_product_id)

    // Fetch existing pieces to detect price changes
    const { data: existing } = await supabase
      .from('pieces')
      .select('id, awin_product_id, price')
      .in('awin_product_id', productIds)

    const existingMap = new Map(existing?.map(p => [p.awin_product_id, p]) ?? [])

    // Build upsert payload (excludes price_range — it's a generated column)
    const pieces = batch.map(r => ({
      awin_product_id: r.aw_product_id,
      awin_merchant_id: r.merchant_id || null,
      title: r.product_name,
      brand: r.brand_name || null,
      merchant_name: r.merchant_name || null,
      category: deriveCategory(r.category_name ?? '', r.product_name ?? ''),
      subcategory: r.category_name || null,
      color: r.colour || null,
      color_family: deriveColorFamily(r.colour ?? ''),
      tags: [] as string[],
      price: r.search_price ? parseFloat(r.search_price) || null : null,
      currency: r.currency || 'GBP',
      affiliate_url: r.aw_deep_link,
      image_url: r.product_image_url || null,
      active: true,
      feed_updated_at: new Date().toISOString(),
    }))

    const { error: upsertError } = await supabase
      .from('pieces')
      .upsert(pieces, { onConflict: 'awin_product_id', ignoreDuplicates: false })

    if (upsertError) {
      result.errors.push(`Batch ${Math.floor(i / BATCH_SIZE)}: ${upsertError.message}`)
      continue
    }

    result.upserted += pieces.length

    // Fetch updated IDs for price_history inserts
    const { data: upserted } = await supabase
      .from('pieces')
      .select('id, awin_product_id, price')
      .in('awin_product_id', productIds)

    const upsertedMap = new Map(upserted?.map(p => [p.awin_product_id, p]) ?? [])

    const priceRows = batch
      .filter(r => {
        const before = existingMap.get(r.aw_product_id)
        const after = upsertedMap.get(r.aw_product_id)
        return before && after && String(before.price) !== String(after.price)
      })
      .map(r => {
        const piece = upsertedMap.get(r.aw_product_id)!
        return {
          piece_id: piece.id,
          price: piece.price ?? 0,
          currency: r.currency || 'GBP',
          available: true,
        }
      })

    if (priceRows.length) {
      await supabase.from('price_history').insert(priceRows)
      result.priceChanges += priceRows.length
    }
  }

  return result
}
