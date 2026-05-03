// Tüm içerik tipleri tarafından paylaşılan Sanity görsel tipi.
// asset._ref değeri urlFor() ile cdn.sanity.io URL'sine dönüştürülür.
export type SanityImage = {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
  alt?: string
}
