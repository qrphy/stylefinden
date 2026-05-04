// Saç stili için açıklama ve etiket üreten API endpoint'i.
// Mevcut döküman alanlarını (başlık, tür, uzunluk, ortam, ruh hali) alır,
// kısa bir açıklama ve etiket seti döner.

import { anthropic } from '@ai-sdk/anthropic'
import { generateText, Output } from 'ai'
import { NextResponse } from 'next/server'
import { z } from 'zod'

// Gelen isteği doğrulayan şema
const RequestSchema = z.object({
  title: z.string().min(1).max(200),
  type: z.string().optional(),
  length: z.string().optional(),
  occasion: z.string().optional(),
  mood: z.string().optional(),
  extraContext: z.string().max(500).optional(),
})

// Yapay zekanın döneceği veri yapısı
const OutputSchema = z.object({
  description: z.string().min(10).max(400),
  tags: z.array(z.string().min(1)).min(3).max(10),
})

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = RequestSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { title, type, length, occasion, mood, extraContext } = parsed.data

  // Mevcut döküman alanlarını prompt'a bağlam olarak ekle
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

    return NextResponse.json(result.output)
  } catch (err) {
    console.error('[generate-hairstyle]', err)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
