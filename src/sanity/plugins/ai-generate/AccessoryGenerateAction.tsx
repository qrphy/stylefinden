// Accessory dökümanı için "Generate with AI" aksiyon butonu.
// Mevcut döküman alanlarını (başlık, tür, ortam) otomatik okur,
// yapay zeka description + pairingTip + tags üretir ve draft'a uygular.

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

interface AccessoryAIOutput {
  description: string
  pairingTip: string
  tags: string[]
}

export const AccessoryGenerateAction: DocumentActionComponent = ({
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
    occasion?: string
  }

  return {
    label: 'Generate with AI',
    icon: SparklesIcon,
    onHandle: () => setIsOpen(true),
    dialog: isOpen
      ? {
          type: 'dialog' as const,
          header: 'Generate Accessory Content with AI',
          onClose: () => setIsOpen(false),
          content: (
            <AccessoryDialogContent
              title={doc?.title ?? ''}
              accessoryType={doc?.type}
              occasion={doc?.occasion}
              onClose={() => setIsOpen(false)}
              onApply={(data) => {
                // description + pairingTip + tags alanlarını draft'a yaz
                patch.execute([
                  {
                    set: {
                      description: data.description,
                      pairingTip: data.pairingTip,
                      tags: data.tags,
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

function AccessoryDialogContent({
  title,
  accessoryType,
  occasion,
  onClose,
  onApply,
}: {
  title: string
  accessoryType?: string
  occasion?: string
  onClose: () => void
  onApply: (data: AccessoryAIOutput) => void
}) {
  const [extraContext, setExtraContext] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<AccessoryAIOutput | null>(null)
  const [error, setError] = useState<string | null>(null)

  const missingTitle = !title.trim()

  async function handleGenerate() {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/api/generate-accessory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          type: accessoryType,
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
        {/* Döküman bağlamı */}
        <Card tone="default" padding={3} radius={2}>
          <Stack space={2}>
            <Text size={1} weight="semibold">Using these document fields as context:</Text>
            <Text size={1} muted>
              Title: {title || '(empty — fill in the title field first)'}
            </Text>
            {accessoryType && <Text size={1} muted>Type: {accessoryType}</Text>}
            {occasion && <Text size={1} muted>Occasion: {occasion}</Text>}
          </Stack>
        </Card>

        {/* Ek bağlam */}
        <Stack space={2}>
          <Label>Extra context (optional)</Label>
          <TextArea
            value={extraContext}
            onChange={(e) => setExtraContext(e.currentTarget.value)}
            placeholder="e.g. Gold hardware, structured shape, fits A4 documents"
            rows={3}
            disabled={isLoading}
          />
        </Stack>

        {missingTitle && (
          <Card tone="caution" padding={3} radius={2}>
            <Text size={1}>Add a title to the accessory document before generating.</Text>
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

        {/* Üretilen içerik önizlemesi — description + pairingTip + tags */}
        {result && !isLoading && (
          <Card tone="positive" padding={3} radius={2}>
            <Stack space={3}>
              <Text size={1} weight="semibold">Description:</Text>
              <Text size={1}>{result.description}</Text>
              <Text size={1} weight="semibold">Pairing Tip:</Text>
              <Text size={1}>{result.pairingTip}</Text>
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
