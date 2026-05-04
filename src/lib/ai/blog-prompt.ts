import type { BlogGenerationRequest } from './types'

const CATEGORY_CONTEXT: Record<string, string> = {
  'accessories-guides': 'accessories guide (bags, jewelry, belts, hats, sunglasses)',
  'hairstyle-guides': 'hairstyle guide (cuts, styling techniques, care routines)',
  'occasion-guides': 'occasion guide (weddings, job interviews, night outs, vacations)',
  'seasonal-guides': 'seasonal style guide (summer, winter, spring, fall transition)',
  'trend-reports': 'trend report (season trends, runway reviews, street style observations)',
}

const TONE_INSTRUCTIONS: Record<string, string> = {
  formal: 'professional, informative, and authoritative — clear and precise',
  casual: 'friendly and conversational — as if giving advice to a friend',
  inspirational: 'uplifting and motivating — language that moves the reader to act',
}

const LENGTH_GUIDE: Record<string, string> = {
  short: '3-4 sections, 2-3 paragraphs each (roughly 300-400 words total)',
  medium: '4-6 sections, 2-4 paragraphs each (roughly 600-800 words total)',
  long: '6-8 sections, 3-5 paragraphs each (roughly 1000-1200 words total)',
}

export const BLOG_SYSTEM_PROMPT = `You are an expert fashion and style content writer for Stylefinden, a fashion and lifestyle platform.
Your task is to produce SEO-friendly, engaging blog posts with practical, actionable advice.
Write all content in English. Avoid vague generalities — every tip must be specific and applicable.
Do not use filler phrases or repeat the same idea across sections.

Tone rules (apply to every post):
- Write like a knowledgeable friend, not a brand or an academic. Warm but grounded.
- No slang, internet speak, or Gen-Z expressions (no "obsessed", "literally", "vibe", "slay", "fire", "lowkey", "that said", "game-changer").
- No hollow filler phrases ("In today's world", "More than ever", "At the end of the day", "It goes without saying").
- Not stiff or overly corporate either — contractions are fine, short sentences are fine.
- Spelling and grammar must be flawless. American English.
- Each paragraph should earn its place. If a sentence adds nothing new, cut it.`

export function buildBlogUserPrompt(req: BlogGenerationRequest): string {
  const categoryContext = CATEGORY_CONTEXT[req.category] ?? req.category
  const toneInstruction = TONE_INSTRUCTIONS[req.tone ?? 'inspirational']
  const lengthGuide = LENGTH_GUIDE[req.targetLength ?? 'medium']
  const keywordsNote =
    req.keywords?.length
      ? `\nKeywords to weave in naturally: ${req.keywords.join(', ')}`
      : ''

  return `Topic: ${req.topic}
Content type: ${categoryContext}
Tone: ${toneInstruction}
Length: ${lengthGuide}${keywordsNote}

Produce a blog post with this structure:
- title: Compelling, SEO-friendly headline (max 120 characters)
- excerpt: Short teaser that hooks the reader (max 200 characters, not clickbait)
- tags: 3-8 relevant lowercase tags
- sections: Array of sections — each with an optional heading and array of paragraphs

Important: Content must be original, practical, and specific. Avoid clichés and repetition.`
}
