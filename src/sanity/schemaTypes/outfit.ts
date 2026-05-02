import { defineArrayMember, defineField, defineType } from 'sanity'
import { TagIcon } from '@sanity/icons'

export const outfit = defineType({
  name: 'outfit',
  title: 'Outfit',
  type: 'document',
  icon: TagIcon,
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
      name: 'style',
      type: 'string',
      options: {
        list: [
          { title: 'Casual', value: 'casual' },
          { title: 'Formal', value: 'formal' },
          { title: 'Streetwear', value: 'streetwear' },
          { title: 'Elegant', value: 'elegant' },
          { title: 'Boho', value: 'boho' },
          { title: 'Sporty', value: 'sporty' },
          { title: 'Vintage', value: 'vintage' },
        ],
      },
    }),
    defineField({
      name: 'season',
      type: 'string',
      options: {
        list: [
          { title: 'Spring', value: 'spring' },
          { title: 'Summer', value: 'summer' },
          { title: 'Fall', value: 'fall' },
          { title: 'Winter', value: 'winter' },
          { title: 'All Season', value: 'all-season' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'occasion',
      type: 'string',
      options: {
        list: [
          { title: 'Everyday', value: 'everyday' },
          { title: 'Work', value: 'work' },
          { title: 'Evening', value: 'evening' },
          { title: 'Casual', value: 'casual' },
          { title: 'Special Occasion', value: 'special' },
          { title: 'Outdoor', value: 'outdoor' },
        ],
      },
    }),
    defineField({
      name: 'pieces',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'description', type: 'string' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'title', media: 'image', style: 'style', season: 'season' },
    prepare({ title, media, style, season }) {
      return { title, media, subtitle: [style, season].filter(Boolean).join(' · ') }
    },
  },
})
