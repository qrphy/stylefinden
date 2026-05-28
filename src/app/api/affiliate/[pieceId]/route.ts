import { createHash } from 'crypto'
import { NextResponse } from 'next/server'
import { getSupabase, createAdminClient } from '@/lib/supabase'

function hashIp(ip: string): string {
  return createHash('sha256')
    .update(ip + (process.env.IP_HASH_SALT ?? 'stylefinden'))
    .digest('hex')
    .slice(0, 16)
}

function getIp(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('cf-connecting-ip') ??
    'unknown'
  )
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ pieceId: string }> }
) {
  // Skip DB insert on browser prefetch — only record real user clicks
  const isPrefetch =
    req.headers.get('sec-purpose') === 'prefetch' ||
    req.headers.get('purpose') === 'prefetch'

  const { pieceId } = await params
  const { searchParams } = new URL(req.url)
  const outfitSanityId = searchParams.get('outfit')

  const fallbackUrl = searchParams.get('url')

  // Piece'i Supabase'den al (Awin feed sync aktif olduğunda dolar)
  const { data: piece } = await getSupabase()
    .from('pieces')
    .select('id, affiliate_url')
    .eq('id', pieceId)
    .eq('active', true)
    .single()

  if (!piece) {
    // Supabase'de henüz yoksa fallback URL'e yönlendir
    if (!fallbackUrl) return NextResponse.redirect(new URL('/', req.url), { status: 302 })
    return NextResponse.redirect(fallbackUrl, { status: 302 })
  }

  // Outfit UUID'si (opsiyonel — tıklama context'i için)
  let outfitId: string | null = null
  if (outfitSanityId) {
    const { data: outfit } = await getSupabase()
      .from('outfits')
      .select('id')
      .eq('sanity_id', outfitSanityId)
      .single()
    outfitId = outfit?.id ?? null
  }

  // Tıklamayı kaydet (admin client — server-only)
  const clickref = outfitSanityId
    ? `outfit_${outfitSanityId}__piece_${piece.id}`
    : `piece_${piece.id}`

  if (!isPrefetch) {
    try {
      await createAdminClient().from('affiliate_clicks').insert({
        piece_id: piece.id,
        outfit_id: outfitId,
        awin_clickref: clickref,
        ip_hash: hashIp(getIp(req)),
        user_agent: req.headers.get('user-agent')?.slice(0, 500) ?? null,
        referrer: req.headers.get('referer')?.slice(0, 500) ?? null,
      })
    } catch {
      // Tıklama kaydı başarısız olsa da redirect devam eder
    }
  }

  return NextResponse.redirect(piece.affiliate_url, { status: 302 })
}
