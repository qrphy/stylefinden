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
              name: 'colorTag',
              title: 'Renk',
              type: 'string',
              description: 'Parçanın baskın rengi — benzer kombin eşleştirmesinde kullanılır.',
              options: {
                list: [
                  { title: 'Siyah',       value: 'black'      },
                  { title: 'Beyaz',       value: 'white'      },
                  { title: 'Gri',         value: 'grey'       },
                  { title: 'Krem / Bej',  value: 'beige'      },
                  { title: 'Lacivert',    value: 'navy'       },
                  { title: 'Mavi',        value: 'blue'       },
                  { title: 'Kırmızı',     value: 'red'        },
                  { title: 'Bordo',       value: 'burgundy'   },
                  { title: 'Pembe',       value: 'pink'       },
                  { title: 'Turuncu',     value: 'orange'     },
                  { title: 'Sarı',        value: 'yellow'     },
                  { title: 'Yeşil',       value: 'green'      },
                  { title: 'Haki / Zeytin', value: 'khaki'    },
                  { title: 'Kahverengi',  value: 'brown'      },
                  { title: 'Mor',         value: 'purple'     },
                  { title: 'Çok Renkli',  value: 'multicolor' },
                ],
              },
            }),
            defineField({
              name: 'itemTag',
              title: 'Öğe Kategorisi',
              type: 'string',
              description: 'Parçanın spesifik türü — benzer kombin eşleştirmesinde kullanılır.',
              options: {
                list: [
                  { title: 'T-Shirt',         value: 'tshirt'     },
                  { title: 'Gömlek',          value: 'shirt'      },
                  { title: 'Bluz / Üst',      value: 'blouse'     },
                  { title: 'Kazak / Triko',   value: 'knitwear'   },
                  { title: 'Sweatshirt',      value: 'sweatshirt' },
                  { title: 'Kot Pantolon',    value: 'jeans'      },
                  { title: 'Kumaş Pantolon',  value: 'trousers'   },
                  { title: 'Şort',            value: 'shorts'     },
                  { title: 'Etek',            value: 'skirt'      },
                  { title: 'Elbise',          value: 'dress'      },
                  { title: 'Tulum',           value: 'jumpsuit'   },
                  { title: 'Blazer / Ceket',  value: 'blazer'     },
                  { title: 'Mont / Kaban',    value: 'coat'       },
                  { title: 'Deri Ceket',      value: 'leather-jacket' },
                  { title: 'Spor Ceket',      value: 'jacket'     },
                  { title: 'Sneaker',         value: 'sneakers'   },
                  { title: 'Bot / Çizme',     value: 'boots'      },
                  { title: 'Topuklu Ayakkabı', value: 'heels'     },
                  { title: 'Sandalet',        value: 'sandals'    },
                  { title: 'Loafer / Babet',  value: 'loafers'    },
                  { title: 'Çanta',           value: 'bag'        },
                  { title: 'Şapka / Bere',    value: 'hat'        },
                  { title: 'Atkı / Fular',    value: 'scarf'      },
                  { title: 'Kemer',           value: 'belt'       },
                  { title: 'Güneş Gözlüğü',  value: 'sunglasses' },
                  { title: 'Takı / Aksesuar', value: 'jewelry'    },
                ],
              },
            }),
            defineField({
              name: 'description',
              title: 'Açıklama',
              type: 'string',
              description: 'Marka, renk, stil notu gibi ek bilgiler.',
            }),
            defineField({
              name: 'image',
              title: 'Görsel',
              type: 'image',
              options: { hotspot: true },
              description: 'Parçanın fotoğrafı — "Shop the Look" bölümünde gösterilir.',
            }),
            defineField({
              name: 'affiliateUrl',
              title: 'Satın Alma Linki',
              type: 'url',
              description: 'Affiliate veya mağaza linki. Görsele tıklandığında yeni sekmede açılır.',
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'colorTag', media: 'image' },
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
