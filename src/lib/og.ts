export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

export function sanityOgImageUrl(assetRef: string | undefined | null): string | null {
  if (!assetRef) return null
  const without = assetRef.replace(/^image-/, '')
  const parts = without.split('-')
  if (parts.length < 3) return null
  const ext = parts.pop()!
  const dim = parts.pop()!
  const id = parts.join('-')
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  if (!projectId || !dataset) return null
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dim}.${ext}?w=620&h=630&fit=crop&auto=format`
}
