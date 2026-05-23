import type { CategoryData, OutfitItem } from "@/types/outfit-category";
import ImgPlaceholder from "@/components/shared/ImgPlaceholder";
import Breadcrumb from "@/components/shared/Breadcrumb";
import RelatedGrid from "@/components/shared/RelatedGrid";
import StyleGuideSection from "@/components/shared/StyleGuideSection";

export type ConversionConfig = {
  introText: string;
  variations: string[];
};

type Props = {
  data: CategoryData;
  config: ConversionConfig;
  slug: string;
  basePath: string;
  categoryLink: { label: string; href: string };
  styleGuideSuffix?: string;
};

export default function ConversionCategoryPage({
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

  const firstTwo = data.outfits.slice(0, 2);
  const rest = data.outfits.slice(2);

  return (
    <main className="flex-1 bg-white">

      {/* ── 1. Hero — H1 + 1 sentence ── */}
      <section className="max-w-2xl mx-auto px-6 pt-8 pb-6">
        <Breadcrumb items={breadcrumbs} className="mb-6" />

        <h1 className="font-display font-light text-4xl md:text-5xl leading-tight tracking-tight text-black mb-3">
          {data.label}
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          {data.description}
        </p>
      </section>

      {/* ── 2. Above the fold: first 2 outfits ── */}
      <div className="max-w-2xl mx-auto px-6">
        {firstTwo.map((outfit, i) => (
          <OutfitBlock key={outfit.id} outfit={outfit} index={i} subtitle={data.subtitle} />
        ))}
      </div>

      {/* ── 3. Short intro ── */}
      <div className="max-w-2xl mx-auto px-6 py-7 border-t border-gray-100">
        <p className="text-sm text-gray-600 leading-relaxed">
          {config.introText}
        </p>
        <p className="mt-3 text-xs text-gray-400">
          When you purchase through links on our site, we may earn an affiliate commission.
        </p>
      </div>

      {/* ── 4. Remaining outfits ── */}
      {rest.length > 0 && (
        <div className="max-w-2xl mx-auto px-6">
          {rest.map((outfit, i) => (
            <OutfitBlock key={outfit.id} outfit={outfit} index={i + 2} subtitle={data.subtitle} />
          ))}
        </div>
      )}

      {/* ── 5. Variations ── */}
      <section className="max-w-2xl mx-auto px-6 py-10 border-t border-gray-100">
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

function OutfitBlock({
  outfit,
  index,
  subtitle,
}: {
  outfit: OutfitItem;
  index: number;
  subtitle: string;
}) {
  return (
    <section className={`py-10${index > 0 ? " border-t border-gray-100" : ""}`}>

      {/* Outfit image */}
      <a
        href={outfit.href}
        className="group block relative aspect-[3/4] w-full max-w-xs mx-auto overflow-hidden bg-gray-100"
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

      {/* Meta */}
      <div className="text-center mt-5 mb-5">
        <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1">
          {String(index + 1).padStart(2, "0")} — {subtitle}
        </p>
        <h2 className="font-display font-light text-2xl text-black mb-3">
          {outfit.title}
        </h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {outfit.style && <span className="tag">{outfit.style}</span>}
          <span className="tag">{outfit.tag}</span>
        </div>
      </div>

      {/* Shop the look */}
      {outfit.pieces && outfit.pieces.length > 0 && (
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase border-b border-black pb-2 inline-block mb-4">
            Shop the Look
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {outfit.pieces.slice(0, 4).map((piece) => {
              const card = (
                <div className="flex flex-col gap-2">
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    <ImgPlaceholder
                      src={piece.image}
                      alt={piece.name}
                      sizes="(max-width: 640px) 45vw, 150px"
                    />
                  </div>
                  <p className="text-xs font-semibold tracking-wide uppercase text-gray-600 text-center line-clamp-2">
                    {piece.name}
                  </p>
                  {piece.affiliateUrl && (
                    <span className="block text-center text-xs font-semibold tracking-widest uppercase bg-black text-white py-2 hover:bg-gray-800 transition-colors">
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

      {/* CTA */}
      <div className="text-center mt-6">
        <a
          href={outfit.href}
          className="text-xs font-semibold tracking-widest uppercase border-b border-black pb-0.5 hover:text-gray-500 transition-colors"
        >
          View Full Outfit →
        </a>
      </div>

    </section>
  );
}
