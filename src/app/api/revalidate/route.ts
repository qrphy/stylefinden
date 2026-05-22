// Sanity webhook → on-demand revalidation.
// Sanity'de bir içerik publish/update edilince bu endpoint çağrılır,
// ilgili Next.js cache tag'i geçersiz kılınır ve sayfa anında taze veri çeker.
//
// Sanity Dashboard kurulumu:
//   API → Webhooks → Create webhook
//   URL:     https://stylefinden.com/api/revalidate
//   Trigger: create, update, publish, unpublish, delete
//   Header:  x-webhook-secret: <SANITY_WEBHOOK_SECRET değeri>
import { revalidateTag } from 'next/cache'
import { after } from 'next/server'
import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { Resend } from 'resend'
import { buildBlogNotificationEmail } from '@/lib/email-templates'
import { createAdminClient } from '@/lib/supabase'
import { apiVersion, dataset, projectId } from '@/sanity/env'

// CDN'siz client — webhook tetiklemesinden sonra taze veri çekmek için
const sanityServer = createClient({ projectId, dataset, apiVersion, useCdn: false })

// Sanity colorTag → Supabase color_family
const COLOR_MAP: Record<string, string> = {
  black: 'black', white: 'white', grey: 'neutral', beige: 'neutral',
  navy: 'blue', blue: 'blue', red: 'red', burgundy: 'red',
  pink: 'pink', purple: 'pink', orange: 'brown', yellow: 'neutral',
  green: 'green', khaki: 'neutral', brown: 'brown', multicolor: 'neutral',
}

type SanityOutfit = {
  _id: string
  slug: string
  style: string | null
  season: string | null
  occasion: string | null
  occasions?: string[]
  colorTags?: (string | null)[]
}

async function syncOutfitToSupabase(sanityId: string) {
  const outfit = await sanityServer.fetch<SanityOutfit | null>(
    `*[_type == "outfit" && _id == $id][0]{
      _id,
      "slug": slug.current,
      style,
      season,
      occasion,
      occasions,
      "colorTags": pieces[].colorTag
    }`,
    { id: sanityId }
  )

  if (!outfit?.slug) return

  const occasions = [...new Set(
    [outfit.occasion, ...(outfit.occasions ?? [])].filter(Boolean) as string[]
  )]

  const colorPalette = [...new Set(
    (outfit.colorTags ?? [])
      .map(t => t ? COLOR_MAP[t] : null)
      .filter(Boolean) as string[]
  )]

  await createAdminClient().from('outfits').upsert({
    sanity_id: outfit._id,
    slug: outfit.slug,
    style:         outfit.style   ? [outfit.style]   : [],
    season:        outfit.season  ? [outfit.season]  : [],
    occasion:      occasions,
    color_palette: colorPalette,
  }, { onConflict: 'sanity_id' })
}

const TAG_MAP: Record<string, string> = {
  outfit:    'outfit',
  hairstyle: 'hairstyle',
  accessory: 'accessory',
  post:      'post',
  trend:     'trend',
}

type WebhookBody = {
  _type?: string
  _id?: string
  title?: string
  category?: string
  slug?: { current?: string } | string
  transition?: string
  operation?: string
}

function getPostSlug(slug: WebhookBody['slug']) {
  if (!slug) return ''
  if (typeof slug === 'string') return slug
  return slug.current ?? ''
}

function shouldSendPostNotification(body: WebhookBody) {
  if (body._type !== 'post') return false
  if (!body.title || !getPostSlug(body.slug)) return false
  if (body.transition) return body.transition.includes('publish')
  if (body.operation) return body.operation === 'create' || body.operation === 'update'
  return true
}

async function sendPostNotification(body: WebhookBody) {
  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID
  const fromEmail = process.env.RESEND_FROM_EMAIL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://stylefinden.com'

  if (!apiKey || !audienceId || !fromEmail) return null

  const slug = getPostSlug(body.slug)
  const postUrl = `${siteUrl.replace(/\/$/, '')}/blog/${slug}`
  const title = body.title ?? 'New post'

  const { html, text, subject, previewText } = buildBlogNotificationEmail({
    title,
    postUrl,
    category: body.category,
  })

  const resend = new Resend(apiKey)
  return resend.broadcasts.create({
    audienceId,
    from: fromEmail,
    subject,
    name: `post-${body._id ?? slug}-${Date.now()}`,
    previewText,
    html,
    text,
    send: true,
  })
}

export async function POST(req: Request) {
  const secret = req.headers.get('x-webhook-secret')

  if (secret !== process.env.SANITY_WEBHOOK_SECRET?.trim()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: WebhookBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const tag = body._type ? TAG_MAP[body._type] : undefined

  if (!tag) {
    return NextResponse.json({ error: 'Unknown type' }, { status: 400 })
  }

  let mailStatus: 'sent' | 'skipped' | 'failed' = 'skipped'
  if (shouldSendPostNotification(body)) {
    try {
      const response = await sendPostNotification(body)
      mailStatus = response?.error ? 'failed' : 'sent'
    } catch (err) {
      mailStatus = 'failed'
      console.error('[revalidate] post mail notification error:', err)
    }
  }

  revalidateTag(tag, {})

  // Outfit publish → Supabase outfits tablosuna sync (yanıtı bloklamaz)
  if (body._type === 'outfit' && body._id) {
    const cleanId = body._id.replace(/^drafts\./, '')
    after(async () => {
      try {
        await syncOutfitToSupabase(cleanId)
      } catch (err) {
        console.error('[revalidate] outfit supabase sync error:', err)
      }
    })
  }

  return NextResponse.json({ revalidated: true, tag, mailStatus })
}
