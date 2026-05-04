// Hairstyle dökümanı için "Generate with AI" aksiyon butonu.
// Mevcut döküman alanlarını (başlık, tür, uzunluk, ortam, ruh hali) otomatik okur,
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
} from '@sanity/ui'
import { SparklesIcon } from '@sanity/icons'
import { useDocumentOperation } from 'sanity'
import type { DocumentActionComponent, DocumentActionProps, SanityDocument } from 'sanity'

interface HairstyleAIOutput {
  description: string
  tags: string[]
}

export const HairstyleGenerateAction: DocumentActionComponent = ({
  id,
  type,
  draft,
  published,
}: DocumentActionProps) => {
  const { patch } = useDocumentOperation(id, type)
  const [isOpen, setIsOpen] = useState(false)

  const doc = (draft ?? published) as SanityDocument & {
    title?: string
    type?: string
    length?: string
    occasion?: string
    mood?: string
  }

  return {
    label: 'Generate with AI',
    icon: SparklesIcon,
    onHandle: () => setIsOpen(true),
    dialog: isOpen
      ? {
          type: 'dialog' as const,
          header: 'Generate Hairstyle Description with AI',
          onClose: () => setIsOpen(false),
          content: (
            <HairstyleDialogContent
              title={doc?.title ?? ''}
              hairType={doc?.type}
              length={doc?.length}
              occasion={doc?.occasion}
              mood={doc?.mood}
              onClose={() => setIsOpen(false)}
              onApply={(data) => {
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

function HairstyleDialogContent({
  title,
  hairType,
  length,
  occasion,
  mood,
  onClose,
  onApply,
}: {
  title: string
  hairType?: string
  length?: string
  occasion?: string
  mood?: string
  onClose: () => void
  onApply: (data: HairstyleAIOutput) => void
}) {
  const [extraContext, setExtraContext] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<HairstyleAIOutput | null>(null)
  const [error, setError] = useState<string | null>(null)

  const missingTitle = !title.trim()

  async function handleGenerate() {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/api/generate-hairstyle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          type: hairType,
          length,
          occasion,
          mood,
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
        {/* Döküman bağlamı */}
        <Card tone="default" padding={3} radius={2}>
          <Stack space={2}>
            <Text size={1} weight="semibold">Using these document fields as context:</Text>
            <Text size={1} muted>
              Title: {title || '(empty — fill in the title field first)'}
            </Text>
            {hairType && <Text size={1} muted>Type: {hairType}</Text>}
            {length && <Text size={1} muted>Length: {length}</Text>}
            {occasion && <Text size={1} muted>Occasion: {occasion}</Text>}
            {mood && <Text size={1} muted>Mood: {mood}</Text>}
          </Stack>
        </Card>

        {/* Ek bağlam */}
        <Stack space={2}>
          <Label>Extra context (optional)</Label>
          <TextArea
            value={extraContext}
            onChange={(e) => setExtraContext(e.currentTarget.value)}
            placeholder="e.g. Works on thick hair, heat-free styling, good for humid weather"
            rows={3}
            disabled={isLoading}
          />
        </Stack>

        {missingTitle && (
          <Card tone="caution" padding={3} radius={2}>
            <Text size={1}>Add a title to the hairstyle document before generating.</Text>
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
