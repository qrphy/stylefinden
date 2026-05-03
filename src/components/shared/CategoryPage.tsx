// Paylaşılan kategori sayfası düzeni — tüm outfit/hairstyle/accessory kategori slug sayfaları bu bileşeni kullanır.
// Hero, filtre çubuğu, item grid'i, ilgili kategoriler ve SSS + Style Guide bölümlerini içerir.
// Sayfanın tüm içeriği data prop'u üzerinden gelir; bileşen tamamen "dumb" (sadece render eder).
import type { CategoryData } from "@/types/outfit-category";
import Breadcrumb from "@/components/shared/Breadcrumb";
import FilterBar from "@/components/shared/FilterBar";
import RelatedGrid from "@/components/shared/RelatedGrid";
import StyleGuideSection from "@/components/shared/StyleGuideSection";
import { tagColors } from "@/constants/site";
import ImgPlaceholder from "@/components/shared/ImgPlaceholder";

type Props = {
  data: CategoryData;
  slug: string;
  basePath: string;
  categoryLink: { label: string; href: string };
  heroSuffix?: string;
  tipSuffix?: string;
  styleGuideSuffix?: string;
};

export default function CategoryPage({
  data,
  slug,
  basePath,
  categoryLink,
  heroSuffix = "Outfits & Looks",
  tipSuffix = "timeless elegance.",
  styleGuideSuffix = "find & style",
}: Props) {
  const loadMoreParam = basePath.split("/").pop()!;
  // Beyaz zemin üzerinde beyaz metin okunamaz; bu kontrol renk güvenliğini sağlar.
  const safeAccentText = data.accentText === "text-white" ? "text-gray-400" : data.accentText;
  const safeAccentTextMuted = data.accentText === "text-white" ? "text-gray-500" : data.accentText;
  const safeBadgeClasses = data.accentText === "text-white"
    ? "bg-gray-100 text-gray-700"
    : `${data.accent} ${data.accentText}`;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: categoryLink.href.split("/")[1].charAt(0).toUpperCase() + categoryLink.href.split("/")[1].slice(1), href: `/${categoryLink.href.split("/")[1]}` },
    { label: categoryLink.label, href: categoryLink.href },
    { label: data.label },
  ];

  return (
    <main className="flex-1 bg-white">

      <Breadcrumb items={breadcrumbItems} />

      {/* ── Hero ── */}
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-16 xl:py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-16">

            <div className="flex flex-col gap-5 md:max-w-xl xl:max-w-2xl">
              <span className={`text-xs font-semibold tracking-widest uppercase ${safeAccentText}`}>
                {data.subtitle}
              </span>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-black leading-tight tracking-tight">
                {data.label} <br />
                <span className="italic font-light">{heroSuffix}</span>
              </h1>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-lg">
                {data.description}
              </p>
              <div className="flex items-center gap-8 pt-4 border-t border-gray-100">
                {data.stats.map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-8">
                    {i > 0 && <div className="w-px h-8 bg-gray-200" />}
                    <div className="flex flex-col">
                      <span className="text-xl font-black text-black">{stat.value}</span>
                      <span className="text-xs tracking-widest uppercase text-gray-400">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Accent Card */}
            <div className={`hidden md:flex flex-col gap-3 ${data.accent} border border-gray-100 p-8 xl:p-10 w-full md:w-80 xl:w-96 flex-shrink-0`}>
              <span className={`text-xs font-semibold tracking-widest uppercase ${safeAccentTextMuted}`}>
                Style Tip
              </span>
              <p className="text-sm md:text-base font-black text-black leading-snug tracking-tight">
                {data.tipTitle}<br />
                <span className="italic font-light">{tipSuffix}</span>
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">{data.tipBody}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {data.tipTags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium tracking-widest uppercase bg-white text-gray-700 border border-gray-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <FilterBar filters={data.filters} basePath={basePath} slug={slug} />

      {/* ── Item Grid ── */}
      <section className="w-full border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-16">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">Curated Selection</span>
              <h2 className="text-2xl md:text-3xl font-black text-black tracking-tight">{data.outfitGridLabel}</h2>
            </div>
            <a
              href={`/${categoryLink.href.split("/")[1]}`}
              className="self-start sm:self-auto flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-600 hover:text-black transition-colors duration-200 group"
            >
              View All
              <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current group-hover:translate-x-1 transition-transform duration-200" fill="none" strokeWidth={2}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {data.outfits.map((item) => (
              <a key={item.id} href={item.href} className="group flex flex-col gap-3">
                <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                  <ImgPlaceholder src={item.image || undefined} alt={item.title} />
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200 -z-10" />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className={`px-2 py-1 text-xs font-semibold tracking-widest uppercase ${tagColors[item.tag]}`}>
                      {item.tag}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold tracking-widest uppercase ${safeBadgeClasses}`}>
                      {item.style}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <div className="flex flex-col gap-0.5 px-0.5">
                  <h3 className="text-sm font-black text-black tracking-tight group-hover:text-gray-600 transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-xs tracking-widest uppercase text-gray-400">{item.subtitle}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <a
              href={`/${categoryLink.href.split("/")[1]}?${loadMoreParam}=${slug}`}
              className="px-10 py-3 border border-black text-black text-xs font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-200"
            >
              Load More {data.label}
            </a>
          </div>

        </div>
      </section>

      <RelatedGrid items={data.relatedCategories} />

      <StyleGuideSection
        faqs={data.faqs}
        label={data.label}
        description={data.description}
        styleGuideHref={data.styleGuideHref}
        styleGuideSuffix={styleGuideSuffix}
      />

    </main>
  );
}
