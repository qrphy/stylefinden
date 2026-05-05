import { anthropic } from '@ai-sdk/anthropic'
import { generateText, Output } from 'ai'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, getClientIp, rateLimitHeaders } from '@/lib/rate-limit'

const LIMIT = 10
const WINDOW_MS = 60_000

const RequestSchema = z.object({
  title: z.string().min(1).max(200),
  type: z.string().optional(),
  length: z.string().optional(),
  occasion: z.string().optional(),
  mood: z.string().optional(),
  extraContext: z.string().max(500).optional(),
})

const OutputSchema = z.object({
  description: z.string().min(10).max(400),
  tags: z.array(z.string().min(1)).min(3).max(10),
})

export async function POST(req: Request) {
  const ip = getClientIp(req)
  const { allowed, remaining, resetAt } = rateLimit(`generate-hairstyle:${ip}`, { limit: LIMIT, windowMs: WINDOW_MS })

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

  const { title, type, length, occasion, mood, extraContext } = parsed.data

  const details = [
    type && `Type: ${type}`,
    length && `Length: ${length}`,
    occasion && `Occasion: ${occasion}`,
    mood && `Mood: ${mood}`,
    extraContext && `Extra context: ${extraContext}`,
  ]
    .filter(Boolean)
    .join('\n')

  try {
    const result = await generateText({
      model: anthropic('claude-sonnet-4-6'),
      output: Output.object({ schema: OutputSchema }),
      system: `You are a concise hair and beauty content writer for Stylefinden.
Rules: No slang, no filler phrases, no Gen-Z expressions. American English. Warm but grounded tone.
Keep descriptions under 3 sentences. Tags must be lowercase single words or short hyphenated phrases.`,
      prompt: `Write a description and tags for this hairstyle:
Title: ${title}
${details}

description: 1-3 sentences describing the hairstyle, who it suits, and key styling notes
tags: 3-10 relevant lowercase tags for search and filtering`,
    })

    return NextResponse.json(result.output, {
      headers: rateLimitHeaders(remaining, resetAt, LIMIT),
    })
  } catch (err) {
    console.error('[generate-hairstyle]', err)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
