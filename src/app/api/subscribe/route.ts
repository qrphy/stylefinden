import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, getClientIp } from '@/lib/rate-limit'
import { buildWelcomeEmail } from '@/lib/email-templates'

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

  const FROM_EMAIL = process.env.RESEND_FROM_EMAIL

  try {
    await resend.contacts.create({
      email: parsed.data.email,
      audienceId: AUDIENCE_ID,
      unsubscribed: false,
    })

    if (FROM_EMAIL) {
      const { html, text } = buildWelcomeEmail(parsed.data.email)
      await resend.emails.send({
        from: FROM_EMAIL,
        to: parsed.data.email,
        subject: 'Welcome to Stylefinden ✦',
        html,
        text,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[subscribe] Resend error:', err)
    return NextResponse.json({ error: 'Subscription failed. Please try again.' }, { status: 500 })
  }
}
