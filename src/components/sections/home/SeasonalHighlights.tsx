// Mevsimsel kombin rehberleri — her mevsim için görsel + açıklama + etiketler
// içeren yan yana kartlar. Tek sayılı kartlar sağa hizalanır (alternatif layout).
// Tamamen statik, CTA'lar /outfits?season= filtrelerine yönlendirir.
import ImgPlaceholder from "@/components/shared/ImgPlaceholder";

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
];

export default function SeasonalHighlights() {
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
          {seasons.map((s, i) => (
            <div
              key={s.id}
              className={["flex flex-col md:flex-row overflow-hidden border-b border-gray-800 last:border-b-0", i % 2 !== 0 ? "md:flex-row-reverse" : ""].join(" ")}
            >
              <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-auto overflow-hidden bg-gray-900 flex-shrink-0">
                <ImgPlaceholder />
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
                    <span key={tag} className="px-3 py-1 text-xs font-medium tracking-widest uppercase text-gray-500 border border-gray-700">
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={s.cta.href}
                  className="self-start flex items-center gap-2 px-8 py-3 bg-white text-black text-xs font-semibold tracking-widest uppercase hover:bg-gray-100 transition-colors duration-200 group"
                >
                  {s.cta.label}
                  <svg viewBox="0 0 24 24" className="size-4 stroke-current translate-x-0 group-hover:translate-x-1 transition-transform duration-200" fill="none" strokeWidth={2}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
