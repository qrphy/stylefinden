import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

const BodySchema = z.object({
  email: z.string().email(),
})

const LIMIT = 5
const WINDOW_MS = 10 * 60_000

export async function POST(req: Request) {
  const ip = getClientIp(req)
  const { allowed } = rateLimit(`subscribe:${ip}`, { limit: LIMIT, windowMs: WINDOW_MS })

  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const parsed = BodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID!

  try {
    await resend.contacts.create({
      email: parsed.data.email,
      audienceId: AUDIENCE_ID,
      unsubscribed: false,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[subscribe] Resend error:', err)
    return NextResponse.json({ error: 'Subscription failed. Please try again.' }, { status: 500 })
  }
}
