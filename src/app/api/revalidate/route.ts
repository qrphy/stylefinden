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
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

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
  const category = body.category ? `Category: ${body.category}` : 'New style update'
  const previewText = `New blog post: ${title}`

  const resend = new Resend(apiKey)
  return resend.broadcasts.create({
    audienceId,
    from: fromEmail,
    subject: `New on Stylefinden: ${title}`,
    name: `post-${body._id ?? slug}-${Date.now()}`,
    previewText,
    html: `
      <h2>${title}</h2>
      <p>${category}</p>
      <p>A new article is live on Stylefinden.</p>
      <p><a href="${postUrl}">Read the post</a></p>
    `,
    text: `${title}\n${category}\nA new article is live on Stylefinden.\n${postUrl}`,
    send: true,
  })
}

export async function POST(req: Request) {
  const secret = req.headers.get('x-webhook-secret')

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
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

  return NextResponse.json({ revalidated: true, tag, mailStatus })
}
