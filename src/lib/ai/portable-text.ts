import type { BlogAIOutput, BlogGenerationResponse, PortableTextBlock } from './types'

function makeKey(): string {
  return Math.random().toString(36).slice(2, 10)
}

function block(text: string, style: PortableTextBlock['style']): PortableTextBlock {
  return {
    _type: 'block',
    _key: makeKey(),
    style,
    children: [{ _type: 'span', _key: makeKey(), text, marks: [] }],
    markDefs: [],
  }
}

export function aiOutputToPortableText(output: BlogAIOutput): BlogGenerationResponse {
  const body: PortableTextBlock[] = []

  for (const section of output.sections) {
    if (section.heading?.trim()) {
      body.push(block(section.heading.trim(), 'h2'))
    }
    for (const paragraph of section.paragraphs) {
      if (paragraph.trim()) {
        body.push(block(paragraph.trim(), 'normal'))
      }
    }
  }

  return {
    title: output.title,
    excerpt: output.excerpt,
    tags: output.tags,
    body,
  }
}
