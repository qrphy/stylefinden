import { generateText, Output, gateway } from 'ai'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, getClientIp, rateLimitHeaders } from '@/lib/rate-limit'

const LIMIT = 10
const WINDOW_MS = 60_000

const RequestSchema = z.object({
  title: z.string().min(1).max(200),
  type: z.string().optional(),
  occasion: z.string().optional(),
  extraContext: z.string().max(500).optional(),
})

const OutputSchema = z.object({
  description: z.string().min(10).max(400),
  pairingTip: z.string().min(10).max(300),
  tags: z.array(z.string().min(1)).min(3).max(10),
})

export async function POST(req: Request) {
  const ip = getClientIp(req)
  const { allowed, remaining, resetAt } = rateLimit(`generate-accessory:${ip}`, { limit: LIMIT, windowMs: WINDOW_MS })

  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait before generating again.' },
      {
        status: 429,
        headers: {
          ...rateLimitHeaders(0, resetAt, LIMIT),
          'Retry-After': String(Math.ceil((resetAt - Date.now()) / 1000)),
        },
      }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = RequestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { title, type, occasion, extraContext } = parsed.data

  const details = [
    type && `Type: ${type}`,
    occasion && `Occasion: ${occasion}`,
    extraContext && `Extra context: ${extraContext}`,
  ]
    .filter(Boolean)
    .join('\n')

  try {
    const result = await generateText({
      model: gateway('anthropic/claude-sonnet-4.6'),
      output: Output.object({ schema: OutputSchema }),
      system: `You are a concise accessories and style content writer for Stylefinden.
Rules: No slang, no filler phrases, no Gen-Z expressions. American English. Warm but grounded tone.
Descriptions under 3 sentences. Pairing tips must be specific and actionable. Tags must be lowercase.`,
      prompt: `Write a description, pairing tip, and tags for this accessory:
Title: ${title}
${details}

description: 1-3 sentences describing the accessory and its appeal
pairingTip: 1-2 sentences with specific outfit pairing advice
tags: 3-10 relevant lowercase tags for search and filtering`,
      providerOptions: {
        gateway: {
          user: ip,
          tags: ['feature:generate-accessory'],
        },
      },
    })

    return NextResponse.json(result.output, {
      headers: rateLimitHeaders(remaining, resetAt, LIMIT),
    })
  } catch (err) {
    console.error('[generate-accessory]', err)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
