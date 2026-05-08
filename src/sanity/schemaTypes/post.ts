// Blog post dökümanı — makale detay sayfaları ve blog listeleme için tek kaynak.
// body alanı Portable Text blokları içerir; relatedOutfits/Accessories/Hairstyles ilgili içeriklere referans verir.
import { defineArrayMember, defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      rows: 3,
      validation: (r) => r.max(200).warning('Keep under 200 characters for best SEO'),
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
    }),
    defineField({
      name: 'category',
      type: 'string',
      validation: (r) => r.required(),
      options: {
        list: [
          { title: 'Accessories Guides', value: 'accessories-guides' },
          { title: 'Hairstyle Guides', value: 'hairstyle-guides' },
          { title: 'Occasion Guides', value: 'occasion-guides' },
          { title: 'Seasonal Guides', value: 'seasonal-guides' },
          { title: 'Trend Reports', value: 'trend-reports' },
        ],
      },
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
            defineField({ name: 'caption', type: 'string' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'relatedOutfits',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'outfit' }] })],
    }),
    defineField({
      name: 'relatedAccessories',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'accessory' }] })],
    }),
    defineField({
      name: 'relatedHairstyles',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'hairstyle' }] })],
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      initialValue: false,
      description: "Editor's Pick — öne çıkan yazılarda gösterilir",
    }),
  ],
  preview: {
    select: { title: 'title', media: 'heroImage', category: 'category', publishedAt: 'publishedAt' },
    prepare({ title, media, category, publishedAt }) {
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString() : ''
      return { title, media, subtitle: [category, date].filter(Boolean).join(' · ') }
    },
  },
})
