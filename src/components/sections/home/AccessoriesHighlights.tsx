// Ana sayfadaki aksesuar bölümü — Jewelry / Bags / Sunglasses kategorilerine göre gruplandırılır.
// Her kategori: 1 büyük featured kart (sol) + 2 küçük liste kartı (sağ) olarak görünür.
// Tek sayılı kategoriler sağa-sola pozisyon değiştirir (ci % 2 !== 0).
// Sanity'de veri varsa oradan çeker; yoksa STATIC_ACCESSORIES fallback'i kullanır.
import { client } from "@/sanity/lib/client";
import Button from "@/components/shared/Button";
import { urlFor } from "@/sanity/lib/image";
import { HOME_ACCESSORIES_QUERY } from "@/lib/queries";
import ImgPlaceholder from "@/components/shared/ImgPlaceholder";

const categories = [
  { label: "Jewelry",    value: "jewelry",    href: "/accessories?type=jewelry" },
  { label: "Bags",       value: "bags",       href: "/accessories?type=bags" },
  { label: "Sunglasses", value: "sunglasses", href: "/accessories?type=sunglasses" },
];

const badgeStyle: Record<string, string> = {
  Classic:           "bg-black text-white",
  Trending:          "bg-white text-black border border-black",
  Statement:         "bg-gray-900 text-white",
  "Daily Essential": "bg-black text-white",
  Iconic:            "bg-gray-900 text-white",
  "90s Revival":     "bg-white text-black border border-black",
  Timeless:          "bg-gray-100 text-gray-700",
  New:               "bg-white text-black border border-black",
};

const STATIC_ACCESSORIES = [
  { id: "1",  title: "Gold Hoop Earrings",        category: "Jewelry",    badge: "Classic",         pairingTip: "Works with any look",    occasion: "For casual and evening outfits", featured: true  },
  { id: "2",  title: "Minimalist Chain Necklace", category: "Jewelry",    badge: "Trending",        pairingTip: "Layering look",          occasion: "Layer multiple chains together", featured: false },
  { id: "3",  title: "Wide Statement Ring",       category: "Jewelry",    badge: "Statement",       pairingTip: "Minimalist outfits",     occasion: "One ring that says it all",      featured: false },
  { id: "4",  title: "Canvas Tote Bag",           category: "Bags",       badge: "Daily Essential", pairingTip: "Casual & business",      occasion: "Spacious & stylish",             featured: true  },
  { id: "5",  title: "Mini Crossbody Bag",        category: "Bags",       badge: "Trending",        pairingTip: "Evening & leisure",      occasion: "Compact but impactful",          featured: false },
  { id: "6",  title: "Structured Bucket Bag",     category: "Bags",       badge: "Classic",         pairingTip: "Business & casual",      occasion: "A timeless companion",           featured: false },
  { id: "7",  title: "Cat-Eye Sunglasses",        category: "Sunglasses", badge: "Iconic",          pairingTip: "Feminine looks",         occasion: "Instant glamour factor",         featured: true  },
  { id: "8",  title: "Oversized Square Frames",   category: "Sunglasses", badge: "90s Revival",     pairingTip: "Street style",           occasion: "Bold & modern",                  featured: false },
  { id: "9",  title: "Round Vintage Frames",      category: "Sunglasses", badge: "Timeless",        pairingTip: "Boho & minimal",         occasion: "Soft lines, strong presence",    featured: false },
];

type AccessoryItem = {
  id: string;
  title: string;
  slug?: string;
  image?: string;
  lqip?: string;
  category: string;
  badge: string;
  pairingTip?: string;
  occasion?: string;
  featured: boolean;
};
type SanityImg = { asset?: object; hotspot?: object; crop?: object; lqip?: string }

