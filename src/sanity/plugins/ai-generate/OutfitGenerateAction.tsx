// Outfit dökümanı için "Generate with AI" aksiyon butonu.
// Mevcut döküman alanlarını (başlık, stil, mevsim, ortam) otomatik okur,
// yapay zeka description + tags üretir ve tek tıkla draft'a uygular.

'use client'

import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  Flex,
  Label,
  Spinner,
  Stack,
  Text,
  TextArea,
  TextInput,
} from '@sanity/ui'
import { SparklesIcon } from '@sanity/icons'
import { useDocumentOperation } from 'sanity'
import type { DocumentActionComponent, DocumentActionProps, SanityDocument } from 'sanity'

// API'den dönen veri tipi
interface OutfitAIOutput {
  description: string
  tags: string[]
}

export const OutfitGenerateAction: DocumentActionComponent = ({
  id,
  type,
  draft,
  published,
}: DocumentActionProps) => {
  const { patch } = useDocumentOperation(id, type)
  const [isOpen, setIsOpen] = useState(false)

  // Draft varsa draft'ı, yoksa yayımlananı kullan
  const doc = (draft ?? published) as SanityDocument & {
    title?: string
    style?: string
    season?: string
    occasion?: string
  }

  return {
    label: 'Generate with AI',
    icon: SparklesIcon,
    onHandle: () => setIsOpen(true),
    dialog: isOpen
      ? {
          type: 'dialog' as const,
          header: 'Generate Outfit Description with AI',
          onClose: () => setIsOpen(false),
          content: (
            <OutfitDialogContent
              title={doc?.title ?? ''}
              style={doc?.style}
              season={doc?.season}
              occasion={doc?.occasion}
              onClose={() => setIsOpen(false)}
              onApply={(data) => {
                // Üretilen içeriği draft'a yaz
                patch.execute([
                  { set: { description: data.description, tags: data.tags } },
                ])
                setIsOpen(false)
              }}
            />
          ),
        }
      : false,
  }
}

function OutfitDialogContent({
  title,
  style,
  season,
  occasion,
  onClose,
  onApply,
}: {
  title: string
  style?: string
  season?: string
  occasion?: string
  onClose: () => void
  onApply: (data: OutfitAIOutput) => void
}) {
  const [extraContext, setExtraContext] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<OutfitAIOutput | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Dökümanın mevcut alanları yoksa uyar
  const missingTitle = !title.trim()

  async function handleGenerate() {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/api/generate-outfit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          style,
          season,
          occasion,
          extraContext: extraContext.trim() || undefined,
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
    <Box padding={4} style={{ maxWidth: 480 }}>
      <Stack space={4}>
        {/* Döküman bağlamı — AI'nin ne bildiğini göster */}
        <Card tone="default" padding={3} radius={2}>
          <Stack space={2}>
            <Text size={1} weight="semibold">
              Using these document fields as context:
            </Text>
            <Text size={1} muted>
              Title: {title || '(empty — fill in the title field first)'}
            </Text>
            {style && <Text size={1} muted>Style: {style}</Text>}
            {season && <Text size={1} muted>Season: {season}</Text>}
            {occasion && <Text size={1} muted>Occasion: {occasion}</Text>}
          </Stack>
        </Card>

        {/* Ek bağlam — opsiyonel */}
        <Stack space={2}>
          <Label>Extra context (optional)</Label>
          <TextArea
            value={extraContext}
            onChange={(e) => setExtraContext(e.currentTarget.value)}
            placeholder="e.g. Features a statement belt, monochrome palette, office-ready"
            rows={3}
            disabled={isLoading}
          />
        </Stack>

        {missingTitle && (
          <Card tone="caution" padding={3} radius={2}>
            <Text size={1}>Add a title to the outfit document before generating.</Text>
          </Card>
        )}

        {error && (
          <Card tone="critical" padding={3} radius={2}>
            <Text size={1}>{error}</Text>
          </Card>
        )}

        {isLoading && (
          <Flex justify="center" padding={4}>
            <Spinner muted />
          </Flex>
        )}

        {/* Üretilen içerik önizlemesi */}
        {result && !isLoading && (
          <Card tone="positive" padding={3} radius={2}>
            <Stack space={3}>
              <Text size={1} weight="semibold">Description:</Text>
              <Text size={1}>{result.description}</Text>
              <Text size={1} weight="semibold">Tags:</Text>
              <Text size={1} muted>{result.tags.join(', ')}</Text>
            </Stack>
          </Card>
        )}

        <Flex gap={3} justify="flex-end">
          <Button mode="ghost" text="Cancel" onClick={onClose} disabled={isLoading} />
          {result ? (
            <>
              <Button mode="ghost" text="Regenerate" onClick={handleGenerate} disabled={isLoading} />
              <Button tone="positive" text="Apply to Document" onClick={() => onApply(result)} />
            </>
          ) : (
            <Button
              tone="primary"
              text="Generate"
              icon={SparklesIcon}
              onClick={handleGenerate}
              disabled={isLoading || missingTitle}
            />
          )}
        </Flex>
      </Stack>
    </Box>
  )
}
