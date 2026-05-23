import type { CategoryData, OutfitItem } from "@/types/outfit-category";
import ImgPlaceholder from "@/components/shared/ImgPlaceholder";
import RelatedGrid from "@/components/shared/RelatedGrid";
import StyleGuideSection from "@/components/shared/StyleGuideSection";
import type { ConversionConfig } from "@/components/shared/ConversionCategoryPage";

type Props = {
  data: CategoryData;
  config: ConversionConfig;
  slug: string;
  basePath: string;
  categoryLink: { label: string; href: string };
  styleGuideSuffix?: string;
};

export default function OutfitGridCategoryPage({
  data,
  config,
  slug: _slug,
  basePath: _basePath,
  categoryLink,
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

      {/* ── Hero ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 pt-8 pb-6">
        <nav aria-label="breadcrumb" className="flex flex-wrap gap-x-2 gap-y-1 text-xs tracking-widest uppercase text-gray-400 mb-6">
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

        <h1 className="font-display font-light text-4xl md:text-5xl leading-tight tracking-tight text-black mb-3">
          {data.label}
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
          {data.description}
        </p>
      </section>

      {/* ── Outfit grid — 3 columns ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-12">
          {data.outfits.map((outfit) => (
            <OutfitCard key={outfit.id} outfit={outfit} subtitle={data.subtitle} />
          ))}
        </div>
      </section>

      {/* ── Short intro ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-7 border-t border-gray-100">
        <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
          {config.introText}
        </p>
        <p className="mt-3 text-xs text-gray-400">
          When you purchase through links on our site, we may earn an affiliate commission.
        </p>
      </div>

      {/* ── Variations ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-10 border-t border-gray-100">
        <p className="text-xs font-semibold tracking-widest uppercase mb-5">
          More {data.label} Ideas
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {config.variations.map((v, i) => (
            <li key={i} className="flex items-start gap-3 py-3 border-b border-gray-100 text-sm text-gray-700">
              <span className="text-gray-300 text-xs shrink-0 mt-0.5 font-mono tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              {v}
            </li>
          ))}
        </ul>
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

function OutfitCard({ outfit, subtitle }: { outfit: OutfitItem; subtitle: string }) {
  return (
    <article>
      {/* Outfit image */}
      <a
        href={outfit.href}
        className="group block relative aspect-[3/4] w-full overflow-hidden bg-gray-100"
        aria-label={`View ${outfit.title}`}
      >
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.02]">
          <ImgPlaceholder
            src={outfit.image}
            alt={outfit.title}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </a>

      {/* Outfit name */}
      <div className="mt-4">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-1">
          {subtitle}
        </p>
        <a
          href={outfit.href}
          className="block font-black text-sm uppercase tracking-wide text-black hover:text-gray-500 transition-colors leading-snug"
        >
          {outfit.title}
        </a>
      </div>

      {/* Shop the look */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-2">
          Shop the Look
        </p>
        <div className="flex items-center gap-2">
          {outfit.pieces && outfit.pieces.length > 0 ? (
            <>
              {outfit.pieces.slice(0, 4).map((piece) =>
                piece.affiliateUrl ? (
                  <a
                    key={piece.key}
                    href={piece.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    aria-label={`Shop ${piece.name}`}
                    className="shrink-0 w-12 h-12 relative bg-gray-100 overflow-hidden hover:opacity-75 transition-opacity"
                    title={piece.name}
                  >
                    <ImgPlaceholder src={piece.image} alt={piece.name} sizes="48px" />
                  </a>
                ) : (
                  <div
                    key={piece.key}
                    className="shrink-0 w-12 h-12 relative bg-gray-100 overflow-hidden"
                    title={piece.name}
                  >
                    <ImgPlaceholder src={piece.image} alt={piece.name} sizes="48px" />
                  </div>
                )
              )}
              {outfit.pieces.length > 4 && (
                <div className="shrink-0 w-12 h-12 bg-gray-100 flex items-center justify-center">
                  <span className="text-[10px] font-semibold text-gray-400">+{outfit.pieces.length - 4}</span>
                </div>
              )}
            </>
          ) : (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="shrink-0 w-12 h-12 bg-gray-100" />
            ))
          )}
        </div>
      </div>
    </article>
  );
}
