// /studio yolu — Sanity Studio'yu Next.js App Router içinde barındırır.
// metadata ve viewport next-sanity/studio'dan re-export edilir (Studio'nun özel gereksinimleri var).
import StudioClient from './StudioClient'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <StudioClient />
}
