// Sanity görsel URL üreteci — Sanity image referansını cdn.sanity.io URL'sine dönüştürür.
// Kullanım: urlFor(image).width(600).height(800).url()
import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'
import { dataset, projectId } from '../env'

const builder = createImageUrlBuilder({ projectId, dataset })

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
