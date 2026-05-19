// Paylaşılan kategori sayfası düzeni — tüm outfit/hairstyle/accessory kategori slug sayfaları bu bileşeni kullanır.
// Hero, filtre çubuğu, item grid'i, ilgili kategoriler ve SSS + Style Guide bölümlerini içerir.
// Sayfanın tüm içeriği data prop'u üzerinden gelir; bileşen tamamen "dumb" (sadece render eder).
import type { CategoryData } from "@/types/outfit-category";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Button from "@/components/shared/Button";
import FilterBar from "@/components/shared/FilterBar";
import RelatedGrid from "@/components/shared/RelatedGrid";
import StyleGuideSection from "@/components/shared/StyleGuideSection";
import { tagColors } from "@/constants/site";
import ImgPlaceholder from "@/components/shared/ImgPlaceholder";
import PieceThumbnailStrip from "@/components/outfits/PieceThumbnailStrip";

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
        <div className="container-page py-12 md:py-16 xl:py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-16">

            <div className="flex flex-col gap-5 md:max-w-xl xl:max-w-2xl">
              <span className={`text-xs font-semibold tracking-widest uppercase ${safeAccentText}`}>
                {data.subtitle}
              </span>
              <h1 className="hero-heading">
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
                      <span className="font-display text-2xl font-light text-black">{stat.value}</span>
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
              <p className="text-sm md:text-base font-semibold text-black leading-snug tracking-tight">
                {data.tipTitle}<br />
                <span className="italic font-light">{tipSuffix}</span>
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">{data.tipBody}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {data.tipTags.map((tag) => (
                  <span key={tag} className="tag">
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
      <section className="w-full section-divider">
        <div className="container-page py-12 md:py-16">

          <div className="section-header mb-10">
            <div className="flex flex-col gap-2">
              <span className="eyebrow">Curated Selection</span>
              <h2 className="section-title">{data.outfitGridLabel}</h2>
            </div>
            <Button
              variant="ghost"
              href={`/${categoryLink.href.split("/")[1]}`}
              arrow
              className="self-start sm:self-auto shrink-0"
            >
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {data.outfits.map((item) => (
              <a key={item.id} href={item.href} className="group flex flex-col gap-3">
                <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                  <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.02]">
                    <ImgPlaceholder src={item.image || undefined} alt={item.title} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200 -z-10" />
                  <div className="absolute bottom-3 left-3 sm:bottom-auto sm:top-3 flex flex-col gap-1.5">
                    <span className={`px-2 py-1 text-xs font-semibold tracking-widest uppercase ${tagColors[item.tag]}`}>
                      {item.tag}
                    </span>
                    <span className={`hidden sm:inline-block px-2 py-1 text-xs font-semibold tracking-widest uppercase ${safeBadgeClasses}`}>
                      {item.style}
                    </span>
                  </div>
                  <div className="card-overlay" />
                </div>
                <div className="flex flex-col gap-1.5 px-0.5">
                  <h3 className="card-title line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs tracking-widest uppercase text-gray-400 line-clamp-1">{item.subtitle}</p>
                  <PieceThumbnailStrip pieces={item.pieces} />
                </div>
              </a>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button variant="outline" href={`/${categoryLink.href.split("/")[1]}?${loadMoreParam}=${slug}`} size="lg">
              Load More {data.label}
            </Button>
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
