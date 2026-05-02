import { defineArrayMember, defineField, defineType } from 'sanity'
import { SparklesIcon } from '@sanity/icons'

export const trend = defineType({
  name: 'trend',
  title: 'Trend',
  type: 'document',
  icon: SparklesIcon,
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
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
    }),
    defineField({
      name: 'season',
      type: 'string',
      options: {
        list: [
          { title: 'Spring / Summer', value: 'spring-summer' },
          { title: 'Fall / Winter', value: 'fall-winter' },
          { title: 'Year-Round', value: 'year-round' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          { title: 'Fashion', value: 'fashion' },
          { title: 'Accessories', value: 'accessories' },
          { title: 'Hairstyle', value: 'hairstyle' },
          { title: 'Beauty', value: 'beauty' },
        ],
      },
    }),
    defineField({
      name: 'keyItems',
      title: 'Key Items',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'title', media: 'image', category: 'category', season: 'season' },
    prepare({ title, media, category, season }) {
      return { title, media, subtitle: [category, season].filter(Boolean).join(' · ') }
    },
  },
})
