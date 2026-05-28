export type PieceThumbnail = {
  key: string
  name: string
  image?: string
  affiliateUrl?: string
}

// Kategori slug sayfalarında grid'e yerleştirilen tek bir içerik kartının tipi.
// Outfit, hairstyle ve accessory kartları bu ortak tip üzerinden CategoryPage'e aktarılır.
export type OutfitItem = {
  id: string | number;
  title: string;
  subtitle: string;
  tag: "Trending" | "New" | "Popular";
  style: string;
  image?: string;
  lqip?: string;
  href: string;
  pieces?: PieceThumbnail[];
};

// İlgili kategori kartı — "Similar Categories" bölümünde görünür, RelatedGrid bileşeni tarafından kullanılır.
export type RelatedCategory = {
  label: string;
  href: string;
  accent: string;
  accentText: string;
};

export type Faq = { q: string; a: string };

// CategoryPage bileşenine aktarılan tam sayfa verisi — hero, grid, filtreler, SSS ve SEO alanlarını içerir.
export type CategoryData = {
  label: string;
  subtitle: string;
  description: string;
  accent: string;
  accentText: string;
  tipTitle: string;
  tipBody: string;
  tipTags: string[];
  filters: string[];
  outfitGridLabel: string;
  styleGuideHref: string;
  stats: { value: string; label: string }[];
  outfits: OutfitItem[];
  relatedCategories: RelatedCategory[];
  faqs: Faq[];
  seo: { title: string; description: string; keywords: string[] };
};
