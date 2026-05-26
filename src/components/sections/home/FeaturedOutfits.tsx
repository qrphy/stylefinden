// Ana sayfadaki "Trending Outfits" bölümü — 8 outfit kartı 4'lü grid'de gösterir.
// Sanity'de yayınlanmış outfit varsa oradan çeker; yoksa STATIC_OUTFITS fallback'i kullanır.
// featured=true olan outfitler "Trending" etiketiyle öne çıkar.
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { HOME_OUTFITS_QUERY } from "@/lib/queries";
import ImgPlaceholder from "@/components/shared/ImgPlaceholder";
import Button from "@/components/shared/Button";
import PieceThumbnailStrip from "@/components/outfits/PieceThumbnailStrip";

const STATIC_OUTFITS: StaticOutfit[] = [
  { id: "1", title: "Casual Chic",       subtitle: "Everyday & Leisure",   tag: "Trending" },
  { id: "2", title: "Business Elegance", subtitle: "Office & Meeting",      tag: "New"      },
  { id: "3", title: "Weekend Vibes",     subtitle: "Weekend & Day Trip",    tag: "Trending" },
  { id: "4", title: "Evening Glam",      subtitle: "Evening & Event",       tag: "Popular"  },
  { id: "5", title: "Street Style",      subtitle: "Urban & Modern",        tag: "New"      },
  { id: "6", title: "Minimalist Look",   subtitle: "Clean & Elegant",       tag: "Trending" },
  { id: "7", title: "Boho Dreams",       subtitle: "Festival & Nature",     tag: "Popular"  },
  { id: "8", title: "Classic Noir",      subtitle: "Timeless & Bold",       tag: "Trending" },
];

type StaticOutfit = { id: string; title: string; subtitle: string; tag: string }
type PieceThumb = { key: string; name: string; image?: string; affiliateUrl?: string }
type OutfitCard = { id: string; title: string; subtitle: string; tag: string; slug: string; image?: string; pieces?: PieceThumb[] }

export default async function FeaturedOutfits() {
  const sanityOutfits = await client.fetch(HOME_OUTFITS_QUERY, {}, { next: { revalidate: 3600, tags: ['outfit'] } });

  const useSanity = sanityOutfits.length > 0;

  const outfits: OutfitCard[] = useSanity
    ? sanityOutfits.map((o: { _id: string; title: string; slug: string; image?: object; style?: string; season?: string; occasion?: string; tags?: string[]; featured?: boolean; pieces?: Array<{ _key?: string; name: string; image?: object; affiliateUrl?: string }> }) => ({
        id: o._id,
        title: o.title,
        subtitle: o.occasion ?? o.season ?? "",
        tag: o.featured ? "Trending" : (o.tags?.[0] === "New" ? "New" : "Popular"),
        slug: o.slug,
        image: o.image ? urlFor(o.image).width(1400).height(1867).url() : undefined,
        pieces: o.pieces?.map((p, i) => ({
          key: p._key ?? String(i),
          name: p.name,
          image: p.image ? urlFor(p.image).width(80).height(80).url() : undefined,
          affiliateUrl: p.affiliateUrl,
        })),
      }))
    : STATIC_OUTFITS.map((o) => ({ ...o, slug: o.id, image: undefined }));

  return (
    <section className="w-full bg-white border-t border-gray-100 scroll-reveal">
      <div className="container-page py-16 md:py-20">

        <div className="section-header mb-10">
          <div className="flex flex-col gap-2">
            <span className="eyebrow">
              The Edit
            </span>
            <h2 className="section-title-lg">
              Trending Outfits
            </h2>
          </div>
          <Button variant="ghost" href="/outfits" arrow className="self-start sm:self-auto">
            View the Edit
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {outfits.map((outfit, index) => {
            const isHero = index === 0
            return (
              <a
                key={outfit.id}
                href={`/outfits/${outfit.slug}`}
                className={`group flex flex-col gap-3 ${isHero ? "md:col-span-2 xl:col-span-2" : ""}`}
              >
                <div className={`relative overflow-hidden bg-gray-100 ${isHero ? "aspect-[3/4] md:aspect-[4/5]" : "aspect-[3/4]"}`}>
                  <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.02]">
                    <ImgPlaceholder
                      src={outfit.image}
                      alt={outfit.title}
                      sizes={isHero ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200 -z-10" />
                  {isHero ? (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 flex flex-col gap-2">
                        <p className="text-[10px] tracking-widest uppercase text-white/60">{outfit.subtitle}</p>
                        <h3 className="font-display text-2xl md:text-4xl font-light text-white leading-tight">
                          {outfit.title}
                        </h3>
                        <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase text-white/70 group-hover:text-white transition-colors duration-200 mt-1">
                          View Look
                          <svg viewBox="0 0 24 24" className="h-3 w-3 stroke-current translate-x-0 group-hover:translate-x-1 transition-transform duration-200" fill="none" strokeWidth={2.5}>
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="card-overlay" />
                  )}
                </div>
                {!isHero && (
                  <div className="flex flex-col gap-1.5 px-0.5">
                    <h3 className="card-title line-clamp-2">{outfit.title}</h3>
                    <p className="text-xs tracking-widest uppercase text-gray-400 line-clamp-1">{outfit.subtitle}</p>
                    <PieceThumbnailStrip pieces={outfit.pieces} />
                  </div>
                )}
              </a>
            )
          })}
        </div>


      </div>
    </section>
  );
}
