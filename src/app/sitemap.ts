import type { MetadataRoute } from "next"
import { client } from "@/sanity/lib/client"
import { STYLE_PROFILES } from "@/lib/style-profiles"

const base = "https://stylefinden.com"

type SlugResult = { slug: string; updatedAt?: string }

async function fetchSlugs(type: string): Promise<SlugResult[]> {
  return client.withConfig({ useCdn: false }).fetch<SlugResult[]>(
    `*[_type == $type && defined(slug.current)] | order(_updatedAt desc) { "slug": slug.current, "updatedAt": _updatedAt }`,
    { type }
  )
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [outfits, hairstyles, accessories, trends, posts] = await Promise.all([
    fetchSlugs("outfit"),
    fetchSlugs("hairstyle"),
    fetchSlugs("accessory"),
    fetchSlugs("trend"),
    fetchSlugs("post"),
  ])

  const toEntry = (path: string, slug: string, updatedAt?: string, priority = 0.8): MetadataRoute.Sitemap[number] => ({
    url: `${base}/${path}/${slug}`,
    lastModified: updatedAt ? new Date(updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority,
  })

  return [
    // ── Core pages ───────────────────────────────────────────────────────────
    { url: base,                                    lastModified: new Date(), changeFrequency: "daily",   priority: 1   },
    { url: `${base}/outfits`,                       lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${base}/hairstyles`,                    lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/accessories`,                   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/trends`,                        lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
    { url: `${base}/blog`,                          lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
    { url: `${base}/style-quiz`,                    lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    // ── Style quiz result pages ──────────────────────────────────────────────
    ...Object.keys(STYLE_PROFILES).map((style) => ({
      url: `${base}/style-quiz/result/${style}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // ── Outfit categories ────────────────────────────────────────────────────
    { url: `${base}/outfits/season/summer`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/outfits/season/winter`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/outfits/season/spring`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/outfits/style/boho`,            lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    { url: `${base}/outfits/style/minimalist`,      lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    { url: `${base}/outfits/style/streetstyle`,     lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    { url: `${base}/outfits/occasion/office`,       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    { url: `${base}/outfits/occasion/evening`,      lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    // ── Hairstyle categories ─────────────────────────────────────────────────
    { url: `${base}/hairstyles/type/braids`,        lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    { url: `${base}/hairstyles/type/buns`,          lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    { url: `${base}/hairstyles/type/waves`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    { url: `${base}/hairstyles/type/curls`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    { url: `${base}/hairstyles/occasion/everyday`,  lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    { url: `${base}/hairstyles/occasion/wedding`,   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    { url: `${base}/hairstyles/occasion/party`,     lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    { url: `${base}/hairstyles/occasion/office`,    lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    // ── Accessory categories ─────────────────────────────────────────────────
    { url: `${base}/accessories/type/bags`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    { url: `${base}/accessories/type/jewelry`,      lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    { url: `${base}/accessories/type/shoes`,        lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    { url: `${base}/accessories/type/scarves`,      lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    // ── Blog categories ──────────────────────────────────────────────────────
    { url: `${base}/blog/trend-reports`,            lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    { url: `${base}/blog/hairstyle-guides`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    { url: `${base}/blog/accessories-guides`,       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    { url: `${base}/blog/occasion-guides`,          lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    { url: `${base}/blog/seasonal-guides`,          lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    // ── Utility ──────────────────────────────────────────────────────────────
    { url: `${base}/contact`,                       lastModified: new Date(), changeFrequency: "yearly",  priority: 0.4 },
    { url: `${base}/legal`,                         lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/privacy`,                       lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    // ── Dynamic — Sanity content ─────────────────────────────────────────────
    ...outfits.map(({ slug, updatedAt })     => toEntry("outfits",     slug, updatedAt, 0.8)),
    ...hairstyles.map(({ slug, updatedAt })  => toEntry("hairstyles",  slug, updatedAt, 0.7)),
    ...accessories.map(({ slug, updatedAt }) => toEntry("accessories", slug, updatedAt, 0.7)),
    ...trends.map(({ slug, updatedAt })      => toEntry("trends",      slug, updatedAt, 0.7)),
    ...posts.map(({ slug, updatedAt })       => toEntry("blog",        slug, updatedAt, 0.7)),
  ]
}
