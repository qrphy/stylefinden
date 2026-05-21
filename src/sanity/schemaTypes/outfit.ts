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
      description: '💡 Kısa ve tanımlayıcı bir isim ver. Örnek: "Sonbahar Sokak Stili", "Minimalist Ofis Kombini"\n📍 Kullanım: Outfit kartlarında, detay sayfasında, SEO başlığında ve breadcrumb\'da görünür.',
      validation: (r) => r.required().min(3).max(80).error('Outfit adı 3–80 karakter arasında olmalı.'),
    }),

    defineField({
      name: 'slug',
      title: 'URL (Slug)',
      type: 'slug',
      description: '💡 Outfit adını girdikten sonra "Generate" butonuna bas — otomatik oluşturulur.\n📍 Kullanım: Sayfanın web adresi — stylefinden.com/outfits/[slug]',
      options: { source: 'title' },
      validation: (r) => r.required().error('Slug zorunlu — "Generate" butonuna bas.'),
    }),

    defineField({
      name: 'description',
      title: 'Açıklama',
      type: 'text',
      rows: 3,
      description: '💡 Kombini anlatan 2–4 cümle. Hangi ortama uyduğunu, ne hissettirdiğini yaz. Örnek: "Sonbaharın yumuşak tonlarını yansıtan bu kombin, iş toplantısından akşam yemeğine geçişte idealdir."\n📍 Kullanım: Detay sayfasında outfit bilgisi olarak görünür, Google arama sonuçlarında snippet olarak kullanılır.',
      validation: (r) => r.required().min(20).max(300).error('Açıklama 20–300 karakter arasında olmalı.'),
    }),

    defineField({
      name: 'image',
      title: 'Ana Görsel',
      type: 'image',
      options: { hotspot: true },
      description: '💡 Dikey fotoğraf yükle (3:4 oran). Minimum 900×1200 px, JPG veya WebP tercihli. Modelin tüm vücudu görünmeli.\n📍 Kullanım: Outfit kartlarında, detay sayfası hero bölümünde ve sosyal medya paylaşımlarında görünür.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Metin',
          type: 'string',
          description: '💡 Görseli tanımlayan kısa bir cümle yaz. Örnek: "Krem blazer ve beyaz triko ile sonbahar kombini"\n📍 Kullanım: Google Görseller\'de ve ekran okuyucularda (görme engelliler) kullanılır — SEO için kritik.',
          validation: (r) => r.required().min(10).max(120).error('Alt metin 10–120 karakter arasında olmalı.'),
        }),
      ],
      validation: (r) => r.required().error('Ana görsel zorunlu.'),
    }),

    // ── Kategori etiketleri ───────────────────────────────────────────────────
    defineField({
      name: 'style',
      title: 'Stil',
      type: 'string',
      description: '💡 Kombinin genel stilini seç. Emin değilsen kombinin ruhunu en iyi hangisi yansıtıyor ona bak.\n📍 Kullanım: /outfits/style/[stil] kategori sayfasında listelenir, benzer kombin önerilerinde ve SEO\'da kullanılır.',
      options: {
        list: [
          { title: 'Casual — Rahat günlük',             value: 'casual'      },
          { title: 'Street Style — Sokak modası',        value: 'streetstyle' },
          { title: 'Elegant — Şık ve zarif',             value: 'elegant'     },
          { title: 'Boho — Özgür ruhlu, bohemian',       value: 'boho'        },
          { title: 'Sporty — Aktif ve sportif',          value: 'sporty'      },
          { title: 'Minimalist — Sade ve temiz çizgiler', value: 'minimalist' },
          { title: 'Classic — Zamansız klasik',          value: 'classic'     },
          { title: 'Vintage — Retro ve nostaljik',       value: 'vintage'     },
          { title: 'Formal — Resmi ve kurumsal',         value: 'formal'      },
          { title: 'Old Money — Ölçülü lüks',            value: 'old-money'   },
          { title: 'Retro & Vintage — Nostaljik',        value: 'retro-vintage' },
          { title: 'Y2K — 2000ler ruhu',                 value: 'y2k'         },
          { title: 'Western — Kovboy ruhu',              value: 'western'     },
          { title: 'Sienna Vibe — Boho-şık, özgür ruhlu', value: 'sienna-vibe' },
          { title: 'Korean Fashion — K-moda, Seoul tarzı', value: 'korean-fashion' },
          { title: 'Clean Girl — Temiz, minimal estetik', value: 'clean-girl' },
          { title: 'Cute & Coquette — Tatlı ve feminen', value: 'cute-coquette' },
          { title: 'Black & Dark — Siyah ve karanlık estetik', value: 'black-dark' },
        ],
      },
      validation: (r) => r.required().error('Stil seçimi zorunlu.'),
    }),

    defineField({
      name: 'season',
      title: 'Mevsim',
      type: 'string',
      description: '💡 Bu kombini en çok hangi mevsimde giyersin? Katmanlı kombinler için "Tüm Mevsimler" seçilebilir.\n📍 Kullanım: /outfits/season/[mevsim] kategori sayfasında listelenir.',
      options: {
        list: [
          { title: 'İlkbahar',       value: 'spring'     },
          { title: 'Yaz',            value: 'summer'     },
          { title: 'Sonbahar',       value: 'autumn'     },
          { title: 'Kış',            value: 'winter'     },
          { title: 'Tüm Mevsimler', value: 'all-season'  },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required().error('Mevsim seçimi zorunlu.'),
    }),

    defineField({
      name: 'occasion',
      title: 'Durum / Ortam',
      type: 'string',
      description: '💡 Bu kombin en çok hangi ortama uyuyor? Birden fazla ortama uyuyorsa baskın olanı seç.\n📍 Kullanım: /outfits/occasion/[ortam] kategori sayfasında listelenir, breadcrumb\'da görünür.',
      options: {
        list: [
          { title: 'Günlük — Sıradan günler, alışveriş, gezinti', value: 'casual'     },
          { title: 'Ofis — İş toplantısı, çalışma ortamı',        value: 'office'     },
          { title: 'Akşam / Gece — Restoran, tiyatro, gala',      value: 'evening'    },
          { title: 'Düğün — Davet, nikah, kına',                  value: 'wedding'    },
          { title: 'Spor / Outdoor — Yürüyüş, egzersiz, doğa',   value: 'sport'      },
          { title: 'Plaj — Sahil, tatil, yaz aktiviteleri',       value: 'beach'      },
          { title: 'Festival — Müzik festivali, açık hava etkinliği', value: 'festival' },
          { title: 'Romantik Akşam — Date night, özel buluşma',   value: 'date-night' },
          { title: 'Okul & Kampüs — School & College',           value: 'school'     },
          { title: 'Seyahat & Tatil — Travel',                   value: 'travel'     },
          { title: 'Parti & Gece Çıkışı — Party & Night Out',   value: 'party-night-out' },
        ],
      },
      validation: (r) => r.required().error('Durum / ortam seçimi zorunlu.'),
    }),

    // ── Çoklu ortam (multi-occasion) ─────────────────────────────────────────
    defineField({
      name: 'occasions',
      title: 'Ek Ortamlar',
      type: 'array',
      description: '💡 Bu kombin birden fazla ortama uyuyorsa buradan ekle. Örnek: hem "Akşam" hem "Düğün" için uygun bir kombin.\n📍 Kullanım: Style Finder scoring\'inde çoklu eşleşme sağlar — daha zengin öneri sistemi.',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        list: [
          { title: 'Günlük — Sıradan günler, alışveriş, gezinti', value: 'casual'     },
          { title: 'Ofis — İş toplantısı, çalışma ortamı',        value: 'office'     },
          { title: 'Akşam / Gece — Restoran, tiyatro, gala',      value: 'evening'    },
          { title: 'Düğün — Davet, nikah, kına',                  value: 'wedding'    },
          { title: 'Spor / Outdoor — Yürüyüş, egzersiz, doğa',   value: 'sport'      },
          { title: 'Plaj — Sahil, tatil, yaz aktiviteleri',       value: 'beach'      },
          { title: 'Festival — Müzik festivali, açık hava etkinliği', value: 'festival' },
          { title: 'Romantik Akşam — Date night, özel buluşma',   value: 'date-night' },
          { title: 'Okul & Kampüs — School & College',           value: 'school'     },
          { title: 'Seyahat & Tatil — Travel',                   value: 'travel'     },
          { title: 'Parti & Gece Çıkışı — Party & Night Out',   value: 'party-night-out' },
          { title: 'Date / Evening — Akşam + Buluşma (yeni)',   value: 'date-evening' },
        ],
        layout: 'tags',
      },
    }),

    // ── Ana sayfa öne çıkarma ─────────────────────────────────────────────────
    defineField({
      name: 'featured',
      title: 'Öne Çıkan',
      type: 'boolean',
      description: '💡 Bu kombini ana sayfada öne çıkarmak istiyorsan aç. Aynı anda maksimum 6 kombin featured olabilir — fazlası görünmez.\n📍 Kullanım: Ana sayfadaki "Trending Outfits" bölümünde gösterilir.',
      initialValue: false,
    }),

    // ── Parçalar (Outfit Pieces) ──────────────────────────────────────────────
    defineField({
      name: 'pieces',
      title: 'Kombin Parçaları',
      type: 'array',
      description: '💡 Kombindeki her parçayı ayrı ayrı ekle. En az 2 parça olmalı. Görsel ve satın alma linki olan parçalar "Shop the Look" bölümünde gösterilir.\n📍 Kullanım: Detay sayfasındaki "Outfit Pieces" listesi ve "Shop the Look" alışveriş bölümünde görünür.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Parça Türü',
              type: 'string',
              description: '💡 Parçanın genel kategorisi. Bu bilgi "Shop the Look" bölümündeki gruplamayı belirler (Tops, Bottoms, Shoes vb.).\n📍 Kullanım: Shop the Look bölümünde parçaları gruplamak için kullanılır.',
              options: {
                list: [
                  { title: 'Üst — T-shirt, gömlek, bluz, kazak vb.',          value: 'top'       },
                  { title: 'Alt — Pantolon, etek, şort vb.',                   value: 'bottom'    },
                  { title: 'Dış Giyim — Palto, kaban, mont, blazer vb.',       value: 'outerwear' },
                  { title: 'Elbise — Tek parça elbise, tulum vb.',             value: 'dress'     },
                  { title: 'Ayakkabı — Sneaker, bot, topuklu, sandalet vb.',   value: 'shoes'     },
                  { title: 'Çanta — El çantası, sırt çantası, clutch vb.',     value: 'bag'       },
                  { title: 'Aksesuar — Takı, kemer, şapka, gözlük vb.',       value: 'accessory' },
                  { title: 'Diğer — Yukarıdakilere uymuyorsa',                value: 'other'     },
                ],
              },
              validation: (r) => r.required().error('Parça türü zorunlu.'),
            }),

            defineField({
              name: 'name',
              title: 'Parça Adı',
              type: 'string',
              description: '💡 Renk + özellik + parça adı formatında yaz. Örnek: "Krem Oversize Palto", "Mavi Slim Fit Kot Pantolon", "Beyaz Chunky Sneaker"\n📍 Kullanım: "Outfit Pieces" listesinde ve "Shop the Look" kartlarında görünen isim.',
              validation: (r) => r.required().min(2).max(80).error('Parça adı 2–80 karakter arasında olmalı.'),
            }),

            defineField({
              name: 'colorTag',
              title: 'Renk',
              type: 'string',
              description: '💡 Parçanın baskın rengini seç. Birden fazla renk varsa baskın olanı seç, eşit dağılımlıysa "Çok Renkli" seç.\n📍 Kullanım: Detay sayfasında "Outfits With Similar Pieces" bölümü — aynı renkteki parçaları paylaşan kombinler önerilir.',
              options: {
                list: [
                  { title: 'Siyah',         value: 'black'      },
                  { title: 'Beyaz',         value: 'white'      },
                  { title: 'Gri',           value: 'grey'       },
                  { title: 'Krem / Bej',    value: 'beige'      },
                  { title: 'Lacivert',      value: 'navy'       },
                  { title: 'Mavi',          value: 'blue'       },
                  { title: 'Kırmızı',       value: 'red'        },
                  { title: 'Bordo',         value: 'burgundy'   },
                  { title: 'Pembe',         value: 'pink'       },
                  { title: 'Turuncu',       value: 'orange'     },
                  { title: 'Sarı',          value: 'yellow'     },
                  { title: 'Yeşil',         value: 'green'      },
                  { title: 'Haki / Zeytin', value: 'khaki'      },
                  { title: 'Kahverengi',    value: 'brown'      },
                  { title: 'Mor',           value: 'purple'     },
                  { title: 'Çok Renkli',    value: 'multicolor' },
                ],
              },
              validation: (r) => r.required().error('Renk seçimi zorunlu.'),
            }),

            defineField({
              name: 'itemTag',
              title: 'Öğe Kategorisi',
              type: 'string',
              description: '💡 Parçanın spesifik türünü seç. "Üst" yazan bir parça için T-Shirt mi, Gömlek mi, Bluz mu olduğunu belirt.\n📍 Kullanım: Detay sayfasında "Outfits With Similar Pieces" bölümü — aynı kategorideki parçaları paylaşan kombinler önerilir.',
              options: {
                list: [
                  { title: 'T-Shirt',           value: 'tshirt'         },
                  { title: 'Gömlek',            value: 'shirt'          },
                  { title: 'Bluz / Üst',        value: 'blouse'         },
                  { title: 'Kazak / Triko',     value: 'knitwear'       },
                  { title: 'Sweatshirt',        value: 'sweatshirt'     },
                  { title: 'Kot Pantolon',      value: 'jeans'          },
                  { title: 'Kumaş Pantolon',    value: 'trousers'       },
                  { title: 'Şort',              value: 'shorts'         },
                  { title: 'Etek',              value: 'skirt'          },
                  { title: 'Elbise',            value: 'dress'          },
                  { title: 'Tulum',             value: 'jumpsuit'       },
                  { title: 'Blazer / Ceket',    value: 'blazer'         },
                  { title: 'Mont / Kaban',      value: 'coat'           },
                  { title: 'Deri Ceket',        value: 'leather-jacket' },
                  { title: 'Spor Ceket',        value: 'jacket'         },
                  { title: 'Sneaker',           value: 'sneakers'       },
                  { title: 'Bot / Çizme',       value: 'boots'          },
                  { title: 'Topuklu Ayakkabı',  value: 'heels'          },
                  { title: 'Sandalet',          value: 'sandals'        },
                  { title: 'Loafer / Babet',    value: 'loafers'        },
                  { title: 'Çanta',             value: 'bag'            },
                  { title: 'Şapka / Bere',      value: 'hat'            },
                  { title: 'Atkı / Fular',      value: 'scarf'          },
                  { title: 'Kemer',             value: 'belt'           },
                  { title: 'Güneş Gözlüğü',    value: 'sunglasses'     },
                  { title: 'Takı / Aksesuar',   value: 'jewelry'        },
                ],
              },
              validation: (r) => r.required().error('Öğe kategorisi zorunlu.'),
            }),

            defineField({
              name: 'description',
              title: 'Açıklama',
              type: 'string',
              description: '💡 Marka, malzeme veya önemli bir detay ekle. Örnek: "Zara, %100 pamuk", "H&M, oversized kesim", "Vintage deri, el bulgusu"\n📍 Kullanım: "Outfit Pieces" listesinde parça adının altında görünür.',
              validation: (r) => r.required().min(2).max(100).error('Açıklama 2–100 karakter arasında olmalı.'),
            }),

            defineField({
              name: 'image',
              title: 'Görsel',
              type: 'image',
              options: { hotspot: true },
              description: '💡 Sadece bu parçanın ürün fotoğrafını yükle (beyaz veya nötr arka plan tercihli). 4:5 oran idealdir.\n📍 Kullanım: "Shop the Look" bölümündeki alışveriş kartında görünür.',
              validation: (r) => r.required().error('Parça görseli zorunlu.'),
            }),

            defineField({
              name: 'affiliateUrl',
              title: 'Satın Alma Linki',
              type: 'url',
              description: '💡 Parçanın satıldığı sayfanın URL\'ini yapıştır. Affiliate link varsa onu kullan.\n📍 Kullanım: Görsele veya "Shop →" butonuna tıklandığında yeni sekmede açılır.',
              validation: (r) => r.required().error('Satın alma linki zorunlu.'),
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'colorTag', media: 'image' },
          },
        }),
      ],
      validation: (r) => r.min(2).error('En az 2 parça eklenmeli.'),
    }),

    // ── Etiketler ve tarih ────────────────────────────────────────────────────
    defineField({
      name: 'tags',
      title: 'Etiketler',
      type: 'array',
      description: '💡 Kombini tanımlayan anahtar kelimeler ekle. Enter\'a bas her etiket sonrası. Örnek: denim, neutral tones, layering, monochrome, oversized\n📍 Kullanım: İleride arama ve filtreleme için kullanılacak — ne kadar çok o kadar iyi.',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
      validation: (r) => r.min(2).error('En az 2 etiket girilmeli.'),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Yayın Tarihi',
      type: 'datetime',
      description: '💡 Boş bırakılırsa dökümanın oluşturulma tarihi otomatik kullanılır — genellikle boş bırakabilirsin.\n📍 Kullanım: İçerik sıralama ve SEO tarih bilgisinde kullanılır.',
    }),

    // ── İlgili aksesuarlar ────────────────────────────────────────────────────
    defineField({
      name: 'relatedAccessories',
      title: 'İlgili Aksesuarlar',
      type: 'array',
      description: '💡 Bu kombinde kullanılan veya kombin ile uyumlu aksesuar dökümanlarını seç. Seçilen aksesuarların detay sayfasında bu kombin "Bu Aksesuar Hangi Kombinlerde?" bölümünde görünür.\n📍 Kullanım: Aksesuar detay sayfasındaki outfit showcase bölümünde gösterilir.',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'accessory' }] })],
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
