import { NextResponse } from 'next/server'
import { syncFeed, type SyncResult } from '@/lib/awin'

// Vercel allows up to 300s on Hobby, 900s on Pro
export const maxDuration = 300

export async function GET(req: Request) {
  // Vercel Cron sends: Authorization: Bearer {CRON_SECRET}
  const secret = process.env.CRON_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'CRON_SECRET not configured' }, { status: 500 })
  }
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const apiKey = process.env.AWIN_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'AWIN_API_KEY not configured' }, { status: 500 })
  }

  const feedIds = (process.env.AWIN_FEED_IDS ?? '')
    .split(',')
    .map(f => f.trim())
    .filter(Boolean)

  if (!feedIds.length) {
    return NextResponse.json({ error: 'AWIN_FEED_IDS not configured' }, { status: 500 })
  }

  // Run feeds sequentially to avoid overwhelming DB connection pool
  const results: (SyncResult | { feedId: string; error: string })[] = []
  for (const feedId of feedIds) {
    try {
      results.push(await syncFeed(feedId, apiKey))
    } catch (err) {
      results.push({ feedId, error: String(err) })
    }
  }

  const totalUpserted = results.reduce((s, r) => s + ('upserted' in r ? r.upserted : 0), 0)
  const totalPriceChanges = results.reduce((s, r) => s + ('priceChanges' in r ? r.priceChanges : 0), 0)
  const allErrors = results.flatMap(r =>
    'errors' in r ? r.errors : [r.error]
  ).filter(Boolean)

  return NextResponse.json(
    {
      ok: allErrors.length === 0,
      summary: { totalUpserted, totalPriceChanges, errorCount: allErrors.length },
      feeds: results,
      timestamp: new Date().toISOString(),
    },
    { status: allErrors.length > 0 ? 207 : 200 }
  )
}
