export type OutfitItem = {
  id: number;
  title: string;
  subtitle: string;
  tag: "Trending" | "New" | "Popular";
  style: string;
  image: string;
  href: string;
};

export type RelatedCategory = {
  label: string;
  href: string;
  accent: string;
  accentText: string;
};

export type Faq = { q: string; a: string };

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
