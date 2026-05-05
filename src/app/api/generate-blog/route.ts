import { anthropic } from '@ai-sdk/anthropic'
import { generateText, Output } from 'ai'
import { NextResponse } from 'next/server'
import { BLOG_SYSTEM_PROMPT, buildBlogUserPrompt } from '@/lib/ai/blog-prompt'
import { BlogAIOutputSchema, BlogGenerationRequestSchema } from '@/lib/ai/types'
import { aiOutputToPortableText } from '@/lib/ai/portable-text'
import { rateLimit, getClientIp, rateLimitHeaders } from '@/lib/rate-limit'

const LIMIT = 5
const WINDOW_MS = 60_000

export async function POST(req: Request) {
  const ip = getClientIp(req)
  const { allowed, remaining, resetAt } = rateLimit(`generate-blog:${ip}`, { limit: LIMIT, windowMs: WINDOW_MS })

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

  const parsed = BlogGenerationRequestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid request', issues: parsed.error.issues },
      { status: 400 }
    )
  }

  try {
    const result = await generateText({
      model: anthropic('claude-sonnet-4-6'),
      output: Output.object({ schema: BlogAIOutputSchema }),
      system: BLOG_SYSTEM_PROMPT,
      prompt: buildBlogUserPrompt(parsed.data),
    })

    return NextResponse.json(aiOutputToPortableText(result.output), {
      headers: rateLimitHeaders(remaining, resetAt, LIMIT),
    })
  } catch (err) {
    console.error('[generate-blog]', err)
    return NextResponse.json({ error: 'Content generation failed' }, { status: 500 })
  }
}
