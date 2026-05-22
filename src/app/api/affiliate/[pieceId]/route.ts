import { createHash } from 'crypto'
import { NextResponse } from 'next/server'
import { supabase, createAdminClient } from '@/lib/supabase'

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
  const { pieceId } = await params
  const { searchParams } = new URL(req.url)
  const outfitSanityId = searchParams.get('outfit')

  // Piece'i Supabase'den al
  const { data: piece } = await supabase
    .from('pieces')
    .select('id, affiliate_url')
    .eq('id', pieceId)
    .eq('active', true)
    .single()

  if (!piece) {
    return NextResponse.redirect(new URL('/', req.url), { status: 302 })
  }

  // Outfit UUID'si (opsiyonel — tıklama context'i için)
  let outfitId: string | null = null
  if (outfitSanityId) {
    const { data: outfit } = await supabase
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

  return NextResponse.redirect(piece.affiliate_url, { status: 302 })
}
