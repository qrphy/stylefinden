import type { CategoryData } from "@/types/outfit-category";
import ImgPlaceholder from "@/components/shared/ImgPlaceholder";
import RelatedGrid from "@/components/shared/RelatedGrid";
import StyleGuideSection from "@/components/shared/StyleGuideSection";

type Props = {
  data: CategoryData;
  editorialText: string[];
  heroImage?: string;
  slug: string;
  basePath: string;
  categoryLink: { label: string; href: string };
  readingTime?: string;
  styleGuideSuffix?: string;
};

export default function EditorialCategoryPage({
  data,
  editorialText,
  heroImage,
  slug: _slug,
  basePath: _basePath,
  categoryLink,
  readingTime = "4 min read",
  styleGuideSuffix = "find & style",
}: Props) {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Outfits", href: "/outfits" },
    { label: categoryLink.label, href: categoryLink.href },
    { label: data.label },
  ];

  return (
    <main className="flex-1 bg-white">

      {/* ── Article header — narrow, centered ── */}
      <div className="max-w-2xl mx-auto px-6 pt-8 pb-0 text-center">

        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="flex justify-center flex-wrap gap-x-2 gap-y-1 text-xs tracking-widest uppercase text-gray-400 mb-7">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden>›</span>}
              {crumb.href ? (
                <a href={crumb.href} className="py-1 hover:text-black transition-colors">{crumb.label}</a>
              ) : (
                <span className="text-black">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <span className="eyebrow block mb-5">{data.subtitle}</span>
        <h1 className="font-display font-light text-4xl md:text-5xl xl:text-6xl leading-tight tracking-tight text-black mb-5">
          {data.label}
        </h1>
        <p className="text-base text-gray-500 leading-relaxed max-w-xl mx-auto mb-6">
          {data.description}
        </p>

        {/* Meta bar */}
        <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-1 py-4 border-t border-b border-gray-100 text-xs text-gray-400 tracking-wide">
          <span>{readingTime}</span>
          <span aria-hidden>·</span>
          <span>{data.stats[0]?.value} looks</span>
          <span aria-hidden>·</span>
          <span className="font-semibold tracking-widest uppercase">{data.subtitle}</span>
        </div>

        <p className="mt-4 text-xs text-gray-400 leading-relaxed">
          When you purchase through links on our site, we may earn an affiliate commission.
        </p>
      </div>

      {/* ── Hero image ── */}
      {heroImage && (
        <div className="max-w-2xl mx-auto px-6 mt-10">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
            <ImgPlaceholder
              src={heroImage}
              alt={data.label}
              priority
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>
        </div>
      )}

      {/* ── Editorial intro text ── */}
      <div className="max-w-2xl mx-auto px-6 py-10 space-y-5">
        {editorialText.map((paragraph, i) => (
          <p key={i} className="text-base leading-loose text-gray-700">
            {paragraph}
          </p>
        ))}
      </div>

      {/* ── Outfit sections ── */}
      <div className="max-w-2xl mx-auto px-6 pb-16">
        {data.outfits.map((outfit, index) => (
          <section key={outfit.id} className="py-12 border-t border-gray-100 scroll-reveal">

            {/* Outfit image */}
            <a
              href={outfit.href}
              className="group block relative aspect-[3/4] max-w-xs mx-auto overflow-hidden bg-gray-100"
              aria-label={`View ${outfit.title}`}
            >
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.02]">
                <ImgPlaceholder
                  src={outfit.image}
                  alt={outfit.title}
                  sizes="(max-width: 768px) 80vw, 320px"
                />
              </div>
            </a>

            {/* Outfit meta */}
            <div className="text-center mt-6 mb-8">
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">
                {String(index + 1).padStart(2, "0")} — {data.subtitle}
              </p>
              <h2 className="font-display font-light text-2xl md:text-3xl text-black mb-4 leading-tight">
                {outfit.title}
              </h2>
              <div className="flex flex-wrap gap-2 justify-center">
                {outfit.style && <span className="tag">{outfit.style}</span>}
                <span className="tag">{outfit.tag}</span>
              </div>
            </div>

            {/* Pieces grid */}
            {outfit.pieces && outfit.pieces.length > 0 && (
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase border-b border-black pb-2 inline-block mb-5">
                  Shop the Look
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {outfit.pieces.map((piece) => {
                    const card = (
                      <div className="flex flex-col gap-2.5">
                        <div className="relative aspect-square bg-gray-100 overflow-hidden">
                          <ImgPlaceholder
                            src={piece.image}
                            alt={piece.name}
                            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 200px, 160px"
                          />
                        </div>
                        <p className="text-xs font-semibold tracking-widest uppercase text-gray-600 text-center leading-snug line-clamp-2">
                          {piece.name}
                        </p>
                        {piece.affiliateUrl && (
                          <span className="block text-center text-xs font-semibold tracking-widest uppercase bg-black text-white py-2.5 hover:bg-gray-800 transition-colors">
                            Shop Now
                          </span>
                        )}
                      </div>
                    );
                    return piece.affiliateUrl ? (
                      <a
                        key={piece.key}
                        href={piece.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        aria-label={`Shop ${piece.name}`}
                      >
                        {card}
                      </a>
                    ) : (
                      <div key={piece.key}>{card}</div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* View outfit CTA */}
            <div className="text-center mt-8">
              <a
                href={outfit.href}
                className="text-xs font-semibold tracking-widest uppercase border-b border-black pb-0.5 hover:text-gray-500 transition-colors"
              >
                View Full Outfit →
              </a>
            </div>

          </section>
        ))}
      </div>

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
