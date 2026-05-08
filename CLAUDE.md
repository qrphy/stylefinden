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

## Değişiklik özeti — zorunlu

**Her yanıtın sonunda, dosya değiştirildiyse veya komut çalıştırıldıysa şu formatı kullan:**

```
---
**Ne değişti:** [değiştirilen dosya/dosyalar]
**Ne eklendi / ne yapıldı:** [kısa açıklama]
**Neden:** [sebep — kullanıcının isteği veya teknik gereklilik]
**Ne işe yarayacak:** [kullanıcıya somut faydası]
```

Eğer sadece soru yanıtlandıysa ve hiçbir şey değişmediyse bu bölümü ekleme.

## Agent ve Skill Yönlendirme

Tüm agent'lar `.claude/agents/`, skill'ler `.claude/skills/` altında. Aşağıdaki koşullar oluştuğunda ilgili agent'ı oku ve o rolü üstlen ya da skill'i çalıştır.

### İçerik ve koleksiyon yönetimi

| Koşul | Agent / Skill |
|-------|--------------|
| Yeni occasion, style, trend, blog kategorisi eklenecek | `collection-manager` agent |
| Koleksiyon ekleme rehberi isteniyor | `/new-outfit-collection` skill |

### Geliştirme akışı

| Koşul | Agent / Skill |
|-------|--------------|
| Yeni özellik, sayfa veya bileşen yazılacak | Önce `planner` → sonra `ui-agent` (UI varsa) → sonra `builder` |
| Sadece backend/API yazılacak | `planner` → `builder` |
| Kod yazıldı veya değiştirildi | `reviewer` + `/code-review` skill |
| Yeni bileşen tasarımı kararı gerekiyor | `ui-designer` → `ui-agent` |
| Karmaşık UI/UX kararı | `/ui-ux-pro-max` skill |
| Frontend geliştirme (Next.js, React, Tailwind) | `frontend-developer` |
| Test yazılacak | `/tdd` skill + `builder` |

### Frontend test ve kalite

| Koşul | Agent / Skill |
|-------|--------------|
| Frontend audit, hata tarama, deploy öncesi kontrol | `/frontend-audit` skill |
| Sadece tespit, düzeltme yok | `/frontend-audit --detect` |
| Tespit edilen hatalar düzeltilecek | `frontend-fixer` agent |
| TypeScript/build/tasarım ihlalleri taranacak | `frontend-tester` agent |

### Hata ayıklama

| Koşul | Agent |
|-------|-------|
| Hata mesajı veya beklenmedik davranış | `debugger` |
| Spesifik bir hata pattern'i (TypeError, 404, hydration) | `error-detective` |

### Dokümantasyon

| Koşul | Agent |
|-------|-------|
| Yeni sayfa, bileşen veya API için açıklama gerekiyor | `technical-writer` |
| Mühendislik kararı belgelenecek | `documentation-engineer` |
| README güncellenecek | `readme-generator` |

### Tasarım ve araştırma

| Koşul | Agent / Skill |
|-------|--------------|
| Frontend tasarım kararı | `/frontend-design` skill |
| SEO incelemesi | `/seo` skill |
| Yeni skill oluşturulacak | `/skill-creator` skill |
| MCP server geliştirme | `mcp-developer` |

### Çoklu agent koordinasyonu

Birden fazla agent aynı anda çalışacaksa `multi-agent-coordinator`'ı devreye al.

---

## Bilgi havuzu

**Vault:** `/Users/furkan/style-finden` (Obsidian)

Her yeni oturumun başında `index.md`'yi oku. Projenin mevcut durumu, mimari kararlar, açık işler ve bilinen sorunlar oradadır. Kod okumadan önce vault'a bak — büyük ihtimalle cevap zaten oradadır.

Vault güncellemesi: Yeni bir bileşen, karar, sorun veya önemli değişiklik yaptığında ilgili vault sayfasını güncelle veya oluştur.