export default async function AccessoriesHighlights() {
  const sanityData = await client.fetch(HOME_ACCESSORIES_QUERY, {}, { next: { revalidate: 3600, tags: ['accessory'] } });

  const accessories: AccessoryItem[] = sanityData.length > 0
    ? sanityData.map((a: { _id: string; title: string; slug: string; image?: SanityImg; type?: string; occasion?: string; pairingTip?: string; tags?: string[]; featured?: boolean }) => ({
        id: a._id,
        title: a.title,
        slug: a.slug,
        image: a.image ? urlFor(a.image).width(1400).height(1750).url() : undefined,
        lqip: a.image?.lqip,
        category: a.type ?? "",
        badge: a.featured ? "Trending" : "New",
        pairingTip: a.pairingTip,
        occasion: a.occasion,
        featured: !!a.featured,
      }))
    : STATIC_ACCESSORIES;

  const grouped = categories.map((cat) => ({
    ...cat,
    featured: accessories.find((a) => a.category === (sanityData.length > 0 ? cat.value : cat.label) && a.featured)
      ?? accessories.find((a) => a.category === (sanityData.length > 0 ? cat.value : cat.label)),
    items: accessories.filter((a) => a.category === (sanityData.length > 0 ? cat.value : cat.label) && !a.featured).slice(0, 2),
  }));

  return (
    <section className="w-full bg-white border-t border-gray-100 scroll-reveal">
      <div className="container-page py-16 md:py-20">

        <div className="section-header mb-10">
          <div className="flex flex-col gap-2">
            <span className="eyebrow">Accessories</span>
            <h2 className="section-title-lg">
              Details that <span className="italic font-light">change everything.</span>
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mt-1 max-w-lg">
              Timeless classics and current trends — jewelry, bags and sunglasses that complement every outfit.
            </p>
          </div>
          <Button variant="ghost" href="/accessories" arrow className="self-start sm:self-auto shrink-0">
            All Accessories
          </Button>
        </div>

        <div className="flex items-center gap-0 mb-10 border-b border-gray-100 overflow-x-auto">
          {categories.map((cat, i) => (
            <a
              key={cat.label}
              href={cat.href}
              className={[
                "shrink-0 px-5 py-3 text-[11px] font-semibold tracking-widest uppercase transition-colors duration-200 border-b-2 -mb-px",
                i === 0
                  ? "border-black text-black"
                  : "border-transparent text-gray-400 hover:text-black hover:border-gray-300"
              ].join(" ")}
            >
              {cat.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-16">
          {grouped.map((cat, ci) => (
            <div key={cat.label}>
              <div className="flex items-center gap-4 mb-6">
                <span className="eyebrow">{cat.label}</span>
                <div className="flex-1 h-px bg-gray-100" />
                <a href={cat.href} className="text-xs font-semibold tracking-widest uppercase text-gray-400 hover:text-black transition-colors duration-200">All →</a>
              </div>

              <div className={`flex flex-col md:flex-row gap-4 md:gap-5 ${ci % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                {cat.featured && (
                  <a href={`/accessories/${cat.featured.slug ?? cat.featured.id}`} className="group relative overflow-hidden bg-gray-100 flex-shrink-0 w-full md:w-2/5 aspect-[4/5]">
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.02]">
                      <ImgPlaceholder src={cat.featured.image} alt={cat.featured.title} blurDataURL={cat.featured.lqip} />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200 -z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent group-hover:from-black/45 transition-colors duration-300" />
                    <div className="absolute top-4 left-4">
                      <span className={`badge-md ${badgeStyle[cat.featured.badge] ?? "bg-gray-100 text-gray-700"}`}>
                        {cat.featured.badge}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-1">
                      <span className="text-xs tracking-widest uppercase text-white/60">{cat.featured.pairingTip}</span>
                      <div className="flex items-end justify-between gap-2">
                        <h3 className="font-display text-xl md:text-2xl font-normal text-white leading-tight">{cat.featured.title}</h3>
                        <svg viewBox="0 0 24 24" className="size-5 stroke-white shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-[opacity,transform] duration-300" fill="none" strokeWidth={2}>
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </div>
                      <span className="text-xs tracking-widest uppercase text-white/50 mt-0.5">{cat.featured.occasion}</span>
                    </div>
                  </a>
                )}

                <div className="flex flex-col flex-1">
                  {cat.items.map((item) => (
                    <a key={item.id} href={`/accessories/${item.slug ?? item.id}`} className="group flex items-center gap-4 py-5 border-b border-gray-100 last:border-0 hover:opacity-60 transition-opacity duration-200">
                      <div className="relative w-20 flex-shrink-0 aspect-square overflow-hidden bg-gray-100">
                        <ImgPlaceholder src={item.image} alt={item.title} />
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 -z-10" />
                      </div>
                      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                        <span className={`self-start badge py-0.5 ${badgeStyle[item.badge] ?? "bg-gray-100 text-gray-700"}`}>
                          {item.badge}
                        </span>
                        <h3 className="card-title leading-tight line-clamp-2">{item.title}</h3>
                        <p className="text-xs tracking-widest uppercase text-gray-400 line-clamp-1">{item.pairingTip}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
