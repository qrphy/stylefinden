// Blog dökümanı için "Generate with AI" aksiyon butonu.
// Sanity Studio'nun döküman aksiyon sistemine entegre olur.
// Editör konuyu girer, yapay zeka başlık + özet + etiket + içerik üretir,
// ardından tek tıkla dökümanın draft'ına uygular.

'use client'

import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  Flex,
  Label,
  Select,
  Spinner,
  Stack,
  Text,
  TextArea,
  TextInput,
} from '@sanity/ui'
import { SparklesIcon } from '@sanity/icons'
import { useDocumentOperation } from 'sanity'
import type { DocumentActionComponent, DocumentActionProps } from 'sanity'
import type { BlogGenerationResponse } from '@/lib/ai/types'

// Blog kategorileri — API'deki BLOG_CATEGORIES ile eşleşmeli
const CATEGORIES = [
  { label: 'Accessories Guide', value: 'accessories-guides' },
  { label: 'Hairstyle Guide', value: 'hairstyle-guides' },
  { label: 'Occasion Guide', value: 'occasion-guides' },
  { label: 'Seasonal Guide', value: 'seasonal-guides' },
  { label: 'Trend Report', value: 'trend-reports' },
]

const TONES = [
  { label: 'Inspirational', value: 'inspirational' },
  { label: 'Casual', value: 'casual' },
  { label: 'Formal', value: 'formal' },
]

const LENGTHS = [
  { label: 'Short (~350 words)', value: 'short' },
  { label: 'Medium (~700 words)', value: 'medium' },
  { label: 'Long (~1100 words)', value: 'long' },
]

// Sanity döküman aksiyonu — hooks kullanabilir ama JSX değil, descriptor nesnesi döner
export const BlogGenerateAction: DocumentActionComponent = ({
  id,
  type,
}: DocumentActionProps) => {
  // useDocumentOperation: dökümanı değiştirmek için Sanity'nin dahili API'si
  // patch.execute() ile draft'a alan güncellemesi gönderir
  const { patch } = useDocumentOperation(id, type)
  const [isOpen, setIsOpen] = useState(false)

  return {
    label: 'Generate with AI',
    icon: SparklesIcon,
    onHandle: () => setIsOpen(true),
    // dialog: Sanity'nin modal sistemi — content alanına herhangi bir React node verilebilir
    dialog: isOpen
      ? {
          type: 'dialog' as const,
          header: 'Generate Blog Post with AI',
          onClose: () => setIsOpen(false),
          content: (
            <BlogDialogContent
              onClose={() => setIsOpen(false)}
              onApply={(data) => {
                // Üretilen içeriği dökümanın draft versiyonuna yaz
                patch.execute([
                  {
                    set: {
                      title: data.title,
                      excerpt: data.excerpt,
                      tags: data.tags,
                      body: data.body,
                    },
                  },
                ])
                setIsOpen(false)
              }}
            />
          ),
        }
      : false,
  }
}

// Dialog içeriği — form, yükleme durumu ve önizleme aşamalarını yönetir
function BlogDialogContent({
  onClose,
  onApply,
}: {
  onClose: () => void
  onApply: (data: BlogGenerationResponse) => void
}) {
  const [topic, setTopic] = useState('')
  const [category, setCategory] = useState('seasonal-guides')
  const [tone, setTone] = useState('inspirational')
  const [targetLength, setTargetLength] = useState('medium')
  const [keywords, setKeywords] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<BlogGenerationResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleGenerate() {
    if (!topic.trim()) return
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/api/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic.trim(),
          category,
          tone,
          targetLength,
          keywords: keywords.trim()
            ? keywords
                .split(',')
                .map((k) => k.trim())
                .filter(Boolean)
            : undefined,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        setError(err.error ?? 'Generation failed. Please try again.')
        return
      }

      setResult(await res.json())
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box padding={4} style={{ maxWidth: 560 }}>
      <Stack space={4}>
        {/* Konu — zorunlu alan */}
        <Stack space={2}>
          <Label>Topic *</Label>
          <TextInput
            value={topic}
            onChange={(e) => setTopic(e.currentTarget.value)}
            placeholder="e.g. How to style a trench coat for spring"
            disabled={isLoading}
          />
        </Stack>

        {/* Kategori */}
        <Stack space={2}>
          <Label>Category</Label>
          <Select
            value={category}
            onChange={(e) => setCategory(e.currentTarget.value)}
            disabled={isLoading}
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </Select>
        </Stack>

        {/* Ton ve uzunluk yan yana */}
        <Flex gap={3}>
          <Stack space={2} style={{ flex: 1 }}>
            <Label>Tone</Label>
            <Select
              value={tone}
              onChange={(e) => setTone(e.currentTarget.value)}
              disabled={isLoading}
            >
              {TONES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </Select>
          </Stack>
          <Stack space={2} style={{ flex: 1 }}>
            <Label>Length</Label>
            <Select
              value={targetLength}
              onChange={(e) => setTargetLength(e.currentTarget.value)}
              disabled={isLoading}
            >
              {LENGTHS.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </Select>
          </Stack>
        </Flex>

        {/* Anahtar kelimeler — opsiyonel */}
        <Stack space={2}>
          <Label>Keywords (optional, comma-separated)</Label>
          <TextInput
            value={keywords}
            onChange={(e) => setKeywords(e.currentTarget.value)}
            placeholder="e.g. spring outfit, layering, minimalist"
            disabled={isLoading}
          />
        </Stack>

        {/* Hata mesajı */}
        {error && (
          <Card tone="critical" padding={3} radius={2}>
            <Text size={1}>{error}</Text>
          </Card>
        )}

        {/* Yükleme göstergesi */}
        {isLoading && (
          <Flex justify="center" padding={4}>
            <Spinner muted />
          </Flex>
        )}

        {/* Üretilen içerik önizlemesi */}
        {result && !isLoading && (
          <Card tone="positive" padding={3} radius={2}>
            <Stack space={3}>
              <Text weight="semibold" size={1}>
                {result.title}
              </Text>
              <Text size={1} muted>
                {result.excerpt}
              </Text>
              <Text size={1} muted>
                Tags: {result.tags.join(', ')}
              </Text>
              <Text size={1} muted>
                {result.body.length} content blocks ready to apply
              </Text>
            </Stack>
          </Card>
        )}

        {/* Aksiyon butonları */}
        <Flex gap={3} justify="flex-end">
          <Button mode="ghost" text="Cancel" onClick={onClose} disabled={isLoading} />
          {result ? (
            <>
              <Button
                mode="ghost"
                text="Regenerate"
                onClick={handleGenerate}
                disabled={isLoading}
              />
              <Button
                tone="positive"
                text="Apply to Document"
                onClick={() => onApply(result)}
              />
            </>
          ) : (
            <Button
              tone="primary"
              text="Generate"
              icon={SparklesIcon}
              onClick={handleGenerate}
              disabled={isLoading || !topic.trim()}
            />
          )}
        </Flex>
      </Stack>
    </Box>
  )
}
