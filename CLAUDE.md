# Stylefinden — Claude Code Talimatları

## Proje

Next.js 16 App Router + Sanity CMS + Vercel tabanlı moda içerik platformu.
Minimalist siyah/beyaz tasarım dili, Türkçe içerik yönetimi, İngilizce site.

## Tech stack

- **Framework:** Next.js 16.2 App Router, TypeScript, Tailwind CSS
- **CMS:** Sanity v5 (Project ID: `29dp442n`, dataset: `production`)
- **Deploy:** Vercel (production: stylefinden.com)
- **AI:** @ai-sdk/anthropic, claude-sonnet-4-6 — direkt Anthropic key ile
- **Email:** Resend + Audience
- **Görsel:** next/image + Sanity CDN (urlFor)

## Kritik dosyalar

| Dosya | Ne işe yarıyor |
|-------|----------------|
| `src/lib/queries.ts` | Tüm GROQ sorguları — buraya merkezi |
| `src/lib/sanity-fetchers.ts` | React.cache() + ISR fetcher'ları |
| `src/lib/rate-limit.ts` | IP tabanlı rate limiter |
| `src/sanity/schemaTypes/` | Sanity şema tanımları |
| `src/app/api/` | API route'ları (generate-*, revalidate, subscribe) |
| `src/components/shared/ImgPlaceholder.tsx` | Tek görsel bileşeni |
| `sanity.config.ts` | Sanity Studio konfigürasyonu |

## Tasarım sistemi — kesinlikle uy

- **Renkler:** Yalnızca siyah/beyaz/gri — `bg-black`, `text-gray-*`, `border-gray-*`
- **Köşeler:** Asla `rounded-*` — tüm elementler keskin köşeli
- **Gölge:** Asla `shadow-*`
- **Tipografi:** `font-black` başlıklar, `text-xs font-semibold tracking-widest uppercase` etiketler
- **Container:** `max-w-7xl mx-auto px-6 md:px-8 xl:px-12`
- **Görsel:** Daima `ImgPlaceholder` — asla raw `<img>` veya direktif `next/image` kullanma

## Kod kuralları

- Sanity içerik ekleme: `mcp__Sanity__create_documents_from_json` + `mcp__Sanity__publish_documents`
- Yeni GROQ sorgusu: `src/lib/queries.ts`'e `defineQuery` ile ekle
- Yeni detay sayfası fetcher'ı: `src/lib/sanity-fetchers.ts`'de `cache()` ile tanımla
- Hero görseli: daima `priority` prop
- AI generate endpoint: rate limiter ekle, Zod ile validate et

## Stylefinden'e özgü agent yönlendirme

| Koşul | Agent / Skill |
|-------|--------------|
| Sanity'e içerik eklenecek | `sanity-creator` agent |
| GROQ sorgusu yazılacak/güncellenecek | `groq-writer` agent |
| Yeni occasion, style, trend, blog kategorisi eklenecek | `collection-manager` agent |
| Koleksiyon ekleme rehberi isteniyor | `/new-outfit-collection` skill |
| Tasarım sistemi ihlali kontrol edilecek | `style-guard` agent |
| SEO audit (Stylefinden sayfaları) | `seo-auditor` agent |
| Affiliate link eksiklikleri | `affiliate-auditor` agent |
| CMS içerik kalitesi | `content-auditor` agent |
| Görsel eksiklik/kalite | `image-auditor` agent |
| Outfit parça etiketleme | `piece-enricher` agent |

## Bilgi havuzu

**Vault:** `/Users/furkan/brain/projects/stylefinden` (Obsidian — Brain vault'u içinde)

Her yeni oturumun başında `index.md`'yi oku. Projenin mevcut durumu, mimari kararlar, açık işler ve bilinen sorunlar oradadır. Kod okumadan önce vault'a bak — büyük ihtimalle cevap zaten oradadır.

Vault güncellemesi: Yeni bir bileşen, karar, sorun veya önemli değişiklik yaptığında ilgili vault sayfasını güncelle veya oluştur.
