import { defineArrayMember, defineField, defineType } from 'sanity'
import { TagIcon } from '@sanity/icons'

// Outfit dökümanı — kart, detay sayfası ve kategori filtreleri için tek kaynak.
// Tüm alan değerleri (value) URL slug'larıyla ve queries.ts ile birebir eşleşmelidir.
export const outfit = defineType({
  name: 'outfit',
  title: 'Outfit',
  type: 'document',
  icon: TagIcon,
  fields: [

    // ── Temel bilgiler ────────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Outfit Adı',
      type: 'string',
      description: 'Kısa ve tanımlayıcı olsun. Örnek: "Sonbahar Sokak Stili"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL (Slug)',
      type: 'slug',
      description: 'Başlık girildikten sonra "Generate" butonuna bas.',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Açıklama',
      type: 'text',
      rows: 3,
      description: 'Kombini anlatan 1-3 cümle. Detay sayfasında görünür.',
    }),
    defineField({
      name: 'image',
      title: 'Ana Görsel',
      type: 'image',
      options: { hotspot: true },
      description: 'Dikey format (3:4 oran). Min. 900×1200 px, JPG/WebP.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Metin',
          type: 'string',
          description: 'Görseli tanımlayan kısa metin. SEO ve erişilebilirlik için önemli.',
        }),
      ],
      validation: (r) => r.required(),
    }),

    // ── Kategori etiketleri ───────────────────────────────────────────────────
    defineField({
      name: 'style',
      title: 'Stil',
      type: 'string',
      description: 'Kombin hangi stil kategorisine giriyor?',
      options: {
        list: [
          { title: 'Casual',      value: 'casual'      },
          { title: 'Street Style', value: 'streetstyle' },
          { title: 'Elegant',     value: 'elegant'     },
          { title: 'Boho',        value: 'boho'        },
          { title: 'Sporty',      value: 'sporty'      },
          { title: 'Minimalist',  value: 'minimalist'  },
          { title: 'Classic',     value: 'classic'     },
          { title: 'Vintage',     value: 'vintage'     },
          { title: 'Formal',      value: 'formal'      },
        ],
      },
    }),
    defineField({
      name: 'season',
      title: 'Mevsim',
      type: 'string',
      options: {
        list: [
          { title: 'İlkbahar',       value: 'spring'      },
          { title: 'Yaz',            value: 'summer'      },
          { title: 'Sonbahar',       value: 'autumn'      },
          { title: 'Kış',            value: 'winter'      },
          { title: 'Tüm Mevsimler',  value: 'all-season'  },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'occasion',
      title: 'Durum / Ortam',
      type: 'string',
      description: 'Bu kombin en çok hangi ortama uyuyor?',
      options: {
        list: [
          { title: 'Günlük',          value: 'casual'     },
          { title: 'Ofis',            value: 'office'     },
          { title: 'Akşam / Gece',    value: 'evening'    },
          { title: 'Düğün',           value: 'wedding'    },
          { title: 'Spor / Outdoor',  value: 'sport'      },
          { title: 'Plaj',            value: 'beach'      },
          { title: 'Festival',        value: 'festival'   },
          { title: 'Romantik Akşam',  value: 'date-night' },
        ],
      },
    }),

    // ── Ana sayfa öne çıkarma ─────────────────────────────────────────────────
    defineField({
      name: 'featured',
      title: 'Öne Çıkan',
      type: 'boolean',
      description: 'Açık olursa ana sayfadaki "Trending Outfits" bölümünde görünür.',
      initialValue: false,
    }),

    // ── Parçalar (Outfit Pieces) ──────────────────────────────────────────────
    defineField({
      name: 'pieces',
      title: 'Kombin Parçaları',
      type: 'array',
      description: 'Bu kombindeki her parçayı ayrı ayrı ekle.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Parça Türü',
              type: 'string',
              options: {
                list: [
                  { title: 'Üst',        value: 'top'       },
                  { title: 'Alt',        value: 'bottom'    },
                  { title: 'Dış Giyim',  value: 'outerwear' },
                  { title: 'Elbise',     value: 'dress'     },
                  { title: 'Ayakkabı',   value: 'shoes'     },
                  { title: 'Çanta',      value: 'bag'       },
                  { title: 'Aksesuar',   value: 'accessory' },
                  { title: 'Diğer',      value: 'other'     },
                ],
              },
            }),
            defineField({
              name: 'name',
              title: 'Parça Adı',
              type: 'string',
              description: 'Örnek: "Krem Oversize Palto"',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'description',
              title: 'Açıklama',
              type: 'string',
              description: 'Marka, renk, stil notu gibi ek bilgiler.',
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'type' },
          },
        }),
      ],
    }),

    // ── Etiketler ve tarih ────────────────────────────────────────────────────
    defineField({
      name: 'tags',
      title: 'Etiketler',
      type: 'array',
      description: 'Arama ve filtreleme için. Örnek: denim, neutral, layering',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Yayın Tarihi',
      type: 'datetime',
      description: 'Boş bırakılırsa oluşturulma tarihi kullanılır.',
    }),

  ],

  preview: {
    select: { title: 'title', media: 'image', style: 'style', season: 'season' },
    prepare({ title, media, style, season }) {
      return {
        title,
        media,
        subtitle: [style, season].filter(Boolean).join(' · '),
      }
    },
  },
})
