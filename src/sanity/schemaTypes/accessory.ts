import { defineArrayMember, defineField, defineType } from 'sanity'
import { PackageIcon } from '@sanity/icons'

export const accessory = defineType({
  name: 'accessory',
  title: 'Accessory',
  type: 'document',
  icon: PackageIcon,
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
      type: 'string',
      title: 'Accessory Type',
      options: {
        list: [
          { title: 'Bags', value: 'bags' },
          { title: 'Jewelry', value: 'jewelry' },
          { title: 'Shoes', value: 'shoes' },
          { title: 'Belts', value: 'belts' },
          { title: 'Scarves', value: 'scarves' },
          { title: 'Hats', value: 'hats' },
          { title: 'Sunglasses', value: 'sunglasses' },
          { title: 'Watches', value: 'watches' },
        ],
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
        ],
      },
    }),
    defineField({ name: 'pairingTip', title: 'Pairing Tip', type: 'text', rows: 2 }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'title', media: 'image', type: 'type' },
    prepare({ title, media, type }) {
      return { title, media, subtitle: type }
    },
  },
})
