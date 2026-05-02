import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { HOME_OUTFITS_QUERY } from "@/lib/queries";
import { tagColors } from "@/constants/site";
import ImgPlaceholder from "@/components/shared/ImgPlaceholder";

export default async function FeaturedOutfits() {
  const outfits = await client.fetch(HOME_OUTFITS_QUERY, {}, { next: { revalidate: 3600, tags: ['outfit'] } });

  if (!outfits.length) return null;

  return (
    <section className="w-full bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-16 md:py-20">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
              Trending this week
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">
              Trending Outfits
            </h2>
          </div>
          <a
            href="/outfits"
            className="self-start sm:self-auto flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-600 hover:text-black transition-colors duration-200 group"
          >
            All Outfits
            <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current translate-x-0 group-hover:translate-x-1 transition-transform duration-200" fill="none" strokeWidth={2}>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {outfits.map((outfit: { _id: string; title: string; slug: string; image?: object; style?: string; season?: string; occasion?: string; tags?: string[]; featured?: boolean }) => {
            const tag = outfit.featured ? "Trending" : (outfit.tags?.[0] === "New" ? "New" : "Popular");
            const src = outfit.image ? urlFor(outfit.image).width(600).height(800).url() : undefined;
            return (
              <a key={outfit._id} href={`/outfits/${outfit.slug}`} className="group flex flex-col gap-3">
                <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                  <ImgPlaceholder src={src} alt={outfit.title} />
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200 -z-10" />
                  <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold tracking-widest uppercase ${tagColors[tag] ?? "bg-gray-100 text-gray-700"}`}>
                    {tag}
                  </span>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <div className="flex flex-col gap-0.5 px-0.5">
                  <h3 className="text-sm font-black text-black tracking-tight group-hover:text-gray-600 transition-colors duration-200">
                    {outfit.title}
                  </h3>
                  <p className="text-xs tracking-widest uppercase text-gray-400">{outfit.occasion ?? outfit.season}</p>
                </div>
              </a>
            );
          })}
        </div>

        <div className="flex justify-center mt-12">
          <a href="/outfits" className="px-10 py-3 border border-black text-black text-xs font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-200">
            Discover All Outfits
          </a>
        </div>

      </div>
    </section>
  );
}
