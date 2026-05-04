import { z } from 'zod'

export const BLOG_CATEGORIES = [
  'accessories-guides',
  'hairstyle-guides',
  'occasion-guides',
  'seasonal-guides',
  'trend-reports',
] as const

export type BlogCategory = (typeof BLOG_CATEGORIES)[number]

export const BlogGenerationRequestSchema = z.object({
  topic: z.string().min(3).max(200),
  category: z.enum(BLOG_CATEGORIES),
  keywords: z.array(z.string()).max(10).optional(),
  tone: z.enum(['formal', 'casual', 'inspirational']).optional().default('inspirational'),
  targetLength: z.enum(['short', 'medium', 'long']).optional().default('medium'),
})

export type BlogGenerationRequest = z.infer<typeof BlogGenerationRequestSchema>

export const BlogAIOutputSchema = z.object({
  title: z.string().min(10).max(120),
  excerpt: z.string().max(200),
  tags: z.array(z.string()).min(3).max(8),
  sections: z
    .array(
      z.object({
        heading: z.string().optional(),
        paragraphs: z.array(z.string().min(1)),
      })
    )
    .min(2),
})

export type BlogAIOutput = z.infer<typeof BlogAIOutputSchema>

export interface PortableTextBlock {
  _type: 'block'
  _key: string
  style: 'normal' | 'h2' | 'h3'
  children: Array<{
    _type: 'span'
    _key: string
    text: string
    marks: string[]
  }>
  markDefs: never[]
}

export interface BlogGenerationResponse {
  title: string
  excerpt: string
  tags: string[]
  body: PortableTextBlock[]
}
