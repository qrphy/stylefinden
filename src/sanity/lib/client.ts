// Sanity içerik istemcisi — CDN ile hızlandırılmış salt-okuma sorguları için kullanılır.
// useCdn: true → üretim ortamında Sanity CDN üzerinden önbelleklenmiş yanıt alır.
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})
