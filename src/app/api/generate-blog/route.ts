import { anthropic } from '@ai-sdk/anthropic'
import { generateText, Output } from 'ai'
import { NextResponse } from 'next/server'
import { BLOG_SYSTEM_PROMPT, buildBlogUserPrompt } from '@/lib/ai/blog-prompt'
import { BlogAIOutputSchema, BlogGenerationRequestSchema } from '@/lib/ai/types'
import { aiOutputToPortableText } from '@/lib/ai/portable-text'

export async function POST(req: Request) {
  const body = await req.json()
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

    return NextResponse.json(aiOutputToPortableText(result.output))
  } catch (err) {
    console.error('[generate-blog]', err)
    return NextResponse.json({ error: 'Content generation failed' }, { status: 500 })
  }
}
