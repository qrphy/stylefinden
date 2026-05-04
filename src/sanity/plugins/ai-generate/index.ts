// Sanity Studio'ya "Generate with AI" butonunu ekleyen eklenti tanımı.
// Dört içerik türü için ayrı aksiyonlar kaydeder:
// post → blog içeriği, outfit → kombin, hairstyle → saç stili, accessory → aksesuar

import { definePlugin } from 'sanity'
import { BlogGenerateAction } from './BlogGenerateAction'
import { OutfitGenerateAction } from './OutfitGenerateAction'
import { HairstyleGenerateAction } from './HairstyleGenerateAction'
import { AccessoryGenerateAction } from './AccessoryGenerateAction'

export const aiGeneratePlugin = definePlugin({
  name: 'ai-generate',
  document: {
    // Her döküman türü için uygun yapay zeka aksiyonunu mevcut aksiyon listesine ekler.
    // prev: Sanity'nin varsayılan aksiyonları (Yayınla, Taslağı Sil vb.)
    // ctx.schemaType: düzenlenen dökümanın şema adı
    actions: (prev, ctx) => {
      switch (ctx.schemaType) {
        case 'post':
          return [...prev, BlogGenerateAction]
        case 'outfit':
          return [...prev, OutfitGenerateAction]
        case 'hairstyle':
          return [...prev, HairstyleGenerateAction]
        case 'accessory':
          return [...prev, AccessoryGenerateAction]
        default:
          return prev
      }
    },
  },
})
