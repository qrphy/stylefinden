# New Collection

## When to trigger
- User wants to add a new collection to any config-driven system
- Keywords: "yeni koleksiyon", "koleksiyon ekle", "add collection", "new occasion", "new style", "new trend", "yeni occasion", "yeni stil", "yeni trend", "yeni blog kategori"
- User invokes `/new-outfit-collection` or `/new-collection`

## Context
Stylefinden has 6 config-driven collection dimensions. Each has ONE central config file:

| Dimension | Config file | Order array |
|-----------|-------------|-------------|
| Outfit occasion | `src/lib/outfit-occasion-config.ts` | `OCCASION_ORDER` |
| Outfit style | `src/lib/outfit-style-config.ts` | `STYLE_ORDER` |
| Trend season | `src/lib/trend-collection-config.ts` | `TREND_SEASON_ORDER` |
| Trend aesthetic | `src/lib/trend-collection-config.ts` | `TREND_AESTHETIC_ORDER` |
| Trend category | `src/lib/trend-collection-config.ts` | `TREND_CATEGORY_ORDER` |
| Blog category | `src/lib/blog-category-config.ts` | (no order — all shown) |

Adding to the config automatically updates:
- Main page collection cards
- Dimension index page (`/outfits/occasion`, `/trends/aesthetic`, etc.)
- Full category page at `/{section}/{dimension}/{slug}`
- `generateStaticParams` picks it up on next build

## Use the collection-manager agent

For the best experience, **delegate to the `collection-manager` agent**:
- It reads existing entries and generates all content fields automatically
- No need to manually specify every field
- Just tell it: dimension + slug + brief description

The agent handles: label, description, accent colors, SEO, highlights/FAQs, Sanity schema update, TypeScript check.

## Manual steps (if not using agent)

### 1. Identify dimension and gather info
Ask the user:
- **Dimension**: occasion / style / trend-season / trend-aesthetic / trend-category / blog-category?
- **Slug**: URL-safe value matching Sanity enum exactly (e.g. `outdoor-wedding`, `maximalist`)
- **Label**: Display name (e.g. "Outdoor Wedding", "Maximalist")
- **Short description**: 1 sentence for the collection card
- **Tags**: 4 tags for the card

### 2. Update Sanity schema enum (outfit/trend dimensions only)

**Outfit occasion** → `src/sanity/schemaTypes/outfit.ts`, `occasion` field options.list
**Outfit style** → `src/sanity/schemaTypes/outfit.ts`, `style` field options.list
**Trend category** → `src/sanity/schemaTypes/trend.ts`, `category` field options.list

Example: `{ title: 'Outdoor Wedding', value: 'outdoor-wedding' }`

Blog categories and trend seasons/aesthetics do NOT need a Sanity schema change.

### 3. Add to config file

**Outfit occasion** → `src/lib/outfit-occasion-config.ts`:
- Add slug to `OCCASION_ORDER`
- Add full `OccasionConfig` entry to `OCCASION_CONFIGS` (see existing entries for shape — includes label, subtitle, description, accent, accentText, tipTitle, tipBody, tipTags, filters, outfitGridLabel, styleGuideHref, stats, relatedCategories, faqs, seo, card, staticFallback)

**Outfit style** → `src/lib/outfit-style-config.ts`: same structure

**Trend season/aesthetic/category** → `src/lib/trend-collection-config.ts`:
- Add slug to the relevant ORDER array
- Add `TrendCollectionConfig` entry (label, description, accent, accentText, seo, card, highlights, optionally sanityFilter)

**Blog category** → `src/lib/blog-category-config.ts`:
- Add `BlogCategoryConfig` entry to `BLOG_CATEGORY_CONFIGS` (label, description, seo)
- Create directory + page files: `src/app/blog/[slug]/page.tsx` and `src/app/blog/[slug]/[post-slug]/page.tsx`

### 4. Verify
```bash
npx tsc --noEmit
```

### 5. Commit & deploy
- Commit: `feat(collections): add [slug] [dimension] collection`
- Deploy with `/deploy` or `vercel --prod`

## Result

Adding ONE entry to ONE config file causes:
- ✓ Collection card appears on main section page
- ✓ Collection card appears on dimension index page
- ✓ Full category page live
- ✓ Sanity content with that slug value fetched automatically

## Notes
- `makeDefault*` functions ensure unknown slugs never 404 — generic page renders as fallback
- Slug must match Sanity enum value exactly (case-sensitive, no spaces)
- `staticFallback` is optional for outfit configs (omit if real Sanity content is coming soon)
