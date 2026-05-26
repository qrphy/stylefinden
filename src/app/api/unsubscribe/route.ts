import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://stylefinden.com'

export async function GET(req: Request) {
  // Skip side effect on browser prefetch — only process real user clicks
  const isPrefetch =
    req.headers.get('sec-purpose') === 'prefetch' ||
    req.headers.get('purpose') === 'prefetch'
  if (isPrefetch) return NextResponse.redirect(new URL('/', SITE_URL))

  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')

  if (!email || !email.includes('@')) {
    return NextResponse.redirect(new URL('/', SITE_URL))
  }

  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID

  if (apiKey && audienceId) {
    const resend = new Resend(apiKey)
    try {
      await resend.contacts.create({
        email,
        audienceId,
        unsubscribed: true,
      })
    } catch (err) {
      console.error('[unsubscribe] error:', err)
    }
  }

  return NextResponse.redirect(new URL('/unsubscribed', SITE_URL))
}
