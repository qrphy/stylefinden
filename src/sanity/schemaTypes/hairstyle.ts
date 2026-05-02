import { defineArrayMember, defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const hairstyle = defineType({
  name: 'hairstyle',
  title: 'Hairstyle',
  type: 'document',
  icon: UserIcon,
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
      name: 'type',
      title: 'Hair Type',
      type: 'string',
      options: {
        list: [
          { title: 'Straight', value: 'straight' },
          { title: 'Wavy', value: 'wavy' },
          { title: 'Curly', value: 'curly' },
          { title: 'Coily', value: 'coily' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'length',
      type: 'string',
      options: {
        list: [
          { title: 'Short', value: 'short' },
          { title: 'Medium', value: 'medium' },
          { title: 'Long', value: 'long' },
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
          { title: 'Special Occasion', value: 'special' },
          { title: 'Bridal', value: 'bridal' },
        ],
      },
    }),
    defineField({
      name: 'mood',
      type: 'string',
      options: {
        list: [
          { title: 'Casual', value: 'casual' },
          { title: 'Formal', value: 'formal' },
          { title: 'Editorial', value: 'editorial' },
          { title: 'Romantic', value: 'romantic' },
        ],
      },
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
  ],
  preview: {
    select: { title: 'title', media: 'image', type: 'type', length: 'length' },
    prepare({ title, media, type, length }) {
      return { title, media, subtitle: [length, type].filter(Boolean).join(' · ') }
    },
  },
})
