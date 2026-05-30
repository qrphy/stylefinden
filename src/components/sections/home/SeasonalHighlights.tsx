import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SEASONAL_OUTFITS_QUERY } from "@/lib/queries";
import ImgPlaceholder from "@/components/shared/ImgPlaceholder";
import Link from "next/link";

const seasons = [
  {
    id: "spring",
    label: "Now Trending",
    season: "Spring 2026",
    heading: "Fresh looks for Spring",
    description:
      "Pastel tones, lightweight fabrics and floral patterns — spring brings new energy to your wardrobe. Discover the most beautiful combinations for sunny days.",
    tags: ["Pastels", "Linen", "Floral", "Trench Coat"],
    cta: { label: "Discover Spring Outfits", href: "/outfits/season/spring" },
  },
  {
    id: "summer",
    label: "Preview",
    season: "Summer 2026",
    heading: "Summer looks that inspire",
    description:
      "Light dresses, cool linen trousers and bold colors — get ready for the warm months now. Our curated summer looks make every occasion a highlight.",
    tags: ["Linen", "Maxi Dress", "Beach Look", "Summer Colors"],
    cta: { label: "Discover Summer Outfits", href: "/outfits/season/summer" },
  },
  {
    id: "autumn",
    label: "Coming Soon",
    season: "Autumn 2026",
    heading: "Cozy looks for Autumn",
    description:
      "Warm layers, rich earth tones and timeless knits — autumn is the season of effortless style. Explore looks that transition from crisp mornings to cool evenings.",
    tags: ["Earth Tones", "Knit", "Layering", "Trench Coat"],
    cta: { label: "Discover Autumn Outfits", href: "/outfits/season/autumn" },
  },
  {
    id: "winter",
    label: "Coming Soon",
    season: "Winter 2026",
    heading: "Statement looks for Winter",
    description:
      "Bold coats, sleek boots and elegant layering — winter style is about making every cold day a fashion moment. Discover warmth that never compromises on style.",
    tags: ["Coats", "Boots", "Dark Tones", "Cashmere"],
    cta: { label: "Discover Winter Outfits", href: "/outfits/season/winter" },
  },
];

type SeasonOutfit = {
  title: string;
  slug: string;
  image: { asset?: object; hotspot?: object; crop?: object; lqip?: string };
} | null;

type SeasonData = Record<string, SeasonOutfit>;

export default async function SeasonalHighlights() {
  let seasonData: SeasonData = {};
  try {
    seasonData = await client.fetch(
      SEASONAL_OUTFITS_QUERY,
      {},
      { next: { revalidate: 3600, tags: ["outfit"] } }
    );
  } catch {
    // Silently fall back to placeholder images
  }

  return (
    <section className="w-full bg-black scroll-reveal">
      <div className="container-page py-16 md:py-20">

        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-600">
            Seasonal Guides
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-light text-white tracking-tight">
            Style for the Season
          </h2>
        </div>

        <div className="flex flex-col gap-px border border-gray-800">
          {seasons.map((s, i) => {
            const outfit = seasonData[s.id] ?? null;
            const imgUrl = outfit?.image
              ? urlFor(outfit.image).width(1200).height(900).url()
              : undefined;
            const lqip = outfit?.image?.lqip;

            return (
              <div
                key={s.id}
                className={[
                  "flex flex-col md:flex-row overflow-hidden border-b border-gray-800 last:border-b-0",
                  i % 2 !== 0 ? "md:flex-row-reverse" : "",
                ].join(" ")}
              >
                <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-auto overflow-hidden bg-gray-900 flex-shrink-0">
                  <ImgPlaceholder
                    src={imgUrl}
                    alt={outfit?.title ?? s.heading}
                    blurDataURL={lqip}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black -z-10" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-white text-black">
                      {s.label}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-center gap-6 p-8 md:p-12 xl:p-16 w-full md:w-1/2">
                  <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">
                    {s.season}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl xl:text-4xl font-light text-white leading-tight tracking-tight">
                    {s.heading}
                  </h3>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                    {s.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium tracking-widest uppercase text-gray-500 border border-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={s.cta.href}
                    className="self-start flex items-center gap-2 px-8 py-3 bg-white text-black text-xs font-semibold tracking-widest uppercase hover:bg-gray-100 transition-colors duration-200 group"
                  >
                    {s.cta.label}
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4 stroke-current translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
                      fill="none"
                      strokeWidth={2}
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
