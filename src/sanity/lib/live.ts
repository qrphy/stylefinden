// Sanity Live Preview kurulumu — sanityFetch, önbellek etiketli veri çekiminde kullanılır;
// SanityLive bileşeni Studio'dan yapılan değişiklikleri sayfaya gerçek zamanlı yansıtır.
import { defineLive } from 'next-sanity/live'
import { client } from './client'

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ apiVersion: '2026-05-02' }),
})
