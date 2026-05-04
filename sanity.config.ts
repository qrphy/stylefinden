import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schemaTypes } from './src/sanity/schemaTypes'
// Yapay zeka içerik üretme eklentisi — her içerik türüne "Generate with AI" butonu ekler
import { aiGeneratePlugin } from './src/sanity/plugins/ai-generate'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: apiVersion }),
    aiGeneratePlugin(),
  ],
})
