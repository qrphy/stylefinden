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

const TAG_MAP: Record<string, string> = {
  outfit:    'outfit',
  hairstyle: 'hairstyle',
  accessory: 'accessory',
  post:      'post',
  trend:     'trend',
}

export async function POST(req: Request) {
  const secret = req.headers.get('x-webhook-secret')

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { _type?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const tag = body._type ? TAG_MAP[body._type] : undefined

  if (!tag) {
    return NextResponse.json({ error: 'Unknown type' }, { status: 400 })
  }

  revalidateTag(tag, {})

  return NextResponse.json({ revalidated: true, tag })
}
